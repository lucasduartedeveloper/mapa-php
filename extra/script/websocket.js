var host = "wss://mapa-ws.herokuapp.com/";
var wsh = null;

var ws = {
      start: function () {
           wsh = new WebSocket(host);
           wsh.onopen = function (e) {                
                $("#server-info").text("CONNECTED");
           };
           wsh.onclose = function(e) {
                $("#server-info").text("DISCONNECTED");
                ws.start();
           };
           wsh.onmessage = function(e) {
                ws.onmessage(e);
           };
      },
      send: function (e) {
           //console.log(e);
           console.log(wsh);
           wsh.send(e);
      },
      onmessage: function (e) { },
      tempo: 0
};
ws.start();