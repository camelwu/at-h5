<?php

$fileName="log.txt";

if(file_exists($fileName)) {
  echo("存在!");
} else{
  echo("不存在!");
}



$result = shell_exec("cd /var/www/AT-H5-02;git pull");
print_r($result);
echo "<br/>";

$file = fopen("log.txt","w");
fwrite($file,date("Y-m-d H:i:s"));
fclose($file);
?>
