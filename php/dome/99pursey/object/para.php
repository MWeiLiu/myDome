<?php


/**
 * Created by PhpStorm.
 * User: liuWei
 * Date: 2018/1/30
 * Time: 21:34
 */
class paras {

    static function json ($code, $data, $msg, $token){
        $arr = array('code' => $code, 'data' => $data, 'msg' => $msg, 'toktn' => $token);
        echo json_encode($arr);
        // mysqli_close(my::$link);
    }
}

?>