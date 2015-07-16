## 小技巧 ##
1. 复选框和文本标签的对齐。

		<style>
			.userinfo label,input{
				vertical-align: middle;
			}
		</style>
		<div class="userinfo">
			<label for="username">请输入用户名：</label><input type="text" name="username"><br />
			<label for="password">请输入密码：</label><input type="password">
		</div>
