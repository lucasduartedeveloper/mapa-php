var audio0 = new Audio("audio/game_notification.wav");
var audio1 = new Audio("audio/sfx_victory.wav");
var audio2 = new Audio("audio/game_over.wav");

var words = [
   "CACHORRO",
   "GATO",
   "JACARÉ",
   "FLAMINGO",
   "DINOSSAURO",
   "MISERICÓRDIA",
   "LANCHE",
   "CAFÉ",
   "CIGARRO",
   "CARRO",
   "MOTO",
   "BICICLETA"
];

var word = getRandomWord();

$(document).ready(function() {
    $("#btn-done").on("click", function() {
         if ($("input").val().toUpperCase() == word) {
               audio0.play();
               word = getRandomWord();
               drawBoard();
               $("input").val("");
               $("input").focus();
         }
         else {
              audio2.play();
              $("input").val("");
         }
    });

    $("input").on("input", function() {
        $("input").val();
    });
    drawBoard();
});



function drawBoard() {
    var html = "";
    for (var k = 0; k < word.length; k++) {
         html += '<div class="letter">'+
         word.charAt(k)+
         '</div>';
    }
    $("#board-center").html(html);
}

function getRandomWord() {
    var n = Math.floor(Math.random() * words.length);
    return words[n];
}