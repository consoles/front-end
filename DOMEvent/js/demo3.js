/**
 * Created by gaopengfei on 2015/6/16.
 */
window.onload = function () {
    var box = document.getElementById('box'),
        go = document.getElementById('go');

    eventUtil.addHandler(box,'click',function(){
        alert('我是整个父盒子');
    });
    eventUtil.addHandler(go,'click',function(e){
        e = eventUtil.getEvent(e);
        alert('触发事件的元素：' + eventUtil.getElement(e).nodeName);
        eventUtil.preventDefault(e);
        eventUtil.stopPropagation(e);
    });
}
