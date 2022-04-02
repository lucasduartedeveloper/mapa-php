<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["data"])) {

    $quantidade = htmlspecialchars($_POST["quantidade"]);
    $data = htmlspecialchars($_POST["data"]);

    $sql = "UPDATE johrei_counter SET quantidade=".$quantidade." WHERE data='".$data."'";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else {
    $sql = "SELECT * FROM johrei_counter ORDER BY id DESC";

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