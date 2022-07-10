<?php include ('config/db.php')?>
<?php
$sql ="";
try {
    echo $_POST["text"];
    if (!isset($_POST["id"]) && isset($_POST["text"])) {
        $name = htmlspecialchars($_POST["text"]);
    
        $sql =  "INSERT INTO cube_info (nome) VALUES (".$name."');";
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;
    }
    else if (isset($_POST["id"])) {
        $id = htmlspecialchars($_POST["id"]);
        $text = htmlspecialchars($_POST["text"]);
    
        $sql =  "UPDATE cube_info SET nome='".$text."' WHERE id=".$id;
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;
    }
    else {
        $sql = "SELECT a.* FROM cube_info a";
    
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