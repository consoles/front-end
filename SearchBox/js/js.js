/**
 * Created by gaopengfei on 2015/7/3.
 */

/**
 * 根据ID获取元素
 * @param id
 * @returns {HTMLElement}
 */
function getDOM(id) {

    return document.getElementById(id);
}

/**
 * 添加事件绑定(比起javascript原生的事件有一个优势：可以为一个元素绑定多个事件)
 * @param id
 * @param event
 * @param fn回调函数
 */
function addEvent(id, event, fn) {

    var element = getDOM(id) || document;
    if (element.addEventListener) {
        element.addEventListener(event, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, fn)
    }
}

/**
 * 取得元素到浏览器左部的距离
 * @param element
 * @returns {Number|number}
 */
function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current != null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }

    return actualLeft;
}

/**
 *  取得元素到浏览器顶部的距离
 * @param element
 * @returns {Number|number}
 */
function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current != null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return actualTop;
}

/**
 * 发送ajax的get请求
 * @param url
 * @param callback
 */
function ajaxGet(url, callback) {

    var _xhr = null;
    if (window.XMLHttpRequest) {
        _xhr = new window.XMLHttpRequest();
    } else if (window.ActiveXObject) {
        _xhr = new ActiveXObject('Msxml2.XMLHTTP');
    }

    _xhr.onreadystatechange = function () {
        if (_xhr.readyState == 4 && _xhr.status == 200) {
            callback(JSON.parse(_xhr.responseText));
        }
    }

    _xhr.open('get', url, true);
    _xhr.send(null);
}

/**
 * 事件代理（常用于动态生成的html元素）
 * @param target 目标元素
 * @param event 事件
 * @param fn
 */
function eventDelegate(target,event,fn){

    addEvent(document,event, function (e) {
        if(e.target.nodeName == target.toUpperCase()){
            fn.call(e.target);
        }
    });
}

window.onload = function () {

    addEvent('search-input', 'keyup', function () {

        var searchText = getDOM('search-input').value;
        ajaxGet('http://api.bing.com/qsonhs.aspx?q=' + searchText, function (data) {
            var data = data.AS.Results[0].Suggests;
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<li>' + data[i].Txt + '</li>';
            }

            var search_suggest = getDOM('search-suggest');  // cache
            search_suggest.innerHTML = html;
            search_suggest.style.top = getElementTop(getDOM('search-form')) + 38 + 'px';
            search_suggest.style.left = getElementLeft(getDOM('search-form')) + 'px';
            search_suggest.style.position = 'absolute';
            search_suggest.style.display = 'block';
            search_suggest.style.listStyle = 'none';
            search_suggest.style.cursor = 'pointer';
        });

        eventDelegate('li','click', function () {
           var keyword = this.innerHTML;
            location.href = 'http://cn.bing.com/search?q=' + keyword;
        });

    });

    addEvent(false,'click', function () {
        var search_suggest = getDOM('search-suggest');
        search_suggest.style.display = 'none';
    })
}