$(document).ready(function() {
WEB_SOCKET_SWF_LOCATION = 'https://imuse.herokuapp.com/socket.io/inc/WebSocketMain.swf';
var socket = io.connect('https://imuse.herokuapp.com/');
socket.on(localStorage.userID, function (data) {
//socket.reconnect();
socket.emit('ready for data', {});
});
socket.on(localStorage.userID + 'update', function (data) {
localStorage.votes = data.body.votes;
calculateVotes();
console.log("VOTES " + data.body.votes);
});
socket.on(localStorage.userID + 'test', function (data) {
console.log("VOTES " + data.body);
});
socket.on(localStorage.userID + 'nextSongs', function (data) {
    nextSongs();
});
window.recon = function () {
var socket = io.connect('https://imuse.herokuapp.com/');
}
var socketData = {};
socketData.username = localStorage.userID;
$.ajax({
url: "https://imuse.herokuapp.com/initiate",
dataType: "json",
data: socketData,
success: function(t) {
console.log("SUCCESS " + t);
},
error: function(err) {
console.log("Error " + JSON.stringify(err));
}
});
//setTimeout(recon, 2500);
});
