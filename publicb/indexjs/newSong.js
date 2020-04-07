//$(document).ready(function () {
                  window.resetVotes=function(){if(1==1){localStorage.votes="";localStorage.setItem("STOP","true");var a={};a.username=localStorage.userID,$.ajax({url:"https://paywallios.herokuapp.com/clearVotes",dataType:"json",data:a,success:function(a){localStorage.STOP="false",localStorage.votes=""; }})}};
                  
                  var userID;
                  var baseURL;
                  var searchQry;
                  var myDataLength;
                  var partyPlaylist;
                  var listOfTracks = [];
                  $("#filename").on('blur', function () {
                                    $("#filename").hide();
                                    });
                  $("#search").on('click', function () {
                                  $("#filename").show();
                                  $("#filename").focus();
                                  });
                  
                  $('#filename').on('keypress', function () {
                                    $("#html").scroll(function(e){ e.preventDefault(); e.stopPropogagtion();});
                                    // $("#filename").keydown(function (event) {
                                    if (event.which === 13) {
                                    $("#filename").blur();
                                    if (document.getElementById('filename').value.toLowerCase() == "logout." && localStorage["complete_access"] != "false" && localStorage["complete_access"] != false)
                                    {
                                    localStorage.clear();
                                    location.href = "https://www.spotify.com/us/logout";
                                    }
                                    else if (document.getElementById('filename').value.toLowerCase() == "fullscreen." || document.getElementById('filename').value.toLowerCase() == "fs.") {
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
                                    document.getElementById('filename').value = "";
                                    nextSongs();
                                    }
                                    
                                    else if (document.getElementById('filename').value.toLowerCase() == "c.") {
                                    localStorage.votedArray = "";
                                    window.location.reload();
                                    }
                                    else if (document.getElementById('filename').value.toLowerCase() == "clear votes.") {
                                    resetVotes();
                                    }
                                    else if (document.getElementById('filename').value.toLowerCase() == "temp.") {
                                    localStorage.setItem("temp", true);
                                    }
                                    else if (document.getElementById('filename').value.toLowerCase() == "cp." || document.getElementById('filename').value.toLowerCase() == "change playlist.") {
                                    location.href = "playlists.html";
                                    }
                                    else if (document.getElementById('filename').value.toLowerCase() == "admin." || document.getElementById('filename').value.toLowerCase() == "change party name.") {
                                    location.href = "welcome.html";
                                    }
                                    else if (document.getElementById('filename').value.toLowerCase() == "i really want unlimited voting." || document.getElementById('filename').value.toLowerCase() == "uv.") {
                                    resetVotes(1);
                                    localStorage.setItem("uv", "true");
                                    }
                                    else if (document.getElementById('filename').value.toLowerCase() == "reload.") {
                                    loading();
                                    reload();
                                    }
                                    else if (document.getElementById('filename').value.toLowerCase() == "leave party.") {
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
                                    else if (document.getElementById('filename').value.toLowerCase() == localStorage["password"].toString().toLowerCase() + ".") {
                                    localStorage["power_voter"] = "yes";
                                    location.reload();
                                    }
                                    else if (document.getElementById('filename').value == "") {
                                    nextSongs();
                                    $("#albumart").show();
                                    $("#results").show();
                                    //$("#results").attr("style", "");
                                    }
                                    else if (localStorage.Snapster) {
                                    try {
                                    $("#results").css("display", "block");
                                    partyPlaylist = [];
                                    baseURL = "https://api.spotify.com/v1/users/";
                                    userID = localStorage.userID;
                                    searchQry = document.getElementById('filename').value.toLowerCase();
                                    $.ajax({
                                           async: true,
                                           type: "GET",
                                           url: "https://api.spotify.com/v1/search?q=" + searchQry + "&type=track,artist&market=us&limit=50&offset=0",
                                           headers: { 'Authorization': 'Bearer ' + localStorage.current_token  },
                                           dataType: "json",
                                           data: "formdata",
                                           success: function (myData) {
                                           $("#albumart").hide();
                                           $("#results").empty();
                                           myDataLength = myData.tracks.items.length;
                                           for (i = 0; i < myData.tracks.items.length; i++) {
                                           if (localStorage["explicit"] != "true" && localStorage["explicit"] != true) {
                                           if (myData.tracks.items[i].explicit == false || myData.tracks.items[i].explicit == "false" && localStorage.CT.indexOf(myData.items[i].track.id.substring(1,5)) == -1) {
                                           $("#results").append("<div style='color: white !important; pointer-events: all;' onclick='newSong( " + i + " )' title='" + myData.tracks.items[i].id + "' id='songLinkClick" + i + "'class='songLinkClick' name=" + "'https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?&uris=spotify%3Atrack%3A" + myData.tracks.items[i].id + "'>" + "<div> <a>C</a> </div> <div class='titles'> <h5 class'block'>" + myData.tracks.items[i].artists[0].name + "</p> <p class='block'>" + myData.tracks.items[i].name + "</p> </div> <div> <a><i class='fa fa-plus' aria-hidden='true'></i></a> </div> </div>");
                                           }
                                           }
                                           else if (localStorage.CT.indexOf(myData.tracks.items[i].id.substring(1,5)) == -1) {
                                           if (myData.tracks.items[i].explicit == false || myData.tracks.items[i].explicit == "false") {
                                           $("#results").append("<header style='color: white !important; pointer-events: all;' onclick='newSong( " + i + " )' title='" + myData.tracks.items[i].id + "' id='songLinkClick" + i + "'class='songLinkClick' name=" + "'https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?&uris=spotify%3Atrack%3A" + myData.tracks.items[i].id + "'>" + "<div> <a>C</a> </div> <div class='titles'> <h5 class'block'>" + myData.tracks.items[i].artists[0].name + "</p> <p class='block'>" + myData.tracks.items[i].name + "</p> </div> <div> <a><i class='fa fa-plus' aria-hidden='true'></i></a> </div> </div>");
                                           }
                                           else {
                                           $("#results").append("<div style='color: white !important; pointer-events: all;' onclick='newSong( " + i + " )' title='" + myData.tracks.items[i].id + "' id='songLinkClick" + i + "'class='songLinkClick' name=" + "'https://api.spotify.com/v1/users/" + localStorage.userID + "/playlists/" + localStorage.Snapster + "/tracks?&uris=spotify%3Atrack%3A" + myData.tracks.items[i].id + "'>" + "<div> <a><i class='fa fa-exclamation-triangle' aria-hidden='true'></i></a> </div> <div class='titles'> <h5 class'block'>" + myData.tracks.items[i].artists[0].name + "</p> <p class='block'>" + myData.tracks.items[i].name + "</p> </div> <div> <a><i class='fa fa-plus' aria-hidden='true'></i></a> </div> </div>");
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
                  var song = '++' + $("#songLinkClick" + i).attr("title").substring(1,5);
                  vote(song);
                  $.ajax({
                         type: "POST",
                         url: $("#songLinkClick" + i).attr("name"),
                         headers: { 'Authorization': 'Bearer ' + localStorage.current_token  },
                         dataType: "json",
                         data: "formdata",
                         success: function (dataFirst) {
                         nextSongs();
                         },
                         error: function(e) {
                         nextSongs();
                         }
                         });
                  }
                //  });
