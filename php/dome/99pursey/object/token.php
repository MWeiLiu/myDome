<?php

/**
 * Created by PhpStorm.
 * User: liuWei
 * Date: 2018/1/30
 * Time: 21:29
 */

class token {
    static function apiToken ($uid) {
        return md5($_SERVER['HTTP_QCKTA']);//输出整个数组

    }
    static function userToken ($qckta, $uid) {
        $token = md5($uid);
        if($token == $qckta){
            return TRUE;
        }else{
            return FALSE;
        }

    }

}
?>