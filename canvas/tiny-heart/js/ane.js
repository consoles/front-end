/**
 * Created by consoles on 15-12-31.
 *
 * 海葵
 */

'use strict';
let aneObj = function(){
    // 二次贝塞尔曲线,http://www.cnblogs.com/hnfxs/p/3148483.html
    // start point,end point,control point(sin)
    this.x = [];
    this.rootx = []; // start
    this.headx = []; // end
    this.heady = [];
    this.amp = []; // sin函数的振幅
    this.alpha = 0;
};

aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
    for(let i = 0;i < this.num;i++){
        this.rootx[i] = i * 16 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
        this.heady[i] = canvasHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
};
aneObj.prototype.draw = function(){
    this.alpha += deltaTime * .0008;
    let l = Math.sin(this.alpha);
    // the style out of the `save()` and the `restore()` will reset
    ctx2.save();
    ctx2.globalAlpha = .6;
    ctx2.strokeStyle = '#3b154e';
    ctx2.lineWidth = 10;
    ctx2.lineCap = 'round';
    for(var i = 0;i < this.num;i++){
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canvasHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        // 绘制二次贝塞尔曲线
        ctx2.quadraticCurveTo(this.rootx[i],canvasHeight - 100,this.headx[i],this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
};