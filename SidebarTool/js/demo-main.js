/**
 * Created by yiihua-013 on 16/6/19.
 */

requirejs.config({
    paths: {
        jquery: '../node_modules/jquery/dist/jquery.min'
    }
});

requirejs(['jquery', 'validate'], function ($, validate) {
    // jquery已经被成功引入了
    $('body').css('background', 'red');
    // 测试validate模块
    console.log(validate.isEqual("abc", "ac"));
});