/**
 * Created by consoles on 15-12-29.
 */

'use strict';
let can1,can2;
let ctx1,ctx2;
let canvasWidth,canvasHeight;

let lastTime,deltaTime; // to calculate the during between the two frames

let bgPic = new Image();

let ane,fruit,mom,baby;

let mx,my; // the mouse position

let babyTail = [],
    babyEye = [],
    babyBody = [];

let momTail = [],
    momEye = [],
    momBodyOrange = [],
    momBodyBlue = [];

let data;

let wave; // the white circle

let halo;

let dust; // 漂浮物
let dustPic = [];

let gameLoopFrame;

document.body.onload = game;

function game(){
    init();
    gameLoop();
}

function init(){
    loadResource();
    initGameLogic();
}

function loadResource(){
    // get the canvas context
    can1 = document.getElementById('canvas1'); // fish,ui,dust,circle,score
    can2 = document.getElementById('canvas2'); // background,fruits

    ctx1 = can1.getContext('2d');
    ctx2 = can2.getContext('2d');

    ctx1.font = '20px Courier';
    ctx1.textAlign = 'center';

    bgPic.src = 'images/background.jpg';

    canvasWidth = can1.width;
    canvasHeight = can1.height;

    mx = canvasWidth * .5;
    my = canvasHeight * .5;

    /**
     * addEventListener的第三个参数默认为false,子DOM的事件不会被捕获
     */
    can1.addEventListener('mousemove',onMouseMove,false);
    document.getElementById('allcanvas').onclick = function(){
        restart();
    };

    for (let i = 0;i < 2;i++){
        babyEye[i] = new Image();
        babyEye[i].src = 'images/babyEye' + i + '.png';

        momEye[i] = new Image();
        momEye[i].src = 'images/bigEye' + i + '.png';
    }
    for (let i = 0;i < 20;i++){
        babyBody[i] = new Image();
        babyBody[i].src = 'images/babyFade' + i + '.png';
    }
    for(let i = 0;i < 8; i++){
        babyTail[i] = new Image();
        babyTail[i].src = 'images/babyTail' + i + '.png';

        momTail[i] = new Image();
        momTail[i].src = 'images/bigTail' + i + '.png';

        momBodyOrange[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOrange[i].src = 'images/bigSwim' + i + '.png';
        momBodyBlue[i].src = 'images/bigSwimBlue' + i + '.png';
    }
    for(let i = 0;i < 7;i++){
        dustPic[i] = new Image();
        dustPic[i].src = 'images/dust' + i + '.png';
    }

    ane = new aneObj();
    mom = new momObj();
    fruit = new fruitObj();
    baby = new babyObj();
    halo = new haloObj();
    wave = new waveObj();
    dust = new dustObj();
    data = new dataObj();

    ane.init();
    fruit.init();
    halo.init();
    wave.init();
    dust.init();
}

function initGameLogic(){
    deltaTime = 0;
    lastTime = 0;

    mom.init();
    baby.init();
    data.init();
}

function gameLoop(){
    console.log(data.gameOver);
    // the during form the frame to a from is unsure
    gameLoopFrame = requestAnimationFrame(gameLoop); // better than setTimeout and setInterval to flush
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    if(deltaTime > 30) deltaTime = 30; // chrome中当前窗口不是处于焦点的时候会出现诡异的现象

    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();

    ctx1.clearRect(0,0,canvasWidth,canvasHeight);
    mom.draw();
    baby.draw();

    momFruitsCollision();
    momBabyCollision();

    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMouseMove(e){
    if (data.gameOver) return;
    if(e.offsetX || e.layerX){
        mx = e.offsetX || e.layerX;
        my = e.offsetY || e.layerY;
    }
}

function restart(){
    if (data.gameOver){
        window.cancelAnimationFrame(gameLoopFrame);
        initGameLogic();
        gameLoop();
    }
}