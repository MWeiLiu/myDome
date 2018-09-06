var request = require('../../utils/https.js');
var app = getApp();

var start_clientX;
var end_clientX;
Page({
  data: {
    userList: [
      {
        "url": "",
        "icon": "icon-yue",
        "name": "余额"
      },
      {
        "url": "",
        "icon": "icon-card",
        "name": "会员卡"
      },
      {
        "url": "",
        "icon": "icon-xiaoxi",
        "name": "消息"
      }
    ],
    infoList: [
      {
        "url": "",
        "icon": "icon-expend",
        "name": "消费记录"
      },
      {
        "url": "",
        "icon": "icon-quan",
        "name": "优惠券"
      },
      {
        "url": "",
        "icon": "icon-dianpu",
        "name": "店铺记录"
      },
      {
        "url": "",
        "icon": "icon-jilu",
        "name": "买卖历史"
      },
      {
        "url": "",
        "icon": "icon-yaoqing",
        "name": "我的邀请链接"
      },
      {
        "url": "",
        "icon": "icon-ziyuan",
        "name": "客服"
      },
      {
        "url": "",
        "icon": "icon-iconfontshezhi",
        "name": "设置"
      }
    ],
    windowWidth: wx.getSystemInfoSync().windowWidth,
    sortHidden:true,
    genreHidden:true,
    areaHidden:true,
    isSort:true,
    isGenre:true,
    isArea:true
  },
  onLoad() {
    new app.ToastPannel();
    var that = this;
  },
  // 头像
  showview() {
    this.setData({
      display: "block",
      translate: 'transform: translateX(' + this.data.windowWidth * 0.7 + 'px);'
    });
  },
  // 遮拦
  hideview() {
    this.setData({
      display: "none",
      translate: '',
    });
  },
  AllSort(){
    if (this.data.isSort){
      this.setData({
        sortHidden: false,
        genreHidden: true,
        areaHidden: true,
        isSort: false,
        isGenre: true,
        isArea: true
      });
    }else{
      this.setData({
        sortHidden: true,
        isSort: true
      });
    }
  },
  AllGenre(){
    if (this.data.isGenre) {
      this.setData({
        sortHidden: true,
        genreHidden: false,
        areaHidden: true,
        isSort: true,
        isGenre: false,
        isArea: true
      });
    } else {
      this.setData({
        genreHidden: true,
        isGenre: true
      });
    }
  },
  AllArea(){
    if (this.data.isArea) {
      this.setData({
        sortHidden: true,
        genreHidden: true,
        areaHidden: false,
        isSort: true,
        isGenre: true,
        isArea: false
      });
    } else {
      this.setData({
        areaHidden: true,
        isArea: true
      });
    }
  },
  onShareAppMessage(ops) {
    var that = this;
    return {
      title: '卡商城',
      path: 'pages/index/index',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    }
  }
})