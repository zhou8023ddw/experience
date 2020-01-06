/**
 * Created by Quan on 16/8/3.
 */

var MusicLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
    },

    addSprite: function(name, attr, z, tag) {
        var sprite = new cc.Sprite(name);
        sprite.attr(attr);
        this.addChild(sprite, z, tag);
        return sprite;
    },

    initUI: function() {
        var stateName = game['isMusicOpened'] ? 'on' : 'off';

        this.button_music = this.addSprite('#button_music_' + stateName + '.png', {
            x:       cc.winSize.width - 89,
            y:       cc.winSize.height - 160,
            anchorX: 0,
            scale:   1
        }, 1, Config.TAG.BUTTON_MUSIC);
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

                self.changeState();
            }
        });

        cc.eventManager.addListener(listener.clone(), this.button_music);
    },

    changeState: function() {
        game['isMusicOpened'] = !game['isMusicOpened'];
        var stateName         = game['isMusicOpened'] ? 'on' : 'off';
        this.button_music.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('button_music_' + stateName + '.png'));

        if(game['isMusicOpened']){
            game['playMusic']('music_bg');
        }else {
            game['pauseMusic']('music_bg');
        }
    },

    onEnter: function() {
        this._super();

        this.initUI();
        this.initListener();
    }
});