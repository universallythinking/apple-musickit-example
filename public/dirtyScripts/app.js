$(document).ready(function() {
    		//localStorage.clear();
            localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
            localStorage.urlGuest = window.location.toString().split("/public/")[0] + "/guest";
    		localStorage.removeItem("Snapster");
            window.login = function() { setTimeout(function() { location.href = "partymusic://register/"; }, 500); }
            window.guest = function() { localStorage.signedIn = "true"; location.href = localStorage.urlGuest + "/app.html"; }
            localStorage.setItem("app", "true");
            localStorage.setItem("signedIn", "true");
});
