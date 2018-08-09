/**
 * Created by yusee on 2018/7/4.
 */

/**
 * 初始化indexControl
 */

var indexControl = pageControls.indexControl;

var figureControl = logicalControls.figureControl;

(function () {

    /*地图选择*/
    $(".switcher-item").click(function (e) {

        mainControl.changeLayer($(this).index());
        $(this).parent().find(".switcher-item").removeClass("switcher-item-active");
        $(this).addClass("switcher-item-active");

    });

    /*画图形状选择*/
    $(".draw-item").click(function () {

        if($(".draw-control-item:nth-child(1)").hasClass("draw-control-item-active")) return;

        indexControl.currentDrawType = $(this).attr('data-draw-type');
        figureControl.drawFigure(indexControl.currentDrawType);
        $(this).parent().find(".draw-item").removeClass("draw-item-active");
        $(this).addClass("draw-item-active");

        figureControl.closeEditFigure();
        $(".draw-control-item:nth-child(2)").removeClass("draw-control-item-active").text('开启编辑');

        $(".draw-control-item:nth-child(1),.draw-control-item:nth-child(2)").removeClass("draw-close");
        $(".draw-control-item:nth-child(1)").addClass("draw-control-item-active");

        
    });

    /**
     * 其它操作
     * */

    /*结束绘制*/
    $(".draw-control-item:nth-child(1)").click(function () {

        figureControl.closeDraw();
        figureControl.closeEditFigure();
        indexControl.showFigureInfo();
        $(".figure-draw > .draw-item").removeClass("draw-item-active");
        $(".draw-control-item:nth-child(1)").removeClass("draw-control-item-active").addClass("draw-close");
        $(".draw-control-item:nth-child(3)").removeClass("draw-close");
        $(".figure-box-num").text(figureControl.figures.length);

        $(".figure-box-collection").find('.figure-box-collection-item').removeClass("figure-box-collection-item-active");

        $(".figure-box-collection").prepend("<div class='figure-box-item figure-box-collection-item figure-box-collection-item-active flex-container-column flex-container-center-V-H' data-id='"
            + (figureControl.figures.length) + "'>"
            + indexControl.currentDrawType + "</div>");

        figureControl.changeCurrentObj(figureControl.figures.length-1);

        indexControl.showFigureInfo();
    });

    /*开启编辑*/
    $(".draw-control-item:nth-child(2)").click(function () {

        if($(this).hasClass("draw-control-item-active")){
            figureControl.closeEditFigure();
            $(this).removeClass("draw-control-item-active");
            $(this).text('开启编辑');
        }else{
            figureControl.editFigure();
            $(this).addClass("draw-control-item-active");
            $(this).text('关闭编辑');
        }
    });

    /*移除图形*/
    $(".draw-control-item:nth-child(3)").click(function () {

        $(this).parent().find(".draw-control-item").removeClass("draw-control-item-active").addClass("draw-close");

        if(figureControl.figures.length === 0){
            $(this).removeClass("draw-class");
        }

        if($(".draw-control-item:nth-child(1)").hasClass("draw-control-item-active")){
            figureControl.closeDraw();
        }

        if($(".draw-control-item:nth-child(2)").hasClass("draw-control-item-active")){
            figureControl.closeEditFigure();
        }

        $(".figure-box-collection-item:nth-child("+ figureControl.currentFigureIndex()+1 + ")").remove();

        figureControl.clearCurrentFigure();

        $(".figure-box-num").text(figureControl.figures.length);

        if(figureControl.figures.length > 0){
            figureControl.changeCurrentObj(figureControl.figures.length-1);
            indexControl.showFigureInfo();
        }else{
            indexControl.clearFigureInfo();
        }

    });

    /*盒子展开*/
    $(".figure-box-num").click(function () {
       if($(this).hasClass("figure-box-num-active")){
           $(this).removeClass("figure-box-num-active");
           $(".figure-box-collection").addClass("figure-box-collection-hidden");
       }else {
           $(this).addClass("figure-box-num-active");
           $(".figure-box-collection").removeClass("figure-box-collection-hidden");
       }
    });

    /*元素盒子点击事件*/
    $(".figure-box-collection").on('click','.figure-box-collection-item',function (e){
        var index = $(e.currentTarget).attr("data-id");
        figureControl.changeCurrentObj(parseInt(index) - 1);
        $(this).parent().find(".figure-box-collection-item").removeClass("figure-box-collection-item-active");
        $(this).addClass("figure-box-collection-item-active");
        indexControl.showFigureInfo();
    });

})();

/*添加盒子元素*/
indexControl.addFigure = function (JSONstr) {

    figureControl.addFigureByJSON(JSONstr);

    $(".figure-box-collection").prepend("<div class='figure-box-item figure-box-collection-item figure-box-collection-item-active flex-container-column flex-container-center-V-H' data-id='"
        + (figureControl.figures.length) + "'>"
        + JSON.parse(JSONstr).type + "</div>");
    $(".figure-box-num").text(figureControl.figures.length);

    $(".draw-control-item:nth-child(2),.draw-control-item:nth-child(3)").removeClass("draw-close");

    indexControl.showFigureInfo();
};
indexControl.showFigureInfo = function(){

    if(figureControl.figures.length > 0){
        var figure = figureControl.currentFigure;
        var features = figure.features;

        $(".figure-info > .figure-info-items:nth-child(1) > .figure-info-Id").text("ID:"+ figure.id + "- " + figure.type);
        $(".figure-info > .figure-info-items:nth-child(1) > .figure-info-Coordinates").text(features[0]);
        if(features.length > 1){
            for(var i = 1;i<features.length;i++){
                indexControl.addFigureInfo(features[i],figure);
            }
        }
    }
};
indexControl.addFigureInfo = function (feature,figure) {
    $(".figure-info").append("<div class='figure-info-items flex-container-column'>"+
    "<div class='figure-info-item flex-container-row flex-container-center-H figure-info-Id'>ID:"+ figure.id + "-" + figure.type +"</div>"+
    "<p class='figure-info-item flex-container-column flex-auto flex-wrap figure-info-Coordinates'>"+feature+"</p></div>")
};
indexControl.clearFigureInfo = function () {

    var chlidren = $(".figure-info").children();
    if(chlidren.length > 1){
        for(var i = 1;i <chlidren.length;i++){
            $(chlidren[i]).remove();
        }
    }

    $(".figure-info > .figure-info-items:nth-child(1) > .figure-info-Id").text("ID:null-null");
    $(".figure-info > .figure-info-items:nth-child(1) > .figure-info-Coordinates").text("坐标点:null");
};

/**
 * 通过坐标绘制图形
 */
{

    var CircleJson = {
        type: 'Circle',
        value: {
            center: [12158969.606561309,4086423.0317836097],
            radius: 36046.19840353541
        }
    };

    var PolygonJson = {
        type: 'box',
        value: {
            type: 'FeatureCollection',
            crs: {
                type: 'name',
                properties: {
                    name: 'EPSG:3857'
                }
            },
            features: [{
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [[
                        [12098584.35421602,4066090.782259753],
                        [12106075.182987968,4114857.6063056956],
                        [12057308.358942024,4122348.435077642],
                        [12049817.530170077,4073581.6110316995]
                        /*[108.945731, 34.382717], [110.945731, 34.382717], [108.945731, 38.382717],
                         [120.945731, 40.382717], [125.945731, 50.382717]*/
                    ]]
                }
            }]
        }
    };

    indexControl.addFigure(JSON.stringify(CircleJson));
}

