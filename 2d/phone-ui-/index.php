<!-- PHP: Random number for cache ignore -->
<?php
$rnd = 
    str_pad(
    strval(rand(0,999999)), 
    6, "0", STR_PAD_LEFT);
$style = [
    0 => "phone-ui.css"
];
$script = [
    0 => "thirdpart/poly-decomp.js",
    1 => "thirdpart/matter.js",
    2 => "debug.js",
    3 => "heroku.js",
    4 => "websocket.js",
    5 => "http-helper.js",
    6 => "video-helper.js",
    7 => "audio-helper.js",
    8 => "camera-helper.js",
    9 => "image-helper.js",
    10 => "color-helper.js",
    11 => "gyro-helper.js",
    12 => "json-helper.js",
    13 => "controls.js",
    //12 => "2d-objects.js",
    14 => "phone-ui.js"
];
echo "<!-- ".$rnd." -->";
?>
<!-- PHP -->

<!DOCTYPE html>
<html>
<head>

<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&family=Roboto+Slab:wght@200&display=swap" rel="stylesheet">

<link rel="apple-touch-icon" sizes="76x76" href="webapp/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="webapp/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="webapp/favicon-16x16.png">
<link rel="manifest" href="webapp/site.webmanifest?v=0">
<link rel="mask-icon" href="webapp/safari-pinned-tab.svg" color="#343434">
<meta name="msapplication-TileColor" content="#343434">
<meta name="theme-color" content="#343434">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<!-- load css -->
<link href="https://vjs.zencdn.net/7.20.1/video-js.css" rel="stylesheet" />

<link rel="stylesheet" href="//unpkg.com/videojs-wavesurfer/dist/css/videojs.wavesurfer.min.css">

<!-- PHP: Inject style files -->
<?php
foreach ($style as $a) {
   echo 
   "<link rel=\"stylesheet\" href=\"css/".
   $a."?v=".$rnd."\">";
}
echo "\n";
?>
<!-- PHP -->

<title></title>
</head>
<body>

<div id="app">
<div id="call-layer" style="display:none">
    <img id="broadcaster-avatar" class="lds-circle" src=""/>
    <span id="broadcaster-waiting-username"></span>
    <span id="time-waiting">00:00:00</span>
    <span class="controls">
        <i id="answer-phone" class="fa-solid fa-phone"></i>
    </span>
</div>

<div id="video-layer" style="display:none">
<span id="broadcaster-username"></span>
<span id="time-streaming">00:00:00</span>
<iframe id="temporary-workaround"></iframe>

<div id="video-stream-container">
     <!--
     <video id="video-stream" class="video-stream"
     style="display:none" width="100" height="100"
     autoplay></video> -->
</div>

<video id="video-js" style="display:none" 
width="100" height="100" class="video-js vjs-default-skin" 
controls autoplay>
   <source
     src="https://example.com/index.m3u8"
     type="application/x-mpegURL">
</video>

<span class="controls">
<i id="reload" class="fa-solid fa-arrows-rotate"></i>
<i id="minimize" class="fa-solid fa-minimize"></i>
<i id="like" class="fa-solid fa-heart"></i>
<i id="toggle-video" class="fa-solid fa-video"></i>
<i id="hang-phone" class="fa-solid fa-phone-slash"></i>
<i id="toggle-controls" class="fa-solid fa-gamepad"></i>
</span>
<span>
<i class="fa-solid fa-comment-dots"></i>
<input type="" 
<span id="broadcaster-msg">
</span>
</span>
<input type="text" class="form-control" placeholder="Username" aria-label="Username">
</div>
</div>

<div id="number">
</div>

<div id="online-count">
0/0 online <!-- <i class="fa-solid fa-circle"></i> -->
</div>

<div id="numbers">
<button value="7">7<span>UVW</span></button>
<button value="8">8<span>XYZ</span></button>
<button value="9">9<span>B</span></button>
<button value="4">4<span>LMN</span></button>
<button value="5">5<span>OPQ</span></button>
<button value="6">6<span>RST</span></button>
<button value="1">1<span>DEF</span></button>
<button value="2">2<span>GHI</span></button>
<button value="3">3<span>FJK</span></button>
<button value="*">*<span></span></button>
<button value="0">0<span>+</span></button>
<button value="#">#<span></span></button>
<!-- 
<i id="phone" class="fa-solid fa-phone"></i>
<img style="display: none" id="money" src="img/money.jpeg" />
<img style="display: none" id="ball" src="img/ball.png" />
<img style="display: none" id="pointer" src="img/pointer.png" /> 
-->
<img id="pointer" src="img/diamond.gif" />
</div>

<!-- 
<canvas id="mini-skate">
</canvas> -->

<p id="version-info">
     <span id="auto">AUTO: OFF</span>
     <br>
     <span id="counter">0</span>
     <br>
     <span>
     PHONE UI 
     <span id="heroku-version">v0</span>
     </span>
     <br>
     <span id="server-info">
     CONNECTING...
     </span>
</p>

<!-- Modal HTML embedded directly into document -->
<div id="contact-list-modal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5  class="modal-title"><b>CONTACT LIST</b></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <button id="all-filter" type="button"  
            onclick="filterList('all')"
            class="btn btn-secondary btn-sm">
            All <span id="all-count" 
            class="badge badge-light">9</span>
            <span class="sr-only">unread messages</span>
        </button>
         <button id="cb-filter" type="button" 
            onclick="filterList('cb')"
            class="btn btn-light btn-sm">
            Cb <span id="cb-count" 
            class="badge badge-light">9</span>
            <span class="sr-only">unread messages</span>
        </button>
        <button id="tw-filter" type="button" 
            onclick="filterList('tw')"
            class="btn btn-light btn-sm">
            Twitch <span id="tw-count" 
            class="badge badge-light">9</span>
            <span class="sr-only">unread messages</span>
        </button>
        <button id="tv-filter" type="button" 
            onclick="filterList('tv')"
            class="btn btn-light btn-sm">
            Tv <span id="tv-count" 
            class="badge badge-light">9</span>
            <span class="sr-only">unread messages</span>
        </button>
        <p id="contact-list">
        </p>
      </div>
      <div class="modal-footer">
        <span id="modal-bottom-left">
        <i id="refresh" class="fa-solid fa-arrows-rotate"></i>
        </span>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</div>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"></script>

<script src="https://momentjs.com/downloads/moment.min.js"></script>

<script src="https://kit.fontawesome.com/147bb12bad.js" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>

<!-- load script -->
<script src="https://vjs.zencdn.net/7.20.1/video.min.js"></script>
<script src="https://unpkg.com/wavesurfer.js"></script>
<script src="//unpkg.com/videojs-wavesurfer/dist/videojs.wavesurfer.min.js"></script>

<!-- PHP: Inject script files -->
<?php
foreach ($script as $a) {
   echo 
   "<script src=\"script/".
   $a."?v=".$rnd."\"></script>";
}
echo "\n";
?>
<!-- PHP -->

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>
    eruda.init();

    if (location.protocol !== "https:") {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
</script>
</body>
</html> 