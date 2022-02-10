<?php include ('../../config/db.php')?>
<?php
$sql ="";
try {
  if (!empty($_POST["playerId"])) {

    $playerId = htmlspecialchars($_POST["playerId"]);
    $latitude = htmlspecialchars($_POST["latitude"]);
    $longitude = htmlspecialchars($_POST["longitude"]);

    $sql = "INSERT INTO extra_audio (playerId,latitude,longitude) VALUES (".$playerId.",'".$latitude."','".$longitude."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else if (!empty($_GET["playerId"])) {

    $playerId = htmlspecialchars($_GET["playerId"]);
    $sql = "SELECT * FROM extra_trajeto WHERE playerId=".$id.";";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 
  
    echo json_encode($details);
  }
  else if (!empty($_GET["deletePlayerId"])) {
    $id = htmlspecialchars($_GET["deleteId"]);
    $sql = "DELETE FROM extra_trajeto WHERE playerId=".$id.";";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
  
    echo $sql;
  }
  else {
    $sql = "SELECT id,playerId,latitude,longitude,data_hora FROM extra_trajeto ORDER BY data_hora DESC;";

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