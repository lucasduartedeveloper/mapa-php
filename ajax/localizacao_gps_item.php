<?php include ('../config/db.php')?>
<?php
$sql ="";
try {
 
  if (!empty($_POST["id"])) {

    $latitude = htmlspecialchars($_POST["lat"]);
    $longitude = htmlspecialchars($_POST["lng"]);
    $id = htmlspecialchars($_POST["id"]);

    $sql = "UPDATE localizacao_gps_item SET latitude=".$latitude.", longitude=".$longitude." WHERE id=".$id.";";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else {

    $sql = "SELECT * FROM localizacao_gps_item ORDER BY data_hora DESC;";
    //echo $sql."<br>";else {

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