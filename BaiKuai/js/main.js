var timer = 0;
var state = 0;
var speed = 4;

var createCells = function () {
    var temp = ['cell', 'cell', 'cell', 'cell'];
    var index = Math.floor(Math.random() * temp.length);
    temp[index] = 'cell cell-black';
    return temp;
};

var createDiv = function (className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
};
/**
 * 形成.row>.cell*4的DOM结构
 */
var createRow = function () {
    var container = document.querySelector('.container');
    var row = createDiv('row');
    container.appendChild(row);

    var cells = createCells();

    for (var i = 0; i < 4; i++) {
        var div = createDiv(cells[i]);
        row.appendChild(div);
        if (!container.firstChild) {
            container.appendChild(row);
        } else {
            container.appendChild(row, row.firstChild);
        }
    }
};

var speedUp = function () {
    speed += 2;
    if (speed === 20) {
        alert('你超神了！');
    }
};

var delRow = function () {
    var container = document.querySelector('.container');
    if (container.childNodes.length === 6) {
        container.removeChild(container.lastChild);
    }
};

var calcScore = function () {
    var newScore = parseInt(document.querySelector('#score').innerHTML) + 1;
    document.querySelector('#score').innerHTML = newScore;
    if (newScore % 10 === 0) {
        speedUp();
    }
};

var move = function () {
    var container = document.querySelector('.container');

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
        //delRow();
    } else if (top == (-100 + speed)) {
        var rows = container.children;
        // 最下面的一行还有黑块
        if (rows.length === 5 && rows[rows.length - 1].pass !== 1) {
            fail();
        }
    }
};

var judge = function (ev) {
    if (ev.target.classList.contains('cell-black')) {
        ev.target.className = 'cell';
        ev.target.parentNode.pass = 1;
        calcScore();
    }
};

var fail = function () {
    clearInterval(timer);
    prompt('你最终的分数是:' + parseInt(document.querySelector('#score').innerHTML));
};

var init = function () {
    for (var i = 0; i < 4; i++) {
        createRow();
    }
    document.querySelector('.container').addEventListener('click', function (ev) {
        judge(ev);
    });

    timer = setInterval(function () {
        move();
    }, 200);
};

init();