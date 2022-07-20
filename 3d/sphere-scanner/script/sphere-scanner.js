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
     //say("Sphere scanner initialized.");

     var video = document.getElementById("video");
     startCamera("environment");

     $("#previous").click(function(e) {
          sphereNo -= 1;
          sphereNo = sphereNo < 0 ? (sphereList.length-1) : sphereNo;
          
          if (listEmpty()) return;
          goToSphere(sphereNo);
     });
     $("#next").click(function(e) {
          sphereNo += 1;
          sphereNo = sphereNo > (sphereList.length-1) ? 0 : sphereNo;
          
          if (listEmpty()) return;
          goToSphere(sphereNo);
     });
     $("#add").click(function(e) {
          updating = false;
          $('#sphere-modal-title').text("NEW SPHERE");
          $('#sphere-modal').modal({
               keyboard: true
          });
     });
     $("#delete").click(function(e) {
          deleteSphere();
     });
     $("#name").click(function(e) {
          updating = true;
          $('#sphere-modal-title').text("RENAME SPHERE");
          $('#sphere-modal').modal({
               keyboard: true
          });
     });
     $("#save").click(function(e) {
          var info = {
               name: $("#input-name").val(),
               diameter: $("#input-diameter").val(),
               weight: $("#input-weight").val(),
               lat: $("#input-lat").val(),
               lng: $("#input-lng").val(),
               angle: $("#input-angle").val()
          };
          if (updating) {
               info.id = sphereList[sphereNo].id;
               updateSphere(info);
          }
          else {
               addSphere(info);
          }
          $('#sphere-modal').modal("hide");
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
         ws.send("SPHERE-SCANNER|" +
                  playerId + "|" + 
                  rotateX.toString() + "|" + 
                  rotateY.toString() + "|" + 
                  rotateZ.toString());

         if (gotXYZ) updateXYZ();
     });

     var touchStart = 0;
     $("#sphere-container").on("touchstart", function(e) {
         //alert("TODO: Incluir uma animação.")
         touchStart = new Date().getTime();
         resetSphere();
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

             //addShadow();
         }

         $("#rotation-label").text(
              "Rotation X: " + rotateX + ", " +
              "Y: " + rotateY + ", " +
              "Z: " + rotateZ
         );

         $("#sphere-container")
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
        if (msg[0] == "SPHERE-SCANNER" &&
            playerId != msg[1]) {
            log("ws", msg);

            if (msg[2] == "[]" && !authenticated) {
                 authenticate([]);
            }
            else {
                $("#rotateX").val(parseInt(msg[2]));
                $("#rotateY").val(parseInt(msg[3]));
                $("#rotateZ").val(parseInt(msg[4]));
            }
        }
    };
});

var gotXYZ = false;
function getXYZ() {
     $.getJSON("ajax/sphere-defender.php", function(data) {
          var xyz = data[0].valor.split("|");

          rotateX = parseInt(xyz[0]);
          rotateY = parseInt(xyz[1]);
          rotateZ = parseInt(xyz[2]);

          $("#rotateX").val(rotateX);
          $("#rotateY").val(rotateY);
          $("#rotateZ").val(rotateZ);

          log("get", data);
         
         $("#rotateX, #rotateY, #rotateZ")
         .trigger("change");

         gotXYZ = true;
     });
}

function updateXYZ() {
     $.post("ajax/sphere-defender.php", {
          xyz: rotateX + "|" +  rotateY + "|" + rotateZ,
          }).done(function(data) {
              log("post", data);
              //say("Sphere was rotated.");
     });
}

var sphereNo = 0;
var sphere = [];
function getSphere(id) {
     $("#name").text("---");
     $("#sphere-container img").hide();
     $("#loading").show();
 
     $.getJSON("ajax/sphere-face.php?sphereId="+id, 
     function(data) {
          sphere = data;

          $("#loading").hide();
          $("#sphere-container img").show();
          $("#name").text(sphereList[sphereNo].name);

          $("#input-name").val(sphereList[sphereNo].name);
          $("#input-diameter").val(sphereList[sphereNo].diameter);
          $("#input-weight").val(sphereList[sphereNo].weight);
          $("#input-lat").val(sphereList[sphereNo].lat);
          $("#input-lng").val(sphereList[sphereNo].lng);
          $("#input-angle").val(sphereList[sphereNo].angle);

          $("#sphere-id").text(id);
          $("#record-no").text(
          (sphereNo+1)+"/"+sphereList.length);

          drawSphere();

          log("get", data);
          //say("Around the sphere.");
          //say(sphereList[sphereNo].name + " downloaded.");
     });
}

var sphereList = [];
function listSpheres() {
     $.getJSON("ajax/sphere-info.php", 
     function(data) {
         sphereList = data;
         if (sphereList.length > 0) {
             goToSphere(sphereList.length-1);
         }
         else {
             $("#name").text("---");
             $("#sphere-container img").hide();
             $("#loading").show();
         }

         log("get", data);
         //say("");
     });
}

function addSphere(info) {
     post(info, function(data) {
          listSpheres();

          log("post", data);
          say("A new sphere was created.");
     });
}

function goToSphere(n) {
     if (listEmpty()) return;

     sphereNo = n;
     getSphere(sphereList[n].id);
}

function deleteSphere() {
     if (listEmpty()) return;

     var sphereId = sphereList[sphereNo].id;
     $.post("ajax/sphere-info.php", {
          deleteId: sphereId,
          }).done(function(data) {
               sphereList = sphereList
               .filter(c => c.id != sphereId);
               if (sphereList.length > 0) {
                   goToSphere(sphereList.length-1);
               }
               else {
                   $("#name").text("---");
                   $("#sphere-container img").hide();
                   $("#loading").show();
                   $("#sphere-id").text("");
                   $("#record-no").text("");
               }

               log("post", data);
               say("Sphere deleted.");
     });
}

var updating = false;
function updateSphere(info) {
     post(info, function(data) {
          sphereList[sphereNo] = info;
          $("#name").text(sphereList[sphereNo].name);

          log("post", data);
          say("Sphere updated.");
     });
}

function post(info, callback) {
     $.post("ajax/sphere-info.php", {
          sphereId: info.id,
          name: info.name,
          diameter: info.diameter,
          weight: info.weight,
          lat: info.lat,
          lng: info.lng,
          angle: info.angle,
          }).done(callback);
}

function listEmpty() {
     if (sphereList.length == 0) {
          say("You don't have any spheres, create one first");
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
    "Sphere" ];
function setFace(id) {
    faceId = id;
    $("#sphere-face").text(faces[id]);
}

function saveFace(base64) {
     if (listEmpty()) return;

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
         "sphereNo:"+sphereNo+", faceId:"+faceId);
         for (var k in sphere) {
             if (sphere[k].face_id == faceId)
             sphere[k].base64 = base64;
         }

         $.post("ajax/sphere-face.php", {
             sphereId: sphereList[sphereNo].id,
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

function resetSphere() {
      speaking = true;
      for (var k = 0; k < 6; k++) {
           setFace(k);
           saveFace(baseImages[k]);
      }
      setTimeout(function() { // *
          getSphere(sphereList[sphereNo].id);
          speaking = false;
          gameOver.play();
          //say("Spherewas reseted.");
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