<!DOCTYPE html>
<html>
     <head>
     <title>v0</title>
     <style>
         html, body {
                font-size: 30px;
                text-align: center;
                width: 100%;
                height: 100%;
         }
     </style>
     <script>
          var updated = 0;
          setInterval(function() {
                updated += 1;
                updateTest.innerText = updated;
          }, 250);
     </script>
     <script src="websocket.js" />
     </head>
     <body>
         <p id="update-est">0</p>
         <p id="server-info">CONNECTING...</p>
     </body>
</html>