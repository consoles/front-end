/**
 * Created by gaopengfei on 2016/5/2.
 */

var listBtn = document.getElementById('btn_list_toggle'),
    cardBtn = document.getElementById('btn_card_toggle'),

    imgs = document.querySelectorAll('li .content .a-img img');

var forEach = Array.prototype.forEach;

listBtn.addEventListener('click', function (e) {
    e.preventDefault();
    this.className = 'btn-list-on';
    cardBtn.className = 'btn-card-off';

    forEach.call(imgs, function (img) {
        img.src = 'images/small.jpg';
        img.parentNode.classList.add('small');
    });
});
cardBtn.addEventListener('click', function (e) {
    e.preventDefault();
    this.className = 'btn-card-on';
    listBtn.className = 'btn-list-off';
    forEach.call(imgs, function (img) {
        img.src = 'images/big.jpg';
        img.parentNode.classList.remove('small');
    });
});