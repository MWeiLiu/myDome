//index.js
//获取应用实例
const app = getApp();
const multimedia=require('../../utils/multimedia.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    playIco:'https://www.qcourse.com/images/audioPlay2x1.0.png',
    pauseIco:'https://www.qcourse.com/images/audioPause2x1.0.png',
    audioDriection:'00:00',
    audioCurrent:'00:00',
    currentAudio:null,
    audioActiveColor:'',
    options:null,
    dataContent:{
      json:{
        content:[
          {
            index: 0,
            subIndex: null,
            src: 'http://plvod01.videocc.net/6c76f7ae8c/e/6c76f7ae8ca56be5be14780cce5f886e_1.mp3',
            playPauseIco: 'https://www.qcourse.com/images/audioPlay2x1.0.png',
            current: '00:00',
            driection: '00:00',
            progress: 0
          },
          {
            index: 1,
            subIndex: null,
            src: 'http://plvod01.videocc.net/6c76f7ae8c/5/6c76f7ae8cfb8fc0770900ed8c2a8e45_1.mp3',
            playPauseIco: 'https://www.qcourse.com/images/audioPlay2x1.0.png',
            current: '00:00',
            driection: '00:00',
            progress: 0
          }
        ]
      }
    },
    audios:[
      
    ],
    pagetab:{
      tabnames:[
        'tab1',
        'tab2',
        'tab3'
      ],
      tabimages:[
        'https://www.qcourse.com/images/750_2.jpg',
        'https://www.qcourse.com/images/750_1.jpg'
      ]
    },
    purchaseList: {
      indicatorDots: false,
      autoplay: false,
      duration: '500',
      current: '0',
      items: [
        [
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '节节败退的LG手机节节败退的LG音乐版权从独家走向开放音乐版权从独家走向开放',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '12',
            pid: '2374'
          },
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '音乐版权从独家走向开放',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '13',
            pid: '2374'
          },
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '在线音乐市场春天来了？',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '2',
            pid: '2374'
          },
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '东南亚创业者之殇：本地化差异',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '2',
            pid: '2374'
          }
        ],
        [
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '节节败退的LG手机节节败退的LG音乐版权从独家走向开放音乐版权从独家走向开放',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '12',
            pid: ''
          },
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '音乐版权从独家走向开放',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '13',
            pid: ''
          },
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '在线音乐市场春天来了？',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '2',
            pid: ''
          },
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '东南亚创业者之殇：本地化差异',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '2',
            pid: ''
          }
        ],
        [
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '节节败退的LG手机节节败退的LG音乐版权从独家走向开放音乐版权从独家走向开放',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '12',
            pid: ''
          },
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '音乐版权从独家走向开放',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '13',
            pid: ''
          },
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '在线音乐市场春天来了？',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '2',
            pid: ''
          },
          {
            imgSize: 'large',
            image: '../../images/invitingCardBanner2.png',
            title: '东南亚创业者之殇：本地化差异',
            icon: '../../images/jtRightIcon.png',
            tipNumber: '2',
            pid: ''
          }
        ]
      ]
    },
    recentlyBrowseList: [
        {
        image: '../../images/invitingCardBanner2.png',
        pname: '赵老师育婴课',
        subTitle: '得到推荐育婴专家，带你开启“牛孩之路”iunun u nunyvgv'
        },
        {
        image: '../../images/invitingCardBanner2.png',
        pname: '在线音乐市场春天来了？',
        subTitle: '东南亚创业者之殇：本地化差异'
        },
        {
        image: '../../images/invitingCardBanner2.png',
        pname: '赵老师育婴课',
        subTitle: '东南亚创业者之殇：本地化差异'
        }
    ]
  },
  onLoad: function (options) {
    this.setData({
      options:options
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getLocation({
      success: function(res) {
        // console.log(res);
      },
    })
    // wx.scanCode({
    //   success:(res)=>{
    //     console.log('调起扫一扫')
    //   }
    // })
  },
  onReady:function(){
    this.img_text_img = this.selectComponent("#img_text_img");
    this.recentlyBrowseList = this.selectComponent("#recentlyBrowseList");
    // this.data.currentVideo = wx.createVideoContext('myVideo', this);
    // this.data.currentVideo.play();
    // console.log(this.data.currentVideo);
    multimedia.setting.page=this;
    var video1 = wx.createVideoContext('myVideo1', this);
    var video2 = wx.createVideoContext('myVideo2', this);
    multimedia.video.add(video1);
    multimedia.video.add(video2);
    for(var value of this.data.dataContent.json.content){
      var audio = wx.createInnerAudioContext();
      multimedia.audio.add(audio, value);
    }
    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    // innerAudioContext.onPlay((res) => {
    //   console.log('开始播放')
    //   // console.log(res);
    //   innerAudioContext.onTimeUpdate((res) => {
    //     console.log(res);
    //   })
    // })
    // innerAudioContext.onError((res) => {
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  videoOnPlay:function(e){
    multimedia.video.onPlay(e);
  },
  videoOnPause:function(e){
    multimedia.video.onPause(e);
  },
  videoOnEnd:function(e){
    multimedia.video.onEnd(e);
  },
  videoOnError:function(e){
    console.log(e);
  },
  videoTimeUpdate:function(e){
    // console.log(e.detail);
  },
  audioPlayPause:function(e){
    // var playstatus=this.data.audios[e.target.id].playing,
    var playstatus = multimedia.audio.playPause(e.currentTarget.dataset.index),
      id = e.currentTarget.dataset.index,
        ico = 'audios[' + id + '].playPauseIco', 
        playing = 'audios[' + id + '].playing',
        that=this;
    console.log(id);
    // var tempObj ={};
    // if (playstatus.shouldPauseOther||(this.data.currentAudio&&id!=this.data.currentAudio)){
    //   //之前有音频正播放需要改为暂停状态
    //   var ico1 = 'audios[' + this.data.currentAudio + '].playPauseIco',
    //       tempObj1={}
    //   tempObj1[ico1] = 'https://www.qcourse.com/images/audioPlay2x1.0.png';
    //   this.setData(tempObj1);
    // }
    // if (playstatus.status == false) {
    //   tempObj[ico] = 'https://www.qcourse.com/images/audioPlay2x1.0.png';
    // } else {
    //   tempObj[ico] = 'https://www.qcourse.com/images/audioPause2x1.0.png';
    // }
    // this.setData(tempObj);
    // this.setData({
    //   currentAudio:id
    // })
  },
  gotoPublicity:function(e){
    wx.navigateTo({
      url: '../publicity/publicity?pid=' + e.currentTarget.dataset.pid
    });
  },
  gotoPublicity1:function(){
    wx.navigateTo({
      url: '../product/product?id=222',
    })
  }
})
