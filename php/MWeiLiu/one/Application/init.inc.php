<?php
//autoload class
spl_autoload_register(function ($class) {
    $arrPaths = [
        //.....
    ];

    if (strpos($class, "Smarty") !== FALSE)
        return;

    $f = str_replace("\\", '/', $class);

    $loaded = false;
    foreach ([".php", ".class.php", "Class.php"] as $ext) {
        if (file_exists($f . $ext)) {
            require_once($f . $ext);
            $loaded = true;
            break;
        }
    }

    if (!$loaded) {
        echo " Warn: not load class $f ";
        foreach ($arrPaths as $path) {
            $f = $path . '/' . $class . '.php';

            if (file_exists($f)) {
                include_once $f;
                $loaded = true;
                break;
            }
        }
    }
    if (!$loaded) {
        echo " Warn: not load class $f ";
    }
});

function referer_check($arr = [])
{
    if ($_SERVER['REQUEST_URI'] == '/' || $_SERVER['REQUEST_URI'] == '/index.php')
        return true;

    if (!isset($_SERVER['HTTP_REFERER']))
        return false;

    $valid = false;
    foreach ($arr as $refer) {
        if (strpos($_SERVER['HTTP_REFERER'], $refer) === 0) {
            return true;
        }
    }
    return false;
}