<?php
//	phpinfo();
	//链接数据库
	$dbName = "myweb"; //数据库名称
	$conn = mysqli_connect("localhost", "root", "1q1ZKOsZ7YY1Fivt") or die("数据库链接错误"); //打开Mysql链接
	$flag = mysqli_select_db($dbName, $conn); //设置数据库
	mysqli_query("set names 'utf-8'"); //设置文档格式
	
//	if($flag){
//		echo 'ok';
//	}else{
//		echo 'none';
//	}

	//录入数据
	if(@$_POST['submit']){
		$spl="insert into content (id,title,nav,name,time) values ('','$_POST[titles]','$_POST[Texts]','$_POST[usernames]',now())";	//插入数据
		mysqli_query($spl); //执行一条 MySQL 查询
		if($spl){
			echo "提交成功";
		}else{
			echo "提交失败";
		}
		
		echo "<br />";
	}
	
	//读取数据
	$MY="SELECT id,name,title,nav FROM content where `check`='2' order by id desc"; //读取数据并以降序排列
//	$res=mysql_fetch_array(mysql_query($MY));
//	print_r($res);
   
    // print_r($list);

	$res=mysqli_query($MY,$conn);
	if($res){
		echo "获取成功";
		echo "<br />";
		$re=mysql_fetch_array($res); //将获取到的数据排成数组
		echo "<br />";
//		for ($x=0; $x<count($re); $x++) { //count  长度
//			echo "--- <br>";
//			echo "$re[$x] <br>";
//			echo "--- <br>";
//		} 
//		echo "<form active='index.php' method='post' class='shenhe'><table>"; 
		echo "<p><sapn>ID</sapn><sapn>用户</sapn><sapn>标题</sapn><sapn>内容</sapn></p>"; 

		$list=mysql_query($MY);
	    while($row=mysql_fetch_array($list)){
	    	echo "<form active='index.php' method='GET' class='shenhe'>";
	        echo "<p path='0' ><sapn class='ID' name='ID'>$row[0]</sapn><span>&nbsp;&nbsp;</span><sapn name='Name'>$row[1]</sapn><span>&nbsp;&nbsp;</span><sapn name='title'>$row[2]</sapn><span>&nbsp;&nbsp;</span><sapn name='ID'>$row[3]</sapn><sapn class='add'>".
	        	"<a href='?act=add&id=$row[id]'>add</a></sapn><span>&nbsp;</span><sapn class='del'>".
	        		"<input type='submit' name='del_sub' value='del' /><input type='hidden' name='id' value='$row[id]' /></p>";
	        echo "</form>";
	    }
//		echo "</table></form>"; 
		
	}
	
	//增删改查
	if(@$_GET['add_sub']){
		
		
		
		$add="SELECT * FROM content WHERE id LIKE '$_GET[id]'";
		
		$result = mysql_query($add);
		
		echo "<table><tbody>"; 
		echo "<tr><td>ID</td><td>用户</td><td>标题</td><td>内容</td></tr>";
	    while($rows = mysql_fetch_array($result)){
	        echo "<tr><td class='ID'>$rows[0]</td><td>$rows[1]</td><td>$rows[2]</td><td>$rows[3]</td></tr>";
	    }
	        echo "</tbody></table>";
	}
	
	//---------------------------del check 1---------------------------------------------------
	if(@$_GET['del_sub']){
		$del="DELETE FROM content WHERE id='$_GET[id]'";
		$results = mysql_query($del);
	}
	//-----------------------------------------------------------------------------------------
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src="jquery-1.11.1.js"></script>
		<style>
		*{margin:0;padding:0}
			.Wkuang{width:600px;height:450px;border:1px solid #dbdbdb;margin:50px auto 0;}
			.Wkuang p{padding:10px;}
			.Wkuang p a{padding:0 10px;cursor:pointer;}
			table{margin:40px 0 0 40px;}
			table input{width:200px;height:40px;font-size:15px;}
			table textarea{min-width:400px;min-height:200px;font-size:20px;}
			.btn{cursor:pointer;margin-left:300px;}
		</style>
	</head>
	<body>
		<div class="Wkuang">
			<p>
				<a class="q1">添加留言</a>
				<a class="q2">浏览留言</a>
			</p>
			<hr />
			<form class="Nkuang" action="index.php" method="post">
				<table border="0" cellpadding="0" cellspacing="3" width="500" height="200">
					<tr>
						<td align="right">用户名：</td>
						<td><input id="username" name="usernames" type="text"/></td>
					</tr>
					<tr>
						<td align="right">标题：</td>
						<td><input id="title" name="titles" type="text"/></td>
					</tr>
					<tr>
						<td align="right">内容：</td>
						<td><textarea id="Text" name="Texts"></textarea></td>
					</tr>
				</table>
				<input class="btn" type="submit" name="submit" value="提交" />
			</form>
			<!--<div class="lyb">
				<p>
					<span style="text-align: left;">标题：</span><span style="text-align: right;padding-left: 200px;">用户名：</span>
				</p>
				<p style="overflow-y: scroll;overflow-x:hidden;height:100px;">内容:</p>
				
			</div>-->
		</div>
		<!------------------------------------del check 2--------------------------------------------->
		<?php
			$MY="SELECT id,name,title,nav FROM content order by id desc"; //读取数据并以降序排列
			$list=mysql_query($MY);
	    	while($row=mysql_fetch_array($list)){
		?>
			<?php=$row[title]?>　<a href="?act=del&id=<?php=$row[id]?>">del</a>　<a href="?act=check&id=<?php=$row[id]?>">check</a><br>
		<?php
			}
			if($_GET[act]=='del'){
				$del="DELETE FROM content WHERE id='$_GET[id]'";
				$results = mysql_query($del);
			}else if($_GET[act]=='check'){
				$del="update content set `check`='2' WHERE id='$_GET[id]'";
				$results = mysql_query($del);
				if($results){
					echo "js";
				}
			}
		?>
		<!---------------------------------------------------------------------------------------->
	</body>
</html>
<script>
$(function(){
	
	$(".btn").bind("click",function(){
		if($("#username").val()==""){
			alert("用户名不能为空！");
			return false;
		}else if($("#title").val()==""){
			alert("标题不能为空");
			return false;
		}else if($("#Text").val()==""){
			alert("内容不能为空");
			return false;
		}
	});
	
//	$(".Wkuang .q1").bind("click",function(){
//		$(".Nkuang").show();
//		$(".lyb").hide();
//	});		
//	$(".Wkuang .q2").bind("click",function(){
//		$(".lyb").show();
//		$(".Nkuang").hide();
//	});		
	
//	$(".shenhe .add").bind("click",function(){
//		if($(this).parent().attr("path")==0){
//			$(this).parent().attr("path",1);
//			alert("审核通过");
//			
//		}else{
//			alert("该留言已审核通过");
//			
//		}
//	});
//	
//	$(".shenhe .del").bind("click",function(){
//		
//		$(this).parents("form").remove();
//		alert("已删除");
//		
//	});

});
</script>