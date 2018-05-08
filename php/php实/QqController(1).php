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

use CnsPHP\Controller\Auth as Auth;
use CnsPHP\Common\CheckCode;
use Application\Common\CnsToken;

class Users extends AppModel
{
}

class QqController
{
    /*
     * 1) 登录连接
     *    https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101...41&redirect_uri=http%3A%2F%2Fwww.qcourse.com%2Fqq%2Fouth-callback&state=123456&scope=get_user_info
     *    登陆成功后，QQ会回调
     *    https://www.qcourse.com/qq/outh-callback?code=121C..A17EB&state=123456
     *
     *  2)通过code获取token
     *    https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=10..41&client_secret=ed92...947831&code=$code&redirect_uri=http%3A%2F%2Fwww.qcourse.com%2Fqq%2Fouth-callback&state=$state
     *
     *  3)通过token获取client_id和openid
     *    https://graph.qq.com/oauth2.0/me?access_token=$access_token
     *
     *  4)通过token, client_id, openid获取user_info
     *    https://graph.qq.com/user/get_user_info?access_token='.$access_token.'&oauth_consumer_key='.$obj->client_id.'&openid='.$obj->openid
     *
     */
    public static function OuthCallback($args, $post, $get)
    {

        //var_dump(Net::host());
        //1)获取code
        if (isset($get['code']) && isset($get['state'])) {
            $code = $get['code'];
            $state = $get['state'];

            //2)获取token
            $token_url = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=1..41&client_secret=ed9..47831&code=$code&redirect_uri=".urlencode(Str::c()->site->url)."%2Fqq%2Fouth-callback&state=$state";
            $arr = Net::curl($token_url);
            if (!$arr)
                return Str::msg(-1, "由code获取token失败");

            //access_token=F930..27&expires_in=7776000&refresh_token=ABF..FAB
            $token_str = $arr['content'];
            parse_str("$token_str", $token_arr);

            $access_token = $token_arr['access_token'];
            $expires_in = $token_arr['expires_in'];
            $refresh_token = $token_arr['refresh_token'];

            //2)获取client_id和openid
            $openid_url = "https://graph.qq.com/oauth2.0/me?access_token=$access_token";
            $openid_arr = Net::curl($openid_url);
            // "callback( {"client_id":"101417141","openid":"B504..0"} ); " }
            $openid_str = $openid_arr['content'];
            $str = preg_replace('/callback\(|\)|;/', '', $openid_str);
            $obj = json_decode(trim($str));

            //由wx_user_openid查看用户是否已经绑定
            $arr = Users::getOne('*', ['qq' => $obj->openid]);

            //如果用户已经绑定QQ，则直接登录
            if ($arr) {
                $token = CnsToken::token($arr['uid'], ["_tk_uid" => $arr['uid'], "_tk_gid" => $arr['gid'], '_tk_ip' => Net::clientip()], 30);
                Users::update(['lastlogin' => date('Y-m-d H:i:s')], ['uid' => $arr['uid']]);
                header("Location: ".Net::host()."/personal.html?code=1&msg=qqloginok&uid=".$arr['uid']."&gid=".$arr['gid']."&token=".$token."&state=".$state);
            } else {
                //获取用户信息
                //string(790) "{ "ret": 0, "msg": "", "is_lost":0, "nickname": "上海-姚", "gender": "男", "province": "上海", "city": "", "year": "1980", "figureurl": "http:\/\/qzapp.qlogo.cn\/qzapp\/101417141\/B5...D80\/30", "figureurl_1": "http:\/\/qzapp.qlogo.cn\/qzapp\/101417141\/B5..80\/50", "figureurl_2": "http:\/\/qzapp.qlogo.cn\/qzapp\/101417141\/B5..80\/100", "figureurl_qq_1": "http:\/\/q.qlogo.cn\/qqapp\/101417141\/B5..3D80\/40", "figureurl_qq_2": "http:\/\/q.qlogo.cn\/qqapp\/101417141\/B..43D80\/100", "is_yellow_vip": "0", "vip": "0", "yellow_vip_level": "0", "level": "0", "is_yellow_year_vip": "0" } "
                $arr = Net::curl('https://graph.qq.com/user/get_user_info?access_token=' . $access_token . '&oauth_consumer_key=' . $obj->client_id . '&openid=' . $obj->openid);
                $arr_info = json_decode($arr['content'], true);
                header("Location: ".Net::host()."/qq/bind.html?code=1&msg=nobind&qq_user_openid={$obj->openid}&nickname=" . urlencode($arr_info['nickname'])."&icon=".$arr_info['figureurl_2']."&state=".$state);
            }
        }
    }
}
