const common=require('/common/common.js');
var multimedia={
  videos:{},
  audios:{},
  video:null,
  audio:null,
  videoPlaying:false,
  audioPlaying:false,
  playIco: 'https://www.qcourse.com/images/audioPlay2x1.0.png',
  paseIco: 'https://www.qcourse.com/images/audioPause2x1.0.png'
}
var video={
  add:function(videoContext){
    var rObj={
      code:1,
      msg:'添加成功！'
    }
    if (!multimedia.videos[videoContext.domId]){
      multimedia.videos[videoContext.domId]=videoContext;
    }else{
      rObj.code=-1;
      rObj.msg="该视频对象已经存在！";
    }
    return rObj;
  },
  onPlay:function(e){
    //判断当前时候有音频在播放
    if(multimedia.audio&&multimedia.audioPlaying){
      audio.pause();
      console.log(getCurrentPages());
    }
    if(multimedia.video){
      //当前全局有视频
      if (multimedia.video.domId != e.target.id){
        //触发的不是同一个视频,暂停正在播放的视频
        multimedia.video.pause();
        //为全局变量重新赋值
        multimedia.video = multimedia.videos[e.target.id];
      }
    }else{
      //当前全局无视频，直接赋值
      multimedia.video=multimedia.videos[e.target.id];
    }
    // console.log('播放了');
    //存储当前视频播放状态
    multimedia.videoPlaying=true;
  },
  onPause:function(e){
    //存储当前视频播放状态
    multimedia.videoPlaying=false;
  },
  onEnd:function(e){
    console.log(e.target.id+'：播放完成');
  },
  isPlaying:function(){
    //返回播放状态
    return multimedia.videoPlaying||false;
  },
  pause:function(){
    multimedia.video.pause();
  }
}
var audio={
  add: function (audioContext,options) {
    // console.log(audioContext);
    var rObj = {
      code: 1,
      msg: '添加成功！'
    }
    if (!multimedia.audios[options.index]) {
      audioContext.src = options.src;
      audioContext.index = options.index;
      audioContext.isStart=false;
      audioContext.subIndex=options.subIndex;
      // audioContext.isAddEventListener=false;
      if(options.subIndex){
        if (multimedia.audios[options.index][options.subIndex]){
          rObj.code = -1;
          rObj.msg = "该音频对象已经存在！";
        }else{
          multimedia.audios[options.index][options.subIndex] = audioContext;
        }
      }else{
        multimedia.audios[options.index] = audioContext;
      }
    } else {
      if(options.subIndex){
        if (multimedia.audios[options.index][options.subIndex]) {
          rObj.code = -1;
          rObj.msg = "该音频对象已经存在！";
        } else {
          multimedia.audios[options.index][options.subIndex] = audioContext;
        }
      }else{
        rObj.code = -1;
        rObj.msg = "该音频对象已经存在！";
      }
    }
    this.onPlay(audioContext);
    return rObj;
  },
  play:function(index,subIndex){
    //判断当前是否有视频在播放
    if(multimedia.video&&multimedia.videoPlaying){
      multimedia.video.pause();
    }
    //播放
    if (index>=0){
      if (multimedia.audio) {
        if (multimedia.audio.index != index){
          multimedia.audio.pause();
          var key = 'dataContent.json.content[' + multimedia.audio.index + '].playPauseIco',
            tempObj = {};
          tempObj[key] = multimedia.playIco;
          multimedia.page.setData(tempObj);
          multimedia.audio = multimedia.audios[index];
        }else{
          if (multimedia.audios[index]) {
            multimedia.audio = multimedia.audios[index];
          }
          else {
            console.log('传入index有误')
            return;
          }
        }
      }else{
        multimedia.audio = multimedia.audios[index];
      }
    }
    if(multimedia.audio){
      multimedia.audio.play();
      var key = 'dataContent.json.content[' + multimedia.audio.index +'].playPauseIco',
        tempObj={};
      tempObj[key] = multimedia.paseIco;
      multimedia.page.setData(tempObj);
      multimedia.audioPlaying = true;
    }
  },
  pause: function (){
    //暂停
    if (multimedia.audio) {
      multimedia.audio.pause();
      var key = 'dataContent.json.content[' + multimedia.audio.index + '].playPauseIco',
        tempObj = {};
      tempObj[key] = multimedia.playIco;
      multimedia.page.setData(tempObj);
      multimedia.audioPlaying = false;
    }
  },
  onTimeUpdate:function(context){
    // context.autoplay = true;
    context.onTimeUpdate(function(res) {
      var key1 = 'dataContent.json.content[' + multimedia.audio.index + '].current',
        key2 = 'dataContent.json.content[' + multimedia.audio.index + '].driection',
        key3 = 'dataContent.json.content[' + multimedia.audio.index + '].progress',
        tempObj = {};
      tempObj[key1] = common.fn.getTimeString(multimedia.audio.currentTime);
      tempObj[key2] = common.fn.getTimeString(multimedia.audio.duration);
      tempObj[key3] = (multimedia.audio.currentTime / multimedia.audio.duration) * 100;
      multimedia.page.setData(tempObj);
    })
  },
  onCanPlay:function(context){
    var that=this;
    context.onCanplay=function(e){
      console.log('可以播放了');
      console.log(e)
    }
    console.log(context);
  },
  onPlay: function (context) {
    var that=this;
    context.onPlay(function (e) {
      if (context.isStart == false) {
        //防止多次注册onTimeUpdate方法；
        that.onTimeUpdate(context);
        that.onEnd(context);
        context.isStart = true;
      }
    })
  },
  onPause: function (context) {
    context.onPause=function(e){
      //存储当前音频播放状态
      multimedia.audioPlaying = false;
    }
  },
  onEnd: function (context) {
    context.onEnded(function(){
      multimedia.audio.pause();
      var key1 = 'dataContent.json.content[' + multimedia.audio.index + '].current',
        key2 = 'dataContent.json.content[' + multimedia.audio.index + '].driection',
        key3 = 'dataContent.json.content[' + multimedia.audio.index + '].progress',
        tempObj = {};
      tempObj[key1] = common.fn.getTimeString(0);
      tempObj[key2] = common.fn.getTimeString(multimedia.audio.duration);
      tempObj[key3] = 0;
      multimedia.page.setData(tempObj);
    })
  },
  playPause: function (index,subIndex) {
    var rdata={
      shouldPauseOther:false
    }
    //返回播放状态
    if(multimedia.audio){
      if (multimedia.audio.index == index){
        //是当前音频
        if(multimedia.audioPlaying){
          //正在播放暂停当前音频
          this.pause();
        }else{
          //播放当前音频
          this.play();
        }
      }else{
        //当前有全局音频并且操作的音频与全局音频不相同
        this.play(index, subIndex);
        rdata.shouldPauseOther=true;
      }
    }else{
      //还没有播放过音频
      this.play(index,subIndex);
    }
    rdata.status = multimedia.audioPlaying || false;
    return rdata;
  }
}
module.exports.setting=multimedia;
module.exports.video=video;
module.exports.audio=audio;