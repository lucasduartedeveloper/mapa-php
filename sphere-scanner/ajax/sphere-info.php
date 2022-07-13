<?php include ('config/db.php')?>
<?php
$sql ="";
try {
    echo $_POST["post"];
    if (!isset($_POST["sphereId"]) && isset($_POST["name"])) {
        $name = htmlspecialchars($_POST["name"]);
        $diameter = htmlspecialchars($_POST["diameter"]);
        $weight = htmlspecialchars($_POST["weight"]);
        $lat = htmlspecialchars($_POST["lat"]);
        $lng = htmlspecialchars($_POST["lng"]);
        $angle = htmlspecialchars($_POST["angle"]);
    
        $sql = "INSERT INTO sphere_info (".
        "nome,".
        "diameter,".
        "weight,".
        "lat,".
        "lng,".
        "angle ".
        ") VALUES ('".
        "'".$name."',".
        "'".$diameter."',".
        "'".$weight."',".
        "'".$lat."',".
        "'".$lng."',".
        "'".$angle."' ".
        ");";

        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    
        echo $sql;
    }
    else if (isset($_POST["sphereId"])) {
        $sphereId = htmlspecialchars($_POST["sphereId"]);
        $name = htmlspecialchars($_POST["name"]);
        $diameter = htmlspecialchars($_POST["diameter"]);
        $weight = htmlspecialchars($_POST["weight"]);
        $lat = htmlspecialchars($_POST["lat"]);
        $lng = htmlspecialchars($_POST["lng"]);
        $angle = htmlspecialchars($_POST["angle"]);
    
        $sql = "UPDATE sphere_info SET ".
        "name='".$name.", ".
        "diameter='".$diameter.", ".
        "weight='".$weight.", ".
        "lat='".$lat.", ".
        "lng='".$lng.", ".
        "angle=".$angle." ".
        "' WHERE id=".$sphereId;
    
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