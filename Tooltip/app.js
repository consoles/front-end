var className = "tooltip-box";

/**
 * 通过id获取元素
 * @param id 元素id
 * @returns {HTMLElement} DOM元素
 */
var getDocID = function (id) {
    return document.getElementById(id);
};

/**
 * 显示提示框
 * @param obj 提示框DOM元素
 * @param id 提示框id
 * @param html 提示的html文档
 * @param width 宽度（可选）
 * @param height 高度（可选）
 * @param className 提示框应该应用的类名
 */
function showTooltip(obj, id, html, width, height, className) {
    if (getDocID(id) == null) {
        var tooltipBox;
        tooltipBox = document.createElement("div");
        tooltipBox.className = className;
        tooltipBox.id = id;
        tooltipBox.innerHTML = html;

        obj.appendChild(tooltipBox);

        tooltipBox.style.width = width ? width + "px" : "auto";
        tooltipBox.style.height = height ? height + "px" : "auto";

        tooltipBox.style.position = "absolute";
        tooltipBox.style.display = "block";

        var left = obj.offsetLeft;
        var top = obj.offsetTop + 20;

        tooltipBox.style.left = left + "px";
        tooltipBox.style.top = top + "px";

        obj.addEventListener("mouseout", function () {
            setTimeout(function () {
                getDocID(id).style.display = "none";
            }, 100);
        });
    } else {
        getDocID(id).style.display = "block";
    }
}

window.onload = function () {

    var parentdiv = getDocID("div");
    var className = "tooltip-box";

    parentdiv.addEventListener("mouseover", function (e) {
        var target = e.target;
        console.log(target);
        if (target.className == "tooltip") {
            var _html;
            var _id;
            var _width;
            switch (target.id) {
                case "weibo":
                    _id = "wb";
                    _html = "关注微博";
                    _width = 200;
                    break;
                case "weixin":
                    _id = "wx";
                    _html = "关注微信";
                    _width = 150;
                    break;
                case "logo":
                    _id = "lg";
                    _html = "<img src='logo.png'>";
                    _width = 230;
                    break;
                case "jikexueyuan":
                    _id = "jkxy";
                    _html = "<iframe src='http://www.baidu.com' width='500' height='300'></iframe>";
                    _width = 500;
                    break;
            }
            showTooltip(target, _id, _html, null, null, className);
        }
    })
};