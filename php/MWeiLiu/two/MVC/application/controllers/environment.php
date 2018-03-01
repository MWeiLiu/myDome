<?php  
//根据类名来include文件  
class loader {  
    //找到对应文件就include  
    static function load($name) {  
        $file = self::filepath($name);  
        if ($file) {  
            return include $file;  
        }  
    }  
  
    static function filepath($name, $ext = '.php') {  
        if (!$ext) {  
            $ext = '.php';  
        }  
        $file = str_replace('__', '/', $name) . $ext; //类名转路径  
        $path .= APPPATH . '/' . $file;  
        if (file_exists($path)) {  
            return $path; //找到就返回  
        }  
        return null;  
    }  
}  
  
spl_autoload_register('loader::load');  
?>