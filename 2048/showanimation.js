/**
 * Created by gaopengfei on 2015/9/16.
 *
 * 处理动画相关
 */

function show_number_with_animation(i, j, rand_number) {

    var $number_cell = $('#number_cell_' + i + '_' + j);
    $number_cell.css('background-color', get_number_background_color(rand_number));
    $number_cell.css('color', get_number_color(rand_number));
    $number_cell.text(rand_number);

    //$number_cell.text(get_text(rand_number)); // 2048私人定制（文字版）
    $number_cell.html(get_img(rand_number));    // 2048私人定制（图片版）

    $number_cell.animate({
        width: cell_side_length,
        height: cell_side_length,
        top: get_pos_top(i, j),
        left: get_pos_left(i, j)
    }, 500);
}

function update_score(score) {
    $('#score').text(score);
}

/**
 * 格子移动时的动画效果
 * @param fromX
 * @param fromY
 * @param toX
 * @param topY
 */
function show_move_animation(fromX, fromY, toX, toY) {

    var $number_cell = $('#number_cell_' + fromX + '_' + fromY);

    $number_cell.animate({
        top: get_pos_top(toX, toY),
        left: get_pos_left(toX, toY)
    }, 200);
}
