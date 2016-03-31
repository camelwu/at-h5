<?php

$fileName="log.txt";

if(file_exists($fileName)) {
  echo("存在!");
} else{
  echo("不存在!");
}


$shell = <<<EOF
$WEB_PATH = "/var/www/AT-H5-02";
echo "Start deployment"
cd \$WEB_PATH
echo "pulling source code..."
//git reset --hard origin/master
//git clean -f
git pull
//git checkout master
//echo "changing permissions..."
//chown -R \$WEB_USER:\$WEB_GROUP \$WEB_PATH
echo "Finished."
EOF;

file_put_contents('deploy.sh', $shell);
$res = shell_exec("bash deploy.sh");
print_r($res);
echo "<br/>";

$file = fopen("log.txt","w");
fwrite($file,date("Y-m-d H:i:s"));
fclose($file);
?>
