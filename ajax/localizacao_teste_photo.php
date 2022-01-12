<?php include ('../config/db.php')?>
<?php
try {
  
  If (!empty($_GET["png"])) {

    $png = htmlspecialchars($_GET["png"]);
    $nome = htmlspecialchars($_GET["nome"]);

    $today = date("YmdHi");

    list($type, $data) = explode(';', $data);
    list(, $data) = explode(',', $data);
    $data = base64_decode($data);

    $file_path = "/img/upload".$today.".png";
    file_put_contents($file_path, $data);

    $sql = "INSERT localizacao_teste (nome, png, latitude, longitude) VALUES ('".$nome."','".$file_path."',0 ,0)";
    //$stmt = $pdo->prepare($sql);
    //$stmt->execute();

    $arr = array('status' => 'success');
    echo json_encode($arr);
    echo $sql;

  }
}
catch (PDOException $e) {
   echo 'Connection failed: ' . $e->getMessage();
}
catch (Exception $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>