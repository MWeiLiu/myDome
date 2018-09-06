<?php

include './application/mysql.config.php';
include 'para.php';


class user {

    static function loginEmail (){
        if(isset($_POST['email']) && isset($_POST['password'])) {

            $email = $_POST['email'];
            $password = $_POST['password'];

            my::$Dbb = 'info';
            my::$serverKey = array(
                0 => 'email'
            );
            my::$serverVaule = array(
                0 => $email
            );
            $data = my::read();

            if(isset($data)){

            }else{

            }

        }

    }

    static function Info (){
        if(isset($_POST['email']) && isset($_POST['nickname'])){

            $email = $_POST['email'];
            $nickname = $_POST['nickname'];

            my::$Dbb = 'info';
            my::$serverKey = array(
                0 => 'email'
            );
            my::$serverVaule = array(
                0 => $email
            );

            $data = my::read();

            if(isset($data)){
                paras::json(1, $data, '查询成功', token::apiToken($data['uid']));
            }else{
                paras::json(-1, array(), '查询失败', '');
            }
        } else {
            if(isset($_POST['email'])){
                paras::json(-1, array(), '请填写邮箱', '');
            }
            if(isset($_POST['nickname'])){
                paras::json(-2, array(), '请填写昵称', '');
            }

        }
//        self::para($code, $data, $msg);
    }
    static function productList (){
        echo 'productList';
    }
    static function productInfo (){
        echo 'productInfo';
    }
}


?>