<?php
/**
 * MVC路由功能简单实现
 * @desc 简单实现MVC路由功能
 * $Author: LiuWei
 */

// error_reporting(0);

//打印出所有的服务器变量
// print_r($_SERVER);

//定义application路径
define('APPPATH', __DIR__);

// echo APPPATH;
// echo '<br/>';

require_once(APPPATH . '/controllers/app.php');  
core__app::run(); //  

?>