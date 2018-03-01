/*!
* 基础JS模型 及JS选择器组件 表格、表单/usr/local/tomcat/webapps/root/
*/
//声明zjs命名空间
if (!window.zjs) { zjs = {} };
if (!window.zjss) { zjss = {} };
zjs.cmddir="http://139.196.17.216:8080/odn-webservice-pc/";
//zjs.cmddir = "http://192.168.0.114:6060/odn-webservice-pc/";                       //命令目录 默认为空
zjs.cmdurl = "";      //默认命令指向地址      /front/ApiInterface/doApi
zjs.fileurl = "/ajax/uploadfile.ashx";  //文件上传地址          /front/baecontroller/baeupload
zjs.meitu = "";//美图API所在文件位置
zjs.meitudomain = "";//传给美图的本站域名 不用带项目名 用于拼接图片完整路径http://www.uizjs.cn
zjs.meitufileurl = "";//传给美图的本站文件上传路径 用于美图回传图片的地址http://www.uizjs.cn/ajax/uploadfile.ashx

zjs.cmdtype = "POST";                   //默认命令以POST方式处理
zjs.cachePage = 10;                    //表格默认缓存页数 100页 设置为1即可不缓存
zjs.isredirect = true;                 //是否有伪静态 有伪静态时需要处理参数 没有就不需要处理
zjs.treeroot = 0;                       //树根节点默认值 .NET里用的是0 JAVA用的是1 特殊的用的是
zjs.rootdir = "/";                       //静态资源根目录
zjs.isapp = false;                      //是否启动app模式 app模式会以cordova方式发起命令
zjs.keephtml = true;//禁用过滤器
zjs.checkrep = function (rep) {         //判断返回的code什么情况下是失败 .NET下0成功 >0都是各种失败  JAVA的是0失败 1成功
    if (rep == 0)
        return true;
    else
        return false;
};
zjs.openidlogin = function () {//使用openid登录 处理登录逻辑 这一块内容每个项目不一样 所以需要写到config里 
};
//常用字典 字典格式:0值|1文本|2样式|3数据|4前图片|5后图片,
zjs.roleName='|请选择,管理员用户|管理员用户,员工用户|员工用户,超级管理员|超级管理员,客服|客服';
zjs.jfzt='1|启用,0|停用';
zjs.glzt='1|启用,0|未启用';
zjs.juzhanstatus='0|未启用,1|启用,2|故障';
zjs.juzhanstatus1='1|启用,0|未启用';
zjs.firstOrderType='|全部,0|业务工单,1|配置工单,2|施工工单,3|巡检工单';
//zjs.firstOrderType='0|柜内跳接,2|柜内光分跳接,3|柜间跳接,5|柜间光分跳接,6|电子标签写入,7|拆除,8|升级,9|抢修,10|数据采集,11|配置工单,12|施工工单,13|巡检工单';
zjs.secondOrderType='|请选择,1|柜内跳接,2|柜内光分跳接,4|柜间跳接,5|柜间光分跳接,6|电子标签写入,7|拆除,8|升级,9|抢修,10|数据采集,11|配置工单,12|施工工单,13|巡检工单';
zjs.orderStatus='|全部,1|待施工,2|施工中,3|待审核,4|已完成';
zjs.orderStatus1='1|待施工,2|施工中,3|待审核,4|已完成';
zjs.xuke='|全部,0|是,1|否';
zjs.xuke1='0|是,1|否';
zjs.yesno = '是,否';
zjs.sex = '0|未知,1|男,2|女';
zjs.isdefaultaddress = '1|设为默认地址,0|不常用';
zjs.userstate = '1|启用,0|禁用';
zjs.menutype = '2|菜单,1|接口';
zjs.productstate = '1|在售,0|停售';
zjs.productstyle = '|无,new|新品,hot|热卖,bargain|特价';
zjs.deviceOnlineStatus='|全部,0|正常,1|空闲,2|故障,3|施工';
zjs.paytype = "0|货到付款,1|微信支付";
zjs.deliverytype = "0|送货上门,1|自提";
zjs.invoice = "0|个人,1|公司";
zjs.orderstate = "10|已下单,11|支付中,12|支付完成,20|已发货,30|已签收,90|已撤销";
zjs.comeFrom = "0|PC,1|手机,2|微信,3|安卓APP,4|苹果APP";
zjs.contype = "1|布局导航,2|数据控件,3|行业控件,4|其他控件";
zjs.fkbl = '0|全款,3|三成,4|四成,5|五成,6|六成,7|七成,8|八成,9|九成';
zjs.alarmReason = '1|端口异常插入,2|端口异常拔出,3|盘（业务板）异常插入,4|盘（业务板）异常拔出,5|电子标签载体插头异常插入,6|电子标签载体插头异常拔出,7|升级操作失败，软件服务器无法访问,8|升级失败，文件传输失败,9|升级失败，软件更新失败';
zjs.status = '|全部,1|已处理,0|未处理';
zjs.status1='1|已处理,0|未处理';
zjs.alarmType='|全部,告警|告警,预警|预警,越限|越限';
zjs.alarmType1='告警|告警,预警|预警,越限|越限';
zjs.userType='0|PC端,1|员工手机终端,2|管理员手机终端';
zjs.deviceType='0|ODF,1|OCC,2|ODB,3|光分路器,100|综合配线架,101|OLT,10|电杆,255|其它';
zjs.deviceType1='|全部,0|ODF,1|OCC,2|ODB,3|光分路器,100|综合配线架,101|OLT,10|电杆,255|其它';
zjs.deviceStatus='0|不启用,1|启用';
zjs.deviceStatus1='|全部,0|不启用,1|启用';
zjs.NMSTrapEnable='true|使能,false|不使能';
zjs.SNMPViewEnable='true|配置,false|不配置';
zjs.fs = '2|否,1|是';
zjs.qyzt = '1|启用,2|禁用'; 
zjs.sf = '1|是,2|否';
zjs.zosf = '|不限,1|是,2|否';
zjs.ctype = 'Web|网站,wWeb|微网站';
zjs.xscnt = '2|2条,3|3条,4|4条,6|6条,8|8条,9|9条,10|10条,12|12条,15|15条,20|20条,30|30条,80|80条,90|90条';
zjs.styleName = 'Product|产品,News|新闻,Album|相册';
zjs.ncoltype = '1|产品,2|新闻,3|服务,4|门店,5|招聘,6|下载,7|视频,8|案例,9|方案';//,11|导航,12|广告,13|引导页,20|关于我们,21|沟通,
zjs.selncoltype = '|全部,' + zjs.ncoltype;
zjs.pageshow = "-11|公共头,-12|首页头,-13|子页头1,-14|子页头2,-15|子页头3,-16|子页头4,-17|子页头5,-18|子页头6," +
               "-21|公共左侧1,-22|公共左侧2,-23|公共左侧3," +
               "-31|公共右侧1,-32|公共右侧2,-33|公共右侧3," +
               "-51|子页尾1,-52|子页尾2,-53|子页尾3,-54|公共尾";
zjs.pagemode = "|自定义,2|H5微首页,10|关于我们,11|产品中心,12|产品详情,21|新闻中心,22|新闻详情,31|服务中心,32|服务详情"
                + ",41|门店中心,42|门店详情,51|招聘中心,52|招聘详情,61|下载中心,62|下载详情"
                + ",71|视频中心,72|视频详情,81|经典案例,82|案例详情,91|解决方案,92|方案详情"
                + ",1|首页," + zjs.pageshow;
zjs.repeat = "repeat|全部,repeat-x|横向,repeat-y|纵向, |不平铺";
zjs.ljlx = "1|站外链接,2|站内页面";
zjs.seomode = "|无,Column|列表页面,New|详情页面";
zjs.xtbb = "2|标准版";//"1|体验版,2|标准版,3|商城版,4|企业版,5|定制版";
zjs.btjb = "h1|一级,h2|二级,h3|三级,h4|四级,h5|五级";
zjs.spjg = "0|待审批,1|已通过,2|已退回";
zjs.ssspjg = "1|通过,2|退回";
zjs.ddlx = '1|服务套餐,2|购物,9|充值';
zjs.tjzt = '1|立即购买,2|购物车';
zjs.zffs = "0|在线支付,1|货到付款,";
zjs.psfs = "0|随时,1|工作日,2|非工作日,";
zjs.fplx = "0|个人,1|企业,";
zjs.daoyouddzt = "0|待支付,1|已付款待赴工,5|已赴工,6|已点名,9|已结算";
zjs.daoyouddzt1 = "|所有订单,0|待支付,1|待赴工,5|已赴工,6|已点名,9|已结算";
zjs.jxcddzt = "|所有订单,0|新订单,1|已出库,2|已作废,9|已收款";
zjs.ddzt = "0|已下单,1|已付款,5|已发货,9|已完成";
zjs.ddzt1 = "|所有订单,0|未支付,1|已付款,5|已发货,9|已完成";
zjs.hydj = '0|普通会员,1|铜牌会员,2|银牌会员,3|金牌会员,4|钻石会员';
zjs.xl = "0|大专以下,1|大专,2|本科,4|硕士,5|博士,6|博士后,";
zjs.wzxl = "大专以下,大专,本科,硕士,博士,博士后";
zjs.zoxl = "|不限," + zjs.xl;
zjs.zogzjy = "|不限,1|一年以上,3|三年以上,5|五年以上,10|十年以上";
zjs.kfms = '|不扣费,1|下载扣费,2|时间扣费';
zjs.hyfl = '|无,最新会员,单身名仕,名媛待嫁,今日头条,特别推荐';
zjs.xb = '男,女';
zjs.zoxb = "|不限," + zjs.xb;
zjs.xcah = "阅读书籍,逛街购物,互联网络,聊天哈拉,音乐欣赏,旅游登山,电玩对战,星象命理,电视电影,运动钓鱼,下棋弹琴,塑身美容,动漫动漫,美食烹饪,语言学习,投资理财,摄像绘画,唱歌跳舞,兜风闲晃,游山玩水,吃喝玩乐,古董收藏,占星算命,园艺花卉,饲养宠物,运动健身,其它";
zjs.gx = "乐天达观,异想天开,豪放不羁,心地善良,多愁善感,快言快语,勇敢正义,外向开朗,积极进取,成熟稳重,温柔体贴,活泼可爱,聪明伶俐,风趣幽默,幼稚调皮,善解人意,诚实坦白,务实实际,内向害羞,追求刺激";
zjs.hyzk = "未婚,已婚,离异,丧偶,";
zjs.sfyz = "无子女,有子女,有子女未在一起";
zjs.zhiy = "销售,店长,营业员,酒店管理,服务员,收银员,前厅接待,保安,人事,行政,兼职,实习,\
技术总监,架构师,需求分析,产品经理,UI设计师,UE设计师,WEB前端,.NET,JAVA,PHP,C/C++,数据库,测试,大数据,Android,IOS,\
投资,融资,并购,风控,其他";
zjs.zozhiy = "|不限," + zjs.zhiy;
zjs.sshy = "IT/互联网,移动互联网,餐饮,金融,其他";
zjs.zosshy = "|不限," + zjs.sshy;
zjs.zwtd = "五险一金,年底双薪,绩效奖金,年终分红,股票期权,加班补助,全勤奖励,包吃,包住,餐补,房补,交通补助,通讯补贴,采暖补贴,带薪年假,弹性工作,补充医保,定期体检,免费班车,员工旅游,高温补贴,节日福利";
zjs.zwyx = "|不限,0-3000|3000以下,3000-6000|3000-6000,6000-10000|6000-10000,10000-20000|10000-20000,20000-|20000以上,";
zjs.gslx = "民营企业,外企企业,合资企业,政府/国营/事业单位,自有公司,其他";
zjs.zogslx = "|不限," + zjs.gslx;
zjs.gfqk = "暂未购房,已购住房,与人合租,独自租房,与父母同住,住亲朋家,住单位房";
zjs.gcqk = "暂未购车,已购车";
zjs.zzmm = "党员,群众,其他";
zjs.slcd = "一般,熟练,精通"; 
zjs.gsgm = "20人以下,20-50人,50-100人,100人以上";
zjs.zogsgm = "|不限," + zjs.gsgm;
zjs.zogxrq = "|不限,3|最近三天,7|最近一周,30|最近一月,90|最近三月";
zjs.sfcy = "不不吸、很反感吸烟,不吸、但不反感,社交时偶尔吸,每周吸几次,每天都吸,有烟瘾";
zjs.sfhj = "不喝,社交需要时喝,有兴致时喝,每天都离不开酒";
zjs.xxfmtz = "愿意,不愿意,视情况而定";
zjs.xxxx = "A型,B型,O型,AB型,其他";
zjs.xxmz = "汉族,藏族,朝鲜族,回族,满族,维吾尔族,壮族,彝族,苗族,其他民族";
zjs.xxjw = "任劳任怨,希望对方承担家务,一起分工合作,看各自闲忙,协商分担";
zjs.xxxy = "无宗教信仰,佛教,道教,儒教,基督教,犹太教,伊斯兰教,印度教,神道教,萨满教,其它宗教信仰";
zjs.xxcy = "色香味俱全,能做几样可口的小菜,不太会,愿意为心爱的人学习";
zjs.xxxm = "文质斌斌,西部牛仔,阳光帅气,风度翩翩,成熟魅力,强壮高大,朴实无华,内敛酷男,气质优雅,冰雪聪明,娇小玲珑,亭亭玉立,青春靓丽,气质高雅,美丽高佻,稳重内敛,其他";
zjs.xxtx = "瘦,较瘦,匀称,苗条,高挑,丰满,健壮,魁梧,胖,较胖";
zjs.yxbz = "985,211,自招";
zjs.zoyxbz = "|全部," + zjs.yxbz;
zjs.hndq = "商丘,郑州,开封,洛阳,周口,驻马店,平顶山,焦作,安阳,鹤壁,新乡,濮阳,许昌,漯河,三门峡,南阳,信阳";
zjs.szcs = "河南,北京,天津,河北,山西,内蒙,辽宁,吉林,黑龙江,上海,江苏,浙江,安徽,福建,江西,山东,湖北,湖南,广东,广西,海南,重庆,四川,贵州,云南,西藏,陕西,甘肃,青海,宁夏,新疆,台湾,香港,澳门";
zjs.zoszcs = "|全部," + zjs.szcs;
zjs.wl = "1|文科,2|理科";
zjs.pc = '11|本科一批,12|本科二批,13|本科三批,1|提前批,2|贫困地区专项,3|地方农村专项,14|专科批';
zjs.tq = "1|军事,3|公安,2|司法,4|其他,5|专科其他";
zjs.zotq = "|全部," + zjs.tq;
zjs.nd = "2016,2015,2014,2013,2012,2011,2010";
zjs.sllx = "1|国家重点实验室,2|教育部重点实验室,3|国家工程技术研究中心,4|一级学科国家重点学科,5|二级学科国家重点学科,6|一级学科博士学位授权单位,7|二级学科博士学位授权单位,8|博士后科研流动站,9|国家人才培养基地班,10|卓越工程师培养计划高校专业,11|国家级特色专业,12|教育部学科评估排名";
zjs.showtype = "fadeIn|淡入,puffIn|缩小进入,twisterInDown|旋风进入,rollIn|滚翻进入,lightSpeedIn|光速进入,fadeInLeft|左侧淡入,fadeInRight|右侧淡入,fadeInUp|向上淡入,fadeInDown|向下淡入,swing|摇晃,shake|抖动,wobble|悬摆,rotateIn|中心旋转,flip|翻转,zoomIn|中心放大,bounceIn|中心弹入,bounceInLeft|左侧弹入,bounceInRight|右侧弹入,bounceInUp|上侧弹入,bounceInDown|下侧弹入,rubberBand|橡皮圈,flipInY|纵向轻弹,flipInX|横向轻弹,jello|扭动";
zjs.rulename = "required|必填,phone|电话号码,ipv4|IP地址,code|身份证号,money|金额,email|邮件,url|网址,integer|整数,zinteger|正整数,number|小数";
zjs.rulenamereq = "required|必填";
zjs.tzjd = "天使轮,Pre-A轮,A轮,B轮,C轮,D轮,E轮及以后";
zjs.sstzjd = "|全部,"+zjs.tzjd;
zjs.ssly = "电子商务,社交网络,智能硬件,媒体门户,工具软件,消费生活,金融,医疗健康,企业服务,旅游户外,房产家居,数字娱乐,在线教育,汽车交通,移动互联网,O2O,物流,其他";
zjs.ssssly = "|全部," + zjs.ssly;
zjs.tzjs = "机构投资人,公司投资并购部,专业天使投资人";
zjs.gslb = "web产品,app应用,web及app均有,微信公众号,idea阶段";
zjs.yyzt = "运营中,3个月内上线,6个月内上线,停止运营";
zjs.tdcyzwfl = "管理,技术,设计,产品,运营,市场,销售,行政人事,财务,投资并购,其他";
zjs.tzbz = "人民币,美元";
zjs.tzdw = "万,亿";
zjs.shzt = "0|未审核,1|已审核";
zjs.tzrsf = "1|跟投人,2|投资人,3|优质投资人";
zjs.rongzzt = "1|正在融资,2|融资完成";
zjs.ssrongzzt = "|全部公司," + zjs.rongzzt + ",0|未融资";
zjs.guxmzt = "锚定中,募资中,募资完成,融资成功";
zjs.ssguxmzt = "|全部," + zjs.guxmzt;
zjs.fxlx = "新股发行,老股转让";
zjs.opers = "=,>,<,>=,<=";
//常用正则表达式
zjs.validatorRules = {
    "required": {
        "alertText": "* 必填 "
    },
    "equals": {
        "alertText": "* 输入不一致"
    },
    "isnumber": {
        "alertText": "* 无效的数字" 
    },
    "length": {
        "alertText": "* 只能输入　@v　个字符"
    },
    "between": {
        "alertText": "* 必须在　@v　之间"
    },
    "phone": {
        "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{7,27})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
        "alertText": "* 无效的电话号码"
    },
    "integer": {
        "regex": /^[\-\+]?\d+$/,
        "alertText": "* 不是有效的整数"
    },
    "zinteger": {
        "regex": /^\+?[1-9][0-9]*$/,
        "alertText": "* 请输入正整数"
    },
    "number": {
        "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
        "alertText": "* 无效的数字"
    },
    "znumber": {
        "regex": /^(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
        "alertText": "* 无效的数字"
    },
    "date": {
        "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
        "alertText": "* 无效的日期，格式必需为 YYYY-MM-DD"
    },
    "ipv4": {
        "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
        "alertText": "* 无效的 IP 地址"
    },
    "code": {
        "regex": /\d{17}[\d|X]|\d{15}/,
        "alertText": "* 身份证号格式不正确"
    },
    "money": {
        "regex": /^\d{1,10}(?:\.\d{1,2})?$/,
        "alertText": "* 金额输入错误"
    },
    "email": {
        "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
        "alertText": "* 邮件地址无效"
    },
    "url": {
        "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
        "alertText": "* URL错误 如：http://www.uizjs.cn"
    },
    "dianliu":{
    	"regex":/^([1-9]|[1-5][0-9]|60)$/,
    	"alertText": "* 最大60A"
    }
};