$(document).ready(function () {
          localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
          localStorage.urlGuest = window.location.toString().split("/public/")[0] + "/guest";
          localStorage.removeItem("prevBtn");
          localStorage.removeItem("songList");
          //if(localStorage.current_token && localStorage.host && localStorage.superHost1) { localStorage.wasPressed = 0; localStorage.firstLoad = 0; location.href = "partymusic://loginToSpotify/"; }
  		  //localStorage.removeItem("Snapster");
          window.login = function() { location.href = "partymusic://purchase/"; return false; }
          window.guest = function() { location.href = "partymusic://purchase/"; return false; }
          localStorage.setItem("app", "true");
          localStorage.setItem("signedIn", "true");
});