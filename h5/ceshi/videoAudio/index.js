/*
 * author: liu wei
 * createtime: 2018/5/16 16:41
 * description:
 */
(function (window, $) {

    var options = {
        video: null,
        editVideo: {
            num: 0,
            videoBox: {},
            currentPlayVideo: null
        }
    }

    window.qcourse = options;


    $(function () {

        /**
         * 工具栏显示隐藏
         */
        //$('body').on({
        //    mouseenter: function(){
        //       $(this).find('.toolBox').show()
        //    },
        //    mouseleave: function(){
        //        $(this).find('.toolBox').hide()
        //    }
        //}, '.card');


        /**
         * 监听视频播放
         * @param vid
         */
        window.s2j_onVideoPlay = function (vid) {

            if (options.audio) {
                options.pauseAudio();
            }
            if (!options.video) {
                options.video = window.qcourse.editVideo.videoBox[vid];
                window.qcourse.editVideo.currentPlayVideo = window.qcourse.editVideo.videoBox[vid];
                return;
            } else {
                if(options.video.HTML5 || options.video.flash){
                    if (vid != (options.video.HTML5.vid || options.video.flash.vid)) {
                        if (options.video.HTML5 == false) {
                            options.video.flash.j2s_pauseVideo(); //j2s_pauseVideo()
                        } else {
                            options.video.j2s_pauseVideo();
                        }
                        options.video = window.qcourse.editVideo.videoBox[vid];
                        window.qcourse.editVideo.currentPlayVideo = window.qcourse.editVideo.videoBox[vid];
                    }
                    return;
                }else{
                    if (vid != options.video.vid) {
                        qcourse.editVideo.videoBox[vid].j2s_pauseVideo();
                        options.video = window.qcourse.editVideo.videoBox[vid];
                        window.qcourse.editVideo.currentPlayVideo = window.qcourse.editVideo.videoBox[vid];
                    }
                    return;
                }
            }
        }
    });
})(window, $);