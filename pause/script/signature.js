var playerId = new Date().getTime();
var audio0 = new Audio("audio/game_notification.wav");
var audio1 = new Audio("audio/sfx_victory.wav");
var audio2 = new Audio("audio/game_over.wav");

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
                        backgroundImage: msg[3],
                        width: 300, height: 200
                 });
            }
            else if (msg[2] == "LIKE") {
                 audio1.play();
            }
            else if (msg[2] == "DISLIKE") {
                 $("#signature").data('jqScribble').clear();
                 audio2.play();
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