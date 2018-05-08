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

include_once "Application/Common/third/wxpay/lib/WxPay.Api.php";
include_once "Application/Common/third/wxpay/lib/WxPay.Notify.php";
include_once "Application/Common/third/wxpay/example/WxPay.JsApiPay.php";
include_once "Application/Common/third/wxpay/example/WxPay.NativePay.php";

class Users extends AppModel
{
}

class Orders extends AppModel
{
}

class Products extends AppModel
{
}

class Abc extends AppModel
{
    public static $tableName = 'orders';

    public static function getOne2()
    {
    }
}


class WxpayController extends AppController
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
            return Str::msg(-1,  '价格与折扣数量不符', [], '',false);
        }

        //如果子项目ID为>=0的值，则需要比对产品价格，防止篡改
        if ($subid >= 0) {
            $arr = Products::getOne('json', ['pid' => $pid]);

            if (!$arr) {
                Str::msg(-2, '无此作品', [], '',false);
            }

            $json = json_decode($arr['json']);

            //{"price":[{"subid": "0", "price":"10","discount":"95"}, {"subid": "-1", "price":"10","discount":"95"}]}
            $json_price = $json->price;
            $has_this_sub = false;
            for ($j = 0; $j < count($json_price); $j++) {
                if ($json_price[$j]->subid == $subid) {
                    $has_this_sub = true;
                    if (floor($json_price[$j]->price) != floor($price) || floor($json_price[$j]->discount) != floor($discount)) {
                        return Str::msg(-3, '价格或折扣与作品不符合', [], '',false);
                    }
                    break;
                }
            }
            if (!$has_this_sub) {
                return Str::msg(-4, '无此作品子项', [], '',false);
            }
        }
        return true;
    }

    /**
     * JSAPI支付
     * @param $args
     * @param $post
     * @param $get
     */
    public static function OrderJsapi($args, $post, $get)
    {
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
        $return_url = $get['return_url'] . (strpos($get['return_url'], '?') === false ? '?' : '&');
        $json=self::OrderBeforePay($args, $post, $get);
        if($json !== true){
           header("Location: ".$return_url."json=".urlencode(json_encode($json)));
        }

        //①、获取用户openid
        $tools = new \JsApiPay();
        $openId = $tools->GetOpenid();
        //var_dump($openId);

        //②、统一下单
        $input = new \WxPayUnifiedOrder();
        $input->SetBody("test");
        $input->SetAttach("test");
        $orderid = \WxPayConfig::MCHID . date("YmdHis") . rand(0, 99);
        $input->SetOut_trade_no($orderid);

        //订单金额
        $input->SetTotal_fee($get['amount_discount'] * 100);
        $order_total_discount_tmp = number_format($get['amount_discount'], 2, '.', ',');
        $input->SetTime_start(date("YmdHis"));
        $input->SetTime_expire(date("YmdHis", time() + 600));
        $input->SetGoods_tag("test");
        $input->SetNotify_url(Net::host()."/wxpay/notify");
        $input->SetTrade_type("JSAPI");
        $input->SetOpenid($openId);
        $order = \WxPayApi::unifiedOrder($input);

        $jsApiParameters = $tools->GetJsApiParameters($order);

        //获取共享收货地址js函数参数
        $editAddress = $tools->GetEditAddressParameters();

        Orders::insert([
            'orderid' => $orderid,
            'uid' => $args['_tk_uid'],
            'pid' => $get['pid'],
            'pname' => $get['pname'],
            'subid' => $get['subid'],
            'subname' => $get['subname'],
            'price' => $get['price'],
            'nums' => $get['nums'],
            'discount' => $get['discount'],
            'amount' => $get['amount'],
            'amount_discount' => $get['amount_discount'],
            'openid' => $openId
        ]);
        $host = Net::host();

        echo <<<_EOF_
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
    <meta name="format-detection" content="telephone=no">
    <meta http-equiv="Expires" CONTENT="0">
    <meta http-equiv="Cache-Control" CONTENT="no-cache">
    <meta http-equiv="Pragma" CONTENT="no-cache">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <meta name="renderer" content="webkit">
    <title></title>
    <style type="text/css">
        html,body {
            width: 100%;
            height: 100%;
        }
        body {
            background-color: #fff;
            font-size: 14px;
            font-family:"SourceHanSansCN-Light";
            overflow-x: hidden;
        }
        ul {
            width: 100%;
            margin: 0;
            padding: 0;
        }
        .orderPageBox {
            width: 100%;
            height: 100%;
        }
        .orderPageBox li {
            width: 100%;
            height: 40px;
            list-style: none;
            background-color:#fff;
            line-height:40px;
            padding-left:2%;
            padding-right: 2%;
            display:flex;
            display:-webkit-flex;
            display:-moz-flex;
            display:-ms-flex;

        }
        .orderPageBox ul li:nth-child(odd) {
            background-color:#FAFAFA;
        }
        .orderPageBox li span:nth-child(1) {
            color: #212121;
            letter-spacing:1.3px;
            flex:1;
            -webkit-flex: 1;
            -moz-flex:1;
            -ms-flex:1;
        }
        .orderPageBox li span:nth-child(2) {
            float: left;
            color:#212121;
            letter-spacing:1.5px;
            flex:4;
            -webkit-flex: 4;
            -moz-flex: 4;
            -ms-flex: 4;

        }
        .payoff {
            width: 40%;
            border-radius:5px;
            -webkit-border-radius:5px;
            -moz-border-radius:5px;
            color: #0EBAC5;
            color:#fff;
            background-color: #0EBAC5;
            line-height:35px;
            text-align: center;
            letter-spacing:2px;
            font-size: 16px;
            margin: 100px auto 30px;
        }
    </style>

    <script type="text/javascript">
        //调用微信JS api 支付
        function jsApiCall() {
            try {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    $jsApiParameters,
                    function (res) {
                        //alert(114);
                        //WeixinJSBridge.log(res.err_msg);
                        if(res.err_msg == 'get_brand_wcpay_request:ok'){
                            //通知后台更新用户支付状态为，已经支付，等待银行通知
                            try{
                            var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function() {
                                   if (this.readyState == 4 && this.status == 200) {
                                       //alert('user has payed and then wait notify');
                                     console.log('user has payed and then wait notify');
                                   }
                            };
                            xhttp.withCredentials = true;
                            xhttp.open("GET", "$host/wxpay/notify?orderid=$orderid&status=WAIT_NOTIFY", true);
                            xhttp.send(); 
                            }catch(e2){
                                alert(e2.message);
                            }
                            //告知用户支付成功
                            var return_url = '{$return_url}json='+encodeURI(JSON.stringify({
                                   code:1, msg:'支付成功', 
                                   data:{
                                           pid:'{$get["pid"]}', 
                                           pname:'{$get["pname"]}',
                                           subid: '{$get["subid"]}',
                                           subname: '{$get["subname"]}',
                                           orderid:'{$get["orderid"]}', 
                                           openid: '$openId',
                                           nums: '{$get["nums"]}',
                                           price: '{$get["price"]}',
                                           discount: '{$get["discount"]}',
                                           amount:'$order_total_discount_tmp',
                                           amount_discount: '{$get["amount_discount"]}'
                                   },
                                   token: '{$args["_tk_token"]}'
                            }));
                            //alert('支付完成,请前往帐单中心');
                            window.location.replace(return_url);
                        } else if(res.err_msg == 'get_brand_wcpay_request:cancel') {
                            alert('用户取消支付');
                        } else {
                            alert('124: '+res.err_msg);
                        }
                        //alert('123'+ ' '+ res.err_code + ' ' + res.err_desc + ' ' + res.err_msg);
                    }
                );
            } catch (e) {
                alert("error: " + e.message + ": " + e.line)
            }
        }

        function callpay() {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                    document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                }
            } else {
                jsApiCall();
            }
        }

        //第一步进这个函数
        //获取共享地址
        function editAddress() {
            try {
                WeixinJSBridge.invoke(
                    'editAddress',
                    $editAddress,
                    function (res) {
                        var value1 = res.proviceFirstStageName;
                        var value2 = res.addressCitySecondStageName;
                        var value3 = res.addressCountiesThirdStageName;
                        var value4 = res.addressDetailInfo;
                        var tel = res.telNumber;
                        //alert(158);
                        //alert(value1 +' ' + value2 +' ' + value3 + ' ' + value4 + ":" + tel);
                    }
                );
            } catch (e) {
                //alert("error: " + e.message + ": " + e.line)
            }
        }

        window.onload = function () {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', editAddress, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', editAddress);
                    document.attachEvent('onWeixinJSBridgeReady', editAddress);
                }
            } else {
                editAddress();
            }
        };
    </script>
</head>
<body>
    <div class="orderPageBox">
        <div style="text-align: center;color:#f00;"><span><b>统一下单支付单信息</b></span></div>
        <div>
           <ul>
              <li> <span>单号:</span> <span>$orderid</span> </li>
              <li> <span>产品ID:</span> <span>{$get['pid']}-{$get['subid']}</span> </li>
              <li> <span>产品名称:</span> <span>{$get['pname']}-{$get['subname']}</span> </li>
              <li> <span>单价:</span> <span>{$get['price']}</span> </li>
              <li> <span>折扣:</span> <span>{$get['discount']}</span> </li>
              <li> <span>总价:</span> <span>{$get['amount']}</span> </li>
              <li> <span>折后价:</span> <span>{$get['amount_discount']}</span> </li>
           </ul>
        </div>      
        <div class="payoff" onclick="callpay()"> 支付<span>{$order_total_discount_tmp}元</span> </div>
    </div>        
    <!--
    <table>
     <tr> <td>单号: </td> <td>$orderid</td> </tr>
     <tr> <td>产品ID: </td> <td>{$get['pid']}</td> </tr>
     <tr> <td>产品名称: </td> <td>{$get['pname']}</td> </tr>
     <tr> <td>子项ID: </td> <td>{$get['subid']}</td> </tr>
     <tr> <td>子项名称: </td> <td>{$get['subname']}</td> </tr>
     <tr> <td>产品描述: </td> <td>{$get['abstract']}</td> </tr>
     <tr> <td>数量: </td> <td>{$get['nums']}</td> </tr>
     <tr> <td>单价: </td> <td>{$get['price']}</td> </tr>
     <tr> <td>折扣: </td> <td>{$get['discount']}</td> </tr>
     <tr> <td>总价: </td> <td>{$get['amount']}</td> </tr>
     <tr> <td>折后价: </td> <td>{$get['amount_discount']}</td> </tr>
    </table>

    <span style="color:#9ACD32"><b>该笔订单支付金额为<span style="color:#f00;font-size:50px">$order_total_discount_tmp</span>元钱</b></span><br/><br/>
    <div align="center"> <button style="width:210px; height:50px; border-radius: 15px;background-color:#FE6714; border:0px #FE6714 solid; cursor: pointer;  color:white;  font-size:16px;" type="button" onclick="callpay()">立即支付</button> </div>
    -->
</body>
</html>
_EOF_;
    }

    /**
     * 生成二维码
     * @param $args
     * @param $post
     * @param $get
     */
    public static function Qrcode($args, $post, $get)
    {
        QRCode::png(urldecode($args['text']), false, QR_ECLEVEL_M, 9, 2, true);
    }

    /**
     * 扫码支付,生成二维码，给前端页面(见下面注释中html)调用，
     * 前端页同时开始js timeout每2秒查询一次系统扫码状态
     * @param $args
     * @param $post
     * @param $get "/wxpay/order-qrcode/_tk_token/xxxx/_tk_uid/100000059?return_url=http%3A%2F%2Fhtml.qcourse.com%2F&pid=1034&subid=1&subname=xxx&pname=ffff&abstract=dddd&nums=1&price=0.01&discount=100&amount=0.01&amount_discount=0.01"
     * @return string|void
     *
       前端流程:
         1) GET wxpay/order-qrcode并发送订单数据，
         2）后台接收到GET后，生成订单并保存数据库后，返回含orderid的微信官方订单二维码图片连接
         3) 前端接收到二维码后，把二维码src赋给 img src, 并弹出二维码供用户扫码
         4) 定时检测交易状态
         5) 检测到用户扫码支付成功后，停止定时任务, 并在本系界面弹出通知用户支付成功
        echo <<<_EOF_
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script>
        var myIntval = null;

        function func() {
            console.log(1111);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function (data) {
                if (this.readyState == 4 && this.status == 200) {
                    var json = JSON.parse(xhttp.responseText);
                    console.log(json.data.url);
                    document.getElementById('img').src = json.data.url;
                    alert('user has payed and then wait notify');
                    var orderid = json.data.orderid;
                    myIntval = setInterval(function () {
                        load(orderid)
                    }, 1000 * 2);

                }
            };
            xhttp.withCredentials = true;
            xhttp.open("GET", "https://www.qcourse.com/wxpay/order-qrcode/_tk_token/xxxx/_tk_uid/100000059?return_url=http%3A%2F%2Fhtml.qcourse.com%2F&pid=1034&subid=1&subname=xxx&pname=ffff&abstract=dddd&nums=1&price=0.01&discount=100&amount=0.01&amount_discount=0.01", true);
            xhttp.send();
        }

        function load(orderid) {
            $.get("https://www.qcourse.com/wxpay/query-status/orderid/" + orderid, function (data) {
                console.log(data);
                console.log(data.data.status)
                if (data.data.status == 'SUCCESS') {
                    console.log('支付成功');
                    clearInterval(myIntval);
                    alert('支付成功');
                } else if (data.data.status == 'NOTPAY') {
                    console.log('尚未支付');
                } else if (data.data.status == 'WAIT_NOTIFY') {
                    console.log('用户已经支付，等待系统确认');
                } else if (data.data.status == 'CLOSED') {
                    console.log('交易已关闭');
                    clearInterval(myIntval);
                } else if (data.data.status == 'REVOKED') {
                    console.log('交易已撤销');
                    clearInterval(myIntval);
                } else if (data.data.status == 'USERPAYING') {
                    console.log('用户支付中');
                } else if (data.data.status == 'PAYERROR') {
                    console.log('支付失败');
                    clearInterval(myIntval);
                }
            }, "json");
        }
    </script>
</head>
<body>
<button onclick="javascript:func();">Pay</button>
<br>
<br>

<img src="" id="img" width="150px" height="150px">

</body>
</html>
_EOF_;
*/
    public static function OrderQrcode($args, $post, $get)
    {
        $json =self::OrderBeforePay($args, $post, $get);
        if($json !== true){
            echo $json;
            return;
        }
        $return_url = $get['return_url'] . (strpos($get['return_url'], '?') === false ? '?' : '&');

        $notify = new \NativePay();
        $input = new \WxPayUnifiedOrder();
        $input->SetBody($get['pname']);
        $input->SetAttach($get['subname']);
        $orderid = \WxPayConfig::MCHID . date("YmdHis") . rand(0, 99);
        $input->SetOut_trade_no($orderid);
        $input->SetOut_trade_no($orderid);
        $input->SetTotal_fee($get['amount_discount']*100);
        $input->SetTime_start(date("YmdHis"));
        $input->SetTime_expire(date("YmdHis", time() + 600));
        $input->SetGoods_tag($get['pname'].':'.$get['subname']);
        $input->SetNotify_url(Net::host()."/wxpay/notify");
        $input->SetTrade_type("NATIVE");
        $input->SetProduct_id($get['pid'].':'.$get['subid']);
        $result = $notify->GetPayUrl($input);
        $url2 = $result["code_url"];
        $qrurl = urlencode($url2);

        Orders::insert([
            'orderid' => $orderid,
            'uid' => $args['_tk_uid'],
            'pid' => $get['pid'],
            'pname' => $get['pname'],
            'subid' => $get['subid'],
            'subname' => $get['subname'],
            'price' => $get['price'],
            'nums' => $get['nums'],
            'discount' => $get['discount'],
            'amount' => $get['amount'],
            'amount_discount' => $get['amount_discount'],
            'trade_type' => 'SCANQRCODE'
        ]);

        return Str::msg(1,"生成二维码成功",['url'=>Net::host()."/wxpay/qrcode/text/$qrurl",'orderid'=>$orderid]);
    }

    /**
     *
     * <xml>
     *    <appid><![CDATA[wx036204f5d1a2bddb]]></appid>
     *    <attach><![CDATA[test]]></attach>
     *    <bank_type><![CDATA[CFT]]></bank_type>
     *    <cash_fee><![CDATA[1]]></cash_fee>
     *    <fee_type><![CDATA[CNY]]></fee_type>
     *    <is_subscribe><![CDATA[Y]]></is_subscribe>
     *    <mch_id><![CDATA[1486237962]]></mch_id>
     *    <nonce_str><![CDATA[qebl3t71pqa5aqq6ql6x5ecyjsinyet7]]></nonce_str>
     *    <openid><![CDATA[oLyV6wuNlVHdu7zqmOTmHgjvrYTk]]></openid>
     *    <out_trade_no><![CDATA[14862379622017091812452528]]></out_trade_no>
     *    <result_code><![CDATA[SUCCESS]]></result_code>
     *    <return_code><![CDATA[SUCCESS]]></return_code>
     *    <sign><![CDATA[ADA5E46E5D3673C0BE89645CCF3A80E4]]></sign>
     *    <time_end><![CDATA[20170918124554]]></time_end>
     *    <total_fee>1</total_fee>
     *    <trade_type><![CDATA[JSAPI]]></trade_type>
     *    <transaction_id><![CDATA[4200000023201709182795596099]]></transaction_id>
     * </xml>
     */

    /**
     * //未完成支付时返回
     * return {
        "appid": "wx036204f5d1a2bddb",
        "mch_id": "1486237962",
        "nonce_str": "H7MGi3SM2R0jF87s",
        "out_trade_no": "14862379622017092300191395",
        "result_code": "SUCCESS",
        "return_code": "SUCCESS",
        "return_msg": "OK",
        "sign": "BC3BD9663CA8131DB58A51DB95C5D30A",
        "trade_state": "NOTPAY",
        "trade_state_desc": "\u8ba2\u5355\u672a\u652f\u4ed8"
       }
     *
     * 支付成功后的返回:
     * {
    "appid": "wx036204f5d1a2bddb",
    "attach": "test",
    "bank_type": "CFT",
    "cash_fee": "1",
    "fee_type": "CNY",
    "is_subscribe": "N",
    "mch_id": "1486237962",
    "nonce_str": "BvGN6Oo9MNxYmDlt",
    "openid": "oLyV6wqEWwTKoNlUGQkVTLoD4b5U",
    "out_trade_no": "14862379622017092300270553",
    "result_code": "SUCCESS",
    "return_code": "SUCCESS",
    "return_msg": "OK",
    "sign": "228DD61E6E57F1650E21C6E4627AF687",
    "time_end": "20170923002718",
    "total_fee": "1",
    "trade_state": "SUCCESS",
    "trade_type": "NATIVE",
    "transaction_id": "4200000001201709233671476248"
    }
     */
    /**
     * 获取订单在微信官方的订单状态
     * @param $args
     * @param array $post
     * @param array $get
     * @return array
     */
    private static function QueryWxpayStatus($args,$post=[],$get=[])
    {
        if (isset($args["transid"]) && $args["transid"] != "") {
            $transaction_id = $args["transid"];
            $input = new \WxPayOrderQuery();
            $input->SetTransaction_id($transaction_id);
            $arr = \WxPayApi::orderQuery($input);
            return $arr;
        } else if (isset($args["orderid"]) && $args["orderid"] != "") {
            $out_trade_no = $args["orderid"];
            $input = new \WxPayOrderQuery();
            $input->SetOut_trade_no($out_trade_no);
            $arr = \WxPayApi::orderQuery($input);
            return $arr;
        }
        return [];
    }

    /**
     * 获取订单在本系统内订单状态
     * @param $args
     * @param $post
     * @param $get
     * @return json
     */
    public static function QueryStatus($args,$post,$get) {
        $orderid='';
        if(isset($post['orderid']))
            $orderid = $post['orderid'];
        else if(isset($get['orderid']))
            $orderid = $get['orderid'];
        else if(isset($args['orderid']))
            $orderid = $args['orderid'];
        $arr=self::QueryWxpayStatus(['orderid'=>$orderid]);
       // $json = json_decode($json);
        if(isset($arr['trade_state'])){
        if($arr['trade_state'] == 'SUCCESS'){
            Orders::update([], ['payed_time' => $arr['time_end'], 'openid'=>$arr['openid'], 'orderid' => $orderid, 'transaction_id' => $arr['transaction_id'], 'status'=>'SUCCESS'], "update orders set openid=:openid,payed_time=:payed_time,status=:status, transaction_id=:transaction_id where orderid=:orderid and status <> 'SUCCESS'");
            return Str::msg(1,'订单支付成功',['orderid'=>$orderid, 'status'=>'SUCCESS']);
        }
        else {
            Orders::update([], ['payed_time' => $arr['time_end'], 'openid'=>$arr['openid'], 'orderid' => $orderid, 'transaction_id' => $arr['transaction_id'], 'status'=>$arr['trade_state']], "update orders set openid=:openid,payed_time=:payed_time,status=:status, transaction_id=:transaction_id where orderid=:orderid and status <> 'SUCCESS'");
            return Str::msg(2,'订单支付状态'.$arr['trade_state'],['orderid'=>$orderid, 'status'=>$arr['trade_state']]);
        }
        }
        return Str::msg(-1,'未知错误');
    }

    /**
     * 支付完成后，等待微信官方通知
     * @param $args
     * @param $get
     * @param $post
     */
    public static function Notify($args, $post, $get)
    {
        File::log('Args:' . json_encode($args) . ' Get: ' . json_encode($get) . ' Post:' . json_encode($post) . ' raw: ' . file_get_contents("php://input"));
        //控制通知来源为自己域名或微信域名
        File::log($_SERVER['HTTP_REFERER']);
        //状态为用户已经支付过，等待银行通知
        if (isset($get['status']) && $get['status'] == 'WAIT_NOTIFY') {
            Orders::update([], ['orderid' => $get['orderid']], "update orders set status='WAIT_NOTIFY' where orderid=:orderid and status='UNPAY' ");
        } //微信银行通知
        else {
            $raw = file_get_contents("php://input");
            if ($raw) {
                $obj = simplexml_load_string($raw, 'SimpleXMLElement', LIBXML_NOCDATA);

                $appid = $obj->appid;
                //商家数据包，原样返回
                $attach = $obj->attach;
                $back_type = $obj->bank_type;
                $cash_fee = $obj->cash_fee;
                $fee_type = $obj->fee_type;
                $is_subscribe = $obj->is_subscribe;
                //微信支付分配的商户号
                $mch_id = $obj->mch_id;
                //随机字符串，不长于32位
                $nonce_str = $obj->nonce_str;
                //用户在商户appid下的唯一标识
                $openid = $obj->openid;
                $orderid = $obj->out_trade_no;
                //业务结果 SUCCESS/FAIL
                $result_code = $obj->result_code;
                //SUCCESS/FAIL  是通信标识，非交易标识，交易是否成功需要查看result_code来判断
                $return_code = $obj->return_code;
                $sign = $obj->sign;
                //订单总金额，单位为分
                $total_fee = $obj->total_fee;
                //JSAPI、NATIVE、APP
                $trade_type = $obj->trade_type;
                $transaction_id = $obj->transaction_id;
                //支付完成时间
                $time_end = $obj->time_end;
                $time = date("Y-m-d H:i:s"); //获取当前时间戳

                if ($return_code  == 'SUCCESS') {
                    if($result_code== 'SUCCESS') {
                        $status = 'SUCCESS';
                    }else if($result_code == 'FAIL') {
                        $status = 'FAILED';
                    }
                    //交易成功以后，会生成transaction_id检查订单的真实性
                    if ((new PayNotifyCallBack())->Queryorder($transaction_id)) {
                        Orders::update([], ['payed_time' => $time, 'openid'=>$openid, 'orderid' => $orderid, 'transaction_id' => $transaction_id, 'status'=>$status], "update orders set openid=:openid,payed_time=:payed_time,status=:status, transaction_id=:transaction_id where orderid=:orderid and status <> 'SUCCESS'");
                    }
                }
                //$notify = new \NativeNotifyCallBack();
                //$notify->Handle(true);
            }
        }
    }
}

/**
 * Class PayNotifyCallBack 查询订单的真实性，防止造假
 * @package Application\Controller\Front
 */
class PayNotifyCallBack extends \WxPayNotify
{
    //查询订单
    public function Queryorder($transaction_id)
    {
        $input = new \WxPayOrderQuery();
        $input->SetTransaction_id($transaction_id);
        $result = \WxPayApi::orderQuery($input);
        if (array_key_exists("return_code", $result)
            && array_key_exists("result_code", $result)
            && $result["return_code"] == "SUCCESS"
            && $result["result_code"] == "SUCCESS") {
            return true;
        }
        return false;
    }

    //重写回调处理函数
    public function NotifyProcess($data, &$msg)
    {
        $notfiyOutput = array();

        if (!array_key_exists("transaction_id", $data)) {
            $msg = "输入参数不正确";
            return false;
        }
        //查询订单，判断订单真实性
        if (!$this->Queryorder($data["transaction_id"])) {
            $msg = "订单查询失败";
            return false;
        }
        return true;
    }
}
