/**
 * Created by gaopengfei on 2015/9/17.
 *
 * 游戏主逻辑
 */

var td = [],   // 保存每个格子的地鼠
    playing = false, // 游戏是否正在运行
    score = 0, // 分数
    beat = 0,   // 鼠标点击次数
    success = 0, // 命中率
    knock = 0,  // 鼠标击中老鼠图片的次数
    count_down = 30, // 倒计时
    interId = null, // 指定setInterval()的变量
    timeId = null;  // 指定setTimeout()的变量

/**
 * 游戏结束
 */
function game_over() {

    time_stop();
    playing = false;
    clear_mouse();
    alert('游戏结束！\n你获得的分数是：' + score + '\n命中率为：' + success);
    success = 0;
    score = 0;
    knock = 0;
    beat = 0;
    count_down = 30;
}

/**
 * 显示当前倒计时所剩余的时间
 */
function time_show() {

    document.form1.remain_time.value = count_down;
    if (count_down == 0) {
        game_over();
        return;
    } else {
        count_down--;
        timeId = setTimeout('time_show()', 1000);
    }
}

/**
 * 主动停止所有计时
 */
function time_stop() {

    clearInterval(interId);
    clearTimeout(timeId);
}

/**
 * 随机循环显示老鼠图片
 */
function show() {

    if (playing) {
        var curent = Math.floor(Math.random() * 25);
        document.getElementById('td' + curent).innerHTML = '<img src = "mouse.png"/>';
        // 3s后隐藏老鼠图片
        setTimeout('document.getElementById('
        td
        ' + curent).innerHTML = ""', 3000
    )
        ;
    }
}

/**
 * 清除所有老鼠图片
 */
function clear_mouse() {

    for (var i = 0; i <= 24; i++) {
        document.getElementById(td + i).innerHTML = '';
    }
}

/**
 * 清除所有老鼠图片
 * @param id
 */
function hit(id) {

    if (playing = false) {
        alert('点击开始游戏。');
        return;
    } else {
        beat++;
        if (document.getElementById('td' + id).innerHTML != '') {
            score++;
            knock++;
            success = knock / beat;
            document.form1.success_percent.value = success;
            document.form1.score.value = score;
            document.getElementById('td' + id).innerHTML = '';
        } else {
            score++;
            success = knock / beat;
            document.form1.success_percent.value = success;
            document.form1.score.value = score;
        }
    }
}

/**
 * 开始游戏
 */
function game_start() {

    playing = true;
    interId = setInterval('show()', 1000);
    document.form1.score.value = score;
    document.form1.success_percent.value = success;
    time_show();
}