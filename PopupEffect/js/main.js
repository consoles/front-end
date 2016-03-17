/**
 * Created by gaopengfei on 2016/3/16.
 *
 * 点击登录框弹出遮罩和登陆框
 * 点击页面的其他位置或者关闭按钮关闭遮罩和模态框
 */

var popup = function () {
    // 页面的宽高(全部)
    const sHeight = document.body.scrollHeight;
    const sWidth = document.body.scrollWidth;

    // 可视区宽高(如果页面没有出现滚动条，则可视区的宽度和页面的宽度相同)
    var wHeight = document.documentElement.clientHeight;

    var oMask = document.createElement('div');
    oMask.id = 'mask';
    oMask.style.height = sHeight + 'px';
    oMask.style.width = sWidth + 'px';

    var oLogin = document.createElement('div');
    oLogin.id = 'login';
    oLogin.innerHTML = '<div class="login-content"><div id="close"></div></div>';
    document.body.appendChild(oLogin);

    // offsetXXX用于获取元素本身的宽高属性(只有此元素位于DOM树中的时候才会取得宽高属性)
    var dWidth = oLogin.offsetWidth;
    var dHeight = oLogin.offsetHeight;

    oLogin.style.left = (sWidth - dWidth) / 2 + 'px';
    oLogin.style.top = (wHeight - dHeight) / 2 + 'px';
    console.log(oLogin.style.top, 'top');
    console.log(oLogin.style.left, 'left');

    document.body.appendChild(oMask);

    var oClose = document.getElementById('close');
    oClose.onclick = oMask.onclick = function () {
        document.body.removeChild(oLogin);
        document.body.removeChild(oMask);
    };
};

window.onload = function () {
    var oBtn = document.getElementById('btnLogin');
    oBtn.addEventListener('click', function () {
        popup();
    });
};
