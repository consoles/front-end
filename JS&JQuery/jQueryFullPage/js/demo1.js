/**
 * Created by gaopengfei on 2016/1/8.
 */

$(function () {
    $('#fullpage').fullpage({
        sectionsColor: ['red', 'orange', 'yellow', 'blue'],
        // 滚动的时候url的hash变化
        // 定义锚链接的时候，值不要和任意的`id`或者`name`属性相同，尤其是IE下
        // 锚链接的定义不需要加`#`
        anchors: ['page1', 'page2', 'page3', 'page4'],
        continuousVertical: true, // 平滑滚动，不会像loopTop，loopBottom出现跳动
        paddingTop: '200px',
        paddingBottom: '300px',
        fixedElements: '#header, .footer',
        menu: 'fullpageMenu',
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['第一页', '第二页', '第三页', '第四页'],
        showActiveTooltip: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
    });
});