/**
 * Created by gaopengfei on 2015/6/17.
 */

window.onload = function () {

   /* var oDiv = document.getElementById('div1');
    oDiv.onmouseover = function () {
        startMove(100);
    }
    oDiv.onmouseout = function () {
        startMove(30);
    }*/

    var oDivs = document.getElementsByTagName('div');
    for(var i = 0;i < oDivs.length;i++){
        oDivs[i].timer = null;
        oDivs[i].alpha = 30;
        oDivs[i].onmouseover = function () {
            startMove(this,100);
        }
        oDivs[i].onmouseout = function () {
            startMove(this,30);
        }
    }

}

/*
var timer = null;
var alpha = 30; // 引入一个变量
function startMove(iTarget){
    clearInterval(timer);
    var oDiv = document.getElementById('div1');
    timer = setInterval(function () {
        var speed = alpha > iTarget?-10:10;
        if(alpha == iTarget){
            clearInterval(timer);
        }else{
            alpha += speed;
            oDiv.style.filter = 'alpha('+alpha+')'; // IE
            oDiv.style.opacity = alpha / 100;
        }
    },30);
}*/

function startMove(obj,iTarget){
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var speed = obj.alpha > iTarget?-10:10;
        if(obj.alpha == iTarget){
            clearInterval(obj.timer);
        }else{
            obj.alpha += speed;
            obj.style.filter = 'alpha('+ obj.alpha+')'; // IE
            obj.style.opacity = obj.alpha / 100;
        }
    },30);
}