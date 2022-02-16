$(document).ready(function() {
    $("#signature").jqScribble({
         width: 300, height: 200
    });
    $("#signature").on("touchend", function(e) {
         var dataUrl = signature.toDataURL();
         ws.send("PAUSE|"+dataUrl);
    });
    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAUSE") {
             console.log(msg[1]);
             $("#signature")..data('jqScribble').update({
                   backgroundImage: msg[1]
             });
        }
    };
});