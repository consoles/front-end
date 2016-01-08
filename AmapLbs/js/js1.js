/**
 * Created by gaopengfei on 2015/12/14.
 */

(function () {
    // config and init the map
//  var map = new AMap.Map('mapContainer');
//  init the map use the special options
    var mapOpts = {
        view: new AMap.View2D({
            zoom: 18
        }),
        zooms: [3, 18]
    };
    var map = new AMap.Map('mapContainer', mapOpts);
    // set config to the map
    map.setCity('襄阳');
    map.setZoom(12);
    console.log(map.getZoom());

    // add event listener
    document.getElementById('zoomIn').addEventListener('click', function (e) {

        var max = mapOpts.zooms[1];
        if (map.getZoom() === max) {
            map.setZoom(max);
            alert('已经处于最大的放大级别！');
            return;
        }
        map.zoomIn();
    });
    document.getElementById('zoomOut').addEventListener('click', function (e) {

        var min = mapOpts.zooms[0];
        if (map.getZoom() === min) {
            map.setZoom(min);
            alert('地图已经最小了，继续缩小就看不见了！');
            return;
        }
        map.zoomOut();
    });
    AMap.event.addListener(map, 'dragend', function (e) {
        var loc = map.getCenter();
        alert('您位于' + loc);
    });

    // add plugins
    map.plugin(['AMap.Scale'], function () {
        var scale = new AMap.Scale();
        map.addControl(scale);
    });
    map.plugin(['AMap.MapType'], function () {
        var type = new AMap.MapType();
        map.addControl(type);
    });
    map.plugin(['AMap.OverView'], function () {
        var view = new AMap.OverView();
        view.open();
        map.addControl(view);
    });
    map.plugin(['AMap.ToolBar'], function () {
        var tool = new AMap.ToolBar();
        map.addControl(tool);
    });
    map.plugin(["AMap.RangingTool"],function(){
        var ruler = new AMap.RangingTool(map);
        ruler.turnOn();
    });

}());