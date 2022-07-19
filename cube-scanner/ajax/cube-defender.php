<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["theme"]) {
    $theme = htmlspecialchars($_POST["theme"]);

    $sql = "UPDATE param SET valor='".$theme."' WHERE nome='theme';";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else if (isset($_POST["cubeNo"])) {

    $cubeNo = htmlspecialchars($_POST["cubeNo"]);

    $sql = "UPDATE param SET valor='".$cubeNo."' WHERE nome='cube-no';";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  if (isset($_POST["xyz"])) {

    $xyz = htmlspecialchars($_POST["xyz"]);

    $sql = "UPDATE param SET valor='".$xyz."' WHERE nome='xyz';";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else {
    $sql = "SELECT * FROM param WHERE ".
        "nome='cube-no' OR ".
        "nome='xyz' OR ".
        "nome='theme' ".
        "ORDER BY id;";

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