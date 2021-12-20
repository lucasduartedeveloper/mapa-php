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

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "dias " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

$(document).ready(function(){
  $( "#target" ).click(function() {
    alert( "Handler for .click() called." );
  });
);
</script>

<link rel="stylesheet" href="https://viajem.herokuapp.com/css/style.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title></title>
</head>
<body>

<div class="box">
   <p class="contador"><?=$contar?> visitas</p>
    <p id="demo"></p>
    <button id="target" type="button" class="btn btn-outline-dark">
    <i class="bi bi-unlock-fill"></i>
    Abrir
    </button>
</div>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

</body>
</html>