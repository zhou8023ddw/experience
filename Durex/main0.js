cc.game.config = {
    "showFPS"     : false,
    "noCache"     : false,
    "frameRate"   : 60,
    "project_type": "javascript",
    "debugMode"   : 1,
    "renderMode"  : 1,
    "id"          : "gameCanvas"
};
cc.game.onStart = function() {
    cc.view.enableRetina(true);
    cc.view.adjustViewPort(true);
    cc.view.enableAutoFullScreen(false);
    cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);
    cc.view.setDesignResolutionSize(640, 1008, cc.sys.isMobile ? cc.ResolutionPolicy.FIXED_HEIGHT : cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    cc.director.setClearColor(cc.color(0, 0, 0, 0));

    //cc.profiler.setLabelColor(cc.color(0, 0, 0, 255));

    MyLoaderScene.preload(g_resources, function() {

        cc.spriteFrameCache.addSpriteFrames(res.Ani_0_plist, res.Ani_0_png);
        cc.spriteFrameCache.addSpriteFrames(res.Ani_1_plist, res.Ani_1_png);
        cc.spriteFrameCache.addSpriteFrames(res.Ani_2_plist, res.Ani_2_png);
        cc.spriteFrameCache.addSpriteFrames(res.Ani_3_plist, res.Ani_3_png);
        cc.spriteFrameCache.addSpriteFrames(res.Ani_4_plist, res.Ani_4_png);
        cc.spriteFrameCache.addSpriteFrames(res.Game_Assets_plist, res.Game_Assets_png);

        //cc.director.runScene(new MainScene());
        //cc.director.runScene(new ChooseScene());


            cc.director.runScene(new MainScene());
            //cc.director.runScene(new GameScene());

    }, this);
};
cc.game.run();