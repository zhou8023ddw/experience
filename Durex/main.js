
cc.game.onStart = function() {
    cc.view.enableRetina(true);
    cc.view.adjustViewPort(true);
    cc.view.enableAutoFullScreen(false);
    cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);
    cc.view.setDesignResolutionSize(640, 1008, cc.sys.isMobile ? cc.ResolutionPolicy.FIXED_HEIGHT : cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    cc.director.setClearColor(cc.color(0, 0, 0, 0));

    //cc.profiler.setLabelColor(cc.color(0, 0, 0, 255));

    cc.view.setResizeCallback(function() {
        //var scene = cc.director.getRunningScene();
        //if(scene.name === 'P1Scene') {
        //    cc.director.runScene(new P1Scene());
        //}
    });
};
cc.game.run();

game['start'] = function() {

    //console.log(cc._fntLoader);

    cc.loader.resPath = game['baseUrl'];
    for (var i in  loader['cache']) {
        var cache = loader['cache'][String(i)];
        switch (cache['type']) {
            case 'plist':
                cc.loader.cache[String(i)] = cc.plistParser.parse(cache['res']);
                break;
            case 'fnt':
                cc.loader.cache[String(i)] = cc._fntLoader.parseFnt(cache['res'], String(i));
                break;
            case 'image':
                cc.loader.cache[String(i)] = cache['res'];
                cc.textureCache.handleLoadedTexture(String(i));
                break;
            default:
        }
    }
    cc.spriteFrameCache.addSpriteFrames(res.Ani_0_plist, res.Ani_0_png);
    cc.spriteFrameCache.addSpriteFrames(res.Ani_1_plist, res.Ani_1_png);
    cc.spriteFrameCache.addSpriteFrames(res.Ani_2_plist, res.Ani_2_png);
    cc.spriteFrameCache.addSpriteFrames(res.Ani_3_plist, res.Ani_3_png);
    cc.spriteFrameCache.addSpriteFrames(res.Ani_4_plist, res.Ani_4_png);
    cc.spriteFrameCache.addSpriteFrames(res.Game_Assets_plist, res.Game_Assets_png);


    //cc.director.runScene(new MainScene());

        cc.director.runScene(new MainScene());


};