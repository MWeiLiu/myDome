//logs.js
const common = require('../../utils/common/common.js');
const paragraph = require('../../utils/pureText/paragraph/paragraph.js');

Page({
  data: {
    
    iPagetab: [
      {
          img: 'https://www.qcourse.com/images/pictrue.jpg',
          title: 'tab1',
          text: '这是tab1'
      },
      {
          img: 'https://www.qcourse.com/images/pictrue.jpg',
          title: 'tab2',
          text: '这是tab2'
      },
      {
          img: 'https://www.qcourse.com/images/pictrue.jpg',
          title: 'tab3',
          text: '这是tab3'
      }
    ],
    pictrueTxtGroupOne: {
      fzkpText: '123'
    },
    //图片轮播
    pictrueTurntable: {
      swiperIndex: 0,
      duration: 300,
      indicatorDots: true,
      indicatorColor: '#fff',
      indicatorActiveColor: '#333',
      tabTxtArray:['https://www.qcourse.com/images/750_1.jpg', 'https://www.qcourse.com/images/750_1.jpg', 'https://www.qcourse.com/images/750_1.jpg']
    },
    //支付
    pbPayOff: {
      payment: 2
    }
  },
  onLoad: function () {
    
  },
  bindParagraph: function(){
    paragraph.paragraph()
  },
  onReady: function(){
    this.dialog = this.selectComponent("#tab");
  },
  // _tabIndex: function(e){
  //   var index = e.target.dataset.datatab;
  //   console.log(index);
  //   // this.dialog.hideDialog();
  // },



  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },

  showDialog(){
    this.dialog.showDialog();
  },

   //取消事件
  _cancelEvent(){
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent(){
    console.log('你点击了确定');
    this.dialog.hideDialog();
  }
})
