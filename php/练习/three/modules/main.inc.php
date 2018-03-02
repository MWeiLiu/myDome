<?php

//检查这个页面不会被直接访问
if(!defined('BASE_URL')){
    echo BASE_URL;
    include '../includes/config.inc.php';

    //对用户访问重定向
    $url = BASE_URL .'index.php';
    header("Location: $url");
    exit;
}

?>