var timer = 0;
var speed = 2;
var score = 0;
var isGameOver = false;

var delta = 0; // requestAnimationFrame的句柄

const ROW_SIZE = 4;
const COL_SIZE = 4;

var scoreWrapper = document.querySelector('#score');
var container = document.querySelector('.container');

/**
 * .row下有4个.cell，其中有一个.cell同时具有.cell-black，也就是黑色方块
 * @returns {string[]}
 */
var createCells = function () {
    var temp = ['cell', 'cell', 'cell', 'cell'];
    var index = Math.floor(Math.random() * temp.length);
    temp[index] = 'cell cell-black';
    return temp;
};

/**
 * 创建一个指定类名的div
 * @param className
 * @returns {HTMLElement}
 */
var createDiv = function (className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
};

/**
 * 形成.row>.cell*4的DOM结构
 */
var createRow = function () {
    var row = createDiv('row');
    container.appendChild(row);
    var cells = createCells();

    for (var i = 0; i < COL_SIZE; i++) {
        var div = createDiv(cells[i]);
        row.appendChild(div);
    }
    container.insertBefore(row, container.firstChild);
};

/**
 * 方块运动速度提升，难度增加
 */
var speedUp = function () {
    speed += 1;
    if (speed === 20) {
        alert('你超神了！');
    } else if (speed === 30) {
        alert('我爱死你了！');
    }
};

var delRow = function () {
    if (container.childNodes.length === 6) {
        container.removeChild(container.lastChild);
    }
};

var addScore = function () {
    score++;
    // 难度与分数成正比
    if (score % 10 === 0) {
        speedUp();
    }
};

var renderScore = function () {
    scoreWrapper.innerHTML = score;
};

var gameover = function () {

    cancelAnimationFrame(delta);
    container.removeEventListener('click', clickHandler);
    if (confirm('你最终的分数是:' + scoreWrapper.innerHTML + ',重新开始游戏？')) {
        init();
    }
};

var move = function () {

    // ref:https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
    var top = parseInt(getComputedStyle(container, null)['top']);
    if (speed + top > 0) {
        top = 0;
    } else {
        top += speed;
    }
    container.style.top = top + 'px';

    if (top === 0) {
        createRow();
        container.style.top = '-100px';
        delRow();
    } else if (top == (-100 + speed)) {
        var rows = container.children;
        // 最下面的一行还有黑块
        if (rows.length === 5 && rows[4].pass !== 1) {
            isGameOver = true;
            gameover();
        }
    }
};

var judge = function (ev) {
    if (ev.target.classList.contains('cell-black')) {
        ev.target.className = 'cell';
        // 点击黑色方块所在行标记为pass
        ev.target.parentNode.pass = 1;
        addScore();
        renderScore();
    }
};

var clickHandler = function (ev) {
    judge(ev);
};

var init = function () {

    var _initDOM = function () {
        for (var i = 0; i < ROW_SIZE; i++) {
            createRow();
        }
    };

    var _reset = function () {
        isGameOver = false;
        speed = 2;
        container.innerHTML = '';
        score = 0;
        container.addEventListener('click', clickHandler);

        renderScore();
    };

    _reset();

    gameLoop();
};

var gameLoop = function () {
    move();
    if (!isGameOver) {
        delta = requestAnimationFrame(gameLoop);
    }
};

init();