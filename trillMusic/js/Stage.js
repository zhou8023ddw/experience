/**
 * Created by Quan on 2017/6/6.
 */

var ResolutionPolicy = {
	FIXED_WIDTH : 1,
	FIXED_HEIGHT: 2,
	NO_BORDER   : 3,
	NO_BORDER_VIDEO : 4
};

var Stage = function (id, option) {
	this.id     = id || 'root';
	this.option = option || {};

	this.width  = option.width || 640;
	this.height = option.height || 1008;
	this.zIndex = option.zIndex || 1;

	this.resolutionPolicy = option.resolutionPolicy || ResolutionPolicy.NO_BORDER;

	this.elementParent = option.parent || document.body;

	this.element = document.getElementById(this.id);

	this.resizeCallbackArr = [];
	this.resizeIntervalId  = null;

	this.init();

	return this;
};

Stage.prototype = {

	init: function () {
		var self = this;

		this.setElement();

		this.resize();

		window.addEventListener('resize', function () {
			self.resize();
		});
	},

	setElement: function () {
		if (!this.element) {
			this.element    = document.createElement('div');
			this.element.id = this.id;
			this.elementParent.appendChild(this.element);
		}

		var style      = this.element.style;
		style.position = 'absolute';
		style.width    = this.width + 'px';
		style.height   = this.height + 'px';
		style.top      = 0;
		style.left     = 0;
		style.zIndex   = this.zIndex
	},

	setResizeCallback: function (callback) {
		if (typeof callback == 'function') {
			this.resizeCallbackArr.push(callback);
		}
	},

	resizeDelay: function () {
		var w = window.innerWidth;
		var h = window.innerHeight;

		// console.log('delay : ' + w + ' , ' + h);

		var style = this.element.style;

		var isWider = w / h > (w > h ? this.height / this.width : this.width / this.height);


		var isWidth = true;
		var isWidth2 = true;

		var policy_landscape = ResolutionPolicy.FIXED_WIDTH;
		var policy_portraint = ResolutionPolicy.FIXED_HEIGHT;

		if (this.resolutionPolicy instanceof Array) {
			policy_portraint = this.resolutionPolicy[0];
			policy_landscape = this.resolutionPolicy[1];
		} else {
			policy_portraint = this.resolutionPolicy;
			policy_landscape = this.resolutionPolicy;
		}

		if (w > h) {


			switch (policy_landscape) {
				case ResolutionPolicy.FIXED_WIDTH:
					isWidth = true;
					break;
				case ResolutionPolicy.FIXED_HEIGHT:
					isWidth = false;
					break;
				case ResolutionPolicy.NO_BORDER:
					isWidth = isWider;
					break;

				default:
			}

			if (isWidth) {
				// 横屏100%宽适配
				style.transform       = "rotate(-90deg) translate(" + (( -640 * (w / 1008) - h) / 2) + "px,0px) scale(" + w / 1008 + ")";
				style.webkitTransform = "rotate(-90deg) translate(" + (( -640 * (w / 1008) - h) / 2) + "px,0px) scale(" + w / 1008 + ")";
			} else {
				// 横屏100%高适配
				style.transform       = "rotate(-90deg) translate(-" + h + "px," + ((w - 1008 * (h / 640)) ) / 2 + "px) scale(" + h / 640 + ")";
				style.webkitTransform = "rotate(-90deg) translate(-" + h + "px," + ((w - 1008 * (h / 640)) ) / 2 + "px) scale(" + h / 640 + ")";
			}

		} else {
			switch (policy_portraint) {
				case ResolutionPolicy.FIXED_WIDTH:
					isWidth = true;
					break;
				case ResolutionPolicy.FIXED_HEIGHT:
					isWidth = false;
					break;
				case ResolutionPolicy.NO_BORDER:
					isWidth = isWider;
					break;
				case ResolutionPolicy.NO_BORDER_VIDEO:
					isWidth2 = isWider;
					break;
				default:
			}


			var ua     = window.navigator.userAgent;
			var TBS    = ua.match(/TBS\/([\d.]+)/);
			var TBS_V0 = '036849'; // TBS >=036849 支持 x5-video-player-type
			var TBS_V1 = '036900'; // TBS >=036900 正确支持 x5videoenterfullscreen，036849 <= TBS < 036900 支持的 x5videoxxxx 事件是反的

			var QQB    = ua.match(/MQQBrowser\/([\d.]+)/);
			var QQB_V0 = '7.1'; // MQQBrowser >=7.1 支持 x5-video-player-type
			var QQB_V1 = '7.2'; // MQQBrowser >=7.2 正确支持 x5videoenterfullscreen，7.1 <= TBS < 7.2 支持的 x5videoxxxx 事件是反的

			var videoBox = document.getElementById('container_video')

	 		if (isWidth) {
				//竖屏100%宽适配
				style.transform       = "translate(0px," + (h - 960 * (w / 540)) / 2 + "px) scale(" + w / 540 + ")";
				style.webkitTransform = "translate(0px," + (h - 960 * (w / 540)) / 2 + "px) scale(" + w / 540 + ")";
			 } else {
				//竖屏100%高适配
				style.transform       = "translate(" + (w - 540 * (h / 960) ) / 2 + "px,0px) scale(" + h / 960 + ")";
				style.webkitTransform = "translate(" + (w - 540 * (h / 960) ) / 2 + "px,0px) scale(" + h / 960 + ")";
			 }


		}

		style.transformOrigin = '0 0';

		for (var i = 0; i < this.resizeCallbackArr.length; i++) {
			var callback = this.resizeCallbackArr[i];
			callback && callback();
		}
	},

	resize: function () {
		var self = this;
		if (this.resizeIntervalId) clearTimeout(this.resizeIntervalId);

		var w = window.innerWidth;
		var h = window.innerHeight;

		// console.log('resize : ' + w + ' , ' + h);

		this.resizeIntervalId = setTimeout(function () {
			self.resizeDelay();
		}, 100);
	}
};

