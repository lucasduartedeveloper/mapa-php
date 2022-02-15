var host = "wss://mapa-ws.herokuapp.com/";
var wsh = new WebSocket(host);

var ws = {
      start: function (e) {
           wsh.onclose = function(e) {
                wsh = null;
                wsh = new WebSocket(host);
           }
           wsh.onmessage = function(e) {
                ws.onmessage(e);
           };
      },
      send: function (e) {
           //console.log(e);
           //console.log(wsh);
           if (wsh.readyState != 1) { 
               ws.start();
           }
           wsh.send(e);
      },
      onmessage: function (e) { },
      tempo: 0
};
ws.start();