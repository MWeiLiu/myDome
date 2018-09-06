var request = require('../../utils/https.js');
var app = getApp();

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
    navTab: ["全部", "有图", "无图"],
    currentIdx: 0,
    num: [0, 1, 2, 3, 4],
    curStarIndex: 5,
    winHeight: wx.getSystemInfoSync().windowHeight
  },
  onLoad(options) {
    new app.ToastPannel();
    var that = this;
  },
  switchTab(e){
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    that.setData({
      currentIdx: idx
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