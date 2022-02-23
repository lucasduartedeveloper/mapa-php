var audio = new Audio("audio/gun-shot.wav");

// Botão de gravação
$(document).ready(function() {
    var divBlack = "<div class=\"black\"></div>";
    var divWhite ="<div class=\"white\"></div>";
    var width = Math.floor(screen.width / 40);

    for (var c = 0; c < 5; c++) {
         for (var k = 0; k < width; k++) {
              $(".finish-line").html(
              $(".finish-line").html() +
                   (c % 2 == 0 ? 
                   divBlack + divWhite :
                   divWhite + divBlack));
         }
    }

    var timer = 1000001;
    var timerInterval = false;
    $("#timer").click(function() {
         if (timerInterval)
            clearInterval(timerInterval);
         timerInterval = setInterval(function() {
               timer -=1;
               if (timer == 0) {
                    clearInterval(timerInterval);
                    timer = 1000001;
                    audio.play();
                    say("GO!");
                    $("#timer").text("GO!");
               }
               else {
                   say(timer.toString());
                   $("#timer").text(timer.toString());
               }
         }, 3000);
    });
});

// Texto para audio
var speaking = false;
function say(text) {
         if (!speaking) {
              speaking = true;
              var msg = new SpeechSynthesisUtterance();
              msg.lang = "ja-JP";
              msg.text = text;
              msg.onend = function(event) {
                  speaking = false;
              };
              window.speechSynthesis.speak(msg);
        }
}