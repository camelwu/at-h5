<?php

$fileName="log.txt";

if(file_exists($fileName)) {
  echo("存在!!!");
} else{
  echo("不存在!");
}

exec("/usr/bin/sudo /var/www/AT-H5-02/deploy.sh",$result,$ret);
echo "<br/>";
print_r($result);
echo "<br/>";
print_r($ret);
echo "<br/>";

foreach($result as $value)
{
    echo $value;
    echo "<br/>";
}

$file = fopen("log.txt","w");
fwrite($file,date("Y-m-d H:i:s"));
fclose($file);
?>
