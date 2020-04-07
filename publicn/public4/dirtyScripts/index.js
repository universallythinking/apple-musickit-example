$(document).ready(function() {
localStorage.host = 15;

$("#search").on('click', function () {
                                                 $("#filename").show();
                                                 $("#filename").focus();
                                                 });
localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
        window.playlists = function() {
            location.href = localStorage.urlParts + "/playlists.html";
        }
        window.purgify = function() {
                    location.href = "//partymusic://purgify";
                }
	window.relo = function() {
	    location.href= localStorage.urlParts +'/indexOld.html'; return false;
	}
	window.reload = function() {
            location.href= localStorage.urlParts +'/indexOld.html';
    }
	window.reloadify = function() {
        location.href= '//partymusic://problems';
    }
    if(!localStorage.H) { localStorage.H = 1; setTimeout(function() { reload(); }, 1000); }
	window.guest = function() {
	    localStorage.removeItem("host");
		location.href="//partymusic://pause/";
	    setTimeout(function(){ location.href= localStorage.urlGuest +'/app.html'; return false; }, 250);
	}
	window.terminate = function() {
	    location.href= "//partymusic://terminate/";
        var urlParts = localStorage.urlParts;
        setTimeout(function(){
                if (localStorage.locked == "no") {
                    location.href = "//partymusic://home";
                }
                else {
                    location.href = "//partymusic://home";
                }
                }, 250);
        localStorage.clear();
	}
	window.softTerminate = function() {
	    location.href="//partymusic://softterminate/";
        var urlParts = localStorage.urlParts;
        setTimeout(function(){
                if (localStorage.locked == "no") {
                    location.href = "//partymusic://gohome/";
                   }
                   else {
                    location.href = "//partymusic://gohome/";
                }
        }, 250);
        localStorage.clear();
	}
        window.settings = function() {
            location.href = localStorage.urlParts +"/welcome.html";
        }
	window.terms = function() {
		$('#dialogPage').hide();
            location.href = "//partymusic://terms/";
        }
	window.privacy = function() {
		$('#dialogPage').hide();
            location.href = "//partymusic://privacy/";
        }
        window.tognav = function() {
            $("#mySidenav").toggle(function() {
                $("#mySidenav").css("width", "85%");
            });
        };
        window.hosting = function() {
            if(parseInt(localStorage.hosting) == 1) {
              localStorage.hosting = 0;
              $("#hosting-toggle").text("ON");
              $("#hosting-toggle").css("color", "green");
              setTimeout(create, 10000);
            }
            else if(parseInt(localStorage.hosting) == 0) {
              localStorage.hosting = 1;
              $("#hosting-toggle").text("OFF");
              $("#hosting-toggle").css("color", "red");
              setTimeout(create, 10000);
            }
        }
        window.checkHost = function() {
            if(!localStorage.hosting) {
              localStorage.hosting = 0;
              $("#hosting-toggle").text("ON");
              $("#hosting-toggle").css("color", "green");
              setTimeout(create, 10000);
            }
            if(parseInt(localStorage.hosting) == 0 && $("#hosting-toggle").text("")) {
              $("#hosting-toggle").text("ON");
              $("#hosting-toggle").css("color", "green");
            }
            else if(parseInt(localStorage.hosting) == 1 && $("#hosting-toggle").text("")) {
              $("#hosting-toggle").text("OFF");
              $("#hosting-toggle").css("color", "red");
            }
        }
        checkHost();
        if(!localStorage.Snapster || !localStorage.superHost){
            localStorage.clear();
            //localStorage.superHost = 1;
            location.href = "https://paywallios.herokuapp.com/loginAndroid.html";
        }
});