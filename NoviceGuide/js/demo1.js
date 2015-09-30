/**
 * Created by gaopengfei on 2015/9/30.
 *
 * NodeList对象是一个节点的集合,是由Node.childNodes and the querySelectorAll返回的
 */

var oMask = document.getElementById('mask'),
    oSearch = document.getElementById('searchTip'),
    aStep = oSearch.getElementsByTagName('div'),
    aA = oSearch.getElementsByTagName('a'),
    aClose = oSearch.getElementsByTagName('span');

// 读取cookie
var res = document.cookie.substring(5);
console.log(res);
if (res != 'www.imooc.com') {
    // mask父框 第一单元显示出来
    oMask.style.display = oSearch.style.display = aStep[0].style.display = 'block';

    // 给每一个“下一步”按钮添加事件
    for (var i = 0; i < aA.length; i++) {
        aA[i].index = i;    // 给每一个按钮增加一个索引属性(自定义属性)
        aA[i].onclick = function () {
            this.parentNode.style.display = 'none'; // 让自身的父块隐藏
            // 判断是否是最后一个按钮
            if (this.index < aA.length - 1) {
                aStep[this.index + 1].style.display = 'block';
            } else if (this.index == aA.length - 1) {
                oMask.style.display = oSearch.style.display = 'none';
            }
        }
    }

    // 关闭按钮
    for (var i = 0; i < aClose.length; i++) {
        aClose[i].onclick = function () {
            oMask.style.display = oSearch.style.display = 'none';
        }
    }

    // 写cookie（有效期30day）
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + 30);
    document.cookie = 'name=www.imooc.com;expires=' + oDate;
}


