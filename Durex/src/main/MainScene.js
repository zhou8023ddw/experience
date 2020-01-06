
var MainLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        this.canTouch = false;
    },

    initUI: function() {

        var self = this;

        //背景
        MyFunction.addSprite(this, res.Bg_Main_jpg, {x: cc.winSize.width / 2, y: cc.winSize.height / 2}, 1);
        MyFunction.addSprite(this, '#copyright.png', {x: 117, y: 18}, 2);
        MyFunction.addSprite(this, '#state_text.png', {x: cc.winSize.width - 129, y: 20}, 2);

        var logo = MyFunction.addSprite(this, '#logo.png', {
            x: cc.winSize.width / 2 - 17,
            y: cc.winSize.height + 170
        }, 2);

        logo.runAction(
            cc.sequence(
                cc.delayTime(0.6),
                cc.moveTo(1.2, cc.winSize.width / 2 - 17, cc.winSize.height - 195).easing(cc.easeElasticOut())
            )
        );

        var text = MyFunction.addSprite(this, '#main_text.png', {
            x: cc.winSize.width / 2,
            y: -40
        }, 2);

        text.runAction(
            cc.sequence(
                cc.delayTime(0.6),
                cc.moveTo(1.2, cc.winSize.width / 2, 98).easing(cc.easeElasticOut())
            )
        );

        var boy = MyFunction.addSprite(this, '#main_boy.png', {
            x: -200,
            y: 426
        }, 6);
        this.showAction(boy, 0.3, 0.5, cc.winSize.width / 2 - 232, 426);

        var boy_cloud_0 = MyFunction.addSprite(this, '#main_boy_cloud.png', {
            x:     -200,
            y:     395,
            scale: 1
        }, 2);
        this.showAction(boy_cloud_0, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 - 301, 395);

        var boy_cloud_1 = MyFunction.addSprite(this, '#main_boy_cloud.png', {
            x:     -200,
            y:     275,
            scale: 1.1
        }, 4);
        this.showAction(boy_cloud_1, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 - 181, 275);

        var boy_cloud_2 = MyFunction.addSprite(this, '#main_boy_cloud.png', {
            x:     -200,
            y:     350,
            scale: 0.8
        }, 5);
        this.showAction(boy_cloud_2, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 - 175, 350);

        var boy_cloud_3 = MyFunction.addSprite(this, '#main_boy_cloud.png', {
            x:     -200,
            y:     332,
            scale: 1
        }, 8);
        this.showAction(boy_cloud_3, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 - 310, 332);

        var boy_cloud_4 = MyFunction.addSprite(this, '#main_boy_cloud.png', {
            x:     -200,
            y:     289,
            scale: 0.8
        }, 10);
        this.showAction(boy_cloud_4, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 - 83, 289);

        var boy_bird_0 = MyFunction.addSprite(this, '#main_boy_bird_0.png', {
            x: -200,
            y: 396
        }, 3);
        this.showAction(boy_bird_0, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 - 86, 396);

        var boy_bird_1 = MyFunction.addSprite(this, '#main_boy_bird_1.png', {
            x: -200,
            y: 249
        }, 7);
        this.showAction(boy_bird_1, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 - 187, 249);

        var boy_bird_2 = MyFunction.addSprite(this, '#main_boy_bird_2.png', {
            x: -200,
            y: 228
        }, 9);
        this.showAction(boy_bird_2, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 - 281, 228);

        var boy_jq = MyFunction.addSprite(this, '#main_boy_jq.png', {
            x: -200,
            y: 257
        }, 11);
        this.showAction(boy_jq, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 - 228, 257);

        var girl = MyFunction.addSprite(this, '#main_girl.png', {
            x: cc.winSize.width + 200,
            y: 440
        }, 4);
        this.showAction(girl, 0.3, 0.5, cc.winSize.width / 2 + 286, 440);

        var girl_cloud_0 = MyFunction.addSprite(this, '#main_girl_cloud_1.png', {
            x:     cc.winSize.width + 200,
            y:     269,
            scale: 1
        }, 2);
        this.showAction(girl_cloud_0, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 + 222, 269);

        var girl_cloud_1 = MyFunction.addSprite(this, '#main_girl_cloud_0.png', {
            x:     cc.winSize.width + 200,
            y:     350,
            scale: 1
        }, 3);
        this.showAction(girl_cloud_1, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 + 181, 350);

        var girl_cloud_2 = MyFunction.addSprite(this, '#main_girl_cloud_0.png', {
            x:     cc.winSize.width + 200,
            y:     323,
            scale: 1
        }, 5);
        this.showAction(girl_cloud_2, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 + 284, 323);

        var girl_cloud_3 = MyFunction.addSprite(this, '#main_girl_cloud_0.png', {
            x:     cc.winSize.width + 200,
            y:     229,
            scale: 1
        }, 7);
        this.showAction(girl_cloud_3, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 + 347, 229);

        var girl_bird = MyFunction.addSprite(this, '#main_girl_bird.png', {
            x: cc.winSize.width + 200,
            y: 287
        }, 6);
        this.showAction(girl_bird, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 + 222, 287);

        var girl_jq = MyFunction.addSprite(this, '#main_girl_jq.png', {
            x: cc.winSize.width + 200,
            y: 298
        }, 8);
        this.showAction(girl_jq, 0.2 + Math.random() * 0.3, 0.4 + Math.random() * 0.4, cc.winSize.width / 2 + 128, 298);

        this.scheduleOnce(function() {
            self.canTouch = true;
        }, 1.3, 'canTouch');

        if(game['showFlowerInAndroid'] || cc.sys.os === cc.sys.OS_IOS) {
            var flowerLayer = new FlowerLayer();
            this.addChild(flowerLayer, 20);
        }

        game['initFinishCallback']();
    },

    showAction: function(sprite, delay, duration, posX, posY) {
        sprite.runAction(
            cc.sequence(
                cc.delayTime(delay),
                cc.moveTo(duration, posX, posY).easing(cc.easeBackOut())
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
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    game['playMusic']('music_bg');

                    return self.canTouch;
                }
                return false;
            },
            onTouchEnded:   function(touch, event) {
                var target = event.getCurrentTarget();

                if(game['mySex'] > 0) {
                    if(game['showTransition']) {
                        cc.director.runScene(new cc.TransitionFade(0.5, new GameScene(game['mySex'])));
                    }else {
                        cc.director.runScene(new GameScene(game['mySex']));
                    }
                }else {
                    if(game['showTransition']) {
                        cc.director.runScene(new cc.TransitionFade(0.5, new ChooseScene()));
                    }else {
                        cc.director.runScene(new ChooseScene());
                    }
                }
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

var MainScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        var mainLayer = new MainLayer();
        this.addChild(mainLayer);
    }
});