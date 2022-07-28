<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["url"])) {
    $url = $_POST["url"];
    echo file_get_contents($url);
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