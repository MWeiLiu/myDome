/*
(c) Copyright 2017 wei. All Rights Reserved. 
2017-08-26

2017-08-26 v1.0.1 images
*/

(function(window,$){
   'use strict';
    
    window.index={

        //图片加载
        images:{
            //按需加载图片
            setImg:function(index){
                var oDiv=document.getElementsByTagName("body")[0]
                var aLi=oDiv.getElementsByTagName('img')

                if (aLi[index].dataset) {
                    var src=aLi[index].dataset.src;
                } else{
                    var src=aLi[index].getAttribute('data-src');
                }
                if (!aLi[index].getAttribute('src')) {
                    aLi[index].setAttribute('src',src); 
                }
            },
            //可视区内的图片
            imgSroll:function(){

                var oDiv=document.getElementsByTagName("body")[0]
                var aLi=oDiv.getElementsByTagName('img')

                for (var i = 0, l = aLi.length; i < l; i++) {
                    var oLi = aLi[i];
                    //检查oLi是否在可视区域
                    var t = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
                    var h = window.common.getObjTop(oLi);
                    if (h < t) {
                        setTimeout("window.index.images.setImg(" + i + ")", 500);
                    }
                }
            }
            
        }
    }

    //首页导航
    $('.header .navItem a').live('click',window.common.debounce(function(){
        $(this).next('ul').slideToggle()
        $(this).parent().siblings().find('ul').slideUp()
    },300));
    $('body').live('click',function(e){
        if(e.target.offsetParent.className!=='navItem'){
            $('.header .navItem a').next('ul').slideUp()
        }   
    });
    
    if($('body img').length>=1){
        window.index.images.imgSroll()
        $(window).scroll(function(){
            $('.header .navItem ul').slideUp()
            window.index.images.imgSroll()
        })
    }
    
    $('.file input').live('change',function(e){
        var $t=this
        window.file.readFile.fileSelect1(e,$t)
    });
    
    
})(window,$);

  