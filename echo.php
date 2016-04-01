<?php

exec("/usr/bin/sudo /var/www/AT-H5-02/deploy.sh",$result,$ret);

foreach($result as $value)
{
    echo $value;
    echo "<br/>";
}


?>
