/**
 * Created by gaopengfei on 2015/6/17.
 */
window.onload = function () {

   alert(Math.round(0.07*100));

   var li1 = document.getElementById('li1'),
       li2 = document.getElementById('li2');

   /* li1.onmouseover = function () {
        startMove(this,400);
    }
    li1.onmouseout = function () {
        startMove(this,100);
    }

    li2.onmouseover = function () {
        startMove1(this,400);
    }
    li2.onmouseout = function () {
        startMove1(this,100);
    }*/

    li1.onmouseover = function () {
        //startMove(this,'height',400);
        startMove(this,'opacity',100);
    }
    li1.onmouseout = function () {
        //startMove(this,'height',100);
        startMove(this,'opacity',30);
    }

    li2.onmouseover = function () {
        startMove(this,'width',400);
    }
    li2.onmouseout = function () {
        startMove(this,'width',200);
    }

}

/*function startMove(obj,iTarget){
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var icur = parseInt(getStyle(obj,'height'));
        var  speed = (iTarget - icur) / 8;
        speed = speed > 0?Math.ceil(speed):Math.floor(speed);
        if(icur == iTarget){
            clearInterval(obj.timer);
        }else{
            obj.style['height'] = icur + speed + 'px';
        }
    },30);
}

function startMove1(obj,iTarget){
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
}*/

function startMove(obj,attr,iTarget){
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
        }else{
            if(attr == 'opacity'){
                obj.style.filter = 'alpha(:'+ (icur + speed) + ')'; // IE
                obj.style.opacity = (icur + speed) / 100;             // FF
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