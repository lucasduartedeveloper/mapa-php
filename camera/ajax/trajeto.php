<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["playerId"])  ) {

    $playerId = htmlspecialchars($_POST["playerId"]);
    $latitude = htmlspecialchars($_POST["latitude"]);
    $longitude = htmlspecialchars($_POST["longitude"]);

    $sql = "INSERT INTO extra_trajeto (playerId,latitude,longitude) VALUES (".$playerId.",'".$latitude."','".$longitude."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else if (isset($_GET["playerId"])) {

    $playerId = htmlspecialchars($_GET["playerId"]);
    $sql = "SELECT * FROM extra_trajeto WHERE playerId=".$id.";";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 
  
    echo json_encode($details);
  }
  else if (isset($_GET["deletePlayerId"])) {
    $playerId = htmlspecialchars($_GET["deletePlayerId"]);
    $sql = "DELETE FROM extra_trajeto WHERE playerId=".$playerId.";";

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