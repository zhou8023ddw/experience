
var PanelBottomLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        this.ppNum = 0;
        this.ttNum = 1;
        this.bbNum = 2;
        this.yyNum = 3;
    },

    initUI: function() {
        MyFunction.addSprite(this, '#panel_left_bottom.png', {x: cc.winSize.width - 59, y: 144}, 1);

        this.ppNumLabel = this.addBMLabel(this.ppNum, {
            x:     cc.winSize.width - 53,
            y:     223,
            scale: 0.5
        }, 2);
        this.ttNumLabel = this.addBMLabel(this.ttNum, {
            x:     cc.winSize.width - 53,
            y:     175,
            scale: 0.5
        }, 2);
        this.bbNumLabel = this.addBMLabel(this.bbNum, {
            x:     cc.winSize.width - 53,
            y:     124,
            scale: 0.5
        }, 2);
        this.yyNumLabel = this.addBMLabel(this.yyNum, {
            x:     cc.winSize.width - 53,
            y:     67,
            scale: 0.5
        }, 2);
    },

    addBMLabel: function(text, attr, z) {
        var label = new cc.LabelBMFont(String(text), res.Num_fnt);
        label.attr(attr);
        this.addChild(label, z);

        return label;
    },

    updatePanel: function(ppNum, ttNum, bbNum, yyNum) {
        this.ppNum = ppNum;
        this.ttNum = ttNum;
        this.bbNum = bbNum;
        this.yyNum = yyNum;

        //game['globalNumArr'][2] = ppNum + ttNum + bbNum + yyNum;

        //this.ppNumLabel.setString(this.ppNum);
        //this.ttNumLabel.setString(this.ttNum);
        //this.bbNumLabel.setString(this.bbNum);
        //this.yyNumLabel.setString(this.yyNum);

        //if (this.ppNum >= 7) {
        //    game['myBirdNumArr'][0] -= 7;
        //    this.parent.showEvolutionLayer('pp');
        //}
        //
        //if (this.ttNum >= 7) {
        //    game['myBirdNumArr'][1] -= 7;
        //    this.parent.showEvolutionLayer('tt');
        //}
        //
        //if (this.bbNum >= 7) {
        //    game['myBirdNumArr'][2] -= 7;
        //    this.parent.showEvolutionLayer('bb');
        //}
        //
        //if (this.yyNum >= 7) {
        //    game['myBirdNumArr'][3] -= 7;
        //    this.parent.showEvolutionLayer('yy');
        //}
    },

    onEnter: function() {
        this._super();

        this.initUI();
        this.scheduleUpdate();
    },

    update: function(dt) {
        this.updatePanel(game['myBirdNumArr'][0], game['myBirdNumArr'][1], game['myBirdNumArr'][2], game['myBirdNumArr'][3]);

        this.ppNumLabel.setString(game['myBirdNumArr'][0]);
        this.ttNumLabel.setString(game['myBirdNumArr'][1]);
        this.bbNumLabel.setString(game['myBirdNumArr'][2]);
        this.yyNumLabel.setString(game['myBirdNumArr'][3]);
    }
});