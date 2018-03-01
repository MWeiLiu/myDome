

<?php
	$sqlName="liu_yan_ban";
	$sql=mysql_connect("localhost","root","root");
	if($sql){
		echo "ok";
	}else{
		echo "no";
	}
	?>

	
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src="js/jquery-1.11.1.js"></script>
	</head>
	<body>
		<div class="Wkuang">
			<p>
				<a>添加留言</a>
				<a>查看留言</a>
			</p>
			<form class="Mkuang" action="index.php" method="post">
				<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td>用户名:</td>
						<td><input id="username" name="usernames" /></td>
					</tr>
					<tr>
						<td>标题:</td>
						<td><input id="title" name="titles" /></td>
					</tr>
					<tr>
						<td>内容:</td>
						<td><textarea id="Text" name="texts"></textarea></td>
					</tr>
				</table>
				<input type="submit" value="提交" id="tijiao"/>
			</form>
		</div>
	</body>
	<script>
		$(function(){
			$("#tijiao").bind("click",function(){
				if($("#username").val()==""){
					alert("用户名不能空");
					return false;
				}else if($("#title").val()==""){
					alert("标题不能为空");
					return false;
				}else if($("#Text").val()==""){
					alert("内容不能为空");
					return false;
				}
			});
		});
	</script>
</html>
