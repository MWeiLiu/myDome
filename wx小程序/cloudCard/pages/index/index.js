var request = require('../../utils/https.js');
var canvas = require('../../utils/canvas.js');
var app = getApp();

var start_clientX;
var end_clientX;

var loadMsgData = function (that, userName, dataToken) {
  that.setData({
    hidden: false
  });
  request.req('ApiMember/SetUserName', {
    userName: userName,
    token: dataToken
  }, function (r) {
    if (r.data.ErrorCode == 0) {

    } else {
      that.show(r.data.ErrorMsg)
    }
  });
};


Page({
  data: {
    cardList:[
      {
        "img":'../../images/icon_educ.png',
        "name":'满减卡'
      },
      {
        "img": '../../images/icon_educ.png',
        "name": '折扣卡'
      },
      {
        "img": '../../images/icon_educ.png',
        "name": '平台卡'
      },
      {
        "img": '../../images/icon_educ.png',
        "name": '商家联盟卡'
      },
      {
        "img": '../../images/icon_educ.png',
        "name": '满减卡'
      },
      {
        "img": '../../images/icon_educ.png',
        "name": '折扣卡'
      },
      {
        "img": '../../images/icon_educ.png',
        "name": '平台卡'
      },
      {
        "img": '../../images/icon_educ.png',
        "name": '商家联盟卡'
      }
    ],
    imgList: [
      {
        "img": "../../images/ban1.jpg"
      },
      {
        "img": "../../images/ban2.jpg"
      },
      {
        "img": "../../images/ban3.jpg"
      }
    ],
    userList:[
      {
        "url":"",
        "icon":"icon-yue",
        "name":"余额"
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
    infoList:[
      {
        "url":"",
        "icon":"icon-expend",
        "name":"消费记录"
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
    currentTab: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    loginHidden: true
  },
  onLoad() {
    new app.ToastPannel();
    var that = this;
    canvas.tagCan('myCanvas',300,200,10,[10,20]);
    // var dataToken = wx.getStorageSync("token");
    // app.UserInfos(dataToken, function(users) {
    //       that.setData({
    //             loginHidden: true,
    //             myInfo: {
    //                   HeadUrl: users.userInfo.avatarUrl,
    //                   Name: users.userInfo.nickName
    //             }
    //       });
    //       wx.setStorage({
    //             key: 'userInfo',
    //             data: users
    //       });
    //       loadMsgData(that, users.userInfo.nickName, dataToken);
    // }, function(res) {
    //       that.setData({
    //             loginHidden: false
    //       });
    // });
  },
  bindGetUserInfo(res) {
    var dataToken = wx.getStorageSync("token");
    var _this = this;
    var param;
    if (res.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
        success: function (data) {
          if (data.confirm) {
            wx.openSetting({
              success: function (datas) {
                if (datas.authSetting["scope.userInfo"]) {
                  app.UserInfos(_this.data.dataToken, function (users) {
                    _this.setData({
                      loginHidden: true,
                      myInfo: {
                        HeadUrl: users.userInfo.avatarUrl,
                        Name: users.userInfo.nickName
                      }
                    });
                    wx.setStorage({
                      key: 'userInfo',
                      data: users
                    });
                    loadMsgData(_this, users.userInfo.nickName, dataToken);
                  }, function () { });
                }
              }
            })
          }
        }
      })
    } else {
      param = {
        userName: res.detail.userInfo.nickName,
        HeadUrl: res.detail.userInfo.avatarUrl
      }
      _this.setData({
        loginHidden: true,
        myInfo: {
          HeadUrl: res.detail.userInfo.avatarUrl,
          Name: res.detail.userInfo.nickName
        }
      });
      wx.setStorage({
        key: 'userInfo',
        data: res
      });
      loadMsgData(_this, res.detail.userInfo.nickName, dataToken);
    }
  },
  // 头像
  showview() {
    this.setData({
      display: "block",
      translate: 'transform: translateX(' + this.data.windowWidth * 0.7 + 'px);'
    })
  },
  // 遮拦
  hideview() {
    this.setData({
      display: "none",
      translate: '',
    })
  },
  //点击切换
  clickTab(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  GoSearch(){
    wx.navigateTo({
      url: '../search/search'
    });
  },
  onShareAppMessage(ops) {
    var that = this;
    // if (ops.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(ops.target)
    // }
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