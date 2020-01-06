var Touch=function () {
    this.zhenID=null;
    this.videoID=null;
    this.hasMove=true;//第一次晃动
    this.canDraw=true;//是绘画还是清除
    this.intoVideo=false;
    this.base64=null;//保存选择的头像
    this.head=new Image();
    this.video_index=0;
    this.imageKey=null;//上传到cdn后的图片名字
    this.radio=height/1008;
    this.hasShare();
    this.initControl();//按钮控制
};
Touch.prototype={
    hasShare:function () {
        var _this=this;
        function getNetworkType(callback) {
            if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                WeixinJSBridge.invoke('getNetworkType', {}, function (res) {
                    callback && callback();
                });
            }
        }
        var hasShare=false;
        var url =window.location.href;
        if(url.indexOf("?")>=0&&url.indexOf("&")>=0){
            url=url.split("?")[1].split("&");
            var num=0;
            for(var i=0;i<url.length;i++){
                url[i]=url[i].split("=");
                if(url[i][0]=="shareImg"){
                    num++;
                    h5_config.shareImg=url[i][1];
                }else if(url[i][0]=="shareVideo"){
                    num++;
                    h5_config.shareVideo=url[i][1];
                }
            }
            if(num==2){
                hasShare=true;
            }
        }
        musicArr[7].on('load', function () {
            getNetworkType(function () {
                if(hasShare==false){
                    musicArr[7].play();
                }
            })
        });
        if(hasShare){
            //获取分享者的信息
            this.head.src="http://userimg.720star.com/"+h5_config.shareImg;
            $(_this.head).attr("id","videoPhoto").appendTo($("#videoImg"));
            this.head.onload=function () {
                $("#page_1").css("display","none");
                $("#page_12").css("display","block");
                $("#videoBox").css("display","block");
                getNetworkType(function () {
                    musicArr[h5_config.shareVideo].play();
                });
                _this.frameVideo(h5_config.shareVideo-1);
            };


        }else{
            this.init();
        }
    },
    init:function (){
        var _this=this;
        $("#page_1").css("display","block");
        $("#swicth").css("display","block");
        function getNetworkType(callback) {
            if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                WeixinJSBridge.invoke('getNetworkType', {}, function (res) {
                    callback && callback();
                });
            }
        }
        getNetworkType(function () {
            musicArr[7].play();
        });
        var swicth=document.getElementById('swicth');
        swicth.addEventListener("touchend",function (event) {
            var target=event.target.id;
            if(target=='music_on'){
                $("#music_off").css("display","block");
                for(var i=0;i<musicArr.length;i++){
                    musicArr[i].volume(0);
                }

            }else if(target=='music_off'){
                $("#music_off").css("display","none");
                for(var i=0;i<musicArr.length;i++){
                    musicArr[i].volume(1);
                }
            }
        });
        $("#water").css("top","1008px")
            .animate({"top":"900px"},2000);
        //切换字体文案
        var startTime=new Date().getTime();
        time();
        function time() {
            var endTime=new Date().getTime();
            if(endTime-startTime>2000){
                $(".shake1").css("display","none");
                $(".shake2").css("display","block");
                _this.wagglePhpne();//晃动手机
            }else {
                requestAnimationFrame(time);
            }
        }

    },
    initControl:function () {
        var _this=this;
        //注册文件选择器
        var inputImage = document.querySelector('#input_image');
        inputImage.onchange = function () {
            lrz(this.files[0])
                .then(function (results) {
                    // 处理成功会执行
                    _this.base64=results.base64;
                    $("#page_13").css("display","block");
                    $(".photo_3").css("display","block");
                    setTimeout(function () {
                        $("#page_13").css("display","none");
                        $(".photo_3").css("display","none");

                        $("#page_3").css("display","none");
                        $("#page_4").css("display","block");
                        $(".inputImage").css("display","none");
                        //打开调整图片
                        var img=new Image();
                        img.src=_this.base64;
                        img.onload=function () {
                            _this.adjuctHead(img);
                        }
                    },500);
                })
                .catch(function (err) {
                    // 处理失败会执行
                    console.log('获取图片失败');
                })
                .always(function () {
                    // 不管是成功失败，都会执行

                });
        };
        //模拟点击
        function getNetworkType(callback) {
            if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                WeixinJSBridge.invoke('getNetworkType', {}, function (res) {
                    callback && callback();
                });
            }
        }
        function playBut() {
            getNetworkType(function () {
                musicArr[6].play();//晃动
                setTimeout(function () {
                    musicArr[6].pause();
                },100)
            });
        }
        var box=document.getElementById('box');
        box.addEventListener("touchstart",function (event) {event.preventDefault();});
        box.addEventListener("touchmove",function (event) {event.preventDefault();});
        box.addEventListener("touchend",function (event) {
            event.preventDefault();
            var id=event.target.id;
            var uploadWay;
            if(event.changedTouches.length==1){
                switch (id){
                    //开始页面
                    //我不嗨心
                    case "startBut":(function () {playBut();$(".inputImage").css("display","block");cancelAnimationFrame(_this.zhenID);
                        $("#page_1").css("display","none");$("#page_2").css("display","none");$("#page_3").css("display","block");
                    })();break;
                    //选择头像界面
                    //去画头像
                    case "drawPhoto":(function () {playBut();$(".inputImage").css("display","none");
                        $("#page_3").css("display","none");$("#page_6").css("display","block");})();break;
                    //完成上传
                    case "finishPhoto":(function () {playBut();$(".inputImage").css("display","none");
                        //将上传的图片作为头像，替换page_7的头像图片
                        $("#sevenPhoto").attr("src",_this.base64);
                        _this.head.src=_this.base64;
                        if(_this.base64==null){
                            alert("请选择头像。");
                            $(".inputImage").css({"border-radius":"50px"}).css("display","block");
                        }else{
                            uploadWay="choose";
                            //将头像上传都七牛云
                            $("#page_13").css("display","block");
                            $(".photo_2").css("display","block");
                            /*_this.getToken(function () {*/
                                $("#page_13").css("display","none");
                                $(".photo_2").css("display","none");
                                $("#startDraw").css("display","block");
                                $("#page_3").css("display","none");
                                $("#page_7").css("display","block");
                                _this.intoVideo=true;
                           /* });*/
                        }

                    })();break;
                    //绘画界面
                    //开始绘画
                    case "startDraw":(function () {playBut();$("#startDraw").css("display","none");
                        _this.canvasDraw();})();break;
                    //选择笔
                    case "draw":(function () {playBut();_this.canDraw=true;})();break;
                    //清除
                    case "clear":(function () {playBut();_this.canDraw=false;})();break;
                    //画好了
                    case "finishDraw":(function () {
                        playBut();
                        uploadWay="draw";
                        var canvas=document.getElementById('canvas');
                        _this.base64=canvas.toDataURL("image/png");
                        _this.head.src=_this.base64;
                        //将base64格式图片转化成文件上传到七牛云
                        $("#page_13").css("display","block");
                        $(".photo_2").css("display","block");
                       /* _this.getToken(function () {*/
                            $("#page_13").css("display","none");
                            $(".photo_2").css("display","none");
                            $("#startDraw").css("display","block");
                            $("#page_6").css("display","none");
                            $("#page_8").css("display","block");
                            $(".drawPhoto").attr("src",_this.base64);//将画好的图片替换原来图片
                            _this.intoVideo=true;
                       /* });*/
                    })();break;
                    //去上传头像
                    case "toPhoto":(function () {playBut();$(".inputImage").css("display","block");
                        var canvas=document.getElementById('canvas');
                        var ctx=canvas.getContext('2d');
                        ctx.clearRect(0,0,canvas.width,canvas.height);
                        _this.base64=null;
                        $("#chooseEnd").attr("src","images/page_3_068.png");
                        $("#page_6").css("display","none");$("#page_3").css("display","block");})();break;
                    //头像生成后页面
                    //返回选取头像
                    case "backPhoto":(function () {playBut();$(".inputImage").css("display","block");
                        $("#chooseEnd").attr("src","images/page_3_068.png");
                        $("#page_3").css("display","block");$("#page_8").css("display","none");})();break;
                    //返回画头像
                    case "backDraw":(function () {playBut();$("#page_7").css("display","none");$("#page_6").css("display","block");})();break;
                    //对视频的操作
                    //喜欢这首歌
                    case "likeMusic":(function () {playBut();
                        //将生成的视频信息拼接到分享链接后面
                        h5_config.para="shareImg="+h5_config.shareImg+"&shareVideo="+_this.video_index+"";
                        //设置分享
                        wx.ready(function() {
                            var titleArr=['欢迎来到不嗨心治愈所！','抖抖抖抖抖抖，抖掉你的不嗨心','这游戏有毒，玩完这整个人都开心了'];
                            //var title2=""+h5_config.userName+"刚刚尬了一段舞，你看完不笑算我输！";
                            var title2="欢迎来到抖音不嗨心治愈所，抖掉你的小确丧~";
                            game.setShare('我那么美，却还是不开心',titleArr[Math.ceil(Math.random()*3)-1],title2,function () {
                                $("#videoBox").css("display","none");
                                $("#page_11").css("display","block")
                                _this.intoVideo=false;
                                var nowVideo=_this.video_index;
                                getNetworkType(function () {
                                    musicArr[nowVideo].pause();
                                    musicArr[0].play();
                                });
                            });
                        });
                        $("#page_10").css("display","block");
                    })();break;
                    //隐藏分享层
                    case "share":(function () {playBut();
                        //将生成的视频信息发送到后台
                        $("#page_10").css("display","none");
                    })();break;
                    //现在去嗨
                    case "toPlay":(function () {playBut();
                        console.log("跳转到抖音app");
                        location.href = 'https://www.douyin.com/share/video/6410695623053413634?dl=kbEg';
                    })();break;
                    //在试一次（上传失败）
                    case "retry":(function () {playBut();
                        $("#page_5").css("display","none");
                        if(uploadWay=="draw"){
                            _this.getToken(function () {
                                $("#page_13").css("display","none");
                                $(".photo_2").css("display","none");
                                $("#startDraw").css("display","block");
                                $("#page_6").css("display","none");
                                $("#page_8").css("display","block");
                                _this.intoVideo=true;
                            });
                        }else if(uploadWay=="choose"){
                            _this.getToken(function () {
                                $("#page_13").css("display","none");
                                $(".photo_2").css("display","none");
                                $("#startDraw").css("display","block");
                                $("#page_3").css("display","none");
                                $("#page_7").css("display","block");
                                _this.intoVideo=true;
                            });
                        }
                    })();break;
                    //打开是分享链接
                    //我也去嗨
                    case "myMake":(function () {playBut();
                        //将生成的视频信息发送到后台
                        getNetworkType(function () {
                            musicArr[h5_config.shareVideo].pause();
                        });
                        $("#page_12").css("display","none");
                        $("#videoBox").css("display","none");
                        //暂停视频和音乐
                        cancelAnimationFrame(_this.videoID);
                        _this.init();
                    })();break;
                }
            }

        });
    },
    adjuctHead:function (img) {
        //模拟点击
        function getNetworkType(callback) {
            if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                WeixinJSBridge.invoke('getNetworkType', {}, function (res) {
                    callback && callback();
                });
            }
        }
        function playBut() {
            getNetworkType(function () {
                musicArr[6].play();
                setTimeout(function () {
                    musicArr[6].pause();
                },100)
            });
        }
        var _this=this;
        //画个椭圆
        function ParamEllipse(context, x, y, a, b) {
            var step = (a > b) ? 1 / a : 1 / b;
            context.moveTo(x + a, y); //从椭圆的左端点开始绘制
            for (var i = 0; i < 2 * Math.PI; i += step)
            {
                context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
            }
            context.lineTo(x + a , y);
        }

        var imgWidth = img.width;
        var imgHeight = img.height;
        var curRatio = imgHeight > imgWidth ? 350 / imgWidth : 400 / imgHeight;
        //传入图片后的当前图片宽高
        var curImgWidth = imgWidth * curRatio;
        var curImgHeight = imgHeight * curRatio;
        var curImgLeft = -(curImgWidth - 350) / 2;
        var curImgTop = -(curImgHeight - 400) / 2;
        var startTop=curImgTop,startLeft=curImgLeft;
        $(img).css({
            width:curImgWidth,
            height:curImgHeight,
            top:345,
            left:141,
            "z-index":"-1",
            position:"absolute"
        }).addClass("chooseImg").appendTo($("#page_4"));
        var x=0,y=0;//canvas定位
        var canvasHead=document.getElementById("canvasPhoto");
        var ctxH=canvasHead.getContext("2d");
        ParamEllipse(ctxH,178,194.5, 176, 197);

        ctxH.rect(0,0,1,1);//没有这个不能剪切

        ctxH.stroke();
        ctxH.clip();
        ctxH.drawImage(img,x,y,imgWidth,imgHeight);
        //当前上传图片的宽度、高度
        var prevX,prevY,moveX,moveY;
        //记录缩放比例,如果高度大于宽度的话，图片的宽度为200，否则，图片的高度为200.
        ctxH.clearRect(0,0,canvasHead.width,canvasHead.height);//清空画布

        //记录 一个最小的缩放比，能上下移动值的范围
        var minRatio = curRatio;
        var minLeft = 348 - curImgWidth;
        var maxLeft = 0;
        var minTop = 390 - curImgHeight;
        var maxTop = 0;
        //记录上次两个手指间距（与现在这次做除法得到缩放比例）
        var lastDistance = 0;
        var box=document.getElementById('page_4');
        box.addEventListener("touchmove",function (event) {
            $(".chooseImg").css("display","none");
            moveX=event.changedTouches[0].clientX;
            moveY=event.changedTouches[0].clientY;
            var touches= event.touches;
            if(event.touches.length==1){
                moveX=touches[0].clientX;
                moveY=touches[0].clientY;
                if(prevY && prevX){
                    curImgLeft+=(moveX-prevX);
                    curImgTop+=(moveY-prevY);
                }
                ctxH.clearRect(0,0,canvasHead.width,canvasHead.height);//清空画布
                ctxH.drawImage(img,curImgLeft,curImgTop,curImgWidth,curImgHeight);//设置图片
                prevX=moveX;prevY=moveY;
            }else if(event.touches.length==2){
                var pos_0 = {
                    x: touches[0].clientX,
                    y: touches[0].clientY
                };
                var pos_1 = {
                    x: touches[1].clientX,
                    y: touches[1].clientY
                };
                //两个手指的距离用勾股定理求得
                var distance = Math.sqrt(Math.pow(pos_0.x - pos_1.x, 2) + Math.pow(pos_0.y - pos_1.y, 2));
                if (lastDistance <= 0) {
                    lastDistance = distance;
                } else {
                    var ratio = distance / lastDistance;
                    lastDistance = distance;
                    curRatio = Math.max(minRatio, ratio * curRatio);
                    var widthTemp = imgWidth * curRatio;
                    var heightTemp = imgHeight * curRatio;
                    var offsetW = widthTemp - curImgWidth;
                    var offsetH = heightTemp - curImgHeight;

                    minLeft = 200 - curImgWidth;
                    minTop = 200 - curImgHeight;

                    curImgWidth = widthTemp;
                    curImgHeight = heightTemp;

                    curImgLeft = Math.min(Math.max(curImgLeft - offsetW / 2, minLeft), maxLeft);
                    curImgTop = Math.min(Math.max(curImgTop - offsetH / 2, minTop), maxTop);
                    ctxH.clearRect(0,0,canvasHead.width,canvasHead.height);//清空画布
                    ctxH.drawImage(img,curImgLeft,curImgTop,widthTemp,heightTemp);
                }
            }
        });
        box.addEventListener("touchend",function (event) {
            prevX=null;prevY=null;
            lastDistance = 0;
            var domId=event.target.id;
            if(domId=="finishAdjust"){
                //选择好了
                playBut();
                ctxH.drawImage(img,curImgLeft,curImgTop,curImgWidth,curImgHeight);
                _this.base64=canvasHead.toDataURL("image/png");
                $("#chooseEnd").attr("src",_this.base64);
                $("#page_4").css("display","none");
                $("#page_3").css("display","block");
                _this.intoVideo=true;
            }else if(domId=="backStart"){
                playBut();
                ctxH.drawImage(img,startTop,startLeft,imgWidth * curRatio,imgHeight * curRatio);
            }
        });
    },
    canvasDraw:function () {
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
            this.beginPath();
            this.moveTo(x+r, y);
            this.arcTo(x+w, y, x+w, y+h, r);
            this.arcTo(x+w, y+h, x, y+h, r);
            this.arcTo(x, y+h, x, y, r);
            this.arcTo(x, y, x+w, y, r);
            this.closePath();
            return this;
        };
        var canvas=document.getElementById('canvas');
        //canvas.style.borderRadius="50px";

        var ctx=canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle="#ffefd2";
        ctx.roundRect(0,0,canvas.width,canvas.height,50);
        ctx.fill();

        ctx.lineWidth = 6;
        var _this=this;
        var X=(parseInt($("#canvas").css("left"))-(640-width/(height/1008))/2);
        var Y=parseInt($("#canvas").css("top"));
        ctx.strokeStyle="#000000";
        var startX,startY,moveX,moveY;
        canvas.addEventListener("touchstart",function (event) {
            event.preventDefault();
            startX=event.changedTouches[0].clientX/(height/1008);
            startY=event.changedTouches[0].clientY/(height/1008);
            if(_this.canDraw){
                ctx.beginPath();
                ctx.moveTo(startX-X,startY-Y);
            }
        });
        canvas.addEventListener("touchmove",function (event) {
            event.preventDefault();
            moveX=event.changedTouches[0].clientX/(height/1008);
            moveY=event.changedTouches[0].clientY/(height/1008);
            if(_this.canDraw){
                ctx.lineTo(moveX-X,moveY-Y);
                ctx.stroke();
            }else{
                ctx.rect(moveX-X-10,moveY-Y-10,20,20);
                ctx.fill();
                ctx.save();
            }
            startX=moveX;startY=moveY;
        });
        canvas.addEventListener("touchend",function (event) {
            event.preventDefault();
            ctx.closePath();
        });

    },
    // 获取token
    getToken: function (callback) {
        var self = this;
        $.get("../../api/getUploadToken/", {
            name     : h5_config.name,
            key      : h5_config.key,
            ukey     : h5_config.ukey,
            timestamp: h5_config.timestamp,
            nonce    : h5_config.nonce,
            data     : {}
        }, function (res) {
            res      = JSON.parse(res);
            var code = res.code;
            console.log(res);
            if (code == 10000) {
                var key   = res.data.key;
                var token = res.data.token;
                self.uploadImage(key, token, callback);
            } else {
                // 上传失败
                callback && callback(0);
            }
        });
    },
    // 图片转blob
    dataURLtoBlob: function (dataUrl) {
        console.log(1);
        var arr   = dataUrl.split(','),
            mime  = arr[0].match(/:(.*?);/)[1],
            bstr  = atob(arr[1]),
            n     = bstr.length,
            u8arr = new Uint8Array(n);
            console.log(2);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        console.log(3);
        return new Blob([u8arr], {type: mime});
    },
    // 上传头像
    uploadImage: function (key, token, callback) {
        var self     = this;
        var blob     = this.dataURLtoBlob(this.base64);
        console.log(4);
        var formData = new FormData();

        formData.append("key", 'douyin-2/' + key + '.png');
        formData.append("token", token);
        //formData.append('file',self.head);
        formData.append('file', blob, key);
        $.ajax({
            url        : 'http://upload.qiniu.com/',  // Different bucket zone has different upload url, you can get right url by the browser error massage when uploading a file with wrong upload url.
            type       : 'POST',
            data       : formData,
            processData: false,
            contentType: false,
            xhr        : function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            var percent = e.loaded / e.total * 100;
                        }
                    }, false);
                }
                return myXhr;
            },
            success    : function (res) {
                console.log("成功：" + JSON.stringify(res));//从一个对象解析出字符串
                h5_config.shareImg=res.key;
                //game.log(h5_config.appName + "_upLoadImg_succeed");//进入H5
                callback && callback(0);
            },
            error      : function (res) {
                console.log("失败:" + JSON.stringify(res));
               // game.log(h5_config.appName + "_upLoadImg_fail");//进入H5
                $("#page_5").css("display","block");
            }
        });


    },
    wagglePhpne:function () {
        //模拟点击
        function getNetworkType(callback) {
            if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                WeixinJSBridge.invoke('getNetworkType', {}, function (res) {
                    callback && callback();
                });
            }
        }
        //晃动手机切换页面
        var _this=this;
        var SHAKE_THRESHOLD = 1000;
        var last_update = 0;
        var x, y, z, last_x = 0, last_y = 0, last_z = 0;
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', function (event) {
                var acceleration = event.accelerationIncludingGravity;
                var curTime = new Date().getTime();
                if ((curTime-last_update)> 100) {
                    var diffTime = curTime -last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
                    if (speed > SHAKE_THRESHOLD) {
                        if(_this.hasMove){
                            getNetworkType(function () {
                                musicArr[7].pause();
                                musicArr[5].play();//晃动
                                setTimeout(function () {
                                    musicArr[5].pause();
                                },800)
                            });
                            $("#water").animate({'top':"-100px"},5000,"linear");
                            var startTime=new Date().getTime();
                            time1();
                            function time1() {
                                var endTime=new Date().getTime();
                                if(endTime-startTime>3000){
                                    getNetworkType(function () {
                                        musicArr[0].play();
                                    });
                                    _this.frameMove("shou",4,200);
                                    $("#page_2").css({
                                        top:1608,
                                        "display":"block"
                                    }).animate({'top':"0px"},5000,"linear");
                                    $(".cloud_1").css({
                                        left:-320
                                    }).animate({'left':"-96px"},5000,"linear");
                                    $(".cloud_2").css({
                                        left:640
                                    }).animate({'left':"384px"},5000,"linear");
                                }else {
                                    requestAnimationFrame(time1);
                                }
                            }
                            _this.hasMove=false;
                        }else if(_this.intoVideo){
                            _this.intoVideo=false;
                            getNetworkType(function () {
                                musicArr[5].play();//晃动
                                setTimeout(function () {
                                    musicArr[5].pause();
                                },800)
                            });
                            $("#page_7").css("display","none");
                            $("#page_8").css("display","none");
                            //切换到视频播放
                            if(_this.video_index<4){
                                $("#videoBox").css("display","block");
                                console.log(_this.video_index);
                                getNetworkType(function () {
                                    musicArr[_this.video_index-1].pause();//暂停背景音乐
                                    musicArr[_this.video_index].play();//播放背景音乐
                                });
                                _this.videoContorl();
                               // game.log(h5_config.appName + "_playVideo_"+(_this.video_index+1));//进入H5
                            }else if(_this.video_index==4){
                                $("#videoBox").css("display","none");
                                $("#page_11").css("display","block");
                                getNetworkType(function () {
                                    musicArr[4].pause();
                                    musicArr[0].play();
                                });
                            }
                        }
                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            }, false);
        }
    },
    videoContorl:function () {
        var _this=this;
        $("#videoBox").css("display","block");
        if(this.video_index==0){
            $("#page_7").css("display","none");
            $("#page_8").css("display","none");
            $("#page_9").css("display","block");
        }
        this.frameVideo(this.video_index);//播放视频帧动画
        setTimeout(function () {
            _this.intoVideo=true;
        },3000);
        this.video_index++;
    },
    frameVideo:function (index) {
        $("#videoImg").html("");
        /*if($("#videoImg")){
         $(this.head).attr("id","videoPhoto").appendTo($("#videoImg"));
         }*/
        var _this=this;
        var videoPhoto1=this.head.cloneNode();
        var videoPhoto2=this.head.cloneNode();

        var frameAll=videoArr[index];
        var imgLoca=videoConfig[index];
        var startTime=new Date().getTime();
        videoMove();
        function videoMove(){
            var nowTime=new Date().getTime();
            var i=Math.ceil((nowTime-startTime)/(1000/12))-1;
            if(i>124){
                $("#video").html("");
                startTime=nowTime;
            }
            if(i>=0 && i<=124){
                //视频
                var img=frameAll[i];
                $("#video").html("").append($(img));
                //头像
                var j=i*2;
                var locArr=imgLoca[j];
                if(locArr){
                    var pointArr=_this.getCenter(locArr);
                    if(pointArr.length>0){
                        $(_this.head).attr("id","videoPhoto").appendTo($("#videoImg"));
                        $("#videoPhoto").css({
                            height:pointArr[0].h,
                            top:pointArr[0].y,
                            left:pointArr[0].x,
                            position:"absolute",
                            "-webkit-transform":"translate(-50%,-50%) rotate("+pointArr[0].r+"deg)",
                            "-webkit-transform-origin":"50% 50%"
                        });
                        if(pointArr.length>=2){
                            $(videoPhoto1).attr("id","videoPhoto1").appendTo($("#videoImg"));
                            $("#videoPhoto1").css({
                                height:pointArr[1].h,
                                top:pointArr[1].y,
                                left:pointArr[1].x,
                                position:"absolute",
                                "-webkit-transform":"translate(-50%,-50%) rotate("+pointArr[1].r+"deg)",
                                "-webkit-transform-origin":"50% 50%"
                            });
                        }else{
                            $("#videoPhoto1").remove();
                        }
                        if(pointArr.length==3){
                            $(videoPhoto2).attr("id","videoPhoto2").appendTo($("#videoImg"));
                            $("#videoPhoto2").css({
                                height:pointArr[2].h,
                                top:pointArr[2].y,
                                left:pointArr[2].x,
                                position:"absolute",
                                "-webkit-transform":"translate(-50%,-50%) rotate("+pointArr[2].r+"deg)",
                                "-webkit-transform-origin":"50% 50%"
                            });
                        }else{
                            $("#videoPhoto2").remove();
                        }
                    }else{
                        $("#videoImg").html("");
                    }

                }
            }
            _this.videoID= requestAnimationFrame(videoMove);
        }
    },
    getCenter:function (locArr) {
        //获取头像的中心点
        var pointArr=[];
        if(locArr.length>0){
            var x=(locArr[0][0]+locArr[2][0])/2;
            var y=(locArr[1][1]+locArr[3][1])/2;
            var w=Math.sqrt((locArr[1][0]-locArr[0][0])*(locArr[1][0]-locArr[0][0])+(locArr[1][1]-locArr[0][1])*(locArr[1][1]-locArr[0][1]));
            var h=Math.sqrt((locArr[2][0]-locArr[1][0])*(locArr[2][0]-locArr[1][0])+(locArr[2][1]-locArr[1][1])*(locArr[2][1]-locArr[1][1]));
            //获取角度（上下中心点）
            var upCenter={x:(locArr[0][0]+locArr[1][0])/2,y:(locArr[0][1]+locArr[1][1])/2};
            var downCenter={x:(locArr[2][0]+locArr[3][0])/2,y:(locArr[2][1]+locArr[3][1])/2};
            var r=angle(upCenter,downCenter);
            var center={x:x,y:y,w:w,h:h,r:r};
            pointArr.push(center);
            if(locArr[7]){
                var x1=(locArr[4][0]+locArr[6][0])/2;
                var y1=(locArr[5][1]+locArr[7][1])/2;
                var w1=Math.sqrt((locArr[5][0]-locArr[4][0])*(locArr[5][0]-locArr[4][0])+(locArr[5][1]-locArr[4][1])*(locArr[5][1]-locArr[4][1]));
                var h1=Math.sqrt((locArr[6][0]-locArr[5][0])*(locArr[6][0]-locArr[5][0])+(locArr[6][1]-locArr[5][1])*(locArr[6][1]-locArr[5][1]));
                var upCenter1={x:(locArr[4][0]+locArr[5][0])/2,y:(locArr[4][1]+locArr[5][1])/2};
                var downCenter1={x:(locArr[6][0]+locArr[7][0])/2,y:(locArr[6][1]+locArr[7][1])/2};
                var r1=angle(upCenter1,downCenter1);
                var center1={x:x1,y:y1,w:w1,h:h1,r:r1};
                pointArr.push(center1);
            }
            if(locArr[11]){
                var x2=(locArr[8][0]+locArr[10][0])/2;
                var y2=(locArr[9][1]+locArr[11][1])/2;
                var w2=Math.sqrt((locArr[9][0]-locArr[8][0])*(locArr[9][0]-locArr[8][0])+(locArr[9][1]-locArr[8][1])*(locArr[9][1]-locArr[8][1]));
                var h2=Math.sqrt((locArr[10][0]-locArr[9][0])*(locArr[10][0]-locArr[9][0])+(locArr[10][1]-locArr[9][1])*(locArr[10][1]-locArr[9][1]));
                var upCenter2={x:(locArr[8][0]+locArr[9][0])/2,y:(locArr[8][1]+locArr[9][1])/2};
                var downCenter2={x:(locArr[10][0]+locArr[11][0])/2,y:(locArr[10][1]+locArr[11][1])/2};
                var r2=angle(upCenter2,downCenter2);
                var center2={x:x2,y:y2,w:w2,h:h2,r:r2};
                pointArr.push(center2);
            }
        }
        return pointArr;
        function angle(upCenter,downCenter) {
            var X=Math.abs(downCenter.x-upCenter.x),Y=Math.abs(downCenter.y-upCenter.y),Z=Math.sqrt(X*X+Y*Y);
            if(X!=0){
                return Math.round(Math.asin(Y / Z) / Math.PI*180)-90;
            }else{
                return 0;
            }
        }
    },
    frameMove:function (idName,num,speed) {
        //实现帧动画
        var _this=this;
        var startTime=new Date().getTime();
        var imgArr=[];
        for(var i=1;i<=num;i++){
            var name=idName+"_"+i;
            imgArr.push(loader.imageArr[name]);
        }
        move();
        function move() {
            var nowTime=new Date().getTime();
            var index=Math.ceil((nowTime-startTime)/speed)%num;
            var patent=$("#"+idName+"");
            $(patent).html("");
            $(imgArr[index].cloneNode(true)).css({
                width:"100%", height:"100%"
            }).appendTo($(patent));
            _this.zhenID= requestAnimationFrame(move);
        }
    }

};