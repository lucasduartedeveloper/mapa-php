<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["balance"])) {

    $balance = htmlspecialchars($_POST["balance"]);

    $sql = "INSERT INTO param (valor) VALUES ('".$balance."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else {
    $sql = "SELECT * FROM param WHERE nome='balance';";

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