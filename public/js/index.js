$(document).ready(function() {
localStorage.host = 15;
localStorage.superHost1 = 15;
$("#search").on('click', function () {
                                                 $("#filename").show();
                                                 $("#filename").focus();
                                                 });
                                                                           localStorage.superHost = 1;

                                                                           localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
                                                                           localStorage.urlWelcome = window.location.toString().split("/public/")[0] + "/Welcome";
        window.playlists = function() {
            location.href =  "/playlists.html";
        }
	window.relo = function() {
	    location.href= '/index.html'; return false;
	}
	window.reload = function() {
            location.href= '/index.html';
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
        localStorage.removeItem("host");
        setTimeout(function(){
                if (localStorage.locked == "no") {
                   location.href= urlParts + "/home.html";
                }
                else {
                   location.href= urlParts + "/home.html";
                }
                }, 250);
        localStorage.clear();
	}
	window.softTerminate = function() {
	    location.href="//partymusic://softterminate/";
        var urlParts = localStorage.urlParts;
        localStorage.removeItem("host");
        setTimeout(function(){
                if (localStorage.locked == "no") {
                   location.href= urlParts + "/home.html";
                   }
                   else {
                   location.href= urlParts + "/home.html";
                }
        }, 250);
	}
        window.settings = function() {
            location.href = "/welcome.html";
        }
        localStorage.superHost = 1;
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
                $("#mySidenav").css("width", "40%");
            });
            focusify();
        };
        window.focusify = function() {
                    $("#closebtn").focus();
                    $("#closebtn").on("blur", function() {
                    $("*").css("pointer-events","none !important");
                    $("#mySidenav").css("pointer-events", "all");
                    $("#results").addClass("noSelect");
                    $("#results *").addClass("noSelect");
                    var list;
                    list = document.querySelectorAll(".w");
                    for (var i = 0; i < list.length; ++i) {
                       list[i].classList.add('noSelect');
                    }
                    $("#hosting-toggle").focus();
                    });
                    $("#closebtn").on("click", function() {
                    $("#results").removeClass("noSelect");
                    });
                };
        window.hosting = function() {
            if(parseInt(localStorage.hosting) == 1) {
              localStorage.hosting = 0;
              $("#hosting-toggle").text("ON");
              $("#hosting-toggle").css("color", "green");
              create();
            }
            else if(parseInt(localStorage.hosting) == 0) {
              localStorage.hosting = 1;
              $("#hosting-toggle").text("OFF");
              $("#hosting-toggle").css("color", "red");
              kill();
            }
        }
        window.checkHost = function() {
            if(!localStorage.hosting) {
              localStorage.hosting = 0;
              $("#hosting-toggle").text("ON");
              $("#hosting-toggle").css("color", "green");
              create();
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

        //if(!localStorage.party) location.href = "https://paywallios.herokuapp.com/login.html";
        //$("#bars").focus();
});
