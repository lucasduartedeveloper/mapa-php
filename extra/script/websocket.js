var host = "wss://mapa-ws.herokuapp.com/";
var wsh = new WebSocket(host);

var ws = {
      send: function (e) {
           console.log(e);
           console.log(wsh);
           wsh.send(e);
      },
      onmessage: function (e) { }
};

wsh.onmessage = function(e) {
     ws.onmessage(e);
};