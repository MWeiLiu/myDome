<?php

namespace Application\Controller\Front;

use Application\Controller\AppController;
use Application\Model\AppModel;
use CnsPHP\Common\Str;
use CnsPHP\Common\Net;
use CnsPHP\Common\File;
use CnsPHP\Common\CnsMemcached;
use CnsPHP\Common\QRCode;

use CnsPHP\Controller\Auth;
use CnsPHP\Common\CheckCode;
use Application\Common\CnsToken;

class Users extends AppModel
{
}

class Orders extends AppModel
{
}

class Products extends AppModel
{
}

/**
 * Class AlipayController
 * @package Application\Controller\Front
 * 1)流程
 *        前端HTML提交订单数据，与返回地址，
 *        PHP接受参数，生成订单号，连同返回地址一起放入数据库表
 *        支付
 *        支付成功或失败后，返回到return_url(php端)
 *        php端根据订单号从库中获取return_url，返回到此地址
 */
class AlipayController extends AppController
{
    /**
     * 支付前生成订单,并保存到数据库
     * @param $args
     * @param $post
     * @param $get
     * @return bool|string
     */
    private static function OrderBeforePay($args, $post, $get)
    {
        //Abc::getOne();
        $token = $args['_tk_token'];
        $uid = $args['_tk_uid'];
        //回调地址
        $return_url = $get['return_url'] . (strpos($get['return_url'], '?') === false ? '?' : '&');
        //产品ID:
        $pid = $get['pid'];
        //作品部件ID
        $subid = $get['subid'];
        //子项名
        $subname = $get['subname'];
        //产品名称:
        $pname = $get['pname'];
        //产品描述:
        $abstract = $get['abstract'];
        //数量:
        $nums = floatval($get['nums']);
        //单价:
        $price = floatval($get['price']);
        //折扣:
        $discount = floatval($get['discount']);
        //总价:
        $amount = floatval($get['amount']);
        //折后价:
        $amount_discount = floatval($get['amount_discount']);
        if (floor($amount_discount) != floor($price * $nums * $discount / 100)) {
            return Str::msg(-1, '价格与折扣数量不符', [], '', false);
        }

        //如果子项目ID为>=0的值，则需要比对产品价格，防止篡改
        if ($subid >= 0) {
            $arr = Products::getOne('json', ['pid' => $pid]);

            if (!$arr) {
                Str::msg(-2, '无此作品', [], '', false);
            }

            $json = json_decode($arr['json']);

            //{"price":[{"subid": "0", "price":"10","discount":"95"}, {"subid": "-1", "price":"10","discount":"95"}]}
            $json_price = $json->price;
            $has_this_sub = false;
            for ($j = 0; $j < count($json_price); $j++) {
                if ($json_price[$j]->subid == $subid) {
                    $has_this_sub = true;
                    if (floor($json_price[$j]->price) != floor($price) || floor($json_price[$j]->discount) != floor($discount)) {
                        return Str::msg(-3, '价格或折扣与作品不符合', [], '', false);
                    }
                    break;
                }
            }
            if (!$has_this_sub) {
                return Str::msg(-4, '无此作品子项', [], '', false);
            }
        }
        return true;
    }

    /**
     * https://.../order-pc/_tk_uid/1111/_tk_token/ttttttttt?pname=xxxx&amount_discount=0.01&subname=ddd&pid=11111&subid=1&price=0.01&nums=1&discount=100&amount=0.01&return_url=xxxxxx
     * 测试支付宝号: numjtw9131@sandbox.com  密码: 111111
     * 支付流程:
     *     1) 前端携带订单参数与返回地址，
     *     2) 支付完成后支付宝会跳到alipay/order-return-url，
     *     3) order-return-url会把支付状态返回到前端发送的return_url
     * @param $args
     * @param $post
     * @param $get
     * @return 支付完成，会跳转到alipay/order-return-url上
     */
    public static function OrderPc($args, $post, $get)
    {
        require self::$rootdir . '/Application/Common/third/alipay/config.php';
        /*
//Abc::getOne();
$token = $args['_tk_token'];
$uid = $args['_tk_uid'];
//回调地址
$return_url = $get['return_url'] . (strpos($get['return_url'], '?') === false ? '?' : '&');
//产品ID:
$pid = $get['pid'];
//作品部件ID
$subid = $get['subid'];
//子项名
$subname = $get['subname'];
//产品名称:
$pname = $get['pname'];
//产品描述:
$abstract = $get['abstract'];
//数量:
$nums = $get['nums'];
//单价:
$price = $get['price'];
//折扣:
$discount = $get['discount'];
//总价:
$amount = $get['amount'];
//折后价:
$amount_discount = $get['amount_discount'];

if (floor($amount_discount) != floor($price * $nums * $discount / 100)) {
    header("Location: " . $return_url . "json=" . urlencode(json_encode(['code' => -1, 'msg' => '价格与折扣数量不符', 'data' => [], 'token' => "$token"])));
    return;
}

//如果子项目ID为>=0的值，则需要比对产品价格，防止篡改
if ($subid >= 0) {
    $arr = Products::getOne('json', ['pid' => $pid]);

    if (!$arr) {
        header("Location: " . $return_url . "json=" . urlencode(json_encode(['code' => -2, 'msg' => '无此作品', 'data' => [], 'token' => "$token"])));
        return;
    }

    $json = json_decode($arr['json']);

    //{"price":[{"subid": "0", "price":"10","discount":"95"}, {"subid": "-1", "price":"10","discount":"95"}]}
    $json_price = $json->price;
    $has_this_sub = false;
    for ($j = 0; $j < count($json_price); $j++) {
        if ($json_price[$j]->subid == $subid) {
            $has_this_sub = true;
            if (floor($json_price[$j]->price) != floor($price) || floor($json_price[$j]->discount) != floor($discount)) {
                header("Location: " . $return_url . "json=" . urlencode(json_encode(['code' => -3, 'msg' => '价格或折扣与作品不符合', 'data' => [], 'token' => "$token"])));
                return;
            }
            break;
        }
    }
    if (!$has_this_sub) {
        header("Location: " . $return_url . "json=" . urlencode(json_encode(['code' => -4, 'msg' => '无此作品子项', 'data' => [], 'token' => "$token"])));
        return;
    }
}
*/
        //$return_url = $get['return_url'] . (strpos($get['return_url'], '?') === false ? '?' : '&');
        //$json=self::OrderBeforePay($args, $post, $get);
        //if($json !== true){
        //    header("Location: ".$return_url."json=".urlencode(json_encode($json)));
        //}

        //商户订单号，商户网站订单系统中唯一订单号，必填
        $out_trade_no = 'ali' . date("YmdHis") . rand(0, 99);

        //订单名称，必填
        $subject = trim($get['pname'] . '_' . $get['subname']);

        //付款金额，必填
        $total_amount = trim($get['amount_discount']);

        //商品描述，可空
        $body = trim($get['subname']);

        Orders::insert([
            'orderid' => $out_trade_no,
            'uid' => $args['_tk_uid'],
            'token' => $args['_tk_token'],
            'pid' => $get['pid'],
            'pname' => $get['pname'],
            'subid' => $get['subid'],
            'subname' => $get['subname'],
            'price' => $get['price'],
            'nums' => $get['nums'],
            'discount' => $get['discount'],
            'amount' => $get['amount'],
            'amount_discount' => $get['amount_discount'],
            'return_url' => $get['return_url'],
            'trade_type' => 'ALIPAYPC'
        ]);

        //构造参数
        $payRequestBuilder = new \AlipayTradePagePayContentBuilder();
        $payRequestBuilder->setBody($body);
        $payRequestBuilder->setSubject($subject);
        $payRequestBuilder->setTotalAmount($total_amount);
        $payRequestBuilder->setOutTradeNo($out_trade_no);

        $aop = new \AlipayTradeService($config);

        /**
         * pagePay 电脑网站支付请求
         * @param $builder 业务参数，使用buildmodel中的对象生成。
         * @param $return_url 同步跳转地址，公网可以访问
         * @param $notify_url 异步通知地址，公网可以访问
         * @return $response 支付宝返回的信息
         */
        $response = $aop->pagePay($payRequestBuilder, $config['return_url'], $config['notify_url']);
        File::log(json_encode($response));
        //输出表单
        var_dump($response);
    }

    /**
     * @param $args
     * @param $post
     * @param $get
     */
    public static function OrderReturnUrl($args, $post, $get)
    {
        require self::$rootdir . '/Application/Common/third/alipay/config.php';
        $alipaySevice = new \AlipayTradeService($config);

        $result = $alipaySevice->check($get);

        /* 实际验证过程建议商户添加以下校验。
        1、商户需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
        2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），
        3、校验通知中的seller_id（或者seller_email) 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email）
        4、验证app_id是否为该商户本身。
        */
        $arr = Orders::getOne('*', ['orderid' => $get['out_trade_no']]);
        /*
                {
                    "total_amount":"0.01",
                    "timestamp":"2017-10-08 10:39:17",
                    "sign":"HK",
                    "trade_no":"2017100821001004580200425933",
                    "sign_type":"RSA2",
                    "auth_app_id":"2016080500175385",
                    "charset":"UTF-8",
                    "seller_id":"2088102170106808",
                    "method":"alipay.trade.page.pay.return",
                    "app_id":"2016080500175385",
                    "out_trade_no":"ali2017100810331662",
                    "version":"1.0"
                }
        */
        if ($arr) {
            $return_url = urldecode($arr['return_url']);
            $return_url = $return_url . (strpos($return_url, '?') === false ? '?' : '&');
        } else {
            $return_url = '/';
        }

        if ($result) {//验证成功
            //header("Location: ".$return_url."json=".urlencode(json_encode($json)));
            if ($arr) {
                header("location:" . $return_url . "json=" . json_encode([
                        "code" => 1,
                        "msg" => '支付完成',
                        "data" => [
                            "pid" => $arr["pid"],
                            "pname" => $arr["pname"],
                            "subid" => $arr["subid"],
                            "subname" => $arr["subname"],
                            "orderid" => $arr["orderid"],
                            "openid" => $arr['openid'],
                            "nums" => $arr["nums"],
                            "price" => $arr["price"],
                            "discount" => $arr["discount"],
                            "amount" => $arr['amount'],
                            "amount_discount" => $arr["amount_discount"],
                            "status" => $arr['status']
                        ],
                        "token" => $arr["token"]
                    ]));
            } else {
                //如果之前未登记此单,则补单
                Orders::insert([
                    'amount_discount' => $get['total_amount'],
                    'orderid' => $get['out_trade_no'],
                    'trade_type' => 'ALIPAYPC',
                    'transaction_id' => $get['trade_no'],
                    'order_time' => $get['timestamp']
                ]);
            }
        } else {
            if ($arr) {
                header("location:" . $return_url . "json=" . json_encode([
                        "code" => -1,
                        "msg" => '支付验证失败',
                        "data" => [
                            "pid" => $arr["pid"],
                            "pname" => $arr["pname"],
                            "subid" => $arr["subid"],
                            "subname" => $arr["subname"],
                            "orderid" => $arr["orderid"],
                            "openid" => $arr['openid'],
                            "nums" => $arr["nums"],
                            "price" => $arr["price"],
                            "discount" => $arr["discount"],
                            "amount" => $arr['amount'],
                            "amount_discount" => $arr["amount_discount"],
                            "status" => $arr['status']
                        ],
                        'token' => $arr['token']]));
            } else {
                header("location:" . $return_url . "json=" . json_encode([
                        "code" => -2,
                        "msg" => '支付验证失败',
                        "data" => [
                        ],
                        'token' => '']));
            }
        }
        /*
        echo "sssss";
        File::log(json_encode($post));
        File::log(json_encode($get));
        if($get['trade_status']=='TRADE_SUCCESS') {
            $status = 'SUCCESS';
        }else {
            $status ='ALI_'.$get['trade_status'];
        }
            $time=$get['gmt_payment'];
            $orderid=$get['out_trade_no'];
            $openid=$get['buyer_id'];
            $transaction_id=$get['trade_no'];

            Orders::update([], ['payed_time' => $time, 'openid' => $openid, 'orderid' => $orderid, 'transaction_id' => $transaction_id, 'status' => $status], "update orders set openid=:openid,payed_time=:payed_time,status=:status, transaction_id=:transaction_id where orderid=:orderid and status <> 'SUCCESS'");
            File::log(Orders::$error_msg);
        */
    }

    /**
     * @param $args
     * @param $post
     * @param $get
     */
    public static function OrderNotifyUrl($args, $post, $get)
    {
        require self::$rootdir . '/Application/Common/third/alipay/config.php';
        File::log(json_encode($post));
        File::log(json_encode($get));
        //交易成功以后，会生成transaction_id检查订单的真实性
        //if ((new PayNotifyCallBack())->Queryorder($transaction_id)) {
        //    Orders::update([], ['payed_time' => $time, 'openid'=>$openid, 'orderid' => $orderid, 'transaction_id' => $transaction_id, 'status'=>$status], "update orders set openid=:openid,payed_time=:payed_time,status=:status, transaction_id=:transaction_id where orderid=:orderid and status <> 'SUCCESS'");
        //}
        $alipaySevice = new \AlipayTradeService($config);
        $alipaySevice->writeLog(var_export($_POST, true));
        $result = $alipaySevice->check($post);

        /* 实际验证过程建议商户添加以下校验。
        1、商户需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
        2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），
        3、校验通知中的seller_id（或者seller_email) 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email）
        4、验证app_id是否为该商户本身。
        */
        if ($result) {//验证成功
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //请在这里加上商户的业务逻辑程序代


            //——请根据您的业务逻辑来编写程序（以下代码仅作参考）——

            //获取支付宝的通知返回参数，可参考技术文档中服务器异步通知参数列表

            //商户订单号
            $out_trade_no = $_POST['out_trade_no'];

            //支付宝交易号
            $trade_no = $_POST['trade_no'];

            //交易状态
            $trade_status = $_POST['trade_status'];

            if ($_POST['trade_status'] == 'TRADE_FINISHED') {

                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //请务必判断请求时的total_amount与通知时获取的total_fee为一致的
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
            } else if ($_POST['trade_status'] == 'TRADE_SUCCESS') {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //请务必判断请求时的total_amount与通知时获取的total_fee为一致的
                //如果有做过处理，不执行商户的业务程序
                //注意：
                //付款完成后，支付宝系统发送该交易状态通知
                if ($post['trade_status'] == 'TRADE_SUCCESS') {
                    $status = 'SUCCESS';
                } else {
                    $status = 'ALI_' . $post['trade_status'];
                }
                $time = $post['gmt_payment'];
                $orderid = $post['out_trade_no'];
                $openid = $post['buyer_id'];
                $transaction_id = $post['trade_no'];

                Orders::update([], ['payed_time' => $time, 'openid' => $openid, 'orderid' => $orderid, 'transaction_id' => $transaction_id, 'status' => $status], "update orders set openid=:openid,payed_time=:payed_time,status=:status, transaction_id=:transaction_id where orderid=:orderid and status <> 'SUCCESS'");
                File::log(Orders::$error_msg);
            }
            //——请根据您的业务逻辑来编写程序（以上代码仅作参考）——
            echo "success";    //请不要修改或删除
        } else {
            //验证失败
                 $time = $post['gmt_payment'];
                $orderid = $post['out_trade_no'];
                $openid = $post['buyer_id'];
                $transaction_id = $post['trade_no'];
           echo "fail";
            Orders::update([], ['payed_time' => $time, 'openid' => $openid, 'orderid' => $orderid, 'transaction_id' => $transaction_id, 'status' => 'ALI_AUTH_FAILED'], "update orders set openid=:openid,payed_time=:payed_time,status=:status, transaction_id=:transaction_id where orderid=:orderid and status <> 'SUCCESS'");
        }

    }
}