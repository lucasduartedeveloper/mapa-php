<?php include ('config/db.php')?>
<?php
$sql ="";
try {
    echo $_POST["post"];
    if (!isset($_POST["cubeId"]) && isset($_POST["name"])) {
        $name = htmlspecialchars($_POST["name"]);
        $size = htmlspecialchars($_POST["size"]);
        $weight = htmlspecialchars($_POST["weight"]);
        $lat = htmlspecialchars($_POST["lat"]);
        $lng = htmlspecialchars($_POST["lng"]);
        $angle = htmlspecialchars($_POST["angle"]);
    
        $sql = "INSERT INTO cube_info (".
        "name,".
        "size,".
        "weight,".
        "lat,".
        "lng,".
        "angle ".
        ") VALUES (".
        "'".$name."',".
        "'".$size."',".
        "'".$weight."',".
        "'".$lat."',".
        "'".$lng."',".
        "'".$angle."' ".
        ");";
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;
    }
    else if (isset($_POST["cubeId"])) {
        $cubeId = htmlspecialchars($_POST["cubeId"]);
        $name = htmlspecialchars($_POST["name"]);
        $size = htmlspecialchars($_POST["size"]);
        $weight = htmlspecialchars($_POST["weight"]);
        $lat = htmlspecialchars($_POST["lat"]);
        $lng = htmlspecialchars($_POST["lng"]);
        $angle = htmlspecialchars($_POST["angle"]);
    
        $sql = "UPDATE cube_info SET ".
        "nome='".$name."', ".
        "size='".$size."', ".
        "weight='".$weight."', ".
        "lat='".$lat."', ".
        "long='".$lng."', ".
        "angle='".$angle."' ".
        "WHERE id=".$cubeId;
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;
    }
    else if (isset($_POST["deleteId"])) {
        $cubeId = htmlspecialchars($_POST["deleteId"]);
    
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