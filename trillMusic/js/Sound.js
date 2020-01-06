/**
 * Created by Quan on 16/8/1.
 */

var Sound = function (baseUrl, audioArr) {
	this.baseUrl  = baseUrl;
	this.audioArr = audioArr;
	this.audios   = {};
};

Sound.prototype = {
	initSound: function () {
		var audioDiv = document.getElementById('audio');
		if (!audioDiv) {
			audioDiv    = document.createElement('div');
			audioDiv.id = 'audio';
			document.body.appendChild(audioDiv);
		}

		for (var i = 0; i < this.audioArr.length; i++) {
			var audio      = document.createElement('audio');
			audio.src      = this.baseUrl + 'res/audio/' + this.audioArr[i] + '.mp3';
			audio.preload  = 'auto';
			audio.loop     = false;
			audio.autoplay = false;
			audio.id       = this.audioArr[i];
			audioDiv.appendChild(audio);

			this.audios[this.audioArr[i]] = audio;
		}
	},

	playMusic: function (id) {

		console.log('play music');

		var music = this.audios[id];
		if (music && music.paused) {
			music.play();
			music.loop = true;
		}
	},

	pauseMusic: function (id) {
		console.log('pause music');

		var music = this.audios[id] || {paused: true};
		if (music.paused) {
			return;
		}
		music.pause();
	},

	playEffect: function (id) {
		var effect = this.audios[id];
		if (effect && effect.paused) {
			effect.play();
		}
	}
};