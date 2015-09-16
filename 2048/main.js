/**
 * Created by gaopengfei on 2015/9/15.
 *
 * 2048主游戏逻辑
 */
var row = 4, col = 4;        // 方块的行列
var board = [];             // 每个格子的数字
var score = 0;              // 分数
var has_conflicted = [];    // 解决连续消除的标记

var startX = 0,             // 移动端触摸屏幕开始时开始点的x坐标
    startY = 0;             // 移动端触摸屏幕开始时开始点的y坐标
var endX = 0,               // 移动端触摸屏幕时结束点的x坐标
    endY = 0;               // 移动端触摸屏幕时结束点的y坐标

var success_string = '挑战成功！',   // 游戏提示信息
    gameover_string = '游戏结束。';

var timer1, timer2;

/**
 * DOM加载完成后初始化棋盘
 */
$(function () {

    // 屏幕适配
    prepare_for_mobile();
    new_game();
    $('#new_game_btn').click(function () {
        new_game();
    });
});

/**
 * 开始新游戏
 */
function new_game() {

    // 初始化棋盘
    init();
    // 在随机的2个格子生成数字
    generate_one_number();
    generate_one_number();
}

/**
 * 初始化
 */
function init() {

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            // 取得每一个单元格，并为其设置正确的位置（left和top）
            var $grid_cell = $('#grid_cell_' + i + '_' + j);
            $grid_cell.css('top', get_pos_top(i, j));
            $grid_cell.css('left', get_pos_left(i, j));
        }
    }
    for (var i = 0; i < row; i++) {
        board[i] = [];
        has_conflicted[i] = [];
        for (var j = 0; j < col; j++) {
            board[i][j] = 0;
            has_conflicted[i][j] = false;
        }
    }
    // 更新布局
    update_board_view();
    score = 0;
    // 更新分数
    update_score(score);
}

/**
 * 更新布局
 */
function update_board_view() {
    $('.number-cell').remove();
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            $('#grid_container').append('<div class="number-cell" id="number_cell_' + i + '_' + j + '"></div>');
            var $number_cell = $('#number_cell_' + i + '_' + j);
            if (board[i][j] == 0) {
                $number_cell.css('width', '0px');
                $number_cell.css('height', '0px');
                $number_cell.css('top', get_pos_top(i, j) + cell_side_length / 2);
                $number_cell.css('left', get_pos_left(i, j) + cell_side_length / 2);
            } else {
                console.log($number_cell);
                console.log('top:' + get_pos_top(i, j) + 'left:' + get_pos_left(i, j));
                $number_cell.css('width', cell_side_length);
                $number_cell.css('height', cell_side_length);
                $number_cell.css('top', get_pos_top(i, j));
                $number_cell.css('left', get_pos_left(i, j));
                $number_cell.css('background-color', get_number_background_color(board[i][j]));
                $number_cell.css('color', get_number_color(board[i][j]));
                //$number_cell.text(board[i][j]);

                $number_cell.text(get_text(board[i][j])); // 2048私人定制（文字版）
            }
            has_conflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height', cell_side_length + 'px');
    //$('.number-cell').css('font-size', 0.6 * cell_side_length + 'px');
    $('.number-cell').css('font-size', '20px');// 2048私人定制（文字版）
}

/**
 * 随机在一个格子生成数字
 */
function generate_one_number() {

    if (nospace(board)) {
        return false;
    }

    // 随机一个位置
    var randX = parseInt(Math.floor(Math.random() * 4)),
        randY = parseInt(Math.floor(Math.random() * 4));

    var time = 0;
    while (time < 50) {
        if (board[randX][randY] == 0) {
            break;
        }
        randX = parseInt(Math.floor(Math.random() * 4));
        randY = parseInt(Math.floor(Math.random() * 4));
        time++;
    }
    if (time == 50) {
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                if (board[i][j] == 0) {
                    randX = i;
                    randY = j;
                }
            }
        }
    }
    // 随机一个数字
    var rand_number = Math.random() < 0.5 ? 2 : 4;
    // 在随机位置显示随机数字
    board[randX][randY] = rand_number;
    show_number_with_animation(randX, randY, rand_number);
    return true;
}

/**
 * 屏幕适配，自适应处理
 */
function prepare_for_mobile() {

    if (document_width > 500) {
        grid_container_width = 500;
        cell_side_length = 100;
        cell_space = 20;
    }
    var $grid_container = $('#grid_container');
    $grid_container.css('width', grid_container_width - 2 * cell_space);
    $grid_container.css('height', grid_container_width - 2 * cell_space);
    $grid_container.css('padding', cell_space);
    $grid_container.css('border-radius', 0.02 * grid_container_width);

    var $grid_cell = $('.grid-cell');
    $grid_cell.css('width', cell_side_length);
    $grid_cell.css('height', cell_side_length);
    $grid_cell.css('border-radius', 0.02 * grid_container_width);
}

/**
 * 监听键盘事件
 */
$(document).keydown(function (event) {

    // 通关2048
    if ($('#score').text() == success_string) {
        new_game();
        return;
    }

    clearTimeout(timer1);
    clearTimeout(timer2);
    switch (event.keyCode) {

        case 37: // 左
            event.preventDefault();
            if (move_left()) {
                timer1 = setTimeout('generate_one_number()', 200);
                timer2 = setTimeout('is_game_over()', 300);
            }
            break;
        case 38: // 上
            event.preventDefault();
            if (move_up()) {
                timer1 = setTimeout('generate_one_number()', 200);
                timer2 = setTimeout('is_game_over()', 300);
            }
            break;
        case 39: // 右
            event.preventDefault();
            if (move_right()) {
                timer1 = setTimeout('generate_one_number()', 200);
                timer2 = setTimeout('is_game_over()', 300);
            }
            break;
        case 40: // 下
            event.preventDefault();
            if (move_down()) {
                timer1 = setTimeout('generate_one_number()', 200);
                timer2 = setTimeout('is_game_over()', 300);
            }
            break;
        default :
            break;
    }
});

/**
 * 监听移动设备的触摸开始
 */
document.addEventListener('touchstart', function (event) {

    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

/**
 * 监听移动设备触摸移动
 */
document.addEventListener('touchmove', function (event) {

    event.preventDefault();
});

/**
 * 监听移动设备的触摸结束
 */
document.addEventListener('touchend', function (event) {

    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var deltaX = endX - startX;
    var deltaY = endY - startY;

    if (Math.abs(deltaX) < 0.3 * document_width && Math.abs(deltaY) < 0.3 * document_width) {
        return;
    }
    if ($('#score').text() == success_string) {
        new_game();
        return;
    }

    clearTimeout(timer1);
    clearTimeout(timer2);
    // 水平
    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX > 0) {
            // 向右
            if (move_right()) {
                timer1 = setTimeout('generate_one_number()', 200);
                timer2 = setTimeout('is_game_over()', 300);
            }
        } else {
            // 向左
            if (move_left()) {
                timer1 = setTimeout('generate_one_number()', 200);
                timer2 = setTimeout('is_game_over()', 300);
            }
        }
    } else {
        // 垂直
        if (deltaY > 0) {
            // 向下
            if (move_down()) {
                timer1 = setTimeout('generate_one_number()', 200);
                timer2 = setTimeout('is_game_over()', 300);
            }
        } else {
            // 向上
            if (move_up()) {
                timer1 = setTimeout('generate_one_number()', 200);
                timer2 = setTimeout('is_game_over()', 300);
            }
        }
    }
});

/**
 * 向左移动
 */
function move_left() {

    if (!can_move_left(board)) {
        return false;
    }

    // move left
    for (var i = 0; i < row; i++) {
        for (var j = 1; j < col; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && no_block_horizontal(i, k, j, board)) {
                        show_move_animation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[i][k] == board[i][j] && no_block_horizontal(i, k, j, board) && !has_conflicted[i][k]) {
                        show_move_animation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        // 分数增加
                        score += board[i][k];
                        update_score(score);
                        has_conflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout('update_board_view()', 200);
    return true;
}

/**
 * 向右移动
 * @returns {boolean}
 */
function move_right() {
    if (!can_move_right(board)) {
        return false;
    }

    // 向右移动
    for (var i = 0; i < row; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && no_block_horizontal(i, j, k, board)) {
                        show_move_animation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[i][k] == board[i][j] && no_block_horizontal(i, j, k, board) && !has_conflicted[i][k]) {
                        show_move_animation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        // 增加分数
                        score += board[i][k];
                        update_score(score);
                        has_conflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout('update_board_view()', 200);
    return true;
}

/**
 * 向上移动
 * @returns {boolean}
 */
function move_up() {
    if (!can_move_up(board)) {
        return false;
    }
    // 向上移动
    for (var j = 0; j < col; j++) {
        for (var i = 1; i < row; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && no_block_vertical(j, k, i, board)) {
                        show_move_animation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[k][j] == board[i][j] && no_block_vertical(j, k, i, board) && !has_conflicted[k][j]) {
                        show_move_animation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        // 更新分数
                        score += board[k][j];
                        update_score(score);
                        has_conflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout('update_board_view()', 200);
    return true;
}

/**
 * 向下移动
 * @returns {boolean}
 */
function move_down() {
    if (!can_move_down(board)) {
        return false;
    }
    // 向下移动
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && no_block_vertical(j, i, k, board)) {
                        show_move_animation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[k][j] == board[i][j] && no_block_vertical(j, i, k, board) && !has_conflicted[k][j]) {
                        show_move_animation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        // 更新分数
                        score += board[k][j];
                        update_score(score);
                        has_conflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout('update_board_view()', 200);
    return true;
}

/**
 * 判断游戏成功或者失败
 */
function is_game_over() {

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (board[i][j] == 2048) {
                update_score(success_string);
                return;
            }
        }
    }
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}

/**
 * 游戏结束时更新游戏失败的名字
 */
function gameover() {

    alert(gameover_string);
    return;
}