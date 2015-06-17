/**
 * Created by gaopengfei on 2015/6/17.
 */
window.onload = function () {

    var oLi = document.getElementById('li1');

    oLi.onmouseover = function () {
        startMove(oLi,{'width':400,'height':300,'opacity':100}, function () {
            startMove(oLi,{'fontSize':40});
        });
    }
    oLi.onmouseout = function () {
        startMove(oLi,{'fontSize':14}, function () {
            startMove(oLi,{'width':200,'height':100,'opacity':30});
        });
    }

}

/**
 * 完美运动框架
 * @param obj 运动的元素
 * @param json 运动的属性和目标值（json格式{attr1:target1,attr2:target2}）
 * @param fnEnd 运动结束后的回调函数
 */
function startMove(obj,json,fnEnd){
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var bStop = true; // 假设所有的动画效果已经达到

        for(var attr in json){
            // 获取当前值
            var iCur = 0;
            // 透明度要单独处理
            if(attr == 'opacity'){
                iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
            }else{
                iCur = parseInt(getStyle(obj,attr));
            }

            // 求速度
            var  speed = (json[attr] - iCur) / 8;
            speed = speed > 0?Math.ceil(speed):Math.floor(speed);

            // 检测停止
            if(iCur != json[attr]){
                bStop = false;
            }

            if(attr == 'opacity'){
                obj.style.filter = 'alpha(:'+ (iCur + speed) + ')'; // IE
                obj.style.opacity = (iCur + speed) / 100;           // FF
            }else{
                obj.style[attr] = iCur + speed + 'px';
            }
        }

        if(bStop){
            clearInterval(obj.timer);
            if(fnEnd){
                fnEnd();
            }
        }
    },30);
}

/**
 * 获取样式
 * @param obj 元素id
 * @param attr 元素的样式
 * @returns 样式
 */
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr]; // IE
    }else{
        return getComputedStyle(obj,false)[attr];//FF，注意第二个参数是垃圾参数
    }
}