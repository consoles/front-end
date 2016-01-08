/**
 * Created by consoles on 16-1-7.
 */

'use strict';

let waveObj = function(){

    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
};

waveObj.prototype.num = 10;
waveObj.prototype.init = function(){
    for(let i = 0;i < this.num;i++){
        this.alive[i] = false;
        this.r[i] = 0;
    }
};
waveObj.prototype.born = function(x,y){
    for(let i = 0;i < this.num;i++){
        if (!this.alive[i]){
            // born
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            return;
        }
    }
};
waveObj.prototype.draw = function(){
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'white';
    for(let i = 0;i < this.num;i++){
        if (this.alive[i]){
            // draw
            this.r[i] += deltaTime * .05;
            if (this.r[i] > 50){
                this.alive[i] = false;
                continue;
            }
            this.alpha = 1 - this.r[i] / 50;
            ctx1.beginPath();
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI * 2);
            ctx1.strokeStyle = 'rgba(255,255,255,' + this.alpha + ')';
            ctx1.stroke();
            ctx1.closePath();
        }
    }
    ctx1.restore();
};