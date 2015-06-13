$(function(){
	// 元素绑定全局ajaxStart事件
	$('#divMsg').ajaxStart(function(){
		$(this).show.html('<h6>正在发送登录请求。。。</h6>');
	})
	// 元素绑定全局ajaxStop事件
	$('#divMsg').ajaxStop(function(){
		$(this).html('请求处理已完成。。').hide();	
	})
	
	$('#btnSubmit').click(function(){
	
		var $username = $('#username');
		var $password = $('#password');
		
		if($username.val() == ""){
			alert('用户名不能为空！');
			$username.focus();
			return false; // 阻止向服务器发送请求
		}else if($password.val() == ""){
			alert('密码不能为空！');
			$password.focus();
			return false;
		}else{
			UserLogin($username.val(),$password.val());
		}
	})
	
})

function UserLogin(username,password){
	$.ajax({
		// 以下的是对象的属性
		type:'GET',
		url:'index.jsp',
		data:'action=Login&d=' + new Date() + '&username=' + username + '&password=' + password,
		success:function(data){
			if(data == '1'){
				window.location('main.html');
			}else{
				alert('用户名或者密码错误！');
				return false;
			}
		}
	});
}