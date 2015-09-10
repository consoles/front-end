/**
 * Created by gaopengfei on 2015/9/10.
 */

$(function () {

    var $tip = $('.tip');

    $('.button').hover(function () {
        var title = $(this).attr('data-title');
        console.info(title);
        $tip.children('em').text(title);
        var pos = $(this).offset().left;
        var dis = ($tip.outerWidth() - $(this).outerWidth()) / 2;
        var f = pos - dis;
        $tip.css({'left': f + 'px'}).animate({'top': 195, 'opacity': 1}, 300);
    }, function () {
        $tip.animate({'top': 160, 'opacity': 0}, 300);
    });
});