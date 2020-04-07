                  WEB_SOCKET_SWF_LOCATION = 'https://socketswagger.herokuapp.com/socket.io/inc/WebSocketMain.swf';
                  var socket = io.connect('https://socketswagger.herokuapp.com/');
    window.hideload = function() {
        document.getElementById("load").style.visibility = "hidden";
    };
       setTimeout(function() { if(!localStorage.Snapster){
                localStorage.clear();
                //localStorage.superHost = 1;
                location.href = "https://paywallios.herokuapp.com/loginAndroid.html";
            }
            }, 1);
    //if(!localStorage.firstHide) { setTimeout(hideload, 4000); }
    //else { setTimeout(hideload, 200); }
    window.now = function(a, b) {
    localStorage.firstHide = 1;
        localStorage.nowp = a;
        nextSongsCache();
        location.href = "//partymusic://song/" + a + ":::" + b;
        //if(document.hasFocus()) setTimeout(function() { location.href = location.href; }, 1000);
                setTimeout(function() {
                     socket.emit(localStorage.userID+"songChanged", {body: localStorage.nowp});
                }, 1500);
    };
    window.hashCode = function(s) {
        return s.split("").reduce(function(a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }, 0);
    };
    window.swipeLeft = function(event, direction, distance, duration, fingerCount) {
       if (distance >= $(window).width() / 2.5) {
            $("#mySidenav").css("width", "");
        }
   }
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
        localStorage.searchFlag = false;
        var l2 = [];
        var arr = [];
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
                    //if(t.items.length <= 40) $('.img').eq(a).css('backgroundColor', 'black');
                    //if(t.items.length > 40)
                    $('.img').eq(a).css('background', 'url(' + t.items[a].track.album.images[0].url + ') center center');
                    $('.img').eq(a).css('background-size', 'cover');
                    //if(t.items.length <= 40)
                     $('.player .cover').css('background', 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(' + t.items[a].track.album.images[0].url + ') center top');
                    //if(t.items.length > 40) $('.player .cover').css('backgroundColor', 'black');
                } catch (e) {
                    console.log(e);
                }
            }
            if (t.items[a].track.id != localStorage.nowp && t.items[a].track.id != null && t.items[a].track.id != "null") {
                $("#results").append('<div title="' + t.items[a].track.id + '" name="' + t.items[a].track.popularity + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"><div onclick="addVotes('+a+',0);" class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 onclick="now(\'' + t.items[a].track.id + '\', ' + a + ')"  class="block">' + t.items[a].track.name + '</h5> <p class="block">' + t.items[a].track.artists[0].name + '</p> </div> </div> <div onclick="addVotes('+a+',1);" class="voteUp voteBtn"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div></div>  </div>');
            } else if (t.items[a].track.id != localStorage.nowp && (t.items[a].track.id === null || t.items[a].track.id == "null")) {
                $("#results").append('<div title="' + hashCode(t.items[a].track.name + t.items[a].track.artists[0].name) + '" name="' + t.items[a].track.popularity + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"><div onclick="addVotes('+a+',0);" class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 onclick="now(\'' + t.items[a].track.id + '\', ' + a + ')"  class="block">' + t.items[a].track.name + '</h5> <p class="block">' + t.items[a].track.artists[0].name + '</p> </div> </div> <div onclick="addVotes('+a+',1);" class="voteUp voteBtn"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div></div>  </div>');
            }
            /*$("#songLinkClick" + a).swipe({
                swipeRight: swipeRight
            });*/
            if (t.items[a].track.id != null && t.items[a].track.id != "null") {
                l2.push(t.items[a].track.id);
            } else if ((t.items[a].track.id === null || t.items[a].track.id == "null")) {
                l2.push(hashCode(t.items[a].track.name + t.items[a].track.artists[0].name));
            }
                    //arr1 = arr.splice(arr.length / 2,arr.length);
                    //arr2 = arr.splice(0,arr.length / 2);
                    //setTimeout(function() { $("#results").append(arr); },500);
        localStorage.CT = l2;
        //addVotes(a);
        }
        setTimeout(function() { remove(-3); }, 1500);
        down();
        setTimeout(song, 1000);
    };
    var e = [];
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
    localStorage.CT1;
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
        $("#vote").fadeOut(1250);
    }
                  setTimeout(function() { if($("#results").children("div").length < 4) { loading(); } else { $("#load").fadeOut(500); } }, 500);
    var s = 1;
    i = [];
    window.nextSongs = function() {
        $.ajax({
            async: true,
            type: "GET",
            cache:true,
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?limit=100",
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
    window.addVotes = function(e, i) {
        if(i==1) {
                var t = "++" + $("#results").find("#songLinkClick" + e).attr("title"),
                    a = parseInt($(".songLinkClick").eq(e).children(".voteUp").text());
                vote(t, a);
            } else if (i == 0) {
                var t = "--" + $("#results").find("#songLinkClick" + e).attr("title");
                vote(t, 0);
            }
            calculateVotes();
    };
    if(!localStorage.votes)localStorage.votes="";
    window.calculateVotes = function() {
        var t, a;
        l = localStorage.CT.split(","),
            $.each(l, function(e, n) {
                t = localStorage.votes.split("++" + n).length,
                    a = localStorage.votes.split("--" + n).length,
                    t - a != 0 ? ($("[title=" + n + "]").children(".voteUp").text(t - a),
                        $("[title=" + n + "]").children(".voteUp").attr("name", t - a),
                        $("[title=" + n + "]").children(".voteUp").css("fontWeight", "bold")) :
                        ($("[title=" + n + "]").children(".voteUp").html("<i class='fa fa-thumbs-o-up' aria-hidden='true'></i>"),
                        $("[title=" + n + "]").children(".voteUp").attr("name", t - a));
            });
        $("#results .next").sort(sortSongs).appendTo("#results");
    };
    window.sortSongs = function(a, b) {
        return parseInt($(b).children(".voteUp").attr("name")) - parseInt($(a).children(".voteUp").attr("name")) || parseInt($(b).attr("name")) - parseInt($(a).attr("name")) || $(b).siblings(".songLinkClick").attr("title").charCodeAt(10) < $(a).siblings(".songLinkClick").attr("title").charCodeAt(10) || parseInt($(b).children(".voteUp").prev("div")[0].innerHTML.charCodeAt(10)) - parseInt($(a).children(".voteUp").prev("div")[0].innerHTML.charCodeAt(10));
    };
    localStorage.votes;
    window.vote = function(e, o) {
    localStorage.firstHide = 1;
        var t = {};
        localStorage.votes = localStorage.votes + e;
        calculateVotes();
        t.votes = e;
        t.username = localStorage.userID;
        setTimeout(function() {
        $.ajax({
            url: "https://paywallios.herokuapp.com/upVote",
            dataType: "json",
            data: t,
            success: function(t) {
            //calculateVotes();
            },
            error: function(err) {
            //calculateVotes();
            }
        });
        },500);
    };
    window.updateVotes = function(e) {
        var t = {};
        t.username = localStorage.userID,
            t.votes = e.replace(/\\/g, ""),
            localStorage.votes = t.votes,
            calculateVotes(),
            $.ajax({
                timeout: 2500,
                url: "https://paywallios.herokuapp.com/downVote",
                dataType: "json",
                data: t,
                success: function(e) {

                }
            });
    };
    var r;
    window.remove = function(h) {
        if (parseInt($(".songLinkClick").eq(0).children(".voteUp").attr("name")) < 0) {
            resetVotes();
        }
        if(parseInt($(".songLinkClick").last().children(".voteUp").attr("name")) < h) {
        var limit = -3;
        if (h) limit = h;
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
        var a = '{"tracks":[' + arrPop + ']}';
        if (arrPop.length >= 1) {
            location.href = "//partymusic://newSongAdded";
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
                    socket.emit('newSongAdded', { username: localStorage.userID });
                    setTimeout(function() { location.href = localStorage.urlParts + "/index.html"; }, 750);
                },
                error: function(e) {}
            });
        }
        }
    };
    window.updateNowSong = function() {
                //location.href = "//partymusic://updateSong/spotify:track:" + $(".songLinkClick").eq(0).attr("title")
                location.href = "//partymusic://updateNow/spotify:track:" + $("#song").attr("title")
            };
            window.updateLSSong = function() {
                        location.href = "//partymusic://updateSong/spotify:track:" + $(".songLinkClick").eq(0).attr("title")
                        //location.href = "//partymusic://updateNow/spotify:track:" + $("#song").attr("title")
                    };
    window.removeOne = function(song) {
        var a = '{"tracks":[' + '{ "uri": "spotify:track:' + song + '" }' + ']}';
        location.href = "//partymusic://newSongAdded";
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
                location.href = "//partymusic://newSongAdded";
            },
            error: function(e) {}
        });
    };
    setTimeout(remove, 3000);
    window.voteCookie = function() {
        vote(", ");
    };
    setTimeout(voteCookie, 5000);
    window.down = function(e) {
    var t = $("#song").attr("title"),
            a = new RegExp(t, "g"),
            n = new RegExp("", "g"),
            o = localStorage.votes.replace(a, "");
        o = (o = (o += ", --" + t).replace(n, "")).replace(/\\/, ""),
            localStorage.votes = o,
            updateVotes(o);
    };
    window.increment = function(e) {
    localStorage.firstHide = 1;
        //localStorage.nowp = $(".songLinkClick").eq(0).attr("title");
        if (e === 1 && $(".songLinkClick").eq(0).attr("title") != undefined) {
            location.href = "//partymusic://song/" + $(".songLinkClick").eq(0).attr("title") + ":::12";
            localStorage.nowp = $(".songLinkClick").eq(0).attr("title");
                            setTimeout(function() {
                                 socket.emit(localStorage.userID+"songChanged", {body: localStorage.nowp});
                            }, 1000);
                                setTimeout(nS,500);
                                //setTimeout(down, 800);
                                setTimeout(rVote, 2500);
        }
        if (e === 2 && $(".songLinkClick").eq(0).attr("title") != undefined) {
                    //location.href = "//partymusic://song/" + $(".songLinkClick").eq(0).attr("title") + ":::12";
                    localStorage.nowp = $(".songLinkClick").eq(0).attr("title");
                                   setTimeout(function() {
                                        socket.emit(localStorage.userID+"songChanged", {body: localStorage.nowp});
                                   }, 1000);
                                        setTimeout(nS,500);
                                        //setTimeout(down, 800);
                                        setTimeout(rVote, 2500);
                }
    };

    window.reload = function() {
        location.href = "//partymusic://reload";
    };
    window.playFirst = function() {
            if(!$("#song").attr("title")) {
                            increment(1);
                        } else {
                            location.href = "//partymusic://prettyprev/" + $("#song").attr("title");
                        }
            localStorage.firstLoad = 1;
            //setTimeout(reload, 4000);
    };
    setTimeout(playFirst, 5000);
    window.next = function() {
        if ($(".songLinkClick").eq(0).attr("title")) {
            localStorage.nextUp = $(".songLinkClick").eq(0).attr("title") + ":::" + $(".songLinkClick").eq(0).attr("id").substr(13);
        }
    };
    window.prev = function() {
        if (localStorage.nowp) location.href = "//partymusic://song/" + localStorage.nowp + ":::";
    };
        window.pause = function() {
        //if(localStorage.firstLoad == 1) { prev(); localStorage.firstLoad = 2; }
        //else {
        location.href = "//partymusic://pause";// }
        };
    window.nS = function() {
        if (!localStorage.songList) {
            nextSongs();
        } else {
            nextSongsCache();
        }
    };
    setTimeout(nS, 1000);
    window.downVoteify = function(i) {
        setTimeout(nS, 1000);
        //calculateVotes();
        setTimeout(function() {
            down();
        }, 500);
        setTimeout(function() {
            down();
        }, 7000);
    };
    window.loader = function() {
        downVoteify();
        location.href = "//partymusic://updatePass";
    }
    //setTimeout(downVoteify, 500);
    window.song = function() {
        var r = {};
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
    };
    var hashCodeNum = function(str) {
      var hash = 0, i, chr;
      if (str.length === 0) return hash;
      for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    };
    if(!localStorage.hashNum) {
       localStorage.hashNum = hashCodeNum(new Date().getTime().toString());
       /*pause();
       setTimeout(function() { increment(1); }, 5000);*/
    }
    setTimeout(song, 7000);
    window.reload = function() {
        location.href = "//partymusic://reloader";
    }
    setTimeout(function () { if($("#song").text.length < 1) { increment(1); } }, 9000);
    setTimeout(function () { if($("#song").text.length < 1) { increment(1); } }, 12000);
    //setTimeout(function () { location.href = localStorage.urlParts + "/indexOld.html";  }, 12000);
      window.findParty = function (a) {
                          var object = {}
                          object.party = localStorage.party.split(":::")[0];
                          $.ajax({
                          url: "https://paywallios.herokuapp.com/find",
                          data: object,
                          cache:true,
                                          async: true,
                          timeout:10000,
                          dataType: "json",
                          success: function (d) {
                          if (localStorage.votes != d.votes || a == 1) {
                                 localStorage["votes"] = d.votes;
                                 nextSongs();
                          } else {
                                 nextSongsCache();
                                 }
                          }, error: function (e, ee, eee) {
                          }
                          });
                          }