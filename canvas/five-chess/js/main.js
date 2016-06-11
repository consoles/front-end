'use strict';

/**
 * Created by gaopengfei on 2016/5/1.
 *
 * AI难点解析
 *
 * - 赢法数组：记录五子棋所有的赢法，三维数组（棋盘上有五个点连成一条线）
 * - 每一种赢法的统计数组：一维数组
 * - 胜负的判断
 * - 计算落子规则
 */

var chess = document.getElementById('chess'),
    context = chess.getContext('2d');

const CANVAS_WIDTH = context.canvas.width;
const CANVAS_HEIGHT = context.canvas.height;

const PIX_PER_CELL = 30; // 每个单元格变长为30px

const COUNT_OF_COLUMN = 15;
const COUNT_OF_ROW = 15;

let gameover = false;
let me = true; // 我方执黑先行

let wins = []; // 赢法数组
let count = 0; // 赢法总数
// 初始化赢法数组(记录五子棋所有的赢法)
let initWins = function () {
    for (let i = 0; i < COUNT_OF_ROW; i++) {
        wins[i] = [];
        for (let j = 0; j < COUNT_OF_COLUMN; j++) {
            wins[i][j] = [];
        }
    }
    // 横向所有赢法
    for (let i = 0; i < COUNT_OF_COLUMN; i++) { // all rows
        for (let j = 0; j < 11; j++) { // 当无子连珠的时候首个棋子所在列位置
            for (let k = 0; k < 5; k++) { // k用来控制是五个子连接到一块
                wins[i][j + k][count] = true;
            }
            count++; // 5子连珠，则该种赢法加1
        }
    }
    // 竖向所有赢法
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 11; j++) {
            for (let k = 0; k < 5; k++) {
                wins[j + k][i][count] = true;
            }
            count++;
        }
    }
    // 对角线所有赢法
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            for (let k = 0; k < 5; k++) {
                wins[i + k][j + k][count] = true;
            }
            count++;
        }
    }
    // 反对角线所有赢法
    for (let i = 0; i < 11; i++) {
        for (let j = 14; j > 3; j--) {
            for (let k = 0; k < 5; k++) {
                wins[i + k][j - k][count] = true;
            }
            count++;
        }
    }
    console.log('赢法数组初始化完成，五子棋所有赢法：', wins, '共计:', count);
};

let myWin = []; // 我方赢法数组
let computerWin = []; // 计算机赢法数组
// 二维数组存储棋盘落子情况，初始化状态是没有落子
// 一共有三种状态：0，没有落子；1，落黑子；2，落白子
let chessBoard = [];
let resetScore = () => {
    for (let i = 0; i < count; i++) {
        myWin[i] = 0; // 赢的第i种方法，对应的落子的个数
        computerWin[i] = 0; // 电脑赢的第i种方法，对应的落子的个数
    }
    // 二维数组存储棋盘落子情况，初始化状态是没有落子
    // 一共有三种状态：0，没有落子；1，落黑子；2，落白子
    let chessBoard = [];
    for (let i = 0; i < COUNT_OF_ROW; i++) {
        chessBoard[i] = [];
        for (let j = 0; j < COUNT_OF_COLUMN; j++) {
            chessBoard[i][j] = 0;
        }
    }
};

/**
 * 绘制背景和棋盘格
 */
let darwImageAndChessboard = function () {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    var _drawLogo = function () {
        var logo = new Image();
        logo.src = 'images/logo.png';
        logo.onload = function () {
            //context.drawImage(logo, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            _drawChessBoard();// should be placed here(inside the callback function)
        };
    };
    _drawLogo();
    // 450*450px的canvas上绘制14*14的格子，每个格子是30*30px，所以需要绘制15条线
    var _drawChessBoard = function () {
        context.beginPath();
        for (let i = 0; i < COUNT_OF_ROW; i++) {
            // 横线
            context.moveTo(15, 15 + i * PIX_PER_CELL);
            context.lineTo(435, 15 + i * PIX_PER_CELL);
            // 竖线
            context.moveTo(15 + i * PIX_PER_CELL, 15);
            context.lineTo(15 + i * PIX_PER_CELL, 435);
        }
        context.closePath();
        context.lineWidth = 2;
        // canvas是基于状态的绘制，点满状态最后执行一次绘制即可
        context.strokeStyle = '#bfbfbf';
        context.stroke();
    };
};

/**
 * 人工走完一步棋。在指定的位置绘制棋子
 * @param i
 * @param j
 * @param me 本方执黑先行，tue-黑，false-白
 */
let oneStep = function (i, j, me) {
    context.beginPath();
    context.arc(15 + i * PIX_PER_CELL, 15 + j * PIX_PER_CELL, 13, 0, Math.PI * 2);
    context.closePath();
    // 创建径向渐变需要传递2个圆（确定内径和外径）的坐标和半径,ref:
    // https://github.com/consoles/front-end/blob/master/canvas/radialGradient.html
    var gradient = context.createRadialGradient(15 + i * PIX_PER_CELL + 2, 15 + j * PIX_PER_CELL - 2, 13, 15 + i * PIX_PER_CELL + 2, 15 + j * PIX_PER_CELL - 2, 2);
    if (me) {
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#636766');
    } else {
        gradient.addColorStop(0, '#d1d1d1');
        gradient.addColorStop(1, '#f9f9f9');
    }
    context.fillStyle = gradient;
    context.fill();
};

let win = me => {
    alert(`${me ? '你' : '电脑'}赢了`);
    gameover = true;
};

/**
 * 电脑AI算法，实现：
 * 对每个落子点进行记分，人分越高越需要堵，电脑的分越高，越需要五子连珠
 */
let computerAI = function () {
    // 人和电脑在每个坐标上的分数
    let myScore = [],
        computerScore = [];

    let max = 0, u = 0, v = 0; // 最高分及其坐标

    // 初始化人和电脑的分数二维数组为全0
    for (let i = 0; i < COUNT_OF_ROW; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (let j = 0; j < COUNT_OF_COLUMN; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }

    for (let i = 0; i < COUNT_OF_ROW; i++) {
        for (let j = 0; j < COUNT_OF_COLUMN; j++) {
            if (chessBoard[i][j] === 0) {
                for (let k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (myWin[k] === 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] === 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] === 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] === 4) {
                            myScore[i][j] += 10000;
                        }

                        if (computerWin[k] === 1) {
                            computerScore[i][j] += 300;
                        } else if (computerWin[k] === 2) {
                            computerScore[i][j] += 500;
                        } else if (computerWin[k] === 3) {
                            computerScore[i][j] += 2100;
                        } else if (computerWin[k] === 4) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore === max) {
                    if (computerScore[i][j] > computerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                if (computerScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (computerScore === max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u, v, false);
    chessBoard[u][v] = 2;
    for (let k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            // 计算机在此种赢法上更近了一步，我方就不可能在此种赢法上赢了
            computerWin[k]++;
            myWin[k] = -1;
            // 如果存在一个k使得myWin[k] = 5,说明第k种赢法已经实现
            if (computerWin[k] === 5) {
                win(me);
            }
        }
    }
    if (!gameover) {
        me = !me;
    }
};

let paintCheeseBoard = () => {
    darwImageAndChessboard();
};

let initResource = () => {
    initWins();
};

let initScore = () => {

    gameover = false;
    me = true;

    for (let i = 0; i < count; i++) {
        myWin[i] = 0; // 赢的第i种方法，对应的落子的个数
        computerWin[i] = 0; // 电脑赢的第i种方法，对应的落子的个数
    }

    for (let i = 0; i < COUNT_OF_ROW; i++) {
        chessBoard[i] = [];
        for (let j = 0; j < COUNT_OF_COLUMN; j++) {
            chessBoard[i][j] = 0;
        }
    }
};

let addEventHandler = () => {
    // 人-点击棋盘后进行落子
    chess.addEventListener('click', function (e) {

        // 此函数仅在我方下棋的时候有效（小小的性能提升）
        if (gameover || !me) return;

        // 鼠标在canvas上的位置（因为我们是给canvas添加的事件）
        var x = e.offsetX,
            y = e.offsetY;

        // 棋子应该落在哪一个格子？
        var i = Math.floor(x / PIX_PER_CELL),
            j = Math.floor(y / PIX_PER_CELL);

        // 如果棋盘上的这个位置没有落子，则落子
        if (chessBoard[i][j] === 0) {
            oneStep(i, j, me); // 落子
            chessBoard[i][j] = 1; // 对应位置标记为落黑子

            // AI
            for (let k = 0; k < count; k++) {
                if (wins[i][j][k]) {
                    myWin[k]++;
                    computerWin[k] = -1;
                    // 如果存在一个k使得myWin[k] = 5,说明第k种赢法已经实现
                    if (myWin[k] === 5) {
                        win(me);
                    }
                }
            }
            if (!gameover) {
                me = !me;
                computerAI();
            }
        } else {
            console.warn(i, j, '该位置已有落子！', chessBoard[i][j]);
        }
    });

    document.querySelector('button').addEventListener('click', function () {
        restart();
    });
};

let init = () => {
    initResource();
    paintCheeseBoard();
    initScore();
    addEventHandler();
};

init();

let restart = () => {
    paintCheeseBoard();
    initScore();
};