/**
 * Created by consoles on 15-12-31.
 *
 * 鱼妈妈
 */
'use strict';
var momObj = function() {
    this.x;
    this.y;
    this.angle;

    this.momTailTimer;
    this.momTailCount;

    this.momEyeTimer;
    this.momEyeCount;
    this.momEyeInterval;

    this.momBodyCount;
};

momObj.prototype.init = function() {
    this.x = canvasWidth * .5;
    this.y = canvasHeight * .5;
    this.angle = 0;
    this.momTailTimer = 0;
    this.momTailCount = 0;

    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;

    this.momBodyCount = 0;
};

momObj.prototype.draw = function() {

    // lerp x,y
    this.x = lerpDistance(mx, this.x, .98);
    this.y = lerpDistance(my, this.y, .98);

    // delta angle:Math.atan2(y,x);
    let detalY = my - this.y;
    let detalX = mx - this.x;
    let beta = Math.atan2(detalY, detalX) + Math.PI; // the difference between the angles

    // lerp angle
    this.angle = lerpAngle(beta, this.angle, .6);

    // tail
    this.momTailTimer += deltaTime;
    if (this.momTailTimer > 50) {
        this.momTailCount = (this.momTailCount + 1) % 8;
        this.momTailTimer %= 50;
    }
    // eye
    this.momEyeTimer += deltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momEyeTimer %= this.momEyeInterval;

        this.momEyeInterval = 200;
        if (this.momEyeCount === 0)
            this.momEyeInterval = Math.random() * 1500 + 2000;
    }

    let momTailCount = this.momTailCount,
        momEyeCount = this.momEyeCount,
        momBodyCount = this.momBodyCount;

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    if (data.double === 1)
        ctx1.drawImage(momBodyOrange[momBodyCount], -momBodyOrange[momBodyCount].width * .5, -momBodyOrange[momBodyCount].height * .5);
    else
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * .5, -momBodyBlue[momBodyCount].height * .5);
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * .5 + 30, -momTail[momTailCount].height * .5);
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * .5, -momEye[momEyeCount].height * .5);
    ctx1.restore();
};