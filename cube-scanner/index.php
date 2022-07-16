<!DOCTYPE html>
<html>
<head>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">

<link rel="apple-touch-icon" sizes="76x76" href="webapp/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="webapp/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="webapp/favicon-16x16.png">
<link rel="manifest" href="webapp/site.webmanifest?v=0">
<link rel="mask-icon" href="webapp/safari-pinned-tab.svg" color="#2f2e40">
<meta name="msapplication-TileColor" content="#2f2e40">
<meta name="theme-color" content="#2f2e40">

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<!-- <link rel="stylesheet" href="css/normalizee.css"> -->
<link rel="stylesheet" 
         href="css/style.css?v=72">
<link rel="stylesheet" 
         href="css/anim/loading.css?v=22">

<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<title></title>
</head>
<body>

<canvas id="interface" style="display:none">
</canvas>

<div id="authentication">
      <p id="auth-header">
           LOGIN
           <span>    
           <i id="cube-icon" class="fa-solid fa-cube"></i>
           <i id="globe-icon"
           onclick=
          "location.replace('/sphere-scanner/')"
           class="fa-solid fa-globe"></i>
           </span>
      </p>
      <p id="auth-footer">
           xxxxxx
      </p>
</div>

<i id="add" class="fa-solid fa-circle-plus"></i>
<i id="delete" class="fa-solid fa-circle-xmark"></i>
<i id="previous" class="fa-solid fa-caret-left"></i>
<i id="next" class="fa-solid fa-caret-right"></i>
<span id="cube-id"></span>
<span id="record-no"></span>
<i id="print" class="fa-solid fa-print"></i>
<i id="eraser" class="fa-solid fa-eraser"></i>
<i id="mic" class="fa-solid fa-microphone-slash place"></i>

<div id="cube-container">
      <div id="loading" onclick="eruda.init();">
          <div class="sperm-orbit"></div>

          <div class="sperm-front"></div>
          <div class="sperm-back"></div>
          <div class="sperm-left"></div>
          <div class="sperm-top"></div>
          <div class="sperm-right"></div>
          <div class="sperm-bottom"></div>

          <div class="front"></div>
          <div class="back"></div>
          <div class="left"></div>
          <div class="top"></div>
          <div class="right"></div>
          <div class="bottom"></div>
      </div>

      <img src="img/front.png" class="front"/> 
      <img src="img/back.png" class="back"/>
      <img src="img/left.png" class="left"/>
      <img src="img/top.png" class="top"/>
      <img src="img/right.png" class="right"/>
      <img src="img/bottom.png" class="bottom"/>
      <img src="img/inside.jpg" class="inside"/>
</div>

<p id="title">
     <span id="name">CUBE SCANNER</span>
     <input style="display:none" type="file" id="file-upload" name="UploadFiles">
     <i id="upload" class="fa-solid fa-cloud-arrow-up"></i>
     <i id="rotate-camera" class="fa-solid fa-rotate"></i>
</p>

<video style="display:none" id="video" width="128" height="128" autoplay></video>
<canvas width="128" height="128" id="camera-canvas"></canvas>

<input id="translateY"
min="0" max="100" step="1" value="100"
type="range" 
class="form-range">

<div id="rotation">
<label id="rotation-label"
for="rotateX" class="form-label">Rotation X: 0, Y: 0, Z: 0</label><br>
<input id="rotateX"
min="-180" max="180" step="1" value="0"
type="range" 
class="form-range"><br>
<input id="rotateY"
min="-180" max="180" step="1" value="0"
type="range" 
class="form-range"><br>
<input id="rotateZ"
min="-180" max="180" step="1" value="0"
type="range" 
class="form-range">
</div>

<div id="dropdown" style="display:none"
     class="dropdown">
     <button class="btn btn-secondary dropdown-toggle" type="button" id="cube-face" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Front
     </button>
     <div id="face-menu" class="dropdown-menu" 
     aria-labelledby="dropdownMenuButton">
           <a class="dropdown-item" href="#" onclick="setFace(0);">Front</a>
           <a class="dropdown-item" href="#" onclick="setFace(1);">Back</a>
           <a class="dropdown-item" href="#" onclick="setFace(2);">Left</a>
           <a class="dropdown-item" href="#" onclick="setFace(3);">Top</a>
           <a class="dropdown-item" href="#" onclick="setFace(4);">Right</a>
           <a class="dropdown-item" href="#" onclick="setFace(5);">Bottom</a>
           <a class="dropdown-item" href="#" onclick="setFace(6);">Cube</a>
           <a class="dropdown-item" href="#" onclick="setFace(-1);">Inside</a>
     </div>
</div>

<p id="version-info">
     CUBE SCANNER v72.14-30.2.318
     <br>
     <span id="server-info">
     CONNECTING...
     </span>
     <i id="heroku" style="display:none" class="fa-solid fa-location-crosshairs"></i>
     <i id="motion" 
     class="fa-solid fa-whiskey-glass place"></i>
     <i  id="key"  
     class="fa-solid fa-key place"></i>
     <i id="light-switch"
     class="fa-solid fa-lightbulb place"></i>
     <i id="socks" 
     class="fa-solid fa-socks place"></i>
</p>

<div id="cube-modal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="cube-modal-title" 
        class="modal-title">NEW CUBE</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>
        <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
        </div>
        <input id="input-name" type="text" class="form-control" aria-label="Name" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Size (cm)</span>
        </div>
        <input id="input-size" type="text" class="form-control" aria-label="Size" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Weight (kg)</span>
        </div>
        <input id="input-weight" type="text" class="form-control" aria-label="Weight" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Latitude</span>
        </div>
        <input id="input-lat" type="text" class="form-control" aria-label="Weight" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Longitude</span>
        </div>
        <input id="input-lng" type="text" class="form-control" aria-label="Weight" aria-describedby="inputGroup-sizing-sm">
        </div>
        <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Angle to North</span>
        </div>
        <input id="input-angle" type="text" class="form-control" aria-label="Weight" aria-describedby="inputGroup-sizing-sm">
        </div>
        </p>
      </div>
      <div class="modal-footer">
        <span id="modal-footer-left">
            <i id="get-location"
            class="fa-solid fa-location-dot"></i>
            <i id="map"
            class="fa-regular fa-map"></i>
        </span>
        <button id="save" type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"></script>

<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

<script type="text/javascript"
        src="https://cdn.jsdelivr.net/gh/hosuaby/Leaflet.SmoothMarkerBouncing@v2.0.0/dist/bundle.js"
        crossorigin="anonymous"></script>

<script src="https://momentjs.com/downloads/moment.min.js"></script>

<script src="https://kit.fontawesome.com/147bb12bad.js" crossorigin="anonymous"></script>

<script src="script/debug.js?v=0"></script>
<script src="script/gyro.js?v=6"></script>

<script src="script/image-collision.js?v=0"></script>
<script src="script/authentication.js?v=21"></script>
<script src="script/websocket.js?v=4"></script>

<script src="script/cube-shadow.js?v=30"></script>
<script src="script/image-upload.js?v=2"></script>
<script src="script/cube-scanner.js?v=318"></script>

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
</body>
</html> 