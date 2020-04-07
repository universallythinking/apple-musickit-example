$(document).ready(function() {
    if (!document.hidden && localStorage.explicit && localStorage.Snapster && localStorage.current_token && localStorage.party && localStorage.lastFM && localStorage.userID && localStorage.explicit && localStorage.password) {
        var party;
        var userPrompt;
        var obj2 = {};
        window.newToken = function() {
            $.ajax({
                type: "GET",
                url: 'https://paywallios.herokuapp.com/refresh_token',
                data: {
                    'refresh_token': localStorage["refresh_token"]
                }
            }).done(function(data) {
                access_token = data.access_token;
                localStorage["current_token"] = data.access_token;
                create();
            });
        }
        newToken();
        window.create = function() {
                localStorage["valid"] = "true";
                $.ajax({
                    async: true,
                    type: "GET",
                    url: "https://api.spotify.com/v1/me",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage["current_token"]
                    },
                    dataType: "json",
                    data: "formdata",
                    success: function(userData) {
                        localStorage['userID'] = userData.id;
                        userID = localStorage['userID'];
                        localStorage["valid"] = "true";
                    },
                    error: function() {}
                });
                if (localStorage["party"].length > 3 && localStorage["password"].length > 3 && localStorage["lastFM"].length > 3 && (window.location.pathname || localStorage.party)) {
                        obj2["party"] = localStorage["party"];
                        obj2["lastFM"] = localStorage["party"];
                        obj2["playlist"] = localStorage['Snapster'] + ":::" + localStorage.Snapster2;
                        obj2["access_token"] = localStorage["current_token"];
                        obj2["username"] = localStorage['userID'];
                        obj2["explicit"] = localStorage['explicit'];
                        obj2["password"] = localStorage['password'];
                        obj2["refresh_token"] = localStorage['refresh_token'];
                        $.ajax({
                            async: true,
                            dataType: "json",
                            type: "POST",
                            data: obj2,
                            url: 'https://paywallios.herokuapp.com/',
                            success: function(accessDataset) {
                                if (!accessDataset["invalid"]) {
                                    $("#dialogEnjoy").dialog();
                                    localStorage["invalid"] = "false";
                                    $("#dialog").hide();
                                    localStorage.setItem("host", true);
                                    var token = accessDataset;
                                    nextSongs();
                                    currentSong();
                                    snapsterPlaylist();
                                    setTimeout(function() { location.href = "/index.html"; }, 3000);
                                } else {
                                    window.location.href = "/error.html";
                                }
                            },
                            error: function() {}
                        });
                }
        }
    }
});
