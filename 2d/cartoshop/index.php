<!-- PHP: Random number for cache ignore -->
<?php
$rnd = 
    str_pad(
    strval(rand(0,999999)), 
    6, "0", STR_PAD_LEFT);
$style = [
    0 => "index.css"
];
$script = [
    0 => "thirdpart/poly-decomp.js",
    1 => "thirdpart/matter.js",
    2 => "debug.js",
    3 => "camera-helper.js",
    4 => "color-helper.js",
    5 => "gyro-helper.js",
    6 => "image-helper.js",
    7 => "polygon-helper.js",
    8 => "json-helper.js",
    9 => "controls.js",
    10 => "2d-objects.js",
    11 => "app.js"
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
<link rel="mask-icon" href="webapp/safari-pinned-tab.svg" color="#2f2e40">
<meta name="msapplication-TileColor" content="#2f2e40">
<meta name="theme-color" content="#2f2e40">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

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

<!--
<iframe style="display:none" id="iframe" src="">
</iframe>
-->

<video style="display:none" id="videoStream" width="128" height="128" autoplay></video>

<video style="display:none" id="video" width="128" height="128" autoplay></video>
<canvas width="128" height="128" id="camera-canvas"></canvas>

<span id="controls">
<i id="run-test" class="fa-solid fa-play"></i>
<i id="power" class="fa-solid fa-power-off"></i>
<i id="borders" class="fa-solid fa-border-all"></i>
<i id="cut" class="fa-solid fa-scissors"></i>
<i id="key" class="fa-solid fa-key"></i>
</span>

<input style="display:none" type="file" id="file-upload" name="UploadFiles">

<canvas id="matter-js"></canvas>
<span id="hab">0 squares</span>

<p id="version-info">
     <span>
     LONDRINA 2D v0
     </span>
     <br>
     <span id="server-info">
     CONNECTING...
     </span>
</p>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="https://momentjs.com/downloads/moment.min.js"></script>

<script src="https://kit.fontawesome.com/147bb12bad.js" crossorigin="anonymous"></script>

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