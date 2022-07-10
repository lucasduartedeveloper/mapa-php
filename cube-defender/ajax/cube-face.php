<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["cubeId"])) {

    $cubeId = htmlspecialchars($_POST["cubeId"]);
    $faceId = htmlspecialchars($_POST["faceId"]);
    $base64 = htmlspecialchars($_POST["base64"]);

    $sql =  "DELETE FROM cube_face WHERE cube_id=".$cubeId." AND face_id=".$faceId.";";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;

    $sql =  "INSERT INTO cube_face (cube_id,face_id,base64) VALUES (".$cubeId.",".$faceId.",'".$base64."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else if (isset($_GET["cubeId"])) {

    $cubeId = htmlspecialchars($_GET["cubeId"]);
    $sql = "SELECT * FROM cube_face WHERE cube_id=".$cubeId." ORDER BY data_hora DESC;";

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