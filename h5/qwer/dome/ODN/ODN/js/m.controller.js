//声明zjs命名空间
if (!window.zjs) { zjs = {} };
if (!window.zjss) { zjss = {} };

var lastPageid = "";
var isandroid = false;// navigator.userAgent.indexOf("Android") > -1;//有了这个样式后 安桌不卡了-webkit-overflow-scrolling: touch;/*允许独立的滚动区域和触摸回弹*/

zjs.goNextPage = function (pgid) {//转场逻辑 $now为当前页面 $target为目标页面
    if (lastPageid != "") {
        var $target = $("div.view").children("#page" + pgid);
        var $now = $("div.view").children("#page" + lastPageid);
        if (isandroid) {//安卓的 直接显示隐藏
            $(window).scrollTop(0);//重置滚动条位置
            $now.hide();
            $target.show();
        } else {
            var tsfm0 = { 'transform': 'translate(0, 0px)', '-webkit-transform': 'translate(0, 0px)' };
            var tsfm100 = { 'transform': 'translate(100%, 0px)', '-webkit-transform': 'translate(100%, 0px)' };
            var tsfmf100 = { 'transform': 'translate(-100%, 0px)', '-webkit-transform': 'translate(-100%, 0px)' };
            //苹果的转场
            if (zjs.isBackInConfig[lastPageid] && zjs.isBackInConfig[lastPageid].indexOf(" " + pgid + " ") > -1) {
                //如果配置项存在 并且目标页面是以退场方式进入 就执行退场动画 
                $now.css(tsfm0).show().animate(tsfm100, 200, "ease-in-out", function () {
                    $now.hide();
                });
                $target.css(tsfmf100).show().animate(tsfm0, 200, "ease-in-out", function () {
                    $target.removeAttr("style");
                });
            } else {
                //正常的都是进场方式动画
                $now.css(tsfm0).show().animate(tsfmf100, 200, "ease-in-out", function () {
                    $now.hide();
                });
                $target.css(tsfm100).show().animate(tsfm0, 200, "ease-in-out", function () {
                    $target.removeAttr("style");
                });
            }//end 进场结束
        }//判断安卓
    }//判断lastPageid
    lastPageid = pgid;//把当前页面 变为历史页面
};
zjs.pageLoading = {};//用这个变量判断 就不会出现重复的页面了
zjs.pageChange = function () { //页面切换函数 处理页面缓存和加载新页面
    var defindex = "2";
    var pgid = defindex;//如果没有页面 就是回到首页
    var gps = zjs.getQueryStr();
    if (gps.pageid) {//如果页面 就进页面
        pgid = gps.pageid;
    }
    $("iframe").remove();
    if (zjs.pageLoading[pgid]) {//用这个变量判断 就不会出现重复的页面了
        //如果加载过 就从缓存中取 
        if (lastPageid == pgid) {
            //如果目标页面不是本页面 再转场 否则什么也不干
        } else {
            zjs.goNextPage(pgid);//转场
        }

        if (zjs.pageEventCenter[pgid]) {//如果事件中心有自定义处理 就调用 
            zjs.pageEventCenter[pgid].call();
        }
        else {//循环刷新当前页面里面的所有表单和表格 
            $("div.view").children("#page" + pgid).find("table[cmd-select],ul[cmd-select],div[cmd-select]").each(function (i, v) {//初始化表格
                var $id = $(v);
                if ($id.attr("edit") == "1") {//防止重复执行 
                    window["ctable" + $id.attr("id")].search();
                }
            });
            $("div.view").children("#page" + pgid).find("form[cmd-select]").each(function (i, v) {//初始化表格
                var $id = $(v);
                if ($id.attr("edit") == "1") {//防止重复执行 
                    window["cform" + $id.attr("id")].search();
                }
            });
            $("div.view").children("#page" + pgid).find(".cfocus").each(function (i, v) {//初始化表格
                var $id = $(v);
                if ($id.attr("edit") == "1") {//防止重复执行 
                    window["cfocus" + $id.attr("id")].init();
                }
            });
        }
    } else {
        zjs.pageLoading[pgid] = 1;//用这个变量判断 就不会出现重复的页面了
        //如果缓存中没有 就用get请求拿到页面 并加载  
        $.get(zjs.mobiledir.replace("pgid", pgid), function (data) {
            //将加载的新页面 放入容器中
            $("div.view").append("<div id='page" + pgid + "' class='pageview'>" + data + "</div>");

            zjs.goNextPage(pgid);//转场 

            if (zjs.pageEventCenter[pgid])//如果事件中心有自定义处理 就调用
                zjs.pageEventCenter[pgid].call();

            zjs.documentReady();//加载表格和表单
        });
    }
    //处理公共头部和尾部 如果有专用就显示 否则显示首页的
    //var $h = $(".headers").children("#header" + pgid + "");
    //if ($h.length > 0) {
    //    $h.show().siblings().hide();
    //} else {
    //    //$("#headerindex").show().siblings().hide();
    //    $(".headers").children("header").hide();
    //}
    //var $f = $(".footers").children("#footer" + pgid + "");
    //if ($f.length > 0) {
    //    $f.show().siblings().hide();
    //} else {
    //    $("#footer" + defindex).show().siblings().hide();
    //}
    if (zjs.footerIndexSelect) {
        for (var i = 0; i < zjs.footerIndexSelect.length; i++) {
            if (zjs.footerIndexSelect[i].indexOf(" " + pgid + " ") > -1) {
                $("#footer" + defindex + " a").eq(i).addClass("select").siblings().removeClass("select");
            }
        }
    }
};
zjs.comeform = function () { 
    var type = 0;//PC
    var agt = navigator.userAgent;
    if (agt.indexOf("Android") > -1 || agt.indexOf("iPhone") > -1 || agt.indexOf("Windows Phone") > -1) {
        type = 1;//手机
    }
    if (agt.indexOf("MicroMessenger") > -1) {
        type = 2;//微信
    } 
    return type;
};
//设置微信分享内容
zjs.setshare = function (title, imgUrl, desc) {
    try {
        if (zjs.comeform() == 2) {//如果从微信来的 就加载微信的配置项
            var link = window.location.href;
            if (zjs.xzdomain) {//如果有本地域名
                if (zjs.islogin) {//如果登录了 就设置分享内容加上自己的ID
                    var gps = zjs.getQueryStr();
                    link = zjs.xzdomain + "?fromUser=" + zjs.islogin+"";
                    if (gps.pageid)
                        link += "&pageid=" + gps.pageid + "";
                    if (gps.id)
                        link += "&id=" + gps.id + "";
                }
            }
            var paras = {
                title: title, // 分享标题
                desc: zjs.clearALL(desc), // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标 
            };
            wx.onMenuShareTimeline(paras);
            wx.onMenuShareAppMessage(paras);
            wx.onMenuShareQQ(paras);
            wx.onMenuShareWeibo(paras);
            wx.onMenuShareQZone(paras);
        }
    } catch (ex) { alert(ex.message); }
};
//假跳关键函数
zjs.pushstate = function (title, url) {
    window.history.pushState({}, "", url);
    zjs.pageChange();
};
//购物车cookie版
zjs.cookiecart = {
    "add": function (product) {//加入购物车 需要传产品对象 比如{"productid":1,"name":"大风车","image":"/img/i-1.jpg"}
        var prolist = [];//购物车容器变量
        if (zjs.getCookie("cartlist")) {//判断cookie中是否已有购物车数据 如果有数据 就要修改数量
            prolist = $.evalJSON(zjs.getCookie("cartlist"));//拿到购物车数据
            var hasproduct = false;//记录是否已有数据
            for (var pi in prolist) {//循环数据
                var datapi = prolist[pi];
                if (datapi.productid == product.productid) {//如果有和本次加入的产品一样的 那就是修改 如果一个一样的都没有 说明是新增的 直接加 
                    datapi.count++;//如果有 就数量+1
                    hasproduct = true;
                }
            }
            if (hasproduct == false) {
                //如果这个值没变 说明一个一样的都没有
                product.count = 1;//设置数量
                prolist.push(product);//将产品放入购物车容器变量
            }
        } else {
            //如果没有数据 说明是第一次加购物车 什么也不用判断 直接加
            product.count = 1;//设置数量
            prolist.push(product);//将产品放入购物车容器变量
        }
        zjs.setCookie("cartlist", $.toJSON(prolist));//将数组转换为字符串 放到cookie中
    },
    "update": function (product) {//修改购物车数量 需要传产品对象 比如{"productid":1,"count":5} 修改和添加不一样 修改时直接取cookie 如果没有就不用管了
        if (zjs.getCookie("cartlist")) {//判断cookie中是否已有购物车数据
            var prolist = $.evalJSON(zjs.getCookie("cartlist"));//拿到购物车数据 
            for (var pi in prolist) {//循环数据
                var datapi = prolist[pi];
                if (datapi.productid == product.productid) {//找到和本次加入的产品一样的 
                    datapi.count = product.count;//传的数量多少 就改成多少
                }
            }
            zjs.setCookie("cartlist", $.toJSON(prolist));//将数组转换为字符串 放到cookie中
        }
    },
    "delete": function (product) {//删除购物车 需要传产品对象 比如{"productid":1} 
        if (zjs.getCookie("cartlist")) {//判断cookie中是否已有购物车数据
            var prolist = $.evalJSON(zjs.getCookie("cartlist"));//拿到购物车数据 
            for (var pi in prolist) {//循环数据
                var datapi = prolist[pi];
                if (datapi.productid == product.productid) {//找到和本次加入的产品一样的
                    zjs.removeArray(prolist, pi);//删除本行数据
                }
            }
            zjs.setCookie("cartlist", $.toJSON(prolist));//将数组转换为字符串 放到cookie中
        }
    },
    "select": function () {//读取购物车内容
        var prolist = [];
        if (zjs.getCookie("cartlist")) {//判断cookie中是否已有购物车数据
            prolist = $.evalJSON(zjs.getCookie("cartlist"));//拿到购物车数据  
        }

        return prolist;
    },
    "empty": function () {
        if (zjs.getCookie("cartlist")) {//判断cookie中是否已有购物车数据
            zjs.delCookie("cartlist");//清空购物车  
        }
    }
};

window.onpopstate = function () {//当切换页面时 浏览器会触发本函数
    zjs.pageChange();
};

$(function () {
    if (isandroid) {
        $("body").addClass("fromAndroid");
    } else {
        $("body").addClass("fromFixed");
    }
    setTimeout(function () {
        $("div.view").empty();
        zjs.pageChange();//页面加载2秒以后 再出现内容 2秒时间播放开机动画
    }, zjs.boot);

    //绑定全局超链接
    $("a[href]").live("click", function (e) {//绑定全局超链接 
        if ($(this).attr("href") != "javascript:void(0)") {
            if ($(this).attr("defaulthref") == "true") {
                //当出现QQ登录 微博登录 微信支付 支付宝 等第三方真实跳转的超链接时 要真跳
            } else {
                zjs.pushstate("", $(this).attr("href"));//假跳 
                e.preventDefault();
            }
        }
    });
});
