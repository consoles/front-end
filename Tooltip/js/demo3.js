/**
 * Created by gaopengfei on 2016/5/2.
 *
 * 使用jQuery UI完成头tooltip效果
 */

$(function () {
    $(".tooltip").bind("mouseleave", function (event) {
        //此处代码是防止鼠标移开链接但还在tooltip提示框内时tooltip隐藏
        event.stopImmediatePropagation();

        var fixed = setTimeout('$("[title]").tooltip("close")', 500);
        $(".ui-tooltip").hover(
            function () {
                clearTimeout(fixed);
            },
            function () {
                $("[title]").tooltip("close");
            }
        );
    }).tooltip({
        content: function () {
            var element = $(this);
            switch (element.attr("id")) {
                case "tooltip1":
                    return '<iframe src="http://baike.baidu.com/view/10962527.htm" width="480" height="300"></iframe>';
                case "tooltip2":
                    return '<iframe src="http://baike.baidu.com/subview/1241829/9322617.htm" width="480" height="300"></iframe>';
                case "tooltip3":
                    return '<iframe src="http://baike.baidu.com/subview/158983/8747673.htm" width="480" height="300"></iframe>';
                default :
                    return '';
            }
        }
    });

});