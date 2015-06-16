/**
 * Created by gaopengfei on 2015/6/16.
 */
/**
 * 根据类名获取元素，因为IE10以前不支持document.getElementsByTagName()方法
 * @param clsName 类名
 * @param parent 父元素的id
 */
function getByClass(clsName,parent){
    var oParent = parent?document.getElementById(parent):document,
        eles = [],
        elements = oParent.getElementsByTagName('*');
    for(var i = 0,l = elements.length;i<l;i++){
        if(elements[i].className == clsName){
            eles.push(elements[i]);
        }
    }
    return eles;
}

window.onload = drag;

function drag(){
    var oTitle = getByClass('login_logo_webqq','loginPanel')[0];

    oTitle.onmousedown = fnDown;
}

function fnDown(){
    var oDrag = document.getElementById('loginPanel');
    document.onmousemove = function (event) {
        event = event || window.event;
        document.title = event.clientX + ',' + event.clientY;
        oDrag.style.left = event.clientX + 'px';
        oDrag.style.top = event.clientY + 'px';
    }
}