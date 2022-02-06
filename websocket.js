var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);

ws.onmessage = (event) => {
        console.log(event.data);
};