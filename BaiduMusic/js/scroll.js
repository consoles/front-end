/**
 * Created by gaopengfei on 2015/10/3.
 */

var $index = 0;
var timer = null;
var $page = $('.pagination').find('span');

$page.click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $index = $(this).index(); // 序列号
    $('.img-list').animate({'left': -$index * 980}, 300);
});

/**
 * 自动轮播函数
 */
function autoPlay() {
    timer = setInterval(function () {
        $index++;
        if ($index > 5)
            $index = 0;
        $page.eq($index).addClass('active').siblings().removeClass('active');
        $('.img-list').animate({'left': -$index * 980}, 300);
    }, 2000);
}
autoPlay();

/**
 * 鼠标移入停止播放，移出再次播放
 */
$page.hover(function () {
    clearInterval(timer);
}, function () {
    autoPlay();
});

/**
 * 鼠标移入移出大图显示、隐藏左右切换按钮
 */
var $a_btn = $('a.prev,a.next');
$('#flash').hover(function () {
    clearInterval(timer);
    $a_btn.show();
}, function () {
    autoPlay();
    $a_btn.hide();
});

$('.next').click(function () {
    clearInterval(timer);
    if ($index == 5)
        return;
    $index++;
    $page.eq($index).addClass('active').siblings().removeClass('active');
    $('.img-list').animate({'left': -$index * 980}, 300);
});
$('.prev').click(function () {
    clearInterval(timer);
    if ($index == 0)
        return;
    $index--;
    console.log($index);
    $page.eq($index).addClass('active').siblings().removeClass('active');
    $('.img-list').animate({'left': -$index * 980}, 300);
});