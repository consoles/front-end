## 一些常见的炫酷的h5单页

[腾讯ISU](http://isux.tencent.com/great-mobile-h5-pages.html)

[参考案例](http://ue.baidu.com/2014/)

产品经理

PM(Product Manager)
MRD(Market Requirements Document)

美术
UI-界面视觉设计(User Interface)
UE-用户体验设计(User Experience)

技术经理
PM(Project Manager)

前端开发
FE(FrontEnd development engineer)

后端开发
RD(Research Developer)
BE(BackEnd)

测试
QA(Quality Assessment)

运维
OP(Operate)

[设计图标注工具markman](http://www.getmarkman.com/)

### jQuery关于控制台调试的一些技巧

例如我们给一个元素绑定了事件：

```js
$('#searchBox').click(function(){
    console.log('click');
});
```

在控制台中我们可以这样触发此事件：

```js
$('#searchBox').trigger('click');
```
