<!DOCTYPE html>
<html>
     <head>
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
     <title>v0</title>
     <style>
         html, body {
                font-size: 30px;
                text-align: center;
                width: 100%;
                height: 100%;
         }
         img {
               max-width: 40%;
         }
     </style>
     <script>
          var updated = 0;
          setInterval(function() {
                updated += 1;
                document
                .getElementById("update-test")
                .innerText = updated;

               // Create an XMLHttpRequest object
               var xhttp = new XMLHttpRequest();

               // Define a callback function
               xhttp.onload = function() {
                    var data = JSON.parse(this.responseText);
                    for (var k = 0; k < data.length; k++) {
                         document
                         .getElementById("camera"+k+"-data")
                         .src = data[k].base64;
                   }
               }

                // Send a request
                xhttp.open("GET", 
               "/camera/ajax/camera.php");
                xhttp.send();
          }, 1000);
     </script>
     <!-- <script src="websocket.js?v=2"></script> -->
     </head>
     <body>
         <p id="update-test">0</p>

         <img width=400 height=400 id="camera0-data" />
         <img width=400 height=400 id="camera1-data" />
         <img width=400 height=400 id="camera2-data" />
         <img width=400 height=400 id="camera3-data" />

         <p id="server-info">CONNECTING...</p>
   
         <script src="//cdn.jsdelivr.net/npm/eruda"></script>
         <script>eruda.init();</script>
     </body>
</html>