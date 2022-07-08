var coin = new Audio("audio/coin.wav");
var notification = new Audio("audio/game-notification.wav");
var gameOver = new Audio("audio/game-over.wav");

// Saldo
var playerId = new Date().getTime();
var partNo = 0;

$(document).ready(function() {
     var video = document.getElementById("video");
     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: false })
          .then((stream) => {
               video.srcObject = stream;
          });
     }

     var x = 0;
     var y = 0;
     var sh = window.innerHeight;
     var sw = window.innerWidth;

    $("*").on("touchstart", function(e) {
          x = e.originalEvent.touches[blue].pageX;
          y = e.originalEvent.touches[blue].pageY;
    });
    
    $("*").on("touchmove", function(e) {
          x = e.originalEvent.touches[blue].pageX;
          y =  e.originalEvent.touches[blue].pageY;
          
          var angleX = (180/sw)*x;
          var angleY = (180/sh)*y

          $("#funnel-container")
          .css("transform": 
          "rotateX("+angleX+") rotateY("+angleY+")";
    });

   $("*").on("touchend", function(e) {
         // 
    });

     setInterval(function() {
         var canvas = 
         document.getElementById("camera-canvas");
         var context = canvas.getContext("2d");

         // ENVIAR
         var cnv = document.createElement("canvas");
         cnv.width = 64;
         cnv.height = 64;
         var ctx = cnv.getContext("2d");

         ctx.drawImage(video, 0, 0, 64, 64);
         var imgData = ctx.getImageData(0, 0, 64, 64);
 
         // overwrite original image
         context.putImageData(imgData, 0, 0);
     }, 100);

     $("#camera-canvas").click(function(e) {
         notification.play();
     });

     ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "FLIP-FUNNEL" &&
            playerId != msg[1]) {
        }
    };
});

var sh = window.innerHeight;
var sw = window.innerWidth;
canvas.width = sw;
canvas.height = sh/3;

// Texto para audio
var speaking = false;
function say(text) {
    if (!speaking) {
         speaking = true;
         var msg = new SpeechSynthesisUtterance();
         msg.lang = "pt-BR";
         //msg.lang = "en-US";
         //msg.lang = "ja-JP";
         msg.text = text;
         msg.onend = function(event) {
              speaking = false;
         };
         window.speechSynthesis.speak(msg);
    }
}