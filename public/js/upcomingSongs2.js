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
    window.playerToken = function() {
                      $.ajax({
                             type: "GET",
                             url: 'https://paywallios.herokuapp.com/refresh_token',
                             data: {
                             'refresh_token': localStorage.refresh_token
                             },
                             timeout: 12000,
                             success: function(data) {
                             localStorage.current_token = data.access_token;
                            // setTimeout(function() { location.reload(); }, 1000);
                             }
                             });
                      };
                     window.checkToken = function() {
                      setTimeout(function() {
                      $.ajax({
                             async: !0,
                             type: "GET",
                             url: "https://api.spotify.com/v1/me",
                             headers: {
                             Authorization: "Bearer " + localStorage.current_token
                             },
                             dataType: "json",
                             data: "formdata",
                             success: function(e) {
                             },
                             error: function(err) {
                             if (err.status.toString() === "401") {
                             setTimeout(playerToken,1500);
                             }
                             }
                             });
                             }, 5000);
                             }; checkToken();
                             setInterval(checkToken, 60000);
     window.nextSongsCache = function() {
                localStorage.searchFlag = !1;
                var t = [],
                e = JSON.parse(localStorage.playlistData);

                 //   s = JSON.parse(localStorage.songList);
                $("#results").css("padding-top", "298px !important"), $("#results").css("text-align", "center"), $("#results").empty(), localStorage.nowp || null == e.relationships.tracks.data[0].id || "null" == e.relationships.tracks.data[0].id ? localStorage.nowp || null != e.relationships.tracks.data[0].id && "null" != e.relationships.tracks.data[0].id || (localStorage.nowp = hashCode(e.relationships.tracks.data[0].attributes.albumName + e.relationships.tracks.data[0].attributes.albumName)) : localStorage.nowp = e.relationships.tracks.data[0].id;
                for (var a = 0; a < e.relationships.tracks.data.length; a++) {
                    var image = e.relationships.tracks.data[a].attributes.artwork.url.split("{w}x{h}")[0] + "1000x1000" + e.relationships.tracks.data[a].attributes.artwork.url.split("{w}x{h}")[1];
                    if (e.relationships.tracks.data[a].id == localStorage.nowp || localStorage.nowp == hashCode(e.relationships.tracks.data[a].attributes.name + e.relationships.tracks.data[a].attributes.artistName)) try {
                        $("#song").text(e.relationships.tracks.data[a].attributes.name), $("#song").attr("title", e.relationships.tracks.data[a].id), $("#song").attr("data", e.relationships.tracks.data[a].id.substring(3, 8)), $("#artist").text(e.relationships.tracks.data[a].attributes.artistName),$('#albumDiv').css('background', 'url(' + image + ') center center'),
                                                                                                                                                                                                                                              $('#albumDiv').css('background-size', 'contain')
                    } catch (err) {}
                    e.relationships.tracks.data[a].id != localStorage.nowp && null != e.relationships.tracks.data[a].id && "null" != e.relationships.tracks.data[a].id ? ($("#results").append('<div title="' + e.relationships.tracks.data[a].id + '" data="' + e.relationships.tracks.data[a].id.substring(3, 8) + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 onclick="now(\'' + e.relationships.tracks.data[a].id + '\')" class="block">' + e.relationships.tracks.data[a].attributes.name + '</h5> <p class="block"><span class="artistName">' + e.relationships.tracks.data[a].attributes.artistName + '</span> <span class="albumName">&#183; ' + e.relationships.tracks.data[a].attributes.albumName + '</span></p> </div> <div class="buttons"><div data="vote(\'--' + e.relationships.tracks.data[a].id.substring(3, 8) + '\', 0)" class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div><div data="vote(\'++' + e.relationships.tracks.data[a].id.substring(3, 8) + '\', 1)" class="voteUp voteBtn" name="0"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div><sup data="' + a + '"></sup></div></div></div>'), null != e.relationships.tracks.data[a].id && "null" != e.relationships.tracks.data[a].id ? t.push(e.relationships.tracks.data[a].id.substring(3, 8)) : null !== e.relationships.tracks.data[a].id && "null" != e.relationships.tracks.data[a].id || t.push(hashCode(e.relationships.tracks.data[a].attributes.name + e.relationships.tracks.data[a].attributes.artistName).substring(3, 8))) : $("#results").append('<div title="' + hashCode(e.relationships.tracks.data[a].attributes.name + e.relationships.tracks.data[a].attributes.artistName + '" data="' + e.relationships.tracks.data[a].id.substring(3, 8) + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 onclick="now(\'' + e.relationships.tracks.data[a].id + '\')" class="block">' + e.relationships.tracks.data[a].attributes.name + '</h5> <p class="block"><span class="artistName">' + e.relationships.tracks.data[a].attributes.artistName + '</span> <span class="albumName">&#183; ' + e.relationships.tracks.data[a].attributes.albumName + '</span></p> </div><div class="buttons"><div data="vote(\'--' + e.relationships.tracks.data[a].id.substring(3, 8) + '\', 0)" class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div><div data="vote(\'++' + e.relationships.tracks.data[a].id.substring(3, 8) + '\', 1)" class="voteUp voteBtn" name="0"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div><sup data="' + a + '"></sup></div></div></div>'), null != e.relationships.tracks.data[a].id && "null" != e.relationships.tracks.data[a].id ? t.push(e.relationships.tracks.data[a].id.substring(3, 8)) : null !== e.relationships.tracks.data[a].id && "null" != e.relationships.tracks.data[a].id || t.push(hashCode(e.relationships.tracks.data[a].attributes.name + e.relationships.tracks.data[a].attributes.artistName).substring(3, 8))), null != e.relationships.tracks.data[a].id && "null" != e.relationships.tracks.data[a].id ? t.push(e.relationships.tracks.data[a].id.substring(3, 8)) : null !== e.relationships.tracks.data[a].id && "null" != e.relationships.tracks.data[a].id || t.push(hashCode(e.relationships.tracks.data[a].attributes.name + e.relationships.tracks.data[a].attributes.artistName).substring(3, 8)), localStorage.CT = t
                }
                calculateVotes(), remove()
            };
    window.nextSongs = function() {
        /*$.ajax({
            async: !0,
            type: "GET",
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            dataType: "json",
            data: "formdata",
            success: function(t) {
                localStorage.songList = JSON.stringify(t);
                nextSongsCache();
            },
                                      error: function(err) {
                                      if (err.status.toString() === "401") {
                                      playerToken();
                                      }
                                      }
        });
        checkToken();*/
        nextSongsCache();
    };
    window.now = function(a, b) {
        setTimeout(song, 500);
        location.href = "partymusic://song/" + a;
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
        location.href = "partymusic://" + $(".songLinkClick").eq(1).attr("title");
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
    $("#nameify").append("#" + localStorage.password.split(":::")[0].toUpperCase());
    $("#partyID").append(localStorage.party.split(":::")[0].toUpperCase());
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
                var t = "++" + $("#results").find("#songLinkClick" + e).attr("data"),
                    a = parseInt($(".songLinkClick").eq(e).children(".voteUp").text());
                vote(t, a)
            }),
            $("#songLinkClick" + e).children(".voteDown").click(function() {
                var t = "--" + $("#results").find("#songLinkClick" + e).attr("data");
                vote(t, 0)
            })
    };
  window.calculateVotes = function() {
             var t, e;
             l = localStorage.CT.split(","), $.each(l, function(a, o) {
                 t = localStorage.votes.split("++" + o).length, e = localStorage.votes.split("--" + o).length, t - e != 0 ? ($("[data=" + o + "]").find("sup").text(t - e), $("[data=" + o + "]").find(".voteUp").attr("name", t - e), $("[data=" + o + "]").find(".voteUp").css("fontWeight", "bold")) : ($("[data=" + o + "]").find("sup").text(""), $("[data=" + o + "]").find(".voteUp").html("<i class='fa fa-thumbs-o-up' aria-hidden='true'></i>"), $("[data=" + o + "]").find(".voteUp").attr("name", t - e))
             }), $("#results .next").sort(sortSongs).appendTo("#results");
             return t + e
                       };
window.sortSongs = function(a, b) {
                                if(parseInt($(b).find(".voteUp").attr("name")) > 0 || parseInt($(a).find(".voteUp").attr("name")) > 0) {
return parseInt($(b).find(".voteUp").attr("name")) - parseInt($(a).find(".voteUp").attr("name")) || parseInt($(b).attr("id").substring(13, $(b).attr("id").length)) - parseInt($(a).attr("id").substring(13, $(a).attr("id").length))
                                } else {
return parseInt($(b).find(".voteUp").attr("name")) - parseInt($(a).find(".voteUp").attr("name"))
                                }
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
                    calculateVotes();
                },
                error: function(err) {
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
                        calculateVotes();
                    },
                  error: function(e) {
                  return;
                  }
                });
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
                a[n] = t[0].items[n].track.id;
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
        };
        window.down = function(e) {
            var t = $("[title='" + localStorage.nowp + "']").attr("data");
                a = new RegExp(t, "g");
                n = new RegExp("", "g");
                o = localStorage.votes.replace(a, "");
            o = (o = (o += ", --" + t).replace(n, "")).replace(/\\/, "");
                localStorage.votes = o;
                updateVotes(o);
        };
        window.increment = function(e) {
            localStorage.nowp = $(".songLinkClick").eq(0).attr("title");

            if (e === 1) {
                location.href = "partymusic://song/" + $(".songLinkClick").eq(0).attr("title");
            }
            setTimeout(song, 500);
        };
        window.remove = function(h, explicitArray) {
                if (parseInt($(".songLinkClick").eq(0).children(".voteUp").attr("name")) < 0) {
                    resetVotes();
                }
                var limit = -7;
          var arr = localStorage.CT.split(",");
                          var arrPop = [];

                if (h) limit = h;
                if (!explicitArray) {
                    var e, t;

                    $.each(arr, function(a, n) {
                        e = localStorage.votes.split("++" + n).length;
                        t = localStorage.votes.split("--" + n).length;
                        var o = $("[data=" + n + "]").attr("title");
                        if (limit >= (e - t)) {
                            arrPop.push('{ "uri": "spotify:track:' + o + '" }');
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
                //location.href = "partymusic://second/";
            }, 500);
        }
        window.updateLSSong = function() {
            location.href = "partymusic://updateSong/spotify:track:" + $(".songLinkClick").eq(0).attr("title");
        };
        window.reload = function() {
            location.href = "partymusic://reload";
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
                reload();
            }, 100);
        };
        window.prev = function() {
            location.href = "partymusic://song/" + localStorage.nowp;
        };
        setTimeout(function() {
            1 != localStorage.wasPressed && (localStorage.wasPressed = 1,
                playFirst());
        }, 1000);
        window.pause = function() {
            if (parseInt(localStorage.prevBtn) < 2) {
                location.href = "partymusic://song/" + $("#song").attr("title");
                localStorage.prevBtn = parseInt(localStorage.prevBtn) + 1;
            }
            if (parseInt(localStorage.prevBtn) >= 2) location.href = "partymusic://pause";
        };
        window.nS = function() {
            if (!localStorage.songList) {
                nextSongs();
            } else {
                nextSongsCache();
            }
        };
         window.moveToBottom = function() {
             var e, a, o = -1;
             var s = [];
             var top = [];
             var add = [],
                 l = localStorage.CT.split(",");
             $.each(l, function(t, l) {
                 e = localStorage.votes.split("++" + l).length, a = localStorage.votes.split("--" + l).length, $("[data=" + l + "]").attr("title"), (e - a <= o && localStorage.nowp.indexOf($("[data=" + l + "]").attr("title")) == -1) && s.push('{ "uri": "spotify:track:' + $("[data=" + l + "]").attr("title") + '" }');
             });
             $.each(l, function(t, l) {
                 e = localStorage.votes.split("++" + l).length, a = localStorage.votes.split("--" + l).length, $("[data=" + l + "]").attr("title"), (e - a <= (o - 3) && localStorage.nowp.indexOf($("[data=" + l + "]").attr("title")) == -1 && add.toString().indexOf($("[data=" + l + "]").attr("title")) == -1) && add.push('"spotify:track:' + $("[data=" + l + "]").attr("title") + '"');
             });
            var addObj = '{"uris":[' + add + ']}';
             localStorage.addToBottom = add.length;
             console.log(JSON.stringify(addObj));
             console.log(JSON.stringify(s));
             var i = '{"tracks":[' + s + "]}";
             if (1 <= s.length && localStorage.addToBottom != localStorage.oldAddToBottom || add.length > 2) {
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
                                 nextSongs();
                             },
                             error: function(t) {}
                         });
                     },
                     error: function(t) {}
                 });

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
            setTimeout(moveToBottom, 10000);
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
                                            if(!localStorage.current_token)localStorage["current_token"] = d.access_token;
                                            if (localStorage.votes != d.votes) {
                                                   localStorage["votes"] = d.votes;
                                                   calculateVotes();
                                            }
                                            }, error: function (e, ee, eee) {
                                            }
                                            });
                                            };
                              setInterval(findVotes1,7500);
                              setInterval(nextSongs, 15000);
                          findVotes1();
                          socket.on(localStorage.combo + "prev", function(t) {
                                  prev();
                              });
                               socket.on(localStorage.combo + "increment", function(t) {
                                   increment(1);
                               });
                               socket.on(localStorage.combo + "pause", function(t) {
                                   pause();
                               });
                               socket.on(localStorage.combo + "nextSong", function(t) {
                                        now(t.id, 3);
                                    });
                                    socket.on(localStorage.userID + 'newSong', function (data) {

                                                                                  setTimeout(nextSongs, 6000);
                                                                                  setTimeout(nextSongs, 12000);

                                                                        });
                                    nextSongs();

});
