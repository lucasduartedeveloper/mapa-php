<!DOCTYPE html>
<html>
<head>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">

<link rel="apple-touch-icon" sizes="76x76" href="/webapp/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/webapp/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/webapp/favicon-16x16.png">
<link rel="manifest" href="/webapp/site.webmanifest?v=0">
<link rel="mask-icon" href="/webapp/safari-pinned-tab.svg" color="#2f2e40">
<meta name="msapplication-TileColor" content="#2f2e40">
<meta name="theme-color" content="#2f2e40">

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>

<link rel="stylesheet" href="/extra/css/style.css?v=14">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<title></title>
</head>
<body>

<div id="map" class="map-box">
</div>

<p id="audio-info" class="audio-info">
     Lembrete - 07/02/2022 13:45:00
</p>
<div id="audio-wave" class="audio-wave-box">
     <canvas id="wave" class="audio-wave-canvas"></canvas>
</div>

<button id="mic" type="button" class="btn-mic float-center">
      <i class="bi bi-mic-mute-fill"></i>
</button>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"></script>

<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

<script type="text/javascript"
        src="https://cdn.jsdelivr.net/gh/hosuaby/Leaflet.SmoothMarkerBouncing@v2.0.0/dist/bundle.js"
        crossorigin="anonymous"></script>

<script src="https://momentjs.com/downloads/moment.min.js"></script>

<script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>

<script src="/extra/script/websocket.js?v=0"></script>
<script src="/extra/script/script.js?v=0"></script>
<script src="/extra/script/map.js?v=88"></script> 

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>

</body>
</html> 