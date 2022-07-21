<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["list"])) {
    $list = $_POST["list"];
    $sql = "";

    /*
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    */

    echo $list;
  }
  else if (isset($_POST["squareId"])) {
    $squareId = $_POST["squareId"];
    $sql = "";

    /*
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    */

    echo $squareId;
  }
  else {
    $sql = "SELECT * FROM square ORDER BY id;";

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