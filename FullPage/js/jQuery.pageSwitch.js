/**
 * Created by gaopengfei on 2016/3/27.
 *
 * jQuery全屏切换插件
 */

(function ($) {

    /**
     * 是否兼容某个特定的CSS
     */
    var _isSupportCss = function (property) {
        var body = $('body').get(0);
        for (var i = 0; i < property.length; i++) {
            if (property[i] in body.style) {
                return true;
            }
        }
        return false;
    };

    var PageSwitch = (function () {
        function PageSwitch(element, options) {
            // deep copy
            this.settings = $.extend(true, $.fn.PageSwitch.defaults, options || {});
            this.element = element;
            this.init();
        }

        PageSwitch.prototype = {
            /**
             * 初始化DOM，布局，分页，事件绑定
             */
            init: function () {
                var me = this;
                me.selectors = me.settings.selectors;
                me.sections = me.element.find(me.selectors.sections);
                me.section = me.sections.find(me.selectors.section);
                me.direction = me.settings.direction === 'vertical';
                me.pagesCount = me.pagesCount();
                me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;

                me.canScroll = true;

                if (!me.direction) {
                    me._initLayout();
                }
                if (me.settings.pagination) {
                    me._initPaging();
                }
                if (me.index) {
                    me.go(me.index);
                }
                me._initEvent();
            },
            /**
             * 获取滑动页面数量
             */
            pagesCount: function () {
                return this.sections.children().length;
            },
            /**
             * 滑动宽度（横屏）或高度（竖屏）
             */
            switchLength: function () {
                return this.direction ? this.element.height() : this.element.width();
            },
            prev: function () {
                var me = this;
                if (me.index > 0) {
                    me.index--;
                } else if (me.settings.loop) {
                    me.index = me.pagesCount - 1;
                }
                me._scrollPage();
            },
            next: function () {
                var me = this;
                if (me.index < me.pagesCount - 1) {
                    me.index++;
                } else if (me.settings.loop) {
                    me.index = 0;
                }

                me._scrollPage();
            },
            /**
             * 进入到指定索引的页面
             * @param index
             */
            go: function (index) {
                var me = this;
                me._scrollPage();
            },
            /**
             * 针对横屏情况进行页面布局
             */
            _initLayout: function () {
                var me = this;
                var width = (me.pagesCount * 100) + '%',
                    cellWidth = (100 / me.pagesCount).toFixed(2) + '%';
                me.sections.width(width);
                me.section.width(cellWidth).css('float', 'left');
            },
            /**
             * 分页的结构和css样式
             */
            _initPaging: function () {
                var me = this,
                    pagesClass = me.selectors.page.substring(1);
                me.activeClass = me.selectors.active.substring(1);

                var pageHTML = ['<ul class="', pagesClass, '">'].join('');
                for (var i = 0; i < me.pagesCount; i++) {
                    pageHTML += '<li></li>';
                }
                pageHTML += '</ul>';
                me.element.append(pageHTML);
                var pages = me.element.find(me.selectors.page);
                me.pageItem = pages.find('li');
                me.pageItem.eq(me.index).addClass(me.activeClass);

                if (me.direction) {
                    pages.addClass('vertical');
                } else {
                    pages.addClass('horizontal');
                }
            },
            /**
             * 初始化事件
             */
            _initEvent: function () {
                var me = this;
                me.element.on('click', me.selectors.page + ' li', function () {
                    me.index = $(this).index();
                    me._scrollPage();
                });
                me.element.on('mousewheel DOMMouseScroll', function (e) {
                    if (me.canScroll) {
                        var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail; // FF和其他浏览器相反
                        if (delta > 0 && (me.index && !me.settings.loop || me.settings.loop)) {
                            me.prev();
                        } else if (delta < 0 && (me.index < me.pagesCount - 1 ) && !me.settings.loop || me.settings.loop) {
                            me.next();
                        }
                    }
                });
                if (me.settings.keyboard) {
                    $(window).on('keydown', function (e) {
                        var keyCode = e.keyCode;
                        if (37 === keyCode || 38 === keyCode) {
                            me.prev();
                        } else if (39 === keyCode || 40 === keyCode) {
                            me.next();
                        }
                    });
                }
                $(window).resize(function () {
                    var currentLength = me.switchLength(),
                        offset = me.settings.direction ? me.section.eq(me.index).offset().top : me.section.eq(me.index).offset().left;
                    if (Math.abs(offset) > currentLength / 2 && me.index < (me.pagesCount - 1)) {
                        me.index++;
                    }
                    if (me.index) {
                        me._scrollPage();
                    }
                });
                me.sections.on('webkitTransitionEnd msTransitionend mozTransitionend transitionend', function () {
                    me.canScroll = true;
                    if (me.settings.callback && 'function' === $.type(me.settings.callback)) {
                        me.settings.callback(me.index);
                    }
                });
            },
            /**
             * 滑动动画
             */
            _scrollPage: function () {
                var me = this,
                    dest = me.section.eq(me.index).position();
                if (!dest) return;

                me.canScroll = false;

                var transform = ["-webkit-transform", "-ms-transform", "-moz-transform", "transform"],
                    transition = ["-webkit-transition", "-ms-transition", "-moz-transition", "transition"];

                if (_isSupportCss(transform) && _isSupportCss(transition)) {
                    var translate = me.direction ? 'translateY(-' + dest.top + 'px)' : 'translateX(-' + dest.left + 'px)';
                    me.sections.css({
                        transition: 'all ' + me.settings.duration + 'ms ' + me.settings.easing,
                        transform: translate
                    });
                } else {
                    var animateCss = me.direction ? {top: -dest.top} : {left: -dest.left};
                    me.sections.animate(animateCss, me.settings.duration, function () {
                        me.canScroll = true;
                        if (me.settings.callback && 'function' === $.type(me.settings.callback)) {
                            me.settings.callback(me.index);
                        }
                    });
                }
                me.section.eq(me.index).addClass(me.activeClass).siblings().removeClass(me.activeClass);
                if (me.settings.pagination) {
                    me.pageItem.eq(me.index).addClass(me.activeClass).siblings().removeClass(me.activeClass);
                }
            }

        };
        return PageSwitch;
    })();
    // 在jQuery的原型下挂载该方法
    $.fn.PageSwitch = function (options) {
        return this.each(function () {
            var me = $(this),
                instance = me.data('PageSwitch');

            // this is singleton
            if (!instance) {
                instance = new PageSwitch(me, options);
                me.data('PageSwitch', instance);
            }
            if ($.type(options) === 'string') {
                return instance[options]();
            }
        });
    };

    // default config
    $.fn.PageSwitch.defaults = {
        selectors: {
            sections: '.sections', // 滚动区域容器
            section: '.section', // 每一个滚动区域
            page: '.pages', // 分页
            active: '.active' // 分页中当前页的类
        },
        index: 0,
        easing: 'ease',
        duration: 500,
        loop: false,
        pagination: true,
        keyboard: true,
        direction: 'vertical', // horizontal
        callback: ""
    };
})(jQuery);