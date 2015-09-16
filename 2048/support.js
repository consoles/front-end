/**
 * Created by gaopengfei on 2015/9/16.
 */

var document_width = window.screen.availWidth;    // 屏幕宽度
var grid_container_width = 0.92 * document_width; // 棋盘宽度
var cell_side_length = 0.18 * document_width;     // 格子的大小
var cell_space = 0.04 * document_width;           // 格子之间的间隔

// 获取相应格子距离顶部的距离
function get_pos_top(i, j) {

    return cell_space + i * (cell_space + cell_side_length);
}

// 获取相应格子距离棋盘左边的距离
function get_pos_left(i, j) {
    return cell_space + j * (cell_space + cell_side_length);
}

// 得到相应数字的背景色
function get_number_background_color(number) {

    switch (number) {
        case 2:
            return '#eee4da';
        case 4:
            return '#ede0c8';
        case 8:
            return '#f2b179';
        case 16:
            return '#f59563';
        case 32:
            return '#f67c5f';
        case 64:
            return '#f65e3b';
        case 128:
            return '#edcf72';
        case 256:
            return '#edcc61';
        case 512:
            return '#9c0';
        case 1024:
            return '#33b5e5';
        case 2048:
            return '#09c';
        case 4096:
            return 'a6c';
        case 8192:
            return '#93c';
    }
    return '#000';
}

// 获取相应数字的颜色
function get_number_color(number) {

    if (number <= 4) {
        return '#776e65';
    }
    return '#fff';
}

// 判断是否有空格子
function nospace(board) {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

/**
 * 2048私人定制：一（文字版2048）
 * @param number
 */
function get_text(number) {

    var content = [
        {"num": 2, "text": "小白"},
        {"num": 4, "text": "实习生"},
        {"num": 8, "text": "码农"},
        {"num": 16, "text": "程序员"},
        {"num": 32, "text": "工程师"},
        {"num": 64, "text": "项目经理"},
        {"num": 128, "text": "部门主管"},
        {"num": 256, "text": "经理秘书"},
        {"num": 512, "text": "总经理"},
        {"num": 1024, "text": "执行官"},
        {"num": 2048, "text": "董事长"},
        {"num": 4096, "text": "嘉城女婿"},
        {"num": 8192, "text": "神"}
    ];

    for (var i = 0; i < content.length; i++) {
        //console.log(content[i].num + '--->' + content[i].text);
        if (number == content[i].num) {
            return content[i].text;
        }
    }
    return '未知职位！';
}

/**
 * 拼接图片的DOM元素
 * @param number
 * @returns {string}
 */
function get_img(number) {

    return '<img src="' + number + '.jpg" />';
}

/**
 * 可以向左移动？
 */
function can_move_left(board) {

    for (var i = 0; i < row; i++) {
        for (var j = 1; j < col; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * 可以向右移动？
 */
function can_move_right(board) {

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * 可以向上移动？
 */
function can_move_up(board) {

    for (var j = 0; j < row; j++) {
        for (var i = 1; i < col; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * 可以向下移动？
 * @param board
 */
function can_move_down(board) {

    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * 水平方向有空格子？
 * @param row
 * @param col1
 * @param col2
 * @param board
 * @returns {boolean}
 */
function no_block_horizontal(row, col1, col2, board) {

    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}

/**
 * 垂直方向是否有空格子？
 * @param col
 * @param row1
 * @param row2
 * @param board
 */
function no_block_vertical(col, row1, row2, board) {

    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

/**
 * 可以移动？
 */
function nomove(board) {

    return !(can_move_down(board) || can_move_up(board) || can_move_right(board) || can_move_left(board));
}


/**
 * 当时钟数字不足2位数时补0
 */
function checkTime(i) {
    return i < 10 ? '0' + i : i;
}

/**
 * 走动的页面时钟
 */
function timeDate() {

    var now = new Date(),

        year = now.getFullYear(),
        month = now.getMonth() + 1,
        day = now.getDate(),
        h = checkTime(now.getHours()),
        m = checkTime(now.getMinutes()),
        s = checkTime(now.getSeconds()),
        weekday = '星期' + '日一二三四五六'.charAt(now.getDay());

    $('#timer').text(year + "年" + month + "月" + day + "日 " + weekday + ' ' + h + ":" + m + ":" + s);

    setTimeout(timeDate, 1000);
}