<?php
//	$ret = array(
//	 'nickName' => isset($_POST['nickName'])? $_POST['nickName'] : '',
//	 'age' => isset($_POST['age'])? $_POST['age'] : '',
//	 'email' => isset($_POST['email'])? $_POST['email'] : ''
//	);
	header('content-type:application:json;charset=utf8');
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST');
	header('Access-Control-Allow-Headers:x-requested-with,content-type');
	
	$servername = "localhost";
	$username = "root";
	$password = "8dRu3ELrmCY8e2T9";
	$dbname = 'mweiliu';
	$setchart = "set names 'utf-8'";
	 
	// 创建连接
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	
	mysqli_query($conn, $setchart); //设置文档格式
	// 检测连接
	if (!$conn) {
	    die("Connection failed: " . mysqli_connect_error());
	}
	echo "连接成功";
	echo '<br/>';
	echo $ret
?>