/**
 * Created by gaopengfei on 2015/6/29.
 */

$(function () {
    $('#search-input').keyup(function () {

        var $searchText = $('#search-input').val();
        $.get('http://api.bing.com/qsonhs.aspx?q=' + $searchText, function (data) {
            var data = data.AS.Results[0].Suggests;  // 必应服务器的搜索结果

            // 拼接显示结果
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<li>' + data[i].Txt + '</li>';
            }
            console.info(html);
            $('#search-result').html(html);          // 设置搜索结果到容器

            // 显示容器
            /*
             * 特别注意：$(selector).offset().top是属性而不是方法
             * */
            //console.log($('#search-form').offset().top);
            var $searchForm = $('#search-form'); // 将选择器的内容缓存提高性能
            $('#search-suggest').css({
                top: $searchForm.offset().top + $searchForm.height() + 10,
                left: $searchForm.offset().left,
                position: 'absolute'
            }).slideDown('fast');

        }, 'json');

    });

    // 在页面的其他地方点击收回搜索框
    $(document).click(function () {
        $('#search-suggest').slideUp();
    });

    $(document).delegate('li','click', function () {
        var $keyword = $(this).text();
        location.href = 'http://cn.bing.com/search?q=' + $keyword;
    });

});