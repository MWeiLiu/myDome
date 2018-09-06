<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/2/10
 * Time: 19:24
 */
/**
 * 图片处理
 * @param $file
 */
function image($file){
    $info = getimagesize($file);
    $width = $info[0];
    $height = $info[1];
    $type = $info[2];
//    $mime = $info['mime'];
    $name = image_type_to_extension($type);
    $image_wp = imagecreatetruecolor($width,$height);
    $image = imagecreatefromjpeg($file);
    imagecopyresampled($image_wp, $image, 0, 0, 0, 0, $width, $height, $width, $height);
    imagettftext($image_wp,50,0,250,250,imagecolorallocate($image_wp,255,0,0),"./simhei.ttf",'我在这儿');
    imagejpeg($image_wp, 'aa'.$name,20);
}

//$im = imagecreatetruecolor(100, 100);

// 将背景设为红色
//$red = imagecolorallocate($im, 255, 0, 0);
//$block = imagecolorallocate($im, 255, 255, 255);
//imagefill($im, 0, 0, $red);
//imagefilledarc($im,50,50,100,100,0,0,$block,IMG_ARC_PIE);
//header('Content-type: image/png');
//imagepng($im);
//imagedestroy($im);
//$file = "D://projects/web/1.jpg";
//header('Content-Type: image/jpeg');
////image($file);

$get = file_get_contents('https://test.qcourse.cc/canvasClip.html?https://test.qcourse.cc/images/editorHeaderImg1.0.png');
var_dump($get);exit;

//$path_1 = './background.png';
//$path_2 = 'https://www.qcourse.com/images/editorHeaderImg1.0.png';
//$path_3 = './qrcode.png';
//$image_1 = imagecreatefrompng($path_1);
//$image_2 = imagecreatefrompng($path_2);
//$image_3 = imagecreatefrompng($path_3);
//$wh  = getimagesize($path_2);
//$header_w = $wh[0];
//$header_h = $wh[1];

//imagefilledarc($image_2,$header_w/2,$header_h/2,$header_w,$header_h,0,0,$block,IMG_ARC_NOFILL);
//imagefilter($image_2,IMG_FILTER_MEAN_REMOVAL);
//header('Content-type: image/png');
//imagepng($image_2);
//imagedestroy($image_2);

//imagecopymerge($image_1, $image_2, 120, 100, 0, 0, $header_w, $header_h, 100);
//imagecopymerge($image_1, $image_3, 120, 350, 0, 0, imagesx($image_3), imagesy($image_3), 100);
//imagettftext($image_1,24,0,90,220,imagecolorallocate($image_1,255,0,0),"./simhei.ttf",'我在这儿');
//imagepng($image_1,'merge.png');

//function resize_img($url,$path='./'){
//    $imgname = $path.uniqid().'.jpg';
//    $file = $url;
//    list($width, $height) = getimagesize($file); //获取原图尺寸
//    $percent = (110/$width);
//    //缩放尺寸
//    $newwidth = $width * $percent;
//    $newheight = $height * $percent;
//    $src_im = imagecreatefromjpeg($file);
//    $dst_im = imagecreatetruecolor($newwidth, $newheight);
//    imagecopyresized($dst_im, $src_im, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
//    imagejpeg($dst_im, $imgname); //输出压缩后的图片
//    imagedestroy($dst_im);
//    imagedestroy($src_im);
//    return $imgname;
//}
//
//function test($url,$path='./'){
//    $w = 224;  $h=224; // original size
//    $original_path= $url;
//    $dest_path = $path.uniqid().'.png';
//    $src = imagecreatefromstring(file_get_contents($original_path));
//    $newpic = imagecreatetruecolor($w,$h);
//    imagealphablending($newpic,false);
//    $transparent = imagecolorallocatealpha($newpic, 0, 0, 0, 127);
//    $r=$w/2;
//    for($x=0;$x<$w;$x++)
//        for($y=0;$y<$h;$y++){
//            $c = imagecolorat($src,$x,$y);
//            $_x = $x - $w/2;
//            $_y = $y - $h/2;
//            if((($_x*$_x) + ($_y*$_y)) < ($r*$r)){
//                imagesetpixel($newpic,$x,$y,$c);
//            }else{
//                imagesetpixel($newpic,$x,$y,$transparent);
//            }
//        }
//    imagesavealpha($newpic, true);
//    imagepng($newpic, $dest_path);
//    imagedestroy($newpic);
//    imagedestroy($src);
//    // unlink($url);
//    return $dest_path;
//}
//function my_image_resize($src_file, $dst_file, $new_width, $new_height){
//    if ($new_width < 1 || $new_height < 1) {
//        echo 'params width or height error !';
//        die;
//    }
//    if (!file_exists($src_file)) {
//        echo $src_file . ' is not exists !';
//        die;
//    }
//
//    // 图像类型
//    $type = exif_imagetype($src_file);
//    $support_type = array(IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_GIF);
//    if (!in_array($type, $support_type, true)) {
//        echo 'this type of image does not support! only support jpg , gif or png';
//        die;
//    }
//
//    //Load image
//    switch ($type) {
//        case IMAGETYPE_JPEG:
//            $src_img = imagecreatefromjpeg($src_file);
//            break;
//        case IMAGETYPE_PNG:
//            $src_img = imagecreatefrompng($src_file);
//            break;
//        case IMAGETYPE_GIF:
//            $src_img = imagecreatefromgif($src_file);
//            break;
//        default:
//            echo 'Load image error!';
//            die;
//    }
//    $w = imagesx($src_img);
//    $h = imagesy($src_img);
//    $ratio_w = (1.0 * $new_width) / $w;
//    $ratio_h = (1.0 * $new_height) / $h;
//    $ratio = 1.0;
//
//    // 生成的图像的高宽比原来的都小，或都大 ，原则是 取大比例放大，取大比例缩小（缩小的比例就比较小了）
//    if ($ratio_w < 1 && $ratio_h < 1 || $ratio_w > 1 && $ratio_h > 1) {
//        if ($ratio_w < $ratio_h) {
//            $ratio = $ratio_h;
//        } else {
//            $ratio = $ratio_w;
//        }
//
//        // 定义一个中间的临时图像，该图像的宽高比 正好满足目标要求
//        $inter_w = (int)($new_width / $ratio);
//        $inter_h = (int)($new_height / $ratio);
//        $inter_img = imagecreatetruecolor($inter_w, $inter_h);
//        imagecopy($inter_img, $src_img, 0, 0, 0, 0, $inter_w, $inter_h);
//
//        // 生成一个以最大边长度为大小的是目标图像$ratio比例的临时图像
//        // 定义一个新的图像
//        $new_img = imagecreatetruecolor($new_width, $new_height);
//        imagecopyresampled($new_img, $inter_img, 0, 0, 0, 0, $new_width, $new_height, $inter_w, $inter_h);
//        switch ($type) {
//            case IMAGETYPE_JPEG:
//                imagejpeg($new_img, $dst_file, 100);
//
//                // 存储图像
//                break;
//            case IMAGETYPE_PNG:
//                imagepng($new_img, $dst_file, 100);
//                break;
//            case IMAGETYPE_GIF:
//                imagegif($new_img, $dst_file, 100);
//                break;
//            default:
//                break;
//        }
//    } else {
//        $ratio = $ratio_h > $ratio_w ? $ratio_h : $ratio_w;
//
//        // 取比例大的那个值
//        // 定义一个中间的大图像，该图像的高或宽和目标图像相等，然后对原图放大
//        $inter_w = (int)($w * $ratio);
//        $inter_h = (int)($h * $ratio);
//        $inter_img = imagecreatetruecolor($inter_w, $inter_h);
//
//        // 将原图缩放比例后裁剪
//        imagecopyresampled($inter_img, $src_img, 0, 0, 0, 0, $inter_w, $inter_h, $w, $h);
//
//        // 定义一个新的图像
//        $new_img = imagecreatetruecolor($new_width, $new_height);
//        imagecopy($new_img, $inter_img, 0, 0, 0, 0, $new_width, $new_height);
//        switch ($type) {
//            case IMAGETYPE_JPEG:
//                imagejpeg($new_img, $dst_file, 100);
//
//                // 存储图像
//                break;
//            case IMAGETYPE_PNG:
//                imagepng($new_img, $dst_file, 100);
//                break;
//            case IMAGETYPE_GIF:
//                imagegif($new_img, $dst_file, 100);
//                break;
//            default:
//                break;
//        }
//    }
//}
//my_image_resize('./header.png','./kkk.png',120,120);
?>