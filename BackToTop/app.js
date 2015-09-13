/**
 * Created by gaopengfei on 2015/9/13.
 */

window.onload = function () {

    var pageLookHeight = document.documentElement.clientHeight;

    var topBtn = document.getElementById('backTop');
    var timer = null;
    top.onclick = function () {
        var backTop = document.body.scrollTop;
        var speed = backTop / 5;
        timer = setInterval(function () {
            document.body.scrollTop -= speed;
        }, 30);

    };

    window.onscroll = function () {
        var backTop = document.body.scrollTop;
        console.info(backTop);
        if (backTop == 0) {
            clearInterval(timer);
            timer = null;
        }
        if (backTop >= pageLookHeight) {
            topBtn.style.display = 'block';
        } else {
            topBtn.style.display = 'none';
        }
    };
};