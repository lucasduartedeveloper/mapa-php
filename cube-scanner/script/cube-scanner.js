// Heroku build time
setTimeout(function(e) {
    $("#heroku").css("display","inline-block");
}, 10000);

$("#heroku").click(function() {
    ws.send("CUBE-SCANNER|" +
        playerId + "|VERSION-UPD");
});

$("#print").click(function() {
    if (listEmpty()) return;

    location.replace(
    "print.php?id="+
    cubeList[cubeNo].id);
});

$("#eraser").click(function(e) {
    resetCube();
});

$("#motion").click(function() {
    if (motion) {
        speedX = 0;
        speedY = 0;
        speedZ = 0;
        $("#motion").addClass("place");
        motion = false;
    }
    else {
        $("#motion").removeClass("place");
        motion = true;
    }
});

var cameraKey = false;
$("#key").click(function() {
    if (cameraKey) {
        stopCamera();
        $("#key").addClass("place");
        cameraKey = false;
    }
    else {
        startCamera("environment");
        $("#key").removeClass("place");
        cameraKey = true;
    }
});

var interface = false;
$("#light-switch").click(function() {
    if (!authenticated) return;
    if (interface) {
        video.width = 128;
        video.height = 128;
        stopCamera();
        startCamera("environment");
        $("#cube-container").css("z-index", "9998");
        $("#title").show();
        $("#camera-canvas").css("z-index", "9999");
        $("#rotation").show();
        $("#dropdown").show();
        $("#interface").hide();
        $("#light-switch").addClass("place");
        interface = false;
    }
    else {
        video.width = vw;
        video.height = vh;
        stopCamera();
        startCamera("environment");
        $("#cube-container").css("z-index", "99999");
        //$("#title").hide();
        $("#camera-canvas").css("z-index", "9998"); 
        //$("#rotation").hide();
        $("#dropdown").hide();
        $("#interface").show();
        $("#light-switch").removeClass("place");
        interface = true;
    }
});

var socks = false;
$("#socks").click(function() {
    if (socks) {
        $("#socks").addClass("place");
        $(document.body).css("transform",
        "rotateY(-180deg)");
        socks = false;
    }
    else {
        $("#socks").removeClass("place");
        $(document.body).css("transform",
        "rotateY(0deg)");
        socks = true;
    }
});

// TODO:
// Link delete, update and create cube

var coin = new Audio("audio/coin.wav");
var notification = new Audio("audio/game-notification.wav");
var beep0 = new Audio("audio/confirmation-beep.wav");
var gettingHit = new Audio("audio/getting-hit.wav");
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
     //say("Cube scanner initialized.");

     var video = document.getElementById("video");
     startCamera("environment");

     $("#previous").click(function(e) {
          var n = cubeNo-1;
          n = n < 0 ? (cubeList.length-1) : n;
          
          if (listEmpty()) return;
          goToCube(n);
          ws.send("CUBE-SCANNER|" +
                  playerId + "|CUBE-UPD|" + 
                  n);
     });
     $("#next").click(function(e) {
          var n = cubeNo+1;
          n = n > (cubeList.length-1) ? 0 : n;
          
          if (listEmpty()) return;
          goToCube(n);
          ws.send("CUBE-SCANNER|" +
                  playerId + "|CUBE-UPD|" + 
                  n);
     });
     $("#add").click(function(e) {
          updating = false;
          $('#cube-modal-title').text("NEW CUBE");
          $('#cube-modal').modal({
               keyboard: true
          });
     });
     $("#delete").click(function(e) {
          deleteCube();
     });
     $("#name").click(function(e) {
          updating = true;
          $('#cube-modal-title').text("RENAME CUBE");
          $('#cube-modal').modal({
               keyboard: true
          });
     });
     $("#get-location").click(function(e) {
          $("#input-lat").val(position.lat);
          $("#input-lng").val(position.lng);
          say("Location set.");
     });
     $("#map").click(function(e) {
          location.replace(
          "http://maps.google.com/maps?z=12&t=m&q=loc:"+
          $("#input-lat").val()+"+"+
          $("#input-lng").val());
     });
     $("#save").click(function(e) {
          var info = {
               name: $("#input-name").val(),
               size: $("#input-size").val(),
               weight: $("#input-weight").val(),
               lat: $("#input-lat").val(),
               lng: $("#input-lng").val(),
               angle: $("#input-angle").val()
          };
          if (updating) {
              info.id = cubeList[cubeNo].id;
              updateCube(info);
          }
          else {
              addCube(info);
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
  
     $("#translateY, #rotateX, #rotateY, #rotateZ")
     .on("change", function() {

         ws.send("CUBE-SCANNER|" +
                  playerId + "|" + 
                  translateY.toString() + "|" + 
                  rotateX.toString() + "|" + 
                  rotateY.toString() + "|" + 
                  rotateZ.toString());

         if (gotXYZ) updateXYZ();
     });

     window.touchStart = 0;
     window.touchStartX = 0;
     window.touchStartY = 0;
     window.touchX = 0;
     window.touchY = 0;
     window.translateY = 0;
     
     $("#cube-container").on("touchstart", function(e) {
         //alert("TODO: Incluir uma animação.")
         touchStartX =  e.originalEvent.touches[0].pageX;
         touchStartY = e.originalEvent.touches[0].pageY;
         touchStart = new Date().getTime();
     });
     $("#cube-container").on("touchmove", function(e) {
         if (!e.originalEvent.touches) return;
         //alert("TODO: Incluir uma animação.")
         touchX =  e.originalEvent.touches[0].pageX;
         touchY = e.originalEvent.touches[0].pageY;
         // hipotenuse 
         var h = Math.sqrt(
         Math.pow(touchX-touchStartX,2),
         Math.pow(touchY-touchStartY,2));
         var d = 1/128*h;
         translateY = d;
     });
     $("#cube-container").on("touchend", function(e) {
         if ((new Date().getTime() - touchStart)) {
              resetCube();
         }
     });

     $("#upload").click(function(e) {
         $("#file-upload").click();
     });
     $("#file-upload").on("change", function(e) {
         uploadImage();
     });
     $(document).on("imageResized", function(e) {
         saveFace(e.url, 
         function() {
             ws.send("CUBE-SCANNER|" +
                 playerId + "|CUBE-UPD|" + 
                 cubeNo);
         });
         log("info", "Image resized.");
     });

     setInterval(function() {
         var canvas = 
         document.getElementById("camera-canvas");
         var context = canvas.getContext("2d");

         // add gyro
         translateY = parseInt($("#translateY").val());
         var translateYtoWeight =
         100/(-128) * translateY;
         rotateX = parseInt($("#rotateX").val());
         rotateY = parseInt($("#rotateY").val());
         rotateZ = parseInt($("#rotateZ").val());
        
         rotateX += speedX;
         rotateY += speedY;
         rotateZ += speedZ;

         if (rotateX > 180) rotateX = -180;
         if (rotateX < -180) rotateX = 180;
         if (rotateY > 180) rotateY = -180;
         if (rotateY < -180) rotateY = 180;
         if (rotateZ > 180) rotateZ = -180;
         if (rotateZ < -180) rotateZ = 180;

         $("#rotateX").val(parseInt(rotateX));
         $("#rotateY").val(parseInt(rotateY));
         $("#rotateZ").val(parseInt(rotateZ));

         if (motion) {
             ws.send("CUBE-SCANNER|" +
                  playerId + "|" + 
                  translateY.toString() + "|" + 
                  rotateX.toString() + "|" + 
                  rotateY.toString() + "|" + 
                  rotateZ.toString());
         }

         if (!authenticated) {
             canvas.width = 10;
             canvas.height = 10;
             if (cameraKey)
                 context.drawImage(video, 
                 ((vw-128)/2)*-1, 
                 ((vh-128)/2)*-1, 
                 vw, vh);
             var data =
             context.getImageData(0, 0, 10, 10).data;
             authenticate(data);
         }
         else {
             canvas.width = 128;
             canvas.height = 128;
             if (cameraKey)
                 context
                 .drawImage(video, 
                 ((vw-128)/2)*-1, 
                 ((vh-128)/2)*-1, 
                 vw, vh);
             if (interface) {
                 var canvas = document
                 .getElementById("interface");
                 canvas.width = sw;
                 canvas.height = sh;
                 canvas
                 .getContext("2d")
                 .drawImage(video, 
                 ((vw-sw)/2)*-1, 
                 ((vh-sh)/2)*-1, 
                 vw, vh);
             }
             addShadow();
         }

         $("#rotation-label").text(
              "Rotation X: " + rotateX.toFixed(0) + ", " +
              "Y: " + rotateY.toFixed(0) + ", " +
              "Z: " + rotateZ.toFixed(0)
         );

          $("#cube-container img.front")          
          .css("transform",          
         "translateX(0px) "+
         "translateY("+ (translateYtoWeight) + "px) "+
         "translateZ(64px) "+
         "rotateX(0deg) "+
         "rotateY(0deg) "+
         "rotateZ(0deg)");
          $("#cube-container img.back")         
         .css("transform", 
         "translateX(0px) "+
         "translateY("+ (translateYtoWeight) + "px) "+
         "translateZ(-64px) " +
         "rotateX(0deg) "+
         "rotateY(180deg) "+
         "rotateZ(0deg)");
          $("#cube-container img.left")       
         .css("transform", 
         "translateX(-64px) "+
         "translateY("+ (translateYtoWeight) + "px) "+
         "translateZ(0px) " +
         "rotateX(0deg) "+
         "rotateY(-90deg) "+
         "rotateZ(0deg)");
          $("#cube-container img.top")        
         .css("transform", 
         "translateX(0px) "+
         "translateY("+ (translateYtoWeight-64) + "px) "+
         "translateZ(0px) " +
         "rotateX(90deg) "+
         "rotateY(0deg) "+
         "rotateZ(0deg)");       
          $("#cube-container img.right")          
         .css("transform", 
         "translateX(64px) "+
         "translateY("+ (translateYtoWeight) + "px) "+
         "translateZ(0px) " +
         "rotateX(0deg) "+
         "rotateY(90deg) "+
         "rotateZ(0deg)");

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

         saveFace(base64,
         function() {
             ws.send("CUBE-SCANNER|" +
                 playerId + "|CUBE-UPD|" + 
                 cubeNo);
         });
     });

     ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "CUBE-SCANNER" &&
            playerId != msg[1]) {
            log("ws", msg);

            if (msg[2] == "[]" && !authenticated) {
                 authenticate([]);
            }
            else if (msg[2] == "CUBE-UPD") {
                 cubeNo = parseInt(msg[3]);
                 goToCube(cubeNo);
            }
            else if (msg[2] == "LIST-UPD") {
                 cubeNo = parseInt(msg[3]);
                 listCubes(setCubeInfo);
            }
            else if (msg[2] == "VERSION-UPD") {
                 location.reload();
            }
            else {
                $("#translateY").val(parseInt(msg[2]));
                $("#rotateX").val(parseInt(msg[3]));
                $("#rotateY").val(parseInt(msg[4]));
                $("#rotateZ").val(parseInt(msg[5]));
            }
        }
    };
});

var gotXYZ = false;
function getXYZ(callback) {
     $.getJSON("ajax/cube-defender.php", function(data) {
          var xyz = data[0].valor.split("|");
          cubeNo = parseInt(data[1].valor);
          
          translateY = parseInt(xyz[0]);
          rotateX = parseInt(xyz[1]);
          rotateY = parseInt(xyz[2]);
          rotateZ = parseInt(xyz[3]);

          $("#translateY").val(translateY);
          $("#rotateX").val(rotateX);
          $("#rotateY").val(rotateY);
          $("#rotateZ").val(rotateZ);

          log("get", data);

         callback();
         gotXYZ = true;
     });
}

function updateXYZ() {
     $.post("ajax/cube-defender.php", {
          xyz:
          translateY + "|" +
          rotateX + "|" + 
          rotateY + "|" +
          rotateZ,
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
 
          setCubeInfo();

          log("get", data);
          //say("Around the cube.");
          //say(cubeList[cubeNo].name + " downloaded.");
     });
}

function setCubeInfo() {
    $("#name").text(cubeList[cubeNo].name);

    $("#input-name").val(cubeList[cubeNo].name);
    $("#input-size").val(cubeList[cubeNo].size);
    $("#input-weight").val(cubeList[cubeNo].weight);
    $("#input-lat").val(cubeList[cubeNo].lat);
    $("#input-lng").val(cubeList[cubeNo].lng);
    $("#input-angle").val(cubeList[cubeNo].angle);

    $("#cube-id").text(cubeList[cubeNo].cube_id);
    $("#record-no").text(
    (cubeNo+1)+"/"+cubeList.length);
}

var cubeList = [];
function listCubes(callback = false) {
     $.getJSON("ajax/cube-info.php", 
     function(data) {
         cubeList = data;
         if (cubeList.length > 0) {
             goToCube(cubeNo);
         }
         else {
             $("#name").text("---");
             $("#cube-container img").hide();
             $("#loading").show();
         }

         if (callback) callback();
         log("get", data);
         //say("");
     });
}

function addCube(info) {
     post(info, function(data) {
          listCubes(function() {

              ws.send("CUBE-SCANNER|" +
                  playerId + "|LIST-UPD|" + 
                  cubeNo);

          });
          log("post", data);
          say("A new cube was created.");
     });
}

function goToCube(n, callback = false) {
     if (listEmpty()) return;

     if (cubeNo != n) {
          $.post("ajax/cube-defender.php", {
              cubeNo: n,
              }).done(function(data) {
                  cubeNo = n;
                  getCube(cubeList[n].id);

                  log("post", data);
              });
     }
     else {
          cubeNo = n;
          getCube(cubeList[n].id);
     }
     if (callback) callback();
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
                   goToCube(cubeList.length-1,
                   function() {
                       ws.send("CUBE-SCANNER|" +
                           playerId + "|LIST-UPD|" + 
                           cubeNo);
                   });
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

var updating = false;
function updateCube(info) {
     post(info, function(data) {
          cubeList[cubeNo] = info;
          setCubeInfo();
          
          ws.send("CUBE-SCANNER|" +
                  playerId + "|LIST-UPD|" + 
                  cubeNo);

          log("post", data);
          say("Cube updated.");
     });
}

function post(info, callback) {
     $.post("ajax/cube-info.php", {
          cubeId: info.id,
          name: info.name,
          size: info.size,
          weight: info.weight,
          lat: info.lat,
          lng: info.lng,
          angle: info.angle,
          }).done(callback);
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
    "Cube"];
function setFace(id) {
    faceId = id;
    $("#cube-face").text(faces[id]);
}

function saveFace(base64, callback = false) {
     if (listEmpty()) return;

     if (faceId == 6) {
         speaking = true;
         var tts = "Digitalized ";
         for (var k = 0; k < 6; k++) {
             setFace(k);
             saveFace(base64,
             k == 5 ? callback : false);
         }
         tts += faces[6];
         tts += ".";
         speaking = false;
         say(tts);
      }
      else {
         log("global-var", 
         "cubeNo:"+cubeNo+", faceId:"+faceId);
         var hasFace = false;
         for (var k in cube) {
             if (cube[k].face_id == faceId) {
                  cube[k].base64 = base64;
                  hasFace = true; // return
             }
         }
         if (!hasFace) {
              cube.push({ 
                  cube_id: cubeList[cubeNo].id,
                  face_id: faceId,
                  base64: base64
              });
              hasFace = true;
         }

         $.post("ajax/cube-face.php", {
             cubeId: cubeList[cubeNo].id,
             faceId: faceId,
             base64: base64,
             }).done(function(data) { 
                   log("post", data);
                   say("Digitalized "+faces[faceId]);
                   if (callback) callback();
         });
     }
}

var baseImages = [
      "img/front.png",
      "img/back.png",
      "img/left.png",
      "img/top.png",
      "img/right.png",
      "img/bottom.png"
];
function resetCube() {
      speaking = true;
      beep0.play();
      saveFace(baseImages[faceId], 
          function() {
               ws.send("CUBE-SCANNER|" +
                    playerId + "|CUBE-UPD|" + 
                    cubeNo);

               speaking = false;
               //say("Cube was reseted.");
      });
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

// Localização melhor
var GPS = true;
var position = false;
function success(pos) {
     if (GPS = false) return;
     position = {
          lat : pos.coords.latitude,
          lng : pos.coords.longitude
     };
}

function error(error) {
  switch(error.code)  {
    case error.PERMISSION_DENIED:
      console.log("Usuário rejeitou a solicitação de Geolocalização.");
      //setInterval(reload, 5000);
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Localização indisponível.");
      break;
    case error.TIMEOUT:
      console.log("A requisição expirou.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("Algum erro desconhecido aconteceu.");
      break;
    }
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 5000
};

const watchID = navigator.geolocation.watchPosition(success, error, options); 