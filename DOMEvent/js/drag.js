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

    // 拖拽
    oTitle.onmousedown = fnDown;
    // 关闭
    var oClose =document.getElementById('ui_boxyClose');
    oClose.onclick = function () {
        document.getElementById('loginPanel').style.display = 'none';
    }
    // 切换QQ状态
    var loginState = document.getElementById('loginState'),
        stateList = document.getElementById('loginStatePanel'),
        lis = stateList.getElementsByTagName('li'),
        stateText = document.getElementById('login2qq_state_txt'),
        loginStateShow = document.getElementById('loginStateShow');

    loginState.onclick = function (e) {
        stateList.style.display = 'block';
        e = e || window.event;
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    }

    // 鼠标滑过、离开和点击状态栏的时候
    for(var i = 0;i < lis.length;i++){
        lis[i].onmouseover = function () {
            this.style.background = '#567';
        }
        lis[i].onmouseout = function () {
            this.style.background = '#fff';
        }
        lis[i].onclick = function (e) {
            e = e || window.event;
            if(e.stopPropagation){
                e.stopPropagation();
            }else{
                e.cancelBubble = true;
            }
            var id  = this.id;
            stateList.style.display = 'none';
            stateText.innerHTML = getByClass('stateSelect_text',id)[0].innerHTML;
            loginStateShow.className = ''; // 先全部清空，再加上
            loginStateShow.className = 'login-state-show ' + id;
        }
    }

    // 在页面的空白位置点击收回列表框
    document.onclick = function () {
        stateList.style.display = 'none';
    }
}

function fnDown(event){
    event = event || window.event;
    var oDrag = document.getElementById('loginPanel'),
        // 光标按下时，光标和面板之间的距离
        disX = event.clientX - oDrag.offsetLeft,
        disY = event.clientY - oDrag.offsetTop;

    // 移动
    document.onmousemove = function (event) {
        event = event || window.event;
        fnMove(event,disX,disY);
    }
    // 释放鼠标
    document.onmouseup = function () {
        document.onmousemove = null;
    }
}

function fnMove(e,posX,posY){
    var oDrag = document.getElementById('loginPanel'),
        l = e.clientX - posX,
        t = e.clientY - posY,
        winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight,
        maxW = winW - oDrag.offsetWidth - 10,
        maxH = winH - oDrag.offsetHeight;

    // 不要让div越界
    if(l < 0) l = 0;
    else if(l > maxW) l = maxW;
    if(t < 0) t = 10;
    else if(t > maxH) t = maxH;

    console.log('(' + l + '，' + t + ')');
    oDrag.style.left = l + 'px';
    oDrag.style.top = t + 'px';
}