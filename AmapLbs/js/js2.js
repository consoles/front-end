/**
 * Created by gaopengfei on 2015/12/14.
 */

(function(){

    var marker;
    var map = new AMap.Map('mapContainer');
    map.setZoom(10);

    var html = '<div style="background-color:#0808E3;width:100px;height:100px;line-height:100px;border-radius:50px;text-align:center;color:#FFF;">拖我试试</div>';

    // 点标记：Marker
    var marker= new AMap.Marker({
        map:map,
        animation:'AMAP_ANIMATION_BOUNCE',
        draggable:true,
        autoRotation:true,
        title:'鼠标悬停文字，类似于图片的title属性'
    });
    marker.setCursor("url('http://webapi.amap.com/images/0.png')");
    marker.setContent(html);

    var basePos = map.getCenter(); // 构造一个地理位置对象
    console.log(basePos.getLng(),basePos.getLat());
    // 创建100个标记
    for(var i = 0;i < 100;i++){
        var pos = new AMap.LngLat(basePos.getLng()+0.1*i,basePos.getLat()*0.1);
        marker = new AMap.Marker({
            position: pos,
            draggable: true,
            raiseOnDrag: true,
            opacity: 1,
            icon: 'http://webapi.amap.com/theme/v1.2/0.png'
        });
        marker.setMap(map);
    }

    // 折线
    var polyline = new AMap.Polyline();

    var arr = [];//经纬度坐标数组                 
    arr.push(new AMap.LngLat(116.368904 ,39.913423));
    arr.push(new AMap.LngLat(116.382122,39.901176));
    arr.push(new AMap.LngLat(116.387271,39.912501));
    arr.push(new AMap.LngLat(116.398258,39.904600));

    polyline.setPath(arr);

    polyline.setMap(map);

    // 事件
    AMap.event.addListener(polyline, 'mouseover', function(){
        alert('你很危险，触碰到了火线');
    });

    AMap.event.addListener(mk, 'click', function(){
        info.open(map, map.getCenter());
    });


    var info  = new AMap.InfoWindow({
        closeWhenClickMap: true,
        content: '我是信息窗体'
    });
}());