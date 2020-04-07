window.playerToken = function(token) {
                    $.ajax({
                           type: "GET",
                           url: 'https://paywallios.herokuapp.com/refresh_token',
                           data: {
                           'refresh_token': token
                           },
                                            timeout: 12000
                           }).done(function(data) {
                                   localStorage.playerToken = data.access_token;
                                   location.href = "partymusic://callback/" + localStorage.playerToken;
                                   });
                    }
                  if (localStorage.explicit && localStorage.Snapster && localStorage.current_token && localStorage.party && localStorage.lastFM && localStorage.userID && localStorage.explicit && localStorage.password) {
                  localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
                  var party;
                  var userPrompt;
                  var obj2 = {};
                  window.newToken = function() {
                  $.ajax({
                         type: "GET",
                         url: 'https://paywallios.herokuapp.com/refresh_token',
                         data: {
                         'refresh_token': localStorage["refresh_token"]
                         },
                                          timeout: 12000
                         }).done(function(data) {
                                 access_token = data.access_token;
                                 localStorage["current_token"] = data.access_token;
                                 setTimeout(function() { create(); }, 5000);
                                 });
                  }
                  newToken();
                  window.create = function() {
                  localStorage["valid"] = "true";
                  if(!localStorage.userID) {
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
                                           }
                  if (localStorage["party"].length > 3 && localStorage["password"].length > 3) {
                  obj2["party"] = localStorage["party"].split(":::")[0];
                  obj2["playlist"] = localStorage.Snapster + ":::" + localStorage.Snapster2;
                  obj2["access_token"] = localStorage["current_token"];
                  obj2["username"] = localStorage.userID;
                  obj2["explicit"] = localStorage.explicit;
                  obj2["superpowers"] = localStorage.password;
                  obj2["refresh_token"] = localStorage.refresh_token;
                  $.ajax({
                         dataType: "json",
                         data: obj2,
                         url: "https://paywallios.herokuapp.com/create",
                                                                                       timeout: 12000,
                         success: function(accessDataset) {
                         //if (location.href != localStorage.urlParts+"/index.html") {
                         //setTimeout(function() { location.href = localStorage.urlParts+"/index.html"; }, 3000);
                         //}
                         },
                         error: function() {}
                         });

                  }
                  }
                  window.kill = function() {
                                    if (localStorage["party"].length > 3 && localStorage["password"].length > 3) {
                                    obj2["party"] = localStorage["party"].split(":::")[0] + "NEVERFIND";
                                    obj2["playlist"] = localStorage.Snapster + ":::" + localStorage.Snapster2;
                                    obj2["access_token"] = localStorage["current_token"];
                                    obj2["username"] = localStorage.userID;
                                    obj2["explicit"] = localStorage.explicit;
                                    obj2["superpowers"] = localStorage.password;
                                    obj2["refresh_token"] = localStorage.refresh_token;
                                    $.ajax({
                                           dataType: "json",
                                           data: obj2,
                                           url: "https://paywallios.herokuapp.com/create",
                                                                                                         timeout: 12000,
                                           success: function(accessDataset) {
                                           },
                                           error: function() {}
                                           });
                                    }
                                    }
                  setTimeout(function() { create(); }, 15000);
                  }
