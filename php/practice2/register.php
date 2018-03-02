<?php


header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With,X_Requested_With');

$serverlink = "localhost";
$servername = "root";
$serverpassword = "";
$dbName='ceshi';

//注册页
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['mail'];
$ctime = date("Y-m-d h:i:s");
//连接数据库
$link = mysqli_connect($serverlink, $servername, $serverpassword) or die('失败');

//设置字符集,选择数据库表;
mysqli_select_db($link, $dbName)or die('选择数据表失败');
mysqli_set_charset($link, 'utf8')or die('设置字符集失败');
 
//写入注册表

$reg = "insert into register (nickname, email, password, ctime) values ('$username', '$email', '$password', '$ctime')";
 
//echo $username.'-'.$email.'-'.$password;
//提交sql语句
$result = mysqli_query($link, $reg);

if(mysqli_affected_rows($link) >0){
	mysqli_close($link);
	$arr = array('code' => 1, 'data' => array(), 'msg' => '注册成功');
	echo json_encode($arr);
}else{
	echo mysqli_error($link);
}
// 
////关闭退出
//mysqli_close($link) or exit('no');

?>