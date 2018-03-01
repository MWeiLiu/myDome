/*
公共方法-文件上传

v1.0.1
支持image

Date:2017-8-26
*/

(function(window,$){
    
    window.myUpFile={
        
        type:'upFile',
        
        fn:{
            
            //限制文件大小
            fileSizeVerification: function (size, type) {
                var isTrue = {
                    code: 1,
                    msg: ''
                };
                
                switch (type) {
                    case 'img':{
                        if (size > 2 * 1024 * 1024) {
                            isTrue.code = -1;
                            isTrue.msg = '图片大小不能超过2MB';
                        }
                    }
                    break;
                    case 'attachment':{

                    }
                    break;
                    case 'audio':{

                    }
                    break;
                    case 'video':{

                    }
                    break;
                }
                return isTrue;
            },
            //files[files对象(必选)],success/error[回调函数(可选)]
            upFile_Reader:function(){  
                var result=document.getElementById("result");  
                var file=document.getElementById("file");  

                //判断浏览器是否支持FileReader接口  
                if(typeof FileReader == 'undefined'){  
                    result.InnerHTML="<p>你的浏览器不支持FileReader接口！</p>";  
                    //使选择控件不可操作  
                    file.setAttribute("disabled","disabled");  
                }  

                $('#readAsDataURL').live('click',function(){
                    //检验是否为图像文件  
                    var file = document.getElementById("file").files[0];  
                    if(!/image\/\w+/.test(file.type)){  
                        alert("看清楚，这个需要图片！");  
                        return false;  
                    }  
                    var reader = new FileReader();  
                    //将文件以Data URL形式读入页面  
                    reader.readAsDataURL(file);  
                    reader.onload=function(e){  
                        var result=document.getElementById("result");  
                        //显示文件  
                        result.innerHTML='<img src="' + this.result +'" alt="" />';  
                    }  
                }) 
                

                $('#readAsBinaryString').live('click',function(){  
                    var file = document.getElementById("file").files[0];  
                    var reader = new FileReader();  
                    //将文件以二进制形式读入页面  
                    reader.readAsBinaryString(file);  
                    reader.onload=function(f){  
                        var result=document.getElementById("result");  
                        //显示文件  
                        result.innerHTML=this.result;  
                    }  
                })  

                $('#readAsText').live('click',function(){  
                    var file = document.getElementById("file").files[0];  
                    var reader = new FileReader();  
                    //将文件以文本形式读入页面  
                    reader.readAsText(file);  
                    reader.onload=function(f){  
                        var result=document.getElementById("result");  
                        //显示文件  
                        result.innerHTML=this.result;  
                    }  
                })  
        
                
            }
        }
    }
})(window,$)