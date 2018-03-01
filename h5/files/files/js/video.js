
(function(window,$){
    
    window.options={
        videoHTML:'<div class="BOX" onmouseenter=multimedia.mouseenter(this) onmouseleave=multimedia.mouseleave(this) data-type="Lvideo">'+
                '<div class="assemblyWrap">'+
                    '<div class="videoBox">'+
                    '<video class="videoContent" >'+
                        '<source type="video/mp4"/>'+
                    '</video>'+
                    '<div class="videoMask">'+
                        '<img class="videoPlay" src="images/videoPlay.png" alt="" data-play="false"/>'+
                        '<div class="videoLoadLoading videoWaiting"></div>'+
                    '</div>'+
                    '<div class="videoOperators">'+
                        '<img class="inlineBlock videoPlayPause" src="images/videoPlayS.png" />'+
                        '<div class="inlineBlock videoCurrentTime">00:00</div>'+
                        '<span class="inlineBlock" style="font-size:14px">&nbsp;/&nbsp;</span>'+
                        '<div class="inlineBlock videoTotalTime">00:00</div>'+
                        '<div class="inlineBlock videoProgressContainer">'+
                            '<div class="videoProgress">'+
                                '<span class="progressPoint"></span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="inlineBlock videoVolumeContent">'+
                            '<img class="inlineBlock volumeMuteMax" src="images/volumeMax1.0.png" data-muted="false" onclick="multimedia.videoSetMuted(this)" />'+
                            '<div class="inlineBlock volumeProgressWrap">'+
                                '<div class="inlineBlock volumeItem vActive" onclick="multimedia.videoSetVolume(0.2)"></div>'+
                                '<div class="inlineBlock volumeItem vActive" onclick="multimedia.videoSetVolume(0.4)"></div>'+
                                '<div class="inlineBlock volumeItem vActive" onclick="multimedia.videoSetVolume(0.6)"></div>'+
                                '<div class="inlineBlock volumeItem" onclick="multimedia.videoSetVolume(0.8)"></div>'+
                                '<div class="inlineBlock volumeItem" onclick="multimedia.videoSetVolume(1)"></div>'+
                            '</div>'+
                        '</div>'+
                        '<img class="inlineBlock videoFull" src="images/fullScreen1.0.png" data-full="false" />'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>',
        audioHTML:
        '<div class="multimedia assemblyWrap">'+
            '<audio class="audio"></audio>'+
            '<div class="audioThumb">'+
                '<span class="audioPP" data-play="false"></span>'+
                '<span class="progressWrap">'+
                    '<span class="progress"></span>'+
                '</span>'+
                '<span class="surplusTime">00:00</span>'+
            '</div>'+
        '</div>',
        addDom:function(dom){
            $('.fileBox').after(dom)
        },
        //音频录制
        //当前初始化录制插件
        recorder: null,
        recordInfo: {
            //文件
            audioFile: null,
            //录制状态，是否在录制
            isRecording: false,
            //是否开始
            isStart: false,
            //时间
            currentTime: 0,
            //定时器
            interval: null
        },
        playBarTimeOut: null,
        currentVideo: null,
        mouseoverVideo: null,
        currentAudio: null,
        mouseoverAudio: null,
        currentVideoWaiting: false
    }
    
    window.qcourse={
        currentEditDom:{},
        //获取时间格式
        getTimeString: function (duration) {
            duration = Math.ceil(duration);
            var m = Math.floor(duration / 60);
            var s = duration % 60;
            if (s < 10) s = '0' + s;
            if (duration < 60) return '00:' + s;
            if (m < 10) m = '0' + m;
            return m + ':' + s;
        }
    }
    
    window.multimedia={
        //移入
        mouseenter:function(_this){
//            options.mouseoverVideo=$(_this).find('.assemblyWrap')
//            options.mouseoverVideo.find('.videoOperators').show()
//            options.mouseoverVideo.find('.videoPlay').show()
        },
        //移出
        mouseleave:function(_this){
//            options.mouseoverVideo.find('.videoOperators').hide()
//            if($(_this).find('.videoPlay').attr('data-play')=='true'){
//                options.mouseoverVideo.find('.videoPlay').hide()
//            }
        },
        //视频ICO
        videoSetIco:function(paly){
            if(paly){
                options.currentVideo.find('.videoPlay').attr('src','images/videoPause.png')
                options.currentVideo.find('.videoPlayPause').attr('src','images/videoPauseS.png')
            }else{
                options.currentVideo.find('.videoPlay').attr('src','images/videoPlay.png')
                options.currentVideo.find('.videoPlayPause').attr('src','images/videoPlayS.png')
                options.currentVideo.find('.videoPlay').attr('data-play','false')
            }
        },
        //播放暂停
        videoPlay:function(_this){
            var videoBegin=false
            if($(_this).find('.videoPlay').attr('data-play')=='true'){
                $(_this).find('video')[0].pause()
                $(_this).find('.videoPlay').attr('data-play','false')
                videoBegin=false
                this.videoSetCurrentTime(videoBegin)
                this.videoSetIco(false)
                options.currentVideo=null
            }else{
                videoBegin=true
                if(options.currentVideo){
                    options.currentVideo.find('video')[0].pause()
                    this.videoSetIco(false)
                    options.currentVideo.find('.videoPlay').attr('data-play','false')
                    options.currentVideo=$(_this)
                    options.currentVideo.find('video')[0].play()
                    this.videoSetIco(true)
                    $(_this).find('.videoPlay').attr('data-play','true')
                }else{
                    $(_this).find('video')[0].play()
                    options.currentVideo=$(_this)
                    this.videoSetIco(true)
                    $(_this).find('.videoPlay').attr('data-play','true')
                }
                this.videoGetDuration()
                this.videoSetCurrentTime(videoBegin)
            }
        },
        //视频是否已播放结束
        videoEnded:function(){
            options.currentVideo.find('video')[0].currentTime=0
            options.currentVideo.find('.videoCurrentTime').html(qcourse.getTimeString(0))
            this.videoSetIco(false)
            this.videoPlayProgressBar()
            options.currentVideo=null
        },
        //当前视频总长度
        videoGetDuration:function(){
            var Video=options.currentVideo.find('video')[0]
            var totalSize=qcourse.getTimeString(Video.duration)
            options.currentVideo.find('.videoTotalTime').html(totalSize)
        },
        //视频播放当前位置
        videoSetCurrentTime:function(videoBegin){
            var videoSetCurrentTime=setInterval(function(){
                if(!videoBegin){
                    clearInterval(videoSetCurrentTime)
                }else{
                    if(options.currentVideo){
                        var Video=options.currentVideo.find('video')[0]
                        var totalSize=qcourse.getTimeString(Video.currentTime)
                        options.currentVideo.find('.videoCurrentTime').html(totalSize)
                        multimedia.videoPlayProgressBar()
                        if(Video.ended){
                            multimedia.videoEnded()
                            clearInterval(videoSetCurrentTime)
                        }
                    }
                }
            },1000)
        },
        //视频进度
        videoPlayProgressBar:function(){
            var Video=options.currentVideo.find('video')[0]
            var progressBar=Video.currentTime/Video.duration*100
            options.currentVideo.find('.videoProgress').css('width',progressBar+'%');
        },
        //视频是否静音
        videoSetMuted:function(_this){
            if($(_this).attr('data-muted')=='false'){
                $(_this).attr('data-muted','true')
                $(_this).parents('.assemblyWrap').find('video')[0].muted=true
                $(_this).attr('src','images/volumeMute1.0.png')
                this.videoSetVolume(0);
            }else{
                $(_this).attr('data-muted','false')
                $(_this).parents('.assemblyWrap').find('video')[0].muted=false
                $(_this).attr('src','images/volumeMax1.0.png')
                this.videoSetVolume(1);
            }
        },
        //视频音量
        videoSetVolume:function(num){
            if (!options.currentVideo) {
                return;
            }
            options.currentVideo.find('video')[0].volume = num;
            var volumeItems = options.currentVideo.find('.volumeItem');
            switch (num) {
                case 0:{
                    $(volumeItems).removeClass('vActive');
                }break;
                case 0.2:{
                    $(volumeItems[0]).addClass('vActive').siblings().removeClass('vActive');
                }break;
                case 0.4:{
                    $(volumeItems[0]).addClass('vActive');
                    $(volumeItems[1]).addClass('vActive');
                    $(volumeItems[2]).removeClass('vActive');
                    $(volumeItems[3]).removeClass('vActive');
                    $(volumeItems[4]).removeClass('vActive');
                }break;
                case 0.6:{
                    $(volumeItems[0]).addClass('vActive');
                    $(volumeItems[1]).addClass('vActive');
                    $(volumeItems[2]).addClass('vActive');
                    $(volumeItems[3]).removeClass('vActive');
                    $(volumeItems[4]).removeClass('vActive');
                }break;
                case 0.8:{
                    $(volumeItems[0]).addClass('vActive');
                    $(volumeItems[1]).addClass('vActive');
                    $(volumeItems[2]).addClass('vActive');
                    $(volumeItems[3]).addClass('vActive');
                    $(volumeItems[4]).removeClass('vActive');
                }break;
                case 1:{
                    $(volumeItems).addClass('vActive');
                }break;
                default:{
                    
                }break;
            }
        },
        //进入全屏
        requestFullScreen:function (_this) {
            if (_this.requestFullscreen) {
                _this.requestFullscreen();
            } else if (_this.mozRequestFullScreen) {
                _this.mozRequestFullScreen();
            } else if (_this.webkitRequestFullScreen) {
                _this.webkitRequestFullScreen();
            }
        },
        //退出全屏
        exitFullscreen:function (_this) {
            if (_this.exitFullscreen) {
                _this.exitFullscreen();
            } else if (_this.mozCancelFullScreen) {
                _this.mozCancelFullScreen();
            } else if (_this.webkitCancelFullScreen) {
                _this.webkitCancelFullScreen();
            }
//            if(!_this.paused){
//                var progressBar=_this.currentTime/_this.duration*100
//                _this.parents('.assemblyWrap').find('.videoProgress').css('width',progressBar+'%');
//                
//                var duration=qcourse.getTimeString(_this.duration)
//                _this.parents('.assemblyWrap').find('.videoTotalTime').html(duration)
//                
//                var currentTime=qcourse.getTimeString(_this.currentTime)
//                _this.parents('.assemblyWrap').find('.videoCurrentTime').html(currentTime)
//                
//                _this.parents('.assemblyWrap').find('.videoPlay').attr('data-play','false')
//                
//                this.videoSetIco(true)
//            }
        },
        //音频
        audioPlay:function(_this){
            
        },
        //录制
        audioRecord:function(){
            //调用浏览器录音
            if(!options.recorder){
                window.URL=window.URL||window.webkitURL;
                //请求开启录音
                Myna.get(function(rec){
                    options.recorder=rec
                })
            }
        },
        startRecord:function(_this){
            if(options.recorder){
                //是否开始录音
                if(options.recordInfo.isStart){
                    options.recorder.pause()
                    //是否在录制
                    if(options.recordInfo.isRecording){
                        if(options.recordInfo.interval){
                            clearInterval(options.recordInfo.interval);
                        }
                        options.recordInfo.isRecording=false
                        $(_this).css('background-image', 'url("images/recordContinueIcon.png")');
                    }else{
                        options.recordInfo.isRecording = true;
                        $(_this).css('background-image', 'url("images/recordPauseIcon.png")');
                        if (options.recordInfo.interval) {
                            clearInterval(options.recordInfo.interval);
                        }
                        options.recordInfo.interval = setInterval(function () {
                            options.recordInfo.currentTime += 1;
                            $(_this).parent().prev().html(qcourse.getTimeString(options.recordInfo.currentTime));
                        }, 1000);
                    }
                }else{
                    options.recorder.start()
                    options.recordInfo.isRecording = true;
                    options.recordInfo.isStart=true
                    $(_this).css('background-image', 'url("images/recordPauseIcon.png")');
                    if(options.recordInfo.interval){
                        clearInterval(options.recordInfo.interval);
                    }
                    //计时
                    options.recordInfo.interval=setInterval(function(){
                        options.recordInfo.currentTime+=1
                        $(_this).parent().prev().html(qcourse.getTimeString(options.recordInfo.currentTime));
                    },1000)
                }
            }
        },
        endRecord:function(_this){
            if(options.recorder&&options.recordInfo.isStart){
                options.recordInfo.audioFile=options.recorder.audioFile()
                options.recorder.stop();
                options.recordInfo.isStart = false;
                options.recordInfo.isRecording = false;
                clearInterval(options.recordInfo.interval);
                options.recorder.getBlobData($('#audio')[0])
                if(options.recordInfo.audioFile){
                    console.log(options.recordInfo.audioFile)
                }
            }
        }
        
        
        
    }
    
    
    
    
    $(function(){
        //播放视频
        $('.videoBox .videoPlay,.videoBox .videoPlayPause').live('click',function(){
            var dom=$(this).parents('.assemblyWrap')
            window.multimedia.videoPlay(dom)
        })
        //视频全屏
        $('.videoBox .videoFull').live('click',function(){
            var dom=$(this).parents('.videoBox').find('video')[0]
            if($(this).attr('data-full')=='false'){
                multimedia.requestFullScreen(dom)
                $(this).attr('data-full','true')
            }else{
                multimedia.exitFullscreen(dom)
                $(this).attr('data-full','false')
            }
        })
        
        //音频
        $('.audioPP').live('click',function(){
            var dom=$(this).parents('.assemblyWrap')
            multimedia.audioPlay(dom)
        })
        //录制
            multimedia.audioRecord()
        $('.record').live('click',function(){
            multimedia.startRecord($(this))
        })
        $('.audioUploadBtn').live('click',function(){
            multimedia.endRecord($(this))
        })
        
    })
    
})(window,$)