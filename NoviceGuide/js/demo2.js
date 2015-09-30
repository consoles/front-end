/**
 * Created by gaopengfei on 2015/9/30.
 *
 * 新手引导特效jQuery实现
 */

$(function () {

    // 读cookie
    var res = document.cookie.substring(5);
    if (res != 'www.imooc.com') {
        // 显示蒙版、整个引导区和第一个引导块
        $('#mask,#searchTip,#searchTip div:eq(0)').show();
        $('#searchTip div a').click(function () {
            var current = $(this).parent();
            current.hide();
            current.next().show();
        });
    }

    // 最后一个按钮点击时隐藏引导区和蒙版
    $('#searchTip div span,#searchTip div a:last').click(function () {
        $('#mask,#searchTip').hide();
    });

    // 写cookie（有效期30day）
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + 30);
    document.cookie = 'name=www.imooc.com;expires=' + oDate;
});
