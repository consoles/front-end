## SVG

### 使用方法

- open directly in the browser
- use `<img src="*.svg"/>` tag to reference
- use `<svg>` tag directly
- use it as CSS's background

### 基本图形和属性

#### 基本图形

`<rect>`,`<circle>`,`<ellipse>`(椭圆),`<line>`,`<polyline>`(折现),`<polygon>`(多边形).
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