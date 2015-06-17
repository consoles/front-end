/**
 * Created by gaopengfei on 2015/6/17.
 */
window.onload = function () {
    var box = document.getElementById('divselect'),
        title = box.getElementsByTagName('cite')[0],
        menu = box.getElementsByTagName('ul')[0],
        as = box.getElementsByTagName('a'),
        index = -1;

    // 点击三角时
    title.onclick = function (event) {
        stopPropagation();
        menu.style.display = 'block';
    }

    // 滑过滑过、离开、点击每个选项时
    for (var i = 0; i < as.length; i++) {
        as[i].onmouseover = function () {
            this.style.background = '#345';
        }
        as[i].onmouseout = function () {
            this.style.background = '#fff';
        }
        as[i].onclick = function (event) {
            menu.style.display = 'none';
            title.innerHTML = this.innerHTML;
            stopPropagation();
        }
    }

    // 点击页面空白处时
    document.onclick = function () {
        menu.style.display = 'none';
    }

    // 键盘事件
    document.onkeyup = function (event) {
        event = event || window.event;
        for (var i = 0; i < as.length; i++) {
            as[i].style.background = 'none';
        }

        if (event.keyCode == 40) {
            index++;
            if (index >= as.length) index = 0;

            as[index].style.background = '#345';
        }
        if (event.keyCode == 38) {
            index--;
            if (index < 0) index = as.length - 1;
            as[index].style.background = '#345';
        }
        if (event.keyCode == 13 && index != -1) {

            title.innerHTML = as[index].innerHTML;
            menu.style.display = 'none';
            index = -1;
        }
    }

    function stopPropagation(event) {
        event = event || window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}