/**
 * Created by gaopengfei on 2016/5/3.
 */

var $ = function (id) {
    return document.getElementById(id);
};

var addEvent = function (obj, event, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(event, fn, false);
    } else {
        obj.attachEvent('on' + event, fn);
    }
};

var domSider = $('J_BdSide');
var scrollEvent = function () {
    var sideHeight = domSider.offsetHeight;
    var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollHeight + screenHeight > sideHeight) {
        domSider.style.cssText = 'position:fixed;right:0px;top:' + (-(sideHeight - screenHeight)) + 'px;';
    } else {
        domSider.style.position = 'static';
    }
};

addEvent(window, 'scroll', function () {
    scrollEvent();
});
addEvent(window, 'resize', function () {
    scrollEvent();
});