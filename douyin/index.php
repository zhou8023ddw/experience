<?php
    require_once("../../api/sdk/App_douyin.php");
    $appName = 'douyin';
    $app = new App_douyin($appName);
    $ukey = md5(uniqid(mt_rand(), true));
    $keyArray = $app->key($ukey);
    $signPackage = $app->GetSignPackage();


    $shareKey = $_GET['skey'];
    $shareIndex = $_GET['sindex'];

    if ($shareKey) {

    }

//$baseUrl ='http://test.tttang.net/zhoulejie/douyin/';
//$baseUrl = 'http://oqt6yssn3.bkt.clouddn.com/douyin_4/';
$baseUrl = 'http://oqt6yssn3.bkt.clouddn.com/douyin/v_9/';
//$baseUrl ='http://ooenoivxb.bkt.clouddn.com/douyin_3/';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA_Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <title>抖音治愈不开心</title>
    <link href="<?php echo $baseUrl ?>css/index.css" rel="stylesheet" type="text/css">
</head>
<body>
<!--横屏提示-->
<div id="orientLayer" class="mod-orient-layer">
    <div class="mod-orient-layer__content">
        <i class="icon mod-orient-layer__icon-orient"></i>
        <div class="mod-orient-layer__desc">请在竖屏下查看</div>
    </div>
</div>
<div id="main">
    <div id="videoBox">
        <div id="p1">
            <div id="video"></div>
            <div id="videoImg"></div>
        </div>
    </div>
    <div id="box">
        <div id="loading">
            <img src="<?php echo $baseUrl ?>img/load_bg.png">
            <img src="<?php echo $baseUrl ?>img/load_1.png" class="load_1">
            <img src="<?php echo $baseUrl ?>img/load_2.png" class="load_2">
            <img src="<?php echo $baseUrl ?>img/load_3.png" class="load_3">
            <img src="<?php echo $baseUrl ?>img/load_4.png" class="load_4">
            <span id="loaded">0</span>
        </div>

    </div>
    <div class="inputImage" >
        <div id="image">
            <input id="input_image" type="file" accept="image/*"><!--accept规定能够通过文件上传进行提交的文件类型-->
        </div>
    </div>
    <div id="swicth">
            <img src="<?php echo $baseUrl ?>img/music_on.png" id="music_on">
            <img src="<?php echo $baseUrl ?>img/music_off.png" id="music_off">
    </div>
</div>

 <!-- <script src="js/vconsole.js"></script>-->
    <script>
        var h5_config = {
            appName : '<?php echo $appName ?>',
            baseUrl : '<?php echo $baseUrl ?>',
            baseLink: 'http://test.tttang.net/zhoulejie/douyin/',
            para    : '',
            name     : "<?php echo $appName ?>",
            key      : "<?php echo $keyArray['key'] ?>",
            ukey     : "<?php echo $keyArray['ukey'] ?>",
            timestamp: "<?php echo $keyArray['timestamp'] ?>",
            nonce    : "<?php echo $keyArray['nonce'] ?>",
            shareImg:"images/page_7_036.png",
            shareVideo:"1"
        };
        //手机适配问题
        var width = window.innerWidth;
        var height= window.innerHeight;
        var main = document.getElementById('main');
        main.style.cssText="transform: translate(" + (width - 640) / 2 + "px," + (height - 1008) / 2 + "px) scale(" + height / 1008+ ") ";
        main.style.cssText="-webkit-transform: translate(" + (width - 640) / 2 + "px," + (height - 1008) / 2 + "px) scale(" + height / 1008 + ") ";
        document.addEventListener('touchmove',function(e){
         e.preventDefault();
         });
        //微信设置
        var wxConfig = {
            debug:false,
            appId: '<?php echo $signPackage["appId"]; ?>',
            timestamp: '<?php echo $signPackage["timestamp"]; ?>',
            nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
            signature: '<?php echo $signPackage["signature"]; ?>',
            jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "chooseImage",
                "uploadImage",
                "downloadImage",
                "getLocalImgData"
            ]
        };
    </script>
    <script src="<?php echo $baseUrl ?>js/loader.js"></script>
</body>
</html>