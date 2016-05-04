/**
 * Created by gaopengfei on 2016/5/3.
 */

$(function () {
    var $container = $('.container'),
        $list = $('.list'),
        $buttons = $('.buttons').find('span'),
        $images = $list.find('img.img'),
        $prev = $('.prev'),
        $next = $('.next');

    var index = 0,
        len = $images.size(),
        imageWidth = $images.first().width();

    var timer,
        interval = 3000;

    var isAutoPlay = true;

    var animate = function (offset) {
        var left = parseInt($list.css('left')) - offset * imageWidth;
        $list.animate({'left': left}, 'normal', function () {
            // 到达最后一张附属图拉回第一张，到达第一张附属图拉回到最后一张
            if (left < -imageWidth * len) {
                $list.css('left', -imageWidth);
            } else if (left > -imageWidth) {
                $list.css('left', -imageWidth * len);
            }
            console.info($list.css('left'));
        });
    };

    var go = function (offset) {
        if (Math.abs(offset) >= len) {
            throw Error('步长不对！');
        }
        if ($list.is(':animated')) {
            return console.warn('动画正在执行中');
        }
        index += offset;
        if (index === -1) {
            index = len - 1;
        } else if (index === len) {
            index = 0;
        }
        animate(offset);
        showButton();
    };

    var next = function () {
        go(1);
    };

    var prev = function () {
        go(-1);
    };

    var showButton = function () {
        $buttons.eq(index).addClass('on').siblings().removeClass('on');
    };

    var play = function () {
        timer = setTimeout(function () {
            next();
            play();
        }, interval);
    };

    var stop = function () {
        clearTimeout(timer);
    };

    $next.click(function () {
        next();
    });

    $prev.click(function () {
        prev();
    });

    $buttons.each(function () {
        $(this).click(function () {
            // 出于性能的考虑
            if ($list.is(':animated') || $(this).attr('class') === 'on') {
                return;
            }
            var currentIndex = parseInt($(this).data('index'));
            var offset = currentIndex - index;
            go(offset);
        });
    });

    if (isAutoPlay) {
        play();
        $container.hover(stop, play);
    }

});