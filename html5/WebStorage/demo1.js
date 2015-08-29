/**
 * Created by gaopengfei on 2015/8/29.
 */

/**
 * =============================================================
 *              清除WebStorage可以清除浏览器缓存
 * =============================================================
 */

/**
 * 保存数据到sessionStorage（仅当前会话）
 * @param id 元素id
 */
function saveDataToSessionStorage(id) {

    var target = document.getElementById(id);
    var content = target.value;

    // 保存数据（key-->value）
    sessionStorage.setItem("message", content);
}

/**
 * 从sessionStorage读取数据
 * @param id 元素id
 */
function loadDataFromSessionStorage(id) {

    var target = document.getElementById(id);

    // 通过key得到value
    var content = sessionStorage.getItem("message");
    target.innerHTML = content;
}

/**
 * 保存数据到localStorage（永久保存）
 * @param id
 */
function saveDataToLocalStorage(id) {

    var target = document.getElementById(id);
    var content = target.value;

    // 保存数据（key-->value）
    localStorage.setItem("message", content);
}

/**
 * 从localStorage读取数据
 * @param id 元素id
 */
function loadDataFromLocalStorage(id) {

    var target = document.getElementById(id);

    // 通过key得到value
    var content = localStorage.getItem("message");
    target.innerHTML = content;
}