<?php
require_once("../../go/sdk/h5.php");
require_once("../../sdk/access.php");
$h5 = new App();
$signPackage = $h5->GetSignPackage();

$access = new AccessSDK();
$access->setAccess();
$access->setAccess2();

$openid = $h5->initUser();
var_dump($openid);
$userinfo = $h5->userinfo;
$status = $userinfo["status"];
$type = intval($userinfo["type"]);
$appName = "DurexGo";
$score = $userinfo["score"];
$role = $userinfo["role"];
var_dump($userinfo);
var_dump($status);
var_dump($type);
var_dump($score);
var_dump($role);
$bird_1 = intval($userinfo["bird_1"]);
$bird_2 = intval($userinfo["bird_2"]);
$bird_3 = intval($userinfo["bird_3"]);
$bird_4 = intval($userinfo["bird_4"]);
var_dump($bird_1);
var_dump($bird_2);
var_dump($bird_3);
var_dump($bird_4);
?>
