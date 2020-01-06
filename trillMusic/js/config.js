var config = {
    basic: {
        js    : [
            {name:"jq",url:"js/jquery-2.1.3.min.js", sync: false},
            {name:"video",url:"js/Video.js", sync: false},
            {name: "jweixin", url: "http://res.wx.qq.com/open/js/jweixin-1.0.0.js", sync: true},
            {name: "wx", url: "js/m_wx.js", sync: false},
            {name: "sound", url: "js/Sound.js", sync: false},
            {name: "analytics", url: "js/AV.analytics.js", sync: false},
            {name:"game",url:"game/touch.js", sync: false}

        ],
        images: [
        ],
        video : [],
        res   : [
        ]

    },
    pages: [
        {
            id:"page_1",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"images/main.gif",rect:{x:-55,y:0,w:750,h:1008},comment:"背景_拷贝",class:""},
                {type:"img",src:"images/page_1_027.png",rect:{x:194,y:789,w:245,h:70},comment:"star_button",class:"but_1"},
                {type:"img",src:"images/page_1_028.png",rect:{x:194,y:789,w:245,h:70},comment:"star_button_2",class:"but_2"}

            ]
        },
        {
            id:"page_2",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"images/page_2_016.png",rect:{x:204,y:782,w:230,h:52},comment:"问题1_吴莫愁",class:"title_0"},
                {type:"img",src:"images/page_2_017.png",rect:{x:204,y:782,w:230,h:52},comment:"问题2_岳云鹏",class:"title_1"},
                {type:"img",src:"images/page_2_018.png",rect:{x:204,y:782,w:230,h:52},comment:"问题3_吴克群",class:"title_2"},
                {type:"img",src:"images/page_2_019.png",rect:{x:204,y:782,w:230,h:52},comment:"问题4_邓超",class:"title_3"},
                {type:"img",src:"images/page_2_020.png",rect:{x:204,y:782,w:230,h:52},comment:"问题5_宋祖儿",class:"title_4"},
                {type:"img",src:"images/page_2_021.png",rect:{x:204,y:782,w:230,h:52},comment:"问题6_刘维",class:"title_5"},
                {type:"img",src:"images/page_2_022.png",rect:{x:473,y:757,w:105,h:104},comment:"对_效果",class:"but_true1"},
                {type:"img",src:"images/page_2_023.png",rect:{x:473,y:757,w:105,h:104},comment:"对",class:"but_true"},
                {type:"img",src:"images/page_2_024.png",rect:{x:60,y:757,w:105,h:104},comment:"错_效果",class:"but_false2"},
                {type:"img",src:"images/page_2_025.png",rect:{x:60,y:757,w:105,h:104},comment:"错",class:"but_false"},
                {type:"img",src:"images/logo.gif",rect:{x:460,y:882,w:151.5,h:87},comment:"logo",class:""}

            ]
        },
        {
            id:"page_3",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"images/answer.gif",rect:{x:-55,y:0,w:750,h:1008},comment:"背景_拷贝_2",class:""},
                {type:"img",src:"images/page_3_004.png",rect:{x:164,y:652,w:309,h:82},comment:"button3",class:"goTrillMusic_1"},
                {type:"img",src:"images/page_3_015.png",rect:{x:164,y:652,w:309,h:82},comment:"button4",class:"goTrillMusic_2"},
                {type:"img",src:"images/page_3_017.png",rect:{x:164,y:535,w:309,h:83},comment:"button0",class:"restart_0"},
                {type:"img",src:"images/page_3_005.png",rect:{x:164,y:535,w:309,h:83},comment:"button2",class:"restart_1"},
                {type:"img",src:"images/page_3_006.png",rect:{x:164,y:535,w:309,h:83},comment:"button1",class:"restart_2"},
                {type:"img",src:"images/page_3_007.png",rect:{x:58,y:237,w:529,h:184},comment:"0关",class:"answer_0"},
                {type:"img",src:"images/page_3_008.png",rect:{x:53,y:237,w:538,h:150},comment:"1关_",class:"answer_1"},
                {type:"img",src:"images/page_3_009.png",rect:{x:58,y:237,w:529,h:150},comment:"2关",class:"answer_2"},
                {type:"img",src:"images/page_3_010.png",rect:{x:58,y:237,w:529,h:184},comment:"3关",class:"answer_3"},
                {type:"img",src:"images/page_3_011.png",rect:{x:59,y:237,w:526,h:150},comment:"4关",class:"answer_4"},
                {type:"img",src:"images/page_3_012.png",rect:{x:58,y:237,w:529,h:150},comment:"5关",class:"answer_5"},
                {type:"img",src:"images/page_3_013.png",rect:{x:99,y:240,w:445,h:147},comment:"通关",class:"answer_6"},
                {type:"img",src:"images/page_3_016.png",rect:{x:285,y:172,w:70,h:24},comment:"共6关",class:"total"},
                {type:"img",src:"images/page_3_014.png",rect:{x:243,y:848,w:151,h:66},comment:"抖音logo",class:""}

            ]
        }
    ]
};
