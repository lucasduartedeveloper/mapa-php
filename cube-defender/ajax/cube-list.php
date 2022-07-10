<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["cameraId"])  ) {

    $cameraId = htmlspecialchars($_POST["cameraId"]);
    $base64 = htmlspecialchars($_POST["base64"]);

    $sql =  "INSERT INTO camera_frame (camera_id,base64) VALUES (".$cameraId.",'".$base64."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else if (isset($_GET["cameraId"])) {

    $cameraId = htmlspecialchars($_GET["cameraId"]);
    $sql = "SELECT a.*, b.nome FROM camera_frame a LEFT JOIN cube_info b ON a.camera_id = b.id WHERE a.camera_id=".$cameraId." ORDER BY a.data_hora DESC LIMIT 1";

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