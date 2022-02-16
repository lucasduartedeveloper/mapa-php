$(document).ready(function() {
    $("#signature").jqScribble({
         width: 300, height: 200
    });
    $("#signature").on("touchend", function(e) {
         var dataUrl = signature.toDataURL();
         ws.send("PAUSE|"+dataUrl);
    });
    ws.onmessage(function(e) {
        var msg = e.split("|");
        if (msg[0] == "PAUSE") {
             console.log(msg[1]);
             $("#signature").update({
                   bacgroundImage: msg[1]
             });
        }
    });
});