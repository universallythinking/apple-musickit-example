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

    window.now = function(song, a) {
    localStorage.nowp = song; nextSongsCache();
      addtoq(song, "song");
      setTimeout(function() {
        music.changeToMediaAtIndex(MusicKit.getInstance().player.queue.items[MusicKit.getInstance().player.queue.items.length - 1]);
        play();
      }, 200);
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
      music.api.library.playlist("p.eoGxRGoCZDgWmR8").then(data => {
        localStorage.playlistData = JSON.stringify(data);
      });
      
    };
    window.auth = function () {
    music.authorize().then(musicUserToken => {
      console.log(`Authorized, music-user-token: ${musicUserToken}`);
      music.api.library.playlist("p.eoGxRGoCZDgWmR8").then(data => {
        localStorage.playlistData = JSON.stringify(data);
      });
    });
  }
  auth();
    // expose our instance globally for testing
    window.music = music;
  });
}, 1000);
