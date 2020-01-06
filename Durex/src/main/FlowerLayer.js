

var FlowerLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        this.flowerArr = [];
    },


    addFlower: function() {
        var randomName  = '#f_' + Math.floor(Math.random() * 16) + '.png';
        var randomPosX  = cc.winSize.width / 2 + cc.winSize.width / 2 * (Math.random() - 0.5) * 2;
        var randomAngle = 360 * Math.random();
        var randomVelX  = (Math.random() - 0.5) * 2 * Config.VEL.RANGE_X;
        var randomVelY  = (Math.random() + 1) * Config.VEL.RANGE_Y;
        var randomVelR  = (Math.random() - 0.5) * 2 * Config.VEL.RANGE_R;
        var randomDur   = 3 + Math.random();
        var randomScale = 0.85 + Math.random() * 0.3;

        var flower    = MyFunction.addSprite(this, randomName, {
            x:        randomPosX,
            y:        cc.winSize.height + 30,
            scale:    randomScale
        });
        flower.velX   = randomVelX;
        flower.velY   = randomVelY;
        flower.velR   = randomVelR;
        flower.durMax = randomDur;
        flower.dur    = 0;

        this.flowerArr.push(flower);
    },

    onEnter: function() {
        this._super();

        this.scheduleUpdate();
        this.schedule(this.addFlower, 0.8, cc.REPEAT_FOREVER, 1, 'addFlower');
    },

    update: function(dt) {
        for (var i = 0; i < this.flowerArr.length; i++) {
            var flower = this.flowerArr[i];

            flower.x += flower.velX * dt;
            flower.y -= flower.velY * dt;

            flower.dur += dt;
            if (flower.dur >= flower.durMax) {
                flower.dur  = 0;
                flower.velX = -flower.velX;
            }

            if (flower.y <= -20) {
                flower.removeFromParent(true);
                this.flowerArr.splice(i, 1);
            }
        }
    }
});