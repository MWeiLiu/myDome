
(function(window,$){
    
    
    $.fn.dropUpload = function (url) {
        this.on("drop", function (e) {
            e.preventDefault();
            e.stopPropagation();
//            console.log(e.originalEvent.dataTransfer);
            var file = e.originalEvent.dataTransfer.files[0];
            if (file) {
                isTrue=FileUp.fileType(url, file)
                console.log(isTrue.msg)
            }
            $(this).unbind(e);
        }).on("dragover", function (e) {
            e.preventDefault();
            console.log('drag over...');
        });
        return this;
    };
    
    $.fn.clickUpload = function (url) {
        this.on('change',function (e) {
            e.preventDefault()
            e.stopPropagation();
            //由上传转成DataURL,然后压缩后的base64,再转成blob,再转成file,最后上传
            //File {name: "7.jpg", lastModified: 15..3, lastModifiedDate: Sat ..24, size: 91577, type: "image/jpeg"}
            var file = e.originalEvent.target.files[0];
            if (file) {
                isTrue=FileUp.fileType(url, file)
                console.log(isTrue.msg)
            }
            $(this).unbind(e);
        });
        return this;
    };
    
    window.FileUp={
        filesize:function(file,type){
            var isSizeTrue={code:1,msg:''},
                SIZE=0;
            switch(type){
                case 'image':{
                    SIZE=20
                    if(file.size>SIZE*1024*1024){
                        isSizeTrue.code=-2;
                        isSizeTrue.msg='文件大小不能超过'+SIZE+'MB';
                    }else{
                        isSizeTrue.msg='文件上传成功';
                    }
                }break;
                case 'video':{
                    SIZE=100
                    if(file.size>SIZE*1024*1024){
                        isSizeTrue.code=-2;
                        isSizeTrue.msg='文件大小不能超过'+SIZE+'MB';
                    }else{
                        isSizeTrue.msg='文件上传成功';
                    }
                }break;
                case 'audio':{
                    SIZE=100
                    if(file.size>SIZE*1024*1024){
                        isSizeTrue.code=-2;
                        isSizeTrue.msg='文件大小不能超过'+SIZE+'MB';
                    }else{
                        isSizeTrue.msg='文件上传成功';
                    }
                }break;
                case 'text':{
                    SIZE=500
                    if(file.size>SIZE*1024){
                        isSizeTrue.code=-2;
                        isSizeTrue.msg='文件大小不能超过'+SIZE+'KB';
                    }else{
                        isSizeTrue.msg='文件上传成功';
                    }
                }break;
                case 'application':{
                    SIZE=500
                    if(file.size>SIZE*1024){
                        isSizeTrue.code=-2;
                        isSizeTrue.msg='文件大小不能超过'+SIZE+'KB';
                    }else{
                        isSizeTrue.msg='文件上传成功';
                    }
                }break;
            }
            return isSizeTrue
        },
        fileType:function(url, file){
            var filesType=file.type,
                isTure,
                typeName=filesType.split('/')[0],
                typeAccept=filesType.split('/')[1]
            
            console.log(filesType)
            typeAccept?console.log(typeAccept+'格式'):console.log('.'+file.name.split('.')[1]+'格式')
            
            switch(typeName){
                case 'image':{
                    isTure=this.filesize(file,'image')
                    isTure.type='image'
                    isTure.file=file
                    FileUp.files0ToFile(file,function(tmpf){
                        FileUp.FileUpLoad.imagesOnLoad(url, file);
                    });
                }break;
                case 'video':{
                    isTure=this.filesize(file,'video')
                    isTure.type='video'
                    FileUp.FileUpLoad.videoUpLoad(url, file)
                }break;
                case 'audio':{
                    isTure=this.filesize(file,'audio')
                    isTure.type='audio'
                    FileUp.FileUpLoad.audioUpLoad(url, file)
                }break;
                case 'text':{
                    isTure=this.filesize(file,'text')
                    isTure.type='text'
                    FileUp.FileUpLoad.textUpLoad(url, file)
                }break;
                case 'application':{
                    isTure=this.filesize(file,'application')
                    isTure.type='application'
                    FileUp.FileUpLoad.textUpLoad(url, file)
                }break;
                default:{
                    isTure.code=-1
                    isTure.msg='暂不支持此文件格式'
                }break;
            }
            return isTure
        },
        files0ToFile:function (file, func){
            console.log('图片,压缩后上传..');
            console.log("before compress :");
            console.log(file);
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var image = new Image();
                image.onload = function () {
                    var base64imgstr = ($(FileUp.compress(image, 20)).attr('src'));
                    var blobBin = atob(base64imgstr.split(',')[1]);
                    var array = [];
                    for (var i = 0; i < blobBin.length; i++) {
                        array.push(blobBin.charCodeAt(i));
                    }
                    var blob = new Blob([new Uint8Array(array)], {type: 'image/png'});
                    var tmpfile = new File([blob], file.name, {type: file.type, lastModified: Date.now()});
                    console.log("after compress: ");
                    console.log(tmpfile);
                    func(tmpfile);
                };
                image.src = e.target.result; //e.target.result 为 data:image/jpeg...
                //~由上传转成DataURL,然后压缩后的base64,再转成blob,再转成file,最后上传
            };
        },
        compress:function (source_img_obj, quality, maxWidth, output_format) {
            var mime_type = "image/jpeg";
            if (typeof output_format !== "undefined" && output_format == "png") {
                mime_type = "image/png";
            }

            maxWidth = maxWidth || 1000;
            var natW = source_img_obj.naturalWidth;
            var natH = source_img_obj.naturalHeight;
            var ratio = natH / natW;
            if (natW > maxWidth) {
                natW = maxWidth;
                natH = ratio * maxWidth;
            }

            var cvs = document.createElement('canvas');
            cvs.width = natW;
            cvs.height = natH;

            var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0, natW, natH);
            var newImageData = cvs.toDataURL(mime_type, quality / 100);
            var result_image_obj = new Image();
            result_image_obj.src = newImageData;
            return result_image_obj;
        },
        FileUpLoad:{
            imagesOnLoad:function(url, file){
                var Files=new FileReader()
                Files.onload=function(e){
                    var Img=new Image()
                    Img.src=Files.result
                    $('.imageBox').html('<img src="'+Files.result+'" />')
                }
                Files.readAsDataURL(file)
            },
            textUpLoad:function(url, file){
                var Files=new FileReader()
                Files.onload=function(e){
                    $('.imageBox').html(Files.result)
                }
                Files.readAsText(file)
            },
            videoUpLoad:function(url, file){
                console.log(file)
                var Files=new FileReader()
                Files.onload=function(e){
                    var dom=$(window.options.videoHTML)
                    window.options.addDom(dom)
                    dom.find('.videoContent').attr('src',Files.result)
                    dom.find('.videoContent')[0].load()
                }
                Files.readAsDataURL(file)
            },
            audioUpLoad:function(url, file){
                console.log(file)
                var Files=new FileReader()
                Files.onload=function(e){
                    var dom=$(window.options.audioHTML)
                    window.options.addDom(dom)
                    dom.find('.audio').attr('src',Files.result)
                }
                Files.readAsDataURL(file)
            }
        }
        
        
        
        
    }
    
    $(function(){
        
        $('#upFile').dropUpload('/upload').clickUpload('/upload');
        
//        $('#upFile').clickUpload('/upload', function(file){
//            var Files=new FileReader()
//            Files.onload=function(e){
//                var Img=new Image()
//                Img.src=Files.result
//                $('.imageBox').html('<img src="'+Files.result+'" />')
//            }
//            Files.readAsDataURL(file)
//        },function(){
//            console.log('error')
//        });
//        
//        $('#upFile').dropUpload('/upload', function(file){
//            var Files=new FileReader()
//            Files.onload=function(e){
//                var Img=new Image()
//                Img.src=Files.result
//                $('.imageBox').html('<img src="'+Files.result+'" />')
//            }
//            Files.readAsDataURL(file)
//        },function(){
//            console.log('error')
//        });
        
    })
    
})(window,$)