$(document).on("ready", function() {
    WEB_SOCKET_SWF_LOCATION = 'http://socketswagger.herokuapp.com/socket.io/inc/WebSocketMain.swf';
    var socket = io.connect('http://socketswagger.herokuapp.com/');
    window.Scroll = function() {
            if ($(window).scrollTop() > (window.innerHeight / 3)) {
                if (!$("#playNextButton").hasClass("affix")) {
                    $("#playNextButton").hide();
                    setTimeout(function() {
                        $("#playNextButton").addClass("affix");
                        $("#playNextButton").fadeIn(1000);
                    }, 250);
                }
            } else if ($(window).scrollTop() <= (window.innerHeight / 3)) {
                if ($("#playNextButton").hasClass("affix")) {
                    $("#playNextButton").hide();
                    setTimeout(function() {
                        $("#playNextButton").removeClass("affix");
                        $("#playNextButton").fadeIn(1000);
                    }, 250);
                }
            }
        }
        //$(window).on('scroll', scroller);
    document.addEventListener("touchmove", Scroll, false);
    document.addEventListener("scroll", Scroll, false);
    window.verif = function(e) {
        if (!Cookies.get("verified")) return document.getElementById("verify").style.visibility = "hidden", $("#modalTerms").click(), !1;
        Cookies.get("verified") && $("#verify").hide()
    }, localStorage.tictic || ($("#verify").hide(), setTimeout(function() {
        localStorage.tictic = 0
    }, 8e3)), Cookies.get("verified") ? (document.getElementById("termsModal").style.visibility = "hidden", $("#verify").hide()) : parseInt(localStorage.tictic) < 5 ? (localStorage.tictic = parseInt(localStorage.tictic) + 1, setTimeout(function() {}, 3e4)) : setTimeout(function() {}, 3e4), window.purchase = function() {
        location.href = "partymusic://25actions", Cookies.set("purchbtn", "true", {
            expires: 1
        }), setTimeout(function() {
            $("#dismissModal").click()
        }, 1500)
    }
    $.ajax({
        async: !0,
        type: "GET",
        url: "https://api.spotify.com/v1/me",
        headers: {
            Authorization: "Bearer " + localStorage.current_token
        },
        dataType: "json",
        data: "formdata",
        success: function(e) {},
        error: function(err) {
            if (err.status.toString() === "401") {
                playerToken();
            }
        }
    })
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
                location.reload();
            }
        });
    }, window.restore = function() {
        Cookies.get("purchbtn") && !Cookies.get("karma") && (location.href = "partymusic://checkpurchases")
    }, window.actions = function(e) {
        1 == e ? (Cookies.set("karma", "25", {
            expires: 30
        }), Cookies.set("verified", "25", {
            expires: 30
        }), localStorage.maxKarma = 25, localStorage.karma = 25) : 2 == e ? (Cookies.set("karma", "25", {
            expires: 30
        }), Cookies.set("verified", "25", {
            expires: 30
        }), localStorage.maxKarma = 25, localStorage.karma = 25) : 3 == e ? ((Cookies.get("karma") || karma) && Cookies.get("verified") || setTimeout(function() {
            location.reload()
        }, 1e3), Cookies.set("karma", "25", {
            expires: 30
        }), Cookies.set("verified", "25", {
            expires: 30
        }), localStorage.maxKarma = 25, localStorage.karma = 25) : 7 == e && (Cookies.set("karma", "7", {
            expires: 30
        }), Cookies.set("verified", "25", {
            expires: 30
        }), localStorage.maxKarma = 7, localStorage.karma = 7)
    }, window.checkReceipt = function(e, t) {
        window.receiptData = {}, receiptData["receipt-data"] = t, receiptData.password = e, $.ajax({
            type: "POST",
            url: "https://buy.itunes.apple.com/verifyReceipt",
            data: JSON.stringify(receiptData),
            success: function(e) {
                0 == (e = JSON.parse(e)).status ? actions("3") : 21007 == e.status ? $.ajax({
                    type: "POST",
                    url: "https://sandbox.itunes.apple.com/verifyReceipt",
                    data: JSON.stringify(receiptData),
                    success: function(e) {
                        0 == (e = JSON.parse(e)).status ? actions("3") : Cookies.get("karma")
                    },
                    error: function(e) {}
                }) : Cookies.get("karma")
            },
            error: function(e) {}
        })
    }, window.createCookie = function(e, t, a) {
        var o = "";
        if (a) {
            var s = new Date;
            s.setTime(s.getTime() + 24 * a * 60 * 30 * 1e3), o = "; expires=" + s.toUTCString()
        }
        document.cookie = e + "=" + t + o + "; path=/"
    }, window.restoreBtn = function() {
        location.href = "partymusic://checkpurchases"
    }, $("#verify").on("click", function(e) {
        e.preventDefault(), verif()
    }), setTimeout(function() {
        $("#song").text.length < 2 && nS()
    }, 3e3), 3 < $("#results").children("div").length && setTimeout(remove, 3e3), localStorage.votes || (localStorage.votes = ""), localStorage.CT || (localStorage.CT = ""), localStorage.combo = localStorage.userID + ":::" + localStorage.password;
    var userID, baseURL, searchQry, myDataLength, partyPlaylist, hashCodeNum = function(e) {
            var t, a = 0;
            if (0 === e.length) return a;
            for (t = 0; t < e.length; t++) a = (a << 5) - a + e.charCodeAt(t), a |= 0;
            return a
        },
        tick = 0;
    localStorage.hashNum || (localStorage.hashNum = hashCodeNum((new Date).getTime().toString())), window.recon = function() {
        var e = {};
        e.combo = localStorage.combo, e.username = localStorage.userID, e.hash = localStorage.hashNum, $.ajax({
            url: "http://socketswagger.herokuapp.com/start",
            dataType: "json",
            data: e,
            success: function(e) {
                console.log("SUCCESS " + e)
            },
            error: function(e) {
                console.log("Error " + JSON.stringify(e))
            }
        }), setTimeout(function() {
            socket.on(localStorage.userID, function(e) {
                socket.emit("ready for data", {})
            }), socket.on(localStorage.userID + "updateios", function(e) {
                10 < e.body.length && (localStorage.votes = e.body), calculateVotes(), console.log("VOTES " + e.body.votes)
            }), socket.on(localStorage.combo + "test", function(e) {
                setTimeout(calculateVotes, 500), console.log("VOTES " + e.body)
            }), socket.on(localStorage.userID + "songChange", function(e) {}), socket.on(localStorage.userID + "newPlaylist", function(e) {
                localStorage.Snapster != e && 6 < e.length && (localStorage.Snapster = e, localStorage.removeItem("nowp"), localStorage.removeItem("songList"), setTimeout(function() {
                    location.href = location.href
                }, 2e3))
            }), socket.on(localStorage.userID + "newSong", function(e) {
                1 != localStorage.searchFlag && setTimeout(nextSongs, 3e3)
            }), socket.on(localStorage.userID + "newVotes", function(e) {
                setTimeout(findVotes1, 250)
            })
        }, 1)
    }, recon(), window.resetVotes = function() {
        localStorage.votes = "", localStorage.setItem("STOP", "true");
        var e = {};
        e.username = localStorage.userID, $.ajax({
            url: "https://paywallios.herokuapp.com/clearVotes",
            dataType: "json",
            data: e,
            success: function(e) {
                localStorage.votes = "", calculateVotes()
            },
            error: function(e) {
                localStorage.votes = "", calculateVotes()
            }
        })
    };
    var listOfTracks = [];
    $("#filename").on("blur", function() {}), $("#search").on("click", function(e) {
            e.preventDefault(),
                $("#filename").show(), $("#filename").focus()
        }), $("#filename").on("keypress", function() {
            if ($("#html").scroll(function(e) {
                    e.preventDefault(), e.stopPropogagtion()
                }), 13 === event.which)
                if (localStorage.searchFlag = !0, $("#filename").blur(), "logout." == document.getElementById("filename").value.toLowerCase() && "false" != localStorage.complete_access && 0 != localStorage.complete_access) localStorage.clear(), location.href = "https://www.spotify.com/us/logout";
                else if ("fullscreen." == document.getElementById("filename").value.toLowerCase() || "fs." == document.getElementById("filename").value.toLowerCase()) document.getElementById("html"), document.fullScreenElement && null !== document.fullScreenElement || !document.mozFullScreen && !document.webkitIsFullScreen ? document.documentElement.requestFullScreen ? document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen && document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen(), document.getElementById("filename").value = "", nextSongs();
            else if ("c." == document.getElementById("filename").value.toLowerCase()) localStorage.votedArray = "", window.location.reload();
            else if ("clear votes." == document.getElementById("filename").value.toLowerCase()) resetVotes();
            else if ("temp." == document.getElementById("filename").value.toLowerCase()) localStorage.setItem("temp", !0);
            else if ("cp." == document.getElementById("filename").value.toLowerCase() || "change playlist." == document.getElementById("filename").value.toLowerCase()) location.href = "playlists.html";
            else if ("admin." == document.getElementById("filename").value.toLowerCase() || "change party name." == document.getElementById("filename").value.toLowerCase()) location.href = "welcome.html";
            else if ("i really want unlimited voting." == document.getElementById("filename").value.toLowerCase() || "uv." == document.getElementById("filename").value.toLowerCase()) resetVotes(1), localStorage.setItem("uv", "true");
            else if ("reload." == document.getElementById("filename").value.toLowerCase()) loading(), reload();
            else if ("leave party." == document.getElementById("filename").value.toLowerCase()) loading(), window.localStorage.clear("CT"), window.localStorage.clear("Snapster"), window.localStorage.clear("clicked"), window.localStorage.clear("currentTrack"), window.localStorage.clear("current_token"), window.localStorage.clear("complete_access"), window.localStorage.clear("currentlyPlaying"), window.localStorage.clear("currentlyPlayingID"), window.localStorage.clear("currentlyPlayingWC"), window.localStorage.clear("explicit"), window.localStorage.clear("host"), window.localStorage.clear("myData"), window.localStorage.clear("lastFM"), window.localStorage.clear("partyid"), window.localStorage.clear("offsetNumber"), window.localStorage.clear("totalSongs"), window.localStorage.clear("url"), window.localStorage.clear("userID"), window.location.href = "/thank-you-host.html";
            else if (document.getElementById("filename").value.toLowerCase() == localStorage.password.toString().toLowerCase() + ".") localStorage.power_voter = "yes", location.reload();
            else if ("" == document.getElementById("filename").value) nextSongs(), $("#searchResults").empty();
            else if (localStorage.Snapster) try {
                $("#searchResults").css("display", "block"), partyPlaylist = [], baseURL = "https://api.spotify.com/v1/users/", userID = localStorage.userID, searchQry = document.getElementById("filename").value.toLowerCase(),
                    $.ajax({
                        async: !0,
                        type: "GET",
                        url: "https://api.spotify.com/v1/search?q=" + searchQry + "&type=track,artist&market=us&limit=50&offset=0",
                        headers: {
                            Authorization: "Bearer " + localStorage.current_token
                        },
                        dataType: "json",
                        data: "formdata",
                        success: function(s) {
                            console.log(JSON.stringify(s));
                            $("#searchResults").empty();
                            for (var t = 0; t < s.tracks.items.length; t++) "true" != localStorage.explicit && 1 != localStorage.explicit ? (0 == s.tracks.items[t].explicit || "false" == s.tracks.items[t].explicit && -1 == localStorage.CT.indexOf(s.tracks.items[t].id.substring(1, 5))) && $("#searchResults").append('<div onclick="newSong( ' + t + ' )" title="' + s.tracks.items[t].id + '" data="' + s.tracks.items[t].id.substring(1, 5) + '" name="https://api.spotify.com/v1/users/' + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?&uris=spotify%3Atrack%3A" + s.tracks.items[t].id + '"   class="songLinkClick1 next played song-' + t + '" id="songLinkClick111' + t + '"> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 title="' + s.tracks.items[t].id + '"  class="block">' + s.tracks.items[t].name + '</h5><p class="block"><span class="artistName">' + s.tracks.items[t].artists[0].name + '</span> <span class="albumName"> &#183; ' + s.tracks.items[t].album.name + '</span></p> </div> <div class="buttons"> <div ontouchstart="vote(\'' + s.tracks.items[t].id + '\', 0)" class="voteBtn voteDown"></div><div class="voteUp voteBtn" name="0"></div><sup></sup></div></div></div>') : -1 == localStorage.CT.indexOf(s.tracks.items[t].id.substring(1, 5)) && $("#searchResults").append('<div onclick="newSong( ' + t + ' )" title="' + s.tracks.items[t].id + '" data="' + s.tracks.items[t].id.substring(1, 5) + '" name="https://api.spotify.com/v1/users/' + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?&uris=spotify%3Atrack%3A" + s.tracks.items[t].id + '"   class="songLinkClick1 next played song-' + t + '" id="songLinkClick111' + t + '"> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 title="' + s.tracks.items[t].id + '"  class="block">' + s.tracks.items[t].name + '</h5><p class="block"><span class="artistName">' + s.tracks.items[t].artists[0].name + '</span> <span class="albumName"> &#183; ' + s.tracks.items[t].album.name + '</span></p> </div> <div class="buttons"> <div ontouchstart="vote(\'' + s.tracks.items[t].id + '\', 0)" class="voteBtn voteDown"></div><div class="voteUp voteBtn" name="0"></div><sup></sup></div></div></div>');
                            $("#all").fadeIn(1e3)
                        }
                    });
            } catch (t) {}
        }), window.newSong = function(t) {
            var e = "++" + $("#songLinkClick111" + t).attr("data");
            if (localStorage.CT.indexOf($("#songLinkClick111" + t).attr("data")) == -1) {
                socket.emit("newSongAdded", {
                    username: localStorage.userID
                }), localStorage.CT = localStorage.CT + "," + $("#songLinkClick111" + t).attr("data"), vote(e), $.ajax({
                    type: "POST",
                    url: $("#songLinkClick111" + t).attr("name") + "&position=3",
                    headers: {
                        Authorization: "Bearer " + localStorage.current_token
                    },
                    dataType: "json",
                    data: "formdata",
                    success: function(t) {
                        nextSongs()
                    },
                    error: function(t) {
                        nextSongs()
                    }
                })
            } else {
                vote(e);
            }
        },
        window.hideload = function() {
            document.getElementById("load").style.visibility = "hidden"
        }, window.now = function(e, t) {
            localStorage.firstHide = 1, localStorage.nowp = e, nS(), location.href = "partymusic://song/" + e + ":::" + t, socket.emit(localStorage.userID + "songChanged", {}), nextSongsCache()
        }, window.hashCode = function(e) {
            return e.split("").reduce(function(e, t) {
                return (e = (e << 5) - e + t.charCodeAt(0)) & e
            }, 0)
        }, window.swipeLeft = function(e, t, a, o, s) {
            a >= $(window).width() / 2.5 && $("#mySidenav").css("width", "")
        }, window.swipeRight = function(e, t, a, o, s) {
            if (a >= $(window).width() / 1.5) $(this).css("padding-left", a + "px"), removeOne($(this).attr("title"));
            else if (a >= $(window).width() / 50) {
                var l = this;
                $(this).css("padding-left", a + "px"), setTimeout(function() {
                    $(l).css("padding-left", "")
                }, 200)
            }
        }, window.nextSongsCache = function() {
            localStorage.searchFlag = !1;
            var t = [],
                s = JSON.parse(localStorage.songList);
            $("#results").css("padding-top", "298px !important"), $("#results").css("text-align", "center"), $("#results").empty(), localStorage.nowp || null == s.items[0].track.id || "null" == s.items[0].track.id ? localStorage.nowp || null != s.items[0].track.id && "null" != s.items[0].track.id || (localStorage.nowp = hashCode(s.items[0].track.name + s.items[0].track.artists[0].name)) : localStorage.nowp = s.items[0].track.id;
            for (var a = 0; a < s.items.length; a++) {
                if (s.items[a].track.id == localStorage.nowp || localStorage.nowp == hashCode(s.items[a].track.name + s.items[a].track.artists[0].name)) try {
                    $("#song").text(s.items[a].track.name), $("#song").attr("title", s.items[a].track.id), $("#song").attr("data", s.items[a].track.id.substring(1, 5)), $("#artist").text(s.items[a].track.artists[0].name),$('#albumDiv').css('background', 'url(' + t.items[a].track.album.images[0].url + ') center center'),
                                                                                                                                                                                                                                          $('#albumDiv').css('background-size', 'contain')
                } catch (err) {}
                s.items[a].track.id != localStorage.nowp && null != s.items[a].track.id && "null" != s.items[a].track.id ? ($("#results").append('<div title="' + s.items[a].track.id + '" data="' + s.items[a].track.id.substring(1, 5) + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 onclick="now(\'' + s.items[a].track.id + "', " + a + ')" class="block">' + s.items[a].track.name + '</h5> <p class="block"><span class="artistName">' + s.items[a].track.artists[0].name + '</span> <span class="albumName">&#183; ' + s.items[a].track.album.name + '</span></p> </div> <div class="buttons"><div ontouchstart="vote(\'--' + s.items[a].track.id.substring(1, 5) + '\', 0)" class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div><div ontouchstart="vote(\'++' + s.items[a].track.id.substring(1, 5) + '\', 1)" class="voteUp voteBtn" name="0"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div><sup></sup></div></div></div>'), null != s.items[a].track.id && "null" != s.items[a].track.id ? t.push(s.items[a].track.id.substring(1, 5)) : null !== s.items[a].track.id && "null" != s.items[a].track.id || t.push(hashCode(s.items[a].track.name + s.items[a].track.artists[0].name).substring(1, 5))) : $("#results").append('<div title="' + hashCode(s.items[a].track.name + s.items[a].track.artists[0].name + '" data="' + s.items[a].track.id.substring(1, 5) + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 onclick="now(\'' + s.items[a].track.id + "', " + a + ')" class="block">' + s.items[a].track.name + '</h5> <p class="block"><span class="artistName">' + s.items[a].track.artists[0].name + '</span> <span class="albumName">&#183; ' + s.items[a].track.album.name + '</span></p> </div><div class="buttons"><div ontouchstart="vote(\'--' + s.items[a].track.id.substring(1, 5) + '\', 0)" class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div><div ontouchstart="vote(\'++' + s.items[a].track.id.substring(1, 5) + '\', 1)" class="voteUp voteBtn" name="0"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div><sup></sup></div></div></div>'), null != s.items[a].track.id && "null" != s.items[a].track.id ? t.push(s.items[a].track.id.substring(1, 5)) : null !== s.items[a].track.id && "null" != s.items[a].track.id || t.push(hashCode(s.items[a].track.name + s.items[a].track.artists[0].name).substring(1, 5))), null != s.items[a].track.id && "null" != s.items[a].track.id ? t.push(s.items[a].track.id.substring(1, 5)) : null !== s.items[a].track.id && "null" != s.items[a].track.id || t.push(hashCode(s.items[a].track.name + s.items[a].track.artists[0].name).substring(1, 5)), localStorage.CT = t
            }
            calculateVotes()
        };
    var t, a, n, o, e = [];
    window.isReady = function() {
        return !0
    }, window.rVote = function() {
        parseInt($(".songLinkClick").eq(1).children(".voteUp").text()) < 0 && resetVotes()
    }, window.nextSong = function(e) {
        location.href = "partymusic://" + $(".songLinkClick").eq(1).attr("title")
    }, localStorage.party && (localStorage.lastFM = localStorage.party), localStorage.votedArray || (localStorage.votedArray = " "), localStorage.CT1, $("#results").empty, localStorage.totalSongs = 0, localStorage.currentlyPlayingWC = "", localStorage.currentlyPlaying = "", localStorage.currentTrack = 0, localStorage.offsetNumber = 0, window.loading = function() {
        $("#load").show(), $("#load").fadeOut(2e3)
    }, window.votedImg = function() {
        $("#vote").show(), setTimeout(function() {
            $("#vote").fadeOut(1250)
        }, 50)
    }, setTimeout(function() {
        $("#results").children("div").length < 4 ? loading() : $("#load").fadeOut(500)
    }, 500);
    var r, s = 1;
    if (i = [], window.nextSongs = function() {
            $.ajax({
                async: !0,
                type: "GET",
                url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?offset=" + localStorage.offsetNumber,
                headers: {
                    Authorization: "Bearer " + localStorage.current_token
                },
                dataType: "json",
                data: "formdata",
                success: function(e) {
                    localStorage.songList = JSON.stringify(e), nextSongsCache()
                },
                error: function(err) {
                    if (err.status.toString() === "401") {
                        playerToken();
                    }
                }
            })
        }, window.addVotes = function(e) {
            $("#songLinkClick" + e).children(".voteUp").click(function() {
                var t = "++" + $("#results").find("#songLinkClick" + e).attr("data"),
                    a = parseInt($(".songLinkClick").eq(e).children(".voteUp").text());
                vote(t, a)
            }), $("#songLinkClick" + e).children(".voteDown").click(function() {
                var t = "--" + $("#results").find("#songLinkClick" + e).attr("data");
                vote(t, 0)
            })
        }, window.calculateVotes = function() {
            console.log("CV1");
            var t, e;
            l = localStorage.CT.split(","), $.each(l, function(a, o) {
                t = localStorage.votes.split("++" + o).length, e = localStorage.votes.split("--" + o).length, t - e != 0 ? ($("[data=" + o + "]").find("sup").text(t - e), $("[data=" + o + "]").find(".voteUp").attr("name", t - e), $("[data=" + o + "]").find(".voteUp").css("fontWeight", "bold")) : ($("[data=" + o + "]").find(".voteUp").html("<i class='fa fa-thumbs-o-up' aria-hidden='true'></i>"), $("[data=" + o + "]").find(".voteUp").attr("name", t - e), $("[data=" + o + "]").find("sup").text(""))
            }), $("#results .next").sort(sortSongs).appendTo("#results");
            return t + e
        }, window.sortSongs = function(a, b) {
            return parseInt($(b).find(".voteUp").attr("name")) - parseInt($(a).find(".voteUp").attr("name")) || parseInt($(b).attr("name")) - parseInt($(a).attr("name")) || $(b).siblings(".songLinkClick").attr("data").charCodeAt(3) < $(a).siblings(".songLinkClick").attr("data").charCodeAt(3) || parseInt($(b).find(".voteUp").prev("div")[0].innerHTML.charCodeAt(10)) - parseInt($(a).find(".voteUp").prev("div")[0].innerHTML.charCodeAt(10))
        }, localStorage.votes, window.vote = function(e) {
            7 < e.length && votedImg(), localStorage.firstHide = 1;
            var t = {};
            socket = io.connect('https://socketswagger.herokuapp.com/', {
                transports: ['websocket']
            });
            socket.emit('newVote', {
                username: localStorage.userID
            });
            localStorage.votes = localStorage.votes + e, calculateVotes(), t.votes = e, t.username = localStorage.userID, $.ajax({
                url: "https://paywallios.herokuapp.com/upVote",
                dataType: "json",
                data: t,
                success: function(e) {},
                error: function(e) {}
            })
        }, window.updateVotes = function(e) {
            var t = {};
            t.username = localStorage.userID, t.votes = e.replace(/\\/g, ""), localStorage.votes = t.votes, $.ajax({
                timeout: 2500,
                url: "https://paywallios.herokuapp.com/downVote",
                dataType: "json",
                data: t,
                success: function(e) {
                    calculateVotes()
                }
            })
        }, window.remove = function(e) {
            parseInt($(".songLinkClick").eq(0).children(".voteUp").attr("name")) < 0 && resetVotes();
            var t, a, o = -3;
            e && (o = e);
            var s = [],
                l = localStorage.CT.split(",");
            $.each(l, function(e, l) {
                t = localStorage.votes.split("++" + l).length, a = localStorage.votes.split("--" + l).length, $("[data=" + l + "]").attr("data"), t - a <= o && s.push('{ "uri": "spotify:track:' + $("[data=" + l + "]").attr("title") + '" }')
            });
            var i = '{"tracks":[' + s + "]}";
            1 <= s.length && (location.href = "partymusic://newSongAdded", $.ajax({
                async: !0,
                type: "DELETE",
                url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
                headers: {
                    Authorization: "Bearer " + localStorage.current_token
                },
                contentType: "application/json",
                data: i,
                success: function(e) {
                    nextSongs(), socket.emit("newSongAdded", {
                            username: localStorage.userID
                        })
                        /*setTimeout(function() {
                                                                                                                                         location.href = localStorage.urlParts + "/index.html"
                                                                                                                                         }, 750)*/
                },
                error: function(e) {}
            }))
        }, window.removeOne = function(e) {
            var t = '{"tracks":[{ "uri": "spotify:track:' + e + '" }]}';
            location.href = "partymusic://newSongAdded", $.ajax({
                async: !0,
                type: "DELETE",
                url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
                headers: {
                    Authorization: "Bearer " + localStorage.current_token
                },
                contentType: "application/json",
                data: t,
                success: function(e) {
                    nextSongs(), location.href = "partymusic://newSongAdded"
                },
                error: function(e) {}
            })
        }, window.voteCookie = function() {
            vote(", ")
        }, setTimeout(voteCookie, 5e3), window.down = function(e) {
            var t = $("#song").attr("data"),
                a = new RegExp(t, "g"),
                o = new RegExp("", "g"),
                s = localStorage.votes.replace(a, "");
            s = (s = (s += ", --" + t).replace(o, "")).replace(/\\/, ""), localStorage.votes = s, updateVotes(s)
        }, window.increment = function(e) {
            localStorage.firstHide = 1, localStorage.nowp = $(".songLinkClick").eq(0).attr("data"), 1 === e && null != $(".songLinkClick").eq(0).attr("title") && (location.href = "partymusic://song/" + $(".songLinkClick").eq(0).attr("title") + ":::12", localStorage.nowp = $(".songLinkClick").eq(0).attr("title"), nextSongsCache(), socket.emit(localStorage.userID + "songChanged", {}))
        }, window.reload = function() {
            location.href = "partymusic://reload"
        }, window.playFirst = function() {
            0 == localStorage.firstLoad && (setTimeout(function() {
                increment(1)
            }, 1e3), localStorage.firstLoad = 1, setTimeout(reload, 4e3))
        }, window.next = function() {
            $(".songLinkClick").eq(0).attr("title") && (localStorage.nextUp = $(".songLinkClick").eq(0).attr("title") + ":::" + $(".songLinkClick").eq(0).attr("id").substr(13))
        }, window.prev = function() {
            localStorage.nowp && (location.href = "partymusic://song/" + localStorage.nowp + ":::")
        }, setTimeout(function() {
            1 != localStorage.wasPressed && (localStorage.wasPressed = 1, playFirst())
        }, 1e3), window.pause = function() {
            location.href = "partymusic://pause"
        }, window.nS = function() {
            localStorage.songList ? nextSongsCache() : nextSongs()
        }, setTimeout(nS, 1e3), window.downVoteify = function(e) {
            setTimeout(function() {
                down()
            }, 500), setTimeout(function() {
                down()
            }, 7e3), setTimeout(moveToBottom, 10000)
        }, window.loader = function() {
            downVoteify(), location.href = "partymusic://updatePass"
        }, setTimeout(downVoteify, 500), window.song = function() {
            var e = {};
            e.username = localStorage.userID, e.song = localStorage.nowp || $("#song").attr("title"), $.ajax({
                url: "https://paywallios.herokuapp.com/song",
                dataType: "json",
                data: e,
                timeout: 12e3,
                success: function(e) {}
            })
        }, hashCodeNum = function(e) {
            var t, a = 0;
            if (0 === e.length) return a;
            for (t = 0; t < e.length; t++) a = (a << 5) - a + e.charCodeAt(t), a |= 0;
            return a
        }, localStorage.hashNum || (localStorage.hashNum = hashCodeNum((new Date).getTime().toString())), setTimeout(song, 7e3), window.reload = function() {
            location.href = "partymusic://reloader"
        }, setTimeout(function() {
            $("#song").text.length < 1 && increment(1)
        }, 4e3), setTimeout(function() {
            $("#song").text.length < 1 && increment(1)
        }, 9e3), setTimeout(function() {
            $("#song").text.length < 1 && increment(1)
        }, 12e3), localStorage.explicit && localStorage.Snapster && localStorage.current_token && localStorage.party && localStorage.userID && localStorage.password) {
        var party, userPrompt;
        localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
        var obj2 = {};
        window.newToken = function() {
            $.ajax({
                type: "GET",
                url: "https://paywallios.herokuapp.com/refresh_token",
                data: {
                    refresh_token: localStorage.refresh_token
                },
                timeout: 2e3
            }).done(function(e) {
                access_token = e.access_token, localStorage.current_token = e.access_token, setTimeout(function() {
                    create()
                }, 5e3)
            })
        }, newToken(), window.create = function() {
            localStorage.valid = "true", localStorage.userID || $.ajax({
                async: !0,
                type: "GET",
                url: "https://api.spotify.com/v1/me",
                headers: {
                    Authorization: "Bearer " + localStorage.current_token
                },
                dataType: "json",
                data: "formdata",
                success: function(e) {
                    localStorage.userID = e.id, userID = localStorage.userID, localStorage.valid = "true"
                },
                error: function() {}
            }), 3 < localStorage.party.length && 3 < localStorage.password.length && (obj2.party = localStorage.party.split(":::")[0], obj2.playlist = localStorage.Snapster + ":::" + localStorage.Snapster2, obj2.access_token = localStorage.current_token, obj2.username = localStorage.userID, obj2.explicit = localStorage.explicit, obj2.superpowers = localStorage.password, obj2.refresh_token = localStorage.refresh_token, $.ajax({
                dataType: "json",
                data: obj2,
                url: "https://paywallios.herokuapp.com/create",
                timeout: 2e3,
                success: function(e) {},
                error: function() {}
            }))
        }, window.kill = function() {
            3 < localStorage.party.length && 3 < localStorage.password.length && (obj2.party = localStorage.party.split(":::")[0] + "NEVERFIND", obj2.playlist = localStorage.Snapster + ":::" + localStorage.Snapster2, obj2.access_token = localStorage.current_token, obj2.username = localStorage.userID, obj2.explicit = localStorage.explicit, obj2.superpowers = localStorage.password, obj2.refresh_token = localStorage.refresh_token, $.ajax({
                dataType: "json",
                data: obj2,
                url: "https://paywallios.herokuapp.com/create",
                timeout: 2e3,
                success: function(e) {},
                error: function() {}
            }))
        }, setTimeout(function() {
            create()
        }, 15e3)
    }
    localStorage.setItem("host", !0), localStorage.setItem("allowed", !0), localStorage.removeItem("Snapster2");
    var flag = !1;
    window.start = function() {
        localStorage.userID || $.ajax({
            async: !0,
            type: "GET",
            url: "https://api.spotify.com/v1/me",
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            dataType: "json",
            data: "formdata",
            success: function(e) {
                localStorage.userID = e.id, userID = localStorage.userID, localStorage.valid = "true"
            },
            error: function() {}
        })
    }, start();
    var access_token = localStorage.current_token,
        playlists = [],
        date = (new Date).toLocaleDateString(),
        mostVoted = "Most Voted " + date.split("/")[0] + "/" + date.split("/")[2];
    window.loadLists = function() {
        setTimeout(function() {
            $.ajax({
                async: !0,
                type: "GET",
                url: "https://api.spotify.com/v1/search?q=party&type=playlist&limit=20",
                headers: {
                    Authorization: "Bearer " + localStorage.current_token
                },
                dataType: "json",
                data: "formdata",
                success: function(e) {
                    e = e.playlists, arr = [], $("#Home").append("<header onclick='stay();' style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: -50px;' class='songLinkClick1 items'><div><center class='items' style='font-size: 200%; padding-bottom: 50px; padding-top: -50px; '>Spotify Playlists</center></div></header><h1></h1><h1></h1>"), localStorage.Snapster && $("#Home").append("<div name='currentPlaylist' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='#'/></div></div><div class='playlist-desc'><h3></h3><h3></h3><h5>Current Playlist</h5><p>...</p></div></div></div>");
                    for (var t = 0; t < e.items.length; t++) $("#Home").append("<div onclick='clone(\"" + e.items[t].id.toString() + "\", \"spotify\");' name='" + e.items[t].id.toString() + "' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + e.items[t].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3></h3><h3></h3><h5>" + e.items[t].name + "</h5><p>" + e.items[t].tracks.total + " Total Songs</p></div></div></div>");
                    $(".items").wrapAll("<div id='playlistContainer'></div>")
                }
            })
        }, 2000), setTimeout(function() {
            localStorage.userID && $.ajax({
                async: !0,
                type: "GET",
                url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists?limit=50",
                headers: {
                    Authorization: "Bearer " + localStorage.current_token
                },
                dataType: "json",
                data: "formdata",
                success: function(e) {
                    $("#Home").append("<header onclick='stay();' style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: -50px;' class='songLinkClick1 items playlist'><div><center class='items' style='font-size: 200%; padding-top: 50px; padding-bottom: 50px;'>Your Playlists</center></div></header>"), localStorage.Snapster && $("#Home").append("<div name='currentPlaylist' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='/greeny.png'/></div></div><div class='playlist-desc'><h3></h3><h3></h3><h5>Current Playlist</h5><p>...</p></div></div></div>");
                    for (var t = 0; t < e.items.length; t++) e.items[t].name == mostVoted && (flag = !0, localStorage.Snapster2 = e.items[t].id.toString()), "Swagger Jukebox" == e.items[t].name && (localStorage.clearPlaylist = e.items[t].id.toString()), e.items[t].owner.id == localStorage.userID && null != e.items[t].images[0] && e.items[t].tracks.total < 500 && 7 < e.items[t].tracks.total && localStorage.Snapster2 != e.items[t].id.toString() ? $("#Home").append("<div  onclick='clone(\"" + e.items[t].id.toString() + "\", \"null\");' name='" + e.items[t].id.toString() + "' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + e.items[t].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3></h3><h3></h3><h5>" + e.items[t].name + "</h5><p>" + e.items[t].tracks.total + " Total Songs</p></div></div></div>") : e.items[t].owner.id == localStorage.userID && e.items[t].tracks.total < 500 && 7 < e.items[t].tracks.total && localStorage.Snapster2 != e.items[t].id.toString() && $("#Home").append("<div onclick='clone(\"" + e.items[t].id.toString() + "\", \"null\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='/greeny.png'/></div></div><div class='playlist-desc'><h3></h3><h3></h3><h5>" + e.items[t].name + "</h5><p>" + e.items[t].tracks.total + " Total Songs</p></div></div></div>");
                }
            })
        }, 1000)
    }, window.removeHTML = function() {
        document.hasFocus()
    };
    var removeObj = {},
        removeArr = [];
    window.removeFromPlaylist = function(e) {
        $.ajax({
            async: !0,
            type: "DELETE",
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            dataType: "application/json",
            data: JSON.stringify(removeObj),
            success: function(e) {}
        })
    }, window.clone = function(e, t) {
        setTimeout(location.reload, 5000)
        if (1 == 1) {
            var a = [];
            $.ajax({
                async: !0,
                type: "GET",
                url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
                headers: {
                    Authorization: "Bearer " + localStorage.current_token
                },
                dataType: "json",
                data: "formdata",
                success: function(e) {
                    for (var t = {}, o = 0; o < e.items.length; o++) t = {
                        uri: e.items[o].track.uri.toString()
                    }, a.push(t);
                    removeObj.tracks = a, removeFromPlaylist(a.toString())
                }
            })
        }
        if ("null" == t) {
            t = localStorage.userID
        } else {
            t = "spotify"
        }
        $.ajax({
            async: !0,
            type: "GET",
            url: "https://api.spotify.com/v1/users/" + t + "/playlists/" + e + "/tracks",
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            dataType: "json",
            data: "formdata",
            success: function(e) {
                arr = [];
                var t = 0;
                if ("false" != localStorage.explicit.toString())
                    for (var a = 0; a < Math.min(e.items.length, 75); a++) arr.push(e.items[a].track.uri.toString());
                else
                    for (a = 0; a < Math.min(e.items.length, 75) && (0 == e.items[a].track.explicit && (arr.push(e.items[a].track.uri.toString()), t++), 75 != t); a++);
                localStorage.clearPlaylist || newSpotifyPlaylist(), 75 <= arr.toString().length ? (loading(), setTimeout(function() {
                    addToPlaylist(arr.toString())
                }, 500)) : location.href = "partymusic://playlisterror"
            }
        }), loading()
    }, window.newSpotifyPlaylist = function() {
        !localStorage.Snapster2 && localStorage.Snapster2 && createBackup(), $.ajax({
            async: !0,
            type: "POST",
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists",
            headers: {
                Authorization: "Bearer " + access_token
            },
            dataType: "json",
            data: JSON.stringify({
                name: "Swagger Jukebox",
                public: "true"
            }),
            success: function(e) {
                localStorage.Snapster = e.id.toString()
            }
        })
    }, window.addToPlaylist = function(e) {
        var t = {};
        t.uris = e.split(","), $.ajax({
            async: !0,
            type: "POST",
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
            headers: {
                Authorization: "Bearer " + access_token
            },
            dataType: "json",
            data: JSON.stringify(t),
            success: function(e) {
                localStorage.wasPressed = 0, localStorage.firstLoad = 0, localStorage.removeItem("songList"), location.href = "partymusic://playlistify", setTimeout(function() {
                    location.href = localStorage.urlParts + "/index.html"
                }, 1e3)
            }
        })
    }, window.createBackup = function() {
        if (!localStorage.Snapster2 && localStorage.Snapster2) {
            var e = {};
            e.name = mostVoted, e.public = "true", $.ajax({
                async: !0,
                type: "POST",
                url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists",
                headers: {
                    Authorization: "Bearer " + access_token
                },
                dataType: "json",
                data: JSON.stringify(e),
                success: function(e) {
                    localStorage.Snapster2 = e.id.toString()
                }
            })
        }
    }, window.newPlaylist = function(e) {
        localStorage.Snapster2 || createBackup(), localStorage.removeItem("songList"), localStorage.removeItem("nowp"), localStorage.Snapster = e, localStorage.wasPressed = 0, localStorage.firstLoad = 0, location.href = "partymusic://playlistify", setTimeout(function() {
            create()
        }, 1e3), setTimeout(function() {
            location.href = localStorage.urlParts + "/index.html"
        }, 2e3)
    }, window.removeHTML = function() {
        document.hasFocus() && null != localStorage.current_token && "null" != localStorage.current_token && null != localStorage.current_token && (localStorage.partyid || localStorage.party)
    }, window.playLoader = function() {
        for (var e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).mouseenter(function() {
            $("#load").show()
        })
    }, window.playHover = function() {
        for (var e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).mouseenter(function() {
            $(this).css("width", "27%"), $("#playlistContainer").css("padding-left", "5%")
        }), $(".playlists").eq(e).mouseleave(function() {
            $(this).css("width", ""), $("#playlistContainer").css("padding-left", "")
        }), $("#load").show();
        if ($(window).resize(function() {
                if ($(window).width() < 900 && 200 < $(window).width()) {
                    for (var e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).addClass("half"), $(".playlists").eq(e).removeClass("inline"), $(".playlists").eq(e).removeClass("fourth");
                    for (e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).mouseenter(function() {
                        $(this).css("width", "50%"), $("#playlistContainer").css("padding-left", "5%")
                    }), $(".playlists").eq(e).mouseleave(function() {
                        $(this).css("width", ""), $("#playlistContainer").css("padding-left", "")
                    })
                } else if (900 < $(window).width()) {
                    for (e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).addClass("inline"), $(".playlists").eq(e).removeClass("half"), $(".playlists").eq(e).removeClass("fourth");
                    for (e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).mouseenter(function() {
                        $(this).css("width", "27%"), $("#playlistContainer").css("padding-left", "5%")
                    }), $(".playlists").eq(e).mouseleave(function() {
                        $(this).css("width", ""), $("#playlistContainer").css("padding-left", "")
                    })
                } else if ($(window).width() < 200) {
                    for (e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).addClass("fourth"), $(".playlists").eq(e).removeClass("inline"), $(".playlists").eq(e).removeClass("half");
                    for (e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).mouseenter(function() {
                        $(this).css("width", "90%"), $("#playlistContainer").css("padding-left", "5%")
                    }), $(".playlists").eq(e).mouseleave(function() {
                        $(this).css("width", ""), $("#playlistContainer").css("padding-left", "5%")
                    })
                }
            }), window.stay = function() {
                location.href = localStorage.urlParts + "/index.html"
            }, $(window).width() < 900 && 200 < $(window).width()) {
            for (e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).addClass("half"), $(".playlists").eq(e).removeClass("inline"), $(".playlists").eq(e).removeClass("fourth");
            for (e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).mouseenter(function() {
                $(this).css("width", "50%"), $("#playlistContainer").css("padding-left", "5%")
            }), $(".playlists").eq(e).mouseleave(function() {
                $(this).css("width", ""), $("#playlistContainer").css("padding-left", "")
            })
        } else if (900 < $(window).width()) {
            for (e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).addClass("inline"), $(".playlists").eq(e).removeClass("half"), $(".playlists").eq(e).removeClass("fourth");
            for (e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).mouseenter(function() {
                $(this).css("width", "27%"), $("#playlistContainer").css("padding-left", "5%")
            }), $(".playlists").eq(e).mouseleave(function() {
                $(this).css("width", ""), $("#playlistContainer").css("padding-left", "")
            })
        } else if ($(window).width() < 200) {
            for (e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).addClass("fourth"), $(".playlists").eq(e).removeClass("inline"), $(".playlists").eq(e).removeClass("half");
            for (e = 0; e < $("#playlistContainer").children(".playlists").length; e++) $(".playlists").eq(e).mouseenter(function() {
                $(this).css("width", "90%"), $("#playlistContainer").css("padding-left", "5%")
            }), $(".playlists").eq(e).mouseleave(function() {
                $(this).css("width", ""), $("#playlistContainer").css("padding-left", "5%")
            })
        }
    }, $("#Home").children.length < 10 && setTimeout(loadLists, 500), 5 < localStorage.party.length ? $("#nameify").text(localStorage.party.split(":::")[0].toUpperCase()) : $("#nameify").text(localStorage.party.toUpperCase());
    if (!localStorage.num) localStorage.num = 0;
    window.checkReload = function() {
        if ($("#results").children("div").length < 3 && localStorage.num < 3) {
            localStorage.num = parseInt(localStorage.num) + 1;
            location.reload();
        } else if ($("#results").children("div").length < 3 && localStorage.num >= 2) {
            location.href = "https://paywallios.herokuapp.com/loginIOSClear.html";
        }
    }
    setTimeout(checkReload, 6500);
    setTimeout(function() {

        $("#codeify").text(localStorage.password.toUpperCase());
    }, 5000);
    window.moveToBottom = function() {
        var e, a, o = -1;
        var s = [];
        var top = [];
        var add = [],
            l = localStorage.CT.split(",");
        $.each(l, function(t, l) {
            e = localStorage.votes.split("++" + l).length, a = localStorage.votes.split("--" + l).length, $("[data=" + l + "]")[0].id.slice(13), (e - a <= o && localStorage.nowp.indexOf(l) == -1) && s.push('{ "uri": "spotify:track:' + $("[data=" + l + "]").attr("title") + '" }')
        });
        $.each(l, function(t, l) {
            e = localStorage.votes.split("++" + $("[data=" + l + "]").attr("title")).length, a = localStorage.votes.split("--" + $("[data=" + l + "]").attr("title")).length, $("[data=" + l + "]").attr("title"), (e - a <= o && localStorage.nowp.indexOf(l) == -1) && add.push('"spotify:track:' + $("[data=" + l + "]").attr("title") + '"')
        });
        var addObj = '{"uris":[' + add + ']}';
        localStorage.addToBottom = add.length;
        console.log(JSON.stringify(addObj));
        var i = '{"tracks":[' + s + "]}";
        if (1 <= s.length && localStorage.addToBottom != localStorage.oldAddToBottom) {
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
    window.findParty = function(a) {
        var object = {};
        object.party = a;
        $.ajax({
            url: "https://paywallios.herokuapp.com/find",
            data: object,
            dataType: "json",
            success: function(d) {
                var plist = d.playlist;
                localStorage["complete_access"] = true;
                localStorage["password"] = d.superpowers;
                localStorage["explicit"] = d.explicit;
                localStorage["Snapster"] = plist.split(":::")[0];
                localStorage["Snapster2"] = plist.split(":::")[1];
                localStorage["party"] = d.party;
                localStorage["url"] = d.access_token;
                localStorage["userID"] = d.username.split(":::")[0];
                localStorage["username"] = d.username;
                localStorage["refresh_token"] = d.refresh_token;
                location.href = "partymusic://first/";
                var urlP = window.location.toString().split("/public/")[0] + "/public";
                setInterval(function() {
                    location.href = urlP + "/index.html";
                }, 500);
            },
            error: function(e, ee, eee) {
                //findParty(a);
                //console.log(JSON.stringify(e));
                //console.log(JSON.stringify(ee));
                //console.log(JSON.stringify(eee));
            }
        });
    }
    window.findVotes1 = function() {
        var object = {};
        object.party = localStorage.party.split(":::")[0];
        $.ajax({
            url: "https://paywallios.herokuapp.com/find",
            data: object,
            timeout: 10000,
            dataType: "json",
            success: function(d) {
                localStorage["refresh_token"] = d.refresh_token;
                if (localStorage.votes != d.votes) {
                    localStorage["votes"] = d.votes;
                    calculateVotes();
                }
            },
            error: function(e, ee, eee) {}
        });
    }
    setInterval(findVotes1, 5000);
    if (!localStorage.partyAlert) {
        if (localStorage.party.length > 3) {
            create();
            if (localStorage.party.length > 4)
                localStorage.party = localStorage.party.substring(0, 4);
            history.replaceState("/index.html", document.title, "Swagger Jukebox");
            var c = confirm("Your Party Name is " + localStorage.party.toUpperCase() + " and your Admin Password is " + localStorage.password.toUpperCase() + " .  You can find these in the menu...");
            if (c || !c) {
                localStorage.partyAlert = 1;
                location.href = localStorage.urlParts + "/index.html";
            }
        } else {
            location.href = "partymusic://noPartyName";
        }
    }
    window.startPlaying = function(playlist) {
        localStorage.Snapster = playlist;
        localStorage.removeItem("songList");
        setTimeout(function() {
            location.href = localStorage.urlParts + "/index.html";
        }, 200);
    }
    window.tognav = function() {
            $("#mySidenav").toggle(function() {
                $("#mySidenav").css("width", "80%");
            });
        } //setTimeout(loadLists, 7000)
    window.openLink = function(evt, tabName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        if (tabName != "nav1") {
            $("#mySidenav").css("width", "");
        } else {
            $("#mySidenav").css("width", "85%");
        }
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    window.changeLink = function(evt, tabName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        //document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    localStorage.superHost = true;
    localStorage.willywonka = true;
    localStorage.allowed = true;
    localStorage.host = true;
    localStorage.guest = true;
    localStorage.valid = true;
    localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
    localStorage.urlGuest = window.location.toString().split("/public/")[0] + "/guest";
    var object = {};
    var elem = document.getElementById("html");
    window.closeWin = function() {
        $.ajax({
            type: "GET",
            url: "/close",
            success: function(data) {}
        });
    }
    window.hosting = function() {
        if (parseInt(localStorage.hosting) == 1) {
            localStorage.hosting = 0;
            $("#hosting-toggle").text("ON");
            $("#hosting-toggle").css("color", "green");
            create();
        } else if (parseInt(localStorage.hosting) == 0) {
            localStorage.hosting = 1;
            $("#hosting-toggle").text("OFF");
            $("#hosting-toggle").css("color", "red");
            kill();
        }
    }
    window.checkHost = function() {
        if (!localStorage.hosting) {
            localStorage.hosting = 0;
            $("#hosting-toggle").text("ON");
            $("#hosting-toggle").css("color", "green");
            setTimeout(create, 5000);
        }
        if (parseInt(localStorage.hosting) == 0 && $("#hosting-toggle").text("")) {
            $("#hosting-toggle").text("ON");
            $("#hosting-toggle").css("color", "green");
        } else if (parseInt(localStorage.hosting) == 1 && $("#hosting-toggle").text("")) {
            $("#hosting-toggle").text("OFF");
            $("#hosting-toggle").css("color", "red");
        }
    }
    checkHost();
    var newList;

    var p2 = "https://play.spotify.com/track/";
    localStorage.setItem("guest", true);
    localStorage.setItem("temp", true);
    localStorage.setItem("allowed", true);
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
    window.guest = function() {
        localStorage.removeItem("host");
        location.href = "partymusic://pause";
        setTimeout(function() {
            location.href = localStorage.urlGuest + '/app.html';
            return false;
        }, 250);
    }
    window.playlists = function() {
        location.href = localStorage.urlParts + "/playlists.html";
    }
    window.relo = function() {
        location.href = localStorage.urlParts + '/index.html';
        return false;
    }
    window.saveList = function() {
        var objSave = {};
        objSave.name = "Swagger Jukebox - Saved";
        $.ajax({
            async: true,
            type: "PUT",
            url: "https://api.spotify.com/v1/playlists/" + localStorage.Snapster,
            headers: {
                'Authorization': 'Bearer ' + localStorage.current_token
            },
            dataType: "json",
            data: JSON.stringify(objSave),
            success: function(data) {

            }
        })
        setTimeout(tognav, 500);
    }
    window.purgify = function() {
        var answer = "";
        removeHTML();
        var reg = /^\d+$/;
        answer = prompt("Songs with -X or fewer votes will be removed from the list...");
        if (reg.test(answer) === true) {
            if ((answer * 1) > 1) {
                remove(answer * -1);
                tognav();
            } else {
                alert("The number you enter must be greater than 1.")
            }
        } else {
            alert("Please enter a valid number.  Allowed characters: '0123456789'")
        }
    }
    window.removeHTML = function() {
        if (document.hasFocus()) {
            history.replaceState("/index.html", document.title, "Swagger Jukebox");
        }
    }
    window.reloadify = function() {
        $("#load").hide();
        return false;
    }
    window.terminate = function() {
        location.href = "partymusic://terminate";
        var urlParts = localStorage.urlParts;
        /*setTimeout(function() {
         if (localStorage.locked == "no") {
         location.href = "partymusic://home";
         } else {
         location.href = "partymusic://home";
         }
         }, 250)*/
        localStorage.clear();
    }

    window.softTerminate = function() {
        Cookies.remove('locStore');
        Cookies.remove('justClicked');
        var urlParts = localStorage.urlParts;
        setTimeout(function() {
            location.href = "partymusic://softterminate";
        }, 250);
        /*setTimeout(function() {
         if (localStorage.locked == "no") {
         location.href = "partymusic://home";
         } else {
         location.href = "partymusic://home";
         }
         }, 500)*/
        localStorage.clear();
    }
    window.settings = function() {
        location.href = localStorage.urlParts + "/welcome.html";
    }
    window.terms = function() {
        $('#dialogPage').hide();
        location.href = "partymusic://terms";
    }
    window.privacy = function() {
        $('#dialogPage').hide();
        location.href = "partymusic://privacy";
    }

    if (!Cookies.get('karma')) {
        Cookies.set('karma', '25', {
            expires: 30
        })
    }

    Cookies.remove('justClicked');
    if (localStorage.length > 5) {
        Cookies.set('locStore', JSON.stringify(localStorage), {
            expires: 100
        });
        Cookies.set('locStore2', JSON.stringify(localStorage), {
            expires: 100
        });
    }

    setTimeout(function() {
        localStorage.wasPressed = 1;
        if (!localStorage.i) {
            localStorage.i = 1;
        }
    }, 2000);
});
/*WEB_SOCKET_SWF_LOCATION = 'https://socketswagger.herokuapp.com/socket.io/inc/WebSocketMain.swf';
 var socket = io.connect('https://socketswagger.herokuapp.com/');

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
 });*/