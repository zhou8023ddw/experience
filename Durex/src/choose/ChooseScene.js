var ChooseLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        this.hasSelected  = false;
        this.selectedRole = 0;
    },

    initUI: function() {
        MyFunction.addSprite(this, res.Bg_Choose_jpg, {x: cc.winSize.width / 2, y: cc.winSize.height / 2}, 1);
        MyFunction.addSprite(this, '#book_bg.png', {x: cc.winSize.width / 2, y: 580}, 2);

        var book_text = MyFunction.addSprite(this, '#book_text.png', {
            x: cc.winSize.width + 300,
            y: cc.winSize.height - 119
        }, 3);

        book_text.runAction(
            cc.sequence(
                cc.delayTime(0.3),
                cc.moveTo(0.5, cc.winSize.width / 2 + 137, cc.winSize.height - 119).easing(cc.easeBackOut())
            )
        );

        var bird_pp = new Animate('bird_pp_1');
        bird_pp.attr({
            x:       cc.winSize.width / 2 - 123,
            y:       cc.winSize.height - 302 - 30,
            anchorY: 0,
            scale:   0.5 * Config.GLOBAL_SCALE
        });
        this.addChild(bird_pp, 3);
        bird_pp.showAni();

        var bird_tt = new Animate('bird_tt_1');
        bird_tt.attr({
            x:     cc.winSize.width / 2 - 123,
            y:     cc.winSize.height - 361,
            scale: 0.8 / 2 * Config.GLOBAL_SCALE
        });
        this.addChild(bird_tt, 3);
        bird_tt.showAni();

        var bird_bb = new Animate('bird_bb_1');
        bird_bb.attr({
            x:     cc.winSize.width / 2 - 123,
            y:     cc.winSize.height - 480,
            scale: 0.9 / 2 * Config.GLOBAL_SCALE
        });
        this.addChild(bird_bb, 3);
        bird_bb.showAni();

        var bird_yy = new Animate('bird_yy_1');
        bird_yy.attr({
            x:     cc.winSize.width / 2 - 123,
            y:     cc.winSize.height - 602,
            scale: 0.85 / 2 * Config.GLOBAL_SCALE
        });
        this.addChild(bird_yy, 3);
        bird_yy.showAni();

        var boy = new Animate('boy');
        boy.attr({
            x:        cc.winSize.width / 2 - 126,
            y:        252,
            flippedX: true,
            scale:    2 / 2 * Config.GLOBAL_SCALE
        });
        this.addChild(boy, 4, Config.TAG.BOY);
        boy.showAni();
        this.boy = boy;

        var girl = new Animate('girl');
        girl.attr({
            x:     cc.winSize.width / 2 + 151,
            y:     263,
            scale: 2 / 2 * Config.GLOBAL_SCALE
        });
        this.addChild(girl, 4, Config.TAG.GIRL);
        girl.showAni();
        this.girl = girl;

        this.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.callFunc(function() {
                        boy.setColor(cc.color(127, 127, 127));
                        girl.setColor(cc.color(255, 255, 255));
                    }),
                    cc.delayTime(0.5),
                    cc.callFunc(function() {
                        boy.setColor(cc.color(255, 255, 255));
                        girl.setColor(cc.color(127, 127, 127));
                    }),
                    cc.delayTime(0.5)
                )
            )
        );

        this.button_go = MyFunction.addSprite(this, '#button_go.png', {
            x:       cc.winSize.width / 2,
            y:       81,
            visible: false
        }, 5, Config.TAG.BUTTON_GO);
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

                if (cc.rectContainsPoint(rect_boy, locationInNode) && target.tag !== Config.TAG.BUTTON_GO) {
                    self.stopAllActions();
                    self.boy.setColor(cc.color(255, 255, 255));
                    self.girl.setColor(cc.color(127, 127, 127));
                    self.selectedRole      = 1;
                    self.hasSelected       = true;
                    self.button_go.visible = true;

                    game['playEffect']('effect_button');
                }

                if (cc.rectContainsPoint(rect_girl, locationInNode) && target.tag !== Config.TAG.BUTTON_GO) {
                    self.stopAllActions();
                    self.girl.setColor(cc.color(255, 255, 255));
                    self.boy.setColor(cc.color(127, 127, 127));
                    self.selectedRole      = 2;
                    self.hasSelected       = true;
                    self.button_go.visible = true;

                    game['playEffect']('effect_button');
                }

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    return true;
                }

                return false;
            },
            onTouchEnded:   function(touch, event) {
                var target = event.getCurrentTarget();

                if (target.tag === Config.TAG.BUTTON_GO && target.visible) {
                    if (game['showTransition']) {
                        cc.director.runScene(new cc.TransitionFade(0.5, new GameScene(self.selectedRole)));
                    } else {
                        cc.director.runScene(new GameScene(self.selectedRole));
                    }

                    game['playEffect']('effect_button');
                    game['chooseSexCallback'](self.selectedRole);
                }
            }
        });

        cc.eventManager.addListener(listener.clone(), this);
        cc.eventManager.addListener(listener.clone(), this.button_go);
    },

    onEnter: function() {
        this._super();

        this.initUI();
        this.initListener();
    }
});

var ChooseScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        var chooseLayer = new ChooseLayer();
        this.addChild(chooseLayer);
    }
});