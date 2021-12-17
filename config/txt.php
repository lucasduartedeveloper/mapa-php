<?php 
$file = "contador.txt";
// Arquivo texto para manter o valor da variável

$handle = fopen($file, 'r+');
// Definimos o arquivo, as permissões para ler e escrever, por isso o pârametro r+ (ler e escrever)

$data   = fread($handle, 512);
// obtém o valor que está no arquivo contador.txt

$contar = $data + 1;
// Adiciona +1

fseek($handle, 0);
// O ponteiro volta para o início do arquivo

fwrite($handle, $contar);
// Salva o valor da variável contar no arquivo

fclose($handle);
// Fecha o arquivo
?>