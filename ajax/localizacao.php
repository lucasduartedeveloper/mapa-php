<?php include ('../config/db.php')?>
<?php
try {
  
  If (!empty($_GET["lat"])) {

    $latitude = htmlspecialchars($_GET["lat"]);
    $longitude = htmlspecialchars($_GET["long"]);
    $sql = "INSERT INTO localizacao(latitude,longitude) VALUES ('".$latitude."','".$longitude."');";
     //echo $sql."<br>";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

  }

  $sql = "SELECT latitude,longitude,data_hora FROM localizacao ORDER BY id DESC LIMIT 1;";
  //echo $sql."<br>";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $rowCount = $stmt->rowCount();
  $details = $stmt->fetch(); 
  
  echo json_encode($details);
}
catch (PDOException $e) {
   echo 'Connection failed: ' . $e->getMessage();
}
?>