/**
 * Created by gaopengfei on 2015/8/30.
 */

/**
 * 保存数据
 * @param id
 */
function saveData(id) {

    var target = document.getElementById(id);
    var value = target.value;
    var key = new Date().getTime();

    // 以时间作为键存储数据
    localStorage.setItem(key, value);
    alert('笔记保存成功！');
    loadData();

    target.select();
}

/**
 * 加载数据
 * @param id
 */
function loadData() {

    var result = "<table border='1'>";
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var time = new Date();
        time.setTime(parseInt(key));
        result += "<tr><td>" + time.toLocaleDateString() + "</td><td>" + value + "</td></tr>";
    }
    result += "</table>";

    document.getElementById(id).innerHTML = result;
}

/**
 * 清空留言本
 */
function clearData() {

    localStorage.clear();
    alert('笔记已清空！');
    loadData();
}

window.onload = function () {
    loadData();
}