<?php
//	$userName = '刘威';
//	echo $userName;
//	print('<br />');
//	print $userName;
//	echo '<br/>';
//	print_r($userName);
//	var_dump($userName); //typeof
	
//	define('greeting', '欢迎'.$userName, true);//定义常量,是否对大小写敏感
//	function fun(){
//		echo greeting;
//	}
//	fun();
//	echo strlen($userName);//返回字符长度
//	echo strpos($userName,'M');//返回第一个匹配字符下标
//	echo strlen();//一个中文占3个字符
//	echo mb_strlen($userName, 'utf-8');//mb_*设置编码格式
//	echo ++$x;//预增加
//	echo $x++;//后增加
//	isset()//检测变量是否存在
//	defined()//检测常量是否存在
	/*
	 * 魔术常量
	 * */
//	 __CLASS__;//类
//	 PHP_VERSION;//php版本号
//	 __LINE__;//行号
//	 __FILE__;//文件地址
//	 __FUNCTION__;//函数
//	 __METHOD__;//方法
//	 PHP_OS;//系统
//	PHP_EOL;//换行符
//	class Name{
//		function Name1() {
//			echo __CLASS__;
//			echo '<br/>';
//			echo __FUNCTION__;
//		}
//	}
//	$a = new Name();
//	$a->Name1();
//	$a = array('a','b','c');//数组
//	echo $a[0];
//	echo count($a);//返回数组长度
	
//	$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
//	foreach($age as $x=>$x_value){
//	    echo "Key=" . $x . ", Value=" . $x_value;
//	    echo "<br>";
//	}
	/*
	 * 数组排序
	 * */
//	sort()//升序
//	rsort()//降序
//	asort()//根据关联数组的值升序
//	arsort()//根据关联数组的值降序
//	ksort()//根据关联数组的键升序
//	krsort()//根据关联数组的键降序
	
	/*
	 * 
	 * */
	?>
<?php
//	header('content-type:application:json;charset=utf8');
	// 指定允许其他域名访问 
//	header('Access-Control-Allow-Origin:*'); 
	// 响应类型 
//	header('Access-Control-Allow-Methods:POST'); 
	// 响应头设置 
//	header('Access-Control-Allow-Headers:x-requested-with,content-type');
	
	//mweiliu
	//8dRu3ELrmCY8e2T9
	//面向过程方式
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
	
	$name = 'L';
	$age = '22';
	$email = '872496024@qq.com';
	$fileURL = 'C:/Users/wei/Desktop/1.txt';
	
//	echo readfile("C:/Users/wei/Desktop/1.txt");
	$myfile = fopen($fileURL, "r") or die("Unable to open file!");
	echo fread($myfile,filesize($fileURL));
	fclose($myfile);
//	mysqli_query($conn,"DELETE FROM userinfo WHERE nickname='LiuWei'");
	
//	$sqlSELECT = 'SELECT * FROM userinfo';
//	$result = mysqli_query($conn, $sqlSELECT);
//	
//	if(mysqli_num_rows($result) > 0){
//		while($row = mysqli_fetch_assoc($result)){
//			echo '查询:';
//			echo 'nickname:'.$row["nickname"].'_age:'.$row["age"].'_email:'.$row["email"].'<br/>';
//			if($name==$row["nickname"]){
//				echo '用户已存在,添加失败';
//				echo '<br/>';
//			}else{
//	
//				$sqlINSERT = "INSERT INTO userinfo(nickname, age, email) VALUES ('$name', '$age', '$email')";
//				
//				if(mysqli_query($conn, $sqlINSERT)){
//					echo '插入成功';
//				}else{
//					echo 'ERROR:'.$sqlINSERT.'<br/>'.mysqli_error($conn);
//				}
//				echo '<br/>';
//			}
//		}
//	}else{
//		echo '0 结果';
//	}
//	
//	mysqli_close($conn);
//	echo '关闭';
	?>