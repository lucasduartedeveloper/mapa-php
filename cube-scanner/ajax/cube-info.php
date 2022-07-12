<?php include ('config/db.php')?>
<?php
$sql ="";
try {
    echo $_POST["post"];
    if (!isset($_POST["cubeId"]) && isset($_POST["name"])) {
        $name = htmlspecialchars($_POST["name"]);
    
        $sql = "INSERT INTO cube_info (nome) VALUES ('".$name."');";
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;
    }
    else if (isset($_POST["cubeId"])) {
        $cubeId = htmlspecialchars($_POST["cubeId"]);
        $name = htmlspecialchars($_POST["name"]);
    
        $sql = "UPDATE cube_info SET nome='".$name."' WHERE id=".$cubeId;
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;
    }
    else if (isset($_POST["deleteId"])) {
        $cubeid = htmlspecialchars($_POST["deleteId"]);
    
        $sql = "DELETE FROM cube_info WHERE id=".$cubeId;
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;

        $sql = "DELETE FROM cube_face WHERE cube_id=".$cubeId;
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;
    }
    else {
        $sql = "SELECT a.* FROM cube_info a ORDER BY a.id";
    
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