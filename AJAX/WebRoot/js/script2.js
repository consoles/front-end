$(function(){
	$('#query').click(function(){
		$.ajax({
			type:'GET',
			// 垮域请求（浏览器输入localhost，而请求的是127.0.0.1）
			url:'http://127.0.0.1/Ajax/Employee.do?id=' + $('#id').val(),
//			dataType:'jsonp',
//			jsonp:'callback',
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
	});
	
	$('#insert').click(function(){
		$.ajax({
			type:'POST',
			url:'Employee.do',
			dataType:'json',
			data:{
				name:$('#name').val(),
				sex:$('#sex').val(),
				job:$('#job').val(),
			},
			success:function(data){
				if(data.success)
					$('#insertResult').html(data.msg);
				else
					$('#insertResult').html('错误：' + data.msg);
			},
			error:function(jqXHR){
				alert('发生错误！' + jqXHR.status); // 404等状态码
			}
		});
	});
});