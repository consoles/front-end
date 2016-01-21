'use strict';

(function() {

  /**
   * 全局localStorage前缀,避免和其他应用冲突
   * @type {String}
   */
  const PREFIX = 'html5_reader_';

  // cache the selector
  const DOM = {
    top_nav: $('#top_nav'),
    icon_back: $('.icon-back'),
    bottom_nav: $('.bottom-navbar'),

    font_button: $('#font_button'),
    font_container: $('.font-container'),
    font_icon:$('#font_button').find('.icon-ft'),

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

  /**
   * 主题模式
   * @type {Array}
   */
  const MOLDS = [{
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

  class Util {
    static StorageGetter(key) {
      return localStorage.getItem(PREFIX + key);
    }
    static StorageSetter(key, value) {
      localStorage.setItem(PREFIX + key, value);
    }
    static getJSONP(url, callback) {
      $.jsonp({
        url: url,
        cache: true,
        callback: 'duokan_fiction_chapter',
        success: result => {
          let data = $.base64.decode(result);
          let json = decodeURIComponent(escape(data));
          callback(json);
        }
      });
    }
  }

  let Win = $(window);
  let readerModel;
  let renderUI;

  let initFontSize;
  let moldIndex; // 模式索引,参见常亮MOLDS
  let isNightMold;

  /**
   * 模式切换
   */
  let switchMold = (index) => {
    let mold = MOLDS[index];
    let backgroundColor = mold.backgroundColor;
    DOM.fiction_container.css('background-color', backgroundColor);
    Util.StorageSetter('mold_index', index);
  };

  /**
   * 夜间模式显示太阳图标
   */
  let setNightMold = () => {
    DOM.night_icon.hide();
    DOM.day_icon.show();
    switchMold(4);
  };

  let setDayMold = () => {
    DOM.day_icon.hide();
    DOM.night_icon.show();
    switchMold(0);
  };

  /**
   * 实现和阅读器相关的数据交互的方法
   */
  function ReaderModel() {
    let ChapterId;
    let ChapterTotal;
    let init = UIcallback => {

      // Promise
      getFictionInfoPromise()
        .then(
          () => getCurChapterContentPromise()
        )
        .then(
          data => UIcallback && UIcallback(data)
        );

      // callback
      // getFictionInfo(() => {
      //   getCurChapterContent(ChapterId,data => {
      //      UIcallback && UIcallback(data);
      //   });
      // });
    };

    /********************************************************
     *                                                      *
     *                 callback function                    *
     *                                                      *
     * ******************************************************
     */
    let getFictionInfo = callback => {
      $.getJSON('../data/chapter.json', (data) => {
        // 获得章节信息之后的回调
        ChapterId = Util.StorageGetter('last_chapter_id');
        if (ChapterId === null || ChapterId === undefined) {
          ChapterId = data.chapters[1].chapter_id;
        }
        ChapterTotal = data.chapters.length;
        callback && callback();
      });
    };
    let getCurChapterContent = (chapterId, callback) => {
      $.getJSON(`../data/data${chapterId}.json`, data => {
        if (data.result === 0) {
          let url = data.jsonp;
          Util.getJSONP(url, data => {
            callback && callback(data);
          });
        }
      });
    };

    /********************************************************
     *                                                      *
     *                    use ES6 Promise                   *
     *                                                      *
     * ******************************************************
     */
    let getFictionInfoPromise = () => new Promise((revolve, reject) => {
      $.getJSON('../data/chapter.json', data => {
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
    let getCurChapterContentPromise = () => new Promise((resolve, reject) => {
      $.getJSON(`../data/data${ChapterId}.json`, data => {
        if (data.result === 0) {
          let url = data.jsonp;
          Util.getJSONP(url, data => resolve(data));
        } else {
          reject({
            msg: '失败!'
          });
        }
      });
    });

    let prevChapter = UIcallback => {
      ChapterId = parseInt(ChapterId, 10);
      if (ChapterId <= 1) {
        return;
      }
      ChapterId--;
      getCurChapterContent(ChapterId, UIcallback);
      Util.StorageSetter('last_chapter_id', ChapterId);
    };
    let nextChapter = UIcallback => {
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

  /**
   * 渲染基本的UI结构
   * @param {string} container 容器,jQuery选择器
   */
  function RenderBaseFrame(container) {

    let parseChapterData = jsonData => {
      let html;
      let jsonObj = JSON.parse(jsonData);
      html = `<h4>${jsonObj.t}</h4>`;
      for (let p of jsonObj.p) {
        html += `<p>${p}</p>`;
      }
      return html;
    };

    return data => container.html(parseChapterData(data));
  }

  /**
   * 交互的事件绑定
   * touch
   * zepto tap
   * android 4.0之前click事件有300ms的延迟
   * 在这里使用click是为了适应PC
   */
  function EventHandler() {

    /**
     * 设置字体并存储到localStorage
     * @param  {selector} fontContainer 字体容器,jQuery选择器
     * @param  {Number}   fontSize      字体大小
     */
    let setAndStoreFontSize = (fontContainer, fontSize) => {
      fontContainer.css('fontSize', fontSize);
      Util.StorageSetter('font_size', fontSize);
    };

    /**
     * 改变字体大小
     * @param  {Number} fontSize 字体大小
     * @param  {Boolean} larger  是否加大字体
     */
    let changeFontSize = (fontSize, larger) => {

      const MAX_FONT_SIZE = 20,
        MIN_FONT_SIZE = 12;
      if (larger && fontSize < MAX_FONT_SIZE) {
        initFontSize++;
      } else if (!larger && fontSize > MIN_FONT_SIZE) {
        initFontSize--;
      }
    };

    /**
     * 白天夜间模式切换
     */
    let toggleNightAndDayMold = () => {

      if (isNightMold === 'true') {
        setDayMold();
        isNightMold = 'false';
      } else {
        setNightMold();
        isNightMold = 'true';
      }
      Util.StorageSetter('is_night_mold', isNightMold);

    };

    // 点击屏幕中央唤出上下工具栏
    DOM.action_mid.click(() => {

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

    // 唤醒,隐藏字体面板
    DOM.font_button.click(function() {
      if (DOM.font_container.css('display') === 'none') {
        DOM.font_container.addClass('bounceInUp').show();
        DOM.font_icon.addClass('current');
      } else {
        DOM.font_container.hide();
        DOM.font_icon.removeClass('current');
      }
    });

    // 字体大小调整
    DOM.large_font_button.click(() => {
      changeFontSize(initFontSize, true);
      setAndStoreFontSize(DOM.fiction_container, initFontSize);
    });
    DOM.small_font_button.click(() => {
      changeFontSize(initFontSize, false);
      setAndStoreFontSize(DOM.fiction_container, initFontSize);
    });

    // 目录
    DOM.menu_button.click(() => {
      location.href = 'http://dushu.xiaomi.com/#page=toc&id=271049&type=fiction&from=reader&chapter_id=0';
    });

    // 章节切换
    DOM.pre_button.click(() => {
      readerModel.prevChapter(data => {
        renderUI(data);
      });
    });
    DOM.next_button.click(() => {
      readerModel.nextChapter(data => {
        renderUI(data);
      });
    });

    // 切换主题(注意此处this的绑定,不可以使用箭头函数)
    $('.bk-container').click(function() {
      switchMold($(this).data('mold').index);
    });
    // 切换白天和夜间模式
    DOM.night_day_toggle_button.click(() => {
      toggleNightAndDayMold();
    });

    // 返回书架
    DOM.icon_back.click(() => {
      location.href = 'http://dushu.xiaomi.com/#page=book&source_id=301342&source=2';
    });

    // 屏幕滚动的时候,上下工具栏隐藏
    Win.scroll(() => {
      DOM.top_nav.hide();
      DOM.bottom_nav.hide();
    });
  }

  function init() {

    (function initMoldData() {
      // 将mold保存到节点的data属性中,此选择器仅仅在初始化的时候调用,无需cache
      // 由于zepto不支持将对象设置为data属性,此处设置为JSON字符串
      // 此处也可以使用脚本,根据mold对象的background属性填充每个圆的背景色,参见style.css的L129~L144
      // 但是为了性能考虑,并没有采用脚本代替CSS
      $('.bk-container').each(function(index) {
        let mold = MOLDS[index];
        $(this).data('mold', JSON.stringify(mold));
        // $(this).css('background-color', mold.backgroundColor);
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
    readerModel.init(data => {
      renderUI(data);
    });
    EventHandler();
  }

  init();
  main();
}());