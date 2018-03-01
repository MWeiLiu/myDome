<?php

//header("Access-Control-Allow-Origin: *");
//header('Access-Control-Allow-Headers: X-Requested-With,X_Requested_With');

//include 'appcontroller.php';
class my
{

    static $Dbb = '';
    static $link = '';
    static $serverKey = array();
    static $serverVaule = array();

    static function into()
    {
        //连接数据库
        $link = mysqli_connect(DB, USERNAME, DBPASSWORD, DBNAME) or die('连接失败');
        //设置字符集,选择数据库表;
        $name = self::$Dbb;
        mysqli_set_charset($link, 'utf8') or die('设置字符集失败');

        mysqli_select_db($link, $name);

        self::$link = $link;

        return $link;
    }

    //写入
    static function insert()
    {

    }

    //查询
    static function read()
    {
        $link = self::into();
        $name = self::$Dbb;
        $sql = "select * from $name";
        $result = mysqli_query($link, $sql);

        $arr = array();

        if (mysqli_num_rows($result) > 0) {
            while ($rows = mysqli_fetch_assoc($result)) {
                if (isset($rows[self::$serverKey[0]])) {
                    if ($rows[self::$serverKey[0]] == self::$serverVaule[0]) {
                        return $rows;
                    } else {
                        return $arr;
                    }
                } else {
                    return $arr;
                }
            }
        }
    }

    //删除
    static function delete()
    {

    }

    //更新
    static function update()
    {

    }
}


?>