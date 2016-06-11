/**
 * Created by gaopengfei on 2016/6/10.
 *
 * 页面离开焦点，触发标题栏切换
 */
'use strict';

let originTitile = document.title;
let timer;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = "(つェ⊂)赶快回来玩游戏啦";
        clearTimeout(timer);
    } else {
        document.title = '(*´∇｀*)  欢迎回来继续游戏 ' + originTitile;
        timer = setTimeout(function () {
            document.title = originTitile;
        }, 3000);
    }
});