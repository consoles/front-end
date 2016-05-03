/**
 * Created by gaopengfei on 2016/5/2.
 */

var toolTipBoxClass = 'tooltip-box';

var isIE = navigator.userAgent.indexOf('MSIE') > -1;

var demo = document.getElementById('demo');

/**
 *
 * @param obj ToolTip超链接元素
 * @param id ToopTip提示框id
 * @param html ToolTip提示框html
 * @param width optional
 * @param height optional
 */
function showToolTip(obj, id, html, width, height) {
    var toolTip = document.getElementById(id);
    if (!toolTip) {
        // 不存在，创建之
        var toolTipBox;
        toolTipBox = document.createElement('div');
        toolTipBox.id = id;
        toolTipBox.className = toolTipBoxClass;
        toolTipBox.innerHTML = html;
        obj.appendChild(toolTipBox);

        toolTipBox.style.width = width ? width + 'px' : 'auto';
        toolTipBox.style.height = height ? height + 'px' : 'auto';
        if (!width && isIE) {
            // ie不支持width为auto
            toolTipBox.style.width = toolTipBox.offsetWidth;
        }
        toolTipBox.style.position = 'absolute';
        toolTipBox.style.display = 'block';

        var left = obj.offsetLeft;
        var top = obj.offsetTop + 20;

        // left:不让提示框超出浏览器
        if (left + toolTipBox.offsetWidth > document.body.clientWidth) {
            var demoLeft = demo.offsetLeft;
            left = document.body.clientWidth - toolTipBox.offsetWidth - demoLeft;
            if (left < 0) {
                left = 0;
            }
        }

        toolTipBox.style.left = left + 'px';
        toolTipBox.style.top = top + 'px';

        obj.addEventListener('mouseleave', function () {
            setTimeout(function () {
                toolTipBox.style.display = 'none';
            }, 300);
        });
    } else {
        toolTip.style.display = 'block';
    }
}

demo.addEventListener('mouseover', function (e) {
    var target = e.target;
    if (target.className === 'tooltip') {
        var _html, _id, _width;
        switch (target.id) {
            case "tooltip1":
                _id = "t1";
                _html = "中华人民共和国";
                break;
            case "tooltip2":
                _id = "t2";
                _html = "美国篮球职业联赛";
                break;
            case "tooltip3":
                _id = "t3";
                _html = "<h2>春晓</h2><p>春眠不觉晓，</p><p>处处闻啼鸟。</p><p>夜来风雨声，</p><p>花落知多少。</p>";
                _width = 100;
                break;
            case "tooltip4":
                _id = "t4";
                _html = '<img src="../images/1.jpg" width="500" />';
                _width = 520;
                break;
            case "tooltip5":
                _id = "t5";
                _html = '<div id="mycard"><img src="../images/2.jpg" alt=""/><p><strong>昵称一定要长</strong></p><p>我的简介我的简介</p></div>';
                _width = 300;
                break;
            case "tooltip6":
                _id = "t6";
                _html = '<iframe src="http://www.imooc.com/" width="480" height="300"></iframe>';
                _width = 500;
                break;
            default:
                return false;
        }
        showToolTip(target, _id, _html, _width);
    }
});