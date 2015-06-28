/**
 * Created by gaopengfei on 2015/6/28.
 */

$(document).ready(function () {
    $(window).scroll(function () {
        var top = $(document).scrollTop();
        var menu = $("#menu");
        var items = $("#content").find(".item");
        console.info('滚动条距离浏览器顶部：' + top);

// 请补充此处代码，让导航菜单实现在滚动条滚动的时候自动设置焦点
        var currentId = null;   // 当前所在楼层Id
        items.each(function (index, element) {

            var This = $(this);
            console.warn(This);
            var itemTop = This.offset().top;
            console.debug('item' + index + '距离页面顶部' + itemTop);
            if (top > itemTop - 250) {
                currentId = '#' + This.attr('id');
            } else {
                return false;
            }
        });


        console.info('currentId' + currentId);
        var currentLink = menu.find('.current');
        if (currentId && currentLink.attr('href') != currentId) {
            currentLink.removeClass('current');
            menu.find('[href=' + currentId + ']').addClass('current');
        }
    });

});