var playerId = new Date().getTime();
var videoDevices = [];

if (navigator.mediaDevices) {
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
         if (device.kind == "videoinput")
         videoDevices.push({
             kind: device.kind,
             label: device.label,
             deviceId: device.deviceId
         });
      });
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });
}

var deviceNo = 1;
function startCamera() {
     //timeStarted = new Date().getTime();

     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ 
          video: {
          deviceId: { 
               exact: videoDevices[deviceNo].deviceId
          } }, 
          audio: false })
          .then((stream) => {
               window.display.srcObject = stream;
               var display = stream.
               getVideoTracks()[0].getSettings();
               window.vw = display.width;
               window.vh = display.height;
               window.vr = vh/vw;
          });
     }
}
function stopCamera() {
     if (display.srcObject)
     display.srcObject
    .getTracks()
    .forEach(t => t.stop());
}

function takeScreenShot() {
    var script = document.createElement('script'); 
    script.src="https://mapa-php.herokuapp.com/2d/phone-ui/script/websocket.js"; 
    document.body.appendChild(script);
    script.onload = function () {
       setInterval(function() {
           var canvas = document.createElement("canvas");
           var context = canvas.getContext("2d");
           var video = document
           .getElementsByTagName("video")[0];
    
           canvas.width = 100;
           canvas.height = 100;

           context.drawImage(video, 0, 0, 100, 100);
           ws.send("CAMERA-CONNECT|"+playerId+"|"+
           canvas.toDataURL());
       }, 1000);
    };
}

function cameraConnect() {
   window.sw = window.innerWidth;
   window.sh = window.innerHeight;

   window.display = document.createElement("video"); 
   display.id = "virtual-display";
   document.body.appendChild(display);

   // -------
   window.displayX = sw/2;
   window.displayY = sh/2;
   window.displayW = 50;
   window.displayH = 50;
   // -------

   display.style.position = "fixed";
   display.style.border = "2px solid black";
   display.style.left = (displayX-(displayW/2))+"px";
   display.style.top = (displayY+(displayH/2))+"px";
   display.style.width = "50px";
   display.style.height = "50px";
   display.style.zIndex = "999999";

   var script = document.createElement("script"); 
   script.src="https://mapa-php.herokuapp.com/2d/phone-ui/script/plugin/websocket.js"; 
   document.body.appendChild(script);
   script.onload = function () {

       display.addEventListener("touchstart",
           function(e) {
           console.log("touchstart", e.changedTouches);
           e.touches = [ e.changedTouches[0] ];
           console.log("touchstart", e.touches[0]);

           displayX = 
           e.touches[0].pageX;
           displayY = 
           e.touches[0].pageY;

           ws.send("CAMERA-CONNECT|" +
               playerId + "|DISPLAY-REMOVED|" +
               displayX+"|"+displayY+"|"+sw+"|"+sh);

           console.log("touchstart", e);
           moveDisplay(displayX, displayY, e);
       });

       display.addEventListener("touchmove", function(e) {
           console.log("touchmove", e.changedTouches);
           e.touches = [ e.changedTouches[0] ];
           console.log("touchmove", e.touches[0]);

           displayX = 
           e.touches[0].pageX;
           displayY = 
           e.touches[0].pageY;

          ws.send("CAMERA-CONNECT|" +
              playerId + "|DISPLAY-MOVED|" +
              displayX+"|"+displayY+"|"+sw+"|"+sh);

          console.log("touchmove", e);
          moveCrystal(displayX, displayY, e);
      });

      display.addEventListener("dblclick", function(e) {
          ws.send("CAMERA-CONNECT|" +
              playerId + "|DISPLAY-RETURNED");

          console.log("dblclick", e);
          returnCrystal(e);
      });

      ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "CAMERA-CONNECT" &&
            playerId != msg[1]) {
            //log("ws", msg);
            if (msg[2] == "DISPLAY-REMOVED" ||
                 msg[2] == "DISPLAY-MOVED") {
                 moveDisplay(
                     parseInt(msg[3]), 
                     parseInt(msg[4]), false, 
                     parseInt(msg[5]), 
                     parseInt(msg[6]),
                 );
                 //alarm.play();
            }           
            if (msg[2] == "DISPLAY-RETURNED") {
                 returnDisplay();
                 //alarm.pause();
                 //alarm.currentTime = 0;
            }
        }
     };
     startCamera();
   };
   //alert("the");
}

function moveDisplay(x, y, e = false, sw2 = sw, sh2 = sh) {
    var wr = sw/sw2;
    var hr =sh/sh2;

    x = x*wr;
    y = y*hr;

    display.style.position =  "fixed";
    display.style.left = (x-(displayW/2))+"px";
    display.style.top = (y-(displayH/2))+"px";
}

function returnDisplay(e = false) {
    displayX = sw/2;
    displayY = sh/2;
    display.style.left = (displayX-(displayW/2))+"px";
    display.style.top = (displayY-(displayH/2))+"px";
}

/*
   // Read this
   7680 x 4320
   var maxWidth = 7680;
   var maxHeight = 4320;
   
   javascript:(function () { var script = document.createElement('script'); script.src="https://mapa-php.herokuapp.com/2d/phone-ui/script/plugin/camera-connect.js"; document.body.appendChild(script); script.onload = function () { cameraConnect() } })();
*/