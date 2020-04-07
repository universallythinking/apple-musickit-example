$(document).ready(function () {
          localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
          localStorage.urlGuest = window.location.toString().split("/public/")[0] + "/guest";
          localStorage.removeItem("prevBtn");
          Cookies.remove("songList");
          localStorage.removeItem("nowp");
          localStorage.removeItem("sVote");
          //if(localStorage.current_token && localStorage.superHost1) { localStorage.wasPressed = 0; localStorage.firstLoad = 0; location.href = "//partymusic://loginToSpotify/"; }
          //if (localStorage.unlock) { location.href = localStorage.urlParts + "/app2.html"; }
  		  //localStorage.removeItem("Snapster");
          window.login = function() {
             if(!Cookies.get("subscriber") {
                location.href = "//partymusic://register/";
             } else {
                location.href = "//partymusic://register/";
             }
          }
          window.guest = function() {localStorage.clear(); localStorage.urlGuest = window.location.toString().split("/public/")[0] + "/guest"; localStorage.signedIn = true; location.href = localStorage.urlGuest + "/app.html"; }
          window.share = function() { location.href = "//partymusic://share/"; }
          localStorage.setItem("app", "true");
          localStorage.setItem("signedIn", "true");
});