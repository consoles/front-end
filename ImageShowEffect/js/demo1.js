/**
 * Created by gaopengfei on 2016/5/1.
 */

var pics = document.querySelectorAll('.picList .pic');

const aHeight = 160;

Array.prototype.forEach.call(pics, function (pic) {
    pic.addEventListener('mouseover', function () {
        this.getElementsByTagName('a')[0].style.top = 0;
    });
    pic.addEventListener('mouseout', function () {
        this.getElementsByTagName('a')[0].style.top = aHeight + 'px';
    });
});