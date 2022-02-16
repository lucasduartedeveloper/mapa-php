var playerId = new Date().getTime();
var audio0 = new Audio("audio/game_notication.wav");

$(document).ready(function() {
    $("#signature").jqScribble();
    $("#signature").data('jqScribble').update({
         width: 300, height: 200
    });
    $("#signature").on("touchend", function(e) {
         var dataUrl = signature.toDataURL();
         ws.send("PAUSE|"+playerId+"|CANVAS|"+dataUrl);
    });
    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PAUSE" &&
            playerId != msg[1]) {

            if (msg[2] == "CANVAS") {
                  $("#signature").data('jqScribble').update({
                        backgroundImage: msg[2],
                        width: 300, height: 200
                 });
            }
            else if (msg[2] == "LIKE") {
                 audio0.play();
            }
            else if (msg[2] == "DISLIKE") {
                 $("#signature").data('jqScribble').clear();
                 audio0.play();
            }
        }
    };

    $("#btn-like").click(function() {
        ws.send("PAUSE|"+playerId+"|LIKE");
    });
    $("#btn-dislike").click(function() {
        ws.send("PAUSE|"+playerId+"|DISLIKE");
    });   
    $("#player-id").text(playerId);
});