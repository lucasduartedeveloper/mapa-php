<?php include ('config/db.php')?>
<?php
$sql ="";
try {
    if (isset($_POST["name"])  ) {
    $name = htmlspecialchars($_POST["name"]);

    /*
    $sql = "DELETE FROM camera_frame 
WHERE data_hora < (now() - '2 hours 40 minutes'::interval);";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;*/

    $sql =  "INSERT INTO cube_info (nome) VALUES (".$nome."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
    }
    else
    /*
    $sql = "SELECT a.*, b.nome FROM camera_frame a LEFT JOIN cube_info b ON a.camera_id = b.id WHERE a.camera_id=".$cameraId." ORDER BY a.data_hora DESC LIMIT 1";*/
     $sql = "SELECT a.* FROM cube_info a";

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