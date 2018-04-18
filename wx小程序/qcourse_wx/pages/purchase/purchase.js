//purchase.js
Page({
  data: {
    purchaseList: [
        {
          purchasePname: '节节败退的LG手机节节败退的节节节节败退的',
          author: '夜洛枫',
          endTime: '2018-12-13'
        },
        {
          purchasePname: '音乐版权从独家走向开放',
          author: '刘老师',
          endTime: '2018-05-06'
        },
        {
          purchasePname: '在线音乐市场春天来了？',
          author: 'Q博士',
          endTime: '2018-04-20'
        },
        {
          purchasePname: '东南亚创业者之殇：本地化差异',
          author: 'Sean',
          endTime: '2018-11-12'
        }
    ]

  },
  onLoad: function () {
    
  },
  onShow: function(){

  },
  onReady: function(){
    this.purchaseList = this.selectComponent("#purchaseList");
  }
})
