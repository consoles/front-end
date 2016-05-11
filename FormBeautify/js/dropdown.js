/**
 * Created by gaopengfei on 2016/5/7.
 */

function $(id) {
    return document.getElementById(id);
}

function showAllProvince() {
    $('allProvince').style.display = 'block';
    $('layer').style.display = 'block';
    $('selectProvince').style.backgroundPosition = '190px -17px';
    $('selectProvince').style.color = '#ccc';
    selectProvince();
}

function hideAllProvince() {
    $('allProvince').style.display = 'none';
    $('layer').style.display = 'none';
    $('selectProvince').style.backgroundPosition = '190px 1px';
    $('selectProvince').style.color = '#000';
}

function selectProvince() {
    var pro = document.querySelectorAll('li');
    var links;
    for (var i = 0; i < pro.length; i++) {
        links = pro[i].getElementsByTagName('a');
        for (var j = 0; j < links.length; j++) {
            links[j].onclick = function () {
                $('selectProvince').innerHTML = this.innerHTML;
                hideAllProvince();
            }
        }
    }
}

$('selectProvince').onclick = showAllProvince;
$('layer').onclick = hideAllProvince;