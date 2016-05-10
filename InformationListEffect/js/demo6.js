/**
 * Created by gaopengfei on 2016/5/2.
 */

$(function () {
    var $lis = $('li');
    $lis.mouseover(function () {
        $(this).children('dl').css('display', 'block');
        $(this).children('ins').addClass('active');
    });
    $lis.mouseout(function () {
        $(this).children('dl').css('display', 'none');
        $(this).children('ins').removeClass('active');
    });
});