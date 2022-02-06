var host = "wss://mapa-ws.herokuapp.com/";
var ws = new WebSocket(host);

ws.onmessage = (event) => {
        console.log("Server: " + event.data);
};