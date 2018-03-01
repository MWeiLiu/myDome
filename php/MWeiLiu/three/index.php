<?php

//包含文件配置
// include "includes/config.inc.php";
//或
require("./includes/config.inc.php");


//确认要显示的页面
if(isset($_GET['p'])){
    $p = $_GET['p'];
}else if(isset($_POST['p'])){
    $p = $_POST['p'];
}else{
    $p = NULL;
}

//不同模块的文件
$page = $p .'inc.php';
$page_title = $p;

//确认模块是否存在
if(!file_exists('./modules/'. $page)){
    $page = 'main.inc.php';
    $page_title = 'main';
}

echo $page;
echo '<br/>';
echo $page_title;
echo '<br/>';
echo $contact_eamal;



?>