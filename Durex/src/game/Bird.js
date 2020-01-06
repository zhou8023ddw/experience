var Bird = cc.Node.extend({
    ctor: function(type) {
        this._super();

        this.type = type;

        this.canCatch = false;
    },

    initUI: function() {
        this.bird       = new Animate('bird_' + this.type, {frameNum: 2, frameDur: 0.2, loop: true});
        this.bird.scale = 0.4 * Config.GLOBAL_SCALE;
        this.addChild(this.bird, 1);
        this.bird.showAni();

        if (this.type === Config.BIRD_TYPE.PP) {
            this.bird.anchorY = 0;
            this.bird.y       = -20;
        }

        this.catchTip = MyFunction.addSprite(this, '#tip_catch_off.png', {
            x:     10,
            y:     55,
            scale: 0.5
        }, 2);
    },

    updateScore: function() {
        switch (this.type) {
            case Config.BIRD_TYPE.PP:
                game['myBirdNumArr'][0]++;
                break;
            case Config.BIRD_TYPE.TT:
                game['myBirdNumArr'][1]++;
                break;
            case Config.BIRD_TYPE.BB:
                game['myBirdNumArr'][2]++;
                break;
            case Config.BIRD_TYPE.YY:
                game['myBirdNumArr'][3]++;
                break;
            default:
        }

    },

    setState: function(state, callback) {
        if (state === 'success') {
            this.bird.visible     = false;
            this.catchTip.visible = false;

            this.updateScore();
            MyFunction.addSprite(this, '#tip_catch_success.png', {scale: 0.4 * Config.GLOBAL_SCALE}, 1);
            var self = this;
            this.scheduleOnce(function() {
                if (callback) callback(self.getName());
                self.removeFromParent(true);
            }, 2, 'success');

            return true;
        }

        if (state === 'fail') {
            this.bird.visible     = false;
            this.catchTip.visible = false;

            MyFunction.addSprite(this, '#tip_catch_fail.png', {scale: 0.4 * Config.GLOBAL_SCALE}, 1);
            var self = this;
            this.scheduleOnce(function() {
                if (callback) callback(self.getName());
                self.removeFromParent(true);
            }, 2, 'fail');

            return true;
        }

        if (state) {
            this.catchTip.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('tip_catch_on.png'));
            this.canCatch = true;
        }else {
            this.catchTip.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('tip_catch_off.png'));
            this.canCatch = false;
        }
    },

    onEnter: function() {
        this._super();

        this.initUI();
        var birdLayer = new BirdLayer();
        this.addChild(birdLayer,2);
        console.log('出现小鸟？？？')
    }
});