/**
 * Created by yiihua-013 on 16/6/19.
 *
 * 滚动封装成模块
 */

define(['jquery'], function ($) {
    function ScrollTo(opts) {
        // 将用户传递的参数去覆盖默认属性生成一个新对象并返回
        this.opts = $.extend({}, ScrollTo.DEFAULTS, opts);
        this.$el = $('html,body'); // cache
    }

    ScrollTo.prototype.move = function () {
        var opts = this.opts;
        var dest = opts.dest;
        if ($(window).scrollTop() !== dest && !this.$el.is(':animated')) {
            console.log('animation');
            this.$el.animate({
                scrollTop: dest
            }, opts.speed);
        }
    };
    ScrollTo.prototype.go = function () {
        var dest = this.opts.dest;
        if ($(window).scrollTop() !== dest) {
            this.$el.scrollTop(dest);
        }
    };
    // 这其实形成了一个静态属性
    ScrollTo.DEFAULTS = {
        dest: 0,
        speed: 800
    };

    return {
        ScrollTo: ScrollTo
    }
});