//view.js
var asd = require('../../utils/asd.js');
Page({
  data: {
    fzkpText: '翻页格翻页格翻页格翻页格翻页格翻页格翻页格',
    fzkpimage: 'https://www.qcourse.com/images/750_2.jpg',
    animate1: '',
    animate2: '',
    backface: 'false',
    tabTitArray: ['tab页1', 'tab页2', 'tab页3'],
    tabTxtArray: [['tab页0', 'https://www.qcourse.com/images/750_1.jpg'], ['tab页1tab页1tab页1tab页1tab页1tab页1tab页1tab页1tab页1', 'https://www.qcourse.com/images/750_2.jpg'], ['tab页2', 'https://www.qcourse.com/images/750_3.jpg']],
    indicatorDots: false,
    autoplay: false,
    duration: 300,
    swiperIndex: 0,
    arry: []
  },
  onLoad: function () {
    var animate = wx.createAnimation({
          duration: 400,
          timingFunction: 'linear'
        }),
        that = this;
    
    this.animation = animate;

    this.animation.rotateY(90).step();
    this.setData({
      animate2: this.animation.export()
    });
  },
  onShow: function(){

  },
  fan: function(e){
    var that = this;
    asd.bb.aa(e.target.dataset.back, that);
  },
  fan2: function(){
    this.animation.rotateY(0).step();

    this.setData({
      animate2: this.animation.export()
    });
  },
  fan3: function(){
    this.animation.rotateY(0).step();

    this.setData({
      animate1: this.animation.export()
    });
  },
  tab: function(e){
    var index = e.target.dataset.datatab;
    this.setData({
      swiperIndex: index
    })
    console.log(index)
  }
})
