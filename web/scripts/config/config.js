/**
 * Created by yusee on 2018/7/4.
 */

/**
 * 配置文件
 */

/**
 * 地图资源扩展
 */

{
    /***
     * 百度地图扩展
     */
    ol.source.BaiduMap = function(options){

        var projzh = util.getProjzh();

        var options = options ? options : {};

        var attributions;
        if(options.attributions !== undefined){
            attributions = options.attributions;
        }else{
            attributions = ['&copy;' +
            ' <a class="ol-attribution-baidumap" ' +
            'href="http://map.baidu.com/">' +
            '百度地图</a>'];
        }

        var extent = [72.004, 0.8293, 137.8347, 55.8271];

        //定义百度坐标
        var baiduMercator = new ol.proj.Projection({
            code: 'baidu',
            extent: ol.extent.applyTransform(extent, projzh.ll2bmerc),
            units: 'm'
        });

        ol.proj.addProjection(baiduMercator);
        ol.proj.addCoordinateTransforms('EPSG:4326', baiduMercator, projzh.ll2bmerc, projzh.bmerc2ll);
        ol.proj.addCoordinateTransforms('EPSG:3857', baiduMercator, projzh.smerc2bmerc, projzh.bmerc2smerc);

        var resolutions = [];
        for(var i=0; i<19; i++){
            resolutions[i] = Math.pow(2, 18-i);
        }
        var tilegrid  = new ol.tilegrid.TileGrid({
            origin: [0,0],
            resolutions: resolutions,
            extent: ol.extent.applyTransform(extent, projzh.ll2bmerc),
            tileSize: [256, 256]
        });
        var satUrls = [0, 1, 2, 3, 4].map(function(sub) {
            return 'http://shangetu' + sub +
                '.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20150601';
        });
        var urls = [0, 1, 2, 3, 4].map(function(sub) {
            return 'http://online' + sub +
                '.map.bdimg.com/onlinelabel/qt=tile&x={x}&y={y}&z={z}&v=009&styles=pl&udt=20170301&scaler=1&p=1';
        });
        ol.source.TileImage.call(this, {
            attributions: attributions,
            crossOrigin: 'anonymous',   //跨域
            cacheSize: options.cacheSize,
            // projection: ol.proj.get('EPSG:3857'),
            projection:'baidu',
            tileGrid: tilegrid,
            tileUrlFunction: function(tileCoord, pixelRatio, proj){
                if(!tileCoord) return "";

                var z = tileCoord[0];
                var x = tileCoord[1];
                var y = tileCoord[2];
                var hash = (x << z) + y;
                var index = hash % urls.length;
                index = index < 0 ? index + urls.length : index;
                if(options.mapType == "sat"){
                    return satUrls[index].replace('{x}', x).replace('{y}', y).replace('{z}', z);
                }
                return urls[index].replace('{x}', x).replace('{y}', y).replace('{z}', z);

            },
            wrapX: options.wrapX !== undefined ? options.wrapX : true

        });
    };

    ol.inherits(ol.source.BaiduMap,ol.source.TileImage);

    /***
     * 天地图扩展
     */
    ol.source.TianMap = function(options){
        var options = options ? options : {};
        var attributions;
        if(options.attributions !== undefined){
            attributions = options.attributions;
        }else{
            attributions = ['&copy;' +
            ' <a class="ol-attribution-tianmap" ' +
            'href="http://www.tianditu.cn/">' +
            '天地图</a>'];
        }

        var url;
        if(options.mapType == "sat"){
            url = "http://t{0-4}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}";
        }else if(options.mapType == "satLabel"){
            url = "http://t{0-4}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}";
        }else if(options.mapType == "label"){
            url = "http://t{0-4}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}";
        }else{
            url = "http://t{0-4}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}";
        }

        ol.source.XYZ.call(this, {
            attributions: attributions,
            projection: ol.proj.get('EPSG:3857'),
            cacheSize: options.cacheSize,
            crossOrigin: 'anonymous',
            opaque: options.opaque !== undefined ? options.opaque : true,
            maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileLoadFunction: options.tileLoadFunction,
            url: url,
            wrapX: options.wrapX
        });
    };
    ol.inherits(ol.source.TianMap, ol.source.XYZ);


    /***
     * 高德地图扩展
     */
    ol.source.AMap = function(options){
        var options = options ? options : {};

        var attributions;
        if(options.attributions !== undefined){
            attributions = options.attributions;
        }else{
            attributions = ['&copy; ' +
            '<a class="ol-attribution-amap" ' +
            'href="http://ditu.amap.com/">' +
            '高德地图</a>'];
        }

        var url;
        if(options.mapType == "sat"){
            url ="http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
        }else{
            url = "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}";
        }

        ol.source.XYZ.call(this, {
            attributions: attributions,
            crossOrigin: 'anonymous',   //跨域
            cacheSize: options.cacheSize,
            projection: ol.proj.get('EPSG:3857'),
            // urls:urls,
            url:url,
            wrapX: options.wrapX !== undefined ? options.wrapX : true

        });

    };

    ol.inherits(ol.source.AMap,ol.source.XYZ);

}


/**
 * 逻辑控制
 * @type {{}}
 */
var logicalControls = {

    mainControl: {},

    figureControl:{}
};

/**
 * 页面控制
 * @type {{}}
 */
var pageControls = {

    indexControl:{
        currentTargetIndex: 0
    }

};

/**
 * mainControl
 */
logicalControls.mainControl = {

    title: 'mainControl',

    /***
     * 全局地图对象
     * */
    map : {},

    /**
     * 当前的图层对象
     */
    currentLayer: {},

    currentLayerIndex: 0,

    removeLayerAt: function (index) {
      this.map.getLayerGroup().getLayers().removeAt(index);
    },

    init: function (map) {
        this.map = map;
    }

};

/**
 * figureControl
 */
logicalControls.figureControl = {

    title: 'mainControl',

    addFigureObject: function (t) {

        logicalControls.mainControl.map.addLayer(t);
    },

    figure : function (layer,type) {

        this.id = logicalControls.figureControl.figures.length;
        this.layer = layer;
        this.type = type;
        this.features = [];
    },

    /*当前图层对象*/
    currentFigure:{},

    currentFigureType:'',

    figures: [],

    currentFigureIndex: function () {
        return this.figures.indexOf(this.currentFigure);
    },

    /*画对象*/
    currentDrawObj: {},

   /* 源对象*/
    currentSourceObj: {},

    /*矢量图层对象*/
    currentVectorObj: {},

    /**
     * 编辑对象
     * */

   /* 要素更改*/
    currentModifyObj: {},
   /* 要素捕捉*/
    currentSnapObj:{}

};

logicalControls.figureControl.figures.__proto__.remove = function(obj) {

    var index = this.indexOf(obj);
    if(index!== -1){
        this.splice(index,1);
    }
};

/**
 * 工具
 * */
var util = {

    title: 'until'
};

