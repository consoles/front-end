/**
 * Created by gaopengfei on 2016/5/7.
 */

[].forEach.call(document.querySelectorAll('#type dd'), function (dd, index, dds) {
    var _switchRadio = function (index) {
        for (var i = 0; i < dds.length; i++) {
            dds[i].classList.remove('selected');
            if (i === index) {
                dds[i].classList.add('selected');
            }
        }
    };

    dd.addEventListener('click', function (e) {
        e.preventDefault();
        var index = parseInt(e.currentTarget.getAttribute('data-index'));
        _switchRadio(index);
    });
});

