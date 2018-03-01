/*
(c) Copyright 2017 wei. All Rights Reserved.
2017-08-26
*/

(function(window,$){
    'use strict';
    
    window.API={
        
        
        
    }
    
    $(function(){

        //初始化列表
        setTimeout(function () {
            $(".zbox .nav-right").children("h1,h2,h3").each(function (i, v) {
               var $v = $(v);
               if (v.nodeName == "H3") {
                    $(".nav-left .site-menus").append("<li class='ml5' top='" + $v.offset().top + "'>" + $v.text() + "</li>");
                } else if (v.nodeName == "H2") {
                    $(".nav-left .site-menus").append("<li top='" + $v.offset().top + "'>" + $v.text() + "</li>");
                }
            });
            $(".site-menus li").click(function () {
                $('body').animate({
                    scrollTop:$(this).attr("top")
                })
            });
        }, 500);

    })
    
})(window,$)
