var audio = new Audio("audio/gun-shot.wav");

var startTime = 0;
var redTime = 0;
var blueTime = 0;

var redPlaying = false;
var bluePlaying = false;
var blueX = 0;
var blueY = 0;
var redX = 0;
var redY = 0;

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
         $("#result").hide();
         if (timerInterval)
            clearInterval(timerInterval);
         timerInterval = setInterval(function() {
               timer -=1;
               if (timer == 0) {
                    clearInterval(timerInterval);
                    timer = 6;
                    audio.play();
                    
                    startTime = new Date().getTime();
                    say("GO!");
                    $("#timer").text("GO!");
               }
               else {
                   say(timer.toString());
                   $("#timer").text(timer.toString());
               }
         }, 5000);
    });

    $("#blue,#red").on("touchstart", function(e) {
         if (!startTime) return false;
         var blue = $(e.target)[0].id == "blue" ? 0 : 1;
         var red = $(e.target)[0].id == "red" ? 0 : 1;

         if (blue == 0 || $(e.target).length == 2) {
               bluePlaying = true && startTime;
               blueX = 
               e.originalEvent.touches[blue].pageX;
               blueY = 
               e.originalEvent.touches[blue].pageY;
               $("#blue")
               .css("left", (blueX-25)+"px");
               $("#blue")
               .css("top", (blueY-25)+"px");
         }

         if (red == 0 || $(e.target).length == 2) {
               redPlaying = true;
               redX = 
               e.originalEvent.touches[red].pageX;
               redY = 
               e.originalEvent.touches[red].pageY;
               $("#red")
               .css("left", (redX-25)+"px");
               $("#red")
               .css("top", (redY-25)+"px");
         }
    });
    
    $("#blue,#red").on("touchmove", function(e) {
         if (!bluePlaying && !redPlaying) return false;

         var blue = $(e.target)[0].id == "blue" ? 0 : 1;
         var red = $(e.target)[0].id == "red" ? 0 : 1;

         var lineOffset = $(".finish-line").offset();
         if (blue == 0 || 
               e.originalEvent.touches.length == 2) {
               blueX = 
               e.originalEvent.touches[blue].pageX;
               blueY = 
               e.originalEvent.touches[blue].pageY;
               $("#blue")
               .css("left", (blueX-25)+"px");
               $("#blue")
               .css("top", (blueY-25)+"px");

               if (lineOffset.top > blueY) {
                    bluePlaying = false;
                    blueTime = new Date().getTime();
               }
         }

         if (red == 0 || 
               e.originalEvent.touches.length == 2) {
               redX = 
               e.originalEvent.touches[red].pageX;
               redY = 
               e.originalEvent.touches[red].pageY;
               $("#red")
               .css("left", (redX-25)+"px");
               $("#red")
               .css("top", (redY-25)+"px");

               if (lineOffset.top > redY) {
                    redPlaying = false;
                    redTime = new Date().getTime();
               }
         }
    });

   $("#blue,#red").on("touchend", function(e) {
         if (startTime && (!bluePlaying && !redPlaying)) {
               blueTime = blueTime - startTime;
               redTime = redTime - startTime;
               
               $("#time1").text(
                 (blueTime/1000).toFixed(3)+"s");
               $("#time2").text(
                 (redTime/1000).toFixed(3)+"s");
               $("#result").show();

               startTime = 0;
               blueTime = 0;
               redTime = 0;
         }
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