/**
 * Created by Quan on 16/8/1.
 */

var MyFunction = MyFunction || {};

MyFunction.addSprite = function(parent,name, attr, z, tag) {
    var sprite = new cc.Sprite(name);
    sprite.attr(attr);
    parent.addChild(sprite, z, tag);
    return sprite;
};