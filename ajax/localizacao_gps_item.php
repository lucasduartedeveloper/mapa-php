<?php include ('../config/db.php')?>
<?php
$sql ="";
try {
 
  if (!empty($_POST["lat"])) {
    if (!empty($_POST["cor"])) {

    $latitude = htmlspecialchars($_POST["lat"]);
    $longitude = htmlspecialchars($_POST["lng"]);
    $cor = htmlspecialchars($_POST["cor"]);

     $sql = "DELETE FROM localizacao_gps WHERE latitude='".$latitude."' AND longitude='".$longitude."';";
    //echo $sql."<br>";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $sql = "INSERT INTO localizacao_gps (cor, latitude, longitude) VALUES ('".$cor."','".$latitude."','".$longitude."')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;

    }
  }
  else {

    $sql = "SELECT * FROM localizacao_gps_item ORDER BY data_hora DESC;";
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