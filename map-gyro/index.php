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

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<!-- <link rel="stylesheet" href="css/normalizee.css"> -->
<link rel="stylesheet" href="css/style.css?v=31">

<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

<!-- Leaflet JS / CSS -->
<script src="https://unpkg.com/leaflet@1.7/dist/leaflet-src.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7/dist/leaflet.css">

<!-- 
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
-->

<!-- Leaflet-Rotate 
<script src="https://raw.githubusercontent.com/Raruto/leaflet-rotate/master/dist/leaflet-rotate-src.js"></script>
-->

<!-- Leaflet-Rotate -->
<script src="https://unpkg.com/leaflet-rotate@0.1.4/dist/leaflet-rotate-src.js"></script>

<title></title>
</head>
<body>

<div id="rotation">
<!--
<label id="rotateXlabel"
for="rotateX" class="form-label">RotateX: 0</label>
<input type="range" id="rotateX"
min="-180" max="180"  step="1" value="0"
class="form-range" >

<label id="rotateYlabel"
for="rotateY" class="form-label">RotateY: 0</label>
<input id="rotateY"
min="-180" max="180" step="1" value="0"
type="range" 
class="form-range">

<label id="rotateZlabel"
for="rotateZ" class="form-label">RotateZ: 0</label>
<input id="rotateZ"
min="-180" max="180" step="1" value="0"
type="range" 
class="form-range">
-->

<label id="rotate3dlabel"
for="rotate3dX" class="form-label">Rotate3d: 0, 0, 0, 0</label>
<input id="rotate3dX"
min="0" max="1" step="0.1" value="0"
type="range" 
class="form-range">
<input id="rotate3dY"
min="0" max="1" step="0.1" value="0"
type="range" 
class="form-range">
<input id="rotate3dZ"
min="0" max="1" step="0.1" value="0"
type="range" 
class="form-range">
<input id="rotate3d"
min="-180" max="180" step="1" value="0"
type="range" 
class="form-range">

<video style="display:none" id="video" width="100" height="100" autoplay></video>
<canvas width="100" height="100" id="camera-canvas">
</canvas>
<button id="btn-camera" class="btn-camera">
<i class="fa-solid fa-x"></i>
</button>
</div>

<div id="map" class="map-box">
</div>
<canvas style="display:none" id="matter-js"></canvas>

<div id="circle">
     <span id="cp0"></span>
     <span id="cp1"></span>
     <span id="cp2"></span>
     <span id="cp3"></span>
     <span id="pointer"></span>
     <span id="north-indicator-ball"></span>
     <i id="north-indicator"class="fa-solid fa-arrow-up-long"></i>
</div>

<p id="indicators">
<span id="map-angle-indicator"></span>
<br>
<span id="height-indicator"></span>
<br>
<span id="acc-indicator"></span>
</p>

<button id="btn-map" type="button" class="btn-map">
<i class="fa-solid fa-map"></i>
</button>

<button id="btn-north" type="button" class="btn-north">
<i class="fa-solid fa-n"></i>
</button>

<p id="version-info">
     MAP-GYRO v31.0.7.54
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

<script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>

<script src="script/matter.js"></script>

<script src="script/websocket.js?v=0"></script>
<script src="script/map.js?v=7"></script>
<script src="script/map-gyro.js?v=54"></script>

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>

</body>
</html> 