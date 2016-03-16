/**
 * Created by gaopengfei on 2016/3/13.
 */

(function () {

    'use strict';

    const DEFAULT_SIDEBAR_ID = 'sidebar';
    const DEFAULT_CLOSE_BAR_ID = 'closeBar';
    const CONTENT_ID_SUFFIX = '_content';

    /**
     * 菜单栏
     * @param menuBarId 菜单栏id
     * @constructor
     */
    var Menubar = function (menuBarId) {
        this.element = document.getElementById(menuBarId) || document.querySelector('#sidebar ul');
        this.element.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        this.state = 'allClosed';

        var _this = this;
        this.currentOpenedMenuContent = null;
        var forEach = Array.prototype.forEach;
        this.menuList = document.querySelectorAll('#sidebar ul > li');
        forEach.call(this.menuList, function (menu) {
            menu.addEventListener('click', function (event) {
                var menuContentElement = document.getElementById(event.currentTarget.id + CONTENT_ID_SUFFIX);
                if (_this.state === 'allClosed') {
                    console.log('打开' + menuContentElement.id);
                    menuContentElement.style.top = 0;
                    menuContentElement.style.left = '-85px';
                    menuContentElement.className = 'nav-content';
                    menuContentElement.classList.add('menuContent-move-right');
                    _this.state = 'hasOpened';
                    _this.currentOpenedMenuContent = menuContentElement;
                } else {
                    console.log('关闭' + _this.currentOpenedMenuContent.id);
                    //_this.currentOpenedMenuContent.className = 'nav-content';
                    //_this.currentOpenedMenuContent.style.top = 0;
                    //_this.currentOpenedMenuContent.style.left = '35px';
                    //_this.currentOpenedMenuContent.classList.add('menuContent-move-left');
                    _this.close();

                    console.info('current:', _this.currentOpenedMenuContent.id, 'next:', menuContentElement.id);

                    if (_this.currentOpenedMenuContent.id !== menuContentElement.id) {
                        console.log('打开' + menuContentElement.id);
                        menuContentElement.className = 'nav-content';
                        menuContentElement.style.top = '250px';
                        menuContentElement.style.left = '35px';
                        menuContentElement.classList.add('menuContent-move-up');
                        _this.state = 'hasOpened';
                        _this.currentOpenedMenuContent = menuContentElement;
                    } else {
                        _this.state = 'allClosed';
                    }
                }
            });
        });
        this.menuContentList = document.querySelectorAll('.nav-content > div.nav-con-close');
        forEach.call(this.menuContentList, function (menuContent) {
            menuContent.addEventListener('click', function (event) {
                var menuContent = event.currentTarget.parentNode;
                menuContent.className = 'nav-content';
                menuContent.style.top = 0;
                menuContent.style.left = '35px';
                menuContent.classList.add('menuContent-move-left');
                _this.state = 'allClosed';
            });
        });
    };
    Menubar.prototype.close = function () {
        this.currentOpenedMenuContent.className = 'nav-content';
        this.currentOpenedMenuContent.style.top = 0;
        this.currentOpenedMenuContent.style.left = '35px';
        this.currentOpenedMenuContent.classList.add('menuContent-move-left');
        this.state = 'allClosed';
    };

    /**
     * 使用大写定义构造函数是一个规范
     * @param elementId 侧边栏的id
     * @param closeBarId 关闭按钮id
     * @constructor
     */
    var Sidebar = function (elementId, closeBarId) {
        this.state = 'opened';
        this.element = document.getElementById(elementId || DEFAULT_SIDEBAR_ID);
        this.closeBarElement = document.getElementById(closeBarId || DEFAULT_CLOSE_BAR_ID);

        this.menubar = new Menubar();

        var _this = this;
        this.element.addEventListener('click', function (event) {
            // 通过闭包访问外面的变量
            if (event.target !== _this.element) {
                _this.triggerSwitch();
            }
        });
    };
    Sidebar.prototype.close = function () {
        console.log('close sidebar');
        this.element.style.left = 0;
        this.closeBarElement.style.left = 0;
        this.element.className = 'sidebar-move-left';
        this.closeBarElement.className = 'closeBar-move-right';
        this.state = 'closed';
        // 侧栏关闭的时候同时关闭打开的标签栏
        menuBar.close();
    };
    Sidebar.prototype.open = function () {
        console.log('open sidebar');
        this.element.style.left = '-120px';
        this.closeBarElement.style.left = '160px';
        this.element.className = 'sidebar-move-right';
        this.closeBarElement.className = 'closeBar-move-left';
        this.state = 'opened';
    };
    Sidebar.prototype.triggerSwitch = function () {
        console.warn(this);
        if (this.state === 'opened')
            this.close();
        else if (this.state === 'closed')
            this.open();
    };

    var sidebar = new Sidebar();
    var menuBar = new Menubar();
})();