<?php
$sql ="";
try {
  include ("/config/db.php");

  if (!empty($_POST["base64"])) {

    $nome = htmlspecialchars($_POST["nome"]);
    $latitude = htmlspecialchars($_POST["latitude"]);
    $longitude = htmlspecialchars($_POST["longitude"]);
    $desenho = htmlspecialchars($_POST["desenho"]);
    $base64 = htmlspecialchars($_POST["base64"]);

    $sql = "INSERT extra_audio (nome,latitude,longitude,desenho,base64) VALUES ('".$nome."','".$latitude."',''".$longitude."','".$desenho."','".$base64."');";

    $stmt = $pdo->prepare($sql);
    //$stmt->execute();

    echo $sql;
  }
  else if (!empty($_GET["id"])) {
    $id = htmlspecialchars($_GET["id"]);
    $sql = "SELECT * FROM extra_audio WHERE id=".$id.";";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 
  
    echo json_encode($details);
  }
  else {
    $sql = "SELECT id,nome,latitude,longitude,desenho FROM extra_audio;";

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