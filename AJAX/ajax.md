# Ajax #

## XMLHttpRequest ##

实例化XML对象：

	var request;
	if(window.XMLHttpRequest){
		request = new XMLHttpRequest(); // IE7+,Firefox,Chrome,Opera,Safari...
	}else{
		request = new ActiveXObject('Microsoft.XMLHTTP'); // IE5,IE6
	}

## Http请求 ##
### 一个完整的http请求一般包含以下的7个步骤： ###

1. 建立TCP连接；
2. Web浏览器向Web服务器发送请求命令；
3. Web浏览器向服务器发送请求头信息；
4. Web服务器做出应答；
5. Web服务器发送应答头信息；
6. Web服务器向浏览器发送数据；
7. Web服务器关闭TCP连接。

### 一个Http请求一般有4部分组成： ###

1. Http请求的方法或者动作，例如是`get`还是`post`请求。
2. 请求的url。
3. 请求头。包含一些客户端环境信息、身份验证信息。
4. 请求体。也就是请求的正文，请求正文中可以包含客户提交的查询字符串信息、表单信息等等。

### 一个Http响应一般有3部分组成： ###

1. 状态码。
2. 响应头。响应头也和请求头一样包含许多有用的信息。例如：服务器类型、日期时间、内容类型和长度。
3. 响应体。也就是响应正文。

### Http状态码由3位数字组成，其中首位数字定义了状态码的类型： ###

- 1xx：信息类。表示收到Web浏览器的请求，正在进一步处理中。
- 2xx：成功。用户请求被正确接收、理解和处理。例如200 OK。
- 3xx：重定向。请求没有成功，客户端必须采取进一步的动作。
- 4xx：客户端错误。表示客户端提交的请求有误。例如404 NOT FOUND。
- 5xx：服务器错误。表示服务器不能完成对请求的处理。例如500。

### 使用XHR发送请求 ###
- `open(method,url,async)`
- `send(data)`

----------

	request.open('GET','get.jsp',true);
	request.send();
	
	request.open('POST','post.jsp',true);
	request.send();
	
	request.open('POST','create.jsp',true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoding');
	request.send('name=王二狗&sex=男'); 

### 使用XHR取得响应 ###
- `responseText`:获得字符串形式的响应数据。
- `responseXML`:获得XML形式的响应数据。
- `status`和`statusText`：以数字和文本形式返回HTTP状态码。
- `getAllResponseHeader()`：获取所有的响应报头。
- `getResponseHeader(field)`:查询响应中的的某个字段的值。
- `readyState`属性:
	- 0:请求未初始化，open还没有调用；
	- 1:服务器连接已经建立，open已经调用了；
	- 2:请求已接受，也就是收到头信息了；
	- 3:请求处理中，也就是接收到响应主体了；
	- 4:请求已完成，且响应已就绪——也就是说响应完成了。

----------

	var request = new XMLHttpRequest();
	request.open('GET','get.jsp',true);
	request.send();
	request.onreadystatechange = function () {
		if(request.readyState === 4 && request.status === 200){
			// 做一些事情
		}
	}

## JSON的解析 ##
![](http://i.imgur.com/MffTUgb.jpg)
一般使用第二种方式，因为第一种方式不进行json语法的检查，如果含有json数据中包含恶意的js代码（例如`window.location`到一个恶意站点）。
### Ajax跨域 ###
- 一个域名地址的组成：
![](http://i.imgur.com/DFn8MzN.jpg)

- 当协议、子域名、主域名、端口号中任意一个不相同的时候都叫做不同域；
- 在不同域之间相互请求资源就叫做跨域。例如:`htttp://www.abc.com/index.html`请求`http://www.def.com/service.do`.
- 在例如我们在浏览器输入：`http://localhost/Ajax/jquery_ajax.html`,而这个页面中有一个ajax是这样写的：

		$.ajax({
			type:'GET',
			// 垮域请求
			url:'http://127.0.0.1/Ajax/Employee.do?id=' + $('#id').val(),
			dataType:'json',
			success:function(data){
				if(data.success)
					$('#queryResult').html(data.msg);
				else
					$('#queryResult').html('错误：' + data.msg);
			},
			error:function(jqXHR){
				alert('发生错误！' + jqXHR.status); // 404等状态码
			}
		});

虽然127.0.0.1对应localhost，但是它们还是属于不同的域，将会出现以下的错误：
![](http://i.imgur.com/sgZJAvh.jpg)
>javascript出于安全方面的考虑，不允许跨域调用其他页面的对象。因为javascript同源策略的限制，a.com下的js无法操作b.com或者是c.a.com域名下的对象。

#### 主域名和子域名 ####
![](http://i.imgur.com/g93XCoS.jpg)

#### 跨域请求的处理 ####
### 方式一：代理 ###
- 通过同域名的web服务器创建一个代理：
- 北京服务器（域名：www.beijing.com）、上海服务器（域名：www.shanghai.com）；
- 比如在北京的web服务器的后台（www.beijing.com/proxy-shanghaiservice.do）来调用上海服务器（www.shanghai.com/service.do）的服务，然后再把响应结果返回给前端，这样前端调用北京同域名的服务就和调用上海的服务效果相同了。

### 方式二：JSONP ###
只能对get请求进行处理。
在`www.aaa.com`页面中：

	<script src="http://www.bbb.com/jsonp.js"></script>
	<script>
		function jsonp (json) {
			alert(json["name"]);
		}
	</script>
在`www.bbb.com`页面中：

    jsonp({'name':'洪七公','age':24});

### 方式三：使用XHR2 ###
- html5提供了XMLHttpRequest Level2已经实现了跨域访问和其他的新功能。
- IE10以下的版本不支持。
- 在服务端设置响应头为：`Access-Control-Allow-Origin:*`和`Access-Control-Allow-Methods:POST,GET`

