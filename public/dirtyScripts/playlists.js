$(document).ready(function() {
                WEB_SOCKET_SWF_LOCATION = 'https://socketswagger.herokuapp.com/socket.io/inc/WebSocketMain.swf';
                var socket = io.connect('https://socketswagger.herokuapp.com/');
                localStorage.removeItem("Snapster2");
                var date = new Date().toLocaleDateString();
                var mostVoted = "Most Voted " + date.split("/")[0] + "/" + date.split("/")[2];
                var flag = false;
                window.start = function() {
                    $.ajax({
                        async: true,
                        type: "GET",
                        url: "https://api.spotify.com/v1/me",
                        headers: {
                            'Authorization': 'Bearer ' + localStorage["current_token"]
                        },
                        dataType: "json",
                        data: "formdata",
                        success: function(userData) {
                            localStorage['userID'] = userData.id;
                            userID = localStorage['userID'];
                            localStorage["valid"] = "true";
                        }
                    });
                }
                start();
                var access_token = localStorage.current_token;
                var playlists = [];
                var arr = [];


                window.loadLists = function() {
                    $.ajax({
                        async: true,
                        type: "GET",
                        url: "https://api.spotify.com/v1/search?q=party&type=playlist&limit=20",
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.current_token
                        },
                        dataType: "json",
                        data: "formdata",
                        success: function(data) {
                        data = data.playlists;
                            arr = [];
                            $("#html").append("<header style='color: white !important; pointer-events: all;' class='songLinkClick items'><div><center class='items' style='font-size: 200%'>Choose a Base Playlist!</center></div></header>");
                            $("#html").append("<p style='color: white !important; pointer-events: all;' class='songLinkClick items'><div style='color: white !important; pointer-events: all;'><center class='items'>(The Top 100 Songs Will Be Added To Your Party)</center></div></p>");
                            if (localStorage.Snapster) {
                                $("#html").append("<div name='currentPlaylist' onclick='stay();' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='dirtyScripts/turtle.png'/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>Current Playlist</h5><p></p></div></div></div>");
                            }
                            for (var i = 0; i < data.items.length; i++) {
                                $("#html").append("<div name='" + data.items[i].id.toString() + "' onclick='clone(\"" + data.items[i].id.toString() + "\", \"spotify\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + data.items[i].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>" + data.items[i].name + "</h5><p>" + data.items[i].tracks.total + " Total Songs</p></div></div></div>");
                            }
                        }
                    });
                    setTimeout(function() {
                        if (localStorage.userID) {
                            $.ajax({
                                async: true,
                                type: "GET",
                                url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists?limit=50",
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.current_token
                                },
                                dataType: "json",
                                data: "formdata",
                                success: function(data) {
                                    $("#html").append("<header style='color: white !important; pointer-events: all;' class='songLinkClick items playlist'><div><center class='items' style='font-size: 200%'>Choose From Your Playlists!</center></div></header>");
                                    $("#html").append("<p style='color: white !important; pointer-events: all;' class='songLinkClick items playlist'><div style='color: white !important; pointer-events: all;'><center class='songLinkClick items'>(Only Public Playlists Are Shown)</center></div></p>");
                                    if (localStorage.Snapster) {
                                        $("#html").append("<div name='currentPlaylist' onclick='stay();' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='dirtyScripts/turtle.png'/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>Current Playlist</h5><p></p></div></div></div>");
                                    }
                                    for (var i = 0; i < data.items.length; i++) {
                                        if (data.items[i].name == mostVoted) {
                                            flag = true;
                                            localStorage.Snapster2 = data.items[i].id.toString();
                                        }
                                        if (data.items[i].name == "Swagger Jukebox") {
                                            localStorage.clearPlaylist = data.items[i].id.toString();
                                        }
                                        // if (data.items[i].owner.id == localStorage.userID && data.items[i].public == true && data.items[i].images[0] != undefined && data.items[i].tracks.total < 76 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString() ) {
                                        if (data.items[i].owner.id == localStorage.userID && data.items[i].images[0] != undefined && data.items[i].tracks.total < 500 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString()) {
                                            $("#html").append("<div name='" + data.items[i].id.toString() + "' onclick='clone(\"" + data.items[i].id.toString() + "\", \"null\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + data.items[i].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>" + data.items[i].name + "</h5><p>" + data.items[i].tracks.total + " Total Songs</p></div></div></div>");
                                        }
                                        // else if (data.items[i].owner.id == localStorage.userID && data.items[i].public == true && data.items[i].tracks.total < 76 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString()) {
                                        else if (data.items[i].owner.id == localStorage.userID && data.items[i].tracks.total < 500 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString()) {
                                            $("#html").append("<div onclick='clone(\"" + data.items[i].id.toString() + "\", \"null\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='./noImageAvailable.png'/></div></div><div class='playlist-desc'><h3></h3><h3></h3><h5>" + data.items[i].name + "</h5><p>" + data.items[i].tracks.total + " Total Songs</p></div></div></div>");
                                        }
                                    }
                                    $(".items").wrapAll("<div id='playlistContainer'></div>");
                                }
                            });
                        }
                    }, 500);
                }
                window.removeHTML = function() {
                    if (document.hasFocus()) {
                        history.replaceState("/playlists.html", document.title, "/choose-a-playlist");
                    }
                }
                //removeHTML();
                var removeObj = {};
                var removeArr = [];
                window.removeFromPlaylist = function(songs) {
                    $.ajax({
                        async: true,
                        type: "DELETE",
                        url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.clearPlaylist + "/tracks",
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.current_token
                        },
                        dataType: "application/json",
                        data: JSON.stringify(removeObj),
                        success: function(data) {
                            return;
                        }
                    });
                }
                window.clone = function(playlist, userID) {
                    if (localStorage.clearPlaylist) {
                        var removeArr = [];
                        $.ajax({
                            async: true,
                            type: "GET",
                            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.clearPlaylist + "/tracks",
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.current_token
                            },
                            dataType: "json",
                            data: "formdata",
                            success: function(data) {
                                var currentItem = {};
                                for (var i = 0; i < data.items.length; i++) {
                                    currentItem = {
                                        "uri": data.items[i].track.uri.toString()
                                    };
                                    removeArr.push(currentItem);
                                }
                                removeObj.tracks = removeArr;
                                removeFromPlaylist(removeArr.toString());
                            }
                        });
                    }
                    if (userID == "null") userID = localStorage.userID;
                    $.ajax({
                        async: true,
                        type: "GET",
                        url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + playlist + "/tracks",
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.current_token
                        },
                        dataType: "json",
                        data: "formdata",
                        success: function(data) {
                            arr = [];
                                            var j = 0;
                                            if(localStorage.explicit.toString() != "false") {
                                                for (var i = 0; i < data.items.length; i++) {
                                                    arr.push(data.items[i].track.uri.toString());
                                                }
                                            } else {
                                                for (var i = 0; i < data.items.length; i++) {
                                                    if(data.items[i].track.explicit == false) {
                                                        arr.push(data.items[i].track.uri.toString());
                                                    }
                                                }
                                            }
                                            if(!localStorage.clearPlaylist) {
                                                newSpotifyPlaylist();
                                            }
                                            if (arr.toString().length >= 100) {
                                                loading(2000);
                                                setTimeout(function() { addToPlaylist(arr.toString()); }, 500);
                                            } else {
                                                location.href = "//partymusic://playlisterror";
                                            }
                                        }
                    });
                }
                window.newSpotifyPlaylist = function() {
                    if (!localStorage.Snapster2) {
                        createBackup();
                    }
                    var objBackup = {};
                    objBackup.name = "Swagger Jukebox";
                    objBackup.public = "true";
                    $.ajax({
                        async: true,
                        type: "POST",
                        url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists",
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        },
                        dataType: "json",
                        data: JSON.stringify(objBackup),
                        success: function(data) {
                            localStorage.Snapster = data.id.toString();
                            //addToPlaylist(arr.toString());
                        }
                    });
                }
                window.addToPlaylist = function(songs) {
                    var objBackup = {};
                    if (localStorage.clearPlaylist) localStorage.Snapster = localStorage.clearPlaylist;
                    objBackup.uris = songs.split(",");
                    $.ajax({
                        async: true,
                        type: "POST",
                        url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        },
                        dataType: "json",
                        data: JSON.stringify(objBackup),
                        success: function(data) {
                            localStorage.wasPressed = 0;
                            localStorage.removeItem("songList");
                            setTimeout(function() { location.href = localStorage.urlParts + "/index.html"; }, 500);
                        }
                    });
                }
                window.createBackup = function() {
                    if (!localStorage.Snapster2) {
                        var objBackup = {};
                        objBackup.name = mostVoted;
                        objBackup.public = "true";
                        $.ajax({
                            async: true,
                            type: "POST",
                            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists",
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            },
                            dataType: "json",
                            data: JSON.stringify(objBackup),
                            success: function(clearedData) {
                                localStorage.Snapster2 = clearedData.id.toString();
                            }
                        });
                    }
                }
                window.newPlaylist = function(playlist) {
                    if (!localStorage.Snapster2) {
                        createBackup();
                    }
                    localStorage.removeItem("songList");
                    localStorage.removeItem("nowp");
                    localStorage.Snapster = playlist;
                    localStorage.wasPressed = 0;
                    localStorage.firstLoad = 0;
                    socket.emit(localStorage.userID + 'playlistChanged', {
                        body: localStorage.Snapster
                    });
                    setTimeout(function() {
                        create();
                    }, 1000);
                    setTimeout(function() { location.href = localStorage.urlParts + "/index.html"; }, 2000);
                }
                //playhover
                window.playHover = function() {
                    for (var i = 0; i < $("#playlistContainer").children(".playlists").length; i++) {
                        $(".playlists").eq(i).mouseenter(function() {
                            $(this).css("width", "27%");
                            $("#playlistContainer").css("padding-left", "5%");
                        });
                        $(".playlists").eq(i).mouseleave(function() {
                            $(this).css("width", "");
                            $("#playlistContainer").css("padding-left", "");
                        });
                    }
                }
                    $(window).resize(function() {
                        if ($(window).width() < 900 && $(window).width() > 200) {
                            for (var i = 0; i < $("#playlistContainer").children(".playlists").length; i++) {
                                $(".playlists").eq(i).addClass("half");
                                $(".playlists").eq(i).removeClass("inline");
                                $(".playlists").eq(i).removeClass("fourth");
                            }
                            for (var i = 0; i < $("#playlistContainer").children(".playlists").length; i++) {
                                $(".playlists").eq(i).mouseenter(function() {
                                    $(this).css("width", "50%");
                                    $("#playlistContainer").css("padding-left", "5%");
                                });
                                $(".playlists").eq(i).mouseleave(function() {
                                    $(this).css("width", "");
                                    $("#playlistContainer").css("padding-left", "");
                                });
                            }
                        } else if ($(window).width() > 900) {
                            for (var i = 0; i < $("#playlistContainer").children(".playlists").length; i++) {
                                $(".playlists").eq(i).addClass("fourth");
                                $(".playlists").eq(i).removeClass("half");
                                $(".playlists").eq(i).removeClass("inline");
                            }
                            for (var i = 0; i < $("#playlistContainer").children(".playlists").length; i++) {
                                $(".playlists").eq(i).mouseenter(function() {
                                    $(this).css("width", "27%");
                                    $("#playlistContainer").css("padding-left", "5%");
                                });
                                $(".playlists").eq(i).mouseleave(function() {
                                    $(this).css("width", "");
                                    $("#playlistContainer").css("padding-left", "");
                                });
                            }
                        } else if ($(window).width() < 200) {
                            for (var i = 0; i < $("#playlistContainer").children(".playlists").length; i++) {
                                $(".playlists").eq(i).addClass("fourth");
                                $(".playlists").eq(i).removeClass("inline");
                                $(".playlists").eq(i).removeClass("half");
                            }
                            for (var i = 0; i < $("#playlistContainer").children(".playlists").length; i++) {
                                $(".playlists").eq(i).mouseenter(function() {
                                    $(this).css("width", "90%");
                                    $("#playlistContainer").css("padding-left", "5%");
                                });
                                $(".playlists").eq(i).mouseleave(function() {
                                    $(this).css("width", "");
                                    $("#playlistContainer").css("padding-left", "5%");
                                });
                            }
                        }
                    });
                    window.stay = function() {
                          location.href = localStorage.urlParts + "/index.html";
                    }
                    window.onLoadResize = function() {
                        if (navigator.userAgent.toString().indexOf("AFTT") > -1 || window.outerWidth > 900) {
                            for (var i = 0; i < $("#playlistContainer").children(".playlists").length; i++) {
                                $(".playlists").eq(i).css("width", "22%");
                                $(".playlists").eq(i).mouseenter(function() {
                                    $(this).css("width", "27%");
                                    $("#playlistContainer").css("padding-left", "5%");
                                });
                                $(".playlists").eq(i).mouseleave(function() {
                                    $(this).css("width", "");
                                    $("#playlistContainer").css("padding-left", "");
                                });
                            }
                            //    $(".playlists").eq(0).mouseenter();
                        }
                    //$("body").append("<p style='font-size: 200px; color: white !important'>"+navigator.userAgent.toString()+" " + window.outerWidth +"</p>");
                    }
                    //playhover
                    setTimeout(function() {
                        loadLists();
                    }, 700);
                    setTimeout(function() {
                        onLoadResize();
                    }, 2500);
                window.loading = function(load) {
                $("#load").css("visibility", "visible");
                setTimeout(function() {
                    document.getElementById('load').style.visibility = "hidden";
                }, load);
            }
            loading(2500);
        });
