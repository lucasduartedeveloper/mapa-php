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

    var timer = 5;
    var timerInterval = false;
    $("#timer").click(function() {
         timerInterval = setInterval(function() {
               timer -=1;
               say(timer.toString());
               $("#timer").text(timer.toString());
               if (timer == 0) {
                    clearInterval(timerInterval);
                    timer = 5;
                    
               }
         }, 1000);
    });
});

// Texto para audio
var speaking = false;
function say(text) {
         if (!speaking) {
              speaking = true;
              var msg = new SpeechSynthesisUtterance();
              msg.lang = "en-US";
              msg.text = text;
              msg.onend = function(event) {
                  speaking = false;
              };
              window.speechSynthesis.speak(msg);
        }
}