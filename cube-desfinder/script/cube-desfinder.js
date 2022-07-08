var coin = new Audio("audio/coin.wav");
var notification = new Audio("audio/game-notification.wav");
var gameOver = new Audio("audio/game-over.wav");

// Saldo
var playerId = new Date().getTime();
var partNo = 0;

var rotateX = 0;
var rotateY = 0;
var rotateZ = 0;

$(document).ready(function() {
     getXYZ();
     getCube();

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
  
    $("#rotateX, #rotateY, #rotateZ")
    .on("change", function() {
         $("#rotation-label").text(
              "Rotation X: " + $("#rotateX").val() + ", " +
              "Y: " + $("#rotateY").val() + ", " +
              "Z: " + $("#rotateZ").val()
         );
         if (gotXYZ) updateXYZ();
    });

     setInterval(function() {
         var canvas = 
         document.getElementById("camera-canvas");
         var context = canvas.getContext("2d");

         context.drawImage(video, 0, 0, 128, 128);

         $("#rotateX, #rotateY, #rotateZ")
         .trigger("change");

         rotateX = parseInt($("#rotateX").val());
         rotateY = parseInt($("#rotateY").val());
         rotateZ = parseInt($("#rotateZ").val());

         $("#cube-container")
         .css("transform", 
         "rotateX("+ (rotateX) + "deg) "+
         "rotateY("+ (rotateY) + "deg) "+
         "rotateZ("+ (rotateZ) + "deg)");

          ws.send("CUBE-DESFINDER|" +
          playerId + "|" + 
          rotateX + "|" + 
          rotateY + "|" + 
          rotateZ);
     }, 100);

     var side = 0;
     $("#camera-canvas").click(function(e) {
         notification.play();
 
         var base64 = 
         document.getElementById("camera-canvas").
         toDataURL();

         $("#cube-container").children()[side].src =
         base64;
         saveSide(side, base64);

         side += 1;
         side = side > 5 ? 0 : side;
     });

     ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "CUBE-DESFINDER" &&
            playerId != msg[1]) {
            rotateX = parseInt(msg[2]);
            rotateY = parseInt(msg[3]);
            rotateZ = parseInt(msg[4]);
            setTimeout(function(e) {        
                getCube();
            }, 5000);
        }
    };
});

var gotXYZ = false;
function getXYZ() {
     $.getJSON("ajax/cube-desfinder.php", function(data) {
          var xyz = data[0].valor.split("|");
          rotateX = parseInt(xyz[0]);
          rotateY = parseInt(xyz[1]);
          rotateZ = parseInt(xyz[2]);
          //console.log(data);
          gotXYZ = true;
     });
}

function updateXYZ() {
     $.post("ajax/cube-desfinder.php", {
          xyz: rotateX + "|" +  rotateY + "|" + rotateZ,
          }).done(function(data) {
              //console.log(data);
     });
}

function getCube() {
     $.getJSON("/camera/ajax/camera.php", 
     function(data) {
          for (var k = 0; k < 6; k++) {
               $("#cube-container").children()[k].src =
               data[k].base64;
	               //console.log(data);
          }
     });
}

function saveSide(side, base64) {
     $.post("/camera/ajax/camera.php", {
             cameraId: side,
             base64: base64,
             }).done(function(data) { 
                     //console.log(data);
      });
}

var sh = window.innerHeight;
var sw = window.innerWidth;
canvas.width = sw;
p.he,eight = sh/3;

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