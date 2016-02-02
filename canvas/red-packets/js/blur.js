var canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight;

var canvas = document.getElementById('canvas');
var cxt = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image();
image.src = 'image.jpg';

var clippingRegion = {x: -1, y: -1, r: -1}; // 剪辑区域

var leftMargin = 0,
    topMargin = 0;

var theAnimation = null;

image.onload = function () {

    var $blur_div = $('#blur_div');
    var $blur_image = $('#blur_image');

    $blur_div.css('width', canvasWidth);
    $blur_div.css('height', canvasHeight);
    $blur_image.css('width', image.width);
    $blur_image.css('height', image.height);

    leftMargin = (image.width - canvas.width) / 2;
    topMargin = (image.height - canvas.height) / 2;


    $blur_image.css('top', -topMargin);
    $blur_image.css('left', -leftMargin);

    initCanvas();
};

function initCanvas() {
    var theLeft = leftMargin < 0 ? -leftMargin : 0;
    var theTop = topMargin < 0 ? -topMargin : 0;
    console.log(theLeft, theTop);
    var radius = 30 + Math.ceil(Math.random() * 30);
    clippingRegion = {
        x: Math.random() * (canvasWidth - 2 * radius - 2 * theLeft) + theLeft + radius,
        y: Math.random() * (canvasHeight - 2 * radius - 2 * theTop) + theTop + radius,
        r: radius
    };
    console.info(clippingRegion);
    draw(image, clippingRegion);
}

function setClippingRegion(clippingRegion) {
    cxt.beginPath();
    cxt.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false);
    cxt.clip();
}

function draw(image, clippingRegion) {
    cxt.clearRect(0, 0, canvas.width, canvas.height);

    cxt.save();
    setClippingRegion(clippingRegion);

    var sx = Math.max(leftMargin, 0);
    var sy = Math.max(topMargin, 0);
    var sWidth = Math.min(canvas.width, image.width);
    var sHeight = Math.min(canvas.height, image.height);
    var dx = leftMargin < 0 ? -leftMargin : 0;
    var dy = topMargin < 0 ? -topMargin : 0;
    var dWidth = Math.min(canvas.width, image.width);
    var dHeight = Math.min(canvas.height, image.height);
    cxt.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    cxt.restore();
}

function show() {
    // animation
    if (!theAnimation) {
        theAnimation = setInterval(function () {
            // 显示清晰的完整图像只需要让剪辑区域足够大即可(剪辑区域半径可用勾股定理)
            clippingRegion.r += 20;
            if (clippingRegion.r > 2 * Math.max(canvasWidth, canvasHeight)) {
                // stop animation
                clearInterval(theAnimation);
            }
            draw(image, clippingRegion);
        }, 50);
    }
}

function reset() {
    if (theAnimation) {
        clearInterval(theAnimation);
        theAnimation = null;
    }
    initCanvas();
}

// 禁止滑动
canvas.addEventListener('touchstart', function (e) {
    e.preventDefault();
});