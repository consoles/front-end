/**
 * Created by gaopengfei on 2015/6/22.
 */
/**
 * 根据id获取元素
 * @param id
 * @returns {HTMLElement}
 */
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}
window.onload = function () {

    var index = 0,      // 标签的索引
        timer = null;   // 定时器

    var lis = $('notice-title').getElementsByTagName('li'),
        divs = $('notice-content').getElementsByTagName('div');

    if(lis.length == divs.length){

        // 遍历所有的页签
        for(var i = 0;i < lis.length;i++){
            lis[i].id = i;
            lis[i].onmouseover = function () {

                //alert(this.id);
                var that = this;    // 用that这个变量来引用当前滑过的li

                // 如果存在准备执行的定时器，就立即清除，只有当前停留时间大于500ms的时候才开始执行
                if(timer){
                    clearTimeout(timer);
                    timer = null;
                }

                // 延迟0.5s执行切换
                timer = setTimeout(function () {
                    for(var j = 0;j < lis.length;j++){
                        lis[j].className = '';
                        divs[j].style.display = 'none';
                    }

                    /*alert(this.id); // 注意此处的this表示的是window对象(因为setTimeout这样的函数是window对象的)
                    alert(this);*/

                    lis[that.id].className = 'select';
                    divs[that.id].style.display = 'block';
                },500);
            }
        }
    }
}