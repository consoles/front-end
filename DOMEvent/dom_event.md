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