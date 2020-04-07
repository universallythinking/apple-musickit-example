WEB_SOCKET_SWF_LOCATION = "https://socketswagger.herokuapp.com/socket.io/inc/WebSocketMain.swf";
var socket = io.connect("https://socketswagger.herokuapp.com/");
window.newSongPlayed = function (e) {
 try{
    socket.emit(localStorage.userID + "songChanged", {
        body: e
    })
    } catch (e) {
        console.log(e)
    };
    nextSongsCache()
},
window.hideload = function() {
    document.getElementById("load").style.visibility = "hidden"
}, setTimeout(function() {
    localStorage.Snapster || (localStorage.clear(), location.href = "https://paywallios.herokuapp.com/loginAndroid.html")
}, 1), window.now = function(t, e) {
    location.href = "//partymusic://song/" + t + ":::" + e, localStorage.nowp = t
}, window.hashCode = function(t) {
    return t.split("").reduce(function(t, e) {
        return (t = (t << 5) - t + e.charCodeAt(0)) & t
    }, 0)
}, window.swipeLeft = function(t, e, a, o, s) {
    a >= $(window).width() / 2.5 && $("#mySidenav").css("width", "")
}, window.swipeRight = function(t, e, a, o, s) {
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
        e = JSON.parse(localStorage.songList);
    $("#results").css("padding-top", "298px !important"), $("#results").css("text-align", "center"), $("#results").empty(), localStorage.nowp || null == e.items[0].track.id || "null" == e.items[0].track.id ? localStorage.nowp || null != e.items[0].track.id && "null" != e.items[0].track.id || (localStorage.nowp = hashCode(e.items[0].track.name + e.items[0].track.artists[0].name)) : localStorage.nowp = e.items[0].track.id;
    for (var a = 0; a < e.items.length; a++) {
        if (e.items[a].track.id == localStorage.nowp || localStorage.nowp == hashCode(e.items[a].track.name + e.items[a].track.artists[0].name)) try {
            $("#song").text(e.items[a].track.name), $("#song").attr("title", e.items[a].track.id), $("#artist").text(e.items[a].track.artists[0].name), $(".img").eq(a).css("background", "url(" + e.items[a].track.album.images[0].url + ") center center"), $(".img").eq(a).css("background-size", "cover"), $(".player .cover").css("background", "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(" + e.items[a].track.album.images[0].url + ") center top")
        } catch (t) {
            //console.log(t)
        }
        e.items[a].track.id != localStorage.nowp && null != e.items[a].track.id && "null" != e.items[a].track.id ? $("#results").append('<div title="' + e.items[a].track.id + '" name="' + e.items[a].track.popularity + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"><div onclick="vote(\'' + e.items[a].track.id + "', " + 0 + ')" class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 onclick="now(\'' + e.items[a].track.id + "', " + a + ')"  class="block">' + e.items[a].track.name + '</h5> <p class="block">' + e.items[a].track.artists[0].name + '</p> </div> </div> <div onclick="vote(\'' + e.items[a].track.id + "', " + 1 + ')" class="voteUp voteBtn"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div></div>  </div>') : e.items[a].track.id == localStorage.nowp || null !== e.items[a].track.id && "null" != e.items[a].track.id || $("#results").append('<div title="' + hashCode(e.items[a].track.name + e.items[a].track.artists[0].name) + '" name="' + e.items[a].track.popularity + '" class="songLinkClick next played song-' + a + '" id="songLinkClick' + a + '"><div onclick="vote(\'' + e.items[a].track.id + "', " + 0 + ')" class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 onclick="now(\'' + e.items[a].track.id + "', " + a + ')"  class="block">' + e.items[a].track.name + '</h5> <p class="block">' + e.items[a].track.artists[0].name + '</p> </div> </div> <div onclick="vote(\'' + e.items[a].track.id + "', " + 1 + ')" class="voteUp voteBtn"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div></div>  </div>'), null != e.items[a].track.id && "null" != e.items[a].track.id ? t.push(e.items[a].track.id) : null !== e.items[a].track.id && "null" != e.items[a].track.id || t.push(hashCode(e.items[a].track.name + e.items[a].track.artists[0].name)), localStorage.CT = t
    }
    //remove(-3),
    down(), song()
};
var t, a, n, o, e = [];
window.isReady = function() {
    return !0
}, window.rVote = function() {
    parseInt($(".songLinkClick").eq(1).children(".voteUp").text()) < 0 && resetVotes()
}, window.nextSong = function(t) {
    location.href = "//partymusic://" + $(".songLinkClick").eq(1).attr("title")
}, localStorage.party && (localStorage.lastFM = localStorage.party), localStorage.votedArray || (localStorage.votedArray = " "), localStorage.CT1, $("#results").empty, localStorage.totalSongs = 0, localStorage.currentlyPlayingWC = "", localStorage.currentlyPlaying = "", localStorage.currentTrack = 0, localStorage.offsetNumber = 0, $("#nameify").empty(), $("#nameify").append("#" + localStorage.party.split(":::")[0].toUpperCase()), window.loading = function() {
    $("#load").show(), $("#load").fadeOut(2e3)
}, window.votedImg = function() {
    $("#vote").show(), $("#vote").fadeOut(1250)
};
var r, s = 1;
i = [], window.nextSongs = function() {
    $.ajax({
        async: !0,
        type: "GET",
        cache: !0,
        url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?limit=100",
        headers: {
            Authorization: "Bearer " + localStorage.current_token
        },
        dataType: "json",
        data: "formdata",
        success: function(t) {
            localStorage.songList = JSON.stringify(t), nextSongsCache()
        }
    })
}, window.addVotes = function(t, e) {
    if (1 == e) {
        var a = "++" + $("#results").find("#songLinkClick" + t).attr("title"),
            o = parseInt($(".songLinkClick").eq(t).children(".voteUp").text());
        vote(a, o)
    } else if (0 == e) {
        a = "--" + $("#results").find("#songLinkClick" + t).attr("title");
        vote(a, 0)
    }
}, localStorage.votes || (localStorage.votes = ""), window.calculateVotes = function() {
    var a, o;
    l = localStorage.CT.split(","), $.each(l, function(t, e) {
        a = localStorage.votes.split("++" + e).length, o = localStorage.votes.split("--" + e).length, a - o != 0 ? ($("[title=" + e + "]").children(".voteUp").text(a - o), $("[title=" + e + "]").children(".voteUp").attr("name", a - o), $("[title=" + e + "]").children(".voteUp").css("fontWeight", "bold")) : ($("[title=" + e + "]").children(".voteUp").html("<i class='fa fa-thumbs-o-up' aria-hidden='true'></i>"), $("[title=" + e + "]").children(".voteUp").attr("name", a - o))
    }), $("#results .next").sort(sortSongs).appendTo("#results")
}, window.sortSongs = function(t, e) {
    return parseInt($(e).children(".voteUp").attr("name")) - parseInt($(t).children(".voteUp").attr("name")) || parseInt($(e).attr("name")) - parseInt($(t).attr("name")) || $(e).siblings(".songLinkClick").attr("title").charCodeAt(10) < $(t).siblings(".songLinkClick").attr("title").charCodeAt(10) || parseInt($(e).children(".voteUp").prev("div")[0].innerHTML.charCodeAt(10)) - parseInt($(t).children(".voteUp").prev("div")[0].innerHTML.charCodeAt(10))
}, localStorage.votes, window.vote = function(t, e) {
    if(e==1)t = "++" + t;
    if(e==0)t = "--" + t;
    localStorage.firstHide = 1;
    var a = {};
    localStorage.votes = localStorage.votes + t, location.href = "//partymusic://calcvotes", a.votes = t, a.username = localStorage.userID, $.ajax({
        async: false,
        url: "https://paywallios.herokuapp.com/upVote",
        dataType: "json",
        data: a,
        success: function(t) {},
        error: function(t) {}
    })
}, window.updateVotes = function(t) {
    var e = {};
    e.username = localStorage.userID, e.votes = t.replace(/\\/g, ""), localStorage.votes = e.votes, calculateVotes(), $.ajax({
        timeout: 2500,
        async: !0,
        cache: !0,
        url: "https://paywallios.herokuapp.com/downVote",
        dataType: "json",
        data: e,
        success: function(t) {}
    })
}, window.remove = function(t) {
    if (parseInt($(".songLinkClick").eq(0).children(".voteUp").attr("name")) < 0 && resetVotes(), parseInt($(".songLinkClick").last().children(".voteUp").attr("name")) < t) {
        var a, o, s = -3;
        t && (s = t);
        var l = [],
            e = localStorage.CT.split(",");
        $.each(e, function(t, e) {
            a = localStorage.votes.split("++" + e).length, o = localStorage.votes.split("--" + e).length;
            $("[title=" + e + "]")[0].id.slice(13);
            a - o <= s && l.push('{ "uri": "spotify:track:' + e + '" }')
        });
        var i = '{"tracks":[' + l + "]}";
        1 <= l.length && (location.href = "//partymusic://newSongAdded", $.ajax({
            async: !0,
            cache: !0,
            type: "DELETE",
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            contentType: "application/json",
            data: i,
            success: function(t) {
                nextSongs(), socket.emit("newSongAdded", {
                    username: localStorage.userID
                }), setTimeout(function() {
                    location.href = localStorage.urlParts + "/index.html"
                }, 750)
            },
            error: function(t) {}
        }))
    }
}, window.updateNowSong = function() {
    location.href = "//partymusic://updateNow/spotify:track:" + $("#song").attr("title")
}, window.updateLSSong = function() {
    location.href = "//partymusic://updateSong/spotify:track:" + $(".songLinkClick").eq(0).attr("title")
}, window.removeOne = function(t) {
    var e = '{"tracks":[{ "uri": "spotify:track:' + t + '" }]}';
    location.href = "//partymusic://newSongAdded", $.ajax({
        async: !0,
        cache: !0,
        type: "DELETE",
        url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks",
        headers: {
            Authorization: "Bearer " + localStorage.current_token
        },
        contentType: "application/json",
        data: e,
        success: function(t) {
            nextSongs(), location.href = "//partymusic://newSongAdded"
        },
        error: function(t) {}
    })
}, setTimeout(remove, 3e3), window.voteCookie = function() {
    vote(", ")
}, setTimeout(voteCookie, 5e3), window.down = function(t) {
    var e = $("#song").attr("title"),
        a = new RegExp(e, "g"),
        o = new RegExp("", "g"),
        s = localStorage.votes.replace(a, "");
    s = (s = (s += ", --" + e).replace(o, "")).replace(/\\/, ""), localStorage.votes = s, updateVotes(s)
}, window.increment = function(t) {
    (localStorage.firstHide = 1) === t && null != $(".songLinkClick").eq(0).attr("title") && (location.href = "//partymusic://song/" + $(".songLinkClick").eq(0).attr("title") + ":::12", localStorage.nowp = $(".songLinkClick").eq(0).attr("title"), setTimeout(function() {
        socket.emit(localStorage.userID + "songChanged", {
            body: localStorage.nowp
        })
    }, 1e3), setTimeout(nS, 500), setTimeout(rVote, 2500)), 2 === t && null != $(".songLinkClick").eq(0).attr("title") && (localStorage.nowp = $(".songLinkClick").eq(0).attr("title"), setTimeout(function() {
        socket.emit(localStorage.userID + "songChanged", {
            body: localStorage.nowp
        })
    }, 1e3), setTimeout(nS, 500), setTimeout(rVote, 2500))
}, window.reload = function() {
    location.href = "//partymusic://reload"
}, window.playFirst = function() {
    $("#song").attr("title") ? location.href = "//partymusic://prettyprev/" + $("#song").attr("title") : increment(1), localStorage.firstLoad = 1
}, setTimeout(playFirst, 5e3), window.next = function() {
    $(".songLinkClick").eq(0).attr("title") && (localStorage.nextUp = $(".songLinkClick").eq(0).attr("title") + ":::" + $(".songLinkClick").eq(0).attr("id").substr(13))
}, window.prev = function() {
    localStorage.nowp && (location.href = "//partymusic://song/" + localStorage.nowp + ":::")
}, window.pause = function() {
    location.href = "//partymusic://pause"
}, window.nS = function() {
    localStorage.songList ? nextSongsCache() : nextSongs()
}, setTimeout(nS, 1e3), window.downVoteify = function(t) {
    setTimeout(nS, 1e3), setTimeout(function() {
        down()
    }, 500), setTimeout(function() {
        down()
    }, 7e3)
}, window.loader = function() {
    downVoteify(), location.href = "//partymusic://updatePass"
}, window.song = function() {
    var t = {};
    t.username = localStorage.userID, t.song = $("#song").attr("title"), $.ajax({
        async: !0,
        cache: !0,
        url: "https://paywallios.herokuapp.com/song",
        dataType: "json",
        data: t,
        timeout: 12e3,
        success: function(t) {}
    })
};
var hashCodeNum = function(t) {
    var e, a = 0;
    if (0 === t.length) return a;
    for (e = 0; e < t.length; e++) a = (a << 5) - a + t.charCodeAt(e), a |= 0;
    return a
};
localStorage.hashNum || (localStorage.hashNum = hashCodeNum((new Date).getTime().toString())), setTimeout(song, 7e3), window.reload = function() {
    location.href = "//partymusic://reloader"
}, setTimeout(function() {
    $("#song").text.length < 1 && increment(1)
}, 9e3), setTimeout(function() {
    $("#song").text.length < 1 && increment(1)
}, 12e3), window.findParty = function(e) {
    var t = {};
    t.party = localStorage.party.split(":::")[0], $.ajax({
        url: "https://paywallios.herokuapp.com/find",
        data: t,
        cache: !0,
        async: !0,
        timeout: 1e4,
        dataType: "json",
        success: function(t) {
            localStorage.votes != t.votes || 1 == e ? (localStorage.votes = t.votes, nextSongs()) : nextSongsCache()
        },
        error: function(t, e, a) {}
    })
}, localStorage.setItem("host", !0), localStorage.setItem("allowed", !0), localStorage.removeItem("Snapster2");
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
        success: function(t) {
            localStorage.userID = t.id, userID = localStorage.userID, localStorage.valid = "true"
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
        if (localStorage.spotifyPlaylists) {
            var t = JSON.parse(localStorage.spotifyPlaylists);
            t = t.playlists, arr = [], $("#Home").append("<header style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: -50px;' class='songLinkClick1 items'><div><center class='items' style='font-size: 200%; padding-bottom: 50px; padding-top: -50px; '>Spotify Playlists</center></div></header><h1></h1><h1></h1>"), localStorage.Snapster && $("#Home").append("<div name='currentPlaylist' onclick='stay();' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='dirtyScripts/turtle.png'/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>Current Playlist</h5><p>...</p></div></div></div>");
            for (var e = 0; e < t.items.length; e++) $("#Home").append("<div name='" + t.items[e].id.toString() + "' onclick='clone(\"" + t.items[e].id.toString() + "\", \"spotify\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + t.items[e].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>" + t.items[e].name + "</h5><p>" + t.items[e].tracks.total + " Total Songs</p></div></div></div>")
        } else $.ajax({
            async: !0,
            type: "GET",
            url: "https://api.spotify.com/v1/search?q=party&type=playlist&limit=20",
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            dataType: "json",
            data: "formdata",
            success: function(t) {
                localStorage.spotifyPlaylists = JSON.stringify(t), t = t.playlists, arr = [], $("#Home").append("<header style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: -50px;' class='songLinkClick1 items'><div><center class='items' style='font-size: 200%; padding-bottom: 50px; padding-top: -50px; '>Spotify Playlists</center></div></header><h1></h1><h1></h1>"), localStorage.Snapster && $("#Home").append("<div name='currentPlaylist' onclick='stay();' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='dirtyScripts/turtle.png'/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>Current Playlist</h5><p>...</p></div></div></div>");
                for (var e = 0; e < t.items.length; e++) $("#Home").append("<div name='" + t.items[e].id.toString() + "' onclick='clone(\"" + t.items[e].id.toString() + "\", \"spotify\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + t.items[e].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>" + t.items[e].name + "</h5><p>" + t.items[e].tracks.total + " Total Songs</p></div></div></div>")
            }
        })
    }, 800), setTimeout(function() {
        if (localStorage.userID)
            if (localStorage.myPlaylists) {
                var t = JSON.parse(localStorage.myPlaylists);
                $("#Home").append("<header style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: 50px;' class='songLinkClick1 items playlist'><div><center class='items' style='font-size: 200%; padding-top: 50px; padding-bottom: 50px;'>Your Playlists</center></div></header>"), localStorage.Snapster && $("#Home").append("<div name='currentPlaylist' onclick='stay();' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='dirtyScripts/turtle.png'/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>Current Playlist</h5><p>...</p></div></div></div>");
                for (var e = 0; e < t.items.length; e++) t.items[e].name == mostVoted && (flag = !0, localStorage.Snapster2 = t.items[e].id.toString()), "Swagger Jukebox" == t.items[e].name && (localStorage.clearPlaylist = t.items[e].id.toString()), t.items[e].owner.id == localStorage.userID && null != t.items[e].images[0] && t.items[e].tracks.total < 500 && 7 < t.items[e].tracks.total && localStorage.Snapster2 != t.items[e].id.toString() ? $("#Home").append("<div name='" + t.items[e].id.toString() + "' onclick='clone(\"" + t.items[e].id.toString() + "\", \"null\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + t.items[e].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>" + t.items[e].name + "</h5><p>" + t.items[e].tracks.total + " Total Songs</p></div></div></div>") : t.items[e].owner.id == localStorage.userID && t.items[e].tracks.total < 500 && 7 < t.items[e].tracks.total && localStorage.Snapster2 != t.items[e].id.toString() && $("#Home").append("<div onclick='clone(\"" + t.items[e].id.toString() + "\", \"null\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='./noImageAvailable.png'/></div></div><div class='playlist-desc'><h3></h3><h3></h3><h5>" + t.items[e].name + "</h5><p>" + t.items[e].tracks.total + " Total Songs</p></div></div></div>");
                $(".items").wrapAll("<div id='playlistContainer'></div>")
            } else $.ajax({
                async: !0,
                type: "GET",
                url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists?limit=50",
                headers: {
                    Authorization: "Bearer " + localStorage.current_token
                },
                dataType: "json",
                data: "formdata",
                success: function(t) {
                    localStorage.myPlaylists = JSON.stringify(t), $("#Home").append("<header style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: 50px;' class='songLinkClick1 items playlist'><div><center class='items' style='font-size: 200%; padding-top: 50px; padding-bottom: 50px;'>Your Playlists</center></div></header>"), localStorage.Snapster && $("#Home").append("<div name='currentPlaylist' onclick='stay();' class='playlists items inline pSnap'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='dirtyScripts/turtle.png'/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>Current Playlist</h5><p>...</p></div></div></div>");
                    for (var e = 0; e < t.items.length; e++) t.items[e].name == mostVoted && (flag = !0, localStorage.Snapster2 = t.items[e].id.toString()), "Swagger Jukebox" == t.items[e].name && (localStorage.clearPlaylist = t.items[e].id.toString()), t.items[e].owner.id == localStorage.userID && null != t.items[e].images[0] && t.items[e].tracks.total < 500 && 7 < t.items[e].tracks.total && localStorage.Snapster2 != t.items[e].id.toString() ? $("#Home").append("<div name='" + t.items[e].id.toString() + "' onclick='clone(\"" + t.items[e].id.toString() + "\", \"null\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src=\"" + t.items[e].images[0].url.toString() + "\"/></div></div><div class='playlist-desc'><h3</h3><h3></h3><h5>" + t.items[e].name + "</h5><p>" + t.items[e].tracks.total + " Total Songs</p></div></div></div>") : t.items[e].owner.id == localStorage.userID && t.items[e].tracks.total < 500 && 7 < t.items[e].tracks.total && localStorage.Snapster2 != t.items[e].id.toString() && $("#Home").append("<div onclick='clone(\"" + t.items[e].id.toString() + "\", \"null\");' class='playlists items inline p'><div class='charlie'><div class='row'><div><div><div><div><img class='images' src='./noImageAvailable.png'/></div></div><div class='playlist-desc'><h3></h3><h3></h3><h5>" + t.items[e].name + "</h5><p>" + t.items[e].tracks.total + " Total Songs</p></div></div></div>");
                    $(".items").wrapAll("<div id='playlistContainer'></div>")
                }
            })
    }, 1700)
}, window.removeHTML = function() {
    document.hasFocus()
};
var removeObj = {},
    removeArr = [];
window.removeFromPlaylist = function(t) {
    $.ajax({
        async: !0,
        type: "DELETE",
        url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.clearPlaylist + "/tracks",
        headers: {
            Authorization: "Bearer " + localStorage.current_token
        },
        dataType: "application/json",
        data: JSON.stringify(removeObj),
        success: function(t) {}
    })
}, window.clone = function(t, e) {
    if (createBackup(), localStorage.Snapster) {
        var o = [];
        $.ajax({
            async: !0,
            type: "GET",
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?limit=100",
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            dataType: "json",
            data: "formdata",
            success: function(t) {
                for (var e = {}, a = 0; a < Math.min(100, t.items.length); a++) e = {
                    uri: t.items[a].track.uri.toString()
                }, o.push(e);
                removeObj.tracks = o, removeFromPlaylist(o.toString())
            }
        })
    }
    "null" == e && (e = localStorage.userID), setTimeout(function() {
        $.ajax({
            async: !0,
            type: "GET",
            url: "https://api.spotify.com/v1/users/" + e + "/playlists/" + t + "/tracks?limit=100",
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            dataType: "json",
            data: "formdata",
            success: function(t) {
                arr = [];
                var e = 0;
                if ("false" != localStorage.explicit.toString())
                    for (var a = 0; a < Math.min(t.items.length, 100); a++) arr.push(t.items[a].track.uri.toString());
                else
                    for (a = 0; a < Math.min(t.items.length, 100) && (0 == t.items[a].track.explicit && (arr.push(t.items[a].track.uri.toString()), e++), 100 != e); a++);
                localStorage.Snapster || newSpotifyPlaylist(), 100 <= arr.toString().length ? (loading(), setTimeout(function() {
                    addToPlaylist(arr.toString())
                }, 500)) : location.href = "//partymusic://playlisterror"
            }
        })
    }, 1e3), loading()
}, window.newSpotifyPlaylist = function() {
    !localStorage.Snapster2 && localStorage.Snapster2 && createBackup();
    var t = {
        name: "Swagger Jukebox",
        public: "true"
    };
    $.ajax({
        async: !0,
        type: "POST",
        url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists",
        headers: {
            Authorization: "Bearer " + access_token
        },
        dataType: "json",
        data: JSON.stringify(t),
        success: function(t) {
            localStorage.Snapster = t.id.toString()
        }
    })
}, window.addToPlaylist = function(t) {
    var e = {};
    e.uris = t.split(","), $.ajax({
        async: !0,
        type: "POST",
        url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?limit=100",
        headers: {
            Authorization: "Bearer " + access_token
        },
        dataType: "json",
        data: JSON.stringify(e),
        success: function(t) {
            localStorage.wasPressed = 0, localStorage.firstLoad = 0, localStorage.removeItem("songList"), setTimeout(function() {
                location.href = localStorage.urlParts + "/index.html"
            }, 1e3)
        }
    })
}, window.createBackup = function() {
    if (!localStorage.Snapster2 && localStorage.Snapster2) {
        var t = {};
        t.name = mostVoted, t.public = "true", $.ajax({
            async: !0,
            type: "POST",
            url: "https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists",
            headers: {
                Authorization: "Bearer " + access_token
            },
            dataType: "json",
            data: JSON.stringify(t),
            success: function(t) {
                localStorage.Snapster2 = t.id.toString()
            }
        })
    }
}, window.newPlaylist = function(t) {
    localStorage.Snapster2 || createBackup(), localStorage.removeItem("songList"), localStorage.removeItem("nowp"), localStorage.Snapster = t, localStorage.wasPressed = 0, localStorage.firstLoad = 0, setTimeout(function() {
        create()
    }, 1e3), setTimeout(function() {}, 2e3)
}, window.removeHTML = function() {
    document.hasFocus() && null != localStorage.current_token && "null" != localStorage.current_token && null != localStorage.current_token && (localStorage.partyid || localStorage.party)
}, window.playLoader = function() {
    for (var t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).mouseenter(function() {
        $("#load").show()
    })
}, window.playHover = function() {
    for (var t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).mouseenter(function() {
        $(this).css("width", "27%"), $("#playlistContainer").css("padding-left", "5%")
    }), $(".playlists").eq(t).mouseleave(function() {
        $(this).css("width", ""), $("#playlistContainer").css("padding-left", "")
    }), $("#load").show();
    if ($(window).resize(function() {
            if ($(window).width() < 900 && 200 < $(window).width()) {
                for (var t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).addClass("half"), $(".playlists").eq(t).removeClass("inline"), $(".playlists").eq(t).removeClass("fourth");
                for (t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).mouseenter(function() {
                    $(this).css("width", "50%"), $("#playlistContainer").css("padding-left", "5%")
                }), $(".playlists").eq(t).mouseleave(function() {
                    $(this).css("width", ""), $("#playlistContainer").css("padding-left", "")
                })
            } else if (900 < $(window).width()) {
                for (t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).addClass("inline"), $(".playlists").eq(t).removeClass("half"), $(".playlists").eq(t).removeClass("fourth");
                for (t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).mouseenter(function() {
                    $(this).css("width", "27%"), $("#playlistContainer").css("padding-left", "5%")
                }), $(".playlists").eq(t).mouseleave(function() {
                    $(this).css("width", ""), $("#playlistContainer").css("padding-left", "")
                })
            } else if ($(window).width() < 200) {
                for (t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).addClass("fourth"), $(".playlists").eq(t).removeClass("inline"), $(".playlists").eq(t).removeClass("half");
                for (t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).mouseenter(function() {
                    $(this).css("width", "90%"), $("#playlistContainer").css("padding-left", "5%")
                }), $(".playlists").eq(t).mouseleave(function() {
                    $(this).css("width", ""), $("#playlistContainer").css("padding-left", "5%")
                })
            }
        }), window.stay = function() {
            location.href = localStorage.urlParts + "/index.html"
        }, $(window).width() < 900 && 200 < $(window).width()) {
        for (t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).addClass("half"), $(".playlists").eq(t).removeClass("inline"), $(".playlists").eq(t).removeClass("fourth");
        for (t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).mouseenter(function() {
            $(this).css("width", "50%"), $("#playlistContainer").css("padding-left", "5%")
        }), $(".playlists").eq(t).mouseleave(function() {
            $(this).css("width", ""), $("#playlistContainer").css("padding-left", "")
        })
    } else if (900 < $(window).width()) {
        for (t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).addClass("inline"), $(".playlists").eq(t).removeClass("half"), $(".playlists").eq(t).removeClass("fourth");
        for (t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).mouseenter(function() {
            $(this).css("width", "27%"), $("#playlistContainer").css("padding-left", "5%")
        }), $(".playlists").eq(t).mouseleave(function() {
            $(this).css("width", ""), $("#playlistContainer").css("padding-left", "")
        })
    } else if ($(window).width() < 200) {
        for (t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).addClass("fourth"), $(".playlists").eq(t).removeClass("inline"), $(".playlists").eq(t).removeClass("half");
        for (t = 0; t < $("#playlistContainer").children(".playlists").length; t++) $(".playlists").eq(t).mouseenter(function() {
            $(this).css("width", "90%"), $("#playlistContainer").css("padding-left", "5%")
        }), $(".playlists").eq(t).mouseleave(function() {
            $(this).css("width", ""), $("#playlistContainer").css("padding-left", "5%")
        })
    }
}, $("#Home").children.length < 10 && setTimeout(loadLists, 5e3), setTimeout(playLoader, 5e3), localStorage.combo = localStorage.userID + ":::" + localStorage.password, WEB_SOCKET_SWF_LOCATION = "https://socketswagger.herokuapp.com/socket.io/inc/WebSocketMain.swf";
socket = io.connect("https://socketswagger.herokuapp.com/"), hashCodeNum = function(t) {
    var e, a = 0;
    if (0 === t.length) return a;
    for (e = 0; e < t.length; e++) a = (a << 5) - a + t.charCodeAt(e), a |= 0;
    return a
};
var userID, baseURL, searchQry, myDataLength, partyPlaylist, tick = 0;
localStorage.hashNum || (localStorage.hashNum = hashCodeNum((new Date).getTime().toString())), window.recon = function() {
    var t = {};
    t.combo = localStorage.combo, t.username = localStorage.userID, t.hash = localStorage.hashNum, $.ajax({
        url: "https://socketswagger.herokuapp.com/start",
        dataType: "json",
        data: t,
        success: function(t) {
            console.log("SUCCESS " + t)
        },
        error: function(t) {
            console.log("Error " + JSON.stringify(t))
        }
    }), setTimeout(function() {
        (socket = io.connect("https://socketswagger.herokuapp.com/")).on(localStorage.userID, function(t) {
            socket.emit("ready for data", {})
        }), socket.on(localStorage.userID + "updateios", function(t) {
            10 < t.body.length && localStorage.votes != t.body && (localStorage.votes = t.body, setTimeout(calculateVotes, 500), console.log("VOTES " + t.body))
        }), socket.on(localStorage.combo + "test", function(t) {
            setTimeout(calculateVotes, 500), console.log("VOTES " + t.body)
        }), socket.on(localStorage.userID + "songChange", function(t) {}), socket.on(localStorage.userID + "newPlaylist", function(t) {
            localStorage.Snapster != t && t.length, 0
        }), socket.on(localStorage.userID + "newSong", function(t) {
            setTimeout(nextSongs, 3e3)
        })
    }, 2e3)
}, socket.on("disconnect", function(t) {}), setTimeout(recon, 3e3), window.resetVotes = function() {
    localStorage.votes = "", localStorage.setItem("STOP", "true");
    var t = {};
    t.username = localStorage.userID, $.ajax({
        url: "https://paywallios.herokuapp.com/clearVotes",
        dataType: "json",
        data: t,
        success: function(t) {
            localStorage.votes = "", calculateVotes()
        },
        error: function(t) {
            localStorage.votes = "", calculateVotes()
        }
    })
};
var listOfTracks = [];
if ($("#fname").on("blur", function() {}), $("#search").on("click", function() {
        $("#fname").show(), $("#fname").focus()
    }), $("#fname").on("keypress", function() {
        if ($("#html").scroll(function(t) {
                t.preventDefault(), t.stopPropogagtion()
            }), 13 === event.which)
            if (localStorage.searchFlag = !0, $("#fname").blur(), "logout." == document.getElementById("fname").value.toLowerCase() && "false" != localStorage.complete_access && 0 != localStorage.complete_access) localStorage.clear(), location.href = "https://www.spotify.com/us/logout";
            else if ("fullscreen." == document.getElementById("fname").value.toLowerCase() || "fs." == document.getElementById("fname").value.toLowerCase()) {
            document.getElementById("html");
            document.fullScreenElement && null !== document.fullScreenElement || !document.mozFullScreen && !document.webkitIsFullScreen ? document.documentElement.requestFullScreen ? document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen && document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen(), document.getElementById("fname").value = "", nextSongs()
        } else if ("c." == document.getElementById("fname").value.toLowerCase()) localStorage.votedArray = "", window.location.reload();
        else if ("clear votes." == document.getElementById("fname").value.toLowerCase()) resetVotes();
        else if ("temp." == document.getElementById("fname").value.toLowerCase()) localStorage.setItem("temp", !0);
        else if ("cp." == document.getElementById("fname").value.toLowerCase() || "change playlist." == document.getElementById("fname").value.toLowerCase()) location.href = "playlists.html";
        else if ("admin." == document.getElementById("fname").value.toLowerCase() || "change party name." == document.getElementById("fname").value.toLowerCase()) location.href = "welcome.html";
        else if ("i really want unlimited voting." == document.getElementById("fname").value.toLowerCase() || "uv." == document.getElementById("fname").value.toLowerCase()) resetVotes(1), localStorage.setItem("uv", "true");
        else if ("reload." == document.getElementById("fname").value.toLowerCase()) loading(), reload();
        else if ("leave party." == document.getElementById("fname").value.toLowerCase()) loading(), window.localStorage.clear("CT"), window.localStorage.clear("Snapster"), window.localStorage.clear("clicked"), window.localStorage.clear("currentTrack"), window.localStorage.clear("current_token"), window.localStorage.clear("complete_access"), window.localStorage.clear("currentlyPlaying"), window.localStorage.clear("currentlyPlayingID"), window.localStorage.clear("currentlyPlayingWC"), window.localStorage.clear("explicit"), window.localStorage.clear("host"), window.localStorage.clear("myData"), window.localStorage.clear("lastFM"), window.localStorage.clear("partyid"), window.localStorage.clear("offsetNumber"), window.localStorage.clear("totalSongs"), window.localStorage.clear("url"), window.localStorage.clear("userID"), window.location.href = "/thank-you-host.html";
        else if (document.getElementById("fname").value.toLowerCase() == localStorage.password.toString().toLowerCase() + ".") localStorage.power_voter = "yes", location.reload();
        else if ("" == document.getElementById("fname").value) nextSongs(), $("#searchResults").empty();
        else if (localStorage.Snapster) try {
            $("#searchResults").css("display", "block"), partyPlaylist = [], baseURL = "https://api.spotify.com/v1/users/", userID = localStorage.userID, searchQry = document.getElementById("fname").value.toLowerCase(), $.ajax({
                async: !0,
                type: "GET",
                url: "https://api.spotify.com/v1/search?q=" + searchQry + "&type=track,artist&market=us&limit=50&offset=0",
                headers: {
                    Authorization: "Bearer " + localStorage.current_token
                },
                dataType: "json",
                data: "formdata",
                success: function(t) {
                    for ($("#searchResults").empty(), myDataLength = t.tracks.items.length, a = 0; a < t.tracks.items.length; a++) "true" != localStorage.explicit && 1 != localStorage.explicit ? (0 == t.tracks.items[a].explicit || "false" == t.tracks.items[a].explicit && -1 == localStorage.CT.indexOf(t.items[a].track.id)) && $("#searchResults").append('<div onclick="newSong( ' + a + ' )" title="' + t.tracks.items[a].id + '" name="https://api.spotify.com/v1/users/' + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?&uris=spotify%3Atrack%3A" + t.tracks.items[a].id + '"   class="songLinkClick1 next played song-' + a + '" id="songLinkClick111' + a + '"><div class="voteBtn voteDown"></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 title="' + t.tracks.items[a].id + '"  class="block">' + t.tracks.items[a].name + '</h5> <p class="block">' + t.tracks.items[a].artists[0].name + '</p> </div> </div> <div class="voteUp voteBtn"></div></div>  </div>') : -1 == localStorage.CT.indexOf(t.tracks.items[a].id) && (0 == t.tracks.items[a].explicit || t.tracks.items[a].explicit, $("#searchResults").append('<div onclick="newSong( ' + a + ' )" title="' + t.tracks.items[a].id + '" name="https://api.spotify.com/v1/users/' + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?&uris=spotify%3Atrack%3A" + t.tracks.items[a].id + '"   class="songLinkClick1 next played song-' + a + '" id="songLinkClick111' + a + '"><div class="voteBtn voteDown"></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 title="' + t.tracks.items[a].id + '"  class="block">' + t.tracks.items[a].name + '</h5> <p class="block">' + t.tracks.items[a].artists[0].name + '</p> </div> </div> <div class="voteUp voteBtn"></div></div>  </div>'));
                    $("#all").fadeIn(1e3)
                }
            })
        } catch (t) {}
    }), window.newSong = function(t) {
        var e = "++" + $("#songLinkClick111" + t).attr("title");
        socket.emit("newSongAdded", {
            username: localStorage.userID
        }), vote(e), -1 == localStorage.CT.indexOf($("#songLinkClick111" + t).attr("title")) && $.ajax({
            type: "POST",
            url: $("#songLinkClick111" + t).attr("name"),
            headers: {
                Authorization: "Bearer " + localStorage.current_token
            },
            dataType: "json",
            data: "formdata",
            success: function(t) {
                nextSongs(), votedImg()
            },
            error: function(t) {
                nextSongs(), votedImg()
            }
        })
    }, window.playerToken = function(t) {
        $.ajax({
            type: "GET",
            url: "https://paywallios.herokuapp.com/refresh_token",
            data: {
                refresh_token: t
            },
            timeout: 12e3
        }).done(function(t) {
            localStorage.playerToken = t.access_token, location.href = "//partymusic://callback/" + localStorage.playerToken
        })
    }, localStorage.explicit && localStorage.Snapster && localStorage.current_token && localStorage.party && localStorage.lastFM && localStorage.userID && localStorage.explicit && localStorage.password) {
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
            timeout: 12e3
        }).done(function(t) {
            access_token = t.access_token, localStorage.current_token = t.access_token, setTimeout(function() {
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
            success: function(t) {
                localStorage.userID = t.id, userID = localStorage.userID, localStorage.valid = "true"
            },
            error: function() {}
        }), 3 < localStorage.party.length && 3 < localStorage.password.length && (obj2.party = localStorage.party.split(":::")[0], obj2.playlist = localStorage.Snapster + ":::" + localStorage.Snapster2, obj2.access_token = localStorage.current_token, obj2.username = localStorage.userID, obj2.explicit = localStorage.explicit, obj2.superpowers = localStorage.password, obj2.refresh_token = localStorage.refresh_token, $.ajax({
            dataType: "json",
            data: obj2,
            url: "https://paywallios.herokuapp.com/create",
            timeout: 12e3,
            success: function(t) {},
            error: function() {}
        }))
    }, window.kill = function() {
        3 < localStorage.party.length && 3 < localStorage.password.length && (obj2.party = localStorage.party.split(":::")[0] + "NEVERFIND", obj2.playlist = localStorage.Snapster + ":::" + localStorage.Snapster2, obj2.access_token = localStorage.current_token, obj2.username = localStorage.userID, obj2.explicit = localStorage.explicit, obj2.superpowers = localStorage.password, obj2.refresh_token = localStorage.refresh_token, $.ajax({
            dataType: "json",
            data: obj2,
            url: "https://paywallios.herokuapp.com/create",
            timeout: 12e3,
            success: function(t) {},
            error: function() {}
        }))
    }, setTimeout(function() {
        create()
    }, 15e3)
}
localStorage.superHost = !0, localStorage.willywonka = !0, localStorage.allowed = !0, localStorage.host = !0, localStorage.guest = !0, localStorage.valid = !0, localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public", localStorage.urlGuest = window.location.toString().split("/public/")[0] + "/guest";
var newList, object = {},
    elem = document.getElementById("html");
window.closeWin = function() {
    $.ajax({
        type: "GET",
        url: "/close",
        success: function(t) {}
    })
}, window.hosting = function() {
    1 == parseInt(localStorage.hosting) ? (localStorage.hosting = 0, $("#hosting-toggle").text("ON"), $("#hosting-toggle").css("color", "green"), setTimeout(create, 1500)) : 0 == parseInt(localStorage.hosting) && (localStorage.hosting = 1, $("#hosting-toggle").text("OFF"), $("#hosting-toggle").css("color", "red"), setTimeout(create, 1500))
}, window.checkHost = function() {
    localStorage.hosting || (localStorage.hosting = 0, $("#hosting-toggle").text("ON"), $("#hosting-toggle").css("color", "green"), setTimeout(create, 5e3)), 0 == parseInt(localStorage.hosting) && $("#hosting-toggle").text("") ? ($("#hosting-toggle").text("ON"), $("#hosting-toggle").css("color", "green")) : 1 == parseInt(localStorage.hosting) && $("#hosting-toggle").text("") && ($("#hosting-toggle").text("OFF"), $("#hosting-toggle").css("color", "red"))
}, checkHost(), window.saveList = function() {
    var t = {
        name: "Swagger Jukebox - Saved"
    };
    $.ajax({
        async: !0,
        type: "PUT",
        url: "https://api.spotify.com/v1/playlists/" + localStorage.Snapster,
        headers: {
            Authorization: "Bearer " + localStorage.current_token
        },
        dataType: "json",
        data: JSON.stringify(t),
        success: function(t) {}
    }), setTimeout(tognav, 500)
};
var p2 = "https://play.spotify.com/track/";
localStorage.setItem("guest", !0), localStorage.setItem("temp", !0), localStorage.setItem("allowed", !0), window.start = function() {
    $.ajax({
        async: !0,
        type: "GET",
        url: "https://api.spotify.com/v1/me",
        headers: {
            Authorization: "Bearer " + localStorage.current_token
        },
        dataType: "json",
        data: "formdata",
        success: function(t) {
            localStorage.userID = t.id, userID = localStorage.userID, localStorage.valid = "true"
        }
    })
}, setTimeout(function() {
    !localStorage.userID || localStorage.Snapster || localStorage.party || (location.href = localStorage.urlParts + "/welcome.html")
}, 1e3), window.guest = function() {
    localStorage.removeItem("host"), location.href = "//partymusic://pause", setTimeout(function() {
        return location.href = localStorage.urlGuest + "/app.html", !1
    }, 250)
}, window.playlists = function() {
    location.href = localStorage.urlParts + "/playlists.html"
}, window.relo = function() {
    return location.href = localStorage.urlParts + "/index.html", !1
}, window.saveList = function() {
    var t = {
        name: "Swagger Jukebox - Saved"
    };
    $.ajax({
        async: !0,
        type: "PUT",
        url: "https://api.spotify.com/v1/playlists/" + localStorage.Snapster,
        headers: {
            Authorization: "Bearer " + localStorage.current_token
        },
        dataType: "json",
        data: JSON.stringify(t),
        success: function(t) {}
    }), setTimeout(tognav, 500)
}, window.purgify = function() {
    location.href = "//partymusic://purgify"
}, window.removeHTML = function() {
    document.hasFocus() && history.replaceState("/index.html", document.title, "Swagger Jukebox")
}, window.reloadify = function() {
    return $("#load").hide(), !1
}, window.terminate = function() {
    localStorage.urlParts;
    localStorage.clear(), location.href = "//partymusic://terminate", localStorage.clear()
}, window.softTerminate = function() {
    Cookies.remove("locStore"), Cookies.remove("justClicked");
    localStorage.urlParts;
    localStorage.clear(), setTimeout(function() {
        location.href = "//partymusic://softterminate"
    }, 250)
}, window.settings = function() {
    location.href = localStorage.urlParts + "/welcome.html"
}, window.terms = function() {
    $("#dialogPage").hide(), location.href = "//partymusic://terms"
}, window.privacy = function() {
    $("#dialogPage").hide(), location.href = "//partymusic://privacy"
}, Cookies.get("karma") || Cookies.set("karma", "25", {
    expires: 30
}), Cookies.remove("justClicked"), 5 < localStorage.length && (Cookies.set("locStore", JSON.stringify(localStorage), {
    expires: 100
}), Cookies.set("locStore2", JSON.stringify(localStorage), {
    expires: 100
})), setTimeout(function() {
    localStorage.wasPressed = 1, localStorage.i || (localStorage.i = 1)
}, 4e3), setTimeout(function() {
    Cookies.get("partyInfo") || (Cookies.set("partyInfo", "true", {
        expires: 30
    }), location.href = "//partymusic://yourPartyName:::" + localStorage.party)
}, 1e3), window.startPlaying = function(t) {
    localStorage.Snapster = t, localStorage.removeItem("songList"), setTimeout(function() {
        location.href = localStorage.urlParts + "/index.html"
    }, 200)
}, window.tognav = function() {
    $("#mySidenav").toggle(function() {
        $("#mySidenav").css("width", "80%")
    })
}, window.openLink = function(t, e) {
    var a, o, s;
    for (o = document.getElementsByClassName("tabcontent"), a = 0; a < o.length; a++) o[a].style.display = "none";
    for (s = document.getElementsByClassName("tablinks"), a = 0; a < s.length; a++) s[a].className = s[a].className.replace(" active", "");
    "nav1" != e ? $("#mySidenav").css("width", "") : $("#mySidenav").css("width", "85%"), document.getElementById(e).style.display = "block", t.currentTarget.className += " active"
}, window.changeLink = function(t, e) {
    var a, o;
    for (document.getElementsByClassName("tabcontent"), o = document.getElementsByClassName("tablinks"), a = 0; a < o.length; a++) o[a].className = o[a].className.replace(" active", "");
    t.currentTarget.className += " active"
}, setTimeout(function() {
    document.getElementById("defaultTab").click()
}, 250);