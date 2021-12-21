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

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
<link rel="stylesheet" href="https://viajem.herokuapp.com/css/style.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title></title>

 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<script>
// Set the date we're counting down to
var countDownDate = new Date("Dec 23, 2021 20:55:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the resultghp
  document.getElementById("dias").innerHTML = days + "dias " + hours + "h "
  + minutes + "m " + seconds + "s ";

  document.getElementById("horas").innerHTML = (days * 24) + hours + "h "
  + minutes + "m " + seconds + "s ";

  document.getElementById("minutos").innerHTML = (((days * 24) + hours) * 60)
 + minutes + "m " + seconds + "s ";

  document.getElementById("segundos").innerHTML = (((((days * 24) + hours) * 60) + minutes) * 60) + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("dias").innerHTML = "EXPIRED";
    document.getElementById("horas").innerHTML = "EXPIRED";
    document.getElementById("minutos").innerHTML = "EXPIRED";
    document.getElementById("segundos").innerHTML = "EXPIRED";
  }
}, 1000);
</script>
</head>
<body>

<div id="map" class="box">
   <p class="contador"><?=$contar?> visitas</p>
    <p id="dias"></p>
    <p id="horas"></p>
    <p id="minutos"></p>
    <p id="segundos"></p>
    <p id="demo"></p>
    <button id="target" type="button" class="btn btn-outline-dark">
    <i class="bi bi-unlock-fill"></i>
    Abrir
    </button>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>

<script src="https://viajem.herokuapp.com/script.js"></script>
<script src="https://viajem.herokuapp.com/geolocation.js"></script>

<script>
// Create the map
var map = L.map('mp').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVjYXNkdWFydGUxOTkyIiwiYSI6ImNreGZieWE3ODFwNTQyb3N0cW4zNHMxMG8ifQ.HXS54wWrm6wPz-29LVVRbg'
}).addTo(map);
</script/>

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>

</body>
</html>