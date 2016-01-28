/**
 * Created by gaopengfei on 2016/1/28.
 *
 * 在游戏循环中使用`requestAnimationFrame(function(){})`的原因在于此函数可以根据电脑的性能
 * 调整合理的时间间隔,也就是说：两帧之间的时间间隔是动态的。
 * 此函数需要根据特定的浏览器进行兼容。兼容函数参见：`js/commonFunction.js`
 */

var can, ctx;

var w, h;

var girlPic = new Image(),
    starPic = new Image();

var START_COUNT = 300;

var stars = [];

var lastTime; // 上一帧时间
var deltaTime;// 两帧之间的时间间隔

var switchy = false; // 鼠标是否在画布之内？

var life = 0;

var STAR_FRAME_COUNT = 7,
    SIZE_OF_PER_FRAME = 7;

var GIRL_WIDTH = 800,
    GIRL_HEIGHT = 400;

var PADDING_LEFT = 100,
    PADDING_TOP = 100;

var X1 = PADDING_LEFT,
    Y1 = PADDING_TOP,
    X2 = PADDING_LEFT + GIRL_WIDTH,
    Y2 = PADDING_TOP + GIRL_HEIGHT;

function init() {
    can = document.getElementById('canvas');
    ctx = can.getContext('2d');
    w = can.width;
    h = can.height;

    document.addEventListener('mousemove', mousemove, false);

    girlPic.src = 'images/girl.jpg';
    starPic.src = 'images/star.png';

    for (var i = 0; i < START_COUNT; i++) {
        var star = new starObj();
        star.init();
        stars.push(star);
    }

    lastTime = Date.now();
    gameloop();
}

document.body.onload = function () {
    init();
};

function gameloop() {

    requestAnimFrame(gameloop);

    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    //console.log('deltaTime',deltaTime);

    drawBackground();
    drawGirl();
    drawStars();
    aliveUpdate();

}

function drawBackground() {
    ctx.fillStyle = '#393550';
    ctx.fillRect(0, 0, w, h);
}

function drawGirl() {
    ctx.drawImage(girlPic, PADDING_LEFT, PADDING_TOP, GIRL_WIDTH, GIRL_HEIGHT);
}

function mousemove(e) {

    if (e.offsetX || e.layerX) {
        var px = e.offsetX || e.layerX;
        var py = e.offsetY || e.layerY;
        //console.log('鼠标坐标:',px,py);
    }
    switchy = !!(px > X1 && px < X2 && py > Y1 && py < Y2);
}