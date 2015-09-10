/**
 * Created by gaopengfei on 2015/9/10.
 */

$(function () {

    var $list_1 = $('.list-1'),
        $list_2 = $('.list-2'),
        $change_list = $('.changeList');

    $list_1.click(function () {
        $list_1.css('background-position', '0px -26px');
        $list_2.css('background-position', '-30px -26px');
        $change_list.children().removeClass('li-2-v').addClass('li-1-o');

    });
    $list_2.click(function () {
        $list_1.css('background-position', '0px 0px');
        $list_2.css('background-position', '-30px 0px');
        $change_list.children().removeClass('li-1-o').addClass('li-2-v');
    });

});
