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
<link rel="stylesheet" href="css/style.css?v=31">

<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<title></title>
</head>
<body>

<div id="cube-container">
      <img src="img/front.png" class="front"/> 
      <img src="img/back.png" class="back"/>
      <img src="img/left.png" class="left"/>
      <img src="img/top.png" class="top"/>
      <img src="img/right.png" class="right"/>
      <img src="img/bottom.png" class="bottom"/>
</div>

<p id="title">
     CUBE DEFENDER
     <input style="display:none" type="file" id="file-upload" name="UploadFiles">
     <i id="upload" class="fa-solid fa-cloud-arrow-up"></i>
</p>

<video style="display:none" id="video" width="128" height="128" autoplay></video>
<canvas width="128" height="128" id="camera-canvas"></canvas>

<input id="opacity"
min="-180" max="180" step="1" value="0"
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

<div id="dropdown" class="dropdown">
     <button class="btn btn-secondary dropdown-toggle" type="button" id="side" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Front
     </button>
     <div id="side-menu" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
           <a class="dropdown-item" href="#" onclick="setSide(0);">Front</a>
           <a class="dropdown-item" href="#" onclick="setSide(1);">Back</a>
           <a class="dropdown-item" href="#" onclick="setSide(2);">Left</a>
           <a class="dropdown-item" href="#" onclick="setSide(3);">Top</a>
           <a class="dropdown-item" href="#" onclick="setSide(4);">Right</a>
           <a class="dropdown-item" href="#" onclick="setSide(5);">Bottom</a>
     </div>
</div>

<p id="version-info">
     CUBE DEFENDER v31.0.3.2.55
     <br>
     <span id="server-info">
     CONNECTING...
     </span>
</p>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"></script>

<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

<script type="text/javascript"
        src="https://cdn.jsdelivr.net/gh/hosuaby/Leaflet.SmoothMarkerBouncing@v2.0.0/dist/bundle.js"
        crossorigin="anonymous"></script>

<script src="https://momentjs.com/downloads/moment.min.js"></script>

<script src="https://kit.fontawesome.com/147bb12bad.js" crossorigin="anonymous"></script>

<script src="script/gyro.js?v=0"></script>
<script src="script/websocket.js?v=3"></script>
<script src="script/image-upload.js?v=2"></script>
<script src="script/cube-defender.js?v=55"></script>

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>

</body>
</html> 