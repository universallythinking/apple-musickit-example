$(document).ready(function() {

    window.hideload = function() {
        document.getElementById("load").style.visibility = "hidden";
    };
    setTimeout(hideload, 200);
    var e = [];
    WEB_SOCKET_SWF_LOCATION = 'https://socketswagger.herokuapp.com/socket.io/inc/WebSocketMain.swf';
    var socket = io.connect('https://socketswagger.herokuapp.com/');
    localStorage.combo = localStorage.userID + ":::" + localStorage.password;
    window.hashCode = function(s) {
        return s.split("").reduce(function(a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }, 0);
    };
    window.nextSongsCache = function() {
        var l2 = [];
        var explicitArray = [];
        var t = $.parseJSON(localStorage.songList);
        $("#results").css("padding-top", "298px !important");
        $("#results").css("text-align", "center");
        // localStorage.nowp = t.items[0].track.id;
        // localStorage.nextp = t.items[1].track.id;
        $("#results").empty();
        if (!localStorage.nowp && t.items[0].track.id != null && t.items[0].track.id != "null") {
            localStorage.nowp = t.items[0].track.id;
        } else if (!localStorage.nowp && (t.items[0].track.id == null || t.items[0].track.id == "null")) {
            localStorage.nowp = hashCode(t.items[0].track.name + t.items[0].track.artists[0].name);
        }
        for (var a = 0; a < t.items.length; a++) {
            if (t.items[a].track.id == localStorage.nowp || localStorage.nowp == (hashCode(t.items[a].track.name + t.items[a].track.artists[0].name))) {
                try {
                    $("#song").text(t.items[a].track.name);
                    $("#song").attr("title", t.items[a].track.id);
                    $("#artist").text(t.items[a].track.artists[0].name);
                    $('.img').eq(a).css('background', 'url(' + t.items[a].track.album.images[0].url + ') center center');
                    $('.img').eq(a).css('background-size', 'cover');
                    $('.player .cover').css('background', 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(' + t.items[a].track.album.images[0].url + ') center top');
                } catch (e) {
                    console.log(e);
                }
            }
            if (t.items[a].track.id != localStorage.nowp && t.items[a].track.id != null && t.items[a].track.id != "null") {
                $("#results").append('<div title="' + t.items[a].track.id + '" name="' + t.items[a].track.popularity + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"><div class="voteBtn voteDown"><i class="fa fa-angle-down" aria-hidden="true"></i></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 class="playNow" onclick="now(\'' + t.items[a].track.id + '\', ' + a + ')"  class="block">' + t.items[a].track.name + '</h5> <p class="block">' + t.items[a].track.artists[0].name + '</p> </div> </div> <div class="voteUp voteBtn"><i class="fa fa-angle-up" aria-hidden="true"></i></div></div>  </div>');
            } else if (t.items[a].track.id != localStorage.nowp && (t.items[a].track.id === null || t.items[a].track.id == "null")) {
                $("#results").append('<div title="' + hashCode(t.items[a].track.name + t.items[a].track.artists[0].name) + '" name="' + t.items[a].track.popularity + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"><div class="voteBtn voteDown"><i class="fa fa-angle-down" aria-hidden="true"></i></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 class="playNow" onclick="now(\'' + t.items[a].track.id + '\', ' + a + ')"  class="block">' + t.items[a].track.name + '</h5> <p class="block">' + t.items[a].track.artists[0].name + '</p> </div> </div> <div class="voteUp voteBtn"><i class="fa fa-angle-up" aria-hidden="true"></i></div></div>  </div>');
            }
            if (t.items[a].track.id != null && t.items[a].track.id != "null") {
                l2.push(t.items[a].track.id);
            } else if ((t.items[a].track.id === null || t.items[a].track.id == "null")) {
                l2.push(hashCode(t.items[a].track.name + t.items[a].track.artists[0].name));
            }
            if (localStorage.explicit.toString() == "false" && t.items[a].track.explicit == true) {
                explicitArray.push('{ "uri": "spotify:track:' + t.items[a].track.id + '" }');
            }
            localStorage.CT = l2;

            addVotes(a);
        }
        if (explicitArray.toString().length >= 10) {
            remove(-3, explicitArray.toString());
        }
        calculateVotes();
    };
    window.nextSongs = function() {
        $.ajax({
            async: !0,
            type: "GET",
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?offset=" + localStorage.offsetNumber,
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            dataType: "json",
            data: "formdata",
            success: function(t) {
                localStorage.songList = JSON.stringify(t);
                nextSongsCache();
            }
        });
    };
    window.now = function(a, b) {
        setTimeout(song, 500);
        location.href = "//partymusic://song/" + a;
        localStorage.nowp = a;
        downVoteify();
    };
    window.isReady = function() {
        return true;
    };
    window.rVote = function() {
        parseInt($(".songLinkClick").eq(1).children(".voteUp").text()) < 0 && resetVotes();
    };
    window.nextSong = function(e) {
        //increment(),
        location.href = "//partymusic://" + $(".songLinkClick").eq(1).attr("title");
    };
    localStorage.party && (localStorage.lastFM = localStorage.party);
    localStorage.votedArray || (localStorage.votedArray = " ");
    localStorage.CT1 || (localStorage.CT1 = "");
    $("#results").empty;
    var t, a, n, o, r;
    localStorage.totalSongs = 0;
    localStorage.currentlyPlayingWC = "";
    localStorage.currentlyPlaying = "";
    localStorage.currentTrack = 0;
    localStorage.offsetNumber = 0;
    $("#nameify").empty();
    $("#nameify").append("#" + localStorage.party.split(":::")[0].toUpperCase());
    window.loading = function(e) {
        var t = 1000;
        1 == e && (t = 2500);
        3 == e ? t = 750 : 2 == e && (t = 2e3);
        $("#load").css("visibility", "visible");
        var a = setInterval(function() {
            $("#results").children("div").length > 0 && isReady() && setTimeout(function() {
                document.getElementById("load").style.visibility = "hidden";
                clearInterval(a)
            }, t)
        }, 1000)
    };
    var s = 1;
    i = [];

    /*setInterval(function() {
            votes()
    }, 6500);*/
    /*setInterval(function() {
        if (localStorage.votes != localStorage.votes2) {
            calculateVotes();
            localStorage.votes2 = localStorage.votes;
        }
    }, 111500);*/
    setInterval(function() {
        updateLSSong()
    }, 1500);
    window.song = function() {
        socket.emit(localStorage.userID + 'songChanged', {
            body: localStorage.nowp
        });
        var r = {};
        r.username = localStorage.userID;
        r.song = localStorage.nowp;
        $.ajax({
            url: "https://paywallios.herokuapp.com/song",
            dataType: "json",
            data: r,
            timeout: 2000,
            success: function(e) {

            }
        });
        downVoteify();
    };
    var l2;
    window.addVotes = function(e) {
        $("#songLinkClick" + e).children(".voteUp").click(function() {
                var t = "++" + $("#results").find("#songLinkClick" + e).attr("title"),
                    a = parseInt($(".songLinkClick").eq(e).children(".voteUp").text());
                vote(t, a)
            }),
            $("#songLinkClick" + e).children(".voteDown").click(function() {
                var t = "--" + $("#results").find("#songLinkClick" + e).attr("title");
                vote(t, 0)
            })
    };
    window.calculateVotes = function() {
        var t, a;
        l = localStorage.CT.split(","),
            $.each(l, function(e, n) {
                t = localStorage.votes.split("++" + n).length,
                    a = localStorage.votes.split("--" + n).length,
                    //s = $("[title=" + n + "]").attr("id").substr(13),
                    t - a != 0 ? ($("[title=" + n + "]").children(".voteUp").text(t - a),
                        $("[title=" + n + "]").children(".voteUp").attr("name", t - a)) : ($("[title=" + n + "]").children(".voteUp").html("<i class='fa fa-angle-up' aria-hidden='true'></i>"),
                        $("[title=" + n + "]").children(".voteUp").attr("name", t - a))
            });
        $("#results .next").sort(sortSongs).appendTo("#results");
    };
    window.sortSongs = function(a, b) {
        return parseInt($(b).children(".voteUp").attr("name")) - parseInt($(a).children(".voteUp").attr("name")) || parseInt($(b).attr("name")) - parseInt($(a).attr("name")) || parseInt($(b).siblings(".songLinkClick").attr("title").charCodeAt(10)) < parseInt($(a).siblings(".songLinkClick").attr("title").charCodeAt(10)) || parseInt($(b).children(".voteUp").prev("div")[0].innerHTML.charCodeAt(10)) - parseInt($(a).children(".voteUp").prev("div")[0].innerHTML.charCodeAt(10));
    };
    Array.max = function(e) {
        return Math.max.apply(Math, e)
    };
    localStorage.votes || (localStorage.votes = "");
    window.vote = function(e) {
        var t = {};
        localStorage.votes = localStorage.votes + e;
        setTimeout(calculateVotes, 250);
        t.votes = e;
        t.username = localStorage.userID;
        $.ajax({
            url: "https://paywallios.herokuapp.com/upVote",
            dataType: "json",
            data: t,
            timeout: 2000,
            success: function(t) {
                addPopularSong(e.slice(2));
                calculateVotes();
            },
            error: function(err) {
                addPopularSong(e.slice(2));
            }
        });
    };
    window.updateVotes = function(e) {
        var t = {};
        t.username = localStorage.userID,
            t.votes = e.replace(/\\/g, ""),
            $.ajax({
                url: "https://paywallios.herokuapp.com/downVote",
                dataType: "json",
                data: t,
                timeout: 2000,
                success: function(e) {
                    calculateVotes()
                }
            })
    };
    window.addPopularSong = function(e) {
        var popSong = [];
        $.ajax({
            async: !0,
            type: "GET",
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster2 + "/tracks",
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            success: function(data) {
                popSong[0] = data;
                popSong[1] = e;
                handleData(popSong);
            },
            error: function(err) {
                popSong = [{}, "nil"];
                handleData(popSong);
            }
        });
    };
    window.handleData = function(t) {
        var a = [];
        for (var n = 0; n < t[0].items.length; n++) {
            a[n] = t[0].items[n].track.id
        };
        if (a.toString().indexOf(t[1]) == -1) {
            $.ajax({
                type: "POST",
                url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster2 + "/tracks?&uris=spotify%3Atrack%3A" + t[1],
                headers: {
                    Authorization: "Bearer " + localStorage.current_token
                },
                dataType: "json",
                data: "formdata"
            });
        }
        a = [];
    };
    window.down = function(e) {
        var t = localStorage.nowp,
            a = new RegExp(t, "g"),
            n = new RegExp("", "g"),
            o = localStorage.votes.replace(a, "");
        o = (o = (o += ", --" + t).replace(n, "")).replace(/\\/, ""),
            localStorage.votes = o,
            updateVotes(o);
    };
    window.increment = function(e) {
        localStorage.nowp = $(".songLinkClick").eq(0).attr("title");
        if (parseInt($(".songLinkClick").eq(0).children(".voteUp").attr("name")) > 2) {
            addPopularSong($(".songLinkClick").eq(0).attr("title"));
        }
        if (e === 1) {
            location.href = "//partymusic://song/" + $(".songLinkClick").eq(0).attr("title");
        }
        setTimeout(song, 500);
    };
    window.remove = function(h, explicitArray) {
            if (parseInt($(".songLinkClick").eq(0).children(".voteUp").attr("name")) < 0) {
                resetVotes();
            }
            var limit = -7;
            if (h) limit = h;
            if (!explicitArray) {
                var e, t;
                var arrPop = [];
                var arr = localStorage.CT.split(",");
                $.each(arr, function(a, n) {
                    e = localStorage.votes.split("++" + n).length;
                    t = localStorage.votes.split("--" + n).length;
                    var o = $("[title=" + n + "]")[0].id.slice(13);
                    if (limit >= (e - t)) {
                        arrPop.push('{ "uri": "spotify:track:' + n + '" }');
                    }
                });
            } else if (typeof explicitArray == "string") {
                arrPop = explicitArray.split(",");
            }
            var a = '{"tracks":[' + arrPop + ']}';
            if (arrPop.length >= 1) {
                socket.emit(localStorage.userID + 'newSongs', {});
                $.ajax({
                    async: !0,
                    type: "DELETE",
                    url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
                    headers: {
                        Authorization: "Bearer " + localStorage.current_token
                    },
                    contentType: "application/json",
                    //dataType: "json",
                    data: a,
                    success: function(e) {
                        nextSongs();
                        socket.emit('newSongAdded', { username: localStorage.userID });
                    },
                    error: function(e) {}
                });
            }
        };
    if (!localStorage.songList) {
        setTimeout(function() {
            //location.href = "//partymusic://second/";
        }, 500);
    }
    window.updateLSSong = function() {
        location.href = "//partymusic://updateSong/spotify:track:" + $(".songLinkClick").eq(0).attr("title")
    };
    window.reload = function() {
        location.href = "//partymusic://reload"
    };
    window.playFirst = function() {
        if (localStorage.firstLoad == 0) {
            setTimeout(function() {
                $("#load").hide();
                prev();
            }, 2000);
            localStorage.firstLoad = 1;
        }
        if (!localStorage.prevBtn) {
            localStorage.prevBtn = 1;
        }
    };
    if (!localStorage.prevBtn) {
        localStorage.prevBtn = 1;
    }
    window.next = function() {
        //increment(),
        setTimeout(function() {
            reload()
        }, 100)
    };
    window.prev = function() {
        location.href = "//partymusic://song/" + localStorage.nowp
    };
    setTimeout(function() {
        1 != localStorage.wasPressed && (localStorage.wasPressed = 1,
            playFirst())
    }, 1000);
    window.pause = function() {
        if (parseInt(localStorage.prevBtn) < 2) {
            location.href = "//partymusic://song/" + $("#song").attr("title");
            localStorage.prevBtn = parseInt(localStorage.prevBtn) + 1;
        }
        if (parseInt(localStorage.prevBtn) >= 2) location.href = "//partymusic://pause";
    };
    window.nS = function() {
        if (!localStorage.songList) {
            nextSongs();
        } else {
            nextSongsCache();
        }
    };
    window.downVoteify = function(i) {
        nS();
        calculateVotes();
        setTimeout(function() {
            down();
        }, 2000);
        setTimeout(function() {
            down();
        }, 7500);
    };

    downVoteify();
    setTimeout(remove, 4000);
    setTimeout(rVote, 4000);
    setTimeout(song, 4000);
    setTimeout(function() {
        $(".playNow").eq(0).focus();
    }, 2500);
    window.findVotes1 = function () {
                                        var object = {};
                                        object.party = localStorage.party.split(":::")[0];
                                        $.ajax({
                                        url: "https://paywallios.herokuapp.com/find",
                                        data: object,
                                        timeout:10000,
                                        dataType: "json",
                                        success: function (d) {
                                        localStorage["refresh_token"] = d.refresh_token;
                                        localStorage["current_token"] = d.access_token;
                                        if (localStorage.votes != d.votes) {
                                               localStorage["votes"] = d.votes;
                                               calculateVotes();
                                        }
                                        }, error: function (e, ee, eee) {
                                        }
                                        });
                                        }
                      setInterval(findVotes1, 5000);
                      findVotes1();
});