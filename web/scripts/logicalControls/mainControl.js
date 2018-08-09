/**
 * Created by yusee on 2018/7/3.
 */


/***
 * 初始化mainControl
 */
{
    var mainControl = logicalControls.mainControl;

    var figureControl = logicalControls.figureControl;

    mainControl.layers = {

        "BaiduMap": new ol.layer.Tile({
            title: '百度地图',
            source: new ol.source.BaiduMap(/*{mapType:"sat"}*/)
        }),

        "TianMap": new ol.layer.Tile({
            title: '天地图',
            source: new ol.source.TianMap(/*{mapType:"label"}*/)
        }),

        "GaoDeMap": new ol.layer.Tile({
            title: '高德地图',
            source: new ol.source.AMap(/*{mapType:"sat"}*/)
        })
    };

}


/***
 * 全局执行函数
 * */
(function() {

    /***
     * 地图加载
     */
    mainControl.init(
        new ol.Map({
            target: 'map',
            layers: [
                mainControl.layers["BaiduMap"]
            ],
            view: new ol.View({
                zoom: 10,
                center: ol.proj.transform([108.945731, 34.382717], 'EPSG:4326', 'EPSG:3857')
            })
        })
    );

    /*figureControl.addFigureByJSON(geojsonObject);*/
    // var obj = figureControl.drawFigure('Circle');


})();

/**
 * 图层操作函数
 */

{

    /**
     * 更改地图
     * @param type
     */
    mainControl.changeLayer = function (type) {

        if(type === mainControl.currentLayerIndex) return;

        var key = (function () {
            var LayerSelect = {
                0: function () {return "BaiduMap";},
                1: function () {return "TianMap";},
                2: function () {return "GaoDeMap";}
            };
            return LayerSelect[type]();
        })();

        mainControl.map.getLayerGroup().getLayers().removeAt(0);
        mainControl.currentLayer = mainControl.layers[key];
        mainControl.currentLayerIndex = type;
        mainControl.map.getLayerGroup().getLayers().insertAt(0,mainControl.currentLayer);

    }

    /*mainControl.map.on('click', function(evt) {
        var pixel = mainControl.map.getEventPixel(evt.originalEvent);
        var mapFeature = mainControl.map.forEachFeatureAtPixel(pixel, function(feature, layer) {
            return feature;
        }, null, function(layer) {
            /!*return layer === endPoint;*!/
        });
        console.log(mapFeature)
    })*/

}





