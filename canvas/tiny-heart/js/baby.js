/**
 * Created by consoles on 15-12-31.
 */
'use strict';

let babyObj = function() {
    this.x;
    this.y;
    this.angle;

    this.babyTailTimer;
    this.babyTailCount; // the current frame

    this.babyEyeTimer;
    this.babyEyeCount;
    this.babyEyeInterval; // 当前图片的持续时间

    this.babyBodyTimer;
    this.babyBodyCount;
};

babyObj.prototype.init = function() {
    this.x = canvasWidth * .5 - 50;
    this.y = canvasHeight * .5 + 50;
    this.angle = 0;
    this.babyTailTimer = 0;
    this.babyTailCount = 0; // the current frame
    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000; // 当前图片的持续时间
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
};

babyObj.prototype.draw = function() {

    // lerp x,y
    this.x = lerpDistance(mom.x, this.x, .98);
    this.y = lerpDistance(mom.y, this.y, .98);

    let detalY = mom.y - this.y;
    let detalX = mom.x - this.x;
    let beta = Math.atan2(detalY, detalX) + Math.PI; // the difference between the angles

    // lerp angle
    this.angle = lerpAngle(beta, this.angle, .6);

    // baby tail count
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }
    // baby eye count
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;

        this.babyEyeInterval = 200;
        if (this.babyEyeCount === 0)
            this.babyEyeInterval = Math.random() * 1500 + 2000; // 睁开眼睛的时间是随机值
    }
    // baby body count
    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 500) {
        this.babyBodyCount++;
        this.babyBodyTimer %= 500;
        if (this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            data.gameOver = true; // 小鱼身体变白的时候(最后一帧)认为游戏结束
        }
    }

    let babyTailCount = this.babyTailCount,
        babyBodyCount = this.babyBodyCount,
        babyEyeCount = this.babyEyeCount;
    ctx1.save();
    // translete() 转移原点，现在的原点是(this.x,this,y)
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * .5 + 23, -babyTail[babyTailCount].height * .5);
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * .5, -babyBody[babyBodyCount].height * .5);
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * .5, -babyEye[babyEyeCount].height * .5);
    ctx1.restore();
};