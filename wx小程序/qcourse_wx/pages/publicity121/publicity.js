const app=getApp();
const common=require('../../utils/common/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    dataContent: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var options = {};
    options.pid = 2778;
    this.setData({
      options: options
    })
    
    var that = this
    common.request.productInfo({
      data:{
        'pid': that.data.options.pid
      },
      success:function(res){
        that.setData({
          dataContent: res.data.data
        })

        that.setData({
          'dataContent.json': JSON.parse(res.data.data.json)
        })
      }
    })
    console.log(this.data)
    
    this.curriculum = this.selectComponent("#curriculum");
    this.iPageturning = this.selectComponent("#iPageturning");
    this.iQuizzes = this.selectComponent("#iQuizzes");

    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})