/**
 * Created by gaopengfei on 2016/5/7.
 */

function createTag() {
    var lis = document.getElementById('checkList').getElementsByTagName('li');
    var label;
    for (var i = 0; i < lis.length; i++) {
        label = lis[i].getElementsByTagName('label')[0];
        var bTag = document.createElement('b');
        lis[i].insertBefore(bTag, label);
    }
}
createTag();

[].forEach.call(document.querySelectorAll('li'), function (li) {
    li.addEventListener('click', function (e) {
        e.currentTarget.classList.toggle('selected');
    });
});