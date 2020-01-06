/**
 * Created by Quan on 2017/6/7.
 */
var Video = function (id, option) {
	this.id      = id || 'video';
	this.option  = option || {};
	this.element = document.getElementById(this.id);

	this.pageId      = option['pageId'] || 'root';
	this.pageElement = document.getElementById(this.pageId);

	//console.log(this.pageId)

	this.isInTBS      = false;
	this.isRightEvent = false;

	this.onEnterFullScreenCallback = null;
	this.onExitFullScreenCallback  = null;

	this.init();
};

Video.prototype = {

	init: function () {
		this.checkTBS();
		this.initElement();
		this.initListener();
	},

	checkTBS: function () {
		var ua     = window.navigator.userAgent;
		var TBS    = ua.match(/TBS\/([\d.]+)/);
		var TBS_V0 = '036849'; // TBS >=036849 支持 x5-video-player-type
		var TBS_V1 = '036900'; // TBS >=036900 正确支持 x5videoenterfullscreen，036849 <= TBS < 036900 支持的 x5videoxxxx 事件是反的

		var QQB    = ua.match(/MQQBrowser\/([\d.]+)/);
		var QQB_V0 = '7.1'; // MQQBrowser >=7.1 支持 x5-video-player-type
		var QQB_V1 = '7.2'; // MQQBrowser >=7.2 正确支持 x5videoenterfullscreen，7.1 <= TBS < 7.2 支持的 x5videoxxxx 事件是反的

		if (TBS) {
			this.isInTBS      = true;
			this.isRightEvent = TBS[1] >= TBS_V1;
		} else if (QQB) {
			this.isInTBS      = true;
			this.isRightEvent = QQB[1] >= QQB_V1;
		}
	},

	initElement: function () {
	},

	initListener: function () {
		var self = this;

		// 处理 tbs/QQBrowser 的兼容性
		if (this.isInTBS) {
			this.element.addEventListener("x5videoenterfullscreen", function (e) {

				if (self.isRightEvent) {
					self.onEnterFullScreenCallback && self.onEnterFullScreenCallback(e);
				} else {
					self.onExitFullScreenCallback && self.onExitFullScreenCallback(e);
				}
			});

			this.element.addEventListener("x5videoexitfullscreen", function (e) {

				if (self.isRightEvent) {
					self.onExitFullScreenCallback = self.onExitFullScreenCallback(e);
				} else {
					self.onEnterFullScreenCallback = self.onEnterFullScreenCallback(e);
				}
			})
		}
	},

	setCurrentTime: function (currentTime) {
		this.pause();
		this.element.currentTime = currentTime;
		this.play();


	},
	show: function (duration) {
		this.pageElement.style.display = 'block';
	},

	play: function () {
		this.element.play();
	},

	pause: function () {
		this.element.pause();
	},

	skip: function () {
		this.pause();
		this.element.currentTime = 0;
	},

	on: function (eventName, callback) {
		switch (eventName) {
			case 'timeupdate':
				this.element.addEventListener("timeupdate", callback);
				break;
			case 'ended':
				this.element.addEventListener("end", callback);
				break;
			case 'x5videoenterfullscreen':
				this.onEnterFullScreenCallback = callback;
				break;
			case 'x5videoexitfullscreen':
				this.onExitFullScreenCallback = callback;
				break;
			default:
		}
	}
};