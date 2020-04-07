// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {

        window.plugins.webintent.onNewIntent(function (url) {
            if (url.indexOf("box:/") > 2) {
                console.log(url);
                url = url.split("callback/");
                url = url[1];
              //  setTimeout(function () { window.open("index.html?" + url, "_self"); }, 100);
            }
        });

        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onResume() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

} )();
