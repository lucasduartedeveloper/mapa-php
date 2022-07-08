<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["cameraId"])  ) {

    $cameraId = htmlspecialchars($_POST["cameraId"]);
    $base64 = htmlspecialchars($_POST["base64"]);

    /*
    $sql = "DELETE FROM camera_frame 
WHERE data_hora < (now() - '2 hours 40 minutes'::interval);";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;*/

    $sql =  "INSERT INTO camera_frame (camera_id,base64) VALUES (".$cameraId.",'".$base64."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else if (isset($_GET["cameraId"])) {

    $cameraId = htmlspecialchars($_GET["cameraId"]);
    $sql = "SELECT * FROM camera_frame WHERE camera_id=".$cameraId." ORDER BY data_hora DESC LIMIT 1;";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 
  
    echo json_encode($details);
  }
  else {

   $sql = "select * from (select *, row_number() over (partition by camera_id order by data_hora desc) as row_number from camera_frame) temp where row_number=1;";

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