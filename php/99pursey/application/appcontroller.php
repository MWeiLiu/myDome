<?php

include_once './application/init.inc.php';
include './object/token.php';
//include './object/para.php';

/**
 * 默认目录为: http://localhost/99pursey/index.php
 */
class core__app {

    static function run() {
        $keywords = explode("/", $_SERVER['REQUEST_URI']);
        $model1 = $keywords[count($keywords) - 1];
        $model2 = $keywords[count($keywords) - 2];


        if(count($keywords) >= 4){
            if(isset($model2)){
                $obj = '';
                if($model2 == ''){
                    $model2 = 'index';
                    $obj = '';
                }else{
                    $model1 = explode("-", $model1);
                    //http://localhost/99pursey/index.php/user/info
                    for ($i = 0; $i < count($model1); $i++) {
                        $obj = $obj . ucwords($model1[$i]);
                    }
                    
                    $pram = explode("?", $obj);
                    //http://localhost/99pursey/index.php/user/info?userName=liuwei&time=2018%2F1%2F7
                    if(count($pram) != 1){
                        $obj = $pram[0];
                    }
                    if(token::userToken($_SERVER['HTTP_QCKTA'], $_POST['uid'])){
                        addModel::init($model2, $obj);
                    }else{
                        paras::json(-1, array(), '请登陆', '');
                    };
                }
            }
        }else{
            echo 'error';
        }
    }

}

?>