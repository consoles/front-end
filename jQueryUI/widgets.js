/**
 * Created by gaopengfei on 2015/9/20.
 *
 * JQueryUI常用控件
 */

var current = 0;
var max = 100;
var $pb;

var $slider;
$(function () {

    // 手风琴效果
    $('#accordion').accordion();

    // 自动完成
    var autotags = ['html', 'java', 'javascript', 'struts', 'spring', 'springmvc', 'jquery', 'jquery mobile'];
    $('#tags').autocomplete({
        source: autotags
    });

    // 日期选择
    $('#datepicker').datepicker();

    // 对话框
    $('#show_dialog_btn').button().click(function () {
        $('.dialog').dialog();
    });

    // 进度条
    $pb = $('#progressbar');
    $pb.progressbar({max: 100});
    setInterval(update_progressbar, 100);

    // 菜单
    $('#menu').menu({
        position: {
            at: "left top"
        }
    });

    // 滑竿
    $slider = $('#slider');
    $slider.slider({
        //change:function(event,ui){
        //    $('#span').text($slider.slider('option','value'));
        //}
        slide: function (event, ui) {
            $('#span').text($slider.slider('option', 'value'));
        }
    });

    //  范围调整
    var $input = $('#input');
    $input.spinner();
    $input.spinner("value", '10');

    // 选项卡
    $("#tabs").tabs();
});

/**
 * 更新进度条
 */
function update_progressbar() {

    if (current++ >= max) {
        current = 0;
    }
    $pb.progressbar('option', 'value', current);
}