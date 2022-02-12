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

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<link rel="stylesheet" href="/extra/css/style.css?v=73">

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<title></title>
</head>
<body>

<div id="map" class="map-box">
</div>

<div id="loading">
    <p>
    LOADING...
    </p>
</div>

<p id="owner-info" class="owner-info">
     LOST RPG
</p>

<p id="audio-info"  style="display:none;" class="audio-info">
     Lembrete - 07/02/2022 13:45:00
</p>
<div id="audio-wave" style="display:none;" class="audio-wave-box">
     <canvas id="wave" class="audio-wave-canvas"></canvas>
</div>

<button id="mic" type="button" class="btn-mic float-center">
      <i class="bi bi-mic-mute-fill"></i>
</button>

<button id="reload" type="button" class="btn-reload float-right active">
      <i class="bi bi-joystick"></i>
</button>

<button id="player" type="button" class="btn-player float-top-right">
      <i class="bi bi-people-fill"></i>
</button>

<button id="delete" type="button" class="btn-delete float-top2-right">
      <i class="bi bi-scissors"></i>
</button>

<button id="camera" type="button" class="btn-camera float-top3-right" data-toggle="modal" data-target="#cameraModal">
      <i class="bi bi-camera-reels-fill"></i>
</button>

<button id="anotacoes" type="button" class="btn-anotacoes float-top4" data-toggle="modal" data-target="#anotacoesModal">
      <i class="bi bi-card-checklist"></i>
</button>

<img id="update" class="icone-v3" src="/extra/icone-v2.png"/>
<p id="version-info" class="version-info">
     LOST RPG<br>
     v73.1.1.345
</p>

<button id="left" type="button" class="btn-left">
      <i class="bi bi-arrow-left"></i>
</button>

<button id="up" type="button" class="btn-up">
      <i class="bi bi-arrow-up"></i>
</button>

<button id="right" type="button" class="btn-right">
      <i class="bi bi-arrow-right"></i>
</button>

<button id="down" type="button" class="btn-down">
      <i class="bi bi-arrow-down"></i>
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

<script src="/extra/script/websocket.js?v=1"></script>

<script src="/extra/script/login.js?v=1"></script> 
<script src="/extra/script/map.js?v=345"></script> 

<!-- Modal -->
<div style="z-index: 10001" class="modal fade" id="cameraModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-body">
           <video style="display:none" id="video" width="240" height="240" autoplay></video>
           <canvas width="244" height="244" id="camera-canvas"></canvas>
       </div>
  </div>
</div>

<!-- Modal -->
<div style="z-index: 10001; font-size: 20px" class="modal fade" id="anotacoesModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
         ANOTAÇÕES:
         <br><br>- [concluído] Incluir o nível do inimigo sendo a duração do áudio;
         <br>- Corrigir as informações na visualização da câmera;
         <br>- 
      </div>
    </div>
  </div>
</div>

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>

</body>
</html> 