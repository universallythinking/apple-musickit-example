$(document).ready(function() {
WEB_SOCKET_SWF_LOCATION = 'https://socketswagger.herokuapp.com/socket.io/inc/WebSocketMain.swf';
    var socket = io.connect('https://socketswagger.herokuapp.com/');
    socket.on(localStorage.userID, function (data) {
        //socket.reconnect();
        socket.emit('ready for data', {});
    });
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

                                        socket.on(localStorage.userID + 'test', function (data) {

                                                  setTimeout(calculateVotes, 500);

                                                  console.log("VOTES " + data.body);

                                        });

                                        socket.on(localStorage.userID + 'prev', function (data) {

                                                  setTimeout(function() { prev(); }, 300);

                                        });

                                        socket.on(localStorage.userID + 'nextSong', function (data) {
                                                  var a = data.split(":::")[0];
                                                  console.log(a);
                                                  var e = $("[title=" + a + "]")[0].id.slice(13);

                                                  setTimeout(function() { $("#playNow" + e).click(); }, 100);
                                                  setTimeout(function() { nextSongs(); }, 300);


                                        });

                                        socket.on(localStorage.userID + 'increment', function (data) {

                                                  increment(1);
                                                  setTimeout(function() { relo(); }, 1000);

                                        });

                                        socket.on(localStorage.userID + 'newPlaylist', function (data) {

                                                  localStorage.Snapster = data.split(":::")[0];

                                                  setTimeout(function() {  nextSongs(); }, 1000);
                                                  setTimeout(function() { prev(); }, 2000);

                                        });

                                        socket.on(localStorage.userID + 'pause', function (data) {

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
});