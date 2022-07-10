<?php include ('config/db.php')?>
<?php
$sql ="";
try {
    /*
    $sql = "SELECT a.*, b.nome FROM camera_frame a LEFT JOIN cube_info b ON a.camera_id = b.id WHERE a.camera_id=".$cameraId." ORDER BY a.data_hora DESC LIMIT 1";*/
     $sql = "SELECT a.* FROM cube_info a";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 
  
    echo json_encode($details);
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