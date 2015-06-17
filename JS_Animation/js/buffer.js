/**
 * Created by gaopengfei on 2015/6/17.
 */

window.onload = function(){

    var oDiv = document.getElementById('div1');

    oDiv.onmouseover = function(){
        startMove(0);
    }
    oDiv.onmouseout = function () {
        startMove(-200);
    }
}

var timer = null;
function startMove(iTarget){
    clearInterval(timer);   // 先清空定时器，再设置定时器
    var oDiv = document.getElementById('div1');
    var speed = (iTarget - oDiv.offsetLeft) / 20;
    speed = speed > 0?Math.ceil(speed):Math.floor(speed);
    timer = setInterval(function () {
        if(oDiv.offsetLeft == iTarget){
            clearInterval(timer);
        }else{
            oDiv.style.left = oDiv.offsetLeft + speed + 'px';
        }
    },30);
}
