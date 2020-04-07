$(document).ready(function() {
    window.hashCode = function(s) {
        return s.split("").reduce(function(a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }, 0);
    }
    var e = [];
    WEB_SOCKET_SWF_LOCATION = 'https://socketswagger.herokuapp.com/socket.io/inc/WebSocketMain.swf';
    var socket = io.connect('https://socketswagger.herokuapp.com/');
    localStorage.combo = localStorage.userID + ":::" + localStorage.password;
          window.swipeRight = function(event, direction, distance, duration, fingerCount) {
              if (distance >= $(window).width() / 1.5) {
                  $(this).css("padding-left", distance + "px");
                  removeOne($(this).attr("title"));
              } else if (distance >= $(window).width() / 50) {
                  var el = this;
                  $(this).css("padding-left", distance + "px");
                  setTimeout(function() {
                      $(el).css("padding-left", "");
                  }, 200);
              }
          }
    window.nextSongsCache = function() {
        var l2 = [];
        var explicitArray = [];
        var t = JSON.parse(localStorage.songList);
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
            if (t.items[a].track.id == localStorage.nowp || localStorage.nowp == hashCode(t.items[a].track.name + t.items[a].track.artists[0].name)) {
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
                $("#results").append('<div title="' + t.items[a].track.id + '" name="' + t.items[a].track.popularity + '" alt="' + t.items[a].track.name + " by " + t.items[a].track.artists[0].name + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"><div class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 onclick="now(\'' + t.items[a].track.id + '\', ' + a + ')"  class="block">' + t.items[a].track.name + '</h5> <p class="block">' + t.items[a].track.artists[0].name + '</p> </div> </div> <div class="voteUp voteBtn"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div></div>  </div>');
            } else if (t.items[a].track.id != localStorage.nowp && (t.items[a].track.id === null || t.items[a].track.id == "null")) {
                $("#results").append('<div title="' + hashCode(t.items[a].track.name + t.items[a].track.artists[0].name) + '" name="' + t.items[a].track.popularity + '" alt="' + t.items[a].track.name + " by " + t.items[a].track.artists[0].name + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"><div class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 onclick="now(\'' + t.items[a].track.id + '\', ' + a + ')"  class="block">' + t.items[a].track.name + '</h5> <p class="block">' + t.items[a].track.artists[0].name + '</p> </div> </div> <div class="voteUp voteBtn"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div></div>  </div>');
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
            //addVotes(a);
        }
        if (explicitArray.toString().length >= 10) {
            remove(-3, explicitArray.toString());
        }
        setTimeout(calculateVotes, 200);
        setTimeout(song, 1000);
    }
    window.nextSongs = function() {
        $.ajax({
                async: true,
                cache: true,
            type: "GET",
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?offset=" + localStorage.offsetNumber,
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            dataType: "json",
            data: "formdata",
            success: function(t) {
                localStorage.songList = JSON.stringify(t);
                setTimeout(nextSongsCache, 1000);
            }
        });
    }
    window.now = function(a, b) {
        setTimeout(song, 500);
        location.href = "partymusic://song/" + a;
        localStorage.nowp = a;
        downVoteify();
    }
    window.isReady = function() {
        return true;
    }
    window.rVote = function() {
        parseInt($(".songLinkClick").eq(1).children(".voteUp").text()) < 0 && resetVotes();
    }
    window.nextSong = function(e) {
        //increment(),
        location.href = "partymusic://" + $(".songLinkClick").eq(1).attr("title");
    }
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
    window.loading = function() {
            $("#load").show();
            $("#load").fadeOut(2000);
        }
        window.votedImg = function() {
            $("#vote").show();
            setTimeout(function() { $("#vote").fadeOut(1250); }, 500);
        }
        loading();
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
    /*setInterval(function() {
        updateTitle()
    }, 7500);
    setInterval(function() {
            updateLSSong()
        }, 5500);
        setTimeout(function() {
                    updateLSSong()
                }, 750);

    setTimeout(function() {
         updateNowSong()
     }, 500);*/
     setTimeout(function() {
             updateNowSong()
         }, 7500);
     setTimeout(function() {
              location.href = "partymusic://partyName/" + localStorage.party.split(":::")[0]
     }, 1000);
        window.song = function() {
        setTimeout(function() {
             socket.emit(localStorage.userID+"songChanged", {body: $("#song").attr("title")});
        }, 1000);
        var r = {}
        r.username = localStorage.userID;
        r.song = $("#song").attr("title");
        $.ajax({
            url: "https://paywallios.herokuapp.com/song",
            dataType: "json",
            data: r,
            timeout: 12000,
            success: function(e) {

            }
        });
    }
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
            });
    }
    window.calculateVotes = function() {
        var t, a;
        l = localStorage.CT.split(","),
            $.each(l, function(e, n) {
                t = localStorage.votes.split("++" + n).length,
                    a = localStorage.votes.split("--" + n).length,
                    //s = $("[title=" + n + "]").attr("id").substr(13),
                    t - a != 0 ? ($("[title=" + n + "]").children(".voteUp").text(t - a),
                        $("[title=" + n + "]").children(".voteUp").attr("name", t - a)) : ($("[title=" + n + "]").children(".voteUp").html("<i class='fa fa-thumbs-o-up' aria-hidden='true'></i>"),
                        $("[title=" + n + "]").children(".voteUp").attr("name", t - a))
            });
        $("#results .next").sort(sortSongs).appendTo("#results");
    }
    window.sortSongs = function(a, b) {
        return parseInt($(b).children(".voteUp").attr("name")) - parseInt($(a).children(".voteUp").attr("name")) || parseInt($(b).attr("name")) - parseInt($(a).attr("name")) || parseInt($(b).siblings(".songLinkClick").attr("title").charCodeAt(10)) < parseInt($(a).siblings(".songLinkClick").attr("title").charCodeAt(10)) || parseInt($(b).children(".voteUp").prev("div")[0].innerHTML.charCodeAt(10)) - parseInt($(a).children(".voteUp").prev("div")[0].innerHTML.charCodeAt(10));
    }
    Array.max = function(e) {
        return Math.max.apply(Math, e)
    }
    localStorage.votes || (localStorage.votes = "");
    window.vote = function(e) {
        if(e.length > 7) votedImg();
        var t = {}
        localStorage.votes = localStorage.votes + e;
        setTimeout(calculateVotes, 250);
        t.votes = e;
        t.username = localStorage.userID;
        $.ajax({
            url: "https://paywallios.herokuapp.com/upVote",
            dataType: "json",
            data: t,
            timeout: 12000,
            success: function(t) {
               // if(localStorage.Snapster2) addPopularSong(e.slice(2));
                calculateVotes();
            },
            error: function(err) {
               // if(localStorage.Snapster2) addPopularSong(e.slice(2));
            }
        });
    }
    window.updateVotes = function(e) {
        var t = {}
        t.username = localStorage.userID,
            t.votes = e.replace(/\\/g, ""),
            $.ajax({
                url: "https://paywallios.herokuapp.com/downVote",
                dataType: "json",
                data: t,
                timeout: 12000,
                success: function(e) {
                    calculateVotes()
                }
            })
    }
    window.addPopularSong = function(e) {
        var popSong = [];
        $.ajax({
                async: true,
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
    }
    window.handleData = function(t) {
        var a = [];
        for (var n = 0; n < t[0].items.length; n++) {
            a[n] = t[0].items[n].track.id
        }
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
    }
    window.down = function() {
        var t = localStorage.nowp,
            a = new RegExp(t, "g"),
            n = new RegExp("", "g"),
            o = localStorage.votes.replace(a, "");
        o = (o = (o += ", --" + t).replace(n, "")).replace(/\\/, ""),
            localStorage.votes = o,
            updateVotes(o);
    }
    window.increment = function(e) {
        if (e == 1) {
            location.href = "partymusic://song/" + $(".songLinkClick").eq(0).attr("title");
            setTimeout(nS,500);
            setTimeout(down, 800);
            setTimeout(rVote, 2500);
        }
        if (e == 3) {
                localStorage.nowp = $(".songLinkClick").eq(0).attr("title");
                    //location.href = "partymusic://song/" + $(".songLinkClick").eq(0).attr("title");
                    setTimeout(nS,500);
                    setTimeout(down, 1500);
                    setTimeout(rVote, 2500);
                }
        else if (e==2) {
            location.href = "partymusic://playnext/";
        }
        if (parseInt($(".songLinkClick").eq(0).children(".voteUp").attr("name")) > 0) {
           // if(localStorage.Snapster2) addPopularSong($(".songLinkClick").eq(0).attr("title"));
        }
        //downVoteify();
        // setTimeout(function() { location.reload(); }, 2500);
        setTimeout(moveToBottom, 5000);
    }
    window.remove = function(h, explicitArray) {
        if (parseInt($(".songLinkClick").eq(0).children(".voteUp").attr("name")) < 0) {
            resetVotes();
        }
        if(1 == 2) {
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
                async: true,
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
                },
                error: function(e) {}
            });
        }
        }
    }
    window.removeOne = function(song) {
        var a = '{"tracks":[' + '{ "uri": "spotify:track:' + song + '" }' + ']}';
        socket.emit(localStorage.userID + 'newSongs', {});
        $.ajax({
                async: true,
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
            },
            error: function(e) {}
        });
    }
     window.updateLSSong = function() {
            location.href = "partymusic://updateSong/spotify:track:" + $(".songLinkClick").eq(0).attr("title")
            //location.href = "partymusic://updateNow/spotify:track:" + $("#song").attr("title")
        }
    window.updateTitle = function() {
        location.href = "partymusic://updateTitle/" + $(".songLinkClick").eq(0).attr("alt")
    }
    window.updateTitle2 = function() {
            location.href = "partymusic://updateTitle2/" + $(".songLinkClick").eq(1).attr("alt")
        }
    window.updateNowSong = function() {
            //location.href = "partymusic://updateSong/spotify:track:" + $(".songLinkClick").eq(0).attr("title")
            location.href = "partymusic://updateNow/spotify:track:" + $("#song").attr("title")
        }
    window.reload = function() {
        location.href = "partymusic://reload"
    }
    window.playFirst = function() {
        /*if(localStorage.firstLoad == 0) {
            setTimeout(function() {
            $("#load").hide();
            prev();
            }, 2000);
            localStorage.firstLoad = 1;
        }
        if (!localStorage.prevBtn) {
            localStorage.prevBtn = 1;
        }*/
    }
    if (!localStorage.prevBtn) {
        localStorage.prevBtn = 1;
    }
    window.next = function() {
        //increment(),
        setTimeout(function() {
            reload()
        }, 100)
    }
    window.prev = function() {
        //location.href = "partymusic://updateNow/spotify:track:" + $("#song").attr("title");
        location.href = "partymusic://previous/"
    }
    setTimeout(function() {
        1 != localStorage.wasPressed && (localStorage.wasPressed = 1,
            playFirst())
    }, 1000);
    window.pause = function() {
        /*if (parseInt(localStorage.prevBtn) < 2) {
            location.href = "partymusic://song/" + $("#song").attr("title");
            localStorage.prevBtn = parseInt(localStorage.prevBtn) + 1;
        }
        if (parseInt(localStorage.prevBtn) >= 2) */location.href = "partymusic://pause";
    }
    window.nS = function() {
        if (!localStorage.songList) {
            nextSongs();
            //setTimeout(function() { increment(1); }, 1500);
        } else {
            //nextSongs();
            nextSongsCache();
        }
    }
    window.downVoteify = function(i) {
        nS();
        calculateVotes();
        setTimeout(function() {
            down();
        }, 1000);
    }
    nS();
    setTimeout(nS, 5000);
    //downVoteify();
    //setTimeout(rVote, 4000);
    window.smallVote = function() {
            vote(", ");
            //localStorage.sVote == "YES";
        localStorage.superHost = "true";
    }
    vote(", ");
    //setTimeout(smallVote, 15000);
     window.moveToBottom = function() {
                    var e, a, o = -1;
                    var s = [];
                    var top = [];
                    var add = [],
                        l = localStorage.CT.split(",");
                    $.each(l, function(t, l) {
                        e = localStorage.votes.split("++" + l).length, a = localStorage.votes.split("--" + l).length, $("[title=" + l + "]")[0].id.slice(13), (e - a <= o && localStorage.nowp.indexOf(l) == -1) && s.push('{ "uri": "spotify:track:' + l + '" }')
                    });
                     $.each(l, function(t, l) {
                        e = localStorage.votes.split("++" + l).length, a = localStorage.votes.split("--" + l).length, $("[title=" + l + "]")[0].id.slice(13), (e - a <= o && localStorage.nowp.indexOf(l) == -1) && add.push('"spotify:track:' + l + '"')
                    });
                    var addObj = '{"uris":[' + add + ']}';
                    localStorage.addToBottom = add.length;
                    console.log(JSON.stringify(addObj));
                    var i = '{"tracks":[' + s + "]}";
          if(1 <= s.length && localStorage.addToBottom != localStorage.oldAddToBottom) {
                      localStorage.oldAddToBottom = localStorage.addToBottom;
            $.ajax({
                        async: !0,
                        cache: !0,
                        type: "DELETE",
                        url: "https://api.spotify.com/v1/playlists/" + localStorage.Snapster + "/tracks",
                        headers: {
                            Authorization: "Bearer " + localStorage.current_token
                        },
                        contentType: "application/json",
                        data: i,
                        success: function(t) {
                    $.ajax({
                        async: !0,
                        cache: !0,
                        type: "POST",
                        url: "https://api.spotify.com/v1/playlists/" + localStorage.Snapster + "/tracks",
                        headers: {
                            Authorization: "Bearer " + localStorage.current_token
                        },
                        contentType: "application/json",
                        data: addObj,
                        success: function(t) {
                            nextSongs()
                        },
                        error: function(t) {}
                    });
                                        },
                        error: function(t) {}
                    });

          }
                }
    });