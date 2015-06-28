/**
 * Created by gaopengfei on 2015/6/28.
 */

$(function () {
    waterfall();

    var dataInt = {'data':[{'src':'25.jpg'},{'src':'26.jpg'},{'src':'27.jpg'},{'src':'28.jpg'},{'src':'29.jpg'},{'src':'30.jpg'},{'src':'31.jpg'},{'src':'32.jpg'},{'src':'33.jpg'},{'src':'34.jpg'},{'src':'35.jpg'},{'src':'36.jpg'}]};
    $(window).scroll(function () {
        if(checkScrollSlide){

            $.each(dataInt.data, function (key,value) {
                console.log(value);
                var oBox = $('<div>').addClass('box').appendTo($('#main'));  // 创建一个div并指定类名接下来添加到父元素
                var oPic = $('<div>').addClass('pic').appendTo($(oBox));
                $('<img>').attr('src','images/' + $(value).attr('src')).appendTo(oPic);
            });

            waterfall();
        }
    });
});

function waterfall(){
    var $boxs = $('#main > div');                       // 所有的元素
    var w = $boxs.eq(0).outerWidth();                   // 每一列的宽度
    var cols = Math.floor($(window).width() / w);       // 列数

    $('#main').width( w * cols).css('margin','0 auto'); // 为整个容器设置宽度，并居中对齐

    var hArr = [];
    $boxs.each(function (index,element) {
        //console.log(index + '--->' + element);
        if(index < cols){
            hArr[index] = $boxs.eq(index).outerHeight(); // 把第一行的高度放到一个数组中
        }else{
            var minH = Math.min.apply(null,hArr);
            var minHIndex = $.inArray(minH,hArr);        // 获取minH在数组hArr中的索引

            $(element).css({
                'position':'absolute',
                'top':minH + 'px',
                'left':minHIndex * w + 'px'
            });

            hArr[minHIndex] += $boxs.eq(index).outerHeight();
        }
    });
}

/**
 * 滑动时检测是否需要加载接下来的数据块
 */
function checkScrollSlide(){

    var $lastBox = $('#div > box').last();
    var lastBoxDis = $lastBox.offset().top + parseInt($lastBox.outerHeight() / 2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();

    return lastBoxDis < scrollTop + documentH;
}