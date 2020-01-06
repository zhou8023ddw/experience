<?php
require_once("../../go/sdk/h5.php");
require_once("../../sdk/access.php");
$h5 = new App();
$signPackage = $h5->GetSignPackage();

$access = new AccessSDK();
$access->setAccess();
$access->setAccess2();

$openid = $h5->initUser();


$userinfo = $h5->userinfo;
$status = $userinfo["status"];
$type = intval($userinfo["type"]);
$appName = "DurexGo";
$score = $userinfo["score"];
$role = $userinfo["role"];

$bird_1 = intval($userinfo["bird_1"]);
$bird_2 = intval($userinfo["bird_2"]);
$bird_3 = intval($userinfo["bird_3"]);
$bird_4 = intval($userinfo["bird_4"]);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Durex GO</title>
    <meta name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="yes"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        body, canvas, div {
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            -khtml-user-select: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        * {
            margin: 0;
            padding: 0;
        }

        #map {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            overflow: hidden;
            z-index: 1;
        }

        #Cocos2dGameContainer {
            z-index: 10;
        }

        #gameCanvas{
            overflow: hidden;
        }

        #loading {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: white;
            top: 0;
            left: 0;
            z-index: 100;
            /*display: none;*/
        }

        .loading {
            position: fixed;
            width: 100%;
            height: 100%;
            display: block;
        }

        #loading_bg {
            background: url("images/loading_bg.jpg") center center no-repeat;
            background-size: auto 100%;
        }

        #loading_logo {
            background: url("images/loading_logo.png") center center no-repeat;
            background-size: auto 100%;
        }

        #loading_loading {
            background: url("images/loading_loading.png") center center no-repeat;
            background-size: auto 100%;
            animation: fade 2s linear infinite;
            -webkit-animation: fade 2s linear infinite;
        }

        @keyframes fade {
            0% {
                opacity: 0;
            }
            70% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        @-webkit-keyframes fade {
            0% {
                opacity: 0;
            }
            70% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        #loading_bird {
            position: fixed;
            width: 112px;
            height: 95px;
            background: url("images/loading_bird.png") center center no-repeat;
            background-size: auto 100%;
            animation: rotate 2s linear infinite;
            -webkit-animation: rotate 2s linear infinite;
            display: none;
        }

        @keyframes rotate {
            0% {
                transform: rotate(0deg)
            }
            100% {
                transform: rotate(360deg)
            }
        }
        @-webkit-keyframes rotate {
            0% {
                -webkit-transform: rotate(0deg)
            }
            100% {
                -webkit-transform: rotate(360deg)
            }
        }

        @keyframes captureAni {
            0% {
                transform: scale(0.8);
            }
            100% {
                transform: scale(1);
            }
        }
        @-webkit-keyframes captureAni {
            0% {
                -webkit-transform: scale(0.8);
            }
            100%{
                -webkit-transform: scale(1);
            }
        }

        .range {
            transform-origin: 50% 50% 0;
            animation: captureAni 2s linear infinite;
            -webkit-animation: captureAni 2s linear infinite;
        }

        @keyframes shake {
            0% {
                transform: rotate(0deg) scale(1);
            }
            100% {
                transform: rotate(720deg) scale(0);
            }
        }

        @-webkit-keyframes shake {
            0% {
                -webkit-transform: rotate(0deg) scale(1);
            }
            100% {
                -webkit-transform: rotate(720deg) scale(0);
            }
        }

        .shake{
            transform-origin: 50% 50% 0;
            animation: shake 1s linear 1;
            -webkit-animation: shake 1s linear 1;
            animation-fill-mode : forwards;
        }

        #input {
            display: none;
        }

        #input_background {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: black;
            opacity: 0.5;
            z-index: 100;
        }

        #input_bg {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 100;
        }

        #input_button_confirm {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 101;
        }

        #input_button_give_up {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 101;
        }

        .input {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 102;
            background-color: transparent;
            border: 0;
            outline: none;
        }
    </style>

    <script type="text/javascript">
        var _smq = _smq || [];

        _smq.push(['_setAccount', '2ce3d50', new Date()]);
        _smq.push(['pageview']);

        (function() {
            var sm = document.createElement('script'); sm.type = 'text/javascript'; sm.async = true;
            sm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'site.cdnmaster.com/sitemaster/collect.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sm, s);
        })();
    </script>
</head>
<body style="padding:0; margin: 0; background: white;">

<div id="loading">
    <div id="loading_bg" class="loading"></div>
    <div id="loading_logo" class="loading"></div>
    <div id="loading_loading" class="loading"></div>
    <div id="loading_bird"></div>
</div>
<div id="input">
    <div id="input_background"></div>
    <input id="input_name" class="input">
    <input id="input_address" class="input">
    <input id="input_code" class="input">
    <input id="input_phone" class="input">
</div>
<div id="map"></div>
<div id="audio"></div>
<canvas id="gameCanvas" width="480" height="720"></canvas>

<style type="text/css">
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
</style>
<div id="orientLayer" class="mod-orient-layer">
    <div class="mod-orient-layer__content">
        <i class="icon mod-orient-layer__icon-orient"></i>
        <div class="mod-orient-layer__desc">为了更好的体验，请使用竖屏浏览</div>
    </div>
</div>

<script>
    var isAndroid = false;

    (function() {
        var nav      = window.navigator;
        var ua       = nav.userAgent.toLowerCase();
        var uaResult = /android (\d+(?:\.\d+)+)/i.exec(ua) || /android (\d+(?:\.\d+)+)/i.exec(nav.platform);
        if (uaResult) {
            isAndroid = true;
            var osVersion    = parseInt(uaResult[1]) || 0;
            var browserCheck = ua.match(/(qzone|micromessenger|qqbrowser)/i);
            if (browserCheck) {
                var gameCanvas = document.getElementById("gameCanvas");
                var ctx        = gameCanvas.getContext('2d');
                ctx.fillStyle  = '#000000';
                ctx.fillRect(0, 0, 1, 1);
            }
        }
    })();

    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });

    (function() {
        var pixelRatio = window.devicePixelRatio || 1;
        var ratioH     = window.innerHeight * pixelRatio / 1008;
        var bird       = document.getElementById('loading_bird');

        var w = 112 / pixelRatio * ratioH;
        var h = 95 / pixelRatio * ratioH;

        bird.style.left       = '50%';
        bird.style.top        = String(435 / 1008 * 100) + '%';
        bird.style.width      = w + 'px';
        bird.style.height     = h + 'px';
        bird.style.marginLeft = -(w / 2 - 55 / pixelRatio * ratioH) + 'px';
        bird.style.marginTop  = -h / 2 + 'px';
        bird.style.display    = 'block';
    })();
</script>
<script src="http://map.qq.com/api/js?v=2.exp&key=5UOBZ-E3GAX-7W34Q-TD44M-HUALQ-S3FAH&libraries=geometry,convertor&callback=mapLoaded"></script>

<script>

    _smq.push(['custom','杜蕾斯七夕喜鹊','首页','PV']);

    var AVInit = false;
    var analytics = false;

    var role = '<?php echo $role; ?>';
    var num_bird_1 = '<?php echo $bird_1; ?>';
    var num_bird_2 = '<?php echo $bird_2; ?>';
    var num_bird_3 = '<?php echo $bird_3; ?>';
    var num_bird_4 = '<?php echo $bird_4; ?>';

    var appName = "<?php echo $appName; ?>";
    var baseLink = "http://test.tttang.net/zhoulejie/Durex/index.php";
    var para = "";

    var wxConfig = {
        debug:false,
        appId: '<?php echo $signPackage["appId"]; ?>',
        timestamp: '<?php echo $signPackage["timestamp"]; ?>',
        nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
        signature: '<?php echo $signPackage["signature"]; ?>',
        jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareQZone",
            "getLocation"
        ]
    };

    // var textArr = [
    //     '七夕，出门玩我。'
    // ];
    var textArr = [
        'Take a day off and spend with him/her outdoor'
    ];


    var Game = function() {

        this.baseUrl = '';

        this.gameLoadCount   = 0;
        this.gameLoadedCount = 0;

        this.isMusicOpened = true;

        //用户当前位置 百度坐标
        this.lng = 116.4058666700;
        this.lat = 39.9427361100;

        this.hasUpdateUserLocation      = true;
        this.hasUpdateOtherUserLocation = true;
        this.hasUpdateBirdLocation      = true;

        this.otherUserArr = [];
        this.birdArr      = [];

        this.globalNumArr = [0, 0, 0];
        this.myBirdNumArr = [Number(num_bird_1), Number(num_bird_2), Number(num_bird_3), Number(num_bird_4)];

        //如果不是第一次玩 设置性别 'boy'||'girl' 赋值之后会直接进入游戏场景
        this.mySex = Number(role);

        this.catchRangeRadius = 0;

        this.catchDistance = 100;

        this.gamer = null;

        this.canCatch = true;

        this.minDistanceBird = null;

        this.showFlowerInAndroid = false;

        this.mapLoaded = false;

        this.mapInitFinish =false;

        this.compassAngle = -1;

        this.hasAllowedGetPosition = false;
    };

    Game.prototype = {
        //加载进度回调
        loadPercentCallback: function(count, loadedCount) {
            console.log('加载进度 : ' + loadedCount + ' / ' + count);
            this.gameLoadCount   = count;
            this.gameLoadedCount = loadedCount;
            this.updateLoader();
        },

        //加载完成回调
        loadFinishCallback: function() {
            console.log('加载完成');
            if(this.mapLoaded) {
                var self = this;

                var storage = window.localStorage;
                if(storage.getItem('hasAllowedGetPosition') === null){
                    storage.setItem('hasAllowedGetPosition',0);
                }else {
                    this.hasAllowedGetPosition = storage.getItem('hasAllowedGetPosition') === '1';
                }


                this.sound = new Sound(this.baseUrl, ['music_bg','effect_button','effect_bird']);
                this.sound.initSound();
                this.sound.audios['music_bg'].autoplay = true;
                this.sound.audios['music_bg'].loop     = true;

                wx.config(wxConfig);

                wx.ready(function () {
                    console.log('ready');

                    var shareText = textArr[Math.floor(Math.random()*textArr.length)];

                    game.setShare('Durex Go',shareText);

                    game.checkPositionAuthorize();
                });
                wx.error(function(res){
                    console.log(res);
                });

                this.start();

                var bg = document.getElementById('loading_bg').cloneNode(true);
                document.getElementById('map').appendChild(bg);
            }else {
                setTimeout(game.loadFinishCallback.bind(game), 300);
            }
        },

        //场景初始化结束回调
        initFinishCallback: function() {
            console.log('初始化结束');

            document.getElementById('loading').style.display = 'none';

            _smq.push(['custom','杜蕾斯七夕喜鹊','游戏开始页','PV']);
            game.log(appName + "_init");
        },

        //开始
        start: function() {
        },

        //开始游戏回调
        startGameCallback: function() {
            console.log('开始游戏');

            if(this.hasAllowedGetPosition) {
                game.initMap();
                _smq.push(['custom','杜蕾斯七夕喜鹊','游戏页','PV']);
                game.log(appName + "_start");
            }else {
                setTimeout(game.startGameCallback.bind(game), 300);
            }
        },

        //更新加载进度
        updateLoader: function() {
            var percent = this.gameLoadedCount / this.gameLoadCount;
        },

        //播放音乐
        playMusic: function(id) {
            if (this.isMusicOpened) {
                this.sound.playMusic(id);
            }
        },

        //暂停播放
        pauseMusic: function(id) {
            this.sound.pauseMusic(id);
        },

        //播放音效
        playEffect: function(id) {
            if (this.isMusicOpened) {
                this.sound.playEffect(id);
            }
        },

        //统计
        log: function(_name, attr) {
            /*
             统计项
             调用示例:
             log("appName_score",{score:123});
             */
            if (!attr) {
                attr = {};
            }
            if (AV && !AVInit) {
                analytics = AV.analytics({
                    appId:   "D1WK0bubG5u9CcPWsyg3CgaE-gzGzoHsz",
                    appKey:  "wjdKeqeKE1t0ouFdldTTSRIe",
                    version: "1.8.6",
                    channel: "h5_buyansu"
                });
                analytics.send({
                            event:    _name,
                            attr:     attr,
                            duration: 1000
                        },
                        function(result) {
                            console.log("init success");
                        });
                AVInit = true;
            } else if (AV) {
                analytics.send({
                    event:    _name,
                    attr:     attr,
                    duration: 1000
                }, function(result) {
                    console.log("send success");
                });
            }
        },

        //设计分享语
        setShare: function(title, text) {
            $.SetShare(
                title,
                text,
                baseLink + para,


                function() {
                    //share timeline callback
                    game.log(appName + "_time");
                    _smq.push(['custom','杜蕾斯七夕喜鹊','分享','分享到朋友圈']);

                },
                function() {
                    //share friend callback
                    game.log(appName + "_friend");
                    _smq.push(['custom','杜蕾斯七夕喜鹊','分享','分享给好友']);
                }
            );
        },

        //检查是否获得授权
        checkPositionAuthorize: function (callback) {
            console.log("检查是否获得授权");
            wx.getLocation({
                type:"wgs84",
                success:function(res){
                    console.log("定位");
                    game.hasAllowedGetPosition = true;
                    window.localStorage.setItem('hasAllowedGetPosition',1);
                    if(callback) callback();
                },
                cancel:function(res){
                    game.hasAllowedGetPosition = false;
                    window.localStorage.setItem('hasAllowedGetPosition',0);
                    if(callback) callback();
                }
            });
        },
        //授权提示页回调
        locationTipLayerCallback: function(callback) {
            this.checkPositionAuthorize(function () {
                //获取成功与否都显示提示页
                if(callback) callback();
            });
        },

        startUpdateLocation: function () {
            setInterval(function(){
                wx.getLocation({
                    type:"wgs84",
                    success:function(_res){
                        game.updateUserLocation(_res.longitude,_res.latitude);
                    }
                });
            },2000);
        },

        //选择性别回调 'boy' : 1 || 'girl' : 2
        chooseSexCallback: function(sex) {
            $.get("../../go/api/setRole",{
                role: sex
            });

            game.mySex = sex;

            _smq.push(['custom','杜蕾斯七夕喜鹊','游戏开始页','GO']);
        },

        initMap: function () {
          //  console.log('在这里引入的地图的嘛？')
            wx.getLocation({
                type:"wgs84",
                success:function(_res){
                    game.map = new Map(15, 17);
                    game.map.centerAndZoom(_res.longitude,_res.latitude, 17, false, function() {
                        game.lat = game.map.center.lat;
                        game.lng = game.map.center.lng;

                        game.map.initListener();
                        if(game.mySex >= 1) {
                            game.setGamer(game.mySex);
                        }

                        game.startUpdateLocation();
                        console.log('再次更新')
                        game.updateBird();
                        // game.updateBirdStatus();
                        setInterval(function(){
                            game.updateBirdStatus();
                        },300);

                        game.mapInitFinish = true;

                        console.log('initMap finish');
                    });
                }
            });
        },


        setGamer: function (sex) {
            var type = sex === 1 ? 'boy' : 'girl';
            if(!this.gamer) {
                this.gamer = this.map.addOverlay('gamer',this.lng,this.lat,type);
            }
        },

        //回到原位
        pressBackButtonCallback: function() {
            if(!this.map) {
                console.log('map not init');
                return;
            }

            this.map.centerAndZoom(this.lng, this.lat, 17, true);

            game.updateBird();
            game.updateOtherUserLocation();
        },

        pressRefreshButtonCallback: function () {
            window.location.href = "http://test.tttang.net/zhoulejie/Durex/index.php";
        },

        pressCatchButtonCallback: function(callback) {
            if(this.canCatch && game.minDistanceBird) {
                this.canCatch = false;

                var bird = game.minDistanceBird;
                var birdType = bird.type;
                var type = Number(birdType.charAt(birdType.length - 1));
                console.log(bird.position);
                $.get("../../go/api/catch",{
                    fid: bird.fid,
                    type:type,
                    lat:game.lat,
                    long:game.lng,
                    b_lat:bird.position.lat,
                    b_long:bird.position.lng,
                    key:bird.key
                },function(res){
                    var msg = JSON.parse(res);
                    game.canCatch = true;

                    for(var i = 0; i < game.birdArr.length; i++) {
                        var birdTemp = game.birdArr[i];
                        if(birdTemp.key === bird.key) {
                            game.birdArr.splice(i, 1);

                            var code = msg.code;

                            bird.status = -1;

                            game.playEffect('effect_bird');

                            if(code === 10001) {
                                if(isAndroid) {
                                    bird.setBg('success');
                                }else {
                                    bird.bg.className = 'shake';
                                    setTimeout(function () {
                                        bird.setBg('success');
                                        bird.bg.className = '';
                                    }, 500);
                                }

                                game.myBirdNumArr[type - 1]++;
                            }

                            if(code >= 1 && code <= 8) {
                                if(isAndroid) {
                                    bird.setBg('fail');
                                }else {
                                    bird.bg.className = 'shake';
                                    setTimeout(function () {
                                        bird.setBg('fail');
                                        bird.bg.className = '';
                                    }, 500);
                                }
                            }

                            //进化失败
                            if(code >= 10007 &&code <= 10009) {
                                game.myBirdNumArr[type - 1] = 0;
                                if(isAndroid) {
                                    bird.setBg('success');
                                }else {
                                    bird.bg.className = 'shake';
                                    setTimeout(function () {
                                        bird.setBg('success');
                                        bird.bg.className = '';
                                    }, 500);
                                }
                                callback(type,false,msg.data);
                            }

                            //进化成功
                            if(code === 10000) {
                                game.myBirdNumArr[type - 1] = 0;
                                if(isAndroid) {
                                    bird.setBg('success');
                                }else {
                                    bird.bg.className = 'shake';
                                    setTimeout(function () {
                                        bird.setBg('success');
                                        bird.bg.className = '';
                                    }, 500);
                                }
                                callback(type,true,msg.data);
                                _smq.push(['custom','杜蕾斯七夕喜鹊','游戏结束页','领奖品']);
                            }

                            setTimeout(function () {
                                bird.destroy();
                            }, 1000);
                            break;
                        }
                    }

                    // game.minDistanceBird = null;
                });
            }
        },

        //进化成功回调
        evolutionSuccessCallback: function (type,data) {
            window.location.href = 'http://test.tttang.net/zhoulejie/Durex/index.php/redirect?fid='+data.fid+'&key='+data.key;
        },

        getBird: function (location,callback) {
            console.log('在这里获取鸟的位置')
        //    var bounds = game.map.map.getBounds();
         //   var diffY  = bounds.lat.maxY - bounds.lat.minY;

            $.get("../../go/api/getBird",{
                lat:location.lat,
                long:location.lng,
                distance:1000
            },function(res){
                var msg = JSON.parse(res);
                if(msg.code === 10001) {
                    callback(msg.data);
                }
            });
        },

        //更新地图中的喜鹊
        updateBird: function() {
            console.log('更新地图中的喜鹊第一层');
            if(this.hasUpdateBirdLocation) {
                this.hasUpdateBirdLocation = false;
                console.log('hasUpdateBirdLocation更新地图中的喜鹊第二层');
                console.log(this.getBird)

                this.getBird(this.map.center,function (points) {

                    var birdArrTemp = game.birdArr.concat();
                    for(var i = 0; i < points.length; i ++) {
                        var birdi = points[i];

                        var temp = true;
                        for(var j = 0; j < birdArrTemp.length; j++) {
                            var birdj = birdArrTemp[j];
                            if (birdi.key === birdj.key) {
                                birdj.updateCenter(new qq.maps.LatLng(birdi.lat,birdi.long));
                                birdArrTemp.splice(j,1);
                                temp = false;
                                break;
                            }
                        }

                        if(temp) {
                            console.log('添加小鸟层')
                            var birdOverlay = game.map.addOverlay(birdi.key,birdi.long,birdi.lat,'bird_'+birdi.type);
                            birdOverlay.fid = birdi.fid || 0;
                            game.birdArr.push(birdOverlay);

                        }

                    }

                    for(var n = 0; n< birdArrTemp.length; n++) {
                        var birdn = birdArrTemp[n];
                        for(var k = 0; k < game.birdArr.length; k++) {
                            var birdk = game.birdArr[k];
                            if (birdn.key === birdk.key) {
                                birdk.destroy();
                                birdk = null;
                                game.birdArr.splice(k,1);
                                break;
                            }
                        }
                    }

                    game.hasUpdateBirdLocation = true;
                });
            }

        },

        updateBirdStatus: function () {
            game.globalNumArr[1] = game.birdArr.length;

            var minDistance = game.catchDistance;

            for(var t = 0; t < game.birdArr.length; t++) {
                var birdT = game.birdArr[t];
                if(birdT.status === -1) break;
                if(birdT.status) birdT.changeTip(false);
                var position = birdT.position;
                var distance = game.map.getDistance(position.lng,position.lat,game.lng,game.lat);
                if(distance < minDistance){
                    minDistance = distance;
                    game.minDistanceBird = birdT;
                }
            }

            if(game.minDistanceBird) {
                game.minDistanceBird.changeTip(true);
            }

            // setTimeout(this.updateBirdStatus.bind(this), 300);
        },

        //更新玩家位置
        updateUserLocation: function(lng,lat) {
            var self = this;

            if (this.hasUpdateUserLocation) {
                this.hasUpdateUserLocation = false;
                var point                  = new qq.maps.LatLng(lat, lng);
                this.map.translate(point, function(data) {
                    var point0 = data[0];
                    self.lng   = point0.lng;
                    self.lat   = point0.lat;

                    self.hasUpdateUserLocation = true;

                    if(self.gamer) self.gamer.updateCenter(point0);

                    $.get("../../go/api/setGeoPoint",{
                        lat:game.lat,
                        long:game.lng
                    });
                });
            }
        },

        getNearPlayer: function (location,callback) {
            var bounds = game.map.map.getBounds();
            var diffY  = bounds.lat.maxY - bounds.lat.minY;

            $.get("../../go/api/getNearPlayer",{
                lat:location.lat,
                long:location.lng,
                distance:diffY/2
            },function(res){
                var msg = JSON.parse(res);
                if(msg.code === 10001) {
                    callback(msg.data);
                }
                // callback(JSON.parse(res));
            });
        },

        //更新其他玩家的位置
        updateOtherUserLocation: function() {
            console.log('更新其他玩家的位置')
            if (this.hasUpdateOtherUserLocation) {
                this.hasUpdateOtherUserLocation = false;
                this.getNearPlayer(this.map.center,function (res) {
                    game.hasUpdateOtherUserLocation = true;

                    game.globalNumArr[0] = res.count;

                    var points = res.players;
                    var otherArrTemp = game.otherUserArr.concat();

                    for(var i = 0; i < points.length; i ++) {
                        var otherI = points[i];

                        var temp = true;
                        for(var j = 0; j < otherArrTemp.length; j++) {
                            var otherJ = otherArrTemp[j];
                            if (otherI.key === otherJ.key) {
                                otherJ.updateCenter(new qq.maps.LatLng(otherI.lat,otherI.long));
                                otherArrTemp.splice(j,1);
                                temp = false;
                                break;
                            }
                        }

                        if(temp) {
                            console.log('boy/girl_other');
                            var type = otherI.role == 1? 'boy_other' : 'girl_other';
                            var otherOverlay = game.map.addOverlay(otherI.key,otherI.long,otherI.lat,type);
                            game.otherUserArr.push(otherOverlay);
                        }

                    }

                    for(var n = 0; n< otherArrTemp.length; n++) {
                        var otherN = otherArrTemp[n];
                        for(var k = 0; k < game.otherUserArr.length; k++) {
                            var otherK = game.otherUserArr[k];
                            if (otherN.key === otherK.key) {
                                otherK.destroy();
                                otherK = null;
                                game.otherUserArr.splice(k,1);
                                break;
                            }
                        }
                    }
                });
            }
        },

        //更新某玩家的位置
        updateOtherUserLocationByKey: function(userKey, location) {
            console.log('更新某玩家的位置')
            for (var i = 0; i < this.otherUserArr.length; i++) {
                var otherUser = this.otherUserArr[i];
                if (otherUser.key === userKey) {
                    var latLng = qq.maps.LatLng(location.lat,location.long);
                    otherUser.updateCenter(latLng);
                    break;
                }
            }
        },

        //获取两坐标点之间距离
        getDistance: function(lng1, lat1, lng2, lat2) {
            return this.map.getDistance(lng1, lat1, lng2, lat2);
        },

        //显示表单层
        showInputLayer: function(data) {

            var ratioH = window.innerHeight / 1008;

            var input_bg              = loader.imageArr['images/input_bg.png'].img;
            input_bg.id               = 'input_bg';
            input_bg.className        = 'input';
            input_bg.style.width      = 510 * ratioH + 'px';
            input_bg.style.height     = 344 * ratioH + 'px';
            input_bg.style.marginLeft = -510 / 2 * ratioH + 'px';
            input_bg.style.marginTop  = -344 / 2 * ratioH + 'px';

            var input_button_confirm              = loader.imageArr['images/button_input_confirm.png'].img;
            input_button_confirm.id               = 'input_button_confirm';
            input_button_confirm.className        = 'input';
            input_button_confirm.style.width      = 105 * ratioH + 'px';
            input_button_confirm.style.height     = 54 * ratioH + 'px';
            input_button_confirm.style.marginLeft = -(105 / 2 + 130) * ratioH + 'px';
            input_button_confirm.style.marginTop  = -(54 / 2 - 110) * ratioH + 'px';

            var input_button_give_up              = loader.imageArr['images/button_input_give_up.png'].img;
            input_button_give_up.id               = 'input_button_give_up';
            input_button_give_up.className        = 'input';
            input_button_give_up.style.width      = 105 * ratioH + 'px';
            input_button_give_up.style.height     = 54 * ratioH + 'px';
            input_button_give_up.style.marginLeft = -(105 / 2 - 130) * ratioH + 'px';
            input_button_give_up.style.marginTop  = -(54 / 2 - 110) * ratioH + 'px';

            var input_name              = document.getElementById('input_name');
            input_name.style.width      = 260 * ratioH + 'px';
            input_name.style.height     = 35 * ratioH + 'px';
            input_name.style.marginLeft = -80 * ratioH + 'px';
            input_name.style.marginTop  = -127 * ratioH + 'px';
            input_name.style.fontSize   = 24 * ratioH + 'px';

            var input_address              = document.getElementById('input_address');
            input_address.style.width      = 260 * ratioH + 'px';
            input_address.style.height     = 35 * ratioH + 'px';
            input_address.style.marginLeft = -80 * ratioH + 'px';
            input_address.style.marginTop  = -75 * ratioH + 'px';
            input_address.style.fontSize   = 24 * ratioH + 'px';

            var input_code              = document.getElementById('input_code');
            input_code.style.width      = 260 * ratioH + 'px';
            input_code.style.height     = 35 * ratioH + 'px';
            input_code.style.marginLeft = -80 * ratioH + 'px';
            input_code.style.marginTop  = -24 * ratioH + 'px';
            input_code.style.fontSize   = 24 * ratioH + 'px';

            var input_phone              = document.getElementById('input_phone');
            input_phone.style.width      = 260 * ratioH + 'px';
            input_phone.style.height     = 35 * ratioH + 'px';
            input_phone.style.marginLeft = -80 * ratioH + 'px';
            input_phone.style.marginTop  = 29 * ratioH + 'px';
            input_phone.style.fontSize   = 24 * ratioH + 'px';

            var input = document.getElementById('input');
            input.appendChild(input_bg);
            input.appendChild(input_button_confirm);
            input.appendChild(input_button_give_up);

            input.style.display = 'block';

            input_button_give_up.addEventListener('touchstart', function(event) {
                event.preventDefault();
                document.getElementById('input_bg').remove();
                document.getElementById('input_button_confirm').remove();
                document.getElementById('input_button_give_up').remove();
                document.getElementById('input').style.display = 'none';

                _smq.push(['custom','杜蕾斯七夕喜鹊','游戏结束页','放弃']);
            }, true);

            input_button_confirm.addEventListener('touchstart', function(event) {
                event.preventDefault();
                game.pressInputConfirmButtonCallback(data);
                _smq.push(['custom','杜蕾斯七夕喜鹊','游戏结束页','决定']);
            }, true);
        },

        //点击表单层确认按钮回调
        pressInputConfirmButtonCallback: function(data) {
            var name    = document.getElementById('input_name').value;
            var address = document.getElementById('input_address').value;
            var code    = document.getElementById('input_code').value;
            var phone   = document.getElementById('input_phone').value;

            $.get("../../go/api/submit",{
                key:data.key,
                id:data.id,
                name:name,
                mobile:phone,
                address:address,
                zip: code
            },function(res){
                var msg = JSON.parse(res);

                if (msg.code === 10001) {
                    document.getElementById('input_bg').remove();
                    document.getElementById('input_button_confirm').remove();
                    document.getElementById('input_button_give_up').remove();
                    document.getElementById('input').style.display = 'none';
                    window.alert('提交成功');
                }else {
                    window.alert(msg.message);
                }
            });
        },

        zoomEndCallback: function() {
            this.gamer.updateCaptureRange();
        },

        mapIdleCallback: function () {
            game.updateBird();
            game.updateOtherUserLocation();
        },

        scaleFinishCallback: function(scale) {
            if(scale > 1.5) {
                this.map.map.zoomBy(1);
            }else if(scale < 0.6) {
                this.map.map.zoomBy(-1);
            }
        }
    };

    var game = new Game();

    function mapLoaded () {
        console.log('map loaded');
        game.mapLoaded = true;
    }

    if (window.DeviceOrientationEvent) {//返回一个DeviceOrientationEvent对象
        window.addEventListener('deviceorientation', DeviceOrientationHandler, false);///添加监听事件
    }

    function DeviceOrientationHandler(event) {
        var alpha = event.alpha; //Z轴方向
        if (alpha != null) {
            game.compassAngle = Math.floor(alpha);
        }
    }
</script>
<script src="frameworks/cocos2d-html5/CCBoot.js"></script>
<script cocos src="main.js"></script>
<script src="js/loader.js"></script>

</body>
</html>