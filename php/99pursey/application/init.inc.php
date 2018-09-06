<?php

include_once './object/model.php';
class addModel {
    static function init ($model2, $obj){
        $model2::$obj();
    }
}


?>