//me.js
const app = getApp();
Page({
  data: {
    meList: [
        {
          imgSize: 'small',
          image: '../../images/curriculumIcon.png',
          title: '购买的课程',
          icon: '../../images/jtRightIcon.png',
          toUrl: 'pages/purchase/purchase'
        },
        {
          imgSize: 'small',
          image: '../../images/walletIcon.png',
          title: '钱包',
          icon: '../../images/jtRightIcon.png',
          toUrl: 'pages/walle/walle'
        }
    ]

  },
  onLoad: function () {
    
  },
  onShow: function(){

  },
  onReady: function(){
    this.img_text_img = this.selectComponent("#img_text_img");
  },
  toUrl: function(e){
    wx.navigateTo({
      url: '../../' + e.target.dataset.tourl
    })
  }
})
