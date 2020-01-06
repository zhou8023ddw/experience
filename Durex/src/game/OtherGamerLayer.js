
var OtherGamerLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        this.gamerArr = [];
    },

    initUI: function() {
    },

    addGamer: function(type, x, y, key) {
        var sex   = type === 1 ? 'boy' : 'girl';
        var gamer = MyFunction.addSprite(this, '#game_' + sex + '_other.png', {
            x:     x,
            y:     y,
            scale: 0.3
        }, 1, key);

        this.gamerArr.push(gamer);
    },

    onEnter: function() {
        this._super();

        this.initUI();

        this.scheduleUpdate();
    },

    update: function(dt) {
        var gamerArrTemp = this.gamerArr.concat();

        for (var i = 0; i < game['otherUserArr'].length; i++) {
            var gamer = game['otherUserArr'][i];

            if ('x' in gamer) {
                var g0 = null;
                for (var j = 0; j < gamerArrTemp.length; j++) {
                    var gamerTemp = gamerArrTemp[j];

                    if (gamer.key === gamerTemp.getName()) {
                        gamerTemp.x = gamer.x;
                        gamerTemp.y = gamer.y;
                        g0          = gamerTemp;
                        gamerArrTemp.splice(j, 1);
                    }
                }

                if (!g0) {
                    this.addGamer(gamer['type'], gamer['x'], gamer['y'], gamer['key']);
                }
            }
        }

        for (var k = 0; k < gamerArrTemp.length; k++) {
            var gamerTemp2 = gamerArrTemp[k];

            for (var m = 0; m < this.gamerArr.length; m++) {
                var b2 = this.gamerArr[m];
                if (b2.tag === gamerTemp2.getName()) {
                    this.gamerArr.splice(m, 1);
                }
            }

            gamerTemp2.removeFromParent(true);
        }
    }
});