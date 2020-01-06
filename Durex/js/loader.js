/**
 * Created by yuyou on 14/11/3.
 * loader:init
 */
var Loader = function(baseUrl) {
    this.baseUrl  = baseUrl || "";
    this.imageArr = {};
    this.asyncArr = [];
    this.syncArr  = [];
    this.queues   = [];
    this.result   = {};
    this.cache    = {};
    this.noCache  = false;
};

Loader.prototype = {
    getUrl: function(src) {
        var url = '';
        if (src.indexOf("http://") >= 0 || src.indexOf("https://") >= 0) {
            url = src;
        } else {
            url = this.baseUrl + src;
        }
        url = this.noCache ? url + ( /\?/.test(url) ? "&" : "?" ) + "_=" + (new Date()).getTime() : url;
        return url;
    },

    getXMLHttpRequest: function() {
        return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
    },

    loadScript: function(src, callback) {
        var head       = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
        var script     = document.createElement("script");
        script.async   = false;
        script.type    = "text/javascript";
        script.charset = "utf-8";
        script.src     = this.getUrl(src);
        head.insertBefore(script, head.firstChild);
        if (callback) {
            document.addEventListener ? script.addEventListener("load", callback, false) : script.onreadystatechange = function() {
                if (/loaded|complete/.test(script.readyState)) {
                    script.onreadystatechange = null;
                    callback();
                }
            }
        }
    },

    loadCSS: function(src, callback) {

    },

    loadImage: function(src, callback) {
        var image = new Image();
        var that  = this;
        image.crossOrigin = "Anonymous";
        image.src = this.getUrl(src);
        image.addEventListener('load', function(e) {
            that.insertImage(src, {loaded: true, img: image});
            callback.apply(this, arguments);
        });
        image.addEventListener('error', function(e) {
            console.log('"图片资源不存在"');
            that.insertImage(src, {loaded: false, img: image});
            callback.apply(this, arguments);
        });
    },

    insertImage: function(url, obj) {
        this.imageArr[url] = obj;
        this.cache[this.getUrl(url)]    = {type: 'image', res: obj.img};
    },

    loadTxt: function(url, cb) {
        var xhr     = this.getXMLHttpRequest(),
            errInfo = "load " + url + " failed!";

        url = this.getUrl(url);
        xhr.open("GET", url, true);
        if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
            // IE-specific logic here
            xhr.setRequestHeader("Accept-Charset", "utf-8");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4)
                    xhr.status === 200 ? cb(null, xhr.responseText) : cb({
                        status:       xhr.status,
                        errorMessage: errInfo
                    }, null);
            };
        } else {
            if (xhr.overrideMimeType) xhr.overrideMimeType("text\/plain; charset=utf-8");
            xhr.onload  = function() {
                if (xhr.readyState === 4)
                    xhr.status === 200 ? cb(null, xhr.responseText) : cb({
                        status:       xhr.status,
                        errorMessage: errInfo
                    }, null);
            };
            xhr.onerror = function() {
                cb({status: xhr.status, errorMessage: errInfo}, null);
            };
        }
        xhr.send(null);
    },

    loadPlist: function(src, callback) {
        var self = this;
        this.loadTxt(src, function(err, txt) {
            self.cache[self.getUrl(src)] = {type: 'plist', res: txt};
            callback();
        });
    },

    loadFnt: function(src, callback) {
        var self = this;
        this.loadTxt(src, function(err, txt) {
            self.cache[self.getUrl(src)] = {type: 'fnt', res: txt};
            callback();
        });
    },

    load: function(type, src, callback) {
        switch (type) {
            case "script":
                this.loadScript(src, callback);
                break;
            case "css":
                this.loadCSS(src, callback);
                break;
            case "image":
                this.loadImage(src, callback);
                break;
            case "plist":
                this.loadPlist(src, callback);
                break;
            case "fnt":
                this.loadFnt(src, callback);
                break;
            default :
                break;
        }
    },

    loadSync: function(configs, percentage, next, index) {
        if (configs.length > 0) {
            index      = index || 0;
            var config = configs[index];
            var that   = this;
            this.load(config[0], config[1], function() {
                percentage(configs.length, index+1);
                if (index < configs.length - 1) {
                    that.loadSync(configs, percentage, next, index + 1);
                } else {
                    next.apply(this, arguments);
                }
            });
        } else {
            next();
        }

    },

    loadAsync: function(configs, percent, finish) {
        var index = 0;
        for (var i = 0; i < configs.length; i++) {
            var config = configs[i];
            this.load(config[0], config[1], function() {
                index++;
                percent(configs.length, index);
                if (index == configs.length) {
                    finish.apply(this, arguments);
                }
            })
        }
    },

    addQueue: function(type, url, sync, loader_index) {
        var config   = [type, url];
        loader_index = loader_index || 0;
        if (sync) {
            //同步列队
            this.queues[loader_index].syncArr.push(config);
            //this.syncArr.push(config)
        } else {
            this.queues[loader_index].asyncArr.push(config);
            //this.asyncArr.push(config);
        }
    },

    execQueue: function(percent, finish, loader_index) {
        loader_index = loader_index || 0;
        var total    = this.queues[loader_index].asyncArr.length + this.queues[loader_index].syncArr.length;
        var that     = this;
        this.loadSync(this.queues[loader_index].syncArr,
            function(a, index) {
                percent(total, index, loader_index);
            }, function() {
                that.loadAsync(that.queues[loader_index].asyncArr, function(a, index) {
                    percent(total, index + that.queues[loader_index].syncArr.length, loader_index)
                }, function() {
                    //当前page全部执行完毕之后
                    finish(loader_index);   //执行依次finish回调
                    if (loader_index < that.queues.length - 1) {
                        that.execQueue(percent, finish, loader_index + 1);
                    }
                });
            }, 0);
    },

    loadConfig: function(config, percent, finish, page_index) {
        var total_queue_count = config.pages.length;
        page_index            = page_index || 0;
        this.queues.push({
            asyncArr: [],
            syncArr:  [],
            finished: false
        });

        var js = config.basic.js;
        for (var i = 0; i < js.length; i++) {
            if (js[i].sync) {//同步列队
                this.addQueue("script", js[i].url, true, 0);
            } else {
                this.addQueue("script", js[i].url, false, 0);
            }
        }

        var images = config.basic.images;
        for (var i = 0; i < images.length; i++) {
            this.addQueue("image", images[i], false, 0);
        }

        var res = config.basic.res;
        for (var i = 0; i < res.length; i++) {
            this.addQueue(res[i].type, res[i].url, false, 0)
        }

        var pages = config.pages;
        for (var i = 0; i < pages.length; i++) {
            if (i > 0) {
                this.queues.push({
                    asyncArr: [],
                    syncArr:  [],
                    finished: false
                });
            }
            var page = pages[i];
            for (var j = 0; j < page.dom.length; j++) {
                var _dom = page.dom[j]; //获取该dom元素的fill
                if (_dom.src) {
                    this.addQueue("image", _dom.src, false, i);
                }
            }
        }
        this.execQueue(percent, finish, page_index);    //执行同步loading
    }
};


var loader = new Loader(game.baseUrl);

loader.load("script", "js/config.js", function() {
    loader.loadConfig(config, function(total, index, pindex) {
        //console.log(total, index, pindex);
        game.loadPercentCallback(total,index);
    }, function(pindex) {
        game.loadFinishCallback();
    }, 0);
});
