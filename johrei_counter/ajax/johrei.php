<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["data"])) {

    $data = htmlspecialchars($_POST["data"]);
    $id_nome = htmlspecialchars($_POST["id_nome"]);

    $sql = "INSERT INTO johrei_counter_nome (id_nome, data) VALUES (".$id_nome.",'".$data."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else if (!isset($_GET["delete"])) {

    $data = htmlspecialchars($_GET["data"]);
    $id_nome = htmlspecialchars($_GET["id_nome"]);

    $sql = "SELECT count(*) FROM johrei_counter_nome WHERE data='".$data."' AND id_nome=".$id_nome." GROUP BY id_nome ;";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 

    echo json_encode($details);
  }
  else if (isset($_GET["delete"])) {
    
    $data = htmlspecialchars($_GET["data"]);
    $id_nome = htmlspecialchars($_GET["id_nome"]);

    $sql = "DELETE FROM johrei_counter_nome WHERE = id_nome=".$id_nome." AND data='".$data."';";

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