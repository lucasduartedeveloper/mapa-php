<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["texto"])  ) {

    $texto = htmlspecialchars($_POST["texto"]);
    $base64 = htmlspecialchars($_POST["base64"]);

    $sql =  "INSERT INTO e_book (texto,base64) VALUES (".$texto.",'".$base64."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else if (isset($_GET["id"])) {

    $id = htmlspecialchars($_GET["id"]);
    $sql = "SELECT * FROM e_book WHERE id=".$id.";";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 
  
    echo json_encode($details);
  }
  else {

   $sql = "SELECT * FROM e_book;";

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