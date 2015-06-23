/**
 * Created by gaopengfei on 2015/6/22.
 */
/**
 * 根据id获取元素
 * @param id
 * @returns {HTMLElement}
 */
function $(id){
    return typeof id==='string'?document.getElementById(id):id;
}
window.onload = function () {
    // 获取鼠标点击或者滑过的标签和要切换的内容
    var titles = $('notice-title').getElementsByTagName('li'),
        divs = $('notice-content').getElementsByTagName('div');

    if(titles.length!=divs.length){
        return;
    }


    // 遍历titles下的所有li
    for(var i = 0;i < titles.length;i++){
        titles[i].id = i;   // 给每一个标签加上索引
        titles[i].onmouseover = function () {
            //alert(this.id);
            for(var j = 0;j < titles.length;j++){
                titles[j].className = '';
                divs[j].style.display = 'none';
            }
            this.className = 'select';
            divs[this.id].style.display = 'block';
        }
    }
}