// listen for MusicKit Loaded callback
setTimeout(function() {
    // MusicKit global is now defined
    fetch('/token').then(response => response.json()).then(res => {
      /***
        Configure our MusicKit instance with the signed token from server, returns a configured MusicKit Instance
        https://developer.apple.com/documentation/musickitjs/musickit/musickitinstance
      ***/
     localStorage.token = res.token;
      const music = MusicKit.configure({
        developerToken: res.token,
        app: {
          name: 'AppleMusicKitExample',
          build: '1978.4.1'
        }
      });
  
      // setup click handlers
      window.addtoq = function (idInput, typeInput) {
        /***
          Add an item to the playback queue
          https://developer.apple.com/documentation/musickitjs/musickit/musickitinstance/2992716-setqueue
        ***/
        music.setQueue({
          [typeInput]: idInput
        });
      };
  
      window.apiHeaders = function() {
          return new Headers({
            Authorization: 'Bearer ' + MusicKit.getInstance().developerToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Music-User-Token': '' + MusicKit.getInstance().musicUserToken
          });
      }
  
      window.usePlaylist = function(a) {
        localStorage.Snapster = a;
        $("#playlistsListed").hide();
        $("#whole").show();
        setTimeout(location.reload(), 500);
      }
  
      window.viewPlaylists = function() {
        $("#playlistsListed").empty();
        if(localStorage.playlistsData) {
          $("#whole").hide();
          $("#playlistsListed").append("<header style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: 50px;' class='songLinkClick1 items playlist'><div><center class='items' style='font-size: 200%; padding-top: 50px; padding-bottom: 50px;'>Choose a Playlist</center></div></header>");
          $("#playlistsListed").show();
          let e = JSON.parse(localStorage.playlistsData);
          let data = e;
          for (var a = 0; a < e.length; a++)
              if(data[a].attributes.canEdit == true) $("#playlistsListed").append('<div title="'+e[a].id+'" class="songLinkClick1 next played items song-'+a+'" id="songLinkClick'+a+'"><div class="info"><div class="imgfirst"></div><div class="titles"><h5 onclick="usePlaylist(\''+e[a].id.toString()+'\');" class="block">'+e[a].attributes.name+'</h5><p class="block"><span class="artistName"></span><span class="albumName"></span></p></div><div class="buttons"><div class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div><div class="voteUp voteBtn" data="'+a+'" name="0"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div><sup></sup></div></div></div>')
                    $(".items").wrapAll("<div id='playlistContainer'></div>");
    } else {
            music.api.library.playlists().then(data => {
              $("#whole").hide();
              $("#playlistsListed").append("<header style='color: white !important; pointer-events: all; margin-bottom: 50px; margin-top: 50px;' class='songLinkClick1 items playlist'><div><center class='items' style='font-size: 200%; padding-top: 50px; padding-bottom: 50px;'>Choose a Playlist</center></div></header>");
              $("#playlistsListed").show();
              localStorage.playlistsData = JSON.stringify(data);
              let e = JSON.parse(localStorage.playlistsData);
              for (var a = 0; a < e.length; a++)
                  if(data[a].attributes.canEdit == true) $("#playlistsListed").append('<div title="'+e[a].id+'" class="songLinkClick1 next played items song-'+a+'" id="songLinkClick'+a+'"><div class="info"><div class="imgfirst"></div><div class="titles"><h5 onclick="usePlaylist(\''+e[a].id.toString()+'\');" class="block">'+e[a].attributes.name+'</h5><p class="block"><span class="artistName"></span><span class="albumName"></span></p></div><div class="buttons"><div class="voteBtn voteDown"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div><div class="voteUp voteBtn" data="'+a+'" name="0"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div><sup></sup></div></div></div>')
                        $(".items").wrapAll("<div id='playlistContainer'></div>");
            });
    }
      }
  
      window.addToList = function() {
        var playlistId = localStorage.Snapster;
        var obj = {};
        obj.id = "201281527";
        obj.type = "songs";
        var arr = [].push(obj);
        var obj2 = {arr}
        fetch(`https://api.music.apple.com/v1/me/library/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: apiHeaders(),
            body: JSON.stringify({
              data: [obj]
            })
          });
      }
  
      window.now = function(song) {
        music.setQueue({ song: song}).then(function() {
            music.play();
            localStorage.nowp = song;
            nextSongsCache();
        });
      }
      window.play = function () {
        /***
          Resume or start playback of media item
          https://developer.apple.com/documentation/musickitjs/musickit/musickitinstance/2992709-play
        ***/
        music.play();
      };

      window.pause = function () {
        /***
          Pause playback of media item
          https://developer.apple.com/documentation/musickitjs/musickit/musickitinstance/2992708-pause
        ***/
  
        music.pause();
        /*
        music.api.library.playlists().then(data => {
          console.log(`Authorized, music-user-token: ${JSON.stringify(data)}`);
        });
        */
  
      };

      window.playPause = function() {
          if(music.player.isPlaying) {
              pause();
          } else {
              play();
          }
      }
  
      window.search = function() {
        music.api.search(document.getElementById("fname").value.toLowerCase(), { limit: 100, types: 'songs' }).then(function(data) {
          $("#searchResults").empty();
          console.log(JSON.stringify(data.songs.data));
          
          let s = data.songs.data;
          for (var t = 0; t < s.length; t++) 
          $("#searchResults").append('<div onclick="newSong( ' + s[t].id + ' )" title="' + s[t].id + '" data="' + s[t].id.substring(1, 5) + '" class="songLinkClick1 next played song-' + t + '" id="songLinkClick111' + t + '"> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 title="' + s[t].id + '"  class="block">' + s[t].attributes.name + '</h5><p class="block"><span class="artistName">' + s[t].attributes.artistName + '</span> <span class="albumName"> &#183; ' + s[t].attributes.albumName + '</span></p> </div> <div class="buttons"> <div onclick="vote(\'' + s[t].id + '\', 0)" class="voteBtn voteDown"></div><div class="voteUp voteBtn" name="0"></div><sup></sup></div></div></div>');
          });
          
      }
  
    music.addEventListener("playbackStateDidChange", function() {
        if(music.player.playbackState == 10) now($(".songLinkClick").eq(0).attr("title"));
    })

      window.firstSong = function() {
        if(!$("#song").attr("title")) now($(".songLinkClick").eq(0).attr("title"));
        if($("#song").attr("title")) now($("#song").attr("title"));
    }
      window.auth = function () {
      music.authorize().then(musicUserToken => {
        localStorage.token = musicUserToken;
        console.log(`Authorized, music-user-token: ${musicUserToken}`);
        music.api.library.playlist(localStorage.Snapster).then(data => {
          localStorage.playlistData = JSON.stringify(data);
          setTimeout(firstSong, 1000);
          nextSongsCache();
        });
        if(!localStorage.Snapster) viewPlaylists();
        //location.href = "/index.html";
      });
    }
    auth();
      // expose our instance globally for testing
      window.music = music;
    });
    
  }, 1000);
  