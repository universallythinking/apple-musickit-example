$(document).ready(function () {
          localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
          localStorage.urlGuest = window.location.toString().split("/public/")[0] + "/guest";
          localStorage.removeItem("prevBtn");
          localStorage.removeItem("songList");
          if(localStorage.current_token && localStorage.host && localStorage.superHost1) { localStorage.wasPressed = 0; localStorage.firstLoad = 0; location.href = "partymusic://loginToSpotify/"; }
  		  //localStorage.removeItem("Snapster");
          window.login = function() { setTimeout(function() { location.href = "partymusic://auth/"; }, 500); }
          window.guest = function() { localStorage.signedIn = "true"; location.href = localStorage.urlGuest + "/app.html"; }
          localStorage.setItem("app", "true");
          localStorage.setItem("signedIn", "true");
});
