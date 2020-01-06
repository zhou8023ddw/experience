MyLoaderScene = cc.Scene.extend({
    _interval:  null,
    _label:     null,
    _className: "MyLoaderScene",
    cb:         null,
    target:     null,

    onEnter: function() {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self.startLoading, 0.3, 0, 0, '111');
    },

    onExit: function() {
        cc.Node.prototype.onExit.call(this);
    },

    initWithResources: function(resources, cb, target) {
        if (cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb        = cb;
        this.target    = target;
    },

    startLoading: function() {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;

        cc.loader.load(res,
            function(result, count, loadedCount) {
                game['loadPercentCallback'](count, loadedCount);
            }, function() {
                game['loadFinishCallback']();
                if (self.cb)
                    self.cb.call(self.target);
            });
    }
});

MyLoaderScene.preload = function(resources, cb, target) {
    var myLoaderScene = new MyLoaderScene();
    myLoaderScene.initWithResources(resources, cb, target);

    cc.director.runScene(myLoaderScene);
    return myLoaderScene;
};