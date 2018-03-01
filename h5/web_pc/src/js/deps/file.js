/*
(c) Copyright 2017 wei. All Rights Reserved. 
2017-08-26

2017-08-26 v1.0.1 isSupportFileApi readFile
*/

(function(window,$){
    'use strict';
    
    window.file={
        
        //检测当前浏览器是否支持File Api
        isSupportFileApi:function () {
            if(window.File && window.FileList && window.FileReader && window.Blob) {
                return true;
            }
            return false;
        },
        //读取文件
        readFile:{
            //上传文件
            fileSelect1:function (e,$t) {
                var files = $t.files;
                for(var i = 0, len = files.length; i < len; i++) {
                    var f = files[i];
                    var html='<p>'+
                            f.name + '(' + (f.type || "n/a") + ')' + ' - ' + f.size + 'bytes'+
                        '</p>'
                }
                document.getElementById('list1').innerHTML = html;
            }
            
        }
        
    }

    if(!window.file.isSupportFileApi()){
        alert('当前浏览器不支持File Api')
    }
    

})(window,$)