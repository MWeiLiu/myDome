if (!window.zjs) { zjs = {}; }


var lastPageid = "";//用于转场时表示当前页面的ID
var isandroid = navigator.userAgent.indexOf("Android") > -1;
//             当前浏览器.用户来源



zjs.goNextPage = function (pgid) {
    if (lastPageid != "") {
        var $target = $("div.view").children("#page" + pgid);
        var $now = $("div.view").children("#page" + lastPageid);
        if (isandroid) {
            $(window).scrollTop(0);
            $now.hide();
            $target.show();
        } else {
            var tsfm0 = { 'transform': 'translate3d(0, 0px, 0px)', '-webkit-transform': 'translate3d(0, 0px, 0px)' };
            var tsfm100 = { 'transform': 'translate3d(100%, 0px, 0px)', '-webkit-transform': 'translate3d(100%, 0px, 0px)' };
            var tsfmf100 = { 'transform': 'translate3d(-100%, 0px, 0px)', '-webkit-transform': 'translate3d(-100%, 0px, 0px)' };
            if (zjs.isbackconfig[lastPageid] && zjs.isbackconfig[lastPageid].indexOf(pgid) > -1) {
                //如果配置项存在  并且目标页面足以退场方式进入  就执行退场动画
                $now.css(tsfm0).show().animate(tsfm100, 300, "ease-in-out", function () {
                    $now.hide();
                });
                $target.css(tsfmf100).show().animate(tsfm0, 300, "ease-in-out", function () {
                    $target.removeAttr("style");
                });
            } else {
                //正常的都是进场方式动画
                $now.css(tsfm0).show().animate(tsfmf100, 500, "ease-in-out", function () {
                    $now.hide();
                });
                $target.css(tsfm100).show().animate(tsfm0, 500, "ease-in-out", function () {
                    $target.removeAttr("style");
                });
            }
        }
    }
    lastPageid = pgid;
};
zjs.pageChange = function () {
    var pgid = "index";
    var gps = zjs.getQueryStr();//获取url中的参数
    if (gps.pageid) {
        pgid = gps.pageid;
    }
    if ($("div.view").children("#page" + pgid).length > 0) {
        if (lastPageid == pgid) {

        } else {
            zjs.goNextPage(pgid);
        }
        if (zjs.pageEventCenter[pgid]) {//如果事件中心
            zjs.pageEventCenter[pgid].call();
        }
    } else {
        $.get("/" + zjs.mobiledir + "/" + pgid + ".html", function (data) {
            $("div.view").append("<div id='page" + pgid + "' class='pageview'>" + data + "</div>");
            zjs.goNextPage(pgid);//转场
            if (zjs.pageEventCenter[pgid]) {//如果事件中心
                zjs.pageEventCenter[pgid].call();
            }
            zjs.documentReady();//加载表格和表单
        });
    }

    //处理公共头部和尾部   如果有专用就显示  否则显示首页的
    var $h = $(".headers").children("header#header" + pgid);
    if ($h.length > 0) {
        $h.show().siblings().hide();
    } else {
        $("#headerindex").show().siblings().hide();
    }
    var $f = $(".footers").children("footer#footer" + pgid);
    if ($f.length > 0) {
        $f.show().siblings().hide();
    } else {
        $("#footerindex").show().siblings().hide();
    }
};
zjs.pushstate = function (title,url,back) {
    if (url != window.location.search) {
        window.history.pushState({ "title": title }, title, url);
        zjs.pageChange(back);
    }
}
window.onpopstate = function () {//当切换页面时  浏览器会触发本函数
    zjs.pageChange();
};

var gobacktm;
function goback() {
    clearTimeout(gobacktm);
    gobacktm = setTimeout(function () {
        window.history.go(-1);
    }, 100);
}



$(function () {
    if (isandroid) {
        $("body").addClass("fromAndroid");
    }

    setTimeout(function () {
        $("div.view").empty();//清空.view内容
        zjs.pageChange();
    }, zjs.boot);
    $("a[href]").live("click", function (e) {
        if ($(this).attr("default")) {
        } else {
            e.preventDefault();
            window.history.pushState({}, "", $(this).attr("href"));
            zjs.pageChange();
        }
    });

});
