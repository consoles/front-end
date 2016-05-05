/**
 * Created by gaopengfei on 2016/5/3.
 *
 * 放大镜特效的原理：当鼠标在小图片上移动时，大图片向相反的方向移动相应的位置
 *
 * 准备2张图片，一张小图和一张高清大图，监听鼠标在小图上的位置显示大图的相应位置。
 */

;
(function (window, undefined) {
    var container = document.querySelector('.container'),
        smallBox = document.querySelector('.small_box'),
        mask = document.querySelector('.mask'),
        bigBox = document.querySelector('.big_box'),
        zoom = document.querySelector('.zoom'),
        bigBoxImg = document.querySelector('.big_box img');

    // 鼠标移近遮罩，放大镜和大图片显示
    mask.addEventListener('mouseover', function () {
        zoom.style.display = 'block';
        bigBox.style.display = 'block';
    });
    mask.addEventListener('mouseout', function () {
        zoom.style.display = 'none';
        bigBox.style.display = 'none';
    });

    mask.addEventListener('mousemove', function (ev) {

        // 放大镜的左上角相对于小图片的位置,最后减去.zoom的一半是因为鼠标位于zoom的中心点并不是左上角
        // body > .container > .small_box  > .zoom
        var left = ev.clientX - container.offsetLeft - smallBox.offsetLeft - zoom.offsetWidth / 2;
        var top = ev.clientY - container.offsetTop - smallBox.offsetTop - zoom.offsetHeight / 2;

        // 放大镜碰撞检测
        var endLeft = smallBox.offsetWidth - zoom.offsetWidth,
            endTop = smallBox.offsetHeight - zoom.offsetHeight;
        if (left < 0) {
            left = 0;
        } else if (left > endLeft) {
            left = endLeft;
        }
        if (top < 0) {
            top = 0;
        } else if (top > endTop) {
            top = endTop;
        }
        console.log('left:' + left, 'top:' + top);
        zoom.style.left = left + 'px';
        zoom.style.top = top + 'px';

        // 大图-小图的比例关系，存在以下的比例关系
        // left / bigBoxImage.left  = (smallBox.offsetWidth - zoom.offsetWidth) / (bigBoxImage.offsetWidth - bigBox.offsetWidth)
        var percentX = left / (smallBox.offsetWidth - zoom.offsetWidth);
        var percentY = top / (smallBox.offsetHeight - zoom.offsetHeight);
        console.info('percentX:' + percentX, 'percentY:', percentY);

        bigBoxImg.style.left = -percentX * (bigBoxImg.offsetWidth - bigBox.offsetWidth) + 'px';
        bigBoxImg.style.top = -percentY * (bigBoxImg.offsetHeight - bigBox.offsetHeight) + 'px';
    });

})(window);