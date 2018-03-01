<?php

//设置处理错误需要用到的电子邮箱地址
$contact_eamal = '872496024@qq.com';

//判断脚本是运行在真实服务器还是测试服务器
// $a = $_SERVER['REQUEST_URI'];

$host = substr($_SERVER['HTTP_HOST'], 0, 5);
// echo $_SERVER['HTTP_HOST'];

if(in_array($host, array('local', '127.0', '192.1'))){
    $local = TRUE;
} else {
    $local = FALSE;
}
// echo $local;

//设置服务器常量
if($local){
    $debug = TRUE;
    //站点根目录在服务器上的绝对路径
    define('BASE_URI', '');
    //主机名和目录地址
    define('BASE_URL', 'http://localhost/99pursey/');
    //数据库连接信息的文件的绝对路径
    define('DB', 'localhost');
    define('USERNAME', 'root');
    define('DBPASSWORD', '');
    define('DBNAME', '99pursey');
}else{
    define('BASE_URI', '');
    define('BASE_URL', '');
    define('DB', '');
}

//设置调试级别
if(!isset($debug)){
    $debug = FALSE;
}

//自定义错误处理函数
function my_error_handler($e_number, $e_message, $e_file, $e_line, $e_vars){
    global $debug, $contact_eamal;
    //创建错误消息
    $message = "An error occurred in script <' $e_file '> on line <' $e_line '> : <' $e_message '>";
    $message .= print_r($e_vars, 1);
    //如果调试模式打开，就显示错误信息
    if($debug){
        echo $message;
        debug_backtrace();
    }else{
        //如果调试模式关闭，就通过邮件发送这些消息
        error_log($message, 1, $contact_eamal);
        if(($e_number != E_NOTICE) && ($e_number < 2048)){
            echo 'A system error occurred We apologize for the inconvenience';
        }
    }
}

//使用这个错误处理程序
set_error_handler('my_error_handler');

?>