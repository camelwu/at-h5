<?php

$fileName="log.txt";

if(file_exists($fileName)) {
  echo("存在!!!");
} else{
  echo("不存在!");
}


$WEB_PATH = "/var/www/AT-H5-02";
$command = "cd $WEB_PATH && git pull";
$result = exec($command);
print_r($result);
echo "<br/>";

$file = fopen("log.txt","w");
fwrite($file,date("Y-m-d H:i:s"));
fclose($file);
?>
