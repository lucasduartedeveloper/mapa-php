<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["cubeId"])) {

    $cubeId = htmlspecialchars($_POST["cubeId"]);
    $sideId = htmlspecialchars($_POST["sideId"]);
    $base64 = htmlspecialchars($_POST["base64"]);

    $sql =  "INSERT INTO camera_frame (cube_id,cube_side,base64) VALUES (".$cubeId.",'".$sideId.",".$base64."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else if (isset($_GET["cubeId"])) {

    $cubeId = htmlspecialchars($_GET["cubeId"]);
    $sql = "SELECT * FROM cube_side WHERE cube_id=".$cubeId." ORDER BY data_hora DESC LIMIT 1;";

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