## React入门

- basic:React的helloworld
- lifecycle:生命周期
- event_listener:事件监听

[React Get Started](https://facebook.github.io/react/docs/getting-started.html)上指出了最好的学习React的方法是
[JSFiddle](https://jsfiddle.net/reactjs/69z2wepo/)

### JSX

JSX是javascript和xml,是facebook为javascript开发的语法糖.类似的js语法糖还有

- [CoffeeScript](http://coffeescript.org/)
- [TypeScript](http://www.typescriptlang.org/)

### 注意点

- 不能直接在React中使用`class`表示CSS的类,因为React是JS的运行环境.`class`在ES5中是保留字,而在ES6中是关键字.
类名需要使用`className`来代替.

例如:

```js
var Test = React.createClass({
    render:function (){
        return <div className="red">This is just for fun</div>
    }
});

React.render(<Test></Test>,document.getElementById('test'));
```

- 内联样式需要写成样式对象,如下所示:

```js
var Color = React.createClass({
    render:function(){
        return <div style={{background:'green'}}>inline style</div>
    }
});

// 以上的代码可以替换为如下:

Color = React.createClass({
    render:function(){
        var styleObj = {
            background:'yellow',
            fontSize:18px
        };
        return <div style={styleObj}>inline style</div>
    }
});
React.render(<Color></Color>,document.getElementById('color'));
```

样式对象的写法遵循驼峰命名,例如`front-size`应该写作`frontSize`.其实在原声的js中改变样式的写法就遵循这个规范,例如:

```js
document.getElementById('test').style.paddingLeft = '200px';
```

### React Components Lifestyle

![React组件的3个状态](http://7xlan5.com1.z0.glb.clouddn.com/react-life-cycle)
生命周期中的3个状态:

- Mounted:React Components被render解析生成对应的DOM节点,并被插入浏览器的DOM结构的一个过程.
- Update:一个Mounted的React Component被重新render的过程.
- Unmounted:一个mounted的React Component对应的DOM节点被从DOM中移除的过程.

每一个状态React都封装了对应的hook函数.

![React组件的生命周期](http://7xlan5.com1.z0.glb.clouddn.com/react-lifecycle.png)

### React Event Listener

组件监听遵循驼峰命名,每个事件处理程序对应一个EventHandler.