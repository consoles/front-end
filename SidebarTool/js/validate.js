/**
 * Created by yiihua-013 on 16/6/19.
 */

/**
 * 使用define定义require.js的模块
 *
 * 该模块具有自己独立的命名空间
 * 外面的内容无法访问里面,而里面的内容也无法和外面交互
 * 只有通过return返回的值暴露给外面才能够使用
 */
define(['jquery'], function ($) {

    return {
        isEmpty: function () {

        },
        checkLength: function () {

        },
        isEqual: function (password1, password2) {
            return password1 === password2;
        }
    };
});