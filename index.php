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

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>

<link rel="stylesheet" href="/css/style.css?v=8">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<title></title>
</head>
<body>

<div id="map" class="box">
</div>
<div class="box2">
    <p class="local">DESMORTAL KOMBAT</p>
    <div id="teste" class="btn-group btn-group-toggle" data-toggle="buttons">
    <label class="btn btn-outline-dark btn-sm">
    <input type="radio" name="monster" id="monster1" autocomplete="off">
     <img class="icone" src="/img/monster1.png"/>
    </label>
    <label class="btn btn-outline-dark btn-sm active">
    <input type="radio" name="monster" id="monster2" autocomplete="off">
      <img class="icone" src="/img/monster2.png"/>
     </label>
     <label class="btn btn-outline-dark btn-sm">
    <input type="radio" name="monster" id="monster3" autocomplete="off">
     <img class="icone" src="/img/monster3.png"/>
    </label>
     <label class="btn btn-outline-dark btn-sm">
    <input type="radio" name="monster" id="monster4" autocomplete="off">
     <img class="icone" src="/img/monster4.png"/>
    </label>
    </div>
    <p class="contador"><?=$contar?> visitas</p>
    <p hidden id="dias"></p>
    <p id="horas"></p>
    <p hidden id="minutos"></p>
    <p hidden id="segundos"></p>
    <button id="target" type="button" class="btn btn-outline-dark btn-sm">
    <i class="bi bi-geo-alt"></i>
    Mudar
    </button>
</div>

<i id="menu" class="bi bi-arrow-down-circle my-float"></i>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="/script.js?v=63"></script>
<script src="/geolocation.js?v=42"></script> 

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>

</body>
</html>