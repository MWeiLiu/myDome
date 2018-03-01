//
//(function ($) {
//    /**
//     *
//     * @param source_img_obj  $("#logo")  $('<img src="a.jpg">')
//     * @param quality  20
//     * @param maxWidth
//     * @param output_format
//     * @returns  <img src="type:image/base64;...">
//     */
//    function compress(source_img_obj, quality, maxWidth, output_format) {
//        var mime_type = "image/jpeg";
//        if (typeof output_format !== "undefined" && output_format == "png") {
//            mime_type = "image/png";
//        }
//
//        maxWidth = maxWidth || 2000;
//        var natW = source_img_obj.naturalWidth;
//        var natH = source_img_obj.naturalHeight;
//        var ratio = natH / natW;
//        if (natW > maxWidth) {
//            natW = maxWidth;
//            natH = ratio * maxWidth;
//        }
//
//        var cvs = document.createElement('canvas');
//        cvs.width = natW;
//        cvs.height = natH;
//
//        var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0, natW, natH);
//        var newImageData = cvs.toDataURL(mime_type, quality / 100);
//        var result_image_obj = new Image();
//        result_image_obj.src = newImageData;
//        return result_image_obj;
//    }
//
//    /**
//     *
//     * @param file  e.originalEvent.dataTransfer.files[0]; 或 $(selector_of_input_file)[0].files[0];
//     * @param func
//     */
//    function files0ToFile(file, func){
//        if (/^image/.test(file.type)) {
//            console.log('图片,压缩后上传..');
//            console.log("before compress :");
//            console.log(file);
//            var reader = new FileReader();
//            reader.readAsDataURL(file);
//            reader.onload = function (e) {
//                var image = new Image();
//                image.onload = function () {
//                    var base64imgstr = ($(compress(image, 20)).attr('src'));
//                    var blobBin = atob(base64imgstr.split(',')[1]);
//                    var array = [];
//                    for (var i = 0; i < blobBin.length; i++) {
//                        array.push(blobBin.charCodeAt(i));
//                    }
//                    var blob = new Blob([new Uint8Array(array)], {type: 'image/png'});
//                    var tmpfile = new File([blob], file.name, {type: file.type, lastModified: Date.now()});
//                    console.log("after compress: ");
//                    console.log(tmpfile);
//                    func(tmpfile);
//                };
//                image.src = e.target.result; //e.target.result 为 data:image/jpeg...
//                //~由上传转成DataURL,然后压缩后的base64,再转成blob,再转成file,最后上传
//            };
//        }else{
//            console.log('不是图片,直接上传..');
//            func(file);
//        }
//    }
//
//    function myStartUpload(url, file, funcSuccess, funcError) {
//        var formData = new FormData();
//        formData.append('file', file);
//        $.ajax({
//            url: url,
//            data: formData,
//            type: 'POST',
//            processData: false,
//            contentType: false,
//            success: function (data) {
//                funcSuccess(data);
//            },
//            error: function (data) {
//                funcError(data);
//            }
//        });
//        return this;
//    }
//
//    $.fn.dropUpload = function (url, funcSuccess, funcError) {
//        this.on("drop", function (e) {
//            e.preventDefault();
//            e.stopPropagation();
//            console.log(e.originalEvent.dataTransfer);
//            var file = e.originalEvent.dataTransfer.files[0];
//            if (file) {
//                files0ToFile(file,function(tmpf){
//                    myStartUpload(url, tmpf, funcSuccess, funcError);
//                });
//            }
//            $(this).unbind(e);
//        }).on("dragover", function (e) {
//            e.preventDefault();
//            console.log('drag over...');
//        });
//        return this;
//    };
//
//    $.fn.clickUpload = function (url, selector_of_input_file, funcSuccess, funcError) {
//        this.click(function (e) {
//            e.preventDefault()
//            e.stopPropagation();
//
//            $(selector_of_input_file).trigger('click').on("change", function (e) {
//                e.preventDefault();
//                e.stopPropagation();
//                //由上传转成DataURL,然后压缩后的base64,再转成blob,再转成file,最后上传
//                //File {name: "7.jpg", lastModified: 15..3, lastModifiedDate: Sat ..24, size: 91577, type: "image/jpeg"}
//
//                var file = $(selector_of_input_file)[0].files[0];
//                if (file) {
//                    files0ToFile(file,function(tmpf){
//                        myStartUpload(url, tmpf, funcSuccess, funcError);
//                    });
//                }
//                $(this).unbind(e);
//            });
//        });
//        return this;
//    };
//}(jQuery));