/**
 * Created by gaopengfei on 2016/5/3.
 */

var jWindow = $(window);

jWindow.scroll(function () {
    var scrollHeight = jWindow.scrollTop(),
        screenHeight = jWindow.height();

    var $side = $('#J_BdSide');

    var sideHeight = $side.height();

    if (scrollHeight + screenHeight > sideHeight) {
        $side.css({
            'position': 'fixed',
            'top': -(sideHeight - screenHeight),
            'right': 0
        });
    } else {
        $side.css({
            'position': 'static'
        });
    }
});

// profill for window onload and resize
window.onload = function () {
    jWindow.trigger('scroll');
};

jWindow.resize(function () {
    jWindow.trigger('scroll');
});