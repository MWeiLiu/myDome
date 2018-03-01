<?php
require_once "Application/common.inc.php";
$objConf=$GLOBALS['config'];

//引用模板
require_once("CnsPHP/View/Smarty.class.php");

//设置session
ini_set('session.gc_maxlifetime', $objConf->session->gc_maxlifetime); //15 days
ini_set('memcache.session_redundancy',3);
ini_set('session.cookie_lifetime',  $objConf->session->cookie_lifetime);
ini_set('session.save_handler',  $objConf->session->save_handler);
ini_set('session.save_path',     $objConf->session->save_path);
ini_set('session.cookie_path',  $objConf->session->cookie_path);
ini_set('session.cookie_domain',  $objConf->session->cookie_domain);
//ini_set('session.cookie_lifetime', '1800');
session_start();

//debug
ini_set('display_errors','on');
error_reporting(E_ALL);

date_default_timezone_set("Asia/Shanghai");

//必须使用"而不是'
//最后一个元素一定不能以,号结尾
//prdouct gateway: 'gatewayUrl' => "https://openapi.alipay.com/gateway.do",

//referer检查
//if(!referer_check(['https://ppt.yiyaozg.com']))
//    die('invalid request!!!');

//路由映射
@CnsPHP\Route::get('/', '/Front/Index/Index');
//CnsPHP\Route::get('/user/(\d+)', '/front/user/info/id/\1');
//CnsPHP\Route::get('/qq/auth-callback', '/front/qq/auth_callback/info/id/\1');
