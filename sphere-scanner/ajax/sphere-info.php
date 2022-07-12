<?php include ('config/db.php')?>
<?php
$sql ="";
try {
    echo $_POST["post"];
    if (!isset($_POST["sphereId"]) && isset($_POST["name"])) {
        $name = htmlspecialchars($_POST["name"]);
    
        $sql = "INSERT INTO sphere_info (nome) VALUES ('".$name."');";
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;
    }
    else if (isset($_POST["sphereId"])) {
        $sphereId = htmlspecialchars($_POST["sphereId"]);
        $name = htmlspecialchars($_POST["name"]);
    
        $sql = "UPDATE sphere_info SET nome='".$name."' WHERE id=".$sphereId;
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;
    }
    else if (isset($_POST["deleteId"])) {
        $sphereId = htmlspecialchars($_POST["deleteId"]);
    
        $sql = "DELETE FROM sphere_info WHERE id=".$sphereId;
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;

        $sql = "DELETE FROM sphere_face WHERE sphere_id=".$sphereId;
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;
    }
    else {
        $sql = "SELECT a.* FROM sphere_info a ORDER BY a.id";
    
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