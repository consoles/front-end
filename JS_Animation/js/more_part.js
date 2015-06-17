/**
 * Created by gaopengfei on 2015/6/17.
 */
window.onload = function () {
    var aLi = document.getElementsByTagName('li');

    for(var i = 0;i < aLi.length;i++){
        aLi[i].timer = null;
        aLi[i].onmouseover = function () {
            startMove(this,400);
        }
        aLi[i].onmouseout = function () {
            startMove(this,200);
        }
    }
}

//var timer = null;
function startMove(obj,iTarget){
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var icur = parseInt(getStyle(obj,'width'));
        var  speed = (iTarget - icur) / 8;
        speed = speed > 0?Math.ceil(speed):Math.floor(speed);
        if(icur == iTarget){
            clearInterval(obj.timer);
        }else{
            obj.style['width'] = icur + speed + 'px';
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