/**
 * Created by gaopengfei on 2016/5/4.
 */

function g(id) {
    return document.getElementById(id);
}

/**
 * 登录浮层自动居中
 */
function autoCenter(el) {

    var bodyW = document.documentElement.clientWidth,
        bodyH = document.documentElement.clientHeight;

    var elW = el.offsetWidth,
        elH = el.offsetHeight;

    el.style.left = (bodyW - elW) / 2 + 'px';
    el.style.top = (bodyH - elH) / 2 + 'px';
}

/**
 * 遮罩自动全屏,设置为可视区的宽高
 */
function fillToBody(el) {
    el.style.width = document.documentElement.clientWidth + 'px';
    el.style.height = document.documentElement.clientHeight + 'px';
}

function showDialog() {
    g('dialog').style.display = 'block';
    g('mask').style.display = 'block';
    autoCenter(g('dialog'));
    fillToBody(g('mask'));
}

function hideDialog() {
    g('dialog').style.display = 'none';
    g('mask').style.display = 'none';
}

var mouseOffsetX = 0,
    mouseOffsetY = 0;

var isDraging = false;
// 鼠标事件1：在标题栏上按下（计算鼠标相对拖拽元素左上角的坐标，并且标记元素为可拖动）
g('dialogTitle').addEventListener('mousedown', function (e) {
    var e = e || window.event;
    mouseOffsetX = e.pageX - g('dialog').offsetLeft;
    mouseOffsetY = e.pageY - g('dialog').offsetTop;
    console.info(mouseOffsetX, mouseOffsetY);
    isDraging = true;
});

document.addEventListener('mousemove', function (e) {
    var e = e || window.event;

    // 鼠标位置
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    // 浮层元素新位置
    var moveX = 0;
    var moveY = 0;

    if (isDraging) {
        moveX = mouseX - mouseOffsetX;
        moveY = mouseY - mouseOffsetY;

        // 碰撞检测
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        var dialogWidth = g('dialog').offsetWidth;
        var dialogHeight = g('dialog').offsetHeight;
        var maxX = pageWidth - dialogWidth;
        var maxY = pageHeight - dialogHeight;

        moveX = Math.min(maxX, Math.max(0, moveX));
        moveY = Math.min(maxY, Math.max(0, moveY));
        g('dialog').style.left = moveX + 'px';
        g('dialog').style.top = moveY + 'px';
    }
});

// 鼠标事件3：鼠标松开的时候标记元素为不可拖动
document.addEventListener('mouseup', function () {
    isDraging = false;
});

window.addEventListener('resize', function () {
    autoCenter(g('dialog'));
    fillToBody(g('mask'));
});

g('mask').addEventListener('click', function () {
    hideDialog();
});