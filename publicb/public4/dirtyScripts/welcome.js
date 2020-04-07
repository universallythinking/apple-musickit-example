$(document).ready(function() {
localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
            window.checkPassword = function() {
                if ($("#partyName").val().toLowerCase().indexOf("'") ==-1 && $("#partyName").val().toLowerCase().indexOf('"') ==-1  && ($("#Superpower").val().toLowerCase().indexOf("'") ==-1 && $("#Superpower").val().toLowerCase().indexOf('"') ==-1)) {
                var obj2 = {};
                obj2.password = $("#partyName").val().toLowerCase();
                obj2.username = localStorage.userID;
                $.ajax({
                       data: obj2,
                       url: "https://paywallios.herokuapp.com/checkPassword",
                                                                                            timeout: 2000,
                       success: function(accessDataset) {
                       if (accessDataset.responseText == "none") {
                       $("#partyName").val("Party Name Taken");
                       $("#partyName").css("color", "red");
                       $("#partyName").on("focus", function() {
                                          $("#partyName").val("");
                                          $("#partyName").css("color", "white");
                                          });
                       }
                       else {
                       localStorage.setItem("party", $("#partyName").val().toLowerCase());
                       localStorage.setItem("lastFM", $("#partyName").val().toLowerCase());
                       localStorage.setItem("password", $("#Superpower").val().toLowerCase());
                       localStorage.setItem("explicit", $("input[name=radios]:checked").val());
                       //alertify();
                       if (!localStorage.Snapster) {
                       location.href = localStorage.urlParts + "/playlists.html";
                       }
                       else {
                       location.href = localStorage.urlParts + "/index.html";
                       }
                       }
                       },
                       error: function(accessDataset) {
                       if (accessDataset.responseText == "none") {
                       $("#partyName").val("Party Name Taken");
                       $("#partyName").css("color", "red");
                       $("#partyName").on("focus", function() {
                                          $("#partyName").val("");
                                          $("#partyName").css("color", "white");
                                          });
                       }
                       else {
                       localStorage.setItem("party", $("#partyName").val().toLowerCase());
                       localStorage.setItem("lastFM", $("#partyName").val().toLowerCase());
                       localStorage.setItem("password", $("#Superpower").val().toLowerCase());
                       localStorage.setItem("explicit", $("input[name=radios]:checked").val());
                       //alertify();
                       if (!localStorage.Snapster) {
                       location.href = localStorage.urlParts + "/playlists.html";
                       }
                       else {
                       location.href = localStorage.urlParts + "/index.html";
                        }
                       }
                       }
                       });
                }
                else {
                    if ($("#partyName").val().toLowerCase().indexOf("'") !=-1 || $("#partyName").val().toLowerCase().indexOf('"') !=-1) {
                    $("#partyName").val("Invalid Password");
                    $("#partyName").css("color", "red");
                    $("#partyName").on("focus", function() {
                                       $("#partyName").val("");
                                       $("#partyName").css("color", "white");
                                       });
                    } else {
                                       $("#Superpower").val("Invalid Password");
                                       $("#Superpower").css("color", "red");
                                       $("#Superpower").on("focus", function() {
                                                          $("#Superpower").val("");
                                                          $("#Superpower").css("color", "white");
                                                          });
                    }
                }
            }
        if (localStorage.Snapster) {
            $("#dynamic").text("Edit Your Party");
        }
        else {
            $("#dynamic").text("Start a Party!");
        }
        window.alertify = function() {
            history.replaceState("https://paywallios.herokuapp.com/welcome.html", "PartyMusic", "PartyMusic Jukebox");
            alert('Give other "admins" your voting password...  These members can search for your password + "." in the song search box for unlimited voting privileges!');
        }
        localStorage["allowed"] = "true";
        localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
        $("#button").on("click", function() {
                        checkPassword();
                        });
                        $("#Superpower").on("keypress", function(e) {
                                            if (e.which === 13) {
                                            checkPassword();
                                            }
                                            });
                                            window.loading=function(load){
            $("#load").css("visibility","visible");
            setTimeout(function(){document.getElementById('load').style.visibility="hidden";},load);
        }
    loading(1000);
    });