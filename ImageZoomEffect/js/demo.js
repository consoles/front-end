/**
 * Created by gaopengfei on 2016/5/3.
 */

var img = document.querySelector('img');

var timer;

// getComputedStyle返回的CSS属性带单位的
const REAL_IMAGE_WIDTH = img.offsetWidth;
const MAX_WIDTH = REAL_IMAGE_WIDTH * 2,
    MIN_WIDTH = REAL_IMAGE_WIDTH * .5;

const INTERVAL = 20; // 控制缩放的速度

var zoomIn = function () {
    var endWidth = img.offsetWidth * .7;
    if (img.offsetWidth < MIN_WIDTH) {
        return alert('图片缩小到最小值');
    }
    clearInterval(timer);
    timer = setInterval(function () {
        if (img.width > endWidth) {
            img.style.width = img.offsetWidth * .95 + 'px';
        } else {
            clearInterval(timer);
        }
    }, INTERVAL);
};

var zoomOut = function () {
    var endWidth = img.offsetWidth * 1.3;
    if (img.width > MAX_WIDTH) {
        return alert('图片放大到最大值');
    }
    clearInterval(timer);
    timer = setInterval(function () {

        if (img.offsetWidth < endWidth) {
            img.style.width = img.offsetWidth * 1.05 + 'px';
        } else {
            clearInterval(timer);
        }
    }, INTERVAL);
};

document.querySelector('#zoomInBtn').addEventListener('click', function () {
    zoomIn();
});
document.querySelector('#zoomOutBtn').addEventListener('click', function () {
    zoomOut();
});