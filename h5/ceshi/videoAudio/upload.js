/*
 * author: liu wei
 * createtime: 2018/5/16 16:42
 * description:
 */

(function (window, $) {

    options = {
        /**
         * 视频上传弹层
         * @returns {string}
         */
        videoUpLoadMask: function(){
            return '<div class="videoUploadMask"></div>'+
						'<div class="videoUpLoadBox">'+
							'<div class="header qFlex qFlexJustifyBetween">'+
							'<span class="title">视频</span>'+
							'<span class="close">×</span>'+
						'</div>'+
						'<div class="upLoadBox" data-type="video">'+
							'<div class="upLoadVideoBox">'+
							'<input type="file" style="display: none;"/>'+
							'<div class="upLoadVideo">上传视频</div>'+
							'<div class="fileTip qFlex qFlexJustifyStart">'+
                                '<div class="fileName showByStep">False King.mp4</div>'+
                                '<div class="fileProgress">89%</div>'+
                                '<div class="close">×</div>'+
						    '</div>'+
						'</div>'+
						'<div class="upLoadPicBox">'+
							'<input type="file" style="display: none;" />'+
							'<div class="qFlex qFlexJustifyStart">'+
                                '<div class="upLoadPic unUpLoadPic">上传封面</div>'+
                                '<div class="picTip">图片小于2M，支持jpg、png格式</div>'+
                            '</div>'+
                            '<div class="fileTip qFlex qFlexJustifyStart">'+
                                '<div class="fileName showByStep">False King.mp4</div>'+
                                '<div class="fileProgress">89%</div>'+
                                '<div class="close">×</div>'+
                            '</div>'+
						'</div>'+
						'<div class="videoOk">确认</div>'+
					'</div>'+
                '</div>';
        },
        /**
         * 音频上传弹层
         * @returns {string}
         */
        audioUpLoadMask: function(){
            return '<div class="audioUploadMask"></div>'+
						'<div class="audioUpLoadBox">'+
							'<div class="header qFlex qFlexJustifyBetween">'+
								'<span class="title">音频</span>'+
								'<span class="close">×</span>'+
							'</div>'+
							'<div class="upLoadBox" data-type="video">'+
								'<div class="upLoadAudioBox qFlex qFlexJustifyStart">'+
								'<input type="file" style="display: none;"/>'+
								'<div class="upLoadAudio">上传音频</div>'+
                                '<div class="fileTip qFlex qFlexJustifyStart">'+
                                    '<div class="fileName showByStep">False King.mp4</div>'+
                                    '<div class="fileProgress">89%</div>'+
                                    '<div class="close">×</div>'+
                                '</div>'+
						    '</div>'+
						'<div>'+
							'<input class="audioTitle" type="text" maxlength="12" placeholder="输入标题"/>'+
						'</div>'+
						'<div class="audioOk">确认</div>'+
					'</div>'+
                '</div>';
        },
        /**
         *
         * @param option
         * @returns {{code: string, data: string, msg: string}}
         */
        fileSizeTip: function(option){
            var file = ['mp4', 'mp3'],
                obj = {
                    code: '',
                    data: '',
                    msg: ''
                }

            return obj;
        },
        /**
         * 音视频上传
         * @param option
         */
        videoAudioUpLoad: function(option){

        }
    }

    $(function(){

        /**
         * 视频
         */


        /**
         * 插入视频上传弹层
         */
        $('body').on('click', '.videoCard', function(){
			$('.qeditor').append(options.videoUpLoadMask);
        });
        /**
         * 关闭视频上传弹层
         */
		$('body').on('click', '.videoUpLoadBox .close, .videoUploadMask', function(){
			$('.videoUploadMask,.videoUpLoadBox').remove();
		});



        /**
         * 音频
         */


        /**
         * 插入音频上传弹层
         */
        $('body').on('click', '.audioCard', function(){
            $('.qeditor').append(options.audioUpLoadMask);
        });
        /**
         * 关闭音频上传弹层
         */
        $('body').on('click', '.audioUpLoadBox .close, .audioUploadMask', function(){
            $('.audioUploadMask,.audioUpLoadBox').remove();
        });




        /**
         * 音视频上传
         */
        $("body").on({
            drop: function(e){
                e.preventDefault();
                //jquery的file要去e.originalEvent里面拿
                var files = e.originalEvent.dataTransfer.files;

            },
            dragover: function(e){
                console.log('drag over...');
            },
            click: function(){
                $(this).prev().click();
            }
        }, '.videoUpLoadBox .upLoadVideoBox .upLoadVideo');
        /**
         * 上传
         */
        $('body').on('chang', '.videoUpLoadBox .upLoadVideoBox .upLoadVideo,.audioUpLoadBox .upLoadAudioBox .upLoadAudio', function(){

        })
    });


})(window, $)