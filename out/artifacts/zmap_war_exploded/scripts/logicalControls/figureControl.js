/**
 * Created by yusee on 2018/7/6.
 */


/**
 * 初始化figureControl
 * @type {*}
 */
{
    var figureControl = logicalControls.figureControl;

    /**
     * 图形样式设置
     * @type {[]}
     */
    figureControl.editFigureStyle = [
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#1791fc',
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(23, 145, 252, 0.1)'
            }),
            image: new ol.style.Circle({
                radius: 8,
                stroke: new ol.style.Stroke({
                   color: '#fff',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: '#1791fc'
                })
            })
        }),
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'orange'
                })
            }),
            geometry: function(feature) {
                // return the coordinates of the first ring of the polygon
                console.log(feature.getGeometryName());
                const coordinates = feature.getGeometry().getCoordinates();
                var result = null;
                var type = feature.getGeometryName();
                if(type === 'Point'){
                    result = coordinates;
                }else if(type == 'Circle'){
                    result = feature.getGeometry().getCenter();
                }else{
                    result = coordinates[0];
                }
                return new ol.geom.MultiPoint(result);
            }
        })
    ];
    figureControl.figureStyle = [
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#1791fc',
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(23, 145, 252, 0.1)'
            }),
            image: new ol.style.Circle({
                radius: 8,
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: '#1791fc'
                })
            })
        })
    ];
    figureControl.currentFigureStyle = [
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'orange',
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.4)'
            }),
            image: new ol.style.Circle({
                radius: 8,
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: '#1791fc'
                })
            })
        })
    ];
}

/**
 * 操作定义
 */
{
    /**
     * 通过传递的JSON数据添加图形
     * @param g
     */
    figureControl.addFigureByJSON = function (g) {

        var obj = JSON.parse(g);
        figureControl.currentFigureType = obj.type;


        if(obj.type === 'Circle'){
            var Circle = new ol.Feature({
                geometry: new ol.geom.Circle(obj.value.center,obj.value.radius)
            });

            figureControl.currentSourceObj = new ol.source.Vector({
                features : [Circle]
            });
        }else{
            figureControl.currentSourceObj = new ol.source.Vector({
                features : (new ol.format.GeoJSON()).readFeatures(JSON.stringify(obj.value))
            });
        }

        figureControl.currentVectorObj = new ol.layer.Vector({
            source: figureControl.currentSourceObj,
            style: figureControl.figureStyle
        });

        figureControl.currentVectorObj.setStyle(figureControl.currentFigureStyle);

        figureControl.addFigureObject(figureControl.currentVectorObj);

        figureControl.currentFigure = new figureControl.figure(figureControl.currentVectorObj,figureControl.currentFigureType);

        var features = figureControl.currentFigure.layer.getSource().getFeatures();

        for(var i = 0;i < features.length;i++){

            var attribute;
            if(obj.type === 'Circle'){
                attribute = "圆心坐标"+ features[i].getGeometry().getCenter()+'圆半径'+features[i].getGeometry().getRadius();
            }else{
                attribute = features[i].getGeometry().getCoordinates();
            }
            figureControl.currentFigure.features.push(attribute);
        }


        figureControl.figures.push(figureControl.currentFigure);

    };

    /**
     * 手动绘制图形
     */
    figureControl.drawFigure = function (options) {

        figureControl.currentFigureType = options;

        if(figureControl.figures.length > 0){
            figureControl.currentVectorObj.setStyle(figureControl.figureStyle);
        }

        figureControl.currentSourceObj = new ol.source.Vector({wrapX: false});

        figureControl.currentVectorObj = new ol.layer.Vector({
            source: figureControl.currentSourceObj,
            style: figureControl.currentFigureStyle
        });

        figureControl.addFigureObject(figureControl.currentVectorObj);

        figureControl.currentFigure = new figureControl.figure(figureControl.currentVectorObj,figureControl.currentFigureType);

        (function addInteraction() {

            var value = options;
            if (value !== 'None') {

                if(value === 'Square' || value === 'Box'){
                    var geometryFunction = null;
                    if (value === 'Square') {
                        value = 'Circle';
                        geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
                    } else if (value === 'Box') {
                        value = 'Circle';
                        geometryFunction = ol.interaction.Draw.createBox();
                    }
                    figureControl.currentDrawObj = new ol.interaction.Draw({
                        source: figureControl.currentSourceObj,
                        type: value,
                        geometryFunction: geometryFunction,
                        geometryName: options
                    });
                }else{
                    figureControl.currentDrawObj = new ol.interaction.Draw({
                        source: figureControl.currentSourceObj,
                        type: value,
                        geometryName: options
                    });
                }
                mainControl.map.addInteraction(figureControl.currentDrawObj);

            }

        })();

        //获取绘制图形的坐标点
        figureControl.currentDrawObj.on('drawend', function (e) {

            var feature = e.feature;
            var attribute = '';

            switch (options) {
                case 'Circle':
                    var center = e.feature.getGeometry().getCenter();
                    var radius = e.feature.getGeometry().getRadius();
                    attribute = ("圆心坐标：" + center + "圆半径：" + radius);
                    break;
                case 'Point':
                    var coordinates_Point = e.feature.getGeometry().getCoordinates();
                    attribute = (coordinates_Point);
                    break;
                case 'LineString':
                    var coordinates_Line = e.feature.getGeometry().getCoordinates();
                    attribute = coordinates_Line.toString();
                    break;
                default:
                    var coordinates_Polygon = e.feature.getGeometry().getCoordinates();
                    attribute = coordinates_Polygon.toString();
            }

            $.ajax({
                type : 'POST',
                url :"graphAction.action",
                data: {
                    'gparam':JSON.stringify([
                    {
                        type:options,
                        location:attribute
                    }])
                },
                dataType:'json',
                success:function(data) {
                    alert("success");
                },
                error:function (){
                    alert("error");
                }
            });

        });

    };

    /**
     * 清空绘制图形
     */
    figureControl.clearCurrentFigure = function () {

        console.log(figureControl.figures);

        figureControl.currentVectorObj.setSource(null);
        console.log(figureControl.figures.indexOf(figureControl.currentFigure));
        figureControl.figures.remove(figureControl.currentFigure);
        console.log(figureControl.figures);
    };

    /**
     * 关闭绘制
     * @param draw
     */
    figureControl.closeDraw = function () {

        mainControl.map.removeInteraction(figureControl.currentDrawObj);

        figureControl.figures.push(figureControl.currentFigure);
    };

    /**
     * 开启编辑
     */
    figureControl.editFigure = function () {

        figureControl.currentSnapObj = new ol.interaction.Snap({
            source:figureControl.currentSourceObj
        });
        figureControl.currentModifyObj = new ol.interaction.Modify({
            source : figureControl.currentSourceObj
        });

        figureControl.currentVectorObj.setStyle(figureControl.editFigureStyle);
        mainControl.map.addInteraction(figureControl.currentSnapObj);
        mainControl.map.addInteraction(figureControl.currentModifyObj);
    };

    /**
     * 关闭编辑
     */
    figureControl.closeEditFigure = function () {

        figureControl.currentVectorObj.setStyle(figureControl.currentFigureStyle);
        mainControl.map.removeInteraction(figureControl.currentModifyObj);
    };

    /**
     * 改变当前对象
     */
    figureControl.changeCurrentObj = function (index) {
        if(figureControl.figures.length > 0){
            figureControl.currentVectorObj.setStyle(figureControl.figureStyle);
            var figure = figureControl.figures[index];
            figureControl.currentFigure = figure;
            figureControl.currentVectorObj = figure.layer;
            figureControl.currentSourceObj = figure.layer.getSource();
            figureControl.currentFigureType = figure.type;
            figureControl.currentVectorObj.setStyle(figureControl.currentFigureStyle);
        }
    }

}


