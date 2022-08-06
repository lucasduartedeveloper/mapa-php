<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["url"])) {
    $url = $_POST["url"];
    $token = $_POST["token"];

    $postdata = http_build_query(
        array(
            "next" => "",
            "csrfmiddlewaretoken" =>
"ClWufmAjhTWesBxT39uiLylAcYL67OVEnVa39iXLrVF87uI6oDv4TxBIsMHjGAtK",
            "username" => "cadillac1958",
            "password" => "4465lolo**"
        )
    );
    $opts = array("http" =>
        array(
            "method" => "POST",
            "header" => 
            "Content-type: application/x-www-form-urlencoded",
            "content" => $postdata
        )
    );
    $context = stream_context_create($opts);
    $result = file_get_contents($url, false, $context);
    echo $result;
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