<?php include ('../config/db.php')?>
<?php
try {
  $sql = "SELECT latitude,longitude FROM localizacao ORDER BY id DESC";
  echo $sql;
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $rowCount = $stmt->rowCount();
  $details = $stmt->fetch(); 
  //$contar = intval($details->valor);
  //echo $contar;
}
catch (PDOException $e) {
   echo 'Connection failed: ' . $e->getMessage();
}
?>