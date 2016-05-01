var pics = document.querySelectorAll('.picList li');

const COLS_PER_ROW = 3;

Array.prototype.forEach.call(pics, function (pic, index) {

    pic.addEventListener('mouseover', function () {
        var description = this.getElementsByClassName('description')[0];
        description.style.display = 'block';
        if ((index + 1) % COLS_PER_ROW === 0) {
            description.style.left = 'auto';
            description.style.right = '100%';
        }
    });
    pic.addEventListener('mouseout', function () {
        this.getElementsByClassName('description')[0].style.display = 'none';
    });
});