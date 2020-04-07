window.create = function() {
       var obj2 = {};                
        obj2["party"] = localStorage["party"];
                        obj2["playlist"] = localStorage['Snapster'] + ":::aDFAS";
                        obj2["access_token"] = localStorage["token"];
                        obj2["username"] = localStorage['userID'];
                        obj2["explicit"] = "false";
                        obj2["superpowers"] = localStorage['password'];
                        obj2["refresh_token"] = localStorage['token'];
                        $.ajax({
                            dataType: "json",
                            data: obj2,
                            url: 'https://paywallios.herokuapp.com/setUp',
                            success: function(accessDataset) {
                                console.log("CREATE");
                                //location.href = "/doneIOS.html";
                                if (!accessDataset["invalid"]) {
                                    //setTimeout(function() { location.href = "/index.html"; }, 3000);
                                } else {
                                   // window.location.href = "/index.html";
                                }
                            },
                            error: function() {}
                        });
                
        };