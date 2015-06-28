/**
 * Created by gaopengfei on 2015/6/28.
 */

window.onload = function () {
    waterfall('main','box');
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
            var indexIndex = getMinIndex(minH,hArr);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            //oBoxs[i].style.left = oBoxW * index + 'px';
            oBoxs[i].style.left = oBoxs[indexIndex].offsetLeft + 'px';
            hArr[indexIndex] += oBoxs[i].offsetHeight;
        }
    }
    console.debug(hArr);
    console.log(minH);

}

/**
 * 根据类名获取元素
 * @param parent 父元素
 * @param className 类名
 */
function getByClass(parent,className){

    // 考虑浏览器兼容性，有了浏览器不支持通过类名获取元素
    if(document.getElementsByClassName){
       return parent.getElementsByClassName(className);
    }

    var result = [],
        oElements = parent.getElementsByTagName('*');

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