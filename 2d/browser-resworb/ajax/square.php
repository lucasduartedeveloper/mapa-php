<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["list"])) {
    $list = $_POST["list"];
    foreach($list as $square) {
        $sql = "INSERT INTO square ".
        "(square_id,base64,x,y) VALUES ".
        "('".
        $square["squareId"]."','".
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
  else if (isset($_POST["squareId"])) {
    $squareId = $_POST["squareId"];
    $sql = "DELETE FROM square ".
    "WHERE square_id='".$squareId."';";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
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