<?php include ('../config/db.php')?>
<?php
$sql ="";
try {
 
  if (!empty($_POST["base64"])) {

    $base64 = htmlspecialchars($_POST["hp_atual"]);
    $sql = "INSERT audio_command (base64) VALUES (".$base64.");";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;

  }
  else {

    $id = htmlspecialchars($_GET["id"]);
    $sql = "SELECT * FROM audio_command WHERE id=".$id.";";

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