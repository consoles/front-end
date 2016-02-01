## html5 canvas

### category

- line.html:线条以及线条的属性
- rectangle.html:矩形、描边和填充
- arcTo.html:arcTo函数测试
- clip.html：剪切
- globalAlpha.html:全局透明度
- globalCompositeOperation.html:多个图形叠加的效果
- interaction.html：给canvas添加鼠标交互
- linearGradient.html：线性渐变
- moon.html：使用canvas绘制一轮弯月
- path.html:使用非零环绕原则绘制剪纸的镂空效果
- pattern.html：使用canvas创建笔刷工具，批量复制纹理
- radialGradient.html：径向渐变
- ring.html：使用非零环绕原则绘制圆环的镂空效果
- round_rectangle.html：圆角矩形的绘制
- star.html：绘制星星
- stars.html：绘制满天星空，月亮和大地
- text.html:文字的渲染
- tangram.html：绘制七巧板
- ellipse.html：canvas兼容性的检测以及context接口的扩充

### summary

canvas是基于状态的绘制。

```js
ctx.beginPath();
ctx.lineTo(100,100);

// 以下的代码和上面的等价
ctx.moveTo(100,100);
```

当我们需要绘制一个需要描边的填充图形的时候应该先填充颜色，再进行描边，否则填充颜色会覆盖部分的描边。

### 线条的属性

lineCap，一个线条两端的形状，取值有：

- butt(default)
- round
- square

lineJoin，线条交点的形状，取值有：

- miter(default)：尖角
- bevel：斜截
- round

当且仅当`lineJoin`的属性为`miter`的时候有`miterLimit`属性：

![miterLimit](http://7xlan5.com1.z0.glb.clouddn.com/canvas-miterLimit.png)

当超过了miterLimit的值后将显示为`beval`在实际的绘图中我们很难得到`miterLimit`的确定值，我们只有常见的经验值10。

### 使用canvas绘制五角星

![canvas五角星](http://7xlan5.com1.z0.glb.clouddn.com/canvas_star.png)

### canvas中的图形变换

在计算机图形学中绘制任何图形都建议先绘制出轮廓，然后采用图形变换的方式改变位移，旋转角度等等来打坐最终的效果。基本的图形变换有3种：

- translate
- rotate
- scale

canvas中我们可以调用`save()`进行图形状态的保存，之后调用`restore()`将会回到`save()`函数调用之前的状态。也就是说：`save()`和`restore()`之间的代码具有局部作用范围。

`scale()`函数具有副作用，不仅可以改变图像的大小，图像的其他属性（例如：边框、坐标都进行的缩放）

实际上图形变化*是对图形的所有顶点进行一次的再计算，这个变换是通过变换矩阵来完成的。*

![二维图形变换矩阵](http://7xlan5.com1.z0.glb.clouddn.com/canvas-martix.png)

实际上图形的初始位置是一个单位矩阵:

$ \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} $

canvas的矩阵变换的函数是`transform`，可以接收以上6个参数。该函数具有**级联效果**。同理，如果多次变换之后我们不知道变换到了那个坐标，可以使用`setTransform`函数直接设置变换矩阵，前面的变换矩阵将失效。

### 填充样式（fillStyle）

fillStyle除了可以接收颜色值，还可以使用渐变：

渐变分为线性渐变和径向渐变，前者定义在渐变线的基础上，而后者定义在两个同心圆的基础上。

```js
// 线性
var grd = context.createLinearGradient(xstart,ystart,xend,yend);
grd.addColorStop(stop,color);

// 径向
var grd = context.createRadialGradient(x0,y0,r0,x1,y1,r1);
grd.addColorStop(stop,color);
```

使用`createPattern(img,repeat-style)`可以使用图片或者另外一个canvas画布或者video进行填充，repeat-style有4种：

- no-repeat
- repeat-x
- repeat-y
- repeat

### 曲线的绘制

![绘制圆角矩形](http://7xlan5.com1.z0.glb.clouddn.com/canvas_corner_rectangle.png)

![canvas arcTo函数](http://7xlan5.com1.z0.glb.clouddn.com/canvas_arcTo.png)

*注意：起点是(x0,y0),而(x1,y1)和(x2,y2)是控制点用于组成辅助线找到切点*

![使用canvas绘制一角弯月](http://7xlan5.com1.z0.glb.clouddn.com/canvas_moon.png)

二次贝塞尔曲线有3个点组成，一个开始点，一个结束点，一个控制点。曲线的形状完全由控制点决定。参见：[二次贝塞尔曲线实例演示](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/quadratic-curve.html)

由于贝塞尔二次曲线仅有一个控制点，绘制的形状具有局限性，例如无法绘制波浪线。三次贝塞尔曲线具有2个控制点。参见[三次贝塞尔曲线实例演示](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/bezier-curve.html)

### canvas文字渲染

```js
ctx.font = 'bold 40px Arial';
ctx.fillText(string,x,y);
```

### 文本对齐

textAlign(水平)、textBaseline(垂直)

### 文本度量

我们可以使用`context.measureText(text).width`取得绘制文本的宽度。

### 阴影

> context.shadowColor,context.shadowOffsetX,context.shadowOffsetY,context.shadowBlur

[globalCompositeOperation](http://www.w3school.com.cn/tags/canvas_globalcompositeoperation.asp)用于指定两个图形之间叠加的效果。

### 非零环绕原则

使用[非零环绕原则](http://blog.csdn.net/freshforiphone/article/details/8273023)可以绘制出折纸的效果。

### canvas未来之旅

[W3C canvas文档](http://www.w3.org/TR/2dcontext/)
[WhatWG html5文档](https://html.spec.whatwg.org/multipage/scripting.html#the-canvas-element)

扩充canvas的context接口只需要在原型上添加方法即可：

```js
CanvasRenderingContext2D.prototype.drawStar = function (r, R, x, y, rotate) {

    this.beginPath();
    for (var i = 0; i < 5; i++) {
        // big circle
        this.lineTo(Math.cos((18 + i * 72 - rotate) / 180 * Math.PI) * R + x, -Math.sin((18 + i * 72 - rotate) / 180 * Math.PI) * R + y);
        // small circle
        this.lineTo(Math.cos((54 + i * 72 - rotate) / 180 * Math.PI) * r + x, -Math.sin((54 + i * 72 - rotate) / 180 * Math.PI) * r + y);

    }
    this.closePath();
    this.stroke();
};

// call
context.drawStar(r, R, x, y, rotate)
```

###其他canvas图形库

[ExplorerCanvas](https://github.com/arv/explorercanvas)库可以在老式浏览器上运行canvas
[Rgraph](https://roopons.com.au/wp-content/plugins/viral-optins/js/rgraph/) canvas图表库
[canvas plus](https://code.google.com/archive/p/canvasplus/)一个更好用的canvas库
[artisanjs](http://artisanjs.com/) 一个更好用的图形库