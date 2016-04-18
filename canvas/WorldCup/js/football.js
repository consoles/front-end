/**
 * Created by gaopengfei on 2016/4/16.
 */

var football = (function () {
    // 使用IIFE取得该函数的返回值
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                setTimeout(callback, 1000 / 60);
            }
    })();

    var canvas;
    var context;
    var image;
    var ball;
    var supportCanvas = !!document.createElement('canvas').getContext;
    // 可将此变量设置为false，观察浏览器对不支持canvas的优雅降级
    //supportCanvas = false;

    function Ball(ballImage, options) {
        this.width = options.width;
        this.height = options.height;
        this.containerWidth = options.containerWidth;
        this.containerHeight = options.containerHeight;
        this.x = options.left;
        this.y = options.top;
        this.image = ballImage;
        this.gravity = .3;
        this.vx = 4;
        this.vy = .8;
        this.vyAdjust = -15;
        this.factor = .75; // 反弹系数，即落碰撞后的速度改变百分比
        this.endAnimation = false;
        this.degree = 0;
        this.context = options.context;
        this.canvas = options.canvas;
        this.ball = ballImage.parentNode; // 支持canvas的时候此值为null
    }

    Ball.prototype.hit = function () {
        this.vy = this.vyAdjust;
        this.vx -= .5;
    };

    Ball.prototype.draw = function () {
        if (supportCanvas) {
            this.clearCanvas();
            this.context.save();
            this.rotate();
            this.context.drawImage(this.image, 0, 0, 100, 100, this.x, this.y, this.width, this.height);
            this.context.restore();
        } else {
            this.ball.style.left = this.x + 'px';
            this.ball.style.top = this.y + 'px';
        }
    };

    Ball.prototype.move = function () {
        this.y += this.vy;
        this.vy += this.gravity;

        if (this.vx > 0) {
            this.x += this.vx;
            this.degree += this.vx;
        }

        if ((this.y + this.height) > this.containerHeight) {
            this.vyAdjust = this.vyAdjust * this.factor;
            this.hit();
        }
        if (this.vx < .1) {
            this.endAnimation = true;
        }
    };

    Ball.prototype.rotate = function () {
        this.context.translate(this.x + this.width / 2, this.y + this.height / 2);
        this.context.rotate(this.degree / 180 * Math.PI);
        this.context.translate(-this.x - this.width / 2, -this.y - this.height / 2);
    };

    Ball.prototype.clearCanvas = function () {
        this.context && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    Ball.prototype.update = function () {
        this.move();
        this.draw();
    };

    function loop() {
        ball.update();
        if (!ball.endAnimation) {
            requestAnimFrame(loop);
        }
    }

    function loadBall() {
        ball = new Ball(image, {
            width: 100,
            height: 100,
            containerWidth: 1000,
            containerHeight: 500,
            left: 0,
            top: 0,
            context: context,
            canvas: canvas
        });
        loop();
    }

    function _initCanvas() {
        canvas = document.getElementById('football');
        context = canvas.getContext('2d');
        canvas.style.display = 'block';
    }

    function _initDOM() {
        var ballContainer = document.getElementById('ball');
        ballContainer.appendChild(image);
        ballContainer.style.display = 'block';
    }

    function init() {
        image = new Image();
        image.src = 'images/football.png';

        // 根据是否支持canvas初始化不同的DOM
        if (!supportCanvas) {
            _initDOM();
        } else {
            _initCanvas();
        }
        image.onload = loadBall;
    }

    var _football = {
        play: function () {
            init();
        }
    };

    return _football;
})();
