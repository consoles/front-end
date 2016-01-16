/**
 * Created by gaopengfei on 2015/9/23.
 *
 * 焦点图
 */

$(function () {
    // cached
    var $banner = $('.banner'),
        $pics = $('.banner_imgs li'),
        $numbers = $('.number a');

    var index = 0,
        timer = null;

    // 自动播放函数
    function autoPlay() {
        index = ++index % $pics.length;
        changePic(index);
    }

    // 定义图片切换函数
    function changePic(curIndex) {

        // 将所有图片设置为不可见，移除所有高亮页签
        $pics.each(function (index, domEle) {
            $(domEle).css('display', 'none');
        });
        $numbers.each(function (index, domEle) {
            $(domEle).removeClass();
        });

        // 显示当前图片并高亮当前页签
        $pics.eq(curIndex).css('display', 'block');
        $numbers.eq(curIndex).addClass('active');
    }

    timer = setInterval(autoPlay, 2000);

    // 鼠标进入容器时停止图片轮播
    $banner.mouseover(function () {
        clearInterval(timer);
    });

    // 鼠标离开容器时继续播放至下一张
    $banner.mouseout(function () {
        timer = setInterval(autoPlay, 2000);
    });

    // 鼠标滑动到对应页签，当前页签高亮
    $numbers.each(function (index, domEle) {
        $(domEle).mouseover(function () {
            clearInterval(timer);
            changePic($(domEle).text() - 1);
        });
    });
});
