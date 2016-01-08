/**
 * Created by consoles on 16-1-7.
 */
'use strict';
let dustObj = function(){

    this.x = [];
    this.y = [];
    this.amp = [];
    this.NO = [];

    this.alpha;
};

dustObj.prototype.num = 30;
dustObj.prototype.init = function(){

    for(let i = 0;i < this.num;i++){
        this.x[i] = Math.random() * canvasWidth;
        this.y[i] = Math.random() * canvasHeight;
        this.amp[i] = 20 + Math.random() * 25;
        this.NO[i] = Math.floor(Math.random() * 7);
    }
    this.alpha = 0;
};
dustObj.prototype.draw = function(){
    if (data.gameOver) return;
    this.alpha += deltaTime * .0008;
    let l = Math.sin(this.alpha);
    for(let i = 0;i < this.num;i++){
        let no = this.NO[i];
        ctx1.drawImage(dustPic[no],this.x[i] + this.amp[i] * l,this.y[i]);
    }
};