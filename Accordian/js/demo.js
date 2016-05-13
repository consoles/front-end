/**
 * Created by gaopengfei on 2016/5/13.
 */

function bind(el, eventType, callback) {
    if (typeof  el.addEventListener === 'function') {
        el.addEventListener(eventType, callback, false);
    } else if (typeof  el.attachEvent === 'function') {
        el.attachEvent('on' + eventType, callback);
    }
}

function mouseoverHandler(e) {
    var target = e.target || e.srcElement;
    var list = document.querySelectorAll('#subject li');

    for (var i = 0; i < list.length; i++) {
        // 删除class为big的元素不会影响其他样式,可用classList.remove API代替
        list[i].className = list[i].className.replace('big', '');
    }

    // 事件冒泡，找到li.big
    while (target.tagName !== 'LI' && target.tagName !== 'BODY') {
        target = target.parentNode;
    }
    target.className = 'big';
}

function initList() {
    var list = document.querySelectorAll('#subject li');
    for (var i = 0; i < list.length; i++) {
        bind(list[i], 'mouseover', mouseoverHandler);
    }
}
initList();