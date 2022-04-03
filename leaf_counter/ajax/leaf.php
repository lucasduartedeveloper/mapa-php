<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["data_hora"])) {

    $data_hora = htmlspecialchars($_POST["data_hora"]);
    $nome = htmlspecialchars($_POST["nome"]);
    $foto = htmlspecialchars($_POST["foto"]);

    $sql = "INSERT INTO leaf_counter (data_hora, nome,foto) VALUES ('".$data_hora."','".$nome."','".$foto."'");

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else {
    $sql = "SELECT * FROM leaf_counter ORDER BY id DESC";

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