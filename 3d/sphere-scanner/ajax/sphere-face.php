<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["sphereId"])) {

    $sphereId = htmlspecialchars($_POST["sphereId"]);
    $faceId = htmlspecialchars($_POST["faceId"]);
    $base64 = htmlspecialchars($_POST["base64"]);

    $sql =  "DELETE FROM sphere_face WHERE sphere_id=".$sphereId." AND face_id=".$faceId.";";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;

    $sql =  "INSERT INTO sphere_face (sphere_id,face_id,base64) VALUES (".$sphereId.",".$faceId.",'".$base64."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else if (isset($_GET["sphereId"])) {

    $sphereId = htmlspecialchars($_GET["sphereId"]);
    $sql = "SELECT * FROM sphere_face WHERE sphere_id=".$sphereId." ORDER BY face_id;";

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