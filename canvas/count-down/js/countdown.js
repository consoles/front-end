/**
 * Created by gaopengfei on 2016/1/29.
 */

var WINDOW_WIDTH = 1024,
    WINDOW_HEIGHT = 768;

var RADIUS = 8;

var MARGIN_TOP = 60,
    MARGIN_LEFT = 30;

var endTime = new Date();
endTime.setTime(endTime.getTime() + 3600 * 1000);

var currentShowTimeSeconds = 0;

var balls = [];
const MAX_BALL_COUNT = 300;
const colors = ['#33b5e5', '#0099cc', '#99cc00', '#669900', '#ffbb33', 'ff8800', '#ff4444', '#cc00cc'];

window.onload = function () {

    // 自适应
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1; // 画布的4/5是真正的效果，除以108是一共有108份
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    currentShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function () {
        render(context);
        update();
    }, 50);

};

function getCurrentShowTimeSeconds() {
    var currentTime = new Date();
    var ret = endTime.getTime() - currentTime.getTime();
    ret = Math.round(ret / 1000); // millisecond -> second

    /**
     * @ADD:修改为走动的时钟只需要返回距离当天00:00的秒数即可
     */
    //ret = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
    return ret > 0 ? ret : 0;
}

function update() {

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600),
        nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60),
        nextSeconds = nextShowTimeSeconds % 60;

    var currentHours = parseInt(currentShowTimeSeconds / 3600),
        currentMinutes = parseInt((currentShowTimeSeconds - currentHours * 3600) / 60),
        currentSeconds = currentShowTimeSeconds % 60;

    // time change
    if (nextSeconds !== currentSeconds) {

        if (parseInt(currentHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(currentHours / 10));
        }
        if (parseInt(currentHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(currentHours % 10));
        }

        if (parseInt(currentMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(currentMinutes / 10));
        }
        if (parseInt(currentMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * ((RADIUS + 1)), MARGIN_TOP, parseInt(currentMinutes % 10));
        }

        if (parseInt(currentSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(currentSeconds / 10));
        }
        if (parseInt(currentSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(currentSeconds % 10));
        }
        currentShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
    //console.log('count of balls:',balls.length);
}

function updateBalls() {

    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        // 垂直方向碰撞检测
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

    var cnt = 0; // COUNT OF BALL THAT ALIVE
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }
    // remove a ball if itself not in a canvas
    while (balls.length > Math.min(cnt, MAX_BALL_COUNT)) {
        balls.pop();
    }
}

function addBalls(x, y, numIndex) {

    for (var i = 0; i < digit[numIndex].length; i++) {
        for (var j = 0; j < digit[numIndex][i].length; j++) {
            if (digit[numIndex][i][j] === 1) {
                //console.info('add ball');
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, // -4,4
                    vy: -5 - Math.random() * 5,
                    color: 'hsl(' + Math.floor(Math.random() * 360) + ',100%,60%)'
                };
                //console.log(aBall.color);
                balls.push(aBall);
            }
        }
    }
}

function render(ctx) {

    // repaint
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    var hours = parseInt(currentShowTimeSeconds / 3600),
        minutes = parseInt((currentShowTimeSeconds - hours * 3600) / 60),
        seconds = currentShowTimeSeconds % 60;

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDigit(MARGIN_LEFT + (2 * 7 + 1) * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);

    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}

function renderDigit(x, y, numIndex, ctx) {

    ctx.fillStyle = 'rgba(235,235,12,0.8)';
    for (var i = 0; i < digit[numIndex].length; i++) {
        for (var j = 0; j < digit[numIndex][i].length; j++) {
            if (digit[numIndex][i][j] == 1) {
                ctx.beginPath();
                // 圆心坐标，参见readme图二
                var cx = x + j * 2 * (RADIUS + 1) + (RADIUS + 1);
                var cy = y + i * 2 * (RADIUS + 1) + (RADIUS + 1);
                ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2);
                ctx.closePath();

                ctx.fill();
            }
        }
    }
}