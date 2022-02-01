<?php include ('../config/db.php')?>
<?php
$sql ="";
try {
 
  if (!empty($_POST["id"])) {

    $id = htmlspecialchars($_POST["id"]);
    $latitude = htmlspecialchars($_POST["lat"]);
    $longitude = htmlspecialchars($_POST["lng"]);
    $anotacao = htmlspecialchars($_POST["anotacao"]);
    $data_hora = htmlspecialchars($_POST["data_hora"]);

    $sql = "UPDATE localizacao_gps_item SET latitude=".$latitude.", longitude=".$longitude.",  anotacao='".$anotacao." ' ,data_hora='".$data_hora."' WHERE id=".$id.";";

    echo $sql;

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
  }
  else {

    $sql = "SELECT * FROM localizacao_gps_item ORDER BY data_hora;";
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