/*
(c) Copyright 2017 wei. All Rights Reserved. 
2017-08-26

2017-08-26 v1.0.1 debounce animation
*/

(function(window,$){
    'use strict';
    
    //公共方法
    window.common={
        
        //防止高频触发
        debounce:function(func,wait,immedate){
            var timeout;
            return function(){
                var context=this,
                        args=arguments;
                var later=function(){
                    timeout=null;
                    if(!immedate){
                        func.apply(context,args);
                    }
                }
                var callNow=immedate&&!timeout;
                clearTimeout(timeout);
                timeout=setTimeout(later,wait)
                if(callNow){
                    func.apply(context,args)
                }
            }
        },
        //优化动画
        animation: function (cfg, fun) {
            var MyReq, n = 0
            requestAnimFrame = function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, cfg.times / cfg.frequency);
                    };
            }();
            (function animloop() {
                MyReq = requestAnimFrame(animloop);
                fun()
                n++;
                if (n >= cfg.frequency) {
                    cancelAnimationFrame(MyReq);
                }
            })();
        },
        //幻灯片
        silde:function(){
            
        },
        //获得对象距离页面顶端的距离  
        getObjTop:function (obj) {  
            var h = 0;  
            while (obj) {  
                h += obj.offsetTop;  
                obj = obj.offsetParent;  
            }  
            return h;  
        }
        
    }
    
    
})(window,$)