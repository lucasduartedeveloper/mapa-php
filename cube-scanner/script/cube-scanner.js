// Heroku build time
setTimeout(function(e) {
    $("#heroku").css("display","inline-block");
}, 40000);

var coin = new Audio("audio/coin.wav");
var notification = new Audio("audio/game-notification.wav");
var gameOver = new Audio("audio/game-over.wav");

debug = true;
var base64 = "";

var playerId = new Date().getTime();
var partNo = 0;

var x = 0;
var y = 0;
var sh = window.innerHeight;
var sw = window.innerWidth;
var ar = sh/sw;
var vh = 0;
var vw = 0;
var vr = 0;

var rotateX = 0;
var rotateY = 0;
var rotateZ = 0;

var cameraMode = "environment";
function startCamera(mode) {
     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ 
          video: { 
          maxWidth: 480,
          maxHeight: 480,
          facingMode: { exact: mode } }, 
          audio: false })
          .then((stream) => {
               video.srcObject = stream;
               var display = stream.
               getVideoTracks()[0].getSettings();
               vw = display.width;
               vh = display.height;
               vr = vh/vw;
          });
     }
}

function stopCamera() {
     video.srcObject
    .getTracks()
    .forEach(t => t.stop());
}

$(document).ready(function() {
     say("Cube scanner initialized, delete the sphere.");

     var video = document.getElementById("video");
     startCamera("environment");

     $("#previous").click(function(e) {
          cubeNo -= 1;
          cubeNo = cubeNo < 0 ? (cubeList.length-1) : cubeNo;
          
          if (listEmpty()) return;
          goToCube(cubeNo);
     });
     $("#next").click(function(e) {
          cubeNo += 1;
          cubeNo = cubeNo > (cubeList.length-1) ? 0 : cubeNo;
          
          if (listEmpty()) return;
          goToCube(cubeNo);
     });
     $("#add").click(function(e) {
          renaming = false;
          $('#cube-modal-title').text("NEW CUBE");
          $('#cube-modal').modal({
               keyboard: true
          });
     });
     $("#delete").click(function(e) {
          deleteCube();
     });
     $("#name").click(function(e) {
          renaming = true;
          $('#cube-modal-title').text("RENAME CUBE");
          $('#cube-modal').modal({
               keyboard: true
          });
     });
     $("#save").click(function(e) {
          if (renaming) {
              renameCube($("#input-name").val());
          }
          else {
              addCube($("#input-name").val());
          }
          $('#cube-modal').modal("hide");
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

         ws.send("CUBE-SCANNER|" +
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
         saveFace(e.url);
         log("info", "Image resized.");
     });

     setInterval(function() {
         var canvas = 
         document.getElementById("camera-canvas");
         var context = canvas.getContext("2d");

         rotateX = parseInt($("#rotateX").val());
         rotateY = parseInt($("#rotateY").val());
         rotateZ = parseInt($("#rotateZ").val());

         if (!authenticated) {
             canvas.width = 10;
             canvas.height = 10;
             context.drawImage(video,
             0, (((10/vr)-10)/2)*-1, 10, 10/vr);
             var data =
             context.getImageData(0, 0, 10, 10).data;
             authenticate(data);
         }
         else {
             canvas.width = 128;
             canvas.height = 128;
             context
             .drawImage(video, 
             0, (((128/vr)-128)/2)*-1, 128, 128/vr);

             addShadow();
         }

         $("#rotation-label").text(
              "Rotation X: " + rotateX + ", " +
              "Y: " + rotateY + ", " +
              "Z: " + rotateZ
         );

         $("#cube-container")
         .css("transform", 
         "rotateX("+ (rotateX) + "deg) "+
         "rotateY("+ (rotateY) + "deg) "+
         "rotateZ("+ (rotateZ) + "deg)");
     }, 100);

     $("#camera-canvas").click(function(e) {
         notification.play();
 
         var base64 = 
         document.getElementById("camera-canvas").
         toDataURL();

         saveFace(base64);
     });

     ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "CUBE-SCANNER" &&
            playerId != msg[1]) {
            log("ws", msg);

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
          log("get", data);
         
         $("#rotateX, #rotateY, #rotateZ")
         .trigger("change");

         gotXYZ = true;
     });
}

function updateXYZ() {
     $.post("ajax/cube-defender.php", {
          xyz: rotateX + "|" +  rotateY + "|" + rotateZ,
          }).done(function(data) {
              log("post", data);
              //say("Cube was rotated.");
     });
}

var cubeNo = 0;
var cube = [];
function getCube(id) {
     $("#name").text("---");
     $("#cube-container img").hide();
     $("#loading").show();
 
     $.getJSON("ajax/cube-face.php?cubeId="+id, 
     function(data) {
          cube = data;

          $("#loading").hide();
          $("#cube-container img").show();
          $("#name").text(cubeList[cubeNo].nome);
          $("#cube-id").text(id);
          $("#record-no").text(
          (cubeNo+1)+"/"+cubeList.length);

          log("get", data);
          //say("Around the cube.");
          //say(cubeList[cubeNo].nome + " downloaded.");
     });
}

var cubeList = [];
function listCubes() {
     $.getJSON("ajax/cube-info.php", 
     function(data) {
         cubeList = data;
         if (cubeList.length > 0) {
             goToCube(cubeList.length-1);
         }
         else {
             $("#name").text("---");
             $("#cube-container img").hide();
             $("#loading").show();
         }

         log("get", data);
         //say("");
     });
}

function addCube(text) {
     $.post("ajax/cube-info.php", {
          name: text,
          }).done(function(data) {
               listCubes();

               log("post", data);
               say("A new cube was created.");
     });
}

function goToCube(n) {
     if (listEmpty()) return;

     cubeNo = n;
     getCube(cubeList[n].id);
}

function deleteCube() {
     if (listEmpty()) return;

     var cubeId = cubeList[cubeNo].id;
     $.post("ajax/cube-info.php", {
          deleteId: cubeId,
          }).done(function(data) {
               cubeList = cubeList
               .filter(c => c.id != cubeId);
               if (cubeList.length > 0) {
                   goToCube(cubeList.length-1);
               }
               else {
                   $("#name").text("---");
                   $("#cube-container img").hide();
                   $("#loading").show();
                   $("#cube-id").text("");
                   $("#record-no").text("");
               }

               log("post", data);
               say("Cube deleted.");
     });
}

var renaming = false;
function renameCube(text) {
     $.post("ajax/cube-info.php", {
          cubeId: cubeList[cubeNo].id,
          name: text,
          }).done(function(data) {
               cubeList[cubeNo].nome = text;
               $("#name").text(cubeList[cubeNo].nome);

               log("post", data);
               say("Cube renamed.");
     });
}

function listEmpty() {
     if (cubeList.length == 0) {
          say("You don't have any cubes, create one first");
          return true;
     }
     return false;
}

var faceId = 0;
var faces = [
    "Front", 
    "Back", 
    "Left", 
    "Top",
    "Right",
    "Bottom",
    "Cube" ];
function setFace(id) {
    faceId = id;
    $("#cube-face").text(faces[id]);
}

function saveFace(base64) {
     if (faceId == 6) {
         speaking = true;
         var tts = "Digitalized ";
         for (var k = 0; k < 6; k++) {
             setFace(k);
             saveFace(base64);
             tts += k > 0 && k < 5 ?
             ", " : k> 0 ? " and " : "";
             tts += faces[k];
         }
         tts += ".";
         speaking = false;
         say(tts);
      }
      else {
         log("global-var", 
         "cubeNo:"+cubeNo+", faceId:"+faceId);
         for (var k in cube) {
             if (cube[k].face_id == faceId)
             cube[k].base64 = base64;
         }

         $.post("ajax/cube-face.php", {
             cubeId: cubeList[cubeNo].id,
             faceId: faceId,
             base64: base64,
             }).done(function(data) { 
                   log("post", data);
                   say("Digitalized "+faces[faceId]);
         });
     }
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
      speaking = true;
      for (var k = 0; k < 6; k++) {
           setFace(k);
           saveFace(baseImages[k]);
      }
      setTimeout(function() { // *
          getCube(cubeList[cubeNo].id);
          speaking = false;
          gameOver.play();
          //say("Cube was reseted.");
      }, 5000);
}

// Texto para audio
var speaking = false;
function say(text) {
    if (!speaking) {
         speaking = true;
         var msg = new SpeechSynthesisUtterance();
         //msg.lang = "pt-BR";
         //msg.lang = "en-US";
         msg.lang = "ja-JP";
         //msg.lang = "ko-KR";
         //msg.lang = "cmn-CN";
         msg.text = text;
         msg.onend = function(event) {
              speaking = false;
         };
         window.speechSynthesis.speak(msg);
    }
}