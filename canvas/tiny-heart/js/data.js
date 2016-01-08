/**
 * Created by consoles on 16-1-7.
 */

'use strict';
let dataObj = function() {

    this.fruitNum;
    this.double;
    this.score;
    this.gameOver;
    this.alpha;
};

dataObj.prototype.init = function() {
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;
};

dataObj.prototype.draw = function() {
    let w = can1.width,
        h = can1.height;

    ctx1.save();
    ctx1.fillStyle = 'yellow';
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'white';
    ctx1.fillText('SCORE:' + this.score, w * .5, 100);
    if (this.gameOver) {
        this.alpha += deltaTime * .0005;
        if (this.alpha > 1)
            this.alpha = 1;
        ctx1.fillStyle = 'rgba(255,255,255,' + this.alpha + ')';
        ctx1.fillText('GAME OVER', w * .5, h * .5 - 25);
        ctx1.fillText('Click to restart', w * .5, h * .5 + 25);
    }
    ctx1.restore();
};
dataObj.prototype.addScore = function() {
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
};