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

var gameover = false;

var wins = []; // 赢法数组
for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}

var myWin = []; // 我方赢法数组
var computerWin = []; // 计算机赢法数组

var count = 0; // 赢法总数
// 横向所有赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}
// 竖向所有赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}
// 对角线所有赢法
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
// 反对角线所有赢法
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}

console.log('五子棋所有赢法：', wins, '共计:', count);

for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}

var chessBoard = []; // 存储棋盘落子情况
for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0; // 初始化为0表示没有落子
    }
}

var me = true; // 哪一方落子，本方是黑棋

context.strokeStyle = '#bfbfbf';

// draw logo
var logo = new Image();
logo.src = 'images/logo.png';
logo.onload = function () {
    context.drawImage(logo, 0, 0, 450, 450); // should be placed here(inside the callback function)
    drawChessBoard();
};

var drawChessBoard = function () {
    for (var i = 0; i < 15; i++) {
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }
};

/**
 * 走完一步棋
 * @param i
 * @param j
 * @param me 黑子还是白子
 */
var oneStep = function (i, j, me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, Math.PI * 2);
    context.closePath();
    // 创建径向渐变需要传递2个圆（确定内径和外径）的坐标和半径,ref:
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
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

var computerAI = function () {
    var myScore = [],
        computerScore = [];

    var max = 0, u = 0, v = 0; // 最高分及其坐标

    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }

    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] === 0) {
                for (var k = 0; k < count; k++) {
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
                            computerScore[i][j] += 220;
                        } else if (computerWin[k] === 2) {
                            computerScore[i][j] += 420;
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
    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            // 计算机在此种赢法上更近了一步，我方就不可能在此种赢法上赢了
            computerWin[k]++;
            myWin[k] = -1;
            // 如果存在一个k使得myWin[k] = 5,说明第k种赢法已经实现
            if (computerWin[k] === 5) {
                alert('计算机赢了');
                gameover = true;
            }
        }
    }
    if (!gameover) {
        me = !me;
    }
};

// event
chess.addEventListener('click', function (e) {
    if (gameover) {
        return;
    }
    // 此函数仅在我方下棋的时候有效
    if (!me) {
        return;
    }
    var x = e.offsetX,
        y = e.offsetY;

    var i = Math.floor(x / 30),
        j = Math.floor(y / 30);

    // 不能重复落子的判断
    if (chessBoard[i][j] === 0) {
        oneStep(i, j, me);
        chessBoard[i][j] = 1;

        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                myWin[k]++;
                computerWin[k] = -1;
                // 如果存在一个k使得myWin[k] = 5,说明第k种赢法已经实现
                if (myWin[k] === 5) {
                    alert('你赢了');
                    gameover = true;
                }
            }
        }
        if (!gameover) {
            me = !me;
            computerAI();
        }
    }

});