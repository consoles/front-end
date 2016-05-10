/**
 * Created by gaopengfei on 2016/5/2.
 */

var lis = document.querySelectorAll('li');

var forEach = Array.prototype.forEach;

forEach.call(lis, function (li) {
    li.addEventListener('mouseover', function (e) {
        this.getElementsByTagName('dl')[0].style.display = 'block';
    });
    li.addEventListener('mouseout', function (e) {
        this.getElementsByTagName('dl')[0].style.display = 'none';
    });
});