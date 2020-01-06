/**
 * Created by yuyou on 15/2/22.
 */
(function($,_wx){
    $.extend($,{
        SetShare:function(title,descTime,descMessage,link,imgUrl,_success1,_success2){
            var success1 = _success1 || function () {};
            var success2 = _success2 || function () {};
            var cancel = function(){};
            _wx.onMenuShareTimeline({
                title: descTime,
                link: link, // 分享链接
                imgUrl: imgUrl,
                success: success1,
                cancel: cancel
            });
            _wx.onMenuShareAppMessage({
                title: title,
                desc: descMessage,
                link: link,
                imgUrl: imgUrl,
                type: '',
                dataUrl: '',
                success: success2,
                cancel: cancel
            });
        }
    });
})(jQuery,wx);