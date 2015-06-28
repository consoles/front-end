/**
 * Created by gaopengfei on 2015/6/28.
 */

window.onload = function () {
    waterfall('main','box');

    // 此处的数据从后台获取(dataInt是一个对象)
    var dataInt = {'data':[{'src':'25.jpg'},{'src':'26.jpg'},{'src':'27.jpg'},{'src':'28.jpg'},{'src':'29.jpg'},{'src':'30.jpg'},{'src':'31.jpg'},{'src':'32.jpg'},{'src':'33.jpg'},{'src':'34.jpg'},{'src':'35.jpg'},{'src':'36.jpg'}]};
    window.onscroll = function () {
        if(checkScrollSlide()){
            // 将数据块渲染到页面的尾部
            var oParent = document.getElementById('main');
            for(var i = 0;i < dataInt.data.length;i++){
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = 'images/' + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box'); // 新添加的元素也要遵守瀑布流
            /* 不要这一句就是无限滚动 */
            //window.onscroll = null;
        }
    }
}
/**
 * 瀑布流函数
 * @param parent 父元素id
 * @param boxClass 盒子的类名
 */
function waterfall(parent,boxClass){

    // 将父元素中所有类名为boxClass的元素取出
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent,boxClass);
    //console.debug(oBoxs.length);

    // 计算整个页面显示的列数（页面宽/盒子的宽）
    var oBoxW = oBoxs[0].offsetWidth;   // 等宽，获取一个盒子的宽度即可
    //console.log('每个盒子的宽度：' + oBoxW);
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    //console.info('列数：' + cols);

    // 设置main的宽度和居中对齐
    oParent.style.cssText = 'width:' + oBoxW * cols + 'px;margin:0 auto';

    var hArr = new Array();                 // 存放每一列（每一个盒子）高度的数组
    for(var i = 0;i < oBoxs.length;i++){
        if(i < cols){
            hArr.push(oBoxs[i].offsetHeight); // 第一行所有盒子的高度
        }else{
            // Math.min.apply(null, [1, 2, 3]) 等价于 Math.min(1, 2, 3),Math.min不支持数组
            /**
             * apply:方法能劫持另外一个对象的方法，继承另外一个对象的属性.
             * Function.apply(obj,args)方法能接收两个参数
             * obj：这个对象将代替Function类里this对象
             * args：这个是数组，它将作为参数传给Function
             * （args-->arguments）
             * @type {number}
             */
            var minH = Math.min.apply(null,hArr);
            var minhIndex = getMinIndex(minH,hArr);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            //oBoxs[i].style.left = oBoxW * index + 'px';
            oBoxs[i].style.left = oBoxs[minhIndex].offsetLeft + 'px';
            hArr[minhIndex] += oBoxs[i].offsetHeight;
        }
    }
    console.debug(hArr);
    console.log(minH);

}

/**
 * 根据类名获取元素
 * @param parent 父元素,如果没有传入父元素，则使用document
 * @param className 类名
 */
function getByClass(parent,className){

    var temp = parent ? parent : document;

    /**
     * 考虑到浏览器兼容性，不推荐以下的写法：
     *
     * return temp.getElementsByClassName(className);
     */

    var result = [],
        oElements = temp.getElementsByTagName('*');

    for(var i = 0;i < oElements.length;i++){
        if(oElements[i].className == className){
            result.push(oElements[i]);
        }
    }

    return result;
}

/**
 * 获取数组中最小元素出现的索引
 * @param minValue 最小元素
 * @param arr数组
 */
function getMinIndex(minValue,arr){

    if(arr.indexOf(minValue)){
        return arr.indexOf(minValue);
    }

    for(var i in arr){
        if(arr[i] == minValue){
            return i;
        }
    }
}

/**
 * 当页面滚动时检测是否满足了加载余下的数据块的条件
 */
function checkScrollSlide(){

    var oParent = document.getElementById('main'),
        oBoxes = getByClass(oParent,'box');

    // 加上自身元素的一半实现未滚到底部就进行加载
    var lastBoxH = oBoxes[oBoxes.length - 1].offsetTop + parseInt(oBoxes[oBoxes.length - 1].offsetHeight / 2);
    console.log(lastBoxH);

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,    // 滚动条距离顶部
        height = document.documentElement.clientHeight || document.body.clientHeight; // 浏览器可视窗口

    console.info('时候需要加载图片？' + (lastBoxH < scrollTop + height));
    return lastBoxH < scrollTop + height;
}