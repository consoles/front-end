/**
 * Created by gaopengfei on 2015/6/15.
 */
// 跨浏览器事件处理程序(封装成对象)
var eventUtil = {
    /**
     * 添加句柄
     * @param element 给谁添加元素
     * @param type 事件的类型（例如click）
     * @param handler 该事件触发了什么操作
     */
    addHandler: function (element, type, handler) {

        if (element.addEventListener) {                       // 支持DOM 2级？
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {                      // 支持IE？
            element.attachEvent('on' + type, handler)
        } else {
            // window.onload = function(){}和window['onclick'] = function(){}完全等价
            element['on' + type] = handler;                     // 切记这里不能用点（而所有的点都可以替代成中括号）
        }

    }
    ,
    /**
     * 删除句柄
     * @param element
     * @param type
     * @param handler
     */
    removeHandler: function (element, type, handler) {

        if (element.removeEventListener) {                        // 支持DOM 2级？
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {                          // 支持IE？
            element.detachEvent['on' + type, handler];
        } else {
            element['on' + type] = null;                        // DOM 0级
        }

    }
    ,
    /**
     * 获取事件
     * @param event
     */
    getEvent: function (event) {
        return event || window.event; // 或者使用3元运算符event?event:window.event;
    }
    ,
    /**
     * 获取事件的类型
     * @param event
     */
    getEventType: function (event) {
        return event.type;
    }
    ,
    /**
     * 获取触发该事件的元素
      * @param event
     */
    getElement: function (event) {
        return event.target || event.srcElement;
    }
    ,
    /**
     * 阻止事件的默认行为
     * @param event
     */
    preventDefault: function (event) {
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    /**
     * 阻止事件冒泡
     * @param event
     */
    stopPropagation: function (event) {
        if(event.stopPropagation){  // 注意：以属性的形式判断，不要加括号
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }
}