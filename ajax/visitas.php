<?php include ('../config/db.php')?>
<?php
try {
  $sql = "SELECT valor FROM param WHERE nome='contador_visitas';";
  //echo $sql;
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $rowCount = $stmt->rowCount();
  $details = $stmt->fetch(); 

  //$contar = intval($details->valor);
  //echo $contar;

  echo json_encode($details);
}
catch (PDOException $e) {
   echo 'Connection failed: ' . $e->getMessage();
}
?>