const app=getApp();
const common = require('../../utils/common/common.js');
const utils = require('../../utils/utils.js');
const pbKeepon = require('../../utils/pageBreaks/pbKeepon/pbKeepon.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    dataContent: {},
    orderData:[]
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
    var options = {},
        that = this;
    options.pid = 3131;
    options.pbKeeponIndex = 0;
    this.setData({
      options: options
    })
    common.request.productInfo({
      data:{
        'pid': that.data.options.pid
      },
      success:function(res){
        common.request.getOrder({
          data:{
            pid:that.data.options.pid
          },
          success:function(res1){
            if(res1.data.code==1){
              var orderData = res1.data.data;
              var tempArry = [];
              for(var i=0,len=orderData.length;i<len;i++){
                var subid = parseInt(orderData[i].subid);
                if (orderData[i].status == '1'){
                  tempArry.push(orderData[i]);
                }
              }
              that.setData({
                orderData:tempArry
              })
              console.log(tempArry);
              common.fn.pbKeepon({
                that: that,
                res: res
              });
            }else if(res.data.code==-1){
              common.fn.pbKeepon({
                that: that,
                res: res
              });
              console.log(res.data.msg);
            }else{
              common.fn.pbKeepon({
                that: that,
                res: res
              });
              console.log(res.data.msg);
            }
          }
        })

      }
    })
    console.log(this)
    // utils.components(this);
  },
  //去支付
  pay:function(price){
    var subData = this.getPayObj(price);
    var that = this;
    common.request.pay({
      data: subData,
      method: 'GET',
      success: function (res) {
        wx.requestPayment({
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'paySign': res.data.paySign,
          'signType': res.data.signType,
          'timeStamp': res.data.timeStamp,
          success: function (res) {
            if (res.errMsg == "requestPayment:ok") {
              wx.showToast({
                title: '支付成功',
                icon: 'none'
              })
              this.onLoad();
            } else {
              wx.showToast({
                title: res.errMsg,
                icon: 'none'
              })
            }
          },
          fail: function (res) {
            if (res.errMsg == "requestPayment:fail cancel") {
              wx.showToast({
                title: '取消支付',
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: res.errMsg,
                icon: 'none'
              })
            }
          },
          complete: function (res) {
            if (res.errMsg == "requestPayment:fail cancel") {
              wx.showToast({
                title: '取消支付',
                icon: 'none'
              })
            }
          }
        })
      }
    })
  },
  //获取支付参数
  getPayObj:function (price) {
    return {
      'return_url': '',
      'pid': this.data.options.pid,
      'subid': 1,
      'subname': 1,
      'pname': this.data.dataContent.pname ? this.data.dataContent.pname : '无标题',
      'nums': 1,
      'price': price,
      'discount': 100,
      'amount_discount': price,
      'trade_type': 6,
      'uid': app.globalData.user.uid
    }
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
  
  },
  continueNext: function(e){
    var obj = {};
    obj.e = e;
    obj.that = this
    pbKeepon.continueNext(obj)
  }
})

