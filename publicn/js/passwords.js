window.getHashCode = function(i) {
    var hash = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 5; i++)
      hash += possible.charAt(Math.floor(Math.random() * possible.length));
    var s = hash.toString();
                localStorage.hash = s.substr(0, 4);
                passCode();
  checkPassword();
        //return localStorage.hash;
  }
             window.passCode = function() {
    var hash = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 5; i++)
      hash += possible.charAt(Math.floor(Math.random() * possible.length));
    var s = hash.toString();
          localStorage.password = s.substr(0, 4);
        //return localStorage.hash;
  }
      window.checkPassword = function(i) {
                  var obj2 = {};
                  obj2.password = localStorage.hash;
                      $.ajax({
                             timeout: 2000,
                         dataType: "json",
                         data: obj2,
                         url: "https://paywallios.herokuapp.com/checkPass",
                         success: function(data) {
                console.log(data);
                 },error: function(data) {
                console.log(data);
              },
              complete: function(data) {
                  if (data.responseText != "none") {
                  localStorage.wasPressed = 0;
                             localStorage.party = localStorage.hash;
                             localStorage.password = localStorage.password;
                             location.href = "/index.html";
                           } else {
                              getHashCode(1);
                           }
              }
                       });
               }
            if(!localStorage.password || !localStorage.party) setTimeout(getHashCode, 5);