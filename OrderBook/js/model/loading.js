var Loader = function(baseUrl) {
	//绝对路径或相对路径
	this.baseUrl = baseUrl || "";
	//图片地址数组
	this.resList = [];
	//添加资源
	this.addRes = function(src) {
			var url;
			if(src.indexOf("http://") >= 0) {
				url = src;
			} else {
				url = this.baseUrl + src;
			}
			var resList = this.resList;
			resList.push(url);
			return resList;
		}
		//加载
	this.loadRes = function(_resList) {
		var timestamp = new Date().getTime(); //开始的时间戳
		var num = _resList.length; //需要加载的个数
		var count = 0; //已经加载的资源个数
		var prev; //上次加载的时间
		var now = timestamp; //这次加载的时间
		var gapTime; //时间间隔
		var percent; //百分比
		var lastTime = 0;
		var lastPercent = 0;
		var widthLoad=parseInt($("#load>img").eq(3).css("width"));//进度条宽度
		var update = function(target_percent) {
			var real_time = new Date().getTime() - timestamp; //实际的时间
			var gap_time = real_time - lastTime; //距离上一次更新的时间间隔
			var last_time = lastTime; //上一次更新的时间
			var last_percent = lastPercent; //上i次更新对应的百分比

			var c = 0; //增加的百分比
			var ideal_percent_plus = gap_time / 3000; //正常情况下增加的百分比；
			var target_percent = count / num; //目标百分比；
			var dis_percent = target_percent - last_percent; //距离目标百分比的距离
			if(dis_percent > 0) {
				//如果加载快。需要放慢
				if(dis_percent > ideal_percent_plus) {
					c = ideal_percent_plus;
				} else {
					//如果加载慢。需要一点一点增加速度，但不可超过100%
					//慢的常数量
					c = dis_percent;
				}
			} else {
				c = ideal_percent_plus * (1 - last_percent) * (1 - last_percent)
			}
			var now_percent = last_percent + c;
			if(now_percent > 1) {
				now_percent = 1
			}
			var real_percent = now_percent * 100;
			//console.log(real_percent)
			//进度条和数字
			$("#load>span").html(Math.ceil(real_percent)+"%");
			if(real_percent < 100) {
				requestAnimationFrame(update)
			} else {
			   $("#load>span").html("100%");
			   $("#load").css("display","none");
			   $("#page_1").css("display","block");
			}
		};
		for(var i = 0; i < num; i++) {
			var img = new Image();
			img.src = _resList[i];
			img.addEventListener("load", function(event) {
				count += 1;
				update();
			});
		};
	},
	this.preload=function(files) {
		    //加载动态添加的内容
            var count=0;
            //如果传入的参数files不是数组，返回
            if(Object.prototype.toString.call(files) !== "[object Array]")
            {return;}
            var obj = null, ie = '\v'=='v';
            for(var i = 0, l = files.length; i < l; i ++){
                if (ie) {
                    new Image().src = files[i];
                    continue;
                }
                obj = document.createElement('object');
                obj.data = files[i];
                obj.width = 0;
                obj.height = 0;
                document.body.appendChild(obj);
            }
        }
};
var loader = new Loader(game.baseUrl);
var res = [
          "img/page_1_001.jpg",
          "img/page_1_002.png",
          "img/page_1_003.png",
          "img/page_1_004.png",
          "img/page_1_005.png"
];
loader.resList=[];
res.forEach(function (item) {
   res= loader.addRes(item)
});
var _resList = new Array();
//添加公共资源
var num = 0;
var zhenArr=[
    "img/page_9_002.png",
    "img/page_9_003.png",
    "img/page_9_004.png",
    "img/page_9_008.png",
    "img/page_9_009.png",
    "img/zhen/three_0.png",
    "img/zhen/three_1.png",
    "img/zhen/three_2.png",
    "img/zhen/three_3.png",
    "img/zhen/chou_1.png",
    "img/zhen/chou_2.png",
    "img/zhen/chou_3.png",
    "img/zhen/chou_4.png",
    "img/zhen/voice_1.png",
    "img/zhen/voice_2.png",
    "img/zhen/voice_3.png"
];
loader.resList=[];
zhenArr.forEach(function (item) {
    zhenArr= loader.addRes(item)
});
loader.preload(zhenArr);
loader.resList=[];
//添加配置表信息
config.forEach(function(item) {
    item.dom.forEach(function(item1) {
        if(item1.type == "img") {
            _resList = loader.addRes(item1.src);
        }
    });
});
res.forEach(function(item) {
	var sum = res.length;
	var img = new Image();
	img.src = item;
	img.addEventListener("load", function(event) {
		num = num + 1;
		if(num == sum) {
		$("#load").css("display","block").addClass("loadShow");
		loader.loadRes(_resList); //如果load页面加载完在进行下面加载
		}
	});
});
