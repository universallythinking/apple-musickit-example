//$(document).ready(function() {
                  if (localStorage.explicit && localStorage.Snapster && localStorage.current_token && localStorage.party && localStorage.lastFM && localStorage.userID && localStorage.explicit && localStorage.password) {
                  localStorage.urlParts = window.location.toString().split("/public/")[0] + "/public";
                  var party;
                  var userPrompt;
                  var obj2 = {};
                  window.newToken = function() {
                  $.ajax({
                         type: "GET",timeout:2000,
                         url: 'https://paywallios.herokuapp.com/refresh_token',
                         data: {
                         'refresh_token': localStorage["refresh_token"]
                         }
                         }).done(function(data) {
                                 access_token = data.access_token;
                                 localStorage["current_token"] = data.access_token;
                                 });
                  }
                  newToken();
                  window.create = function() {
                  location.href = "partymusic://sConnect";
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
                  if (localStorage["party"].length > 3 && localStorage["password"].length > 3) {
                  obj2["party"] = localStorage["party"];
                  obj2["playlist"] = localStorage.Snapster + ":::" + localStorage.Snapster2;
                  obj2["access_token"] = localStorage["current_token"];
                  obj2["username"] = localStorage.userID;
                  obj2["explicit"] = localStorage.explicit;
                  obj2["superpowers"] = localStorage.password;
                  obj2["refresh_token"] = localStorage.refresh_token;
                  $.ajax({
                         dataType: "json",
                         data: obj2,timeout:2000,
                         url: "https://paywallios.herokuapp.com/create",
                         success: function(accessDataset) {
                         location.href = "partymusic://sConnect";
                         },
                         error: function() {
                         }
                         });
                  }
                  }
                  window.kill = function() {
                  location.href = "partymusic://sConnect";
                  if (localStorage["party"].length > 3 && localStorage["password"].length > 3) {
                  obj2["party"] = localStorage["party"].split(":::")[0] + "NEVERFIND";
                  obj2["playlist"] = localStorage.Snapster + ":::" + localStorage.Snapster2;
                  obj2["access_token"] = localStorage["current_token"];
                  obj2["username"] = localStorage.userID;
                  obj2["explicit"] = localStorage.explicit;
                  obj2["superpowers"] = localStorage.password;
                  obj2["refresh_token"] = localStorage.refresh_token;
                  $.ajax({
                         dataType: "json",timeout:2000,
                         data: obj2,
                         url: "https://paywallios.herokuapp.com/create",
                         success: function(accessDataset) {
                         location.href = "partymusic://sConnect";
                         },
                         error: function() {}
                         });
                  }
                  }
                  }
                 // });

