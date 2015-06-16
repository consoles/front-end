# DOM事件 #
## 事件流 ##
在浏览器发展到IE4.0的之后对于事件的处理出现了2种应对方案。

- IE的事件冒泡流。事件最开始由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到最不具体的那个节点（文档）。
- Netscape的事件捕获流。与事件冒泡流截然相反。不太具体的节点应该更早接收到事件，而最具体的节点最后接收到事件。IE9、Chrome、Firefox都支持此事件流。

## 事件处理程序 ##
### HTML事件处理程序 ###
事件直接加载`html`结构中。例如：
    
	<body>
	    <div id="div">
	        <input type="button" value="按钮" id="btn" onclick="alert('hello')"/>
	    </div>
	</body>
或者

	<!DOCTYPE html>
	<html>
	<head lang="en">
	    <meta charset="UTF-8">
	    <title>事件流</title>
	    <script>
	        function showMessage(){
	            alert('hello!');
	        }
	    </script>
	</head>
	<body>
	    <div id="div">
	        <input type="button" value="按钮" id="btn" onclick="showMessage()"/>
	    </div>
	</body>
	</html>

### DOM 0级事件处理程序 ###
较传统的方式：把一个函数赋值给一个事件处理程序的属性。用的比较多的方法，简单、具有跨浏览器的优势。

### DOM 2级事件处理程序 ###
DOM2级事件定义了2个方法：用于处理指定和删除事件处理程序的操作`addEventListener()`和`removeEventListener()`.接收3个参数：要处理的事件名、作为事件处理程序的函数、布尔值（为`true`表示在事件捕获阶段调用事件处理程序，`false`表示在事件冒泡阶段调用事件处理程序，一般采用的是事件冒泡所以传递的是`false`）

### IE事件处理程序（兼容IE8等） ###
- `attachEvent()`添加事件
- `detachEvent()`删除事件
- 以上2个方法接收相同的2个参数。事件处理名称和事件处理函数。

### 跨浏览器事件处理程序 ###
封装成一个对象，对外提供统一的接口。在对象内部根据浏览器的不同提供不同的实现。

## 事件对象 ##
在触发DOM上的事件的时候都会产生一个对象，事件对象`event`。
### DOM中的事件对象 ###
- `type`属性：用于获取事件类型（例如click）；
- `target`属性：获取事件目标（给哪个元素加的事件）；
- `stopPropagation()`方法：阻止事件冒泡；
- `preventDefault()`方法：阻止事件的默认行为，例如a标签

### IE事件对象 ###
- `type`属性：用于获取事件类型（例如click）；
- `srcElement`属性：获取事件的目标；
- `cancleBubble`属性：设置为true用于阻止事件冒泡；
- `returnValue`属性：默认为true，设置为false就表示阻止事件的默认行为。

## 键盘事件 ##
发微博的时候提示还能够输入多少字。

- `keyDown`：按下键盘上的任意键触发此事件，如果按住不放的话会重复触发此事件。
- `keyPress`:当用户按住键盘上的字符键时触发，如果按住不放的话，会重复触发此事件。
- `keyUp`:当用户释放键盘上的键时触发。

## Q&A： ##
- IE10以前的浏览器不支持`document.getElementsByTagName()`方法。
- 鼠标光标的位置可以使用`clientX`和`clientY`两个属性来指定。
- 任何鼠标可以拖动的元素都要有绝对定位。
- `offsetTop`和`offsetLeft`可以获取元素和浏览器窗口的上距离和左边的距离。