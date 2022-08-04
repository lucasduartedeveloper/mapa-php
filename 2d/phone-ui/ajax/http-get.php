<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["url"])) {
    $url = $_POST["url"];
    if (isset($_POST["proxy"]) && $_POST["proxy"] != "none") {
        $proxy = $_POST["proxy"];
        $aContext = array(
            "http" => array(
                "proxy" => $proxy,
             ),
        );
        echo file_get_contents($url, false, $aContext);
    }
    else {
        echo file_get_contents($url);
    }
  }
  else if (isset($_GET["url"])) {
    $url = $_GET["url"];
    str_replace("</body>",
    "<script src=\"//cdn.jsdelivr.net/npm/eruda\"></script>".
    "<script>eruda.init();</script></body>", $url);
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