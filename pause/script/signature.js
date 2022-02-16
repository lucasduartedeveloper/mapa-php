var playerId = new Date().getTime();

$(document).ready(function() {
    console.log(playerId); 

    $("#signature").jqScribble();
    $("#signature").data('jqScribble').update({
         width: 300, height: 200
    });
    $("#signature").on("touchend", function(e) {
         var dataUrl = signature.toDataURL();
         ws.send("PAUSE|"+dataUrl);
    });
    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAUSE") {
             //console.log(msg[1]);
             $("#signature").data('jqScribble').update({
                   backgroundImage: msg[1],
                   width: 300, height: 200
             });
        }
    };
});