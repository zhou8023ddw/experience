
var EvolutionLayer = cc.LayerColor.extend({
    ctor: function(type, status, data) {
        this._super(cc.color(0, 0, 0, 127));

        this.status = status;
        this.data   = data;
        this.type   = '';

        switch (type) {
            case 1 :
                this.type = 'pp';
                break;
            case 2 :
                this.type = 'tt';
                break;
            case 3 :
                this.type = 'bb';
                break;
            case 4 :
                this.type = 'yy';
                break;
            default:
        }

        this.hasShowResult = false;
    },

    initUI: function(type) {
        var self = this;

        this.bg = MyFunction.addSprite(this, '#evolution_bg_' + this.type + '.png', {
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        }, 1);
        if(this.type == 'tt'){
            this.bird1 = new Animate('bird_' + this.type + '_1');
            this.bird1.attr({
                x:     cc.winSize.width / 2,
                y:     cc.winSize.height / 2 + 27,
                scale: 1.4 * Config.GLOBAL_SCALE
            });
            this.addChild(this.bird1, 2);

            this.bird1.showAni(function() {
                self.checkState();
            });

            this.bird2 = new Animate('bird_' + this.type + '_2');
            this.bird2.attr({
                x:       cc.winSize.width / 2 +8,
                y:       cc.winSize.height / 2 + 38,
                scale:   1.25 * Config.GLOBAL_SCALE,
                visible: false
            });
            this.addChild(this.bird2, 2);

            this.bird3 = new Animate('bird_' + this.type + '_3');
            this.bird3.attr({
                x:       cc.winSize.width / 2,
                y:       cc.winSize.height / 2 + 27,
                scale:   1.25 * Config.GLOBAL_SCALE,
                visible: false
            });
            this.addChild(this.bird3, 2);
        }else{
            this.bird1 = new Animate('bird_' + this.type + '_1');
            this.bird1.attr({
                x:     cc.winSize.width / 2,
                y:     cc.winSize.height / 2 + 27,
                scale: 1.4 * Config.GLOBAL_SCALE
            });
            this.addChild(this.bird1, 2);

            this.bird1.showAni(function() {
                self.checkState();
            });

            this.bird2 = new Animate('bird_' + this.type + '_2');
            this.bird2.attr({
                x:       cc.winSize.width / 2,
                y:       cc.winSize.height / 2 + 27,
                scale:   1.25 * Config.GLOBAL_SCALE,
                visible: false
            });
            this.addChild(this.bird2, 2);

            this.bird3 = new Animate('bird_' + this.type + '_3');
            this.bird3.attr({
                x:       cc.winSize.width / 2,
                y:       cc.winSize.height / 2 + 27,
                scale:   1.25 * Config.GLOBAL_SCALE,
                visible: false
            });
            this.addChild(this.bird3, 2);
        }

        this.button_success = MyFunction.addSprite(this, '#evolution_success.png', {
            x:       cc.winSize.width / 2,
            y:       410,
            visible: false
        }, 3, Config.TAG.BUTTON_SUCCESS);

        this.button_fail = MyFunction.addSprite(this, '#button_fail.png', {
            x:       cc.winSize.width / 2,
            y:       433,
            visible: false
        }, 3, Config.TAG.BUTTON_FAIL);


        //this.reward_text_11 = new cc.Sprite("#reward_text_11.png");
        //this.addChild(this.reward_text_11,3,Config.TAG.BUTTON_TEXT11);
        //this.reward_text_21 = new cc.Sprite("#reward_text_21.png");
        //this.addChild(this.reward_text_21,3,Config.TAG.BUTTON_TEXT21);




    },

    checkState: function() {
        var self = this;

        this.bird1.removeFromParent(true);
        this.bird2.visible = true;
        this.bird2.showAni(function() {
            self.bird2.removeFromParent(true);
            self.bird3.visible = true;
            self.bird3.showAni(function() {
                if (!self.hasShowResult) {
                    self.hasShowResult = true;
                    self.showResult(self.status);
                }
            });
        });
    },

    showResult: function(result) {
        if (result) {
            this.button_success.visible = true;
            //cc.eventManager.addListener(this.listener.clone(), this.button_success);

            var self = this;

            var type = 0;
            switch (this.type) {
                case 'pp' :
                    type = 1;
                    this.scheduleOnce(function() {
                        //game['evolutionSuccessCallback'](type, self.data);
                        self.reward_1()
                    }, 1, 'reward_1');
                    break;
                case 'tt' :
                    type = 2;
                    this.scheduleOnce(function() {
                        //game['evolutionSuccessCallback'](type, self.data);
                        self.reward_2()
                    }, 1, 'reward_2');
                    break;
                case 'bb' :
                    type = 3;
                    this.scheduleOnce(function() {
                        game['showInputLayer'](self.data);
                        self.removeFromParent(true);
                    }, 1, 'showInputLayer');
                    break;
                case 'yy' :
                    this.scheduleOnce(function() {
                        self.showReward4YY();
                    }, 1, 'showReward4YY');
                    type = 4;
                    break;
                default:
            }

            MyFunction.addSprite(this, '#reward_text_' + this.data['fid'] + '.png', {x: cc.winSize.width / 2, y: 410}, 3);



        } else {
            this.bird3.removeFromParent(true);
            this.bg.removeFromParent(true);

            MyFunction.addSprite(this, '#evolution_fail.png', {x: cc.winSize.width / 2 + 12, y: 539}, 2);
            this.button_fail.visible = true;
            cc.eventManager.addListener(this.listener.clone(), this.button_fail);
        }
    },
    reward_1:function(){
      //alert('获得5元基金，跳转...');

        //this.removeFromParent(true);

    },
    reward_2:function(){
        //alert('获得10元基金，跳转...');
        //this.removeFromParent(true);
    },

    showReward4YY: function() {
        MyFunction.addSprite(this, '#bg_reward_tip.png', {x: cc.winSize.width / 2, y: cc.winSize.height / 2}, 5);

        var key      = this.data['key'];
        var keyArr   = key.split(',');
        var userName = keyArr[0];
        var passWord = keyArr[1];


        var fontDef = new cc.FontDefinition({
            fontName:  'Arial',
            fontSize:  30,
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            fillStyle: cc.color('#000000')
        });

        var label_username = new cc.LabelTTF(userName, fontDef);
        label_username.attr({
            x: cc.winSize.width / 2 + 43,
            y: cc.winSize.height / 2 - 61
        });
        this.addChild(label_username, 6);

        var label_password = new cc.LabelTTF(passWord, fontDef);
        label_password.attr({
            x: cc.winSize.width / 2 + 43,
            y: cc.winSize.height / 2 - 112
        });
        this.addChild(label_password, 6);


        var button_screen = MyFunction.addSprite(this, '#button_confirm_screen.png', {
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2 - 188
        }, 6, Config.TAG.BUTTON_SCREEN);
        cc.eventManager.addListener(this.listener.clone(), button_screen);
    },

    initListener: function() {
        var self = this;

        this.listener = cc.EventListener.create({
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
            onTouchEnded:   function(touch, event,data) {
                var target = event.getCurrentTarget();
                console.log(target)
                if (target.tag === Config.TAG.BUTTON_FAIL && target.visible) {
                    self.removeFromParent(true);
                }

                if (target.tag === Config.TAG.BUTTON_SUCCESS && target.visible) {
                    self.removeFromParent(true);
                }

                if (target.tag === Config.TAG.BUTTON_SCREEN && target.visible) {
                    self.removeFromParent(true);
                }

                var delta = touch.getLocation();
                console.log(delta);
                if(delta.y < 438 && delta.y > 384 ){
                    if (delta.x>156 && delta.x <528) {
                        console.log(self.data);
                        if(self.data['fid'] == 11 && self.status == true){
                            alert('获得5元基金，跳转...');
                            self.removeFromParent(true);
                        }else if(self.data['fid'] == 21 && self.status == true ){
                            alert('获得10元基金，跳转...');
                            self.removeFromParent(true);
                        }
                    }
                }

            }
        });

        cc.eventManager.addListener(this.listener.clone(), this);

        //cc.eventManager.addListener(listener.clone(), this.button_success);
    },

    onEnter: function() {
        this._super();

        this.initUI();
        this.initListener();
    }
});