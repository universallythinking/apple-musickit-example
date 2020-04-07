                  localStorage.combo = localStorage.userID +":::"+ localStorage.password;
                  WEB_SOCKET_SWF_LOCATION = 'https://socketswagger.herokuapp.com/socket.io/inc/WebSocketMain.swf';
                  var socket = io.connect('https://socketswagger.herokuapp.com/');
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
    var tick = 0;
                  if(!localStorage.hashNum) {
                   localStorage.hashNum = hashCodeNum(new Date().getTime().toString());
                  }
                  window.recon = function () {
                  var socketData = {};
                  socketData.combo = localStorage.combo;
                  socketData.username = localStorage.userID;
                  socketData.hash = localStorage.hashNum;
                  $.ajax({
                         url: "https://socketswagger.herokuapp.com/start",
                         dataType: "json",
                         data: socketData,
                         success: function(t) {
                         console.log("SUCCESS " + t);
                         },
                         error: function(err) {
                         console.log("Error " + JSON.stringify(err));
                         }
                         });
                  setTimeout(function() {
                             socket = io.connect('https://socketswagger.herokuapp.com/');
                         socket.on(localStorage.userID, function (data) {
                            //socket.reconnect();
                            socket.emit('ready for data', {});
                            });
                  socket.on(localStorage.userID + 'updateios', function (data) {
                           if(data.body.length > 10 && localStorage.votes != data.body) {
                           localStorage.votes = data.body;
                                                       calculateVotes();
                                                       console.log("VOTES " + data.body);
                           }
                            });
                  socket.on(localStorage.combo + 'test', function (data) {
                            setTimeout(calculateVotes, 500);
                            console.log("VOTES " + data.body);
                            });
                  socket.on(localStorage.userID + 'songChange', function (data) {
                            /*if(localStorage.nowp != data && data.length > 6) {
                            localStorage.nowp = data;
                            setTimeout(nS,500);
                            }*/
                            });
                  socket.on(localStorage.userID + 'newPlaylist', function (data) {
                            if(localStorage.Snapster != data && data.length > 6 && 1==2) {
                            localStorage.Snapster = data;
                            localStorage.removeItem("nowp");
                            Cookies.remove("songList");
                            setTimeout(function() { location.href = location.href; }, 2000);
                            }
                            });
                  socket.on(localStorage.userID + 'newSong', function (data) {
                             setTimeout(nextSongs,3000);
                            });
                             }, 2000);
                         }
                         socket.on("disconnect", function(data) {
                            //recon();
                         });
                        // recon();
                  setTimeout(recon, 3000);
                  
                  window.resetVotes=function(){localStorage.votes="";localStorage.setItem("STOP","true");var a={};a.username=localStorage.userID,$.ajax({url:"https://paywallios.herokuapp.com/clearVotes",dataType:"json",data:a,success:function(ab){localStorage.votes=""; calculateVotes(); }, error:function(ab){localStorage.votes=""; calculateVotes(); }})};
                  
                  var userID;
                  var baseURL;
                  var searchQry;
                  var myDataLength;
                  var partyPlaylist;
                  var listOfTracks = [];
                  $("#fname").on('blur', function () {
                                    //$("#fname").hide();
                                    });
                  $("#search").on('click', function () {
                                  $("#fname").show();
                                  $("#fname").focus();
                                  });
                  
                  $('#fname').on('keypress', function () {
                                    $("#html").scroll(function(e){ e.preventDefault(); e.stopPropogagtion();});
                                    // $("#fname").keydown(function (event) {
                                    if (event.which === 13) {
                                    localStorage.searchFlag = true;
                                    $("#fname").blur();
                                    if (document.getElementById('fname').value.toLowerCase() == "logout." && localStorage["complete_access"] != "false" && localStorage["complete_access"] != false)
                                    {
                                    localStorage.clear();
                                    location.href = "https://www.spotify.com/us/logout";
                                    }
                                    else if (document.getElementById('fname').value.toLowerCase() == "fullscreen." || document.getElementById('fname').value.toLowerCase() == "fs.") {
                                    var elem = document.getElementById("html");
                                    function toggleFullScreen() {
                                    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                                        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                                    if (document.documentElement.requestFullScreen) {
                                    document.documentElement.requestFullScreen();
                                    } else if (document.documentElement.mozRequestFullScreen) {
                                    document.documentElement.mozRequestFullScreen();
                                    } else if (document.documentElement.webkitRequestFullScreen) {
                                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                                    }
                                    } else {
                                    if (document.cancelFullScreen) {
                                    document.cancelFullScreen();
                                    } else if (document.mozCancelFullScreen) {
                                    document.mozCancelFullScreen();
                                    } else if (document.webkitCancelFullScreen) {
                                    document.webkitCancelFullScreen();
                                    }
                                    }
                                    }
                                    toggleFullScreen();
                                    document.getElementById('fname').value = "";
                                    nextSongs();
                                    }
                                    
                                    else if (document.getElementById('fname').value.toLowerCase() == "c.") {
                                    localStorage.votedArray = "";
                                    window.location.reload();
                                    }
                                    else if (document.getElementById('fname').value.toLowerCase() == "clear votes.") {
                                    resetVotes();
                                    }
                                    else if (document.getElementById('fname').value.toLowerCase() == "temp.") {
                                    localStorage.setItem("temp", true);
                                    }
                                    else if (document.getElementById('fname').value.toLowerCase() == "cp." || document.getElementById('fname').value.toLowerCase() == "change playlist.") {
                                    location.href = "playlists.html";
                                    }
                                    else if (document.getElementById('fname').value.toLowerCase() == "admin." || document.getElementById('fname').value.toLowerCase() == "change party name.") {
                                    location.href = "welcome.html";
                                    }
                                    else if (document.getElementById('fname').value.toLowerCase() == "i really want unlimited voting." || document.getElementById('fname').value.toLowerCase() == "uv.") {
                                    resetVotes(1);
                                    localStorage.setItem("uv", "true");
                                    }
                                    else if (document.getElementById('fname').value.toLowerCase() == "reload.") {
                                    loading();
                                    reload();
                                    }
                                    else if (document.getElementById('fname').value.toLowerCase() == "leave party.") {
                                    loading();
                                    window.localStorage.clear("CT");
                                    window.localStorage.clear("Snapster");
                                    window.localStorage.clear("clicked");
                                    window.localStorage.clear("currentTrack");
                                    window.localStorage.clear("current_token");
                                    window.localStorage.clear("complete_access");
                                    window.localStorage.clear("currentlyPlaying");
                                    window.localStorage.clear("currentlyPlayingID");
                                    window.localStorage.clear("currentlyPlayingWC");
                                    window.localStorage.clear("explicit");
                                    window.localStorage.clear("host");
                                    window.localStorage.clear("myData");
                                    window.localStorage.clear("lastFM");
                                    window.localStorage.clear("partyid");
                                    window.localStorage.clear("offsetNumber");
                                    window.localStorage.clear("totalSongs");
                                    window.localStorage.clear("url");
                                    window.localStorage.clear("userID");
                                    window.location.href = "/thank-you-host.html";
                                    }
                                    else if (document.getElementById('fname').value.toLowerCase() == localStorage["password"].toString().toLowerCase() + ".") {
                                    localStorage["power_voter"] = "yes";
                                    location.reload();
                                    }
                                    else if (document.getElementById('fname').value == "") {
                                    nextSongs();
                                    $("#searchResults").empty();
                                    //$("#searchResults").attr("style", "");
                                    }
                                    else if (localStorage.Snapster) {
                                    try {
                                    $("#searchResults").css("display", "block");
                                    partyPlaylist = [];
                                    baseURL = "https://api.spotify.com/v1/users/";
                                    userID = localStorage.userID;
                                    searchQry = document.getElementById('fname').value.toLowerCase();
                                    $.ajax({
                                           async: true,
                                           type: "GET",
                                           url: "https://api.spotify.com/v1/search?q=" + searchQry + "&type=track,artist&market=us&limit=50&offset=0",
                                           headers: { 'Authorization': 'Bearer ' + localStorage.current_token  },
                                           dataType: "json",
                                           data: "formdata",
                                           success: function (myData) {
                                           //$("#albumart").hide();
                                           $("#searchResults").empty();
                                           myDataLength = myData.tracks.items.length;
                                           for (a = 0; a < myData.tracks.items.length; a++) {
                                           if (localStorage["explicit"] != "true" && localStorage["explicit"] != true) {
                                           if (myData.tracks.items[a].explicit == false || myData.tracks.items[a].explicit == "false" && localStorage.CT.indexOf(myData.items[a].track.id) == -1) {
                                           $("#searchResults").append('<div onclick="newSong( ' + a + ' )" title="' + myData.tracks.items[a].id + '" name="' + 'https://api.spotify.com/v1/users/' + localStorage.userID + '/playlists/' + localStorage.Snapster + '/tracks?&uris=spotify%3Atrack%3A' + myData.tracks.items[a].id + '"   class="songLinkClick1 next played song-' + a + '" id="songLinkClick111' + a + '"><div class="voteBtn voteDown"></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 title="' + myData.tracks.items[a].id + '"  class="block">' + myData.tracks.items[a].name + '</h5> <p class="block">' + myData.tracks.items[a].artists[0].name + '</p> </div> </div> <div class="voteUp voteBtn"></div></div>  </div>');
                                           }
                                           }
                                           else if (localStorage.CT.indexOf(myData.tracks.items[a].id) == -1) {
                                           if (myData.tracks.items[a].explicit == false || myData.tracks.items[a].explicit == "false") {
                                           $("#searchResults").append('<div onclick="newSong( ' + a + ' )" title="' + myData.tracks.items[a].id + '" name="' + 'https://api.spotify.com/v1/users/' + localStorage.userID + '/playlists/' + localStorage.Snapster + '/tracks?&uris=spotify%3Atrack%3A' + myData.tracks.items[a].id + '"   class="songLinkClick1 next played song-' + a + '" id="songLinkClick111' + a + '"><div class="voteBtn voteDown"></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 title="' + myData.tracks.items[a].id + '"  class="block">' + myData.tracks.items[a].name + '</h5> <p class="block">' + myData.tracks.items[a].artists[0].name + '</p> </div> </div> <div class="voteUp voteBtn"></div></div>  </div>');
                                           }
                                           else {
                                           $("#searchResults").append('<div onclick="newSong( ' + a + ' )" title="' + myData.tracks.items[a].id + '" name="' + 'https://api.spotify.com/v1/users/' + localStorage.userID + '/playlists/' + localStorage.Snapster + '/tracks?&uris=spotify%3Atrack%3A' + myData.tracks.items[a].id + '"   class="songLinkClick1 next played song-' + a + '" id="songLinkClick111' + a + '"><div class="voteBtn voteDown"></div> <div class="info"> <div class="img first"></div> <div class="titles"> <h5 title="' + myData.tracks.items[a].id + '"  class="block">' + myData.tracks.items[a].name + '</h5> <p class="block">' + myData.tracks.items[a].artists[0].name + '</p> </div> </div> <div class="voteUp voteBtn"></div></div>  </div>');
                                           }
                                           }
                                           }
                                           $("#all").fadeIn(1000);
                                           }
                                           });
                                    }
                                    
                                    catch (exception) {
                                    // console.log(exception);
                                    }
                                    
                                    }
                                    }
                                    });
                  window.newSong = function(i) {
                  var song = '++' + $("#songLinkClick111" + i).attr("title");
                  socket.emit('newSongAdded', { username: localStorage.userID });
                  vote(song);
                  if(localStorage.CT.indexOf($("#songLinkClick111" + i).attr("title")) == -1) {
                  $.ajax({
                         type: "POST",
                         url: $("#songLinkClick111" + i).attr("name"),
                         headers: { 'Authorization': 'Bearer ' + localStorage.current_token  },
                         dataType: "json",
                         data: "formdata",
                         success: function (dataFirst) {
                         //location.href = "//partymusic://newSongAdded";
                         nextSongs();
                         votedImg();
                         //setTimeout(function() { location.href = location.href; },3000);
                         },
                         error: function(e) {
                         //location.href = "//partymusic://newSongAdded";
                         nextSongs();
                         votedImg();
                         //$("#songLinkClick1" + i).css({"color": "gray"});  //, "pointer-events": "none"});
                         //setTimeout(function() { location.href = location.href; },3000);
                         }
                         });
                         }
                  }