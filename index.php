<?php include ('config/db.php')?>
<?php include ('config/config.php')?>
<?php include ('config/txt.php')?>

<?php
try {
  $sql = "SELECT valor FROM param WHERE nome='contador_visitas';";
  //echo $sql;
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $rowCount = $stmt->rowCount();
  $details = $stmt->fetch(); 
  $contar = intval($details->valor)+1;
  
  $sql = "UPDATE param SET valor='".strval($contar)."' WHERE nome='contador_visitas';";
   //echo $sql;
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
}
catch (PDOException $e) {
   echo 'Connection failed: ' . $e->getMessage();
}
?>

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

<link rel="stylesheet" href="/css/style.css?v=89">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<title></title>
</head>
<body>

<div id="map" class="box">
</div>
<div id="box2" class="box2">
    <p id="nome" class="local">NOU GPS</p>
    <div id="teste1" class="btn-group btn-group-toggle" data-toggle="buttons">
    </div>
    <div id="teste2" class="btn-group btn-group-toggle" data-toggle="buttons">
    </div>
    <div id="teste3" class="btn-group btn-group-toggle" data-toggle="buttons">
    </div>
    <div id="teste4" class="btn-group btn-group-toggle" data-toggle="buttons">
    </div>
    <div>
    <input id="camera" style="display: none;" type="file" accept="*/image" onchange="saveImage()" capture="camera">
    <button hidden id="add" class="btn btn-outline-dark btn-sm">
        <i class="bi bi-camera-fill"></i>
    </button>
    </div>
    <p id="horas"></p>
    <button hidden id="target" type="button" class="btn btn-outline-dark btn-sm">
    <i class="bi bi-geo-alt"></i>
    Mudar
    </button>
</div>

<div id="box3" class="box3">
   <p></p>
    <img class="logo" src="/img/logo.png"/>
    <p class="contador"><?=$contar?> visitas</p>
    <div class="info-box">
    <p id="local-info" class="info">geolocation: 
        <i class="bi bi-check-square-fill"></i></p>
    <p id="motion-info" class="info">devicemotion: 
        <i class="bi bi-check-square"></i></p>
    <p id="light-info" class="info">ambientlight: 
        <i class="bi bi-check-square"></i></p>
     </div>
</div>

<div id="box4" class="box3">
    <p class="contador">NOU v89.133.195</p>
    <img id="front" class="front" src="/img/v1/blinking.gif"/>
    <div class="typing-wrapper"></div>
</div>

<img id="coin" class="coin" src="/img/coin.gif"/>

<img id="menu" class="my-float" src="/img/parafuso.png"/>
<!-- 
<i id="menu" class="bi bi-arrow-down-circle my-float"></i>
 -->

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"></script>

<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

<script src="/script.js?v=133"></script>
<script src="/geolocation.js?v195"></script> 

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>

</body>
</html> 