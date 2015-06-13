$(function(){
	
	/* 验证发送内容是否为空，不为空就发送 */
	$('#send').click(function(){
		var $content = $('#txtContent');
		if($content.val() != ''){
			SendContent($content.val());
		}else{
			alert('发送内容不能为空！');
			$content.focus();
			return false;
		}
	});
	
	/* 显示表情图标，并将表情图标的对应编号显示在文本框中 */
	InitFace();
	$('table tr td img').click(function(){
		var strContent = $('#txtContent').val() + '<:' + this.id + ':>';
		$('txtContent').val(strContent);
	})
	
	AutoUpdContent();
	var hander = setInterval('AutoUpdContent()',5000); // 每5s同步一次最新消息和在线人员列表
	
	// 元素全局绑定ajaxStart事件金额ajaxStop事件
	$('#divMsg').ajaxStart(function(){
		$(this).show().html('正在发送数据。。。');
	})
	$('#divMsg').ajaxStop(function(){
		$(this).html('已完成。。。').hide();
	})
})


/* 自定义表情函数 */
function InitFace(){
	var strHTML = '';
	for(var i = 0;i <= 10;i++){
		strHTML += '<img src="Face/" + i + ".gif" id="+ i +" />';
	}
	$('#divFace').html(strHTML);
}

/* 定时获取聊天内容和在线人员列表 */
function AutoUpdContent(){
	
	GetMessageList();
	GetOnlineList();
}

function GetMessageList(){
	$.ajax({
		type:'GET',
		url:'index.jsp',
		data:'action=ChatList&d=' + new Date(),
		success:function(data){
			$('#divContent').html(data);
		}
	})
}

function GetOnlineList(){
	$.ajax({
		type:'GET',
		url:'index.jsp',
		data:'action=OnLineList&d=' + new Date(),
		success:function(data){
			$('#divOnLine').html(data);
		}
	})
}

/* 发送聊天内容的函数 */
function SendContent(content){
	
	$.ajax({
		type:'GET',
		url:'index.jsp',
		data:'action=SenContent&d=' + new Date() + '&content=' + content,
		success:function(data){
			if(data == '1'){
				GetMessageList();
				$('txtContent').val('');
			}else{
				alert('发送失败！');
				return false;
			}
		}
	});
}