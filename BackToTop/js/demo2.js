/**
 * Created by gaopengfei on 2016/3/13.
 */

window.onload = function () {
    var oBtn = document.getElementById('btn');
    var clientHeight = document.documentElement.clientHeight;
    var timer = null;
    var isTop = true;

    window.onscroll = function () {
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (osTop >= clientHeight) {
            oBtn.style.display = 'block';
        } else {
            oBtn.style.display = 'none';
        }
        if (!isTop) {
            clearInterval(timer);
        }
        isTop = false;
    };

    oBtn.onclick = function () {
        timer = setInterval(function () {
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            var iSpeed = Math.floor(-osTop / 5);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + iSpeed;
            isTop = true;
            if (osTop === 0) {
                clearInterval(timer);
            }
        }, 30);

    }
};