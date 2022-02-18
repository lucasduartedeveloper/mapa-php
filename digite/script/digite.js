var audio0 = new Audio("audio/game_notification.wav");
var audio1 = new Audio("audio/sfx_victory.wav");
var audio2 = new Audio("audio/game_over.wav");
var audio3 = new Audio("audio/getting_hit.wav");
var audio4 = new Audio("audio/creature_dying.wav");

var words = [
   { name: "GOLPE", damage: 1 },
   { name: "FOGO", damage: 2 }
];

var word = getRandomWord();
var playerId = new Date().getTime();

var enemyHP = 10;
var damage = 0;

$(document).ready(function() {
    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "DIGITE" &&
            playerId != msg[1]) {
            if (msg[2] == "GET_DAMAGE") {
                 ws.send("DIGITE|"+
                      playerId+
                      "|SET_DAMAGE|"+
                      damage);
            }
            else if (msg[2] == "SET_DAMAGE") {
                 setDamage(parseInt(msg[3]));
            }
            else if (msg[2] == "GAME_OVER") {
                 gameOver();
            }
        }
    };

    $("#btn-done").on("click", function() {
         if ($("input").val().toUpperCase() == word.name) {
               audio3.play();
               word = getRandomWord();
               drawBoard();
               $("input").val("");
               $("input").focus();

               setDamage(damage + word.damage);
               ws.send("DIGITE|"+
                     playerId+
                     "|SET_DAMAGE|"+
                     damage);
         }
         else {
              gameOver();
              ws.send("DIGITE|"+
                     playerId+
                     "|GAME_OVER");
         }
    });

    $("#restart").click(function() {
         location.reload();
    }); 
    $("input").on("input", function() {
        drawBoard($("input").val().toUpperCase());
    });
    drawBoard();
    ws.send("DIGITE|"+playerId+"|GET_DAMAGE");
});

function drawBoard(typed = "") {
    var html = "";
    for (var k = 0; k < word.name.length; k++) {
         if (k < typed.length &&
             typed.charAt(k) == word.name.charAt(k)) {     
                html += '<div class="letter correct">'+
                word.name.charAt(k)+
                '</div>';
         }
         else {
             html += '<div class="letter">'+
             word.name.charAt(k)+
             '</div>';
         }
    }
    $("#board-center").html(html);
}

function getRandomWord() {
    var n = Math.floor(Math.random() * words.length);
    return words[n];
}

function setDamage(dmg) {
    damage = dmg;
    audio3.pause();
    audio3.play();

    $("#fire").addClass("animate");
    setTimeout(function() {
         $("#fire").removeClass("animate");
    }, 1000);

    var width = 96 - Math.floor((96 / enemyHP) * damage);
    $("#hp-value").css("width", width+"px");
    if (damage >= enemyHP) {
         gameWin();
    }
}

function gameWin() {
    audio1.play();
    $("#restart-msg").text("VITÓRIA");
    $("#restart").css("background-color",
    "#36486b");
    $("input").val("");
    $("#restart").show();
}

function gameOver() {
    audio2.play();
    $("#restart-msg").text("GAME OVER");
    $("#restart").css("background-color",
    "#c94c4c");
    $("input").val("");
    $("#restart").show();
}