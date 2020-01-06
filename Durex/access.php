<?php
    require_once("sdk/h5.php");
    require_once("../sdk/access.php");
    $h5 = new App();
    $access = new AccessSDK();

    $hasAccess = $access->checkTimeAccess("a",2);

    if($hasAccess){
        $access->setTimeAccess("a");
        echo "right";
    }else{
        echo "wrong";
    }

?>


