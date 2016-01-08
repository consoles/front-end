/**
 * Created by consoles on 15-12-31.
 */

'use strict';
let fruitObj = function(){
    this.alive = [];
    this.x = [];
    this.y = [];
    this.aneNO = [];
    this.l = [];
    this.speed = [];
    this.fruitType = [];
    this.orangePic = new Image();
    this.bluePic = new Image();
};

fruitObj.prototype.num = 50;
fruitObj.prototype.init = function(){
    for(let i = 0;i < this.num;i++){
        this.x[i] = 0;
        this.y[i] = 0;
        this.alive[i] = false;
        this.aneNO[i] = 0;
        this.speed[i] = Math.random()*.017 + .005;
        this.fruitType[i] = '';
        this.born(i);
    }
    this.orangePic.src = 'images/fruit.png';
    this.bluePic.src = 'images/blue.png';
};
fruitObj.prototype.draw = function(){

    for(let i = 0;i < this.num;i++){
        // draw
        // find an one,grow,fly up
        if(this.alive[i]){
            let pic = this.orangePic;
            if(this.fruitType[i] === 'blue')
                pic = this.bluePic;
            if(this.l[i] <= 15) {
                // grow
                let NO = this.aneNO[i];
                this.x[i] = ane.headx[NO];
                this.y[i] = ane.heady[NO];
                this.l[i] += this.speed[i] * deltaTime;
            } else {
                this.y[i] -= this.speed[i] * 7 * deltaTime;
            }
            ctx2.drawImage(pic,this.x[i] - this.l[i] *.5,this.y[i] - this.l[i] *.5,this.l[i],this.l[i]);
            if(this.y[i] < 10)
                this.dead(i);
        }
    }
};
fruitObj.prototype.update = function(){
    let num = 0;
    for(let i = 0;i < this.num;i++){
        if(this.alive[i]) num++;
    }
};
fruitObj.prototype.born = function(i){
    this.aneNO[i] =  Math.floor(Math.random() * ane.num);
    this.l[i] = 0;
    this.alive[i] = true;
    this.fruitType[i] = Math.random() < .3 ? 'blue':'orange';
};
fruitObj.prototype.dead = function(i){
    this.alive[i] = false;
};

function fruitMonitor(){
    var num = 0;
    for(let i = 0;i < fruit.num;i++)
        if(fruit.alive[i])
            num++;
    if(num < 30)
        return sendFruit();
}
function sendFruit(){
    for(let i = 0;i < fruit.num;i++){
        if(!fruit.alive[i]) return fruit.born(i);
    }
}