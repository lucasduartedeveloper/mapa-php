<?php include ('../config/db.php')?>
<?php
$sql ="";
try {
  
  if (!empty($_POST["lat"])) {

    $latitude = htmlspecialchars($_POST["lat"]);
    $longitude = htmlspecialchars($_POST["lng"]);

     $sql = "SELECT * FROM localizacao_gps WHERE latitude='".$latitude."' AND longitude='".$longitude."' ORDER BY id;";
    echo $sql."<br>";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 

    echo json_encode($details);

    $sql = "INSERT INTO localizacao_gps (latitude, longitude) VALUES ('".$latitude."','".$longitude."')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else {

    $sql = "SELECT * FROM localizacao_gps ORDER BY id;";
    //echo $sql."<br>";else {

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 
  
    echo json_encode($details);

  }
}
catch (PDOException $e) {
   echo 'Connection failed: ' . $e->getMessage();
   echo $sql;
}
catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
    echo $sql;
}
?>