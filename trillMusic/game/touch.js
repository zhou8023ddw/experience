/**
 * Created by Administrator on 2017/7/24 0024.
 */
var Touch=function () {
     this.ID=[];
     this.hasChooce=false;
     this.answer=[true,false,true,false,true,true];
     this.barrage={
         "video_0":["Don’t wory WU!","模仿吴莫愁戏还那么多","我莫好看炸裂","前方吴莫愁粉丝团即将到达","莫愁，是你吗","不是吧，莫愁没有纹身啊","莫愁玩抖音了，开心开心","老公莫愁啊，我爱你","就是莫愁啊，她换发型了","莫愁 前路无知己啊","这freestyle可以 666666","啊啊莫愁，等我中了彩票娶你", "莫愁你倒是把头发洗洗啊", "这演技，导师快来转身@庾澄庆" ],
         "video_1":['岳云鹏是我见过最帅的男人。', '岳云鹏让你联系他', '别蹭小岳岳涨粉！', '这难道不是小岳岳本人？','小岳岳别装了，我知道是你', '这就是本人吧', '说，你跟小岳岳是什么关系', '岳云鹏是双眼皮，这是单眼皮', '这是小岳岳的妹妹吧', '啊啊我男神岳云鹏！', '就是小岳岳本人了', '来段相声！', '这是失散多年的表亲啊', '我记不得小岳岳长什么样了', '岳岳是你吗？', '小岳岳越来越帅了！'],
         "video_2":['这个长得像吴克群的女人是谁', '群群最美','吴克群你到底怎么了','这是李咏吧','克群说说说你爱我','同时模仿吴克群和彭于晏，高手','项羽来了','你好 李咏','心疼发型师两秒','群群 请不要放弃治疗','群群 到吃药的点儿了','群群好，我是隔壁剧组的','造型师：吴克群你能不能别动了','生猴子不如为你写诗','让一让，吴克群老婆团来了'],
         "video_3":['邓超不要装了，就是你了','这很邓超', '无敌是多么多么寂寞', '是邓超，鉴定完毕', '超哥，有本事把眼镜摘了', '哇学霸超来了', '邓超，孙俪喊你回家带孩子', '鹿晗来认认这是你爸不', '是邓超，没毛病', '是很像邓超了233333', '社会你超哥，人狠话不多'],
         "video_4":['祖儿美爆', '是她是她，我们的媳妇小哪吒', '吃可爱长大的', '挥着翅膀的女孩', '看着祖儿笑，我觉得我恋爱了', '没想到我会喜欢上哪吒', '喜欢祖儿的抱紧我', '你这么可爱做什么都对', '这是容祖儿吗？', '你点的小可爱已上线'],
         "video_5":['这手势一看就是刘维','我家维哥，帅', '老薛呢', '帮我问问薛之谦什么时候加入抖音', '抖音太适合维维了', '东北天后碧昂斯', '这是谁啊？这么好看', '这不是吴莫愁吗？', '刘维，抖音需要你', '果然名媛气质']
     };
     this.isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
     this.initStart();
};
Touch.prototype={
    init:function () {
        if(this.ID[3]){
            cancelAnimationFrame(this.ID[3]);
        }
        if(this.count>=0){
            $(".answer_"+this.count+"").css('display','none');
        }
        if(this.titleNum>=0){
            $('.title_'+(this.titleNum-1)+'').css('display','none');
        }
        $(".goTrillMusic_2").css('display','none');
        $(".restart_0").css('display','none');
        $(".restart_1").css('display','block');
        $(".restart_2").css('display','block');
        $(".total").css('display','block');
        $('#box').css('top','0px');
        this.hasChooce=false;
        this.timeupdate=0;
        this.count=0;//答对题数
        this.titleNum=0;//正在答题数
        $("#video_bg_5").css('display','none');
        $("#video_bg_0").css('display','block');

        $("#video").css('display','none');
        $('.title_'+this.titleNum+'').css('display','block');
        video.skip();
    },
    initTwinkle:function (domClass,time,delay,i) {
        var _this=this;
       //闪烁效果
        var num=0;
        if(delay){
           num=num-delay;
        }
        function Disdlay() {
            if(Math.ceil(num%time)<time/2&&num>=0){
                $("."+domClass+"").css('display','none');
            }else{
                $("."+domClass+"").css('display','block');
            }
            num++;
            _this.ID[i]=requestAnimationFrame(Disdlay);
        }
        Disdlay();
    },
    initStart:function () {
        var _this=this;
        this.initTwinkle('but_2',14,0,0);
        //开始页面
        var page_1=document.getElementById('page_1');
        page_1.addEventListener("touchend",function (event) {
            event.preventDefault();
            var className=event.target.className;
            if(className.indexOf('but_')>=0){
                $(this).css('display','none');
                $("#page_2").css('display','block');

                game.pauseMusic('music_bg');
                cancelAnimationFrame(_this.ID[0]);
                //按钮闪烁
                _this.initTwinkle('but_true',40,0,1);
                _this.initTwinkle('but_false',40,30,2);
                //播放语音
                _this.init();
                $("#video_bg").css('display','block');
                $("#video").css('display','block');
                //显示弹幕
                $("#videoBox").css("display",'block');
                game.pauseMusic('music_bg');
                video.setCurrentTime(0);
                //解决安卓视频全屏样式问题
                if(_this.isAndroid){
                    video.on('x5videoenterfullscreen',function () {
                        $('#box').css('top','70px');
                    });
                    video.on('x5videoexitfullscreen',function () {
                        $('#box').css('top','0px');
                            _this.setAnswer();
                    });
                }
                var startPlay=true;
                video.on("timeupdate",function () {
                    if(video.element.currentTime-(_this.titleNum*15.54)>0){
                        $("#video_bg_"+(_this.titleNum)+"").css("display","none");
                        if(startPlay){
                            _this.setBarrage(_this.titleNum);
                        }
                        video.show();
                        startPlay=false;
                    }
                    _this.timeupdate=video.element.currentTime;
                    var everyTime=14.5;
                    if(_this.titleNum==5){
                        everyTime=15;
                    }
                    if(_this.timeupdate-(_this.titleNum*15.5)>everyTime){
                        _this.hasChooce=false;
                        video.pause();
                        setTimeout(function () {
                            if(!_this.hasChooce){
                                _this.setAnswer();
                            }
                        },5000);
                    }
                });
            }
        });
        //中间页面
        var page_2=document.getElementById('page_2');
        page_2.addEventListener("touchend",function (event) {
            event.preventDefault();
            var className=event.target.className;
            if(className.indexOf('but_true')>=0){
                _this.chooseAnswer(true);
            }else  if(className.indexOf('but_false')>=0){
                _this.chooseAnswer(false);
            }
        });
        //结果页面
        var page_3=document.getElementById('page_3');
        page_3.addEventListener("touchend",function (event) {
            event.preventDefault();
            var className=event.target.className;
            if(className.indexOf('restart_')>=0){
                //再来一次
                game.playMusic('music_bg');
                $("#page_3").css('display','none');
                $("#page_1").css('display','block');
                _this.initTwinkle('but_2',14,0,0);
                _this.init();
                game_times = Number(game_times)+1;
                window.localStorage.setItem('tttang_trill_music_game_times',game_times);
                /*game_times >= 2 && game.log(h5_config.appName+'_replay_game',{'times':game_times});
                game.log(h5_config.appName+"_press_replay_game",{"times":game_times});//统计再玩一次的次数。*/
            }else  if(className.indexOf('goTrillMusic')>=0){
                console.log("跳转到抖音");
                /*game.log(h5_config.appName + "_press_link");//统计跳转到抖音的次数*/
                setTimeout(function(){
                    location.href = 'https://www.douyin.com/share/video/6410695623053413634?dl=kbEg';
                },200)
            }
        });
    },
    chooseAnswer:function (bool) {
        this.hasChooce=true;
        var _this=this;
        if(this.setTimeoutID){
           clearTimeout(this.setTimeoutID);
        }
        if(this.answer[this.titleNum]==bool){
            //console.log('答对');
            game.playEffect('effect_true');
            this.count++;
            $("#video_bg_"+(this.titleNum+1)+"").css({
                display:"block"
            });
            this.controlVideo();
/*
            game.log(h5_config.appName+"_question_"+(this.titleNum+1)+"_true");//统计每道题答对的人数*/
        }else{
            //console.log('答错');
            video.skip();
            game.playEffect('effect_false');
            this.setAnswer();

            /*game.log(h5_config.appName+"_question_"+(this.titleNum+1)+"_false");//统计每道题答错的人数*/
        }
        this.titleNum++;
    },
    setAnswer:function () {
        video.pause();
        if(this.isAndroid){
            $('#box').css('top','0px');
        }
        game.playMusic('music_bg');
        $("#video_bg").css('display','none');
        $("#video").css('display','none');
        if($("#barrage")){
            $("#barrage").remove();
        }
        $("#page_2").css('display','none');
        $("#page_3").css('display','block');
        cancelAnimationFrame(this.ID[1]);
        cancelAnimationFrame(this.ID[2]);
        $(".answer_"+this.count+"").css('display','block');
        if(this.count==6){
            $(".goTrillMusic_2").css('display','block');
            $(".restart_0").css('display','block');
            $(".restart_1").css('display','none');
            $(".restart_2").css('display','none');
            $(".total").css('display','none');
        }else{
            this.initTwinkle('restart_2',20,0,3);
        }

        //game.log(h5_config.appName+"_pass_"+this.count);//统计每关通过的次数
    },
    controlVideo:function () {
        $('.title_'+(this.titleNum)+'').css('display','none');
        $('.title_'+(this.titleNum+1)+'').css('display','block');
        if(this.titleNum==5){
            video.pause();
            this.setAnswer();
        }else{
            video.setCurrentTime(15.54*(this.titleNum+1));
            this.setBarrage(this.titleNum+1);
        }

    },
    setBarrage:function (num) {
        if($("#barrage")){
            $("#barrage").remove();
        }
        $("<div></div>").css({
            width:640,
            height:300,
            top:0,
            left:0,
            zIndex:10
        }).attr("id","barrage")
            .appendTo($("#page_2"));
        var _this=this;
        var colors=["#FFFFFF","#00f8ee","#FF0000"];
        var topArr=[],topNum=0;
        var leftArr=[0,0,0,0,0];
        var textArr=this.barrage["video_"+num+""];
        for(var i=0;i<textArr.length;i++){
          //添加到弹幕中
            topArr.push(topNum);
            topNum=Math.ceil(Math.random()*2)-1;
            if(topArr.indexOf(topNum)>=0){
                leftArr[topNum]++;
            }
            $("<span>"+textArr[i]+"</span>")
                .css({
                    width:640,
                    height:'auto',
                    color:colors[Math.ceil(Math.random()*3-1)],
                    "font-size":'26pt',
                    position:'absolute',
                    top:50*topNum+10,
                    left:500+350*Math.random()+400*leftArr[topNum]
                }).addClass('bar_span')
                .animate({left:'-640px'},4000+3000*leftArr[topNum],function(){
                    $(this).remove();
                })
                .appendTo($("#barrage"));
        }
    }

};