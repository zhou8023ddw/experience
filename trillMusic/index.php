<?php
require_once("sdk/h5.php");
require_once("../../sdk/access.php");
    $appName = "";
    $h5 = new App();
    $signPackage = $h5->GetSignPackage();
    $access = new AccessSDK();
    $access->setAccess();
    $fr = $_GET['fr'];
   $baseUrl ='http://test.tttang.net/zhoulejie/trillMusic/';
     //$baseUrl = 'http://oqt6yssn3.bkt.clouddn.com/v_2/';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <title>找啊找啊找爱豆</title>
    <style type="text/css">
        /*横屏提醒样式*/
        @-webkit-keyframes rotation {
            10% { transform: rotate(90deg); -webkit-transform: rotate(90deg) }
            50%, 60% { transform: rotate(0deg); -webkit-transform: rotate(0deg) }
            90% { transform: rotate(90deg); -webkit-transform: rotate(90deg) }
            100% { transform: rotate(90deg); -webkit-transform: rotate(90deg) }
        }
        @keyframes rotation {
            10% { transform: rotate(90deg); -webkit-transform: rotate(90deg) }
            50%, 60% { transform: rotate(0deg); -webkit-transform: rotate(0deg) }
            90% { transform: rotate(90deg); -webkit-transform: rotate(90deg) }
            100% { transform: rotate(90deg); -webkit-transform: rotate(90deg) }
        }
        #orientLayer { display: none; }
        @media screen and (min-aspect-ratio: 13/8) { #orientLayer { display: block; z-index: 10001} }
        .mod-orient-layer { display: none; position: fixed; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; background: #000; z-index: 9997 }
        .mod-orient-layer__content { position: absolute; width: 100%; top: 45%; margin-top: -75px; text-align: center }
        .mod-orient-layer__icon-orient {background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADaCAMAAABU68ovAAAAXVBMVEUAAAD29vb////x8fH////////x8fH5+fn29vby8vL////5+fn39/f6+vr////x8fH////////+/v7////09PT////x8fH39/f////////////////////x8fH///+WLTLGAAAAHXRSTlMAIpML+gb4ZhHWn1c2gvHBvq1uKJcC6k8b187lQ9yhhboAAAQYSURBVHja7d3blpowFIDhTUIAOchZDkre/zE7ycySrbUUpsRN2/1fzO18KzEqxEVgTiZNfgmmtxRc8iaR8HNe8x4BtjQePKayYCIoyBSgvNNE1AkNSHqZyLqk97EgUCCHBzZ5mkg7ScvIJuIyOyXBRFxgpqWZyGsAZLB1KjsJi8nutHU4JCRbFRH8tmirI9k8Jx2sqNs8K/m0LQkrktO2crgcgXGB4AiTEsB0hJfo9MGgX7CGcYiYwQxmMOOvZwRhBG8tCoMXjBDeXvWCEcHbi14wgCBmMIMZzGAGM5jxETNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxY6E2rUQxnH2tz9cirlJFwFBJedaPnUv0M7++egPDE8iAJcIDmxwH5wwv9vUviw2kLbVO3TJU5uul/EyB0FoLp4x60PdGUd3qPurrWyjGGTc05u+1dcgI7/+tCCPARWGhH7o5Y7RCf+bH9ctXLp6v2BVDxfqz0oPXeSVaNtINo/1SXDv4dck8IIkbhtC2ol+iouEonTBCbYvVMnXOjxww6s/RFrBUpXHh/gw1rHj5d/qhYn9Gpk2FWh6xRBRX5Oj3Znh2Sq49/L6+y8pB26q9GbE2dbA2mVbx6I+7MfBglLCttm73ZQi7AD3iL4HqjFYJHSPRppqaUaJ3ATpGa+ckpGak2hRRMyqjGMkvl+xyFeSMwjAqcsZgGDdyhl0oNTnDN4yenJGZFGxNChP5/Y3efh6SM2rDOJMzboYxkDMqwyjIGcIw6F+io2FU1IxIm1JqRmgXSkvNKNCXeTpGrU0JNSO2c6LIGPgCS8AuDHz9ta0SXWDtxoDRH+MqlbC2Dt2G2JFRadtQZt2qq/orGowdGb2euxYiqWEpVWhTBnszoNAPdStuQwxqf0aocdWKW4Z+DfszIh8pxJqbuCE4YAC+4bm0evtipjpgJHeFnyyt1Ku2xa0bhjxr27p75rECNwyI9ZwvXkHq+7aTaMEV44YYy/spfgjgjNHaWW+GeUhGEX7tLlVinIFDDSgnOwhi1V6bU0b6tVS9eAERe863g4dRrtiHdc6o+nn5vtyVVgR79Cqt4uL6gfHPQyGqtP2vf7HADGbcYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JjhtOM+J/AgT008yDMkN/dPP9hzS8zAMQN3OEYeekp5YU7KOKXwVXqiY+QS7smcinGKABWdiBgpPJTSMHJ4KidhhPBUSMLw4CmPhKHgKUXCkHsygum71ftNSgCX6bsl8FQyfbcL5EdYsDk0R3j7aiA5wpt5AjKg/2gLJEBD/0Hf2OOf/vRrj6z/7GtP4B3nMKyjHA12kIPSjnJs3FEO0TvKkYJHOWCR+rjJH0Vn6fI5PjNbAAAAAElFTkSuQmCC');display: inline-block; width: 67px; height: 109px;
            transform: rotate(90deg); -webkit-transform: rotate(90deg); -webkit-animation: rotation infinite 1.5s ease-in-out; animation: rotation infinite 1.5s ease-in-out; -webkit-background-size: 67px; background-size: 67px }
        .mod-orient-layer__desc { margin-top: 20px; font-size: 15px; color: #fff }

        body,html{
            margin: 0;
            padding:0;
            width: 100%;
            height: 100%;
            background: #000;
            overflow: hidden;
        }
        #box{
            width:640px;
            height:1008px;
            left: 0;
            top:0;
            overflow: hidden;
            z-index: 111;
            position: absolute;
        }
        #videoBox{
            position: absolute;
            width: 540px;
            height: 960px;
            top: 0;
            left: 0;
            z-index: 1;
             overflow: hidden;
        }
        #video_bg_0{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top:0;
            z-index:3;
            overflow: hidden;
            display:none;
            background: url("<?php echo $baseUrl; ?>images/video_0.jpg");
            background-size:cover ;
        }
        #video_bg_1{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top:0;
                    z-index:3;
                    overflow: hidden;
                    display:none;
                    background: url("<?php echo $baseUrl; ?>images/video_1.png");
                    background-size:cover ;
         }
         #video_bg_2{
                  width: 100%;
                 height: 100%;
                 position: absolute;
                 left: 0;
                 top:0;
                 z-index:3;
                 overflow: hidden;
                 display:none;
                 background: url("<?php echo $baseUrl; ?>images/video_2.png");
                 background-size:cover ;
                 }
         #video_bg_3{
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  left: 0;
                  top:0;
                  z-index:3;
                  overflow: hidden;
                  display:none;
                  background: url("<?php echo $baseUrl; ?>images/video_3.png");
                  background-size:cover ;
          }
         #video_bg_4{
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  left: 0;
                  top:0;
                  z-index:3;
                  overflow: hidden;
                  display:none;
                  background: url("<?php echo $baseUrl; ?>images/video_4.png");
                  background-size:cover ;
         }
          #video_bg_5{
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  left: 0;
                  top:0;
                  z-index:3;
                  overflow: hidden;
                  display:none;
                  background: url("<?php echo $baseUrl; ?>images/video_5.png");
                  background-size:cover ;
          }
        #video {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display:none;
            background-color: black;
            object-fit: fill;
        }
        #page_2>img[class*="title_"]{
            display: none;
        }
        #page_3>img[class*="answer_"]{
            display: none;
        }
        .goTrillMusic_2{
            display: none;
        }
    </style>
</head>
<body>
<!--横屏提示-->
<div id="orientLayer" class="mod-orient-layer">
    <div class="mod-orient-layer__content">
        <i class="icon mod-orient-layer__icon-orient"></i>
        <div class="mod-orient-layer__desc">竖屏下看爱豆更迷人哦~</div>
    </div>
</div>
<div id="videoBox">
    <div id="p1">
        <div id="container_video">
             <video id="video" preload="auto" webkit-playsinline="true" playsinline="true" x5-video-player-type="h5"
                   x-webkit-airplay="true" x5-video-player-fullscreen="true" x5-video-orientation="portraint" width=1
                   height=1 src="<?php echo $baseUrl; ?>res/video2.mp4">
            </video>
            <div id="video_bg_0"></div>
            <div id="video_bg_1"></div>
            <div id="video_bg_2"></div>
            <div id="video_bg_3"></div>
            <div id="video_bg_4"></div>
            <div id="video_bg_5"></div>
        </div>
    </div>
</div>
<div id="box">
 <div id="loading">
     <img src="<?php echo $baseUrl; ?>images/loading.gif">
 </div>
</div>
<script src="<?php echo $baseUrl; ?>js/Stage.js"></script>
<script>
    var fr = '<?php echo $fr; ?>' || '0';
    //记录进入次数
    var game_times = window.localStorage.getItem('tttang_trill_music_game_times');
    if(!game_times){
        game_times = window.localStorage.setItem('tttang_trill_music_game_times','1');
        game_times = 1;
    }else {
        game_times = Number(game_times)+1;
        window.localStorage.setItem('tttang_trill_music_game_times',game_times);
    }
    var h5_config = {
            appName : 'trill_music',
            baseUrl : '<?php echo $baseUrl; ?>',
            baseLink: 'http://test.tttang.net/zhoulejie/trillMusic/',
            para    : '<?php echo $fr; ?>' ? ('?fr=' + fr) :''
        };
    //手机适配问题
    var width = window.innerWidth;
    var height= window.innerHeight;
    var changeBox = document.getElementById('box');
    changeBox.style.cssText="transform: translate(" + (width - 640) / 2 + "px," + (height - 1008) / 2 + "px) scale(" + height / 1008+ ") ";
    changeBox.style.cssText="-webkit-transform: translate(" + (width - 640) / 2 + "px," + (height - 1008) / 2 + "px) scale(" + height / 1008 + ") ";

    document.addEventListener('touchmove',function(e){
        e.preventDefault();
    });
    //视频适配
    var stage = new Stage('videoBox', {
        width           : 540,
        height          : 960,
        resolutionPolicy: ResolutionPolicy.NO_BORDER,
        zIndex          : 2
    });
</script>
<script src="<?php echo $baseUrl; ?>js/loader.js"></script>
<script>
    //分享设置
    var wxConfig = {
        debug:false,
        appId: '<?php echo $signPackage["appId"]; ?>',
        timestamp: '<?php echo $signPackage["timestamp"]; ?>',
        nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
        signature: '<?php echo $signPackage["signature"]; ?>',
        jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",

        ]
    };
</script>
</body>
</html>
