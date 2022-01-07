<?php include ('../config/db.php')?>
<?php
try {
  
  If (!empty($_GET["lat"])) {

    $latitude = htmlspecialchars($_GET["lat"]);
    $longitude = htmlspecialchars($_GET["long"]);
    $id = htmlspecialchars($_GET["id"]);

    $sql = "UPDATE localizacao_teste SET latitude='"+$latitude+"', longitude='"+$longitude."' WHERE id="+$id+");";
     //echo $sql."<br>";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

  }

  $sql = "SELECT * FROM localizacao_teste ORDER BY id;";
  //echo $sql."<br>";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $rowCount = $stmt->rowCount();
  $details = $stmt->fetch(); 
  
  echo json_encode($details);
}
catch (PDOException $e) {
   echo 'Connection failed: ' . $e->getMessage();
}
?>