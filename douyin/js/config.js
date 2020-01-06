var config = {
    basic: {
        js    : [
            {name:"jq",url:"js/jquery-2.1.3.min.js", sync: false},
            {name:"videoConfig",url:"js/videoConfig.js", sync: false},
            {name: "jweixin", url: "http://res.wx.qq.com/open/js/jweixin-1.0.0.js", sync: true},
            {name: "wx", url: "js/m_wx.js", sync: false},
            {name: "sound", url: "js/howler.min.js", sync: false},
            {name: "analytics", url: "js/AV.analytics.js", sync: false},
            {name: "lrzAllBundle", url: "js/lrz.all.bundle.js", sync: true},
            {name:"game",url:"game/touch.js", sync: false}
        ],
        images: [
            "img/shou_2.png","img/shou_3.png","img/shou_4.png","img/drawBg.png","img/icon.jpg"
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
                {type:"img",src:"images/page_1_081.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"p1done.jpg",class:""},
                {type:"img",src:"images/page_1_082.png",rect:{x:139,y:273,w:359,h:38},comment:"Hi，你看上去有点不嗨心",class:"shake1"},
                {type:"img",src:"images/page_1_083.png",rect:{x:136,y:241,w:353,h:89},comment:"Vector_Smart_Object",class:"shake2"},
                {type:"img",src:"images/page_1_084.gif",rect:{x:276,y:487,w:69,h:647},comment:"tear",class:""},
                {type:"img",src:"img/water.gif",rect:{x:-55,y:24,w:750,h:1298},comment:"水",id:"water"}

            ]
        },
        {
            id:"page_2",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                /*{type:"img",src:"images/page_2_073.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"底",class:""},*/
                {type:"img",src:"images/page_2_074.png",rect:{x:22,y:29,w:228,h:130},comment:"cloud_拷贝",class:"cloud_1"},
                {type:"img",src:"images/page_2_075.png",rect:{x:246,y:10,w:381,h:188},comment:"cloud2",class:"cloud_2"},
                {type:"div",rect:{x:0,y:137,w:640,h:871},comment:"shou",id:"shou",pos:"absolute",dom:[
                    {type:"img",src:"img/shou_1.png",rect:{x:0,y:0,w:640,h:871},comment:"",}
                ]},
                {type:"img",src:"images/page_2_076.png",rect:{x:313,y:843,w:247,h:121},comment:"我不嗨心字",class:"startBut",id:"startBut"},

            ]
        },
        {
            id:"page_3",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"images/page_3_060.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"矩形_2",class:""},
                {type:"img",src:"images/page_3_061.png",rect:{x:33,y:906,w:284,h:83},comment:"完成上传",class:"",id:"finishPhoto"},
                {type:"img",src:"images/page_3_062.png",rect:{x:326,y:905,w:284,h:84},comment:"我要去画",class:"",id:"drawPhoto"},
                {type:"img",src:"images/page_3_063.png",rect:{x:28,y:37,w:586,h:259},comment:"Ellipse_2_copy_12",class:""},
                {type:"img",src:"images/page_3_064.png",rect:{x:186,y:164,w:277,h:53},comment:"让我认识你",class:""},
                {type:"img",src:"images/page_3_065.png",rect:{x:130,y:96,w:387,h:52},comment:"先上传一张头像",class:""},
                {type:"img",src:"images/page_3_066.png",rect:{x:121,y:859,w:413,h:24},comment:"Tips要上传一个类似的正面标准头像哦",class:""},
                {type:"img",src:"images/page_3_067.png",rect:{x:138,y:316,w:374,h:415},comment:"Layer_71",class:""},
                {type:"img",src:"images/page_3_068.png",rect:{x:161,y:342,w:327,h:364},comment:"Shape_64_copy_2",class:"",id:"chooseEnd"},
                //{type:"img",src:"images/page_3_069.png",rect:{x:275,y:474,w:95,h:95},comment:"图层_826",class:"",id:"choosePhoto"},
                {type:"img",src:"images/page_3_070.png",rect:{x:375,y:747,w:86,h:100},comment:"Layer_83",class:""},
                {type:"img",src:"images/page_3_071.png",rect:{x:273,y:747,w:86,h:100},comment:"Layer_84",class:""},
                {type:"img",src:"images/page_3_072.png",rect:{x:174,y:747,w:86,h:101},comment:"Layer_82_copy_2",class:""},

            ]
        },
        {
            id:"page_4",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                //{type:"img",src:"images/page_4_056.png",rect:{x:150,y:350,w:351,h:389},comment:"头像",class:"photo"},
                {type:"canvas",rect:{x:147,y:350,w:357,h:389},comment:"头像",id:'canvasPhoto'},
                {type:"img",src:"images/page_4_057.png",rect:{x:0,y:0,w:640,h:1008},comment:"背景",class:""},
                {type:"img",src:"images/page_4_055.png",rect:{x:28,y:184,w:580,h:75},comment:"移动_位置",class:""},
                {type:"img",src:"images/page_4_058.png",rect:{x:130,y:845,w:131,h:126},comment:"Vector_Smart_Object",class:"",id:"backStart"},
                {type:"img",src:"images/page_4_059.png",rect:{x:391,y:845,w:131,h:126},comment:"Vector_Smart_Object",class:"",id:"finishAdjust"},

            ]
        },

        {
            id:"page_6",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"images/page_6_040.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"矩形_2",class:""},
                {type:"img",src:"images/page_6_041.png",rect:{x:375,y:766,w:80,h:78},comment:"Group_54",class:"",id:"draw"},
                {type:"img",src:"images/page_6_042.png",rect:{x:482,y:767,w:80,h:78},comment:"Group_55",class:"",id:"clear"},
                {type:"img",src:"images/page_6_043.png",rect:{x:122,y:329,w:443,h:413},comment:"Layer_63_copy_4",class:""},
                {type:"img",src:"images/page_6_044.png",rect:{x:141,y:345,w:406,h:378},comment:"Shape_70_copy_2",class:""},

                {type:"canvas",rect:{x:147,y:352,w:394,h:360},comment:"画布",class:"",id:"canvas"},

                {type:"img",src:"images/page_6_045.png",rect:{x:39,y:879,w:283,h:84},comment:"btn2_copy_2",class:"",id:"finishDraw"},
                {type:"img",src:"images/page_6_046.png",rect:{x:341,y:879,w:283,h:84},comment:"btn2",class:"",id:"toPhoto"},
                {type:"img",src:"images/page_6_047.png",rect:{x:122,y:329,w:443,h:413},comment:"轻触画框，重画一个头像",class:"",id:"startDraw"},
                {type:"img",src:"images/page_6_048.png",rect:{x:27,y:38,w:586,h:259},comment:"Group_75",class:""},
                {type:"img",src:"images/page_6_049.png",rect:{x:184,y:173,w:258,h:49},comment:"填上五官吧",class:""},
                {type:"img",src:"images/page_6_050.png",rect:{x:89,y:109,w:459,h:50},comment:"你的画风一定很独特",class:""},

            ]
        },
        {
            id:"page_5",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"images/page_5_051.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"Rectangle_15",class:""},
                {type:"img",src:"images/page_5_052.png",rect:{x:194,y:534,w:235,h:81},comment:"再试一次",class:"",id:"reTry"},
                {type:"img",src:"images/page_5_053.png",rect:{x:132,y:432,w:383,h:52},comment:"咦？好像没成功",class:""},

            ]
        },
        {
            id:"page_7",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"images/page_7_034.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"Rectangle_12",class:""},
                {type:"img",src:"images/page_7_035.png",rect:{x:105,y:-119,w:419,h:984},comment:"Layer_73",class:""},
                {type:"img",src:"images/page_7_036.png",rect:{x:288,y:86,w:117,h:137},comment:"Layer_77_copy",class:"",id:"sevenPhoto"},
                {type:"img",src:"images/page_7_037.png",rect:{x:327,y:186,w:43,h:20},comment:"Shape_83",class:""},
                {type:"img",src:"images/page_7_038.png",rect:{x:10,y:19,w:194,h:33},comment:"Shape_85",class:"",id:"backDraw"},
                {type:"img",src:"images/page_7_039.png",rect:{x:160,y:904,w:336,h:73},comment:"Group_57",class:""},

            ]
        },
        {
            id:"page_8",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"images/page_8_027.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"Rectangle_12",class:""},
                {type:"img",src:"images/page_8_028.png",rect:{x:105,y:-119,w:419,h:984},comment:"Group_59",class:""},
                {type:"img",src:"images/page_8_029.png",rect:{x:278,y:89,w:127,h:127},comment:"Rounded_Rectangle_9",class:"drawPhoto","z-index":"10"},
                //{type:"img",src:"images/page_8_030.png",rect:{x:282,y:110,w:125,h:94},comment:"Vector_Smart_Object",class:"drawPhoto"},
                {type:"img",src:"images/page_8_031.png",rect:{x:321,y:184,w:43,h:20},comment:"Shape_83_copy",class:"","z-index":"12"},
                {type:"img",src:"images/page_8_032.png",rect:{x:11,y:19,w:222,h:33},comment:"Shape_85",class:"",id:"backPhoto"},
                {type:"img",src:"images/page_8_033.png",rect:{x:160,y:904,w:336,h:73},comment:"Group_57_copy",class:""},

            ]
        },
        {
            id:"page_9",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                /*{type:"img",src:"images/page_9_022.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"矩形_2_拷贝",class:""},*/
                {type:"img",src:"images/page_9_023.png",rect:{x:202,y:918,w:242,h:58},comment:"btn",class:"",id:"likeMusic"},
                {type:"img",src:"images/page_9_024.png",rect:{x:180,y:864,w:282,h:38},comment:"抖抖手机，换一首歌_copy",class:""},
                {type:"img",src:"images/page_9_025.png",rect:{x:540,y:320,w:92,h:479},comment:"Group_45",class:""},
                    {type:"img",src:"img/music.gif",rect:{x:473,y:854,w:166,h:136},comment:"按钮4",class:"",id:'music'}

            ]
        },
        {
            id:"page_10",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"images/page_10_019.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"Rectangle_13",class:"opa",id:"share"},
                {type:"img",src:"images/page_10_020.png",rect:{x:307,y:137,w:292,h:129},comment:"Group_51_copy",class:""},
                {type:"img",src:"images/page_10_021.png",rect:{x:510,y:21,w:116,h:108},comment:"Vector_Smart_Object_copy_28",class:""},

            ]
        },
        {
            id:"page_11",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"images/page_11_012.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"Rectangle_7",class:""},
                {type:"img",src:"images/page_11_014.png",rect:{x:22,y:5,w:596,h:403},comment:"Group_21",class:""},
                {type:"img",src:"images/page_11_015.png",rect:{x:94,y:198,w:452,h:93},comment:"Group_66",class:""},
                {type:"img",src:"images/page_11_016.png",rect:{x:-49,y:433,w:732,h:855},comment:"Vector_Smart_Object_copy_23",class:""},
                {type:"img",src:"images/page_11_017.png",rect:{x:-114,y:-95,w:880,h:156},comment:"屋檐",class:""},
                {type:"img",src:"images/page_11_018.png",rect:{x:180,y:131,w:126,h:55},comment:"Vector_Smart_Object",class:""},
                {type:"img",src:"images/page_11_013.png",rect:{x:183,y:539,w:248,h:79},comment:"btn",class:"startBut",id:"toPlay"},
            ]
        },
        {
            id:"page_12",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                //{type:"img",src:"images/page_12_005.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"02",class:""},
                    {type:"img",src:"img/music.gif",rect:{x:473,y:854,w:166,h:136},comment:"按钮4",class:""},
                {type:"img",src:"images/page_12_010.png",rect:{x:540,y:321,w:92,h:479},comment:"icons",class:""},
                {type:"img",src:"images/page_12_011.png",rect:{x:202,y:899,w:242,h:58},comment:"btn",class:"startBut",id:"myMake"},

            ]
        },
        {
            id:"page_13",
            animation:[],
            rect:{x:0,y:0},
            display:"none",
            dom:[
                {type:"img",src:"images/page_13_001.jpg",rect:{x:0,y:0,w:640,h:1008},comment:"Rectangle_15",class:"opa"},
                {type:"img",src:"images/page_13_002.png",rect:{x:171,y:432,w:326,h:53},comment:"组_2_copy",class:"photo_1"},
                {type:"img",src:"images/page_13_003.png",rect:{x:130,y:433,w:380,h:51},comment:"组_2_copy",class:"photo_2"},
                {type:"img",src:"images/page_13_004.png",rect:{x:130,y:433,w:389,h:51},comment:"组_2_copy",class:"photo_3"}
            ]
        }
    ]
};
