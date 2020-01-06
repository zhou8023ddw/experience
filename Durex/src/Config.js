/**
 * Created by Quan on 16/7/1.
 */

var Config = Config || {};

Config.GLOBAL_SCALE = 1;

Config.TAG = {
    GIRL:            1001,
    BOY:             1002,
    BUTTON_GO:       1003,
    BUTTON_MUSIC:    2001,
    BUTTON_BACK:     2002,
    BUTTON_CAPTURE:  2003,
    BUTTON_FAIL:     3001,
    BUTTON_SUCCESS:  3002,
    BUTTON_SCREEN:   3003,
    BUTTON_REFRESH:  3004,
    BUTTON_LOCATION: 3005,
    button_success: 3006,
    button_fail:    4001,
    BUTTON_TEXT11:   4005,
    BUTTON_TEXT21:   4006
};

Config.BIRD_TYPE = {
    PP: 'pp',
    TT: 'tt',
    BB: 'bb',
    YY: 'yy'
};

Config.ANI = {
    'boy':       [10, 0.05, true],
    'girl':      [10, 0.05, true],
    'bird_bb_1': [10, 0.05, true],
    'bird_bb_2': [20, 0.05, false],
    'bird_bb_3': [10, 0.05, true],
    'bird_tt_1': [10, 0.05, true],
    'bird_tt_2': [20, 0.05, false],
    'bird_tt_3': [10, 0.05, true],
    'bird_pp_1': [10, 0.05, true],
    'bird_pp_2': [20, 0.05, false],
    'bird_pp_3': [10, 0.05, true],
    'bird_yy_1': [10, 0.05, true],
    'bird_yy_2': [20, 0.05, false],
    'bird_yy_3': [10, 0.05, true]
};

Config.VEL = {
    RANGE_X: 50,
    RANGE_Y: 50,
    RANGE_R: 50
};