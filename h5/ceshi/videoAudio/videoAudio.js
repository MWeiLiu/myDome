/*
 * author: liu wei
 * createtime: 2018/5/16 16:42
 * description:
 */

(function (window, $) {
    var options = {
        videoArry: [],
        audioArry: [],
        polyvsInit: function () {
            var that = this,
                i = 0,
                j = 0;
            $('.qeditor .card').each(function(index, item){
                if($(item).attr('data-cardType') == 'video'){
                    var pDom = $(item).find('.polyv_video')[0],
                        playerVideo = polyvPlayer({
                            width: '100%',
                            height: '100%',
                            wrap: pDom,
                            vid: that.videoArry[i],
                        });
                    qcourse.editVideo.videoBox[that.videoArry[i]] = playerVideo;
					$(item).attr({
						'data-vid': that.videoArry[i]
					})
                    i++
                }
            });

//            $('.qeditor .card').each(function (index, item) {
//                if ($(item).attr('data-cardType') == 'audio') {
//                    var pDom = $(item).find('.polyv_audio' + j),
//                        playerAudio = polyvObject('.audio_player' + j).videoPlayer({
//                            width: '1',
//                            height: '1',
//                            vid: that.audioArry[j],
//                            useAudio: true,
//                            ban_ui: false,
//                            hidePlayBtn: true,
//                            forceHTML5: true
//                        }),
//                        polyvAudioObj = pDom.polyvAudio({
//                            player: playerAudio
//                        });
//                    qcourse.editVideo.videoBox[that.audioArry[j]] = playerAudio;
//                    console.log(qcourse.editVideo.videoBox)
//                    j++
//                }
//            });
        },
    }

    $(function () {

        options.videoArry = [
//            'e8888b74d1229efec6b4712e17cb6b7a_e',
            '6c76f7ae8c7a092c03d7f35cfafd82d3_6'
        ]
//        options.audioArry = [
//            'accb9f485b10c10478651a4e61d49425_a',
//            'accb9f485b180ec89afd18f9c8756bc2_a'
//        ]
        options.polyvsInit();

    })
})(window, $);