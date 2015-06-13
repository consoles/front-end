# js和Jquery学习小结 #
## 二维数组的定义方式 ##
javascript中的数组的长度是变长的。二维数组的创建方式有2种：

	// 方式一
	var myarr=new Array();  		//先声明一维 
	for(var i = 0;i < 2;i++){   	//一维长度为2
	   myarr[i]=new Array();  		//在声明二维 
	   for(var j = 0;j < 3;j++){   	//二维长度为3
	   		myarr[i][j]=i + j;   	// 赋值，每个数组元素的值为i+j
	   }
	}
	
	// 方式二
	var Myarr = [[0 , 1 , 2 ],[1 , 2 , 3, ]]

javascript排序。

	function sortNum(a,b) {
	    return a-b;
	}
	var myarr = new Array("80","16","50","6","100","1"); // 按照数字的方式排序
	document.write(myarr.sort(sortNum));

使用`navigator.userAgent`获取客户端的浏览器（PS：`navigator`对象还可以获得操作系统信息）。

	function validB(){ 
		
	    var u_agent = navigator.userAgent      ; 
	    var B_name="不是想用的主流浏览器!"; 
	    if(u_agent.indexOf("Firefox")>-1){ 
	        B_name="Firefox"; 
	    }else if(u_agent.indexOf("Chrome")>-1){ 
	        B_name="Chrome"; 
	    }else if(u_agent.indexOf("MSIE")>-1&&u_agent.indexOf("Trident")>-1){ 
	        B_name="IE(8-10)";  
	    }
	
	    document.write("浏览器:"+B_name+"<br>");
	    document.write("u_agent:"+u_agent+"<br>"); 
	}

XXX秒后跳转到主页的js代码。

	<h4>操作成功</h4>
	<p><span id="time" style="font-weight:bold">5</span>秒后回到主页<a href="javascript:history.go(-1)">返回</a></p>
	<script type="text/javascript">
	    var num = document.getElementById("time").innerHTML;
	    var timer = setInterval(function(){
				// 0是undefined是false
		        if(num){
		            document.getElementById('time').innerHTML = --num;
		        }else{
		                location.assign('http://www.imooc.com');
						clearInterval(timer);
		        }
	        }, 1000);
	</script>

全选、不选、指定序号选择。

	<form>
          请选择你爱好:<br>
          <input type="checkbox" name="hobby" id="hobby1">  音乐
          <input type="checkbox" name="hobby" id="hobby2">  登山
          <input type="checkbox" name="hobby" id="hobby3">  游泳
          <input type="checkbox" name="hobby" id="hobby4">  阅读
          <input type="checkbox" name="hobby" id="hobby5">  打球
          <input type="checkbox" name="hobby" id="hobby6">  跑步 <br>
          <input type="button" value = "全选" onclick = "checkall();">
          <input type="button" value = "全不选" onclick = "clearall();">
          <p>请输入您要选择爱好的序号，序号为1-6:</p>
          <input id="wb" name="wb" type="text" >
          <input name="ok" type="button" value="确定" onclick = "checkone();">
        </form>
        <script type="text/javascript">
        function checkall(){
            var hobby = document.getElementsByTagName("input");
          //全选
         for(var i = 0;i < hobby.length;i++){
    		 if(hobby[i].type == "checkbox"){
                 hobby[i].checked = true;
             }
         }
        }
        function clearall(){
            var hobby = document.getElementsByName("hobby");
            
         //取消全选  
             for(var i = 0;i < hobby.length;i++){
                 hobby[i].checked = false;	//为什么不能加引号？
			 } 
        }
        
        function checkone(){
            var j=document.getElementById("wb").value;
        
         // 根据输入的数确定爱好
        var str = "hobby" + j;
		document.getElementById(str).checked =true;
        }
        </script>

动态添加表格的行和列（选中当前行的时候变色，移除当前行的时候恢复原来的颜色。）

	<!DOCTYPE html>
	<html>
	 <head>
	  <title> new document </title>  
	  <meta http-equiv="Content-Type" content="text/html; charset=gbk"/>   
	  <script type="text/javascript"> 
	  
	     window.onload = function(){
	         // 鼠标移动改变背景,可以通过给每行绑定鼠标移上事件和鼠标移除事件来改变所在行背景色。
	        changebg();
	    }
	    // 编写一个函数，供添加按钮调用，动态在表格的最后一行添加子节点；
	    function add(){
	        var number=document.getElementById("number").value;
	        var name=document.getElementById("name").value;
	
	        var newtr=document.createElement("tr");
	        var newtd1=document.createElement("td");
	        var newtd2=document.createElement("td");
	        var newtd3=document.createElement("td");
	        var newa=document.createElement("a");
	
	        newa.innerHTML="删除";
	        newa.setAttribute("onclick","del(this)");
	        newa.href="javascript:;";
	        newtd1.innerHTML=number;
	        newtd2.innerHTML=name;
	
	        newtd3.appendChild(newa);
	        newtr.appendChild(newtd1);
	        newtr.appendChild(newtd2);
	        newtr.appendChild(newtd3);
	        var tab=document.getElementById("table");
	        tab.appendChild(newtr);
	
	        changebg();
	      }
	
	      // 改变选中行的背景颜色
	     function changebg(){
	        var tab=document.getElementById("table");
	        var trs=document.getElementsByTagName("tr");
	        for(var i=1;i<trs.length;i++){
	            trs[i].onmouseover=function(){
	                this.style.background="#ccc";
	            }
	            trs[i].onmouseout=function(){
	              this.style.background="#fff";
	            }
	        }
	    }
	
	    // 创建删除函数
	    function del(obj){
	        obj.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode);
	    }
	  </script> 
	 </head> 
	 <body> 
	       <table border="1" width="50%" id="table">
	       <tr>
	        <th>学号</th>
	        <th>姓名</th>
	        <th>操作</th>
	       </tr>  
	
	       <tr>
	        <td>xh001</td>
	        <td>王小明</td>
	        <td><a href="javascript:;" onclick="del(this)">删除</a></td>   <!--在删除按钮上添加点击事件  -->
	       </tr>
	
	       <tr>
	        <td>xh002</td>
	        <td>刘小芳</td>
	        <td><a href="javascript:;" onclick="del(this)">删除</a></td>   <!--在删除按钮上添加点击事件  -->
	       </tr>  
	
	       </table>
	       请输入学号：<br/>
	       <input type="text" id="number"><br/>
	       请输入姓名：<br/>
	       <input type="text" id="name">
	       <br/>
	       <input type="button" value="添加一行" onclick="add()" />   <!--在添加按钮上添加点击事件  -->
	 </body>
	</html>

选项卡。

	<!DOCTYPE html>
	<html>
	<head lang="en">
	    <title>选项卡</title>
	    <style type="text/css">
	     /* CSS样式制作 */ 
	    *{
	        margin:0px;
	        padding:0px;   
	        font:14px normal; 
	        font-family:微软雅黑;
	    } 
	    #tab {
	        width:299px;
	        height:150px;
	        margin:10px;
	        padding:0px;
	    }
	    #tab ul{
	        list-style:none;
	        width:300px;
	        height:30px; 
	        line-height:30px; 
	        
	    }
	    #tab ul li{
	        list-style:none;/*列表显示风格：无*/
	        cursor:pointer;/*鼠标样式*/
	        float:left;
	        margin:0px 3px;
	        font-size:14px;
	        width:60px;
	        height:28px;
	        line-height:28px;
	        text-align:center;
	        background-color:#ffffff;
	        border:1px solid #ccc;/*1*/
	        border-bottom:none;
	        display:inline-block;
	    }
	    #tab ul .active{
	        border-top:2px saddlebrown solid;
	        border-bottom:2px solid #ffffff;
	    }
	    #tab div{
	        /*clear:both;*/
	        height:130px;
	        font-size:14px;
	        padding:6px;
	        line-height:2;
	        margin:0px;
	        display:none;
	        border:1px solid #336699;
	        border-top:2px saddlebrown solid;
	    }
	
	    </style>
	    <script type="text/javascript">
	         
	    // JS实现选项卡切换
	    window.onload=function(){
	        var mytab=document.getElementById("tab");
	        var titles=mytab.getElementsByTagName("li");
	        var contents=mytab.getElementsByTagName("div");
	
	        for(var i = 0;i < titles.length;i++){
	            titles[i].index=i;
	            titles[i].onmouseover=function(){
	                for(var i = 0;i < titles.length;i++){
	                    contents[i].style.display = "none";
	                    titles[i].className = "";
	                }
	                contents[this.index].style.display = "block";                   
	                titles[this.index].className = "active";
	            }
	        }
	    }
	    
	    </script>
	 
	</head>
	<body>
	<!-- HTML页面布局 -->
	<div id="tab">
	    <ul>
	        <li class="active">选项卡1</li>
	        <li>选项卡2</li>
	        <li>选项卡3</li>
	        <li>选项卡4</li>
	    </ul>
	    <div style="display:block">选项卡1的内容</div>
	    <div>选项卡2的内容</div>
	    <div>选项卡3的内容</div>
	    <div>选项卡4的内容</div>
	</div> 
	</body>
	</html>

收起——展开效果

	<!DOCTYPE html>
	<html>
	<head lang="en">
	    <meta charset="UTF-8">
	    <title>JQuery范例</title>
	    <style>
	        .hide{
	            display:none;
	        }
	    </style>
	 <script src="http://libs.baidu.com/jquery/1.9.0/jquery.js" type="text/javascript"></script>    
	    <script type="text/javascript">
	        $(document).ready(function(){
	           $('a').click(function(){
	              if( $('a').html() == '更多' ){
	                  $('.hide').show();
	                  $('a').html('简化');
	              }
	              else{
	                  $('.hide').hide();
	                  $('a').html('更多');
	              }
	        });
	        });
	    </script>
	</head>
	<body>
	    <ul>
	        <li>1</li>
	        <li>2</li>
	        <li>3</li>
	        <li>4</li>
	        <li><a href="#">更多</a></li>
	        <li class="hide">5</li>
	        <li class="hide">6</li>
	        <li class="hide">7</li>
	    </ul>
	</body>
	</html>

验证表单非空的jquery实现。

	<input id="txtest" type="text" value="" />
	$(function () {
	    $("input")
	    .bind("focus", function () {
	        $("div").html("请输入您的姓名！");
	    })
	    $('input').bind('blur',function () {
	       if ($(this).val().length == 0)
	            $("div").html("你的名称不能为空！");
	    })
	});

