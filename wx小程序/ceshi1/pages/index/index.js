//index.js
//获取应用实例
const app = getApp()

//用来注册一个页面
Page({
  //页面的初始数据
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    thisPrototype: 'this',
    array: ['a', 's', 'd', 'f'],
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shang', lastName: 'You'},
    staffC: {firstName: 'Gideon', lastName: 'Lin'}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //监听页面加载
  onLoad: function () {
    var a = [];
    for(var i = 0; i < 5; i++){
      a[i] = i;
    }
    this.setData({
      array: a
    })
    //一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
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
  },
  onReady: function() {
    //监听页面初次渲染完成,一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互
  },
  onShow: function() {
    //每次打开页面都会调用一次
  },
  onHide: function() {
    // 监听页面隐藏
  },
  onUnload: function() {
    // 监听页面卸载
  },
  onPullDownRefresh: function() {
    // 监听用户下拉刷新事件。
    // 需要在app.json的window选项中或页面配置中开启enablePullDownRefresh。
    // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
  },
  onReachBottom: function() {
    // 监听用户上拉触底事件。
    // 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
    // 在触发距离内滑动期间，本事件只会被触发一次。
  },
  onShareAppMessage: function () {
    // 用户点击右上角转发
   
    // 只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
    // 用户点击转发按钮的时候会调用
    // 此事件需要 return 一个 Object，用于自定义转发内容
    return {
      'title': '转发标题', //当前小程序名称
      'path': '转发路径' //当前页面 path ，必须是以 / 开头的完整路径
    }
  },
  onPageScroll: function() {
    // 监听用户滑动页面事件
    //参数为 Object,{scrollTop: number}页面在垂直方向已滚动的距离（单位px）
  },
  onTabItemTap(item) {
    //当前是 tab 页时，点击 tab 时触发
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // Event handler.
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  },
  customData: {
    hi: 'MINA'
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
// navigateTo, redirectTo 只能打开非 tabBar 页面。
// switchTab 只能打开 tabBar 页面。
// reLaunch 可以打开任意页面。
// 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
// 调用页面路由带的参数可以在目标页面的onLoad中获取。