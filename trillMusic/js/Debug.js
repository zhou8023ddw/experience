/**
 * Created by Quan on 2017/6/7.
 */

var Debug = function () {
	this.element = null;

	this.init();

	return this;
};

Debug.prototype = {
	init: function () {
		this.initElement();
		this.resetConsole();
	},

	initElement: function () {
		var debug = this.element = document.createElement('div');
		debug.style.position        = 'absolute';
		debug.style.width           = '100%';
		debug.style.height          = '30%';
		debug.style.top             = '0';
		debug.style.left            = '0';
		debug.style.fontSize        = '10px';
		debug.style.backgroundColor = 'rgba(0,0,0,0.5)';
		debug.style.overflow        = 'scroll';
		debug.style.color           = 'white';
		debug.style.zIndex          = '111111';
		document.body.appendChild(debug);
	},

	getTimestamp: function () {
		return +new Date();
	},

	resetConsole: function () {
		var self = this;

		console.log = function (msg) {
			self.element.innerHTML += self.getTimestamp() + ' : ' + msg + '<br>';
			self.element.scrollTop = self.element.scrollHeight;
		};
	}
};