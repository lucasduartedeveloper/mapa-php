<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["phone_number"])) {
     $name = htmlspecialchars($_POST["name"]);
     $phone_number =
     htmlspecialchars($_POST["phone_number"]);
     $url = htmlspecialchars($_POST["url"]);
     $type = htmlspecialchars($_POST["type"]);
     $base64 = htmlspecialchars($_POST["base64"]);

     $sql = "INSERT INTO contact ".
     "(name,phone_number,url,type,base64) VALUES ".
     "('".
     $square["name"]."','".
     $square["phone_number"].",".
     $square["url"]."',".
     $square["type"].
     $square["base64"].
     ");";
     //echo var_dump($square);
     echo var_dump($sql);
     $stmt = $pdo->prepare($sql);
     $stmt->execute();
  }
  else if (isset($_POST["id"])) {
     $phone_number =
     htmlspecialchars($_POST["phone_number"]);

     $sql = "UPDATE param SET valor='".$theme."' WHERE nome='theme';";

     $stmt = $pdo->prepare($sql);
     $stmt->execute();

     echo $sql;
  }
  else if (isset($_POST["no"])) {
     $no = $_POST["no"];
     $sql = "DELETE FROM contact ".
     "WHERE phone_number='".$no."';";

     $stmt = $pdo->prepare($sql);
     $stmt->execute();

     echo $sql;
  }
  else {
    $sql = "SELECT * FROM contact ORDER BY id;";

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