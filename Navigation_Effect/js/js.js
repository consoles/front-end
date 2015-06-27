/**
 * Created by gaopengfei on 2015/6/27.
 */

/**
 * 根据类名获取元素
 * @param obj
 * @param className
 * @returns {Array}
 */
function getByClassName(obj,className){
    var elements = obj.getElementsByTagName('*'); // 获取父元素下的所有DOM元素
    var result = [];
    for(var i = 0;i < elements.length;i++){
        if(elements[i].className == className){
            result.push(elements[i]);
        }
    }
    return result;
}

/**
 * 判断元素是否有class
 * @param obj
 * @param className
 */
function hasClass(obj,className){

    return obj.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

/**
 * 移除class
 * @param obj
 * @param className
 */
function removeClass(obj,className){

    if(hasClass(obj,className)){
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        obj.className = obj.className.replace(reg,'');
    }
}

/**
 * 添加class
 * @param obj
 * @param className
 */
function addClass(obj,className){

    if(!hasClass(obj,className)){
        obj.className += ' ' + className;
    }
}

window.onload = function () {
    window.onscroll = function () {
        var top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        var menus = document.getElementById('menu').getElementsByTagName('a');
        var items = getByClassName(document.getElementById('content'),'item');

        console.warn('滚动条偏离：' + top);
        var currentId = null;
        for(var i = 0;i < items.length;i++){
            var _item = items[i];
            var _itemTop = _item.offsetTop;
            console.debug('每一个item距离最上面'+ _itemTop);
            if(top > _itemTop - 300){
                currentId = _item.id;
                console.info(currentId);
            } else{
                break;
            }
        }

        if(currentId){
            // 给正确menu下的item赋值className
            for(var j = 0;j < menus.length;j++){
                var _menu = menus[j];
                var _href = _menu.href.split('#'); // href是这样的http://localhost:63342/Web/Navigation_Effect/demo1.html#item2

                if(_href[_href.length - 1] != currentId){
                    removeClass(_menu,'current');
                }else{
                    addClass(_menu,'current');
                }
            }
        }
    }
}