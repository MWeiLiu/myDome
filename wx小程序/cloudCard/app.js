import { ToastPannel } from 'toast/toast'
var log = require("utils/login.js");
App({
      onLaunch: function () {
            //log.login();
      },
      globalData: {
            rootDocment: 'https://mls.elg5.com/sm001',
            imgUrl: 'https://mls.elg5.com'
      },
      ToastPannel,
      UserInfos(tokens, userInfoCallback, callback) {
            var that = this;
            wx.getSetting({
                  success: function (res) {
                        if (res.authSetting['scope.userInfo']) {
                              wx.getUserInfo({
                                    success: function (users) {
                                          var param = {
                                                userName: users.userInfo.nickName,
                                                HeadUrl: users.userInfo.avatarUrl
                                          }

                                          userInfoCallback(users);
                                    }
                              })
                        } else {
                              callback(res);
                        }
                  }
            })
      }
})

