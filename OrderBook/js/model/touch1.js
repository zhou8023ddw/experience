var touch = function() {
    window.addEventListener("touchmove",function(event) {
        event.preventDefault();
    });
    var startTimes, endTimes;
    //语音列表
    var dataList = [{
        id: '1',
        url: '',
        likeNum: '6',
        title: '《测试》',
        duration: '60'
    }, {
        id: '2',
        url: '',
        likeNum: '7',
        title: '《tttt》',
        duration: '15'
    }, {
        id: '3',
        url: '',
        likeNum: '22',
        title: '《测试测试》',
        duration: '20'
    }, {
        id: '4',
        url: '',
        likeNum: '0',
        title: '《测试各个》',
        duration: '35'
    }, {
        id: '5',
        url: '',
        likeNum: '87',
        title: '《测试你好吗》',
        duration: '46'
    } ];
    var myVoice;
    dataList.forEach(function (item,index) {
        if(item.id=="3"){
            myVoice=item;
            dataList.splice(index,1);
        }
    });
    dataList.splice(0, 0, myVoice);
    console.log(dataList);
    //上滑显示语音和规则页
    var main = document.getElementById("page_1");
    var startY, endY;
    main.addEventListener("touchstart", function(event) {
        event.preventDefault();
        startY = event.changedTouches[0].clientY;
    });
    main.addEventListener("touchend", function(event) {
        event.preventDefault();
        endY = event.changedTouches[0].clientY;
        if (endY - startY < -50) {
            $("#page_1").css("display", "none");
            $("#page_2").css("display", "block");
            $("#page_5").css("display", "block");
            //加载语音列表
            $("<div></div>").css({
                width: 241.5,
                height: 366,
                left: 35.5,
                top: 57,
                position: "absolute",
            }).attr("id", "listDiv")
                .appendTo($("#page_2"));
            //获取语音列表
            /*$.get("../api/test",{
             name:"OrderBook",
             key:"<?php echo $keyArray['key'] ?>",
             ukey:"<?php echo $keyArray['ukey'] ?>",
             timestamp:"<?php echo $keyArray['timestamp'] ?>",
             nonce:"<?php echo $keyArray['nonce'] ?>",
             count:5
             },function(res){
             console.log(res);
             dataList=res.data;
             //从服务器中下载localId
             for(var i=0;i<dataList.length;i++){
             wx.downloadVoice({
             serverId: dataList[i].id, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
             isShowProgressTips: 1, // 默认为1，显示进度提示
             success: function (res) {
             dataList[i].id = res.localId; // 返回音频的本地ID
             }
             });
             }
             voiceList(dataList);
             });*/
            voiceList(dataList);
        }
    });
    //关闭规则页
    var rule = document.getElementById("page_5");
    rule.addEventListener("touchend", function(event) {
        var target = event.target.className;
        if (target != "rule") {
            $("#page_5").css("display", "none");
        }
    });
    //语音页逻辑
    var voice = document.getElementById("page_2");
    var change = document.getElementById("change");
    var num,tiaowidth,endtime;
    voice.addEventListener("touchend", function(event) {
        var target = event.target.id;
        if (target == "rule") {
            //打开规则页
            $("#page_5").css("display", "block");
        } else if (target == "change") {
            //停掉正在播放的语音
            if(num){
                $("#tiao" + num + "").css("width",tiaowidth);
                $("#time" + num + "").html(endtime+'"');
                $("#three"+num+"").attr("src","css/img/page_9_004.png");
                console.log("结束语音播放");
                //停止播放录音
            }
            //换一组
            $("#change").addClass("changeMove");
            change.addEventListener("webkitAnimationEnd", function() {
                //动画结束
                $("#change").removeClass("changeMove");
            });
            //更新语音列表
            /*$.get("../api/test",{
             name:"OrderBook",
             key:"<?php echo $keyArray['key'] ?>",
             ukey:"<?php echo $keyArray['ukey'] ?>",
             timestamp:"<?php echo $keyArray['timestamp'] ?>",
             nonce:"<?php echo $keyArray['nonce'] ?>",
             count:5
             },function(res){
             console.log(res);
             dataList=res.data;
             //从服务器中下载localId
             for(var i=0;i<dataList.length;i++){
             wx.downloadVoice({
             serverId: dataList[i].id, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
             isShowProgressTips: 1, // 默认为1，显示进度提示
             success: function (res) {
             dataList[i].id = res.localId; // 返回音频的本地ID
             }
             });
             }
             voiceList(dataList);
             });*/
            voiceList(dataList);
        } else if (target == "share") {
            //分享页面
            $("#page_8").css("display", "block");

        } else if (target == "makeVoice") {
            //录制语音
            $("#page_2").css("display", "none");
            $("#page_4").css("display", "block");
        } else if (target == "goBook") {
            //去趣约节
            console.log("去悦读节");
            window.location="http://coupon.m.jd.com/coupons/show.action";
        }else if (target.indexOf("bottle")>=0 || target.indexOf("there") >=0|| target.indexOf("time")>=0 || target.indexOf("tiao")>=0|| target.indexOf("div")>=0) {
            if(num){
                $("#tiao" + num + "").css("width",tiaowidth);
                $("#time" + num + "").html(endtime+'"');
                $("#three"+num+"").attr("src","css/img/page_9_004.png");
                console.log("结束语音播放");
            }
            num = target.substr(target.length - 1, 1);
            tiaowidth = $("#tiao" + num + "").width();
            console.log("播放语音");
            //$("#three"+num+"").attr("src","img/zhen/three.gif");
            startTimes = new Date().getTime();
            endtime =parseInt($("#time" + num + "").html()) ;
            timesChange();
            function timesChange() {
                endTimes = new Date().getTime();
                var times = endTimes - startTimes;
                if (times <= endtime*1000) {
                    var time = Math.ceil(times / 1000);
                    //三道线
                    $("#three"+num+"").attr("src",game.baseUrl+"img/zhen/three_"+time%4+".png") ;

                    $("#tiao" + num + "").css("width", (tiaowidth * time / endtime));
                    if(time<10){
                        time="0"+time;
                    }
                    $("#time" + num + "").html(time+'"');
                    requestAnimationFrame(timesChange);
                }else {
                    $("#three"+num+"").attr("src","css/img/page_9_004.png");
                }
            }
        }else if(target.indexOf("heart")>=0||target.indexOf("likeNum")>=0){
            likenum=target.substr(target.length - 1, 1);
            var likeNum=$("#likeNum"+likenum+"").html();
            canLike=event.target.className;
            if(canLike=="on"){
                $("#likeNum"+likenum+"").html(parseInt(likeNum)+1);
                var nownum=parseInt(likeNum)+1;
                event.target.className="off";
                console.log("触发点赞");
                //点赞
                /*$.get("../api/test",{
                 name:"OrderBook",
                 key:"<?php echo $keyArray['key'] ?>",
                 ukey:"<?php echo $keyArray['ukey'] ?>",
                 timestamp:"<?php echo $keyArray['timestamp'] ?>",
                 nonce:"<?php echo $keyArray['nonce'] ?>",
                 id:dataList[likenum].id
                 },function(res){
                 console.log(res);
                 });*/
            }else{
                $("#likeNum"+likenum+"").html(parseInt(likeNum)-1);
                var nownum=parseInt(likeNum)-1;
                event.target.className="on";
            }
            if(nownum>0){
                $("#heart"+likenum+"").attr("src","css/img/page_9_008.png");
                $("#likeNum"+likenum+"").css("color","#b34341");
            }else{
                $("#heart"+likenum+"").attr("src","css/img/page_9_009.png");
                $("#likeNum"+likenum+"").css("color","#FFFFFF");
            }
        }
    });
    //分享页面
    var share = document.getElementById("page_8");
    share.addEventListener("touchend", function(event) {
        var target = event.target.className;
        if (target == "opa") {
            $("#page_8").css("display", "none");
        }
    });
    //录制语音页面
    //创建input进入语音页
    $("<input type='text' value=''/>").css({
        width: 199,
        height: 28.5,
        left: 60,
        top: 57,
        position: "absolute",
        border: "0px",
        outline: "none",
        "font-size": "16pt"
    }).attr("id", "setTitle")
        .appendTo($("#page_4"));
    $("<span>00</span>").css({
        left:215,
        top: 383.5,
        position: "absolute",
        "font-size": "19px",
        "font-family":"FZXS16",
        color:"#7c1e0c"
    }).attr("id", "maketime")
        .appendTo($("#page_4"));
    var voice = document.getElementById("page_4");
    var voiceData={
        startTime:"",
        endTime:"",
        localId:"",
        serverId:''
    };
    var requestId;
    voice.addEventListener("touchend", function(event) {
        var target = event.target.className;
        if (target == "start") {
            $(".upStart").css("display", "block");
            $(".upEnd").css("display", "none");
            //开始录音
            voiceData.startTime = new Date().getTime();
            //计时
            timesCh();
            function timesCh() {
                endTimes = new Date().getTime()
                var times = endTimes - voiceData.startTime;
                if (times <= 60*1000) {
                    var time = Math.ceil(times / 1000);
                    //变换音符
                    $("#music").attr("src","img/zhen/voice_"+(Math.ceil(times / 200)%3+1)+".png");
                    if(time<10){
                        time="0"+time;
                    }
                    $("#maketime").html(time);
                    requestId=requestAnimationFrame(timesCh);
                }
            }
        } else if (target == "end") {
            $(".upStart").css("display", "none");
            $(".upEnd").css("display", "block");
            window.cancelAnimationFrame(requestId);
            //停止录音
        } else if (target == "play") {
            console.log("试听");
            //试听（播放语音）
        } else if (target == "upload") {
            console.log("发布");
            //上传语音

            //打开抽奖页
            $("#page_4").css("display", "none");
            $("#page_2").css("display", "block");
            $("#page_3").css("display", "block"); //抽奖页
        }
    });
    //抽奖页
    var chouId;
    var luckyDraw = document.getElementById("page_3");
    luckyDraw.addEventListener("touchend", function(event) {
        var target = event.target.id;
        if (target == "luckyDraw") {
            var   startTimesCh=new Date().getTime();
            //先跳转到等待结果界面，抽奖成功后切换
            timesChou();
            function timesChou() {
                var  endTimes = new Date().getTime();
                var times = endTimes - startTimesCh;
                if (times <= 60*1000) {
                    var time = Math.ceil(times / 300);
                    $("#chou").attr("src","img/zhen/chou_"+(time%4+1)+".png") ;
                    chouId=requestAnimationFrame(timesChou);
                }
            }
            //提交开始抽检请求
            /*$.get("../api/test",{
             name:"OrderBook",
             key:"<?php echo $keyArray['key'] ?>",
             ukey:"<?php echo $keyArray['ukey'] ?>",
             timestamp:"<?php echo $keyArray['timestamp'] ?>",
             nonce:"<?php echo $keyArray['nonce'] ?>",
             },function(res){
             console.log(res);
             cancelAnimationFrame(chouId);

             if (i > 1) {
             //中奖
             $("#page_3").css("display", "none");
             $("#page_7").css("display", "block");
             } else {
             //未中奖
             $("#page_3").css("display", "none");
             $("#page_6").css("display", "block");
             }
             });*/
            var i = Math.random() * 2;
            if (i > 1) {
                //中奖
                $("#page_3").css("display", "none");
                $("#page_7").css("display", "block");
            } else {
                //未中奖
                $("#page_3").css("display", "none");
                $("#page_6").css("display", "block");
            }
        }
    });
    //中奖页
    var lucky = document.getElementById("page_7");
    lucky.addEventListener("touchend", function(event) {
        var target = event.target.id;
        if (target == "shareTOfriend") {
            console.log("分享给朋友");
            $("#page_7").css("display", "none");
            $("#page_8").css("display", "block");
            //
        } else if (target == "goJing") {
            console.log("跳转到京东");
            //window.location.href="";
        }
    });
    //未中奖页
    var lucky = document.getElementById("page_6");
    lucky.addEventListener("touchend", function(event) {
        var target = event.target.id;
        if (target == "shareTOfriend") {
            console.log("分享给朋友");
            $("#page_6").css("display", "none");
            $("#page_8").css("display", "block");
        } else if (target == "goJing") {
            console.log("跳转到京东");
            window.location="http://coupon.m.jd.com/coupons/show.action";
        }
    });
}
touch();
/*
if(num==target.substr(target.length - 1, 1)){
    $("#tiao" + num + "").css("width",tiaowidth);
    $("#time" + num + "").html(endtime+'"');
    $("#three"+num+"").attr("src","css/img/page_9_004.png");
    console.log("结束语音播放");
    //停止播放录音
    wx.stopVoice({
        localId: dataList[num].id // 需要停止的音频的本地ID，由stopRecord接口获得
    });
}else{
    $("#tiao" + num + "").css("width",tiaowidth);
    $("#time" + num + "").html(endtime+'"');
    $("#three"+num+"").attr("src","css/img/page_9_004.png");
    console.log("结束语音播放");
    //停止播放录音
    wx.stopVoice({
        localId: dataList[num].id // 需要停止的音频的本地ID，由stopRecord接口获得
    });
    num = target.substr(target.length - 1, 1);
    tiaowidth = $("#tiao" + num + "").width();
    console.log("播放语音");
    //开始播放
    wx.playVoice({
        localId: dataList[num].id //需要播放的音频的本地ID，由stopRecord接口获得
    });
    //$("#three"+num+"").attr("src","img/zhen/three.gif");
    startTimes = new Date().getTime();
    endtime =parseInt($("#time" + num + "").html()) ;
    timesChange();
    function timesChange() {
        endTimes = new Date().getTime();
        var times = endTimes - startTimes;
        if (times <= endtime*1000) {
            var time = Math.ceil(times / 1000);
            //三道线
            $("#three"+num+"").attr("src","img/zhen/three_"+time%4+".png") ;

            $("#tiao" + num + "").css("width", (tiaowidth * time / endtime));
            if(time<10){
                time="0"+time;
            }
            $("#time" + num + "").html(time+'"');
            requestAnimationFrame(timesChange);
        }else {
            $("#three"+num+"").attr("src","css/img/page_9_004.png");
        }
    }

}
*/
