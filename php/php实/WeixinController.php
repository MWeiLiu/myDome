<?php
/**
 * Created by IntelliJ IDEA.
 * User: user
 * Date: 2017/7/31
 * Time: 12:09
 */

namespace Application\Controller\Front;

use Application\Controller\AppController;
use Application\Model\AppModel;
use CnsPHP\Common\Str;
use CnsPHP\Common\Net;
use CnsPHP\Common\File;
use CnsPHP\Common\CnsMemcached;
use CnsPHP\Common\QRCode;

use CnsPHP\Controller\Auth as Auth;
use CnsPHP\Common\CheckCode;
use Application\Common\CnsToken;

class Users extends AppModel {};

class WeixinController
{
    /**
     * 微信登录 
     *
     *  登陆:
     *
     * 1) 获取code （生成下面连接的二维码，让用户去扫描)
     *    https:\/\/w.url.cn\/s\/ANFkMIv
     *
     * 2）code换access_token
     * https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx0362..bddb&secret=198c66..543b&code=081EqTL1..GL10EqTLJ&grant_type=authorization_code
     *
     * {"access_token":"-PMFxKKp6UmDtxjY..S33hSovlxbyazQ","expires_in":7200,"refresh_token":"T-H9A...k793mnvamyVIg","openid":"oLyV6w..jvrYTk","scope":"snsapi_userinfo"}
     *
     *
     * *)刷新token
     * https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=wx03..bddb&grant_type=refresh_token&refresh_token=NvPpu8KPc..axg
     *
     * {
     * "openid":          "oL..YTk",
     * "access_token":    "-PMFx..70mlIEXuJQ",
     * "expires_in":       7200,
     * "refresh_token":    "NvPpu8..vQaxg",
     * "scope":            "snsapi_userinfo,"
     * }
     *
     * 4)获取用户信息
     * https://api.weixin.qq.com/sns/userinfo?access_token=-PMFx..azQ&openid=oLy..gjvrYTk&lang=zh_CN
     *
     * {
     * "openid":"oLy..YTk",
     * "nickname":"姚: 2017专注潜心",
     * "sex":1,
     * "language":"zh_CN",
     * "city":"闵行",
     * "province":"上海",
     * "country":"中国",
     * "headimgurl":"http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j..QA\/0",
     * "privilege":[]
     * }
     *
     * *)
     * 检验授权凭证（access_token）是否有效
     * https://api.weixin.qq.com/sns/auth?access_token=-PMFxK..uJQ&openid=oLyV6...rYTk
     */


    /**
     * 获取全局AccessToken,用于获取短链接
     * @return string
     */
    private static function GetAccessToken(){
        //如果可以获取到access_token
        if(CnsMemcached::get('Third_WeiXin_AccessToken') && CnsMemcached::get('Third_WeiXin_AccessToken_Time')){
            if(time() - CnsMemcached::get('Third_WeiXin_AccessToken_Time')<6800) {
                return Str::msg(1,"get access token ok", ["Third_WeiXin_AccessToken"=>CnsMemcached::get('Third_WeiXin_AccessToken')],'',false);
            }
        }

        $appid=Str::c()->weixin->APPID;
        $secret=Str::c()->weixin->Secret;

        //get access_token
        //{"access_token":"ACCESS_TOKEN","expires_in":7200}
        $arr = Net::curl("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$secret");
        if(!$arr){
            return Str::msg(-1, "获取授权失败",[],'',false);
        }

        $json = json_decode($arr['content']);
        CnsMemcached::set('Third_WeiXin_AccessToken',$json->access_token, $json->expires_in);
        CnsMemcached::set('Third_WeiXin_AccessToken_Time',time(),$json->expires_in);
        return Str::msg(1,"get access token ok", ["Third_WeiXin_AccessToken"=>$json->access_token],'', false);
    }

    /**
     * 获取登陆长连接并转成短链接，最后生成二维码
     * Usage:
     *    <img src="/weixin/login-qrcode">
     * @param $args
     * @param $post
     * @param $get
     * @return string
     */
    public static function LoginQrcode($args, $post, $get) {
        $appid=Str::c()->weixin->APPID;
        $secret=Str::c()->weixin->Secret;
        if(isset($args['act']) && $args['act'] == 'url') {
            //直接使用url登陆 ，而不是扫码
            $state = uniqid('wx_uuid_url');
        }
        else {
            //扫码登陆
            $state = uniqid('wx_uuid');
        }

        $act ='{"action":"long2short","long_url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri='.urlencode(Str::c()->site->url).'%2Fweixin%2Fconnector&response_type=code&scope=snsapi_userinfo&state='. $state . '#wechat_redirect"}';
        //echo $act;
        $get_token=json_decode(WeixinController::GetAccessToken());
        if($get_token->code != 1){
            return Str::msg(-1, "获取授权失败");
        }

        $arr = Net::curl("https://api.weixin.qq.com/cgi-bin/shorturl?access_token=".$get_token->data->Third_WeiXin_AccessToken, $act);
        if(!$arr)
        {
            return Str::msg(-2,"获取短连接失败");
        }

        $json=json_decode($arr['content']);
        if($json->errcode != 0){
            return Str::msg(-3, "获取短连接失败2");
        }

        CnsMemcached::set($state,json_encode([]),600);
        setcookie("wx_state", $state, time() + 600, '/', Str::c()->site->domain);

        if(isset($args['act']) && $args['act'] == 'url')
           return Str::msg(8,'', ['url'=>$json->short_url]);
        else
           QRCode::png($json->short_url,false,QR_ECLEVEL_M,9,2,true);
    }

    /**
     * 由客户扫码以后的微信官方发来的$code获取登陆AppAccessToken
     * @param $code
     * @return string
     */
    private static function GetAppAccessToken($code){

        $appid=Str::c()->weixin->APPID;
        $secret=Str::c()->weixin->Secret;

        $arr = Net::curl("https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$secret&code=$code&grant_type=authorization_code");
        if(!$arr){
            return Str::msg(-1,"GetActionAccessToken failed",[],'',false);
        }

        return Str::msg(1,"",$arr['content'],'',false);
    }

    /**
     * 由$code和AppAccessToken获取用户信息
     * @param $code
     * @param $state
     * @return string
     */
    private static function WexinLogin($code,$state) {
        if(!CnsMemcached::get($state)) {
            //反馈给用户手机微信端
            return Str::msg(-1, "二维码已经过期，请刷新网页，重新尝试!");
        }

        $return = json_decode(WeixinController::GetAppAccessToken($code));
        if($return->code != 1)
        {
            return Str::msg(-2,"获取APP Token失败");
        }

        //{"access_token":"", "expires_in":7200, "refresh_token":"", "openid":"oLyV6wuNlVHdu7zqmOTmHgjvrYTk","scope":"snsapi_userinfo"}
        $json_app_access_token = json_decode($return->data);
//var_dump($json_app_access_token);
        $app_access_token = $json_app_access_token->access_token;
        $wx_user_openid = $json_app_access_token->openid;

        //由wx_user_openid查看用户是否已经绑定
        $arr = Users::getOne('*', ['wechat'=>$wx_user_openid]);

        //使用URL登陆
        if(strpos($state,'wx_uuid_url') === 0){
            if ($arr) {
                //如果用户已经绑定过
                $token = CnsToken::token($arr['uid'], ["_tk_uid" => $arr['uid'], "_tk_gid" => $arr['gid'], '_tk_ip' => Net::clientip()], 30);
                Users::update(['lastlogin' => date('Y-m-d H:i:s')], ['uid' => $arr['uid']]);
                $json=Str::msg(1, '登陆成功', ["uid" => $arr['uid'], "gid" => $arr['gid'], "mobile" => $arr['mobile'], "email" => $arr["email"]], $token,false);
                //返回登陆前端处理页面
                header("Location: ".Net::host()."/wxLogin.html?json=".urlencode($json));
            }
            else {
                //获取用户数据
                $return = Net::curl("https://api.weixin.qq.com/sns/userinfo?access_token=$app_access_token&openid=$wx_user_openid&lang=zh_CN");

                if (!$return)
                    return Str::msg(-3, "获取用户信息失败");

                $user_info = json_decode($return['content'], true);

                //如果用户没有绑定过
                $json=Str::msg(2, "用户已经扫描但还未绑定或注册系统帐号", [
                    'hasbind' => -1,
                    'wx_user_openid' => $wx_user_openid,
                    'user_info' => $user_info
                ],false);
                header("Location: ".Net::host()."/wxLogin.html?json=".urlencode($json));
            }

        } else {
            //扫码登陆
            //用户已经绑定微信，则直接登录
            if ($arr) {
                CnsMemcached::set($state, json_encode([
                        'uid' => $arr['uid'],
                        'gid' => $arr['gid'],
                        'mobile' => $arr['mobile'],
                        'email' => $arr['email'],
                        'hasbind' => 1,
                        'wx_user_openid' => $wx_user_openid]
                ), 600);
            } else {
                //获取用户数据
                $return = Net::curl("https://api.weixin.qq.com/sns/userinfo?access_token=$app_access_token&openid=$wx_user_openid&lang=zh_CN");

                if (!$return)
                    return Str::msg(-3, "获取用户信息失败");

                $user_info = json_decode($return['content'], true);
                CnsMemcached::set($state, json_encode(
                    [
                        'hasbind' => -1,
                        'wx_user_openid' => $wx_user_openid,
                        'user_info' => $user_info
                    ]
                ), 600);
            }
            //缓存用户数据

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
</head>
<body>
        <div style="text-algin: center;width:300px; margin:60px auto;">
        <img style="width: 300px;" src="data:image/png;base64,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hhoRERFDjYiIiKFGRETEUCMiIoYaERERQ42IiIihRkRExFAjIiKGGhEREUONiIiIoUZERMRQIyIiYqgRERFDjYiIiKFGRETEUCMiImKoERERQ42IiIihRkRExFAjIiJiqBERETHUiIiIoUZERMRQIyIiYqgREREx1IiIiKFGRETEUCMiImKoERERMdSIiIgYakRExFAjIiJiqBERETHUiIiIGGpERMRQIyIiYqgREREx1IiIiBhqREREDDUiImKoERERMdSIiIgYakRERAw1IiJiqBERETHUiIiIGGpEREQMNSIiIoYaEREx1IiIiBhqREREDDUiIiKGGhERMdSIiIgYakRERAw1IiIihhoRERFDjYiIGGpEREQMNSIiIoYaERERQ42IiBhqREREDDUiIiKGGhEREUONiIiIoUZERAw1IiIihhoRERFDjYiIiKFGREQMNe4CIiJiqBERETHUiIiIGGpEREQMNSIiYqgREREx1IiIiBhqREREDDUiIiKGGhERMdSIiIgYakRERAw1IiIihhoRETHUiIiIGGpEREQMNSIiIoYaERERQ42IiBhqREREDDUiIiKGGhEREUONiIgYakRERAw1IiIihhoRERFDjYiIiKFGREQMNSIiIoYaERERQ42IiIihRkREDDUiIiKGGhEREUONiIiIoUZERMRQIyIihhoRERFDjYiIiKFGRETEUCMiIoYaERERQ42IiIihRkRExFAjIiJiqBEREUONiIiIoUZERMRQIyIiYqgRERFDjYiIiKFGRETEUCMiImKoERERMdSIiIihRkRExFAjIiJiqBERETHUiIiIoUZERMRQIyIiYqgREREx1IiIiBhqRETEUCMiImKoERERMdSIiIgYakRExFAjIiJiqBERETHUiIiIGGpEREQMNSIiYqgREREx1IiIiBhqREREDDUiImKoERERMdSIiIgYakRERAw1IiIihhoRETHUiIiIGGpEREQMNSIiIoYaEREx1LgLiIiIoUZERMRQIyIiYqgREREx1IiIiKFGRETEUCMiImKoERERMdSIiIgYakRExFAjIiJiqBERETHUiIiIGGpERMRQIyIiYqgREREx1IiIiBhqREREDDUiImKoERERMdSIiIgYakRERAw1IiJiqBERETHUiIiIGGpEREQMNSIiIoYaEREx1IiIiBhqREREDDUiIiKGGhERMdSIiIgYakRERAw1IiIihhoRERFDjYiIGGpEREQMNSIiIoYaERERQ42IiBhqREREDDUiIiKGGhEREUONiIiIoUZERAw1IiIihhoRERFDjYiIiKFGREQMNSIiIoYaERERQ42IiIihRkRExFAjIiKGGhEREUONiIiIoUZERMRQIyIihhoRERFDjYiIiKFGRETEUCMiImKoERERQ42IiIihRkRExFAjIiJiqBEREUONiIiIoUZERMRQIyIiYqgREREx1IiIiKFGRETEUCMiImKoERERMdSIiIihRkRExFAjIiJiqBERETHUiIiIGGpERMRQIyIiYqgREREx1IiIiBhqRETEUOMuICIihhoRERFDjYiIiKFGRETEUCMiIoYaERERQ42IiIihRkRExFAjIiJiqBEREUONiIiIoUZERMRQIyIiYqgRERFDjYiIiKFGRETEUCMiImKoERERMdSIiIihRkRExFAjIiJiqBERETHUiIiIoUZERMRQIyIiYqgREREx1IiIiBhqRETEUCMiImKoERERMdSIiIgYakRExFAjIiJiqBERETHUiIiIGGpEREQMNSIiYqgREREx1IiIiBhqREREDDUiImKoERERMdSIiIgYakRERAw1IiIihhoRETHUiIiIGGpEREQMNSIiIoYaEREx1IiIiBhqREREDDUiIiKGGhEREUONiIgYakRERAw1IiIihhoRERFDjYiIGGpEREQMNSIiIoYaERERQ42IiIihRkREDDUiIiKGGhEREUONiIhId9JHeeMr5XKczCvCmYIi3C6rQGJ5JQpkMpTKagEAllJD2Eml6Gxuiq4WZgiys8FQBxuYSpjlRET/RAYKhULxKG1woawWR3Ly8Ud2PsLzClFeW6vT+uaGhhjqYINRbRwwwskOdlIpvwVERAy1llUhl+Ob5HSsv5uOYpmsSZ7TSmqIWW4ueNe1PczZeiMiYqg1NzmA0LQsLE9IRWZVdbO8hrOJMT7s0hHT2jvD0IBfCiIihlozyKiqxuQrcbhUVNoir9fb2hI/+3mhvYkxvxlERAy1pnOxuBSTL8c1W+tMU6vtZ18v9LOx5LeDiIih1nh7M3Px7o07qJLLH8rrm0gk2NCjCya2c+I3hIiIoda4QHvj2q1WsS2bvT0wqZUFm0wmQ1JSEgDAwcEB9vb2GpfPyspCcXExDAwM0LVr1xbb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" >
        <div>
</body>
</html>      
_EOF_;
            //return Str::msg(1, "扫描成功，请前往网站进行操作login success");
        }
    }

    public static function Connector($args, $post, $get)
    {
        error_reporting(E_ALL ^ E_NOTICE);

        File::log("wxpay return POST: " . json_encode($post) . " GET: " . json_encode($get) . " Raw: " . file_get_contents("php://input"));
        //微信登陆授权
        if (isset($get['code']) && isset($get['state']) && strpos($get['state'], 'wx_uuid') === 0) {
           return WeixinController::WexinLogin($get['code'], $get['state']);
        }

        return Str::msg(1, "wait ...");

        $weixin_access_token = WeixinController::GetToken();
        if ($args['act'] == 'wxpay_return') {
            File::log("wxpay return POST: " . json_encode($post) . " GET: " . json_encode($get) . " Raw: " . file_get_contents("php://input"));
        } else if ($args['act'] == 'createmenu') {
            return Str::msg(-2, 'wait administrator to permit');

            $url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=$weixin_access_token";
            $menu = ' {
             "button":[
             {
                  "type":"click",
                  "name":"今日歌曲",
                  "key":"V1001_TODAY_MUSIC"
              },
              {
                   "type":"click",
                   "name":"歌手简介",
                   "key":"V1001_TODAY_SINGER"
              },
              {
                   "name":"菜单",
                   "sub_button":[
                   {
                       "type":"view",
                       "name":"搜索",
                       "url":"http://www.soso.com/"
                    },
                    {
                       "type":"view",
                       "name":"视频",
                       "url":"http://v.qq.com/"
                    },
                    {
                       "type":"click",
                       "name":"赞一下我们",
                       "key":"V1001_GOOD"
                    }]
               }]
         }';

            $return = Net::curl($url, $menu);
            File::log(json_encode($return));
            if (preg_match('/{"errcode":0,"errmsg":"ok"}/', $return['content']) == 1) {
                return Str::msg(1, 'create menu ok');
            } else {
                return Str::msg(-1, 'create menu failed');
            }
        } else {
            //单纯验证
            if (WeixinController::Sign($args, $post, $get)) {
                echo $get['echostr'];
            } else {
                WeixinController::GetRequest($args, $post, $get);
            }
        }
    }

    private static function GetToken()
    {
        $weixin_access_token = CnsMemcached::get('weixin_access_token');
        if ($weixin_access_token == FALSE) {
            $json = Net::curl("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx036..db&secret=198c..a6543b");
            if (preg_match('|(\{"access_token":"[^"]+","expires_in":\d+\})|', $json['content'], $str) == 1) {
                $arr = json_decode($str[0], true);

                if (isset($arr['access_token']) && strlen($arr['access_token']) > 100) {
                    File::log(' Get access token ok...' . $arr['access_token']);
                    CnsMemcached::set('weixin_access_token', $arr['access_token'], $arr['expires_in'] - 300);
                    return $arr['access_token'];
                }
            } else {
                File::log(' Get access token error...');
            }
        } else {
            File::log(' Get access token ok... ' . $weixin_access_token);
            return $weixin_access_token;
        }
    }

    private static function Sign($args, $post, $get)
    {
        $token = '505ab...86b6';
        $nonce = $get['nonce'];
        $timestamp = $get['timestamp'];
        $echostr = $get['echostr'];
        $signature = $get['signature'];

        $arr = [$token, $timestamp, $nonce];
        sort($arr);
        if (sha1(implode($arr)) == $signature) {
            return $echostr;
        } else {
            return false;
        }
    }

    private static function GetRequest($args, $post, $get)
    {
        $postStr = file_get_contents("php://input");

        if (strlen($postStr) > 0) {
            $obj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
            $fromUsername = $obj->FromUserName;
            $toUsername = $obj->ToUserName;
            $keyword = trim($obj->Content);
            $time = time(); //获取当前时间戳
            $msgType = $obj->MsgType;

            if ($obj->MsgType == 'text') {
                $textTpl = "<xml>
  <ToUserName><![CDATA[%s]]></ToUserName>
  <FromUserName><![CDATA[%s]]></FromUserName>
  <CreateTime>%s</CreateTime>
  <MsgType><![CDATA[%s]]></MsgType>
  <Content><![CDATA[%s]]></Content>
  <FuncFlag>0</FuncFlag>
  </xml>";

                $contentStr = "欢迎访问，请问您有什么问题吗？ 开发者帐号";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                File::log($resultStr);
                echo $resultStr;
            } else if ($obj->MsgType == 'image') {
                echo 'success';
            } else if ($obj->MsgType == 'voice') {
                echo 'success';
            } else if ($obj->MsgType == 'video') {
                echo 'success';
            } else if ($obj->MsgType == 'location') {
                echo 'success';
            } else if ($obj->MsgType == 'link') {
                echo 'success';
            } else if ($obj->MsgType == 'event') {
                echo 'success';
            }
        } else
            echo 'success';
    }
}
