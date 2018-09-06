var rootUrl = "https://mls.elg5.com";
function loginHttp() {
      var that = this;
      wx.login({
            success: function (data) {
                  var param = {
                        code: data.code
                  }
                  wx.request({
                        url: rootUrl + "/sm001/ApiDefault/login",
                        data: param,
                        header: {
                              'content-type': "application/json",
                        },
                        success: function (tokenRes) {
                              var token = tokenRes.data.Data.token;
                              wx.setStorage({ key: 'token', data: token });
                        }
                  })
            }
      })
}
module.exports = {
      login: loginHttp
}  