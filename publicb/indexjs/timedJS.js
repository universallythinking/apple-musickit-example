$(document).ready(function () {
if (localStorage.lastFM && localStorage.explicit && localStorage.Snapster && $("#results").children("header")) {

   if (localStorage.host || localStorage.guest) {
       var myInt = setInterval(function () {
           if (!document.hidden || 1 === 1) {
               votes();
           } else { clearInterval(myInt) }
       }, 700);
    }
else {
	clearInterval(myInt);
}
if (localStorage.host || localStorage.guest) {
      var myInt2 = setInterval(function(){if (!document.hidden || 1 === 1) { votedSongs(); } else {clearInterval(myInt2) } }, 2500);
     // setInterval(function(){if (localStorage.temp) { localStorage.lastFM = localStorage.party } }, 2500);
 }
}
if (!document.hidden && (localStorage.guest || localStorage.host)) {
var intervalTBC = setInterval(function() {
    if (localStorage.party && localStorage.temp) {
        document.title = localStorage.party.toUpperCase();
	clearInterval(intervalTBC);
    }
}, 2000);
        if (localStorage.lastFM) {
            setInterval(function () {
                if (document.hasFocus() || localStorage.votedArray && localStorage.uv != "true") {
                       for (i = 0; i < $("#results").children("header").length; i++) {
                               if ((document.getElementById('filename').value === "" || document.getElementById('filename').value === "Song or Artist...") && localStorage["votedArray"].toUpperCase().indexOf($("#songLinkClick" + i).children("div")[1].lastElementChild.innerText.toUpperCase()) !== -1) {
                                  $("#songLinkClick" + i)[0].children[2].children[0].style.color = "black";
                                  $("#songLinkClick" + i)[0].children[0].children[0].style.color = "black";
                                  $("#songLinkClick" + i)[0].children[0].style.pointerEvents = "none";
                                 $("#songLinkClick" + i)[0].children[2].style.pointerEvents = "none";
                             }
                           }
                       }

            }, 2000);

            setInterval(function () {
            if ($("#results").children("header").length < 1 && localStorage.party) {
                loading();
                nextSongs();
            }
          }, 2000);

            setInterval(function () {
            if ($("#results").children("header").length > 2 && localStorage.party) {
               votes();
               votedSongs();
            }
            }, 5000);


            setInterval(function () {
                if (!document.hasFocus() || localStorage["lastFM"] && localStorage.party) {
                    newToken();
                }
            }, 30000);

            setInterval(function () {
                try {
                if (document.hasFocus() || localStorage.party) {
                    if ($('[name="current"]').text().length === -1 || $('[name="current"]').text().toUpperCase().indexOf(localStorage["currentlyPlayingWC"].substring(1, 10)) === -1 && (document.getElementById('filename').value === "Join a Party..." || document.getElementById('filename').value === "") && localStorage["explicit"]) {
                       if ($('#currentSong').text().toUpperCase().indexOf($("#songLinkClick0")[0].children[1].children[1].outerText.toUpperCase()) === -1) {
                        nextSongs();
                }
                }
            }
                }
                catch (exception) {
                    return;
                }
            }, 10000);

            setInterval(function () {
                newToken();
            }, 300000);

           window.checkList = function () {
                if (document.hasFocus() || 1 === 1) {
                  var listOfTracks = [];
                  var listOfTracks2 = [];
                    var resultsContents = [];
                    if (localStorage["userID"]) {
                        $.ajax({
                            async: false,
                            type: "GET",
                            url: "https://api.spotify.com/v1/users/" + localStorage['userID'] + "/playlists/" + localStorage['Snapster'] + "/tracks?limit=100&offset=" + localStorage["offsetNumber"],
                            headers: { 'Authorization': 'Bearer ' + access_token },
                            dataType: "json",
                            data: "formdata",
                            success: function (trackData) {
                                for (var i = 0; i < trackData.items.length; i++) {
                                    listOfTracks[i] = trackData.items[i].track.name.toUpperCase();
                                    listOfTracks2[i] = trackData.items[i].track.name + "*";
                                }
                            }
                        });
                    }

                    if ($("#results").children("header").length > 0 && localStorage["explicit"] && (document.getElementById('filename').value === "Join a Party..." || document.getElementById('filename').value === "")) {
                        for (i = 0; i < $("#results").children("header").length; i++) {
                            resultsContents[i] = $("#songLinkClick" + i)[0].children[1].lastElementChild.innerText.toUpperCase();
                        }
                        localStorage["resultsContents"] = resultsContents.toString();
                        localStorage["listOfTracks"] = listOfTracks.toString();
                        localStorage["listOfTracks2"] = listOfTracks2.toString();
                        if (localStorage["listOfTracks"].toUpperCase().indexOf(localStorage["resultsContents"].toUpperCase()) === -1) {
                             // nextSongs();
                        }
                    }
                }

            }

            window.clearStorage = function() {
                if (localStorage["cleared"] === true || localStorage["cleared"] === "true") {
                    window.localStorage.clear();
                }
            }
            setInterval(function () {
                if (localStorage.party && $("#results").children("header").length === 0 && localStorage["explicit"] && (document.getElementById('filename').value === "Join a Party..." || document.getElementById('filename').value === "")) {
                    $("#all").fadeOut(1000);
                      nextSongs();
                }
            }, 10000);
            setInterval(function () {
                if (document.hasFocus() || 1 === 1) {
                    checkList();
                  //  removeHash();
                }
            }, 30000);

            $("#partyName").focus(function() {
                if ($("#partyName").val() === "Enter a Different Party Name")
                {
                    $("#partyName").val("");
                    $("#partyName").css("color", "");
                }
            });

            window.removeHash = function() {
                if (document.hasFocus() || 1 === 1) {
                    if (localStorage.current_token && (localStorage["partyid"] || localStorage["party"])) {
                        history.replaceState("/#" + localStorage["current_token"], document.title, "/#" + localStorage["party"].toLowerCase());
                    }
                    else {
                      location.href = "index.html";
                    }
                }

            }
           // removeHash();

            $(document).ready(function () {
                if (document.hasFocus() || 1 === 1) {
                    if ($("#results").children("header").length > 0 && localStorage.party && window.location.href.indexOf("access_token") !== -1 && localStorage["explicit"] && localStorage["valid"] === "true" && localStorage["lastFM"]) {
                        removeHash();
                        $("#all").fadeOut(1000);
                          nextSongs();
                    }
                }

            });
        }
}
	var hidden, state, visibilityChange;
 window.checkState1 = function () {
if (typeof document.hidden !== "undefined") {
	hidden = "hidden";
	visibilityChange = "visibilitychange";
	state = "visibilityState";
} else if (typeof document.mozHidden !== "undefined") {
	hidden = "mozHidden";
	visibilityChange = "mozvisibilitychange";
	state = "mozVisibilityState";
} else if (typeof document.msHidden !== "undefined") {
	hidden = "msHidden";
	visibilityChange = "msvisibilitychange";
	state = "msVisibilityState";
} else if (typeof document.webkitHidden !== "undefined") {
	hidden = "webkitHidden";
	visibilityChange = "webkitvisibilitychange";
	state = "webkitVisibilityState";
}
 }
 checkState1();
	window.loading = function () {
  $("#load").css("visibility", "visible");
       var interval = setInterval(function(){
       checkState1();
       if (state !== 'hidden' && $("#results").children("header").length > 2) {
         document.getElementById('load').style.visibility="hidden";
         document.getElementById('main').style.visibility="visible";
	 clearInterval(interval);
  }
 }, 500);
}
       document.addEventListener('visibilitychange', function () {
	       checkState1();
	       loading();
               if (state !== 'hidden') {
               setTimeout(function () {
               $("#results").empty();
             //  window.location.reload();
               }, 1000);
               }
            });
      if (!document.hidden) {

        window.userDetails = function() {
                if (document.hasFocus() || 1 === 1) {
                    localStorage["party"] = $("#partyName").val().toLowerCase();
                    localStorage["lastFM"] = $("#lastFMName").val().toLowerCase();
                    localStorage["password"] = $("#Superpower").val().toLowerCase();
                    localStorage["explicit"] = $('input[name=radios]:checked').val();
                    if ($("#partyName").val() > 3 && $("#lastFMName").val() > 3 && $("#Superpower").val() > 3) {
                //        create();
                    }
                }
        }
        $(document).ready(function () {
          setInterval(function () {
        if ($("#results").children("header").length <= 2 && $('#footer2').html().indexOf("header") !== -1 && localStorage.current_token) {
              nextSongs();
        }
      }, 5000);
        });
               }

window.closePrompt = function() {
            loading();
            $("#dialogPower").hide();
            window.location.reload();
        }
});
