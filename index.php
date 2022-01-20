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

<link rel="manifest" href="manifest.json">

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>

<link rel="stylesheet" href="/css/style.css?v=36">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<title></title>
</head>
<body>

<div id="map" class="box">
</div>
<div class="box2">
    <p id="nome" class="local">TESTE GPS</p>
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
    <p class="contador"><?=$contar?> visitas</p>
    <p id="horas"></p>
    <button hidden id="target" type="button" class="btn btn-outline-dark btn-sm">
    <i class="bi bi-geo-alt"></i>
    Mudar
    </button>
</div>

<div class="box3">
   <p></p>
</div>

<img id="coin" class="coin" src="/img/coin.gif"/>

<i id="menu" class="bi bi-arrow-down-circle my-float"></i>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"></script>

<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

<script src="/script.js?v=127"></script>
<script src="/geolocation.js?v157"></script> 

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>

</body>
</html> 