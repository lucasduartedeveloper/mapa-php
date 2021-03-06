var audio0 = new Audio("audio/game_notification.wav");
var audio1 = new Audio("audio/sfx_victory.wav");
var audio2 = new Audio("audio/game_over.wav");

var touchCount = 0;
var titles = [ "WEBSOCKETS" ];
var playerId = "000";
var playerList = [];

$(document).ready(function() {
    $("#signature").jqScribble();
    $("#signature").data('jqScribble').update({
         width: 300, height: 200
    });
    $("#signature").on("touchend", function(e) {
         var dataUrl = signature.toDataURL();
         ws.send("PAUSE|"+playerId+"|CANVAS|"+dataUrl);
         touchCount += 1;
         touchCount = 
            touchCount >= ((titles.length*2)-2) ?
            touchCount : touchCount;
         $("#title").text(titles[touchCount/2]);
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
                 audio0.play();
            }
            else if (msg[2] == "LIKE") {
                 audio1.play();
                 $("#restart-msg").text("SIM");
                 $("#restart").css("background-color", "#36486b");
                 $("#restart").show();
            }
            else if (msg[2] == "DISLIKE") {
                 $("#signature").data('jqScribble').clear();
                 audio2.play();
                 $("#restart-msg").text("NÃO");
                 $("#restart").css("background-color", "#c94c4c");
                 ws.send("PAUSE|"+playerId+"|REMOVE");
                 $("#restart").show();
            }
            else if (msg[2] == "ADD") {
                 if (!playerList.includes(msg[1])) {
                      var dataUrl = signature.toDataURL();
                      playerList.push(msg[1]);
                      ws.send("PAUSE|"+playerId+"|ADD");
                      ws.send("PAUSE|"+playerId+
                      "|CANVAS|"+dataUrl);
                      $("#player-count").text("+"+playerList.length);
                 }
            }
            else if (msg[2] == "REMOVE") {
                 playerList = playerList.filter((e) => e != msg[1]);
                 $("#player-count").text("+"+playerList.length);
            }
            else if (msg[2] == "ONLINE") {
                 ws.send("PAUSE|"+playerId+"|ADD");
            }
        }
    };

    $("#player-info").click(function() {
       audio0.play();
       $("#signature").data('jqScribble').clear();
       $("#signature").trigger("touchend");
       confirmarContagem();
    });
    $("#btn-like").click(function() {
        ws.send("PAUSE|"+playerId+"|LIKE");
    });
    $("#btn-dislike").click(function() {
        ws.send("PAUSE|"+playerId+"|DISLIKE");
    });
    $("#restart").click(function() {
         location.reload();
    }); 

    // Player ID
    $(window).bind("beforeunload", function() { 
        ws.send("PAUSE|"+playerId+"|REMOVE");
    });
    playerId = new Date().getTime();
    ws.send("PAUSE|"+playerId+"|ADD");
    $("#player-id").text(playerId);
});

// Confirmar conexões
function confirmarContagem() {
    playerList = [];
    $("#player-count").text("+"+playerList.length);
    ws.send("PAUSE|"+playerId+"|ONLINE"); 
}