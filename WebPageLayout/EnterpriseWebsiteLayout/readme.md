# 企业网站综合布局实践 #
## 主页的布局 ##
![](http://i.imgur.com/EEI1j94.jpg)
## 焦点图插件myFocus ##
demo地址[http://demo.jb51.net/js/myfocus/tutorials.html](http://demo.jb51.net/js/myfocus/tutorials.html "myfofus教程")

## Tips ##
### 设置图片居中 ###
方法：将图片设置为块级元素，设置其左右的margin为auto即可。

	img{
	      display:block;
	      margin:20px auto;
	}
### 高度自适应 ###
如果一个div是固定高度，那么当内容过多的时候就会溢出div，我们可以设置一个div的最小高度，当内容过多的时候就可以自动拓展该div的高度：
    
	.content{
    	width: 770px;
    	/* 设置最小高度是350px，当内容过多的时候自动增长（IE6需要hacker） */
    	min-height: 350px;
    	_height:350px;  /* IE6Hacker */
	}

