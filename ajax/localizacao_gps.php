<?php include ('../config/db.php')?>
<?php
$sql ="";
try {
  
  if (!empty($_GET["delete"])) {

    $sql = "DELETE FROM localizacao_gps;";
    //echo $sql."<br>";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

  }
  else if (!empty($_GET["select"])) {

    $sql = "SELECT cor, count(*) as quantidade
FROM localizacao_gps
GROUP BY cor;";
    //echo $sql."<br>";else {

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 
  
    echo json_encode($details);

  }
  else if (!empty($_POST["lat"])) {
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
    else { echo $_POST["lat"]." / ".$_POST["lng"]; }
  }
  else {

    $sql = "SELECT * FROM localizacao_gps ORDER BY data_hora DESC;";
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