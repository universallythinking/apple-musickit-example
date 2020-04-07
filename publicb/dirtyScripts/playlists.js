    localStorage.setItem("host", true);
    localStorage.setItem("allowed", true);
    localStorage.removeItem("Snapster2");
    var flag = false;
    window.start = function() {
        if (!localStorage.userID) {
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
                },
                error: function() {}
            });
        }
    }
    start();
    var access_token = localStorage.current_token;
    var playlists = [];
    var date = new Date().toLocaleDateString();
    var mostVoted = "Most Voted " + date.split("/")[0] + "/" + date.split("/")[2];
    window.loadLists = function() {
        setTimeout(function() {
                   if(!localStorage.spotifyPlaylists) { $.ajax({
            async: true,
            type: "GET",
                        url: "https://api.spotify.com/v1/search?q=party&type=playlist&limit=20",
            headers: {
                'Authorization': 'Bearer ' + localStorage.current_token
            },
            dataType: "json",
            data: "formdata",
            success: function(data) {
            localStorage.spotifyPlaylists = JSON.stringify(data);
            data = data.playlists;
                arr = [];
                $("#Home").append("<header style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: -50px;' class='songLinkClick1 items'><div><center class='items' style='font-size: 200%; padding-bottom: 50px; padding-top: -50px; '>Spotify Playlists</center></div></header><h1></h1><h1></h1>");
                if (localStorage.Snapster) {
                    $("#Home").append("<div name='currentPlaylist' onclick='stay();' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='dirtyScripts/turtle.png'/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>Current Playlist</h5><p>...</p></div></div></div>");
                }
                for (var i = 0; i < data.items.length; i++) {
                    $("#Home").append("<div name='" + data.items[i].id.toString() + "' onclick='clone(\"" + data.items[i].id.toString() + "\", \"spotify\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + data.items[i].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>" + data.items[i].name + "</h5><p>" + data.items[i].tracks.total + " Total Songs</p></div></div></div>");
                }
            }
        });
        } else {
                var data = JSON.parse(localStorage.spotifyPlaylists);
                data = data.playlists;
                arr = [];
                $("#Home").append("<header style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: -50px;' class='songLinkClick1 items'><div><center class='items' style='font-size: 200%; padding-bottom: 50px; padding-top: -50px; '>Spotify Playlists</center></div></header><h1></h1><h1></h1>");
                if (localStorage.Snapster) {
                    $("#Home").append("<div name='currentPlaylist' onclick='stay();' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='dirtyScripts/turtle.png'/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>Current Playlist</h5><p>...</p></div></div></div>");
                }
                for (var i = 0; i < data.items.length; i++) {
                    $("#Home").append("<div name='" + data.items[i].id.toString() + "' onclick='clone(\"" + data.items[i].id.toString() + "\", \"spotify\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + data.items[i].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>" + data.items[i].name + "</h5><p>" + data.items[i].tracks.total + " Total Songs</p></div></div></div>");
                }
        }
                   }, 800);
        setTimeout(function() {
            if (localStorage.userID) {
                if(!localStorage.myPlaylists) {
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
                        localStorage.myPlaylists = JSON.stringify(data);
                        $("#Home").append("<header style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: 50px;' class='songLinkClick1 items playlist'><div><center class='items' style='font-size: 200%; padding-top: 50px; padding-bottom: 50px;'>Your Playlists</center></div></header>");
                        if (localStorage.Snapster) {
                            $("#Home").append("<div name='currentPlaylist' onclick='stay();' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='dirtyScripts/turtle.png'/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>Current Playlist</h5><p>...</p></div></div></div>");
                        }
                        for (var i = 0; i < data.items.length; i++) {
                            if (data.items[i].name == mostVoted) {
                                flag = true;
                                localStorage.Snapster2 = data.items[i].id.toString();
                            } if (data.items[i].name == "Swagger Jukebox") {
                                localStorage.clearPlaylist = data.items[i].id.toString();
                            }
                            // if (data.items[i].owner.id == localStorage.userID && data.items[i].public == true && data.items[i].images[0] != undefined && data.items[i].tracks.total < 76 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString() ) {
                            if (data.items[i].owner.id == localStorage.userID && data.items[i].images[0] != undefined && data.items[i].tracks.total < 500 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString()) {
                                $("#Home").append("<div name='" + data.items[i].id.toString() + "' onclick='clone(\"" + data.items[i].id.toString() + "\", \"null\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + data.items[i].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>" + data.items[i].name + "</h5><p>" + data.items[i].tracks.total + " Total Songs</p></div></div></div>");
                            }
                            // else if (data.items[i].owner.id == localStorage.userID && data.items[i].public == true && data.items[i].tracks.total < 76 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString()) {
                            else if (data.items[i].owner.id == localStorage.userID && data.items[i].tracks.total < 500 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString()) {
                                $("#Home").append("<div onclick='clone(\"" + data.items[i].id.toString() + "\", \"null\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='./noImageAvailable.png'/></div></div><div class='playlist-desc'><h3></h3><h3></h3><h5>" + data.items[i].name + "</h5><p>" + data.items[i].tracks.total + " Total Songs</p></div></div></div>");
                            }
                        }
                        $(".items").wrapAll("<div id='playlistContainer'></div>");
                    }
                });
            } else {
                                    var data = JSON.parse(localStorage.myPlaylists);
                                    $("#Home").append("<header style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: 50px;' class='songLinkClick1 items playlist'><div><center class='items' style='font-size: 200%; padding-top: 50px; padding-bottom: 50px;'>Your Playlists</center></div></header>");
                                    if (localStorage.Snapster) {
                                        $("#Home").append("<div name='currentPlaylist' onclick='stay();' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='dirtyScripts/turtle.png'/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>Current Playlist</h5><p>...</p></div></div></div>");
                                    }
                                    for (var i = 0; i < data.items.length; i++) {
                                        if (data.items[i].name == mostVoted) {
                                            flag = true;
                                            localStorage.Snapster2 = data.items[i].id.toString();
                                        } if (data.items[i].name == "Swagger Jukebox") {
                                            localStorage.clearPlaylist = data.items[i].id.toString();
                                        }
                                        // if (data.items[i].owner.id == localStorage.userID && data.items[i].public == true && data.items[i].images[0] != undefined && data.items[i].tracks.total < 76 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString() ) {
                                        if (data.items[i].owner.id == localStorage.userID && data.items[i].images[0] != undefined && data.items[i].tracks.total < 500 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString()) {
                                            $("#Home").append("<div name='" + data.items[i].id.toString() + "' onclick='clone(\"" + data.items[i].id.toString() + "\", \"null\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + data.items[i].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>" + data.items[i].name + "</h5><p>" + data.items[i].tracks.total + " Total Songs</p></div></div></div>");
                                        }
                                        // else if (data.items[i].owner.id == localStorage.userID && data.items[i].public == true && data.items[i].tracks.total < 76 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString()) {
                                        else if (data.items[i].owner.id == localStorage.userID && data.items[i].tracks.total < 500 && data.items[i].tracks.total > 7 && localStorage.Snapster2 != data.items[i].id.toString()) {
                                            $("#Home").append("<div onclick='clone(\"" + data.items[i].id.toString() + "\", \"null\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='./noImageAvailable.png'/></div></div><div class='playlist-desc'><h3></h3><h3></h3><h5>" + data.items[i].name + "</h5><p>" + data.items[i].tracks.total + " Total Songs</p></div></div></div>");
                                        }
                                    }
                                    $(".items").wrapAll("<div id='playlistContainer'></div>");
            }
            }
        }, 1700);
    }
    window.removeHTML = function() {
        if (document.hasFocus()) {
            //history.replaceState("/playlists.html", document.title, "/choose-a-playlist");
        }
    }
    var removeObj = {};
    var removeArr = [];
    window.removeFromPlaylist = function(songs) {
        $.ajax({
            async: true,
            type: "DELETE",
            url: "https://api.spotify.com/v1/users/"+localStorage.userID+ "/playlists/" + localStorage.clearPlaylist + "/tracks",
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
    createBackup();
            if (localStorage.Snapster) {
            var removeArr = [];
                $.ajax({
                    async: true,
                    type: "GET",
                    url: "https://api.spotify.com/v1/users/"+localStorage.userID+"/playlists/" + localStorage.Snapster + "/tracks?limit=100",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.current_token
                    },
                    dataType: "json",
                    data: "formdata",
                    success: function(data) {
                        var currentItem = {};
                        for (var i = 0; i < Math.min(100, data.items.length); i++) {
                            currentItem = {"uri": data.items[i].track.uri.toString()};
                            removeArr.push(currentItem);
                        }
                        removeObj.tracks = removeArr;
                        removeFromPlaylist(removeArr.toString());
                    }
                });
            }
        if (userID == "null") userID = localStorage.userID;
        setTimeout(function() {
        $.ajax({
            async: true,
            type: "GET",
            url: "https://api.spotify.com/v1/users/"+userID+"/playlists/" + playlist + "/tracks?limit=100",
            headers: {
                'Authorization': 'Bearer ' + localStorage.current_token
            },
            dataType: "json",
            data: "formdata",
            success: function(data) {
                arr = [];
                var j = 0;
                if(localStorage.explicit.toString() != "false") {
                    for (var i = 0; i < Math.min(data.items.length, 100); i++) {
                        arr.push(data.items[i].track.uri.toString());
                    }
                } else {
                    for (var i = 0; i < Math.min(data.items.length, 100); i++) {
                        if(data.items[i].track.explicit == false) {
                            arr.push(data.items[i].track.uri.toString());
                            j++;
                        }
                        if(j==100) break;
                    }
                }
                if(!localStorage.Snapster) {
                    newSpotifyPlaylist();
                }
                if (arr.toString().length >= 100) {
                    loading();
                    setTimeout(function() { addToPlaylist(arr.toString()); }, 500);
                } else {
                    location.href = "partymusic://playlisterror";
                }
            }
        });
        }, 1000);
        loading();
    }
    window.newSpotifyPlaylist = function() {
        if (!localStorage.Snapster2 && localStorage.Snapster2) {
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
        objBackup.uris = songs.split(",");
        $.ajax({
            async: true,
            type: "POST",
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?limit=100",
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            dataType: "json",
            data: JSON.stringify(objBackup),
            success: function(data) {
                localStorage.wasPressed = 0;
                localStorage.firstLoad = 0;
                localStorage.removeItem("songList");
                //location.href = "partymusic://playlistify";
                setTimeout(function() {
                    location.href = localStorage.urlParts + "/index.html";
                }, 1000);
            }
        });
    }
    window.createBackup = function() {
        if (!localStorage.Snapster2 && localStorage.Snapster2) {
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
        //location.href = "partymusic://playlistify";
        setTimeout(function() {
            create();
        }, 1000);
        setTimeout(function() {
            //location.href = "partymusic://first/";
            //location.href = localStorage.urlParts + "/index.html";
        }, 2000);
    }
    window.removeHTML = function() {
        if (document.hasFocus()) {
            if (localStorage["current_token"] != undefined && localStorage["current_token"] != "null" && localStorage["current_token"] != null && (localStorage["partyid"] || localStorage["party"])) {
                //  history.replaceState("/playlists.html", document.title, "/choose-a-playlist");
            }
        }
    }
    //playhover
    window.playLoader = function() {
        for (var i = 0; i < $("#playlistContainer").children(".playlists").length; i++) {
            $(".playlists").eq(i).mouseenter(function() {
                $("#load").show();
            });
        }
        }
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
            $("#load").show();
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
                    $(".playlists").eq(i).addClass("inline");
                    $(".playlists").eq(i).removeClass("half");
                    $(".playlists").eq(i).removeClass("fourth");
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
                $(".playlists").eq(i).addClass("inline");
                $(".playlists").eq(i).removeClass("half");
                $(".playlists").eq(i).removeClass("fourth");
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
    }
    if($("#Home").children.length < 10) {
     setTimeout(loadLists, 5000);
 }
 setTimeout(playLoader, 5000);
