var EvolutionBird = cc.Layer.extend({
    ctor: function(type) {
        this._super();

        this.state = 1;
        this.type  = type;
    },

    initUI: function() {
        this.bird = new Animate('bird_' + this.type + '_1');
        this.bird.attr({
            x:     cc.winSize.width / 2,
            y:     cc.winSize.height / 2 + 27,
            scale: 1.4 * Config.GLOBAL_SCALE
        });
        this.addChild(this.bird);
    },

    setState: function() {

    },



    onEnter: function() {
        this._super();

        this.initUI();
    }
});