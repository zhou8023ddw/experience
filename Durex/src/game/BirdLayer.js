var BirdLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        this.birdArr = [];

        this.canCatchNum = 0;

        this.minDistanceKey = null;
    },

    initUI: function() {

    },

    addBird: function(type, x, y, key, lng, lat) {

        switch (type) {
            case 1:
                type = 'pp';
                break;
            case 2:
                type = 'tt';
                break;
            case 3:
                type = 'bb';
                break;
            case 4:
                type = 'yy';
                break;
            default:
        }

        var bird = new Bird(type);
        bird.attr({
            x:   x,
            y:   y,
            lng: lng,
            lat: lat
        });
        this.addChild(bird, 3, key);

        this.birdArr.push(bird);
    },

    checkState: function() {
        //this.minDistanceKey = null;
        var minDistance = game['catchDistance'];

        for (var i = 0; i < this.birdArr.length; i++) {
            var bird = this.birdArr[i];
            bird.setState(false);
            var distance = game['getDistance'](game['lng'], game['lat'], bird.lng, bird.lat);
            if (distance < game['catchDistance']) {
                bird.canCatch = true;
                if (minDistance > distance) {
                    minDistance         = distance;
                    this.minDistanceKey = bird.getName();
                }
            }
        }

        console.log(this.minDistanceKey);

        if (this.minDistanceKey) {
            var birdNearest = this.getChildByName(this.minDistanceKey);
            birdNearest.setState(true);
        }
    },

    catchBird: function(callback) {

        var self    = this;
        var birdKey = this.minDistanceKey;

        if (birdKey) {
            for (var i = 0; i < this.birdArr.length; i++) {
                var bird0 = this.birdArr[i];
                if (bird0.getName() === birdKey) {
                    this.birdArr.splice(i, 1);
                }
            }

            for (var j = 0; j < game['birdArr'].length; j++) {
                var bird1 = game['birdArr'][j];
                if (bird1['key'] === birdKey) {
                    game['birdArr'].splice(j, 1);
                }
            }

            var bird = this.getChildByName(birdKey);
            var type = 0;
            switch (bird.type) {
                case 'pp' :
                    type = 1;
                    break;
                case 'tt' :
                    type = 2;
                    break;
                case 'bb' :
                    type = 3;
                    break;
                case 'yy' :
                    type = 4;
                    break;
                default:
            }

            game['catchBirdCallback'](birdKey,type, bird.lng, bird.lat, function(key, status) {
                self.catchBirdCallback(key, status);
                callback();
                self.minDistanceKey = null;
            });

        } else {
            callback();
        }
    },

    catchBirdCallback: function(key, status) {
        var bird = this.getChildByName(key);
        if (status) {
            bird.setState('success', function(key) {
            });
        } else {
            bird.setState('fail', function(key) {

            });
        }
    },

    onEnter: function() {
        this._super();

        this.initUI();

        this.scheduleUpdate();
    }
    ,

    update: function(dt) {
        var birdArrTemp = this.birdArr.concat();

        for (var i = 0; i < game['birdArr'].length; i++) {
            var bird = game['birdArr'][i];

            if ('x' in bird) {
                var b0 = null;
                for (var j = 0; j < birdArrTemp.length; j++) {
                    var birdTemp = birdArrTemp[j];

                    if (bird.key === birdTemp.getName()) {
                        birdTemp.x   = bird.x;
                        birdTemp.y = bird.y;
                        birdTemp.lng = bird['long'];
                        birdTemp.lat = bird['lat'];
                        b0           = birdTemp;
                        birdArrTemp.splice(j, 1);
                    }
                }

                if (!b0) {
                    this.addBird(bird['type'], bird['x'], bird['y'], bird['key'], bird['long'], bird['lat']);
                }
            }
        }

        for (var k = 0; k < birdArrTemp.length; k++) {
            var birdTemp2 = birdArrTemp[k];

            for (var m = 0; m < this.birdArr.length; m++) {
                var b2 = this.birdArr[m];
                if (b2.tag === birdTemp2.getName()) {
                    this.birdArr.splice(m, 1);
                }
            }
            birdTemp2.removeFromParent(true);
        }

        game['globalNumArr'][1] = this.birdArr.length;

        this.checkState();
    }
});