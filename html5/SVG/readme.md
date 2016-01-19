## SVG

使用xml来描述图形,[这个网站](http://codinginparadise.org/projects/svgweb/samples/demo.html)展示了一些常见的图标的SVG.

### 项目代码说明:

- basic.svg,smile.svg: 单独使用SVG
- css.html:在CSS中使用svg
- img.html:在img标签中使用svg
- nest.html:在html中嵌入svg标签
- viewbox.html:svg视窗,视野,世界
- linearGradient.svg:线性渐变
- radialGradient.svg:径向渐变
- pattern.html:笔刷
- animation1.html:SVG的基于SMIL的动画
- animation2.html:沿着特定轨迹移动的动画
- text.svg,tspan.svg:svg文本
- text_path.html:路径文本
- svg_editor.html:svg编辑器(svg基础语法)
- sin_text.html:符合正弦曲线的文本
- svg_sky.html:漫天星,灯塔,湖面(clip,mask)
- force.html:svg生成力的矢量图(速度,加速度,位移,摩擦力,弹簧模型)

### 使用方法

- open directly in the browser
- use `<img src="*.svg"/>` tag to reference
- use `<svg>` tag directly
- use it as CSS's background

### 基本图形和属性

#### 基本图形

`<rect>`,`<circle>`,`<ellipse>`(椭圆),`<line>`,`<polyline>`(折线),`<polygon>`(多边形,折线的封闭表现形式).
特别的`<path>`可以绘制任意的图形

#### 基本属性

fill,stroke,stroke-width,transform

### 使用JS创建SVG

- Create graphy

`document.createElementNS(ns,tagName)`

*注意:*SVG的定义是在自己的namespace下面,所以创建的时候不能使用`document.createElement()`,
tagName可以是上面的rect,circle

- Add graphy

`element.appendChild(childElement)`

- Set/Get attrs

`element.setAttribute(k,v)`
`element.getAttribute(k)`

### 视野和世界

- 世界是无穷大的
- 视野是观察世界的一个矩形区域

### 颜色,渐变和笔刷

颜色有rgb模式和hsl模式.

由于显示硬件的原理就是rgb,所以rgb颜色更容易被显示硬件所解析,缺点是不符合人类描述颜色的习惯,HSL的三个分量分别表示颜色,饱和度和亮度,格式是:

![HSL颜色模式](http://7xlan5.com1.z0.glb.clouddn.com/images%2Fhsl-color-mode.png)

```bash
hsl(h,s%,l%)
```
取值范围:
h:[0,359]
s,l:[0,100]
优点是符合人类的描述颜色的习惯.

关于透明度,我们可以使用`rgba(r,g,b,a)`和`hsla(h,s%,l%,a)`表示透明度的颜色.也可以使用`opacity`属性
表示元素的透明度,a和opacity的取值范围是[0,1].

我们可以在[这个网站](http://paletton.com/)找到基于hsl的贝塞尔曲线的完美的配色方案.

笔刷(`<pattern>`)主要用于纹理的填充

### SVG中的path

[MDN SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)

![绘制弧](http://img.mukewang.com/5663b1ec00012a6607200450.jpg)

*直线是一次贝塞尔曲线*

### 动画

所谓的动画就是值关于时间的一个函数(timing function)
![动画原理](http://7xlan5.com1.z0.glb.clouddn.com/images%2F%E5%8A%A8%E7%94%BB%E5%8E%9F%E7%90%86.png)

在SVG中动画的实现依赖[SMIL](https://developer.mozilla.org/zh-CN/docs/Web/SVG/SVG_animation_with_SMIL)

### 力导向图(弹簧模型)

![力导向图的原理](http://7xlan5.com1.z0.glb.clouddn.com/images%2Fsvg-script-animation.png)

### 注意点

html标签`<button>`在`form`中的默认是`submit`,点击会自动进行提交,如果想要阻止默认事件需要使用`type="button"`.

`form`中的`<fieldset>`用于将表单进行分组,`<legend>`标签为`fieldset`元素定义标题。

`<label>`标签有下列2种写法:

```html
<!-- one -->
<label>Click me <input type="text" id="User" name="Name" /></label>
<!-- two -->
<label for="User">Click me</label>
<input type="text" id="User" name="Name" />
```

我们可以直接通过表单元素的id的`value`属性取得对应的值:

```html
<input type="text" id="q" value="something">
```
以上的代码可以通过以下的2种方法取值:
```js
document.getElementById('q').value;
q.value;
```

数组的`join()`方法用特定的字符串作为连接符将数组变成字符串,例如:

```js
[1,2,3,4,5].join('-'); // 1-2-3-4-5
```

`concat()`方法用于连结2个数组(原来的数组并不变化)例如:

```js
let arr1 = [1,2,3],
		arr2 = [4,5];

let arr3 = arr1.concat(arr2); // [1,2,3,4,5]
arr1; 												// [1,2,3]		
arr2; 												// [4,5]		
```

*SVG中基于SMIL的动画未来将被废弃,完全可以使用CSS3中的动画来代替.*