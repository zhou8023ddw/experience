//声明类,opts为类属性，初始化时传入（非必须，看实际需求）
var MyOverlay = function(opts) {
    qq.maps.Overlay.call(this, opts);
};

//继承Overlay基类
MyOverlay.prototype = new qq.maps.Overlay();

//实现构造方法
MyOverlay.prototype.construct = function() {

    var ratioH = window.innerHeight / 1008;

    this.width  = 150 * ratioH;
    this.height = 150 * ratioH;

    this.tip = null;

    this.positionReal = {lat: this.position.lat, lng: this.position.lng};

    //创建了覆盖物的容器
    this.div            = document.createElement('div');
    // this.div.id         = this.key;
    this.style          = this.div.style;
    this.style.position = 'absolute';
    this.style.width    = this.width + 'px';
    this.style.height   = this.height + 'px';

    //将dom添加到覆盖物层
    this.getPanes().overlayLayer.appendChild(this.div);

    this.init(this.type);
};

//实现绘制覆盖物的方法（覆盖物的位置在此控制）
MyOverlay.prototype.draw = function() {
    //获取地理经纬度坐标
    var position = this.get('position');
    if (position) {
        var pixel           = this.getProjection().fromLatLngToDivPixel(position);
        // var pixel           = this.map.getProjection().fromLatLngToPoint(position);
        this.div.style.left = pixel.getX() - this.width / 2 + 'px';
        this.div.style.top  = pixel.getY() - this.height / 2 + 'px';
    }
};

//实现析构方法（类生命周期结束时会自动调用，用于释放资源等）
MyOverlay.prototype.destroy = function() {
    //移除dom
    this.div.parentNode.removeChild(this.div);
};

//status 'on'||'off'
MyOverlay.prototype.setTip = function() {
    this.status = false;

    this.tipOn        = loader.imageArr['images/tip_catch_on.png'].img.cloneNode(true);
    var styleOn       = this.tipOn.style;
    styleOn.position  = 'absolute';
    styleOn.width     = this.width + 'px';
    styleOn.height    = this.height + 'px';
    styleOn.marginTop = -this.height / 3 + 'px';
    styleOn.zIndex    = 3;
    styleOn.display    = 'none';

    this.tipOff        = loader.imageArr['images/tip_catch_off.png'].img.cloneNode(true);
    var styleOff       = this.tipOff.style;
    styleOff.position  = 'absolute';
    styleOff.width     = this.width + 'px';
    styleOff.height    = this.height + 'px';
    styleOff.marginTop = -this.height / 3 + 'px';
    styleOff.zIndex    = 3;
    styleOff.display    = 'block';

    this.div.appendChild(this.tipOn);
    this.div.appendChild(this.tipOff);
};

MyOverlay.prototype.changeTip = function(status) {
    if(this.status === -1) return;
    this.status = status;

    if(status) {
        this.tipOn.style.display = 'block';
        this.tipOff.style.display = 'none';
    }else {
        this.tipOff.style.display = 'block';
        this.tipOn.style.display = 'none';
    }
};

MyOverlay.prototype.setBg = function(type) {
    if (this.bg) {
        this.bg.parentNode.removeChild(this.bg);
    }

    var name = '';
    switch (type) {
        case 'bird_1':
            name = 'images/bird_1.gif';
            break;
        case 'bird_2':
            name = 'images/bird_2.gif';
            break;
        case 'bird_3':
            name = 'images/bird_3.gif';
            break;
        case 'bird_4':
            name = 'images/bird_4.gif';
            break;
        case 'boy':
            name = 'images/game_boy.png';
            break;
        case 'girl':
            name = 'images/game_girl.png';
            break;
        case 'boy_other':
            name = 'images/game_boy_other.png';
            break;
        case 'girl_other':
            name = 'images/game_girl_other.png';
            break;
        case 'success':
            name = 'images/tip_catch_success.png';
            this.tipOn.style.display = 'none';
            this.tipOff.style.display = 'none';
            break;
        case 'fail':
            name = 'images/tip_catch_fail.png';
            this.tipOff.style.display = 'none';
            this.tipOn.style.display = 'none';
            break;
        default:
    }

    this.bg        = loader.imageArr[name].img.cloneNode(true);
    var style      = this.bg.style;
    style.position = 'absolute';
    style.width    = this.width + 'px';
    style.height   = this.height + 'px';
    style.zIndex   = 2;

    if (this.type === 'boy' || this.type === 'girl') {
        style.zIndex = 10;
    }

    if (this.type === 'boy_other' || this.type === 'girl_other') {
        style.zIndex = 8;
    }

    // console.log(this.div);

    this.div.appendChild(this.bg);
};

MyOverlay.prototype.setCaptureRange = function() {
    this.captureRange = document.createElement('div');

    var range = loader.imageArr['images/range_capture.png'].img.cloneNode(true);

    var radius = 100;

    var style      = this.captureRange.style;
    style.position = 'absolute';
    style.width    = this.width + 'px';
    style.height   = this.height + 'px';
    style.zIndex   = 1;

    range.style.position = 'absolute';
    range.style.width = '100%';
    range.style.height = '100%';
    range.style.zIndex   = 1;
    range.className = 'range';

    this.captureRange.appendChild(range);

    this.div.appendChild(this.captureRange);

    this.updateCaptureRange();
};


MyOverlay.prototype.updateCenter = function(position) {
    this.position = position;
    this.draw();
};

MyOverlay.prototype.updateCaptureRange = function() {
    var latLng1 = new qq.maps.LatLng(this.position.lat, this.position.lng);
    var latLng2 = new qq.maps.LatLng(this.position.lat + 0.0009009 * game.catchDistance/100, this.position.lng);

    var pixel1 = this.getProjection().fromLatLngToDivPixel(latLng1);
    var pixel2 = this.getProjection().fromLatLngToDivPixel(latLng2);


    // var marker1 = new qq.maps.Marker({
    //     position: latLng1,
    //     map:      this.map
    // });

    // var marker2 = new qq.maps.Marker({
    //     position: latLng2,
    //     map:      this.map
    // });

    // var bounds                         = this.map.getBounds();
    // var diffY                          = bounds.lat.maxY - bounds.lat.minY;

    var radius = Math.abs(pixel1.y - pixel2.y);

    // console.log(diffY);

    // var radius                         = window.innerHeight * 0.0009009 / diffY;
    this.captureRange.style.width      = radius * 2 + 'px';
    this.captureRange.style.height     = radius * 2 + 'px';
    this.captureRange.style.marginLeft = -(radius - this.width / 2) + 'px';
    this.captureRange.style.marginTop  = -(radius - this.height / 2) + 'px';
};

//初始化
MyOverlay.prototype.init = function(type) {
    var name = '';
    switch (type) {
        case 'bird_1':
            name = 'images/bird_1.gif';
            this.setTip(false);
            break;
        case 'bird_2':
            name = 'images/bird_2.gif';
            this.setTip(false);
            break;
        case 'bird_3':
            name = 'images/bird_3.gif';
            this.setTip(false);
            break;
        case 'bird_4':
            name = 'images/bird_4.gif';
            this.setTip(false);
            break;
        case 'boy':
            name = 'images/game_boy.png';
            this.setCaptureRange();
            break;
        case 'girl':
            name = 'images/game_girl.png';
            this.setCaptureRange();
            break;
        case 'boy_other':
            name = 'images/game_boy_other.png';
            break;
        case 'girl_other':
            name = 'images/game_girl_other.png';
            break;
        case 'success':
            name = 'images/tip_catch_success.png';
            break;
        case 'fail':
            name = 'images/tip_catch_fail.png';
            break;
        default:
    }

    this.setBg(type);
};