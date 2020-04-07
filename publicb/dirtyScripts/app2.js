$(document).ready(function () {
          localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
          localStorage.urlGuest = window.location.toString().split("/public/")[0] + "/guest";
          localStorage.removeItem("prevBtn");
          //localStorage.removeItem("songList");
          localStorage.removeItem("nowp");
          localStorage.removeItem("sVote");
          //if(localStorage.current_token && localStorage.superHost1) { localStorage.wasPressed = 0; localStorage.firstLoad = 0; location.href = "partymusic://loginToSpotify/"; }
  		  //localStorage.removeItem("Snapster");
          window.login = function() { location.href = "partymusic://register/"; }
          localStorage.setItem("app", "true");
          localStorage.setItem("signedIn", "true");
});
