

var GamerLayer = cc.Layer.extend({
    ctor: function(selectedRole) {
        this._super();

        this.selectedRole = selectedRole;
        this.captureRange = null;
    },

    initUI: function() {

        var sex = this.selectedRole === 1 ? 'boy' : 'girl';

        this.gamer = MyFunction.addSprite(this, '#game_' + sex + '.png', {
            x:     cc.winSize.width / 2,
            y:     cc.winSize.height / 2,
            scale: 0.4
        }, 1);

    },

    setCaptuerRange: function(captureRange) {
        this.captureRange = captureRange;
    },

    onEnter: function() {
        this._super();

        this.initUI();

        this.scheduleUpdate();
    },

    update: function(dt) {
        if (game['userPos']) {
            this.gamer.x = game['userPos'].x;
            this.gamer.y = game['userPos'].y;

            if (this.captureRange) {
                this.captureRange.x = game['userPos'].x;
                this.captureRange.y = game['userPos'].y;

                this.captureRange.scale = game['catchRangeRadius'] * 2 / 352;
            }
        }
    }
});