var host = "wss://mapa-ws.herokuapp.com/";
var ws = new WebSocket(host);

var wsCallback = function(e) {};
ws.onmessage = (event) => {
        console.log("Server: " + event.data);
        wsCallback(event);
};