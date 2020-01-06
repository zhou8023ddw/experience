(function () {
	document.addEventListener('touchmove', function (e) {
		e.preventDefault();
	})
}());

var AVInit    = false;
var analytics = false;
var video;

var Game = function (baseUrl) {
	this.baseUrl = baseUrl || '';
	this.gameLoadCount   = 0;
	this.gameLoadedCount = 0;
	this.isMusicOpened = true;

};


Game.prototype = {
	// 加载进度回调
	loadPercentCallback: function (count, loadedCount) {
		//console.log('加载进度 : ' + loadedCount + ' / ' + count);
		this.gameLoadCount   = count;
		this.gameLoadedCount = loadedCount;
		this.updateLoader();
	},

	// 更新加载进度
	updateLoader: function () {
		var percent = this.gameLoadedCount / this.gameLoadCount;
		 //console.log(percent);

	},

	// 加载完成回调
	loadFinishCallback: function () {
		var _this=this;
		console.log('加载完成');
        this.sound = new Sound(this.baseUrl, ['music_bg','effect_true','effect_false']);
        this.sound.initSound();
        this.sound.audios['music_bg'].autoplay = true;
        this.sound.audios['music_bg'].loop     = true;

       /* //添加统计
        game.log(h5_config.appName+"_init");//统计进入的总数
        game.log(h5_config.appName+"_init"+fr);//分渠道统计
		// 如果不是第一次玩统计的次数
        game_times>=2 && game.log(h5_config.appName+"_replay_game",{"times":game_times});*/

		//加载视频
		video = new Video('video', {
            pageId: 'p1',
            uiId  : 'p1'
        });

        $('#loading').css('display','none');
        this.start();
		/*document.getElementById("video").addEventListener("loadedmetadata", function(event) {
			console.log("视频加载完成");
		 });*/
		//设置分享
        wx.config(wxConfig);
        wx.ready(function () {
            console.log('ready');
            game.playMusic('music_bg');
            var shareArr = ['你真的认识小岳岳吗？','是爱豆变了，还是你眼神不好？','明星们嗨起来竟然是这样！']
            var ran = Math.floor(Math.random()*3);
            var shareArr2 = ['邓超小岳岳私下竟然嗨成这样！','抖起来就能一秒变邓超？','看邓超小岳岳如何变身！']
            var ran2 = Math.floor(Math.random()*3);
            var shareText = (shareArr[ran]);
            var shareText2 = (shareArr2[ran2]);
            game.setShare('你真的认识小岳岳吗？',shareText,shareText2);
        });
        wx.error(function(res){
            console.log(res);
        });
	},

	// 场景初始化结束回调
	initFinishCallback: function () {
		// console.log('初始化结束');
	},
	// 开始
	start    : function () {
		this.initPages();
		$('#page_1').css('display','block');
		this.touch = new Touch();
	},
	initPages: function () {
		config.pages.forEach(function (item) {
			$("<div></div>").css({
					width    : item.rect.w != undefined ? item.rect.w : "640px",
					height   : item.rect.h != undefined ? item.rect.h : "1008px",
					left             : item.rect.x,
					top              : item.rect.y,
					position         : "absolute",
					display          : item.display,
					"z-index"        : item.zIndex,
					"background-size": "cover"
				})
				.addClass(item.class)
				.attr("id", item.id)
				.appendTo($("#box"));
			item.dom.forEach(function (item1) {
				if (item1.type == "img") {
					var name = loader.getName(item1.src);
					var img  = loader.imageArr[name].cloneNode(true);

					$(img).css({
							width                              : item1.rect.w,
							height                             : item1.rect.h,
							top                                : item1.rect.y,
							left                               : item1.rect.x,
							position                           : "absolute",
							"z-index"                          : item1.zIndex,
							display                            : item1.dis,
							"-webkit-animation-name"           : item1.animates,
							"-webkit-animation-duration"       : item1.time + "ms",
							"-webkit-animation-delay"          : item1.wait + "ms",
							"-webkit-animation-iteration-count": item1.count,
							"-webkit-animation-fill-mode"      : 'both',
							"-webkit-transform-origin"         : item1.origin


						})
						.addClass(item1.class)
						.attr("id", item1.id)
						.appendTo($("#" + item.id + ""));
				} else if (item1.type == "div") {
					$("<div></div>").css({
							width                              : item1.rect.w,
							height                             : item1.rect.h,
							left                               : item1.rect.x,
							top                                : item1.rect.y,
							position                           : item1.pos,
							display                            : item1.dis,
							"z-index"                          : item1.zIndex,
							background                         : item1.background ? 'url(' + item1.background + ')' : '',
							'background-size'                  : "cover",
							"-webkit-animation-name"           : item1.animates,
							"-webkit-animation-duration"       : item1.time + "ms",
							"-webkit-animation-delay"          : ( item1.wait) + "ms",
							"-webkit-animation-iteration-count": item1.count,
							"-webkit-animation-fill-mode"      : 'both'
						})
						.attr('id', item1.id)
						.addClass(item1.id)
						.appendTo($("#" + item.id + ""));
					item1.dom.forEach(function (item2) {

						if (item2.type == "img") {
							var name2 = loader.getName(item2.src);
							var img2  = loader.imageArr[name2].cloneNode(true);
							$(img2).css({
									width                              : item2.rect.w,
									height                             : item2.rect.h,
									top                                : item2.rect.y,
									left                               : item2.rect.x,
									position                           : "absolute",
									"z-index"                          : item2.zIndex,
									display                            : item2.no_dis,
									"-webkit-animation-name"           : item2.animates,
									"-webkit-animation-duration"       : item2.time + "ms",
									"-webkit-animation-delay"          : item2.wait + "ms",
									"-webkit-animation-iteration-count": item2.count,
									'-webkit-animation-timing-function': item2.fun,
									"-webkit-animation-fill-mode"      : 'both'
								})
								.addClass(item2.class)
								.attr("id", item2.id)
								.appendTo($("." + item1.id + " "));
						}
					})
				}
			});
		});
	},

	// 播放音乐
	playMusic: function (id) {
		this.isMusicOpened && this.sound.playMusic(id);
	},

	// 暂停播放
	pauseMusic: function (id) {
		this.sound.pauseMusic(id);
	},

	// 播放音效
	playEffect: function (id) {
		this.isMusicOpened && this.sound.playEffect(id);
	},

	// 统计
	log: function (_name, attr) {
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
				appId  : "D1WK0bubG5u9CcPWsyg3CgaE-gzGzoHsz",
				appKey : "wjdKeqeKE1t0ouFdldTTSRIe",
               /* appId  : "A4oo8dc6RgrPupRQfsRqJqtk-gzGzoHsz",
                appKey : "LczaQ7zARbaVVl8o4IXMKsky",*/
				version: "1.8.6",
				channel: "h5_buyansu"
			});
			analytics.send({
					event   : _name,
					attr    : attr,
					duration: 1000
				},
				function (result) {
					// console.log("init success");
				});
			AVInit = true;
		} else if (AV) {
			analytics.send({
				event   : _name,
				attr    : attr,
				duration: 1000
			}, function (result) {
				// console.log("send success");
			});
		}
	},

	// 设计分享语
	setShare: function (title,text,text2) {
		$.SetShare(
			title,
			text,
			text2,
            h5_config.baseLink+h5_config.para,
			(this.baseUrl || h5_config.baseLink) + 'images/icon.jpg',
			function () {
				game.log(h5_config.appName + "_timeline");//统计分享到朋友圈
			},
			function () {

				game.log(h5_config.appName + "_friend");//统计分享给朋友
			}
		);
	},

	getElementById: function (id, tagName, parentElement, page, className, event) {
		var element = document.getElementById(id);
		if (!element) {
			if (tagName && tagName === 'img') {
				element = loader.imageArr[id].cloneNode();
			} else {
				element = document.createElement(tagName || 'div');
			}

			var styleConfig = page && config.pages[page] && config.pages[page][id];

			if (styleConfig) {
				styleConfig.origin = styleConfig.origin || {x: 0.5, y: 0.5};
				styleConfig.center = styleConfig.center || {x: 0.5, y: 0.5};
				styleConfig.w      = styleConfig.w || element.width;
				styleConfig.h      = styleConfig.h || element.height;


				var ratio      = window.innerHeight / 1008;
				var translateX = window.innerWidth * styleConfig.origin.x + (window.innerWidth - 640 * ratio) * (styleConfig.origin.x % 0.5) + styleConfig.x * ratio - styleConfig.w * styleConfig.center.x;
				var translateY = window.innerHeight * styleConfig.origin.y + styleConfig.y * ratio - styleConfig.h * styleConfig.center.y;

				element.style.position              = 'absolute';
				element.style.top                   = '0';
				element.style.left                  = '0';
				element.style.width                 = styleConfig.w + 'px';
				element.style.height                = styleConfig.h + 'px';
				element.style.transform             = 'translate(' + translateX + 'px,' + translateY + 'px) scale(' + ratio + ')';
				element.style.webkitTransform       = 'translate(' + translateX + 'px,' + translateY + 'px) scale(' + ratio + ')';
				element.style.transformOrigin       = styleConfig.center.x * 100 + '% ' + styleConfig.center.y * 100 + '%';
				element.style.webkitTransformOrigin = styleConfig.center.x * 100 + '% ' + styleConfig.center.y * 100 + '%';
				element.style.zIndex                = styleConfig.z;
			}

			element.style.display = 'block';

			element.id = id;
			className && ( element.className = className);

			event && element.addEventListener(event.type, event.listener);
			(parentElement || document.body).appendChild(element);
		}

		return element;
	}
};

var game = new Game(h5_config && h5_config.baseUrl);

//Loader
var Loader = function (baseUrl) {
	this.baseUrl     = baseUrl || "";
	this.imageArr    = {};
	this.asyncArr    = [];
	this.syncArr     = [];
	this.queues      = [];
	this.result      = {};
	this.cache       = {};
	this.svgArr      = {};
	this.noCache     = true;
	this.totalCount  = 0;
	this.loadedCount = 0;
};

Loader.prototype = {
	getUrl: function (src, type) {
		var url = '';
		type    = type !== undefined ? type : '';

		if (src.indexOf("http://") >= 0 || src.indexOf("https://") >= 0) {
			url = src;
		} else if (src.indexOf("/") >= 0) {
			url = this.baseUrl + src;
		} else {
			url = this.baseUrl + type + "/" + src;
		}

		url += this.noCache ? ((/\?/.test(url) ? "&" : "?") + "_=" + (new Date()).getTime()) : '';

		return url;

	},

	getName: function (src) {
		if (src.indexOf('/') >= 0) {
			var arr = src.split('/');
			src     = arr[arr.length - 1];
		}

		if (src.indexOf('.') >= 0) {
			var arr = src.split('.');
			src     = arr[0];
		}

		return src;
	},

	getXMLHttpRequest: function () {
		return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
	},

	loadScript: function (src, callback) {
		var head       = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
		var script     = document.createElement("script");
		script.async   = false;
		script.type    = "text/javascript";
		script.charset = "utf-8";
		script.src     = this.getUrl(src, 'js');
		head.insertBefore(script, head.firstChild);
		if (callback) {
			document.addEventListener ? script.addEventListener("load", callback, false) : script.onreadystatechange = function () {
				if (/loaded|complete/.test(script.readyState)) {
					script.onreadystatechange = null;
					callback();
				}
			}
		}
	},

	loadCSS: function (src, callback) {

	},

	loadImage: function (src, callback, option) {
		var self = this;
		var url  = this.getUrl(src, 'images');
		var opt  = {isCrossOrigin: true};

		opt.isCrossOrigin = (option && option.isCrossOrigin !== undefined) ? option.isCrossOrigin : opt.isCrossOrigin;

		var image = new Image();
		image.src = url;
		if (opt.isCrossOrigin && location.origin !== "file://")
			image.crossOrigin = "Anonymous";

		var loadCallback = function () {
			this.removeEventListener('load', loadCallback, false);
			this.removeEventListener('error', errorCallback, false);

			self.insertImage(self.getName(src), image);

			callback && callback();
		};

		var errorCallback = function () {
			this.removeEventListener('error', errorCallback, false);

			if (image.crossOrigin && image.crossOrigin.toLowerCase() === "anonymous") {
				opt.isCrossOrigin = false;
				self.loadImage(url, callback, opt);
			} else {
				// console.error('load image ' + src + ' failed');
				callback && callback();
			}
		};

		image.addEventListener("load", loadCallback);
		image.addEventListener("error", errorCallback);
	},

	insertImage: function (url, obj) {
		this.imageArr[url]           = obj;
		this.cache[this.getUrl(url)] = {type: 'image', res: obj.img};
	},

	loadTxt: function (url, cb) {
		var xhr     = this.getXMLHttpRequest(),
			errInfo = "load " + url + " failed!";

		url = this.getUrl(url);
		xhr.open("GET", url, true);
		if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
			// IE-specific logic here
			xhr.setRequestHeader("Accept-Charset", "utf-8");
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4)
					xhr.status === 200 ? cb(null, xhr.responseText) : cb({
						status      : xhr.status,
						errorMessage: errInfo
					}, null);
			};
		} else {
			if (xhr.overrideMimeType) xhr.overrideMimeType("text\/plain; charset=utf-8");
			xhr.onload  = function () {
				if (xhr.readyState === 4)
					xhr.status === 200 ? cb(null, xhr.responseText) : cb({
						status      : xhr.status,
						errorMessage: errInfo
					}, null);
			};
			xhr.onerror = function () {
				cb({status: xhr.status, errorMessage: errInfo}, null);
			};
		}
		xhr.send(null);
	},

	loadPlist: function (src, callback) {
		var self = this;
		this.loadTxt(src, function (err, txt) {
			self.cache[self.getUrl(src)] = {type: 'plist', res: txt};
			callback();
		});
	},

	loadFnt: function (src, callback) {
		var self = this;
		this.loadTxt(src, function (err, txt) {
			self.cache[self.getUrl(src)] = {type: 'fnt', res: txt};
			callback();
		});
	},

	loadSvg: function (src, callback) {
		var self = this;
		this.loadTxt(src, function (err, txt) {
			self.svgArr[self.getName(src)] = txt;
			callback && callback();
		});
	},

	load: function (type, src, callback) {
		switch (type) {
			case "script":
				this.loadScript(src, callback);
				break;
			case "css":
				this.loadCSS(src, callback);
				break;
			case "image":
				this.loadImage(src, callback);
				break;
			case "plist":
				this.loadPlist(src, callback);
				break;
			case "fnt":
				this.loadFnt(src, callback);
				break;
			case "svg":
				this.loadSvg(src, callback);
				break;
			default :
				break;
		}
	},

	loadSync: function (configs, percentage, next, index) {
		if (configs.length > 0) {
			index      = index || 0;
			var config = configs[index];
			var that   = this;
			this.load(config[0], config[1], function () {
				percentage(configs.length, index + 1);
				if (index < configs.length - 1) {
					that.loadSync(configs, percentage, next, index + 1);
				} else {
					next.apply(this, arguments);
				}
			});
		} else {
			next();
		}

	},

	loadAsync: function (configs, percent, finish) {
		var index = 0;
		for (var i = 0; i < configs.length; i++) {
			var config = configs[i];
			this.load(config[0], config[1], function () {
				index++;
				percent(configs.length, index);
				if (index == configs.length) {
					finish.apply(this, arguments);
				}
			})
		}
	},

	addQueue: function (type, url, sync, loader_index) {

		this.totalCount++;

		var config   = [type, url];
		loader_index = loader_index || 0;
		if (sync) {
			//同步列队
			this.queues[loader_index].syncArr.push(config);
			//this.syncArr.push(config)
		} else {
			this.queues[loader_index].asyncArr.push(config);
			//this.asyncArr.push(config);
		}
	},

	execQueue: function (percent, finish, loader_index) {
		loader_index = loader_index || 0;
		var total    = this.queues[loader_index].asyncArr.length + this.queues[loader_index].syncArr.length;
		var that     = this;
		this.loadSync(this.queues[loader_index].syncArr,
			function (a, index) {
				// percent(total, index, loader_index);
				percent(that.totalCount, ++that.loadedCount, loader_index);
			}, function () {
				that.loadAsync(that.queues[loader_index].asyncArr, function (a, index) {
					// percent(total, index + that.queues[loader_index].syncArr.length, loader_index)
					percent(that.totalCount, ++that.loadedCount, loader_index)
				}, function () {
					//当前page全部执行完毕之后
					finish(loader_index);   //执行依次finish回调
					if (loader_index < that.queues.length - 1) {
						that.execQueue(percent, finish, loader_index + 1);
					}
				});
			}, 0);
	},

	loadConfig: function (config, percent, finish, page_index) {
		var total_queue_count = config.pages.length;
		page_index            = page_index || 0;
		this.queues.push({
			asyncArr: [],
			syncArr : [],
			finished: false
		});

		var js = config.basic.js;
		for (var i = 0; i < js.length; i++) {
			if (js[i].sync) {//同步列队
				this.addQueue("script", js[i].url, true, 0);
			} else {
				this.addQueue("script", js[i].url, false, 0);
			}
		}

		var images = config.basic.images;
		for (var i = 0; i < images.length; i++) {
			this.addQueue("image", images[i], false, 0);
		}

		var res = config.basic.res;
		for (var i = 0; i < res.length; i++) {
			this.addQueue(res[i].type, res[i].url, false, 0)
		}
		var pages = config.pages;
		// console.log(pages.length)  ---->12
		for (var i = 0; i < pages.length; i++) {
			//
			if (i > 0) {
				this.queues.push({
					asyncArr: [],
					syncArr : [],
					finished: false
				});
			}
			var page = pages[i];
			// console.log(page.dom);----->12个object

			for (var j = 0; j < page.dom.length; j++) {
				var _dom = page.dom[j]; //获取该dom元素的fill
				if (_dom.src) {
					this.addQueue("image", _dom.src, false, i);
				}
				// console.log(_dom.type)
				if (_dom.type == 'div') {
					for (var k = 0; k < pages[i].dom[j].dom.length; k++) {
						var dom2 = pages[i].dom[j].dom[k];
						if (dom2.src) {
							this.addQueue("image", dom2.src, false, i);
						}
					}
				}


			}
		}
		this.execQueue(percent, finish, page_index);    //执行同步loading
	}
};

var loader = new Loader(h5_config && h5_config.baseUrl);

loader.load("script", "js/config.js", function () {
	loader.loadConfig(config, function (total, index, pindex) {
		game.loadPercentCallback(total, index);
		//console.log(total + 'total   index '+index)
	}, function (pindex) {
		if (pindex == 2) {
			game.loadFinishCallback();
		}
	}, 0);
});
