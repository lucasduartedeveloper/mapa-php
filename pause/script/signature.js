var playerId = new Date().getTime();

$(document).ready(function() {

    $("#signature").jqScribble();
    $("#signature").data('jqScribble').update({
         width: 300, height: 200
    });
    $("#signature").on("touchend", function(e) {
         var dataUrl = signature.toDataURL();
         ws.send("PAUSE|"+playerId+"|"+dataUrl);
    });
    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAUSE" && playerId != msg[1]) {

             $("#signature").data('jqScribble').update({
                   backgroundImage: msg[2],
                   width: 300, height: 200
             });
        }
    };
});