/**
 * Created by gaopengfei on 2016/2/1.
 */

var canvasWidth = Math.min(800, $(window).width() - 20);
var canvasHeight = canvasWidth;

var strokeColor = 'black';

var isMouseDown = false;

var lastLocation = {
    x: 0,
    y: 0
};
var lastTimeStamp = 0;
var lastLineWidth = -1;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

$('#controller').css('width', canvasWidth);
drawGrid();

function beginStroke(point) {
    isMouseDown = true;
    lastLocation = window2canvas(point.x, point.y);
    lastTimeStamp = Date.now();
}

function endStroke() {
    isMouseDown = false;
}

function moveStroke(point) {
    var currentLocation = window2canvas(point.x, point.y);
    var currentTimeStamp = Date.now();

    var s = distance(currentLocation, lastLocation);
    var t = currentTimeStamp - lastTimeStamp;

    var lineWidth = calcLineWidth(s, t);

    // draw
    context.beginPath();
    context.moveTo(lastLocation.x, lastLocation.y);
    context.lineTo(currentLocation.x, currentLocation.y);

    context.strokeStyle = strokeColor;
    context.lineWidth = lineWidth;
    context.lineCap = 'round'; // 线条过粗的时候实现平滑过渡
    context.lineJoin = 'round';
    context.stroke();

    // Attention to update lcation and time
    lastLocation = currentLocation;
    lastTimeStamp = currentTimeStamp;
    lastLineWidth = lineWidth;
}

canvas.onmousedown = function (e) {
    e.preventDefault();
    beginStroke({x: e.clientX, y: e.clientY});
};
canvas.onmouseup = function (e) {
    e.preventDefault();
    endStroke();

};
canvas.onmouseout = function (e) {
    e.preventDefault();
    endStroke();
};
canvas.onmousemove = function (e) {
    e.preventDefault();
    if (isMouseDown) {
        moveStroke({x: e.clientX, y: e.clientY});
    }
};

var touch;
canvas.addEventListener('touchstart', function (e) {
    e.preventDefault();
    touch = e.touches[0];
    beginStroke({x: touch.pageX, y: touch.pageY});
});
canvas.addEventListener('touchmove', function (e) {
    e.preventDefault();
    if (isMouseDown) {
        touch = e.touches[0];
        moveStroke({x: touch.pageX, y: touch.pageY});
    }
});
canvas.addEventListener('touchend', function (e) {
    e.preventDefault();
    endStroke();
});

$('#clear_btn').click(function (e) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGrid();
});

$('.color-btn').click(function (e) {
    $('.color-btn').removeClass('color-btn-selected');
    $(this).addClass('color-btn-selected');
    strokeColor = $(this).css('background-color');
});

/**
 * 根据速度计算出线条的粗细
 * @param s
 * @param t
 */
function calcLineWidth(s, t) {

    var v = s / t;

    var resultLineWidth;
    if (v <= 0.1) {
        resultLineWidth = 30;
    } else if (v >= 10) {
        resultLineWidth = 1;
    } else {
        resultLineWidth = 30 - (v - 0.1) / (10 - 0.1) * (30 - 1);
    }

    if (lastLineWidth === -1) {
        return resultLineWidth;
    }

    // 为了实现笔画的平滑过渡：上一次的线条宽度占据66%，后一个占据33%
    return lastLineWidth * 2 / 3 + resultLineWidth / 3;
}

function window2canvas(x, y) {

    var bbox = canvas.getBoundingClientRect();
    return {
        x: Math.round(x - bbox.left),
        y: Math.round(y - bbox.top)
    };
}

function distance(loc1, loc2) {

    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y));
}

function drawGrid() {
    context.save();

    context.strokeStyle = 'rgb(230,11,9)';

    // 绘制最大的边框
    context.beginPath();
    context.moveTo(3, 3);
    context.lineTo(canvasWidth - 3, 3);
    context.lineTo(canvasWidth - 3, canvasHeight - 3);
    context.lineTo(3, canvasHeight - 3);
    context.closePath();

    context.lineWidth = 6;
    context.stroke();

    // 绘制米字格
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvasWidth, canvasHeight);

    context.moveTo(canvasWidth, 0);
    context.lineTo(0, canvasHeight);

    context.moveTo(canvasWidth / 2, 0);
    context.lineTo(canvasWidth / 2, canvasHeight);

    context.moveTo(0, canvasHeight / 2);
    context.lineTo(canvasWidth, canvasHeight / 2);

    context.lineWidth = 1;
    context.stroke();

    context.restore();
}