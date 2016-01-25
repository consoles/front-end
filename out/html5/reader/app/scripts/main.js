$traceurRuntime.registerModule("../../../../../html5/reader/app/scripts/main.js", [], function () {
    "use strict";
    var __moduleName = "../../../../../html5/reader/app/scripts/main.js";
    (function () {
        var PREFIX = 'html5_reader_';
        var DOM = {
            top_nav: $('#top_nav'),
            icon_back: $('.icon-back'),
            bottom_nav: $('.bottom-navbar'),
            font_button: $('#font_button'),
            font_container: $('.font-container'),
            font_icon: $('#font_button').find('.icon-ft'),
            fiction_container: $('#fiction_container'),
            day_icon: $('#day_icon'),
            night_icon: $('#night_icon'),
            night_day_toggle_button: $('#night_day_toggle_button'),
            large_font_button: $('#large_font_button'),
            small_font_button: $('#small_font_button'),
            pre_button: $('#pre_button'),
            next_button: $('#next_button'),
            menu_button: $('#menu_button'),
            action_mid: $('#action_mid')
        };
        var MOLDS = [{
            index: 0,
            mold: '米白',
            color: '',
            backgroundColor: '#f7eee5',
            dayMold: true
        }, {
            index: 1,
            mold: '纸张',
            color: '',
            backgroundColor: '#e9dfc7'
        }, {
            index: 2,
            mold: '浅灰',
            color: '',
            backgroundColor: '#a4a4a4'
        }, {
            index: 3,
            mold: '护眼',
            color: '',
            backgroundColor: '#283548'
        }, {
            index: 4,
            mold: '夜间',
            color: '',
            backgroundColor: '#0f1410',
            nightMold: true
        }];
        var Util = function () {
            function Util() {
            }

            return ($traceurRuntime.createClass)(Util, {}, {
                StorageGetter: function (key) {
                    return localStorage.getItem(PREFIX + key);
                },
                StorageSetter: function (key, value) {
                    localStorage.setItem(PREFIX + key, value);
                },
                getJSONP: function (url, callback) {
                    $.jsonp({
                        url: url,
                        cache: true,
                        callback: 'duokan_fiction_chapter',
                        success: function (result) {
                            var data = $.base64.decode(result);
                            var json = decodeURIComponent(escape(data));
                            callback(json);
                        }
                    });
                }
            });
        }();
        var Win = $(window);
        var readerModel;
        var renderUI;
        var initFontSize;
        var moldIndex;
        var isNightMold;
        var switchMold = function (index) {
            var mold = MOLDS[index];
            var backgroundColor = mold.backgroundColor;
            DOM.fiction_container.css('background-color', backgroundColor);
            Util.StorageSetter('mold_index', index);
        };
        var setNightMold = function () {
            DOM.night_icon.hide();
            DOM.day_icon.show();
            switchMold(4);
        };
        var setDayMold = function () {
            DOM.day_icon.hide();
            DOM.night_icon.show();
            switchMold(0);
        };

        function ReaderModel() {
            var ChapterId;
            var ChapterTotal;
            var init = function (UIcallback) {
                getFictionInfoPromise().then(function () {
                    return getCurChapterContentPromise();
                }).then(function (data) {
                    return UIcallback && UIcallback(data);
                });
            };
            var getFictionInfo = function (callback) {
                $.getJSON('../data/chapter.json', function (data) {
                    ChapterId = Util.StorageGetter('last_chapter_id');
                    if (ChapterId === null || ChapterId === undefined) {
                        ChapterId = data.chapters[1].chapter_id;
                    }
                    ChapterTotal = data.chapters.length;
                    callback && callback();
                });
            };
            var getCurChapterContent = function (chapterId, callback) {
                $.getJSON(("../data/data" + chapterId + ".json"), function (data) {
                    if (data.result === 0) {
                        var url = data.jsonp;
                        Util.getJSONP(url, function (data) {
                            callback && callback(data);
                        });
                    }
                });
            };
            var getFictionInfoPromise = function () {
                return new Promise(function (revolve, reject) {
                    $.getJSON('../data/chapter.json', function (data) {
                        if (data.result === 0) {
                            ChapterId = Util.StorageGetter('last_chapter_id');
                            if (ChapterId === null || ChapterId === undefined) {
                                ChapterId = data.chapters[1].chapter_id;
                            }
                            ChapterTotal = data.chapters.length;
                            revolve();
                        } else {
                            reject();
                        }
                    });
                });
            };
            var getCurChapterContentPromise = function () {
                return new Promise(function (resolve, reject) {
                    $.getJSON(("../data/data" + ChapterId + ".json"), function (data) {
                        if (data.result === 0) {
                            var url = data.jsonp;
                            Util.getJSONP(url, function (data) {
                                return resolve(data);
                            });
                        } else {
                            reject({msg: '失败!'});
                        }
                    });
                });
            };
            var prevChapter = function (UIcallback) {
                ChapterId = parseInt(ChapterId, 10);
                if (ChapterId <= 1) {
                    return;
                }
                ChapterId--;
                getCurChapterContent(ChapterId, UIcallback);
                Util.StorageSetter('last_chapter_id', ChapterId);
            };
            var nextChapter = function (UIcallback) {
                ChapterId = parseInt(ChapterId, 10);
                if (ChapterId === ChapterTotal) {
                    return;
                }
                ChapterId++;
                getCurChapterContent(ChapterId, UIcallback);
                Util.StorageSetter('last_chapter_id', ChapterId);
            };
            return {
                init: init,
                prevChapter: prevChapter,
                nextChapter: nextChapter
            };
        }

        function RenderBaseFrame(container) {
            var parseChapterData = function (jsonData) {
                var html;
                var jsonObj = JSON.parse(jsonData);
                html = ("<h4>" + jsonObj.t + "</h4>");
                var $__5 = true;
                var $__6 = false;
                var $__7 = undefined;
                try {
                    for (var $__3 = void 0,
                             $__2 = (jsonObj.p)[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
                        var p = $__3.value;
                        {
                            html += ("<p>" + p + "</p>");
                        }
                    }
                } catch ($__8) {
                    $__6 = true;
                    $__7 = $__8;
                } finally {
                    try {
                        if (!$__5 && $__2.return != null) {
                            $__2.return();
                        }
                    } finally {
                        if ($__6) {
                            throw $__7;
                        }
                    }
                }
                return html;
            };
            return function (data) {
                return container.html(parseChapterData(data));
            };
        }

        function EventHandler() {
            var setAndStoreFontSize = function (fontContainer, fontSize) {
                fontContainer.css('fontSize', fontSize);
                Util.StorageSetter('font_size', fontSize);
            };
            var changeFontSize = function (fontSize, larger) {
                var MAX_FONT_SIZE = 20,
                    MIN_FONT_SIZE = 12;
                if (larger && fontSize < MAX_FONT_SIZE) {
                    initFontSize++;
                } else if (!larger && fontSize > MIN_FONT_SIZE) {
                    initFontSize--;
                }
            };
            var toggleNightAndDayMold = function () {
                if (isNightMold === 'true') {
                    setDayMold();
                    isNightMold = 'false';
                } else {
                    setNightMold();
                    isNightMold = 'true';
                }
                Util.StorageSetter('is_night_mold', isNightMold);
            };
            DOM.action_mid.click(function () {
                if (DOM.top_nav.css('display') === 'none') {
                    DOM.top_nav.addClass('slideInDown').show();
                    DOM.bottom_nav.addClass('fadeIn').show();
                } else {
                    DOM.top_nav.hide();
                    DOM.bottom_nav.hide();
                    DOM.font_container.hide();
                    DOM.font_button.removeClass('current');
                }
            });
            DOM.font_button.click(function () {
                if (DOM.font_container.css('display') === 'none') {
                    DOM.font_container.addClass('bounceInUp').show();
                    DOM.font_icon.addClass('current');
                } else {
                    DOM.font_container.hide();
                    DOM.font_icon.removeClass('current');
                }
            });
            DOM.large_font_button.click(function () {
                changeFontSize(initFontSize, true);
                setAndStoreFontSize(DOM.fiction_container, initFontSize);
            });
            DOM.small_font_button.click(function () {
                changeFontSize(initFontSize, false);
                setAndStoreFontSize(DOM.fiction_container, initFontSize);
            });
            DOM.menu_button.click(function () {
                location.href = 'http://dushu.xiaomi.com/#page=toc&id=271049&type=fiction&from=reader&chapter_id=0';
            });
            DOM.pre_button.click(function () {
                readerModel.prevChapter(function (data) {
                    renderUI(data);
                });
            });
            DOM.next_button.click(function () {
                readerModel.nextChapter(function (data) {
                    renderUI(data);
                });
            });
            $('.bk-container').click(function () {
                switchMold($(this).data('mold').index);
            });
            DOM.night_day_toggle_button.click(function () {
                toggleNightAndDayMold();
            });
            DOM.icon_back.click(function () {
                location.href = 'http://dushu.xiaomi.com/#page=book&source_id=301342&source=2';
            });
            Win.scroll(function () {
                DOM.top_nav.hide();
                DOM.bottom_nav.hide();
            });
        }

        function init() {
            (function initMoldData() {
                $('.bk-container').each(function (index) {
                    var mold = MOLDS[index];
                    $(this).data('mold', JSON.stringify(mold));
                });
            }());
            initFontSize = parseInt(Util.StorageGetter('font_size')) || 14;
            moldIndex = parseInt(Util.StorageGetter('mold_index')) || 0;
            isNightMold = Util.StorageGetter('is_night_mold');
            DOM.fiction_container.css('font_size', initFontSize);
            if (isNightMold === 'true') {
                setNightMold();
            } else {
                setDayMold();
            }
            switchMold(moldIndex);
        }

        function main() {
            readerModel = ReaderModel();
            renderUI = RenderBaseFrame(DOM.fiction_container);
            readerModel.init(function (data) {
                renderUI(data);
            });
            EventHandler();
        }

        init();
        main();
    }());
    return {};
});
$traceurRuntime.getModule("../../../../../html5/reader/app/scripts/main.js" + '');
