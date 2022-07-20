<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["cw"])) {

    $cw = htmlspecialchars($_POST["cw"]);
    $ccw = htmlspecialchars($_POST["ccw"]);

    $sql = "UPDATE param SET valor='".$cw."' WHERE nome='cw';";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;

    $sql = "UPDATE param SET valor='".$ccw."' WHERE nome='ccw';";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else {
    $sql = "SELECT * FROM param WHERE nome='cw' OR nome='ccw' ORDER BY id;";

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