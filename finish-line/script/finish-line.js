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

    var timer = 6;
    var timerInterval = false;
    $("#timer").click(function() {
         if (timerInterval)
            clearInterval(timerInterval);
         timerInterval = setInterval(function() {
               timer -=1;
               if (timer == 0) {
                    clearInterval(timerInterval);
                    timer = 6;
                    audio.play();
                    say("GO!");
                    $("#timer").text("GO!");
               }
               else {
                   say(timer.toString());
                   $("#timer").text(timer.toString());
               }
         }, 5000);
    });

    var playing = false;
    var blueX = 0;
    var blueY = 0;
    var redX = 0;
    var redY = 0;

    $("#blue,#red").on("touchstart", function(e) {
         playing = true;

         blueX = 
               e.originalEvent.touches[0].pageX;
         blueY = 
               e.originalEvent.touches[0].pageY;
         $("#blue")
               .css("left", (blueX-25)+"px");
         $("#blue")
               .css("top", (blueY-25)+"px");

         redX = 
               e.originalEvent.touches[1].pageX;
         redY = 
               e.originalEvent.touches[1].pageY;
         $("#red")
               .css("left", (redX-25)+"px");
         $("#red")
               .css("top", (redY-25)+"px");
    });
    
    $("#blue,#red").on("touchmove", function(e) {
         if (!playing) return false;

         blueX = 
               e.originalEvent.touches[0].pageX;
         blueY = 
               e.originalEvent.touches[0].pageY;
         $("#blue")
               .css("left", (blueX-25)+"px");
         $("#blue")
               .css("top", (blueY-25)+"px");

         redX = 
               e.originalEvent.touches[1].pageX;
         redY = 
               e.originalEvent.touches[1].pageY;
         $("#red")
               .css("left", (redX-25)+"px");
         $("#red")
               .css("top", (redY-25)+"px");

         var lineOffset = $(".finish-line").offset();
         if (lineOffset.top < blueY &&
              lineOffset.top > redY) {
               $("html,body").css("background-color","#700");
         }
         else if (lineOffset.top < redY &&
              lineOffset.top > blueY) {
               $("html,body").css("background-color","#007");
         }
         else {
               $("html,body").css("background-color","#2B2A32");
         }
    });

   $("#blue,#red").on("touchend", function(e) {
         playing = false;
    });
});

// Texto para audio
var speaking = false;
function say(text) {
         if (!speaking) {
              speaking = true;
              var msg = new SpeechSynthesisUtterance();
              //msg.lang = "pt-BR";
              msg.lang = "en-US";
              //msg.lang = "ja-JP";
              msg.text = text;
              msg.onend = function(event) {
                  speaking = false;
              };
              window.speechSynthesis.speak(msg);
        }
}