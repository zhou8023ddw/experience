
var GameLayer = cc.Layer.extend({
    ctor: function(selectedRole) {
        this._super();

        this.selectedRole = selectedRole;
        this.canCatch     = true;
    },

    initUI: function() {
        //var captureRange = MyFunction.addSprite(this, '#range_capture.png', {
        //    x:     cc.winSize.width / 2,
        //    y:     cc.winSize.height / 2,
        //    scale: 0
        //}, 1);

        //this.birdLayer = new BirdLayer();
        //this.addChild(this.birdLayer, 2);

        var panelTop = new PanelTopLayer();
        this.addChild(panelTop, 5);
        this.panelTop = panelTop;

        var panelBottom = new PanelBottomLayer();
        this.addChild(panelBottom, 5);
        this.panelBottom = panelBottom;

        //var gamerLayer = new GamerLayer(this.selectedRole);
        //this.addChild(gamerLayer, 5);
        //gamerLayer.setCaptuerRange(captureRange);

        //var otherGamerLayer = new OtherGamerLayer();
        //this.addChild(otherGamerLayer, 3);

        this.compass = MyFunction.addSprite(this, '#compass.png', {
            x: cc.winSize.width - 60,
            y: cc.winSize.height - 68
        }, 10);

        this.button_back = MyFunction.addSprite(this, '#button_back.png', {
            x: 67,
            y: 72
        }, 10, Config.TAG.BUTTON_BACK);

        this.button_capture = MyFunction.addSprite(this, '#button_capture.png', {
            x: cc.winSize.width / 2,
            y: 111
        }, 10, Config.TAG.BUTTON_CAPTURE);

        this.button_refresh = MyFunction.addSprite(this, '#button_refresh.png', {
            x: 68,
            y: 173
        }, 10, Config.TAG.BUTTON_REFRESH);

        //进化成功 or 进化失败
        this.button_success = MyFunction.addSprite(this,res.success, {
            x: cc.winSize.width - 60,
            y: cc.winSize.height - 230,
            scale: 0.6
        }, 11, Config.TAG.button_success);
        this.button_fail = MyFunction.addSprite(this,res.fail, {
            x: cc.winSize.width - 58,
            y: cc.winSize.height - 300,
            scale: 0.6
        }, 11, Config.TAG.button_fail);

        var musicLayer = new MusicLayer();
        this.addChild(musicLayer, 2);

        if (game['showFlowerInAndroid'] || cc.sys.os === cc.sys.OS_IOS) {
            var flowerLayer = new FlowerLayer();
            this.addChild(flowerLayer, 10);
        }
    },

    initListener: function() {
        var self = this;

        var posStart = {x: 0, y: 0};
        var distance = 0;
        var scale    = 1;

        var mapDiv          = document.getElementById('map');
        var transform       = mapDiv['style']['transform'];
        var webkitTransform = mapDiv['style']['webkitTransform'];

        var listener = cc.EventListener.create({
            event:          cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: true,
            onTouchesBegan: function(touches, event) {
                transform       = mapDiv['style']['transform'];
                webkitTransform = mapDiv['style']['webkitTransform'];

                return true;
            },
            onTouchesMoved: function(touches, event) {
                var length = touches.length;

                if (length >= 3) {
                    return false;
                }

                if (length === 1) {
                    var delta = touches[0].getDelta();
                    var diffX = delta.x;
                    var diffY = delta.y;
                    var ratio = window.innerHeight / 1008;

                    game['map']['panBy'](-diffX * ratio, diffY * ratio, true);
                }

                if (length === 2) {
                    var pos1         = touches[0].getLocation();
                    var pos2         = touches[1].getLocation();
                    var distanceTemp = cc.pDistance(pos1, pos2);

                    if (distance === 0) {
                        distance = distanceTemp;
                    }

                    scale = distanceTemp / distance;

                    mapDiv.style.transform       = 'scale(' + scale.toFixed(2) + ')';
                    mapDiv.style.webkitTransform = 'scale(' + scale.toFixed(2) + ')';
                }
            },
            onTouchesEnded: function(touches, event) {
                var target = event.getCurrentTarget();

                if (distance !== 0) {
                    mapDiv.style.transform       = transform;
                    mapDiv.style.webkitTransform = webkitTransform;

                    game['scaleFinishCallback'](scale);
                    scale = 1;
                }
                distance = 0;
            }
        });
        cc.eventManager.addListener(listener.clone(), this);

        var listener2 = cc.EventListener.create({
            event:          cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:   function(touch, event) {
                var target         = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var size           = target.getContentSize();
                var rect           = cc.rect(0, 0, size.width, size.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    if (target.tag === Config.TAG.BUTTON_CAPTURE) {
                        target.scale = 1.2;
                    }

                    return true;
                }
                return false;
            },
            onTouchEnded:   function(touch, event) {
                var target = event.getCurrentTarget();

                if (target.tag === Config.TAG.BUTTON_CAPTURE) {
                    target.scale = 1;
                    game['playEffect']('effect_button');
                    game['pressCatchButtonCallback'](function(type, status, data) {
                       self.showEvolutionLayer(type, status, data);
                    });
                }

                if (target.tag === Config.TAG.BUTTON_BACK) {
                    game['playEffect']('effect_button');
                    game['pressBackButtonCallback']();
                }

                if (target.tag === Config.TAG.BUTTON_REFRESH) {
                    game['playEffect']('effect_button');
                    game['pressRefreshButtonCallback']();
                }
                if(target.tag === Config.TAG.button_success){
                    console.log("点击成功");
                    var num1=Math.ceil(Math.random()*4);
                    switch(num1){
                          case 1:self.showEvolutionLayer(1,true,{'fid':11});break;
                          case 2:self.showEvolutionLayer(2,true,{'fid':21});break;
                          case 3:self.showEvolutionLayer(3,true,{'fid':3});break;
                          default:self.showEvolutionLayer(4,true,{'fid':4,'key': '3656 6594 6565,666666'});
                      }
                }
                if(target.tag === Config.TAG.button_fail){
                    console.log("点击失败");
                    var num2=Math.ceil(Math.random()*4);
                    switch(num2){
                        case 1:self.showEvolutionLayer(1,false,{'fid':11});break;
                        case 2:self.showEvolutionLayer(2,false,{'fid':21});break;
                        case 3:self.showEvolutionLayer(3,false,{'fid':3});break;
                        default:self.showEvolutionLayer(4,false,{'fid':4});
                    }
                }

            }
        });
        cc.eventManager.addListener(listener2.clone(), this.button_capture);
        cc.eventManager.addListener(listener2.clone(), this.button_back);
        cc.eventManager.addListener(listener2.clone(), this.button_refresh);
        cc.eventManager.addListener(listener2.clone(), this.button_fail);
        cc.eventManager.addListener(listener2.clone(), this.button_success);
    },

    showEvolutionLayer: function(type, status, data) {
        var evolutionLayer = new EvolutionLayer(type, status, data);
        this.addChild(evolutionLayer, 20);
    },

    onEnter: function() {
        this._super();

        this.initUI();
        this.initListener();
        this.scheduleUpdate();
    },
    update: function(dt) {
        if (game['compassAngle'] >= 0) {
            this.compass.rotation = game['compassAngle'];
        }
        this.panelTop.update(dt);
        this.panelBottom.update(dt);
    }
});

var GameScene = cc.Scene.extend({
    ctor: function(selectedRole) {
        this._super();

        this.selectedRole = selectedRole || 1;
    },

    onEnter: function() {
        this._super();

        game['startGameCallback']();

        var gameLayer = new GameLayer(this.selectedRole);
        this.addChild(gameLayer, 1);


        var self = this;

        function showTipLayer() {
            if (game['mySex'] === 0) {
                var tipLayer = new TipLayer();
                self.addChild(tipLayer, 2);
            }
        }

        if(!game['hasAllowedGetPosition']) {
            var locationTipLayer = new LocationTipLayer(function() {
                game['locationTipLayerCallback'](function() {
                    showTipLayer();
                });
            });
            this.addChild(locationTipLayer,2);
        }

    }
});