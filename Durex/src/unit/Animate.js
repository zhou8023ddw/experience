/**
 * Created by Quan on 16/7/25.
 */

var Animate = cc.Sprite.extend({
    ctor: function(name, config) {
        this._super('#ani_' + name + '_01.png');

        this.name = name;

        if (config) {
            this.config = config;
        } else {
            var aniConfig = Config.ANI[this.name];
            this.config   = {frameNum: aniConfig[0], frameDur: aniConfig[1], loop: aniConfig[2]};
        }

        this.ani = null;
    },

    initAni: function() {
        var aniFrames = [];
        for (var i = 1; i <= this.config.frameNum; i++) {
            i = i <= 9 ? '0' + i : i;

            var spriteFrame = cc.spriteFrameCache.getSpriteFrame('ani_' + this.name + '_' + i + ".png");
            aniFrames.push(spriteFrame);
        }

        this.ani = new cc.Animation(aniFrames, this.config.frameDur);
    },

    showAni: function(callback) {
        if (this.config.loop) {
            this.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.animate(this.ani),
                        cc.callFunc(function() {
                            if (callback) {
                                callback();
                            }
                        })
                    )
                )
            )
        } else {
            this.runAction(
                cc.sequence(
                    cc.animate(this.ani),
                    cc.callFunc(function() {
                        if (callback) {
                            callback();
                        }
                    })
                )
            )
        }
    },

    onEnter: function() {
        this._super();

        this.initAni();
    }
});