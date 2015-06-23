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

window.onload = tab;

function tab(){

    var index = 0;      // 当前高亮显示的页签的索引
    var timer = null;

    // 获取所有的页签和要切换的内容
    var lis = $('notice-title').getElementsByTagName('li'),
        divs = $('notice-content').getElementsByTagName('div');

    if(lis.length == divs.length){

        // 给每一个页签绑定事件
        for(var i = 0;i < lis.length;i++){
            lis[i].id = i;
            lis[i].onmouseover = function () {
                clearInterval(timer);
                //index = this.id;    // 鼠标划过的时候改变高亮的索引为当前页索引
                changeOption(this.id);
            }
            lis[i].onmouseout = function () {
                timer = setInterval(autoPlay,2000);
            }
        }

        if(timer){
            clearInterval(timer);
            timer = null;
        }
        timer = setInterval(autoPlay,2000);


        function autoPlay() {
            index = ++index % lis.length;

            changeOption(index);
        }

        /**
         * 清除其他标签页和内容，高亮显示当前标签页和内容
         */
        function changeOption(curIndex){

            console.error('当前显示的标签页' + curIndex);

            // 清除其他页签高亮和每一个主题内容
            for(var i = 0;i < lis.length;i++){
                lis[i].className = '';
                divs[i].style.display = 'none';
            }

            // 高亮显示当前页签
            lis[curIndex].className = 'select';
            divs[curIndex].style.display = 'block';
            index = curIndex;
        }
    }

}