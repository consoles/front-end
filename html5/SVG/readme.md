## SVG

使用xml来描述图形,![这个网站](http://codinginparadise.org/projects/svgweb/samples/demo.html)展示了一些常见的图标的SVG.

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