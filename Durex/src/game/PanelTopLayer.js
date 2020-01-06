
var PanelTopLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        this.onlineNum  = 0;
        this.allBirdNum = 0;
        this.myBirdNum  = 0;
    },

    initUI: function() {
        MyFunction.addSprite(this, '#panel_right_up.png', {x: 139, y: cc.winSize.height - 120}, 1);

        this.onlineNumLabel  = this.addBMLabel(this.onlineNum, {
            x:     199,
            y:     cc.winSize.height - 47 + 6,
            scale: 0.35
        }, 2);
        this.allBirdNumLabel = this.addBMLabel(this.allBirdNum, {
            x:     199,
            y:     cc.winSize.height - 120 + 7,
            scale: 0.35
        }, 2);
        this.myBirdNumLabel  = this.addBMLabel(this.myBirdNum, {
            x:     199,
            y:     cc.winSize.height - 195 + 8,
            scale: 0.35
        }, 2);
    },

    addBMLabel: function(text, attr, z) {
        var label = new cc.LabelBMFont(String(text), res.Num_fnt);
        label.attr(attr);
        this.addChild(label, z);

        return label;
    },

    updatePanel: function(onlineNum, allBirdNum, myBirdNum) {
        this.onlineNum  = onlineNum;
        this.allBirdNum = allBirdNum;
        this.myBirdNum  = myBirdNum;

        this.onlineNumLabel.setString(game['globalNumArr'][0]);
        this.allBirdNumLabel.setString(game['globalNumArr'][1]);
        this.myBirdNumLabel.setString(game['globalNumArr'][2]);
    },

    onEnter: function() {
        this._super();

        this.initUI();
        //this.scheduleUpdate();
    },

    update: function(dt) {
        game['globalNumArr'][2] = game['myBirdNumArr'][0] + game['myBirdNumArr'][1] + game['myBirdNumArr'][2] + game['myBirdNumArr'][3];
        //this.updatePanel(game['globalNumArr'][0], game['globalNumArr'][1], game['globalNumArr'][2]);
        this.onlineNumLabel.setString(game['globalNumArr'][0]);
        this.allBirdNumLabel.setString(game['globalNumArr'][1]);
        this.myBirdNumLabel.setString(game['globalNumArr'][2]);
    }
});