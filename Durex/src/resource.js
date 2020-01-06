var res = {
    Ani_0_plist:       game['baseUrl'] + 'res/Ani-0.plist',
    Ani_0_png:         game['baseUrl'] + 'res/Ani-0.png',
    Ani_1_plist:       game['baseUrl'] + 'res/Ani-1.plist',
    Ani_1_png:         game['baseUrl'] + 'res/Ani-1.png',
    Ani_2_plist:       game['baseUrl'] + 'res/Ani-2.plist',
    Ani_2_png:         game['baseUrl'] + 'res/Ani-2.png',
    Ani_3_plist:       game['baseUrl'] + 'res/Ani-3.plist',
    Ani_3_png:         game['baseUrl'] + 'res/Ani-3.png',
    Ani_4_plist:       game['baseUrl'] + 'res/Ani-4.plist',
    Ani_4_png:         game['baseUrl'] + 'res/Ani-4.png',
    Num_fnt:           game['baseUrl'] + 'res/num.fnt',
    Num_png:           game['baseUrl'] + 'res/num.png',
    Bg_Main_jpg:       game['baseUrl'] + 'res/bg_main.jpg',
    Bg_Choose_jpg:     game['baseUrl'] + 'res/bg_choose.jpg',
    Game_Assets_plist: game['baseUrl'] + 'res/GameAssets.plist',
    Game_Assets_png:   game['baseUrl'] + 'res/GameAssets.png',
    success:           game['baseUrl']+'images/draw_success.png',
    fail:              game['baseUrl']+'images/draw_fail.png'
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
