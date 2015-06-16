/**
 * Created by gaopengfei on 2015/6/16.
 */
window.onload = function () {
    var login_btn = document.getElementById('login'),
        login_box = document.getElementById('login_box'),
        close = document.getElementById('close');
    // 封装添加事件监听程序
    function addEvent(ele, type, hander) {
        // 执行代码
        if (ele.addEventListener) {                       // 支持DOM 2级？
            ele.addEventListener(type, hander, false);
        } else if (ele.attachEvent) {                      // 支持IE？
            ele.attachEvent(on + type, hander)
        } else {
            // window.onload = function(){}和window['onclick'] = function(){}完全等价
            ele['on' + type] = hander;                     // 切记这里不能用点（而所有的点都可以替代成中括号）
        }
    }

    // 显示登录层函数
    function showLogin() {
        // 执行代码
        login_box.style.display = 'block';
    }

    // 隐藏登录层函数
    function hideLogin() {
        // 执行代码
        login_box.style.display = 'none';
    }

    //点击登录按钮显示登录层
    addEvent(login_btn, 'click', showLogin);

    //点击关闭按钮隐藏登录层
    addEvent(close, 'click', hideLogin);

}