## html5开发阅读器

### User Guide

```bash
$ cd reader && bower install && npm install
```

### 技术点分析

使用Base64格式的图片制作icon

```css
background:url(data:image/png;base64,{img_data})
```

使用base64图片的原因是可以减少http请求数目,由于base64图片
是未经过压缩的比原图体积更大.维护不方便(不能直接看到图片)

base64图片和CSS3都可以制作icon,取舍的依据主要是,CSS3比较容易制作形状规则的icon

html5为跨域实现提供了新的解决方案*Post Message*

html5中的`window.performance.timing`可以用来监控页面的性能

[MDN html5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

字体图标也可以制作ico.

### 关于移动端性能优化的几个建议

减少或者避免repaint(重绘)和reflow(回流)

回流(元素的位置发生改变)的代价高于重绘(元素的颜色发生改变),可以使用CS3的动画来进行性能优化

[Animate.css](https://daneden.github.io/animate.css/)提供了一个CS3动画库解决了在PC时代依靠定时器才可以实现的动画

以上可以归纳为*减少对DOM元素的操作*

Http头中的`ETag`相当于文件的M5标识,可以用来缓存控制

不要给非`static`定位的元素(absolute,relative)增加CSS3动画,性能会成倍降低.

适当使用硬件加速(GPU),例如使用`canvas`绘制图片会触发硬件加速

如何组织异步代码,ES6提供了2种机制:

ES6 generator
ES6 Promise

本项目命名规范:

- id如果是多个单词,中间使用下划线连接
- class如果有多个单词,中间使用横线连接
- 当一个元素既有id又有class的时候,id在前,class在后
- 其他变量遵循驼峰命名

### 遇到的那些坑

- 页面无法滚动:错误将`html`的`overflow-x`属性用作了`overflow`
- ES6中的箭头函数中的`this`绑定是唯一的.在使用类jQuery的库绑定事件的时候一定要注意,参见[360 奇舞团](http://www.75team.com/archives/504)
- 改变主题的时候无法切换背景颜色,具体表现是给`body`元素加一个内联样式`background-color`没有达到应该的效果,找了半天居然是同时要设置`body`和`#fiction_container`的样式.
- 注意:`localStorage`中存储的*键值对都是字符串*,所以存储`boolean`类型的值将被转化为`'true'`或者`'false'`,由于这两个值都不是空字符串,所以会被认为是`true`,在设置白天和夜间的标记的时候坑了好长时间.关于字符串和`boolean`类型的转化参见[ITeye](http://mowengaobo.iteye.com/blog/832330)

### TODO
