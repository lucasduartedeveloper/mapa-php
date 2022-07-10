document.addEventListener('contextmenu',
                        event => event.preventDefault());

var coin = new Audio("audio/coin.wav");
var notification = new Audio("audio/game-notification.wav");
var gameOver = new Audio("audio/game-over.wav");

// Saldo
var playerId = new Date().getTime();
var partNo = 0;

var rotateX = 0;
var rotateY = 0;
var rotateZ = 0;

var cameraMode = "environment";
function startCamera(mode) {
     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ video: { facingMode: { exact: mode } }, audio: false })
          .then((stream) => {
               video.srcObject = stream;
          });
     }
}

function stopCamera() {
     video.srcObject
    .getTracks()
    .forEach(t => t.stop());
}

$(document).ready(function() {
     getXYZ();
     listCubes();
     getCube(0);

     var video = document.getElementById("video");
     startCamera("environment");

     var x = 0;
     var y = 0;
     var sh = window.innerHeight;
     var sw = window.innerWidth;

     $("#previous").click(function(e) {
          cubeId -= 1;
          cubeId = cubeId < 0 ? cubeList.lenght : cubeId;
          getCube(cubeId);
          if (cubeId == 0 || cubeId ==(cubeList.length-1)) {
              $('#add-cube').modal({
                  keyboard: true
              });
          }
     });
     $("#next").click(function(e) {
          cubeId += 1;
          cubeId = cubeId > cubeList.lenght ? 0 : cubeId;
          getCube(cubeId);
          if (cubeId == 0 || cubeId == (cubeList.length-1)) {
              $('#add-cube').modal({
                  keyboard: true
              });
          }
     });
     $("#save").click(function(e) {
          addCube($("#name").val());
     });
     
     $("#rotate-camera").click(function(e) {
          if (cameraMode == "environment") {
               cameraMode = "user";
               stopCamera();
               startCamera(cameraMode);
          }
          else {
               cameraMode = "environment";
               stopCamera();
               startCamera(cameraMode);
          }
     });
  
     $("#rotateX, #rotateY, #rotateZ")
     .on("change", function() {
         $("#rotation-label").text(
              "Rotation X: " + rotateX + ", " +
              "Y: " + rotateY + ", " +
              "Z: " + rotateZ
         );

         ws.send("CUBE-DEFENDER|" +
                  playerId + "|" + 
                  rotateX.toString() + "|" + 
                  rotateY.toString() + "|" + 
                  rotateZ.toString());

         if (gotXYZ) updateXYZ();
     });

     var touchStart = 0;
     $("#cube-container").on("touchstart", function(e) {
         //alert("TODO: Incluir uma animação.")
         touchStart = new Date().getTime();
         resetCube();
     });

     $("#upload").click(function(e) {
         $("#file-upload").click();
     });

     $("#file-upload").on("change", function(e) {
         uploadImage();
     });

     $(document).on("imageResized", function(e) {
         saveSide(side, e.url);
         console.log("imageResized");
     });

     setInterval(function() {
         var canvas = 
         document.getElementById("camera-canvas");
         var context = canvas.getContext("2d");

         context.drawImage(video, 0, 0, 128, 128);

         rotateX = parseInt($("#rotateX").val());
         rotateY = parseInt($("#rotateY").val());
         rotateZ = parseInt($("#rotateZ").val());

         $("#cube-container")
         .css("transform", 
         "rotateX("+ (rotateX) + "deg) "+
         "rotateY("+ (rotateY) + "deg) "+
         "rotateZ("+ (rotateZ) + "deg)");

         if (rotateX != parseInt($("#rotateX").val()) &&
              rotateY != parseInt($("#rotateY").val()) &&
              rotateZ != parseInt($("#rotateZ").val())) {
                  
         }
     }, 100);

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
         setSide(side);
     });

     ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "CUBE-DEFENDER" &&
            playerId != msg[1]) {

            rotateX = parseInt(msg[2]);
            rotateY = parseInt(msg[3]);
            rotateZ = parseInt(msg[4]);
            
            $("#rotateX, #rotateY, #rotateZ")
           .trigger("change");
        }
    };
});

var gotXYZ = false;
function getXYZ() {
     $.getJSON("ajax/cube-defender.php", function(data) {
          var xyz = data[0].valor.split("|");
          rotateX = parseInt(xyz[0]);
          rotateY = parseInt(xyz[1]);
          rotateZ = parseInt(xyz[2]);
          console.log(data);
         
         $("#rotateX, #rotateY, #rotateZ")
         .trigger("change");

         gotXYZ = true;
     });
}

function updateXYZ() {
     $.post("ajax/cube-defender.php", {
          xyz: rotateX + "|" +  rotateY + "|" + rotateZ,
          }).done(function(data) {
              //console.log(data);
     });
}

var cubeId = 0;
var cubeList = [];
function listCubes() {
     $.getJSON("ajax/cube-list.php", 
     function(data) {
          cubeList = data;
          $("#name").text(data[cubeId].nome);
          console.log(data);
     });
}

function addCube(name) {
     $.post("ajax/cube-list.php", {
          name: name
          }).done(function(data) {
               listCubes();
              //console.log(data);
     });
}

function getCube(id) {
     $.getJSON("ajax/camera.php?id="+id, 
     function(data) {
          for (var k = 0; k < data.length; k++) {
               $("#cube-container").children()[k].src =
               data[k].base64;
	        //console.log(data);
          }
     });
}

var side = 0;
var sides = [
    "Front", 
    "Back", 
    "Left", 
    "Top",
    "Right",
    "Left",
    "Bottom" ];
function setSide(k) {
    side = k;
    $("#side").text(sides[k]);
}

function saveSide(side, base64) {
      $.post("ajax/camera.php", {
             cameraId: side,
             base64: base64,
             }).done(function(data) { 
                   $("#cube-container").children()[side].src =
                   base64;
                   //console.log(data);
      });
}

var baseImages = [
      "img/front.png",
      "img/back.png",
      "img/left.png",
      "img/top.png",
      "img/right.png",
      "img/bottom.png",
];

function resetCube() {
      for (var k = 0; k < 6; k++) {
	      //console.log(data);
             saveSide(k, baseImages[k]);
      }
      //say("q was deleted, you failed.");
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
         //msg.lang = "pt-BR";
         //msg.lang = "en-US";
         msg.lang = "ja-JP";
         msg.text = text;
         msg.onend = function(event) {
              speaking = false;
         };
         window.speechSynthesis.speak(msg);
    }
}