/**
 * Created by gaopengfei on 2016/1/28.
 * canvas API:
 * 全局透明度：globalAlpha，ref：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalAlpha
 * drawImage：ref:https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
 */

var starObj = function () {
    this.x;
    this.y;

    this.picNo;
    this.timer;

    this.xSpeed;
    this.ySpeed;

    this.beta;
};


starObj.prototype.init = function () {

    // 随机星星在女孩图像中的位置
    this.x = Math.random() * GIRL_WIDTH + PADDING_LEFT;
    this.y = Math.random() * GIRL_HEIGHT + PADDING_TOP;

    this.picNo = Math.floor(Math.random() * STAR_FRAME_COUNT);
    this.timer = 0;

    this.xSpeed = Math.random() * 8 - 4;
    this.ySpeed = Math.random() * 6 - 3;

    this.beta = Math.PI * 0.5 * Math.random(); // [0,π/2)
};

starObj.prototype.draw = function () {

    this.beta += deltaTime * 0.005;
    ctx.save();
    // globalAlpha
    ctx.globalAlpha = Math.sin(this.beta) * life;
    //console.log('alpha',ctx.globalAlpha);
    ctx.drawImage(starPic, this.picNo * SIZE_OF_PER_FRAME, 0, SIZE_OF_PER_FRAME, SIZE_OF_PER_FRAME, this.x, this.y, SIZE_OF_PER_FRAME, SIZE_OF_PER_FRAME);
    ctx.restore();
};

starObj.prototype.update = function () {

    this.x += this.xSpeed * deltaTime * 0.004;
    this.y += this.ySpeed * deltaTime * 0.004;

    // 星星的位置超过了某个范围重生（init）
    if (this.x < X1 || this.x > X2 || this.y < Y1 || this.y > Y2) {
        this.init();
        return;
    }

    this.timer += deltaTime; // 和帧率进行同步
    if (this.timer > 30) {
        this.picNo++;
        this.picNo %= 7;
        this.timer = 0;
    }
};

function drawStars() {
    for (var i = 0; i < START_COUNT; i++) {
        stars[i].update();
        stars[i].draw();
    }
}

function aliveUpdate() {
    if (switchy) {
        // show stars
        life += 0.03 * deltaTime * 0.03;
        if (life > 1) {
            life = 1;
        }
    } else {
        // hide stars
        life -= 0.03 * deltaTime * 0.03;
        if (life < 0) {
            life = 0;
        }
    }
}