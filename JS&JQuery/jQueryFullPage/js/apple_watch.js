/**
 * Created by gaopengfei on 2016/1/8.
 */

$(function () {
    $('#fullpage').fullpage({
        verticalCentered: false,
        anchors: ['欢迎页', '简介', '计时', '款式'],
        navigation: true,
        navigationTooltips: ['终于来了', '简单介绍', '精准计时', '个性风格'],
        afterLoad: function (anchorLink, index) {
            console.log(anchorLink, index);
            switch (index) {
                case 1:
                    move('.section1 h1').scale(1.5).end();
                    move('.section1 p').set('margin-top', '5%').end();
                    break;
                case 2:
                    move('.section2 h1').scale(.7).end();
                    break;
                case 3:
                    move('.section3 h1').set('margin-left', '20%').end();
                    move('.section3 p').set('margin-left', '20%').end();
                    break;
                case 4:
                    move('.section4 img.primary').rotate(360).end(function () {
                        move('.section4 img.sport').rotate(360).end(function () {
                            move('.section4 img.edition').rotate(360).end(function () {
                                move('.section4 img.primary').scale(1.3).end(function () {
                                    move('.section4 img.sport').scale(1.3).end(function () {
                                        move('.section4 img.edition').scale(1.3).end();
                                    });
                                });
                            });
                        });
                    });
                    break;
                default :
                    break;
            }
        },
        // 还原
        onLeave: function (index, nextIndex, direction) {
            switch (index) {
                case 1:
                    move('.section1 h1').scale(1).end();
                    move('.section1 p').set('margin-top', '800px').end();
                    break;
                case 2:
                    move('.section2 h1').scale(1).end();
                    break;
                case 3:
                    move('.section3 h1').set('margin-left', '-1500px').end();
                    move('.section3 p').set('margin-left', '1500px').end();
                    break;
                case 4:
                    move('.section4 img.primary').rotate(-360).end();
                    move('.section4 img.sport').rotate(-360).end();
                    move('.section4 img.edition').rotate(-360).end();
                    move('.section4 img.primary').scale(1).end();
                    move('.section4 img.sport').scale(1).end();
                    move('.section4 img.edition').scale(1).end();
                    break;
                default :
                    break;
            }
        },
        afterRender: function () {

        }
    });
});