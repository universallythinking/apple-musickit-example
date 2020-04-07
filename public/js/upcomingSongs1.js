$(document).ready(function() {
                  localStorage.combo = localStorage.userID + ":::" + localStorage.password;
    var e = [];
        WEB_SOCKET_SWF_LOCATION = 'https://socketswagger.herokuapp.com/socket.io/inc/WebSocketMain.swf';
                        var socket = io.connect('https://socketswagger.herokuapp.com/');
                              socket.on(localStorage.userID, function (data) {

                                                          //socket.reconnect();

                                                          socket.emit('ready for data', {});

                                                          });

                                                socket.on(localStorage.userID + 'update', function (data) {

                                                          localStorage.votes = data.body.votes;

                                                          calculateVotes();

                                                          console.log("VOTES " + data.body.votes);

                                                          });

                                                socket.on(localStorage.combo + 'test', function (data) {

                                                          setTimeout(calculateVotes, 500);

                                                          console.log("VOTES " + data.body);

                                                });

                                                socket.on(localStorage.combo + 'prev', function (data) {

                                                          setTimeout(function() { prev(); }, 300);

                                                });

                                                socket.on(localStorage.combo + 'nextSong', function (data) {
                                                          var a = data.split(":::")[0];
                                                          console.log(a);
                                                          var e = $("[title=" + a + "]")[0].id.slice(13);

                                                          setTimeout(function() { $("#playNow" + e).click(); }, 100);
                                                          setTimeout(function() { downVoteify(); }, 300);


                                                });

                                                socket.on(localStorage.combo + 'increment', function (data) {

                                                          increment(1);
                                                          setTimeout(function() { reload(); }, 1000);

                                                });

                                                socket.on(localStorage.combo + 'newPlaylist', function (data) {

                                                          localStorage.Snapster = data.split(":::")[0];

                                                          setTimeout(function() { nextSongs(); }, 2000);
                                                          setTimeout(function() { prev(); }, 4000);

                                                });

                                                socket.on(localStorage.combo + 'pause', function (data) {

                                                          pause();

                                                });

                                                socket.on(localStorage.userID + 'newSong', function (data) {

                                                          setTimeout(function() { nextSongs(); }, 3000);

                                                });
                              window.recon = function () {
                                  var socket = io.connect('https://socketswagger.herokuapp.com/');
                              }
                              var socketData = {};
                              socketData.username = localStorage.userID;
                              socketData.combo = localStorage.combo;
                                  $.ajax({
                                      url: "https://socketswagger.herokuapp.com/initiate",
                                      dataType: "json",
                                      data: socketData,
                                      success: function(t) {
                                          console.log("SUCCESS " + t);
                                      },
                                      error: function(err) {
                                          console.log("Error " + JSON.stringify(err));
                                      }
                                  });
        window.inc = function(e) {
                                    var r = {};
                                    //loading();
                                    r.insert_before = 0,
                                        r.range_start = e,
                                        r.range_length = 1,
                                        $.ajax({
                                            async: !0,
                                            type: "PUT",
                                            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
                                            headers: {
                                                Authorization: "Bearer " + localStorage.current_token
                                            },
                                            dataType: "json",
                                            data: JSON.stringify(r),
                                            success: function(e) {
                                                downVoteify(1);
                                            },
                                            error: function(e) {
                                                downVoteify(1);
                                            }
                                        })
                                };
                        window.now = function(a,b) {
                            location.href = "//partymusic://song/" + a;
                            inc(b);
                            calculateVotes();
                        };
    window.isReady = function() {
            return true
        },
        window.rVote = function() {
            parseInt($(".songLinkClick").eq(1).children(".voteUp").text()) < 0 && resetVotes()
        }
        window.nextSong = function(e) {
            //increment(),
            location.href = "//partymusic://" + $(".songLinkClick").eq(1).attr("title");
        }
        localStorage.party && (localStorage.lastFM = localStorage.party),
        localStorage.votedArray || (localStorage.votedArray = " "),
        localStorage.CT1 || (localStorage.CT1 = ""),
        $("#results").empty;
    var t, a, n, o, r;
    localStorage.totalSongs = 0,
        localStorage.currentlyPlayingWC = "",
        localStorage.currentlyPlaying = "",
        localStorage.currentTrack = 0,
        localStorage.offsetNumber = 0,
        $("#nameify").empty(),
        $("#nameify").append("#" + localStorage.party.split(":::")[0].toUpperCase()),
        window.loading = function(e) {
            var t = 1000;
            1 == e && (t = 2500),
                3 == e ? t = 750 : 2 == e && (t = 2e3),
                $("#load").css("visibility", "visible");
                var i = 0;
            var a = setInterval(function() {
                $("#results").children("div").length > 0 && isReady() && setTimeout(function() {
                    document.getElementById("load").style.visibility = "hidden";
                        clearInterval(a);
                }, t);
                if(i == 10) { location.href = "//partymusic://problems"; } else { i++; }
            }, 1000);
        };
    var s = 1,
        i = [];
    window.CT = function() {
            localStorage.userID && localStorage.Snapster && $.ajax({
                async: !0,
                type: "GET",
                url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
                headers: {
                    Authorization: "Bearer " + localStorage.current_token
                },
                dataType: "json",
                data: "formdata",
                success: function(e) {
                    e.items.length >= 100 && ($("#filename").val("Limit of 100 Songs Reached"),
                            $("#filename").css("pointer-events", "none"),
                            $("#filename").css("color", "red")),
                        a = [];
                    for (var t = 0; t < e.items.length; t++)
                        a[t] = e.items[t].track.id;
                    localStorage.CT = a.toString(),
                        1 == s && (i = a,
                            s = 2),
                        a.toString() != i.toString() && (i = a,
                            nextSongs()),
                        a = []
                }
            })
        },
        /*setInterval(function() {
                votes()
        }, 5000);*/
        setInterval(function() {
                flagify()
        }, 10000);
        setInterval(function() {
                    CT()
                }, 30000);
    /*setInterval(function() {
        if (localStorage.votes != localStorage.votes2) {
            calculateVotes();
            localStorage.votes2 = localStorage.votes;
        }
    }, 500);*/
    setInterval(function() {
        updateLSSong()
    }, 1500);

    window.votes = function() {
               /* var r = {};
                r.username = localStorage.userID;
                    $.ajax({
                        url: "https://paywallios.herokuapp.com/get",
                        dataType: "json",timeout:2000,
                        data: r,
                        success: function(e) {
                            localStorage.setItem("nebulous", 1);
                            localStorage.setItem("votes", e.votes);
                        }
                    });*/
                    return false;
    };
    var l2;
    window.nextSongs = function() {
    l2 = [];
            if (isReady()) {
                var e = [];
                $("#results").css("padding-top", "298px !important"),
                    $("#results").css("text-align", "center"),
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
                        localStorage.nowp = t.items[0].track.id;
                        localStorage.nextp = t.items[1].track.id;
                        $("#results").empty();
                            for (var a = 0; a < t.items.length; a++) {
                            if (a == 0) {
                                //$("#results").append('<div title="' + t.items[0].track.id + '" class="songLinkClick next played song-' + 0 + '" id="songLinkClick' + 0 + '" ><div class="voteBtn voteDown"><i class="fa fa-angle-down" aria-hidden="true"></i></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 class="block">' + t.items[0].track.name + '</h5> <p class="block">' + t.items[0].track.artists[0].name + '</p> </div> </div> <div class="voteUp voteBtn"><i class="fa fa-angle-up" aria-hidden="true"></i></div></div>  </div>');
                                $('.player .cover').css('background', 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('+ t.items[0].track.album.images[0].url +') center bottom');
                                $("#song").text(t.items[0].track.name);
                                $("#artist").text(t.items[0].track.artists[0].name);
                                $('.img').eq(a).css('background', 'url('+ t.items[a].track.album.images[0].url +') center center');
                                $('.img').eq(a).css('background-size', 'cover');
                            }
                            else {
                                l2.push(t.items[a].track.id);
                                $("#results").append('<div title="' + t.items[a].track.id + '" name="' + t.items[a].track.popularity + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '" ><div class="voteBtn voteDown"><i class="fa fa-angle-down" aria-hidden="true"></i></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 id="playNow'+a+'" onclick="now(\'' + t.items[a].track.id + '\', ' + a + ')" class="block">' + t.items[a].track.name + '</h5> <p class="block">' + t.items[a].track.artists[0].name + '</p> </div> </div> <div class="voteUp voteBtn"><i class="fa fa-angle-up" aria-hidden="true"></i></div></div>  </div>');
                            }
                             localStorage.CT = l2;
                                addVotes(a);
                                }
                            }
                    }),
                    t = [],
                    a = [],
                    setTimeout(function() { calculateVotes() }, 1000),
                    socket.emit(localStorage.userID+'songChange', {});
                }
        },
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
        },
        window.calculateVotes = function() {
            var t, a;
            l = localStorage.CT.split(","),
                $.each(l, function(e, n) {
                    t = localStorage.votes.split("++" + n).length,
                        a = localStorage.votes.split("--" + n).length,
                        t - a != 0 ? ($("[title=" + n + "]").children(".voteUp").text(t - a),
                            $("[title=" + n + "]").children(".voteUp").attr("name", t - a)) : ($("[title=" + n + "]").children(".voteUp").html("<i class='fa fa-angle-up' aria-hidden='true'></i>"),
                            $("[title=" + n + "]").children(".voteUp").attr("name", t - a))
                });
                $("#results .next").sort(sortSongs).appendTo("#results");
        },
        window.sortSongs = function(a, b) {
        return parseInt($(b).children(".voteUp").attr("name")) - parseInt($(a).children(".voteUp").attr("name")) || parseInt($(b).attr("name")) - parseInt($(a).attr("name")) || $(b).siblings(".songLinkClick").attr("title").charCodeAt(10) < $(a).siblings(".songLinkClick").attr("title").charCodeAt(10) || parseInt($(b).children(".voteUp").prev("div")[0].innerHTML.charCodeAt(10)) - parseInt($(a).children(".voteUp").prev("div")[0].innerHTML.charCodeAt(10))
        },
        Array.max = function(e) {
            return Math.max.apply(Math, e)
        },
        localStorage.votes,
        window.vote = function(e) {
            loading(3);
            var t = {};
            localStorage.votes = localStorage.votes + e;
            t.votes = e;
            t.username = localStorage.userID;
            $.ajax({
                url: "https://paywallios.herokuapp.com/upVote",
                dataType: "json",timeout:2000,
                data: t,
                success: function(t) {
                    addPopularSong(e.slice(2));
                    calculateVotes();
                },
                error: function(err) {
                    addPopularSong(e.slice(2));
                }
            });
        },
        window.updateVotes = function(e) {
            var t = {};
            t.username = localStorage.userID,
                t.votes = e.replace(/\\/g, ""),
                localStorage.votes = t.votes,
                $.ajax({
                    url: "https://paywallios.herokuapp.com/downVote",
                    dataType: "json",timeout:2000,
                    data: t,
                    success: function(e) {
                        calculateVotes()
                    }
                })
        },
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
        },
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
        },
        window.down = function(e) {
            var t = localStorage.nowp,
                a = new RegExp(t, "g"),
                n = new RegExp("", "g"),
                o = localStorage.votes.replace(a, "");
            o = (o = (o += ", --" + t).replace(n, "")).replace(/\\/, ""),
                localStorage.votes = o,
                updateVotes(o);
        },
        window.increment = function(e) {
            location.href = "//partymusic://song/" + $(".songLinkClick").eq(0).attr("title"); //"//partymusic://song/" + $(".songLinkClick").eq(1).attr("title")
            if (parseInt($(".songLinkClick").eq(0).children(".voteUp").attr("name")) > 2) {
                addPopularSong($(".songLinkClick").eq(0).attr("title"));
            };
            var t = localStorage.nowp,
                a = new RegExp(t, "g"),
                n = new RegExp("", "g"),
                o = localStorage.votes.replace(a, "");
            o = (o = (o += ", --" + t).replace(n, "")).replace(/\\/, ""),
                localStorage.votes = o,
                updateVotes(o);
            var r = {};
            loading();
            var s = $(".songLinkClick").eq(0).attr("id");
            s = s.substr(13),
                s *= 1;
            var i = 1 * i;
            r.insert_before = 0,
                r.range_start = s,
                r.range_length = 1,
                $.ajax({
                    async: !0,
                    type: "PUT",
                    url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
                    headers: {
                        Authorization: "Bearer " + localStorage.current_token
                    },
                    dataType: "json",
                    data: JSON.stringify(r),
                    success: function(e) {
                            downVoteify(1);
                    },
                    error: function(e) {
                        downVoteify(1);
                    }
                })
        },
        loading(),
        window.updateLSSong = function() {
            location.href = "//partymusic://updateSong/spotify:track:" + $(".songLinkClick").eq(0).attr("title")
        },
        setInterval(function() {
            rVote()
        }, 3e4),
        setTimeout(function() {
            loading()
        }, 100),
        window.reload = function() {
            location.href = "//partymusic://reload"
        },
        window.playFirst = function() {
            if(localStorage.firstLoad == 0) {
                /*setTimeout(function() {
                //location.href = "//partymusic://song/" + localStorage.nowp;
                }, 6000);*/
                location.href = "//partymusic://playlist/user:" + localStorage.userID + ":playlist:" + localStorage.Snapster;
                localStorage.firstLoad = 1;
            }
            /*else {
                location.href = "//partymusic://playlist/user:" + localStorage.userID + ":playlist:" + localStorage.Snapster;
            }*/
        },
        window.next = function() {
            //increment(),
            setTimeout(function() {
                reload()
            }, 100)
        },
        window.prev = function() {
            location.href = "//partymusic://song/" + localStorage.nowp
        },
        setTimeout(function() {
            1 != localStorage.wasPressed && (localStorage.wasPressed = 1,
                playFirst())
        }, 1000),
        window.pause = function() {
            location.href = "//partymusic://pause"
        },
        window.downVoteify = function(i) {
            if (i == 1) {
            nextSongs();
                setTimeout(function() {
                    location.href = "//partymusic://reload";
                }, 1500);
            } else {
            nextSongs();
                    setTimeout(function() {
                       calculateVotes();
                    }, 1000),
                    setTimeout(function() {
                       down(1);
                    }, 2000),
                    setTimeout(function() {
                        down();
                    }, 7500)
            }
        };
       window.remove = function() {
                                                 var e, t;
                                                 var arrPop = [];
                                                 var arr = localStorage.CT.split(",");
                                                 $.each(arr, function(a, n) {
                                                        e = localStorage.votes.split("++" + n).length;
                                                        t = localStorage.votes.split("--" + n).length;
                                                        var o = $("[title=" + n + "]")[0].id.slice(13);
                                                        if(-3 >= (e - t)) { arrPop.push('{ "uri": "spotify:track:' + n + '" }'); }
                                                 });
                                                        var a = '{"tracks":['+arrPop+']}';
                                                 if(arrPop.length >= 1) {
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
                                                           socket.emit(localStorage.userID+'songChange', {});
                                                           nextSongs();
                                                        },
                                                        error: function(e) {
                                                        }
                                                        });
                                                        }
                                                 };
                                  setTimeout(remove, 4000);
    downVoteify();
    //votes();
});