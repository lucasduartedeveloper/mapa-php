var host = "wss://mapa-ws.herokuapp.com/";
var wsh = null;

var messagesWaiting = [];
var messagesSent = [];
var messagesReceived = [];

var ws = {
      start: function () {
           wsh = new WebSocket(host);
           wsh.onopen = function (e) {                
                $("#server-info").text("CONNECTED");
                for (var k in messagesWaiting) {
                     wsh.send(messagesWaiting[k]);
                }
                messagesWaiting = [];
           };
           wsh.onclose = function(e) {
                $("#server-info").text("DISCONNECTED");
                ws.start();
           };
           wsh.onmessage = function(e) {
                ws.onmessage(e);
                messagesReceived.push(e.data);
           };
      },
      send: function (e) {
           if (wsh.readyState == 1) {
               wsh.send(e);
               messagesSent.push(e.data);
           }
           else { messagesWaiting.push(e.data); }
      },
      onmessage: function (e) { },
      tempo: 0
};
ws.start();