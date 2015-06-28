# 搜索框的制作 #
## `<input/>`标签作为按钮时的交互##
input作为按钮（type为button或者submit）的时候有3种状态：

- 默认状态
- 悬浮状态
- 点击状态

## `<input />` 作为按钮的局限性 ##
- 自闭合标记，不能定义复杂的样式。例如它不能实现如下的图文混排的效果（图文混排的效果通常使用`button`标记）。
![](http://i.imgur.com/AMwN1Mm.jpg)
例如有以下的html代码：


		<input type="button" value="input标记的type属性为button"><img src="icon.jpg"> </input>
		<button>button标记<img src="icon.jpg"></button>
页面的效果为：
![](http://i.imgur.com/NrTcqL8.jpg)