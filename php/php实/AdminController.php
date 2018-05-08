<?php
namespace Application\Controller\Front;

use Application\Controller\AppController;
use Application\Model\AppModel;
use CnsPHP\Common\Str;

use CnsPHP\Controller\Auth as Auth;
use Application\Common\CnsSMS as CnsSMS;
use CnsPHP\Common\CheckCode;
use Application\Common\CnsToken;
use Application\Common\CnsMail;

//默认表格为Class Model名字的小写,即为user
class Users extends AppModel {}
class Ugroups extends AppModel {}
class Products extends  AppModel {}

class AdminController extends AppController
{
    /**
     * 手机号登陆验证码
     * @param $args
     * @param $post [mobile]
     * @param $get
     * @return [code,msg]
     */
    public static function LoginAuthcode($args, $post, $get)
    {
        if (!Str::validate([trim($post['mobile']), 'mobile'])) {
            return Str::msg(-1, '手机号码格式不正确!');
        }

        $arr = Users::getOne("uid,gid", ["mobile" => $post['mobile']]);
        if(count($arr)==0 || !in_array($arr['gid'],[2,3])) {
            return Str::msg(-2, "非法用户!");
        }

        if (isset($_SESSION['admin_login_check_code_time']) && time() - $_SESSION['admin_login_check_code_time'] < 60)
            return Str::msg(-3, "验证码已发出,请稍后尝试");

        $_SESSION['admin_login_check_code'] = random_int(100000, 999999);
        $_SESSION['admin_login_check_code_time'] = time();

        if (CnsSMS::sendFulltext($post['mobile'], '您好! ' . $post['mobile'] . ', 您的验证码是: ' . $_SESSION['admin_login_check_code'] . ' 【空灵触动科技】')) {
            return Str::msg(1, "您的验证码已经发送!");
        } else {
            $_SESSION['admin_login_check_code_time'] = 0;
            return Str::msg(-4, "验证码发送失败,请检测手机号码是否有误,如有问题请联系在线客服");
        }
    }

    /**
     *  手机登陆
     * @param  array $args
     * @param  array $post [mobile, password , authcode ]
     * @param  array $get
     * @return [uid,gid,email,icon,mobile]
     */
    public static function Login($args, $post, $get)
    {
        if (!Str::validate([$post['mobile'], 'mobile'])) {
            return Str::msg(-1, '手机号码格式不正确!');
        }

        //验证码检测
        if (!isset($_SESSION['admin_login_check_code']) || $_SESSION['admin_login_check_code'] != $post['checkcode'])
        {
            return Str::msg(-2, '验证码错误');
        }
        else
            $_SESSION['admin_login_check_code'] = '';

        $arr = Users::getOne("uid,gid,email,icon,mobile,password", ["mobile" => $post['mobile']]);
        if(count($arr)==0 || !in_array($arr['gid'],[2,3])) {
            return Str::msg(-3, "非法用户!");
        }

        if(auth::passwd_verify($post['password'], $arr['password'])) {
            $token = CnsToken::token($arr['uid'], ["_tk_uid" => $arr['uid'], "_tk_gid" => $arr['gid'], '_tk_ip' => Net::clientip()], 30);
            Users::update(['lastlogin' => date('Y-m-d H:i:s')], ['uid' => $arr['uid']]);

            return Str::msg(1, '登陆成功', ["uid" => $arr['uid'], "gid"=>$arr['gid'], "icon"=>$arr['icon'], "mobile" => $arr['mobile'], "email" => $arr["email"]], $token);
        }
        else
            return Str::msg(-4, "密码错误");
    }


    //用户组
    /**
     * @param array $args  [ "_tk_uid" => 13, "_tk_gid"=>1, "token" => [ "_tk" => , "_tk_d" => , "_tk_m" => , "_tk_f" => ]]
     * @param $post
     * @param $get
     * @return string
     *  request:
     *                curl  -H 'QCTKA: ..... '  https://ppt.yiyaozg.com/admin/group-list
     *  Response:
     *                {"code":1,"msg":"","data":[{"gid":"1","gname":"\u666e\u901a\u7528\u6237"},...,{"gid":"3","gname":"\u7ba1\u7406\u7528\u6237"}],"token":{"_tk":"c0bb362d38d8e29b1ab535dd5fa59fa8","_tk_d":"d9567959159adaa7440","_tk_m":"0ff4382437586ef6ad1c347","_tk_f":"0d1181e0088df2a8d254"}}
     */
    public static function GroupList($args, $post, $get)
    {
       // if($args['_tk_gid'] == 1)

        $arr=Ugroups::getAll('*');
        if($arr !== FALSE)
            return Str::msg(1,"获取用户组成功",$arr,$args['_tk_token']);
        else
            return Str::msg(-1,"获取用户组失败", [], $args['_tk_token']);
    }

    /**
     * @param $args
     * @param $post    [ 'gname'=>'xxxx', 'comments'=>'xxx' ]
     * @param $get
     * @return
     */
    public static function GroupAdd($args, $post, $get)
    {
            $result=Ugroups::insert(['gname'=>$post['gname'], 'comments'=>$post['comments']]);
            if($result !== false)
               return Str::msg(1,'用户组新建成功',['gid'=>Ugroups::$lastInsertId, 'gname'=>$post['gname'], 'comments' => $post['comments'] ],$args['_tk_token']);
            else
                return Str::msg(-1,'新建用户组失败',[],$args['_tk_token']);
    }

    /**
     * @param array $post  ['gid'=>xxx]
     * @return
     */
    public static function GroupDelete($args, $post, $get)
    {
            $result = Ugroups::delete(['gid'=>$post['gid']]);
            if($result !== false)
                return Str::msg(1,'用户组删除成功',[],$args['_tk_token']);
            else
                return Str::msg(-1,'用户组删除失败',[],$args['_tk_token']);
    }


    /**
     * @param array $post  ['gid'=>xxx, 'gname'=>'xxx', 'comments'=>'xxx']
     * @return
     */
    public static function GroupEdit($args, $post, $get)
    {
        $result = Ugroups::update(['gname'=>$post['gname'], 'comments'=>$post['comments']],['gid'=>$post['gid']]);
        if($result !== false)
            return Str::msg(1,'用户组修改成功',[],$args['_tk_token']);
        else
            return Str::msg(-1,'用户组修改失败',[],$args['_tk_token']);
    }


    //用户
    /**
     * @param $args
     * @param $post  array ['email'=>,'mobile'=>,'password'=>,'nickname'=>,'gid'=>]
     * @param $get
     * @return string
     */
    public static function UserAdd($args, $post, $get)
    {
        //$result=Users::insert(['email'=>$post['email'], 'mobile'=>$post['mobile'], 'password'=>Auth::passwd($post['password']), 'nickname'=>$post['nickname'], 'gid'=>$post['gid'] ]);
        if(isset($post['email']) && isset($post['mobile'])){
            $result=Users::insert(['email'=>$post['email'], 'mobile'=>$post['mobile'], 'password'=>Auth::passwd($post['password']), 'nickname'=>$post['nickname'], 'gid'=>$post['gid'] ]);
        }
        else if(isset($post['email'])){
            $result=Users::insert(['email'=>$post['email'], 'password'=>Auth::passwd($post['password']), 'nickname'=>$post['nickname'], 'gid'=>$post['gid'] ]);
        } else if(isset($post['mobile'])){
            $result=Users::insert( ['mobile'=>$post['mobile'], 'password'=>Auth::passwd($post['password']), 'nickname'=>$post['nickname'], 'gid'=>$post['gid'] ]);
        }
        else{
            $result=Users::insert([ 'password'=>Auth::passwd($post['password']), 'nickname'=>$post['nickname'], 'gid'=>$post['gid'] ]);
        }
        $result=Users::insert([ 'password'=>Auth::passwd($post['password']), 'nickname'=>$post['nickname'], 'gid'=>$post['gid'] ]);
        if($result !== false)
            return Str::msg(1,'添加用户成功',[],$args['_tk_token']);
        else
            return Str::msg(-1,'添加用户失败',[],$args['_tk_token']);
    }

    /**
     * @param $args
     * @param $post array ['uid'=>]
     * @param $get
     * @return string
     */
     public static function UserDelete($args, $post, $get) {
        $result=Users::delete(['uid'=>$post['uid']]);
         if($result !== false)
             return Str::msg(1,'删除成功',[],$args['_tk_token']);
         else
             return Str::msg(-1,'删除失败',[],$args['_tk_token']);
     }

    /**
     * @param $args
     * @param $post
     * @param $get
     */
     public static function UserEdit($args, $post, $get) {
         $result = Users::update([
             'gid'              => $post['gid'],
             'email'          => $post['email'],
             'mobile'       => $post['mobile'],
             'nickname'   => $post['nickname'],
             'birthday'     => $post['birthday'],
             'icon'            => $post['icon'],
             'qq'               => $post['qq'],
             'wechat'       => $post['wechat'],
             'sina'            => $post['sina'],
             'weibo'        => $post['weibo'],
             'birthday'    => $post['birthday'],
             'edu'            => $post['edu'],
             'school'       => $post['school'],
             'position'    => $post['position'],
             'address'     => $post['address'],
             'vip'            =>  $post['vip'],
             'ustatus'     =>  $post['ustatus']
         ],['uid'=>$post['uid']]);

         if($result !== false)
             return Str::msg(1,'修改成功',[],$args['_tk_token']);
         else
             return Str::msg(-1,'修改失败',[],$args['_tk_token']);
     }

    /**
     * @param $args
     * @param $post  array
     * @param $get
     *  request:
     *                 curl  -H 'QCTKA: {"_tk":"c0bb362d38d8e29b1ab535dd5fa59fa8","_tk_d":"d9567959159adaa7440","_tk_m":"0ff4382437586ef6ad1c347","_tk_f":"0d1181e0088df2a8d254"}'    -d 'gid=1&email=yao'  https://ppt.yiyaozg.com/admin/user-list
     *  response:
     *                 [..]
     */
    public static function UserList($args,$post, $get)  {
        $arr=[];
        $where='';

        if(isset($post['gid']) && $post['gid'])
        {
            Users::WhereAnd($arr, $where, 'gid', $post['gid'], '=');
        }

        if(isset($post['email']) &&$post['email'])
        {
            Users::WhereAnd($arr, $where, 'email', $post['email'], '%like%');
        }

        if(isset($post['mobile']) && $post['mobile']){
            Users::WhereAnd($arr, $where, 'mobile', $post['mobile'], '=');
        }

        if(isset($post['nickname']) && $post['nickname'])
        {
            Users::WhereAnd($arr, $where, 'nickname', $post['nickname'], '=');
        }

        if(isset($post['ustatus']) && $post['ustatus'])
        {
            Users::WhereAnd($arr, $where, 'ustatus', $post['ustatus'], '=');
        }

        if(isset($post['reg_begin']) && $post['reg_begin'])
        {
            Users::WhereAnd($arr, $where, 'regtime', strtotime ($post['reg_begin']), '>=');
        }

        if(isset($post['reg_end']) && $post['reg_end'])
        {
            Users::WhereAnd($arr, $where, 'regtime', strtotime ($post['reg_end']), '<=');
        }

        if(isset($post['lastlogin_start']) && $post['lastlogin_start'])
        {
            Users::WhereAnd($arr, $where, 'lastlogin', strtotime ($post['lastlogin_start']), '>=');
        }

        if(isset($post['lastlogin_end']) && $post['lastlogin_end'])
        {
            Users::WhereAnd($arr, $where, 'lastlogin', strtotime ($post['lastlogin_end']), '<=');
        }

        if(!isset($post['offset']))
        {
            $post['offset'] = 0;
        }

        if(!isset($post['rows']))
        {
            $post['rows'] = 15;
        }
        else if($post['rows']>30) {
            $post['rows'] = 30;
        }

        $arrs=Users::getAll('',$arr,"select * from users where  " .$where. " limit ".$post['offset'].",".$post['rows'] );
        if($arrs !== false)
            return Str::msg(1,'查询成功',$arrs,$args['_tk_token']);
        else
            return Str::msg(-1,'查询失败',[],$args['_tk_token']);
    }

    /**
     * @param $args
     * @param $post  array ['uid'=>]
     * @param $get
     */
    public static function UserInfo($args, $post, $get ) {
        //var_dump($args);
         $arr=Users::getOne('*', ['uid'=>$post['uid']]);
        if($arr !== false)
            return Str::msg(1,'查询成功',$arr,$args['_tk_token']);
        else
            return Str::msg(-1,'查询失败',[],$args['_tk_token']);
    }

    /**
     *  作品列表
     * @param $args
     * @param $post
     * @param $get
     * @return string
     */
    public static function ProductList($args,$post,$get)
    {
        $arr=[];
        $where='';

        if(isset($post['email']) && $post['email'])
        {
            Users::WhereAnd($arr, $where, 'email', $post['email'], '=');
        }

        if(isset($post['mobile']) && $post['mobile'])
        {
            Users::WhereAnd($arr, $where, 'mobile', $post['mobile'], '=');
        }

        if(isset($post['nickname']) && $post['nickname'])
        {
            Users::WhereAnd($arr, $where, 'nickname', $post['nickname'], '=');
        }

        $arrs = Products::getOne('',$arr, " select uid from users where $where ");
        if(count($arrs)>0) {
            $uid=$arrs['uid'];
        }
        else
        {
            return Str::msg(-1,"无此用户");
        }

        $arr=[];
        $arr['uid']=$uid;
        $where='';
        if(isset($post['pname']) && $post['pname'])
        {
            Users::WhereAnd($arr, $where, 'pname', $post['pname'], '%like%');
        }

        if(isset($post['pstatus']) && $post['pstatus'])
        {
            Users::WhereAnd($arr, $where, 'pstatus', $post['pstatus'], '=');
        }

        if(isset($post['tags']) && $post['tags'])
        {
            Users::WhereAnd($arr, $where, 'tags', $post['tags'], '%like%');
        }

        if(isset($post['ctime_begin']) && $post['ctime_begin'])
        {
            Users::WhereAnd($arr, $where, 'ctime', $post['ctime_begin'], '>=');
        }

        if(isset($post['ctime_end']) && $post['ctime_end'])
        {
            Users::WhereAnd($arr, $where, 'ctime', $post['ctime_end'], '<=');
        }

        $arrs = Products::getAll('',$arr, " select *  from products where uid=:uid and $where limit  ".$post['offset'].", ".$post['rows']);
        if (count($arrs) >0) {
            return Str::msg(1, '查询作品成功', $arrs, $args['_tk_token']);
        }
        else
            return Str::msg(-1, '查询作品失败', [], $args['_tk_token']);
    }

/**
 *  删除作品
 * @param $args
 * @param $post
 * @param $get
 * @return string
 */
public static function ProductDelete($args, $post, $get) {
    $result = Products::delete([ 'pid' => $post['pid']]);
    if ($result !== FALSE) {
        return Str::msg(1, '删除作品成功',[], $args['_tk_token']);
    }
    else
        return Str::msg(-1, '删除作品失败', [], $args['_tk_token']);
}

/**
 *  修改作品状态
 * @param $args
 * @param $post
 * @param $get
 * @return string
 */
public  static function ProductEdit($args, $post, $get) {
    $result = Products::update([ 'pstatus'=>$post['pstatus'] ], [ 'pid'=>$post['pid']]);

    if ($result !== false)
        return Str::msg(1, '作品修改成功', [], $args['_tk_token']);
    else
        return Str::msg(-1, '作品修改失败', [], $args['_tk_token']);
}

/**
 *  修改详情
 * @param $args
 * @param $post
 * @param $get
 * @return string
 */
public static function ProductInfo($args,$post,$get)
{
    $arr = Products::getOne('*', [ 'pid' => $post['pid']]);
    if (count($arr) >0) {
        return Str::msg(1, '请接收作品', $arr, $args['_tk_token']);
    }
    else
        return Str::msg(-1, '作品不存在', [], $args['_tk_token']);
}
    /**
     *   dfd
     */
/**
     * 列出所有评论或指定用户的评论或指定作品的评论 或指定状态审核或未审核
     * @param $args
     * @param $post [
     *                                 'pid': 'xxx' ,  |  'uid': 'xxx' ,    查询别人对此用户做出的评论 （与uid互斥) |     'cuid'=>,          查询此cuid对别人做出的评论   (与cuid互斥)
     *                                 'offset'=> ,
     *                                 'nums'=>,
     *                                 'status'=>
     *                   ]
     * @param $get
    * @return array  [
    *                                code:  ,
    *                                msg:  ,
    *                                data: [ ['cid': ,  'pid': ,  'cuid': , 'status': , 'ctime': ], ...],
    *                                token: ...
    *                 ]
     */
 public static function ProductCommentList($args, $post, $get) {
     $pids= [];
     $cuid = 0;
     $where = '  ';
     $fields = [];
     if (isset($post['pid']))
     {
         $pids[] = $post['pid'];
     }
     else if(isset($post['uid']))
     {
           $arrs = Users::getAll('pid', ['uid'=> $post['uid']]);
           if(count($arrs) >0)
           {
               $pids = array_merge($pids, array_map(function($arr) { return $arr['pid']; }, $arrs));
           }
     }

     if(count($pids)>0)
     {
         $where .= " and pid in (:pids) ";
         $field['pids'] = $pids;
     }

     if(isset($post['cuid']))
     {
          $cuid = $post['cuid'];
          $where .= " and cuid = :cuid ";
          $fields['cuid'] = $cuid;
     }

     if(isset($post['status'])) {
          $status = $post['status'];
          $where .= " and status =:status ";
          $fields['status'] = $status;
     }

     if(isset($post['offset'])){
           $offset = $post['offset'];
     }else{
         $offset=0;
     }
     $fields['offset'] = $offset;

     if(isset($post['nums'])) {
        $nums = $post['nums']>50?50:$post['nums'];
     } else {
         $nums = 20;
     }
     $fields['nums']=$nums;

     $arrs = Comments::getAll('', $fields, "select * from comments where 1  $where ");
     if(count($arrs)>0) {
         $return_arrs = [];
         $arr_cuid = array_map(function($arr) { return $arr['cuid'] ;}, $arrs);
         $arrs_icons = Users::getAll('', ['uids'=>implode(',', $arr_cuid)], "select uid,nickname,icon from users where uid in (:uids)");
         if(count($arr_icons) > 0)
         {
             for ($i = 0; $i < count($arrs); $i++)
             {
                 $tmpcuid = $arrs[$i]['cuid'];
                 for($j=0; $j<count($arr_icons); $j++)
                 {
                     if($tmpcuid == $arr_icons[$j]['uid'])
                         $return_arrs[] = array_merge($arrs[$i], $arr_icons[$j]);
                     break;
                 }
             }
         }
         return Str::msg(1, "查询成功", $return_arrs, $args['_tk_token']);
     }
     else
     {
         return Str::msg(-1, "无评论记录");
     }
 }

    /**
     *  审核或反审核comment
     * @param $args
     * @param $post ['cid'=>, 'status'=> ]
     * @param $get
     */
 public static function ProductCommentShenhe($args, $post, $get) {
      Comments::update(['status'=>$post['status']], ['cid'=>$post['cid']] );
      if(Comments::$affectedRows == 1){
          return Str::msg(1, '操作成功');
      } else {
          return Str::msg(-1,"操作失败");
      }
 }

    /**
     *  删除评论
     * @param $args
     * @param $post  ['cid'=>]
     * @param $get
     * @return string
     */
 public static function ProductCommentDelete($args, $post, $get) {
     Comments::delete(['cid'=>$post['cid']]);
     if(Comments::$affectedRows == 1){
         return Str::msg(1, '操作成功');
     } else {
         return Str::msg(-1,"操作失败");
     }
 }

    /**
     * @param array $args
     * @param array $post
     * @param array $get
     */
    public static function Iframe($args, $post, $get)
    {
        if (!isset($post['htmldata'])) {
            // {"code":2, "msg":"invalid request", "data":[]}
            return Str::msg(-1, 'invalid request');
        }

        $f = "statics/htdocs/iframecanvas.html";
        $c = file_get_contents(self::$rootdir_html . '/' . $f);

        if ($c === FALSE)
            return Str::msg(-1, 'open file failed');

        $c = str_replace('<div id="start_interposition"></div>', '<div id="start_interposition"></div>' . $post['htmldata'], $c);
        if (file_put_contents($f, $c) !== FALSE)
            return Str::msg(1, 'success');
        else
            return Str::msg(-1, 'write file failed');
    }

    /**
     * 用户信息
     */
    public static function Info($args, $post, $get)
    {

        $uid = $args['_tk_uid'];
        //database
        $arr = Users::getOne("uid", ['uid' => $uid]);
         Str::msg(1, 'success', $arr, $args['_tk_token']);

        $arr = Users::getAll('*');
        var_dump($arr);


        $arr = Users::getOne();
        var_dump($arr);
        exit;
        /*
        $arr = Users::getOne([],"select * from user order by uid desc");
        //var_dump($arr);
        //$arr = Users::getALl(['username'=>'%a%','age'=>20],"select * from user where username like :username and age>:age");
        //var_dump($arr);

        //$result =Users::insert(['username'=>'beci92','age'=>30,'gender'=>'M','regtime'=>time()]);
        //$result =Users::insert(['username'=>'b8090','age'=>30,'gender'=>'M','regtime'=>time()],"insert into user set username=:username,age=:age,gender=:gender,regtime=:regtime");
        //if($result !== false)
        //echo $result::$lastInsertId;

        //$result = Users::delete(['username'=>'b8888']);
        //if($result !== false)
        //echo $result::$affectedRows;

        //$result = Users::delete(['username'=>'bccbaa','age'=>49],"delete from user where username=:username or age<:age");
        //if($result !== false)
        //echo $result::$affectedRows;

        $result =Users::update(['age'=>55,'gender'=>'F','username'=>'vvvvv'],['username'=>'vvvv','age'=>55]);
        if($result !== false)
            echo $result::$affectedRows;

        $result =Users::update(['age'=>45,'gender'=>'F','username'=>'baaaaa'],[],"update user set age=:age, gender=:gender where username=:username");
        if($result !== false)
            echo $result::$affectedRows;
        //~database

        //var_dump($post);
        //var_dump($args);
        //var_dump($this->view);


        // $this->fileClass();
        // $this->file->...
        // or
        // $file=$this->fileClass();
        // $file-> ...


        // $this->imgClass();
        // $this->img->...
        // or
        // $img=$this->imgClass();
        // $img->...


        // $this->strClass();
        // $this->str->
        // or
        // $str=$this->imgClass();
        // $str->


        //var_dump($this);


        //$this->view->assign("title","xxxx");

        //$this->show(); //default is  CnsPHP/html/admin/user/info.html
        //$this->show($this->rootdir."/tpl/admin/user/info.html");
         */
    }
}