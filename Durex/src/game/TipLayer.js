var TipLayer = cc.LayerColor.extend({
    ctor: function() {
        this._super(cc.color(0,0,0,177));
    },

    initUI: function() {
        var self = this;

        var tip_1 = MyFunction.addSprite(this, '#tip_text_0.png', {
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2 + 107
        }, 10);

        tip_1.runAction(
            cc.sequence(
                cc.delayTime(2),
                cc.callFunc(function(e) {
                    e.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('tip_text_1.png'));
                }, this),
                cc.delayTime(2),
                cc.callFunc(function(e) {
                    e.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('tip_text_2.png'));
                }, this),
                cc.delayTime(2),
                cc.callFunc(function(e) {
                    self.removeFromParent(true);
                }, this)
            )
        )
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
                var rect_boy       = cc.rect(cc.winSize.width / 2 - 289, 154, 289, 191);
                var rect_girl      = cc.rect(cc.winSize.width / 2, 154, 297, 191);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    return true;
                }

                return false;
            },
            onTouchEnded:   function(touch, event) {
                var target = event.getCurrentTarget();
            }
        });

        cc.eventManager.addListener(listener.clone(), this);
    },

    onEnter: function() {
        this._super();

        this.initUI();
        this.initListener();
    }
});