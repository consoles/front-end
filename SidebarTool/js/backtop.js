/**
 * Created by yiihua-013 on 16/6/19.
 *
 * 返回顶部模块
 */

define(['jquery', 'scrollto'], function ($, scrollto) {
    function BackTop(el, opts) {
        this.opts = $.extend({}, BackTop.DEFAULTS, opts);
        this.$el = $(el);
        this.scroll = new scrollto.ScrollTo({
            dest: 0,
            speed: this.opts.speed
        });

        this._checkPosition();

        if (this.opts.mode === 'move') {
            this.$el.on('click', $.proxy(this._move, this));
        } else {
            this.$el.on('click', $.proxy(this._go, this));
        }

        $(window).on('scroll', $.proxy(this._checkPosition, this));
    }

    BackTop.DEFAULTS = {
        mode: 'move',
        pos: $(window).height(),
        speed: 800
    };

    BackTop.prototype._move = function () {
        this.scroll.move();
    };
    BackTop.prototype._go = function () {
        this.scroll.go();
    };
    BackTop.prototype._checkPosition = function () {
        var $el = this.$el;
        if ($(window).scrollTop() > this.opts.pos) {
            $el.fadeIn();
        } else {
            $el.fadeOut();
        }
    };

    // jquery 插件
    $.fn.extend({
        backtop: function () {
            // 链式调用,this.each的返回值也是this
            return this.each(function () {
                new BackTop(this, this.opts);
            });
        }
    });

    return {
        BackTop: BackTop
    }
});