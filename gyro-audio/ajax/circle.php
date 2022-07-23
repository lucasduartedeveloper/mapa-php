<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["list"])) {
    $list = $_POST["list"];
    foreach($list as $circle) {
        $sql = "INSERT INTO circle ".
        "(circle_id,base64,x,y) VALUES ".
        "('".
        $square["circleId"]."','".
        $square["base64"]."',".
        $square["x"].",".
        $square["y"].
         ");";
        //echo var_dump($square);
        echo var_dump($sql);
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    }
  }
  else if (isset($_POST["circleId"])) {
    $circleId = $_POST["circleId"];
    $sql = "DELETE FROM circle ".
    "WHERE circle_id='".$circleId."';";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else {
    $sql = "SELECT * FROM circle ORDER BY id;";

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