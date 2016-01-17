## SVG

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