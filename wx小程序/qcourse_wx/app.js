//app.js
const common =require('utils/common/common.js')
App({
  onLaunch: function () {
    var that=this;
    // 获取用户信息
    try {

      var data1 = { "uid": 100000250, "email": null, "mobile": null, "nickname": "1111111111", "icon": "/uploads/users/icons//5aa0e17a3b26b.png", "wechat": "oLyV6wlyj1zE0h9WhitSNGYwFoMw", "token": "NDc5YTcwNMMyMjA5NtEzMzRJMGNhY2RkMjU2NGVlOTA=" }
      wx.setStorageSync('user', data1);
      var userInfo = wx.getStorageSync('user');
      if(userInfo&&userInfo.token){
        wx.checkSession({
          success:res=>{
            //设置用户信息到全局的user中
            this.globalData.user=userInfo;
          },
          fail:res=>{
            // 登录
            wx.login({
              timeout: 7 * 24 * 3600 * 1000,
              success: res1 => {

                wx.getUserInfo({
                  withCredentials: true,
                  success: res2 => {
                    console.log(res2);

                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    that.userInfo(res1,res2);
                    console.log(res1);
                  }
                })
              }
            })
          }
        }) 
      }
      else{
        // 登录
        wx.login({
          timeout: 7 * 24 * 3600 * 1000,
          success: res => {
            wx.getUserInfo({
              withCredentials: true,
              success: res1 => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                that.userInfo(res, res1);
              }
            })
          }
        })
      }
    }catch(e){
      console.log(e);
    } 
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: res=> {
        this.globalData.systemInfo=res;
      }
    })
    //判断有没有在数组中
    Array.prototype.contains = function (obj) {
      var i = this.length;
      while (i--) {
        if (this[i] === obj) {
          return true;
        }
      }
      return false;
    }
  },
  userInfo:function(res1,res2) {
    var that=this;
    console.log('调用了用户信息');
    common.request.login({
      data: {
        code: res1.code,
        key: res2.encryptedData,
        iv:res2.iv
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == '100107') {
          common.request.getToken({
            data:{
              uid:res.data.data.uid
            },
            success:function(res1){
              var data = res.data.data;
              if(res1.data.code==1){
                data.token = res1.data.data.token;
                //设置用户信息到全局的user中
                that.globalData.user = data;
                //设置用户信息到storage中
                wx.setStorageSync('user', data);
                common.token=res1.data.data.token;
              }else{
                wx.showToast({
                  title: '获取用户信息失败',
                  icon: 'none'
                })
              }
            },
            fail:function(res1){
              wx.showToast({
                title: '获取用户信息失败',
                icon:'none'
              })
            }
          })
        }else{
          console.log(res.data.msg);
        }
      }
    })
  },
  //获取系统信息
  globalData: {
    userInfo: null,
    systemInfo:null,
    // accessToken:null,
    user:null
  }
})