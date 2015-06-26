window.onload = function(){
	document.getElementById('query').onclick = function(){
		
		// 发送查询请求并处理
		var request = new XMLHttpRequest();
		request.open("GET","Employee.do?id=" + document.getElementById('id').value);
		request.send();
		request.onreadystatechange = function(){
			if(request.readyState === 4){
				if(request.status === 200){
					
					console.info(request.responseText);	// 打印服务器端获得的json字符串
//					document.getElementById('queryResult').innerHTML = request.responseText;
					// 解析服务端发送的json字符串
					var data = JSON.parse(request.responseText);
					if(data.success){
						document.getElementById('queryResult').innerHTML = data.msg;
					}else{
						document.getElementById('queryResult').innerHTML = '<b>出现错误</b>' + data.msg;
					}
					
				}else{
					alert('发送错误！' + request.status);
				}
			}
		};
	};
	
	document.getElementById('insert').onclick = function(){
		
		// 发送查询请求并处理
		var request = new XMLHttpRequest();
		request.open("POST","Employee.do",true);
		var data = "name=" + document.getElementById('name').value + 
				   "&sex=" + document.getElementById('sex').value +
				   "&job=" + document.getElementById('job').value;
		console.info(data);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		request.send(data);
		request.onreadystatechange = function(){
			if(request.readyState === 4){
				if(request.status === 200){
					
//					document.getElementById('insertResult').innerHTML = request.responseText;
					
					// 解析服务端发送的json字符串
					var data = JSON.parse(request.responseText);
					if(data.success){
						document.getElementById('insertResult').innerHTML = data.msg;
					}else{
						document.getElementById('insertResult').innerHTML = '<b>出现错误</b>' + data.msg;
					}
				}else{
					alert('发送错误！' + request.status);
				}
			}
		};
	};
};