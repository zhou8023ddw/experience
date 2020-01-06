
var LocationTipLayer = cc.LayerColor.extend({
    ctor: function(callback) {
        this._super(cc.color(0, 0, 0, 177));

        this.callback = callback;
    },

    initUI: function() {
        var self = this;

        MyFunction.addSprite(this, '#evolution_bg_yy.png', {
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        }, 1);

        MyFunction.addSprite(this, '#tip_text_location.png', {
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2 + 49
        }, 2);

        this.button_location = MyFunction.addSprite(this, '#button_location.png', {
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2 - 93
        }, 2, Config.TAG.BUTTON_LOCATION);
    },

    initListener: function() {
        var self = this;
        var listener = cc.EventListener.create({
            event:          cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:   function(touch, event) {
                var target         = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var size           = target.getContentSize();
                var rect           = cc.rect(0, 0, size.width, size.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    return true;
                }

                return false;
            },
            onTouchEnded:   function(touch, event) {
                var target = event.getCurrentTarget();
                if (target.tag === Config.TAG.BUTTON_LOCATION) {
                    self.callback();
                    self.removeFromParent(true);
                }
            }
        });

        cc.eventManager.addListener(listener.clone(), this);
        cc.eventManager.addListener(listener.clone(), this.button_location);
    },

    onEnter: function() {
        this._super();

        this.initUI();
        this.initListener();
    }
});