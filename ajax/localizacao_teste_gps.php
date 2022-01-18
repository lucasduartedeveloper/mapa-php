<?php include ('../config/db.php')?>
<?php
$sql ="";
try {
  
  If (!empty($_POST["png"])) {

    $latitude = htmlspecialchars($_POST["lat"]);
    $longitude = htmlspecialchars($_POST["lng"]);

    $sql = "INSERT INTO localizacao_teste_gps (latitude, longitude,base64) VALUES ('".$latitude."','".$longitude."')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
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