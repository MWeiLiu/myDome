var loginUrl = require("../utils/login.js");
var app = getApp();
var rootDocment = app.globalData.rootDocment + '/'; //前缀
function requestUrl(url, data, callback) {
      var dataToken = wx.getStorageSync("token");
      if (dataToken) {
            wx.request({
                  url: rootDocment + url,
                  data: data,
                  method: 'POST',
                  header: {
                        'content-type': "application/json",
                        "token": dataToken
                  },
                  success: function(res) {
                        callback(res)
                  },
                  fail: function(e) {
                        callback(e)
                  }
            })
      } else {
            wx.checkSession({
                  success: function() {
                        //session 未过期，并且在本生命周期一直有效
                  },
                  fail: function() {
                        //登录态过期
                        loginUrl.login();
                  }
            })
      }
}
module.exports = {
      req: requestUrl
}