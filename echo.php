<?php
$fileName="log.txt";

if(file_exists($fileName)) {
  echo("存在!");
} else{
  echo("不存在!");
}

$file = fopen("log.txt","w");  
fwrite($file,date("Y-m-d H:i:s"));  
fclose($file);

system("git pull",$result);
print_r($result);
?>
