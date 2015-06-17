/**
 * Created by gaopengfei on 2015/6/17.
 */
window.onload = function () {


   var Li = document.getElementById('li1');

    Li.onmouseover = function () {
        startMove(Li,'width',400, function () {
            startMove(Li,'height',400, function () {
                startMove(Li,'opacity',100);
            });
        });
    }
    Li.onmouseout = function () {
        startMove(this,'opacity',30, function () {
            startMove(Li,'height',200, function () {
                startMove(Li,'width',200);
            })
        });
    }

}

/**
 * 运动框架
 * @param obj 运动的对象
 * @param attr 运动的属性
 * @param iTarget 运动的目标
 * @param fn 接下来的动作，回调函数
 */
function startMove(obj,attr,iTarget,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 获取当前值
        var icur = 0;
        // 透明度要单独处理
        if(attr == 'opacity'){
            icur = Math.round(parseFloat(getStyle(obj,attr))*100);
        }else{
            icur = parseInt(getStyle(obj,attr));
        }

        // 求速度
        var  speed = (iTarget - icur) / 8;
        speed = speed > 0?Math.ceil(speed):Math.floor(speed);

        // 检测停止
        if(icur == iTarget){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }else{
            if(attr == 'opacity'){
                obj.style.filter = 'alpha(:'+ (icur + speed) + ')'; // IE
                obj.style.opacity = (icur + speed) / 100;           // FF
            }else{
                obj.style[attr] = icur + speed + 'px';
            }
        }
    },30);
}

function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr]; // IE
    }else{
        return getComputedStyle(obj,false)[attr];//FF，注意第二个参数是垃圾参数
    }
}