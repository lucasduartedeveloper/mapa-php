var host = "wss://mapa-ws.herokuapp.com/";
var wsh = new WebSocket(host);

var ws = {
      send: function (e) {
           //console.log(e);
           //console.log(wsh);
           if (wsh.readyState != 1) { 
               wsh = new WebSocket(host);
           }
           wsh.send(e);
      },
      onmessage: function (e) { },
      tempo: 0
};

wsh.onmessage = function(e) {
     ws.onmessage(e);
};