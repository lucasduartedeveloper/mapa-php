var audio0 = new Audio("audio/game_notification.wav");
var audio1 = new Audio("audio/sfx_victory.wav");
var audio2 = new Audio("audio/game_over.wav");
var audio3 = new Audio("audio/getting_hit.wav");
var audio4 = new Audio("audio/creature_dying.wav");

var words = [
   "GOLPE"
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
            if (msg[2] == "ADD_DAMAGE") {
                 addDamage();
            }
            else if (msg[2] == "GAME_OVER") {
                 gameOver();
            }
        }
    };

    $("#btn-done").on("click", function() {
         if ($("input").val().toUpperCase() == word) {
               audio3.play();
               word = getRandomWord();
               drawBoard();
               $("input").val("");
               $("input").focus();

               ws.send("DIGITE|"+playerId+"|ADD_DAMAGE");
               addDamage();
         }
         else {
              gameOver();
         }
    });

    $("#restart").click(function() {
         location.reload();
    }); 
    $("input").on("input", function() {
        drawBoard($("input").val().toUpperCase());
    });
    drawBoard();
});

function drawBoard(typed = "") {
    var html = "";
    for (var k = 0; k < word.length; k++) {
         if (k < typed.length &&
             typed.charAt(k) == word.charAt(k)) {     
                html += '<div class="letter correct">'+
                word.charAt(k)+
                '</div>';
         }
         else {
             html += '<div class="letter">'+
             word.charAt(k)+
             '</div>';
         }
    }
    $("#board-center").html(html);
}

function getRandomWord() {
    var n = Math.floor(Math.random() * words.length);
    return words[n];
}

function addDamage() {
    damage += 1;
    audio3.play();
    var width = 96 - Math.floor((enemyHP / 96) * damage);
    $("#hp-value").css("width", width+"px");
    if (damage == enemyHP) {
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