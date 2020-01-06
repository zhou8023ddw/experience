var Map = function(min, max) {
    this.map    = null;
    this.center = null;

    this.zoom    = 17;
    this.minZoom = min || 15;
    this.maxZoom = max || 17;
    this.init();

    return this;

};

Map.prototype = {
    init: function() {
        this.map = new qq.maps.Map(
            document.getElementById('map'), {
                disableDefaultUI: true,
                minZoom:          this.minZoom,
                maxZoom:          this.maxZoom
            });
        this.setZoomRange(this.minZoom, this.maxZoom);
    },

    initListener: function() {
        // qq.maps.event.addListener(this.map, 'zoom_changed', game.zoomEndCallback);
        qq.maps.event.addListener(this.map, 'zoom_changed', game.zoomEndCallback.bind(game));
        qq.maps.event.addListener(this.map, 'idle', game.mapIdleCallback.bind(game));
    },

    getDistance: function(lng1, lat1, lng2, lat2) {
        var latlng1 = new qq.maps.LatLng(lat1, lng1);
        var latlng2 = new qq.maps.LatLng(lat2, lng2);

        return qq.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
    },

    setCenterPoint: function(lng, lat) {
        this.center = new qq.maps.LatLng(lat, lng);
    },

    setZoomNumber: function(zoom) {
        this.zoom = zoom;
    },

    resetCenterPoint: function() {
        this.center = this.map.getCenter();
    },

    setZoomRange: function(min, max) {
        this.minZoom = min;
        this.maxZoom = max;
    },

    setCenter: function(lng, lat) {
        this.setCenterPoint(lng, lat);

        this.map.setCenter(this.center);
    },

    setZoom: function(zoom) {
        this.setZoomNumber(zoom);

        this.map.setZoom(this.zoom);
    },

    centerAndZoom: function(lng, lat, zoom, noTranslate, callback) {

        var self = this;

        if (noTranslate) {
            this.setCenterPoint(lng, lat);
            this.setZoomNumber(zoom);

            this.setCenter(lng, lat);
            this.setZoom(zoom);

            //this.map.panTo(this.center);
            //this.map.zoomTo(this.zoom);
        } else {
            this.translate(new qq.maps.LatLng(lat, lng), function(data) {
                var point0 = data[0];

                self.setCenter(point0.lng, point0.lat);
                self.setZoom(zoom);

                if (callback) {
                    callback();
                }
            });
        }
    },

    panTo: function(lng, lat) {
        this.setCenterPoint(lng, lat);

        this.map.panTo(this.center);
    },

    panBy: function(x, y) {
        this.map.panBy(x, y);

        this.resetCenterPoint();
    },

    latLngToPoint: function(lng, lat) {
        var latLng = new qq.maps.LatLng(lat, lng);
        var point  = this.map.getProjection().fromLatLngToPoint(latLng);
        return point;
    },

    pointToLatLng: function(x, y) {
        var point  = new qq.maps.Point(x, y);
        var latLng = this.map.getProjection().fromPointToLatLng(point, true);
        return latlng;
    },

    translate: function(points, callback) {
        //转换GPS坐标为腾讯坐标
        qq.maps.convertor.translate(points, 1, function(res) {
            callback(res);
        });
    },
    translateLatLng2Game: function(lng, lat) {
        var point = this.latLngToPoint(lng, lat);
        return this.translatePixel2Game(point.x, point.y);
    },
    translatePoint2Game: function(x, y) {
        var ratioH = window.innerHeight / 1008;
        var posX   = x / ratioH;
        var posY   = 1008 - y / ratioH;

        return {x: posX, y: posY};
    },
    addOverlay: function(key, lng, lat, type) {
        var overlay = new MyOverlay({
            map:      this.map,
            position: new qq.maps.LatLng(lat, lng),
            type:     type,
            key:      key
        });
        return overlay;
    }
};
