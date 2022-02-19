var audio0 = new Audio("audio/game_notification.wav");
var audio1 = new Audio("audio/sfx_victory.wav");
var audio2 = new Audio("audio/game_over.wav");
var audio3 = new Audio("audio/getting_hit.wav");
var audio4 = new Audio("audio/creature_dying.wav");

var cameraId = 0;
$(document).ready(function() {
     // VR TESTE
     var video = document.getElementById("video");
     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: false })
          .then((stream) => {
               video.srcObject = stream;
          });
     }

     setInterval(function() {
         var canvas = document.getElementById("camera-canvas");
         var context = canvas.getContext("2d");

         // ENVIAR
         var cnv = document.createElement("canvas");
         cnv.width = 100;
         cnv.height = 100;
         var ctx = cnv.getContext("2d");

         ctx.drawImage(video, 0, 0, 100, 100);

         var imgData = ctx.getImageData(0, 0, 100, 100);
         var data = imgData.data;
         for (var i = 0; i < data.length; i += 4) {
              var brightness = 0.34 * data[i] + 
              0.5 * data[i + 1] + 0.16 * data[i + 2];
              // red
              data[i] = brightness;
              // green
              data[i + 1] = brightness;
              // blue
              data[i + 2] = brightness;
         }

         // overwrite original image
         ctx.putImageData(imgData, x, y);
         var dataUrl = cnv.toDataURL("image/png");

         var img = document.createElement("img");
         img.width = 100;
         img.height = 100;
         img.style.objectFit = "cover";

         // Gravar no banco de dados
         saveFrame(cameraId, dataUrl);

         img.onload = function() {
              context.drawImage(
              this, 0, 0, 100, 100); 
         };
         img.src = dataUrl;
     }, 1000);
});