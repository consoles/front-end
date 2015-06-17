/**
 * Created by gaopengfei on 2015/6/17.
 */

window.onload = function(){

    var oDiv = document.getElementById('div1');

    oDiv.onmouseover = function(){
        //startMove();
        startMove(0);
    }
    oDiv.onmouseout = function () {
        //startMove1();
        startMove(-200);
    }
}

var timer = null;
/*
function startMove(){
    clearInterval(timer);   // 先清空定时器，再设置定时器
    var oDiv = document.getElementById('div1');
    timer = setInterval(function () {
        if(oDiv.offsetLeft == 0){
            clearInterval(timer);
        }else{
            oDiv.style.left = oDiv.offsetLeft + 1 + 'px';
        }
    },30);
}

function startMove1(){
    clearInterval(timer);   // 先清空定时器，再设置定时器
    var oDiv = document.getElementById('div1');
    timer = setInterval(function () {
        if(oDiv.offsetLeft == -200){
            clearInterval(timer);
        }else{
            oDiv.style.left = oDiv.offsetLeft - 1 + 'px';
        }
    },30);
}*/

function startMove(iTarget){
    clearInterval(timer);   // 先清空定时器，再设置定时器
    var oDiv = document.getElementById('div1');
    var speed = iTarget < oDiv.offsetLeft ? -10:10;
    timer = setInterval(function () {
        if(oDiv.offsetLeft == iTarget){
            clearInterval(timer);
        }else{
            oDiv.style.left = oDiv.offsetLeft + speed + 'px';
        }
    },30);
}
