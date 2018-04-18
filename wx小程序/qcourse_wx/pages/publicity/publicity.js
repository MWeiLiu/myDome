const app = getApp();
const common = require('../../utils/common/common.js');
const pbKeepon = require('../../utils/pageBreaks/pbKeepon/pbKeepon.js');

Page({
  data: {
    //页面参数
    options: null,
    //所有的一级子元素（不含对象，数组）
    baseData: {
      couponBg: 'https://www.qcourse.com/images/couponBg2x1.0.png',
      couponBgActive: 'https://www.qcourse.com/images/couponBgSelected2x1.0.png',
      couponOperateIco: 'https://www.qcourse.com/images/couponCancel.png',
      couponOperateActiveIco: 'https://www.qcourse.com/images/couponSelected.png',
      shareIco: 'https://www.qcourse.com/images/productShare2x1.0.png',
      sharePriceIco:'https://www.qcourse.com/images/productShare2x1.1.png',
      rCouponIsShow: 'hide',//可领取优惠券状态
      canvasIsShow: 'hide',
      payAreaShow: 'hide',//可用优惠券显示状态
      sideTabShow: 'false',//左侧栏的显示状态
      inCourse:'false',
      couponType: 'receive',//领取receive，购买时使用use
      containerHeight:'555',
      canResiCoupon: 'true',//是否可以领取优惠券
      curriculumItemH: 42,//左侧列表每一项的高度
      color:'#5e5e5e'
    },
    animationObj:{
      publicity:{},
      course:{},
      container:{}
    },
    operates:{
      status:'hide',
      title:'提示',
      hideOperateWrap:'hideOperateWrap',
      items:[
        {
          name: '保存到相册',
          bindFn:'saveImgToAlbum'
        }
      ]
    } ,
    shareInfo: {
      areaSize: app.globalData.systemInfo.windowHeight,
      oHeader: '../../images/defaultHeaderImg.png',
      header: '',
      nickname: 'Qcourse用户',
      title: 'Qcourse小课精选站',
      qrW: 124,
      oBgImg: '../../images/invitingCardBanner2.png',
      bgImg: '',
      qrcode: '../../images/bbQrcode.png',
      status: false,//是否已经生成过
      shareImg: ''
    },
    icon: {
      share: 'https://www.qcourse.com/images/productShare2x1.0.png',
      receiveCoupon: 'https://www.qcourse.com/images/productShare2x1.1.png'
    },
    price:{
      price:0,
      payed:true
    },
    //可领取的优惠券
    coupon: [],
    //当前选择领取的优惠券
    currentCoupon: {},
    //可使用优惠券
    myCoupon: [],
    //当前使用的优惠券
    useCoupon: {},
    //邀请卡信息
    inviteInfo:{
      sharePrice:0
    },
    dataContent: {
      // pname: '投资人喜欢你吗投资人喜欢你吗',
      // price: '2.0000',
      // pic: ''
    },
    payObj:{},
    courseInfo:{

    },
    curriculums:[],
    canSeeCurri:[],
    currentCurri:{
      index:-1,
      pid:-1
    }
  },
  onLoad: function (options) {
    // options.pid ='3085';

    options.pid = '2374';
    options.pbKeeponIndex=0;
    this.setData({
      options: options
    })
    console.log(options);
  },
  onReady: function(){
    //获取专题信息
    var that=this;
    // this.productInfo(this.data.options.pid);
    common.that=this;
    common.request.productInfo({
      data:{
        pid:that.data.options.pid
        // pid:2511
      },
      success:function(res){
        if(res.data.code==1){
          var data=res.data.data;
          if(data.json&&data.json.length>3){
            data.json=JSON.parse(data.json);
          }
          that.setData({
            courseInfo: data
          })
          console.log(data);
          console.log(that);
          //价格设置
          if(data.json.price&&data.json.price[0].price){
            var price = common.fn.toDoubleDecimal(data.json.price[0].price);
            if(price>0){
              that.setData({
                'price.price': price,
                'price.payed': false
              })
            }
          }
          //
          var contents=data.json.content;
          for(var i=0,len=contents.length;i<len;i++){
            if (contents[i].dataType =='subscribe'){
              //订阅信息
              if (contents[i].content.textident && contents[i].content.textident != ''){
                if (contents[i].content.textident > 0) {
                  that.setData({
                    'price.price': common.fn.toDoubleDecimal(contents[i].content.textident),
                    'price.payed': false,
                    'price.limit': contents[i].content.limit
                  })
                }
              }
            } else if (contents[i].dataType =='curriculum'){
              //课程列表生成
              that.setData({
                'curriculums': contents[i].content.list[0]
              })
            }
          }

          //获取专题邀请卡
          that.getInvite();
          if (data.uid == app.globalData.user.uid){
            //作者本人
            //直接生成课程列表
            that.createList();
            //将领取优惠券的状态设为不可领取
            that.setData({
              'baseData.canResiCoupon': 'false',
              'price.payed':true
            })
          }else{
            //非作者本人
            if(that.data.price.price>0&&that.data.price.payed==false){
              //有价钱并且没有支付，获取订阅状态
              that.getSubscribeInfo();
            }else{
              //直接生成课程列表
              that.createList();
              //将领取优惠券的状态设为不可领取
              that.setData({
                'baseData.canResiCoupon':'false'
              })
            }
          }
        }
      }
    })
    //获取专题优惠券
    this.getProductCoupon();
    //获取用户可用优惠券
    this.getMyCoupon();
    setTimeout(function () {
      if(app.globalData.systemInfo){
        that.setData({
          'baseData.containerHeight': ((app.globalData.systemInfo.windowHeight + app.globalData.systemInfo.statusbarHeight + 29))
        })
      }
    },1000)
    //获取当前页面的二维码
    var scene = {
      id: '3'
    };
    scene = encodeURIComponent(JSON.stringify(scene));
    common.request.getPageQrcode({
      data: {
        scene: JSON.stringify(scene),
        page: 'pages/publicity/publicity',
        width: 300,
        'auto_color': true,
        'line_color': { "r": "189", "g": "163", "b": "125" }
      },
      success: function (res) {
        console.log(res);
      }
    })
  },
  //自定义分享
  onShareAppMessage: function (res) {
    var that=this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/publicity/publicity?pid='+that.data.options.pid,
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res);
      }
    }
  },
  // 专题页面相关事件start
  iPagetab: function(e){
    var index = e.target.dataset.datatab;
    this.setData({
      swiperIndex: index
    })
    console.log(index)
  },
  //显示领取优惠券弹层
  showReceiveCoupon: function () {
    this.setData({
      'baseData.rCouponIsShow': '',
      'baseData.couponType': 'receive'
    })
  },
  //隐藏领取优惠券弹层
  hideReceiveCoupon: function () {
    this.setData({
      'baseData.rCouponIsShow': 'hide'
    })
  },
  //切换选择优惠券（选择领取的，选择使用的）
  couponSelect: function (e) {
    var index = e.currentTarget.dataset.index,
      oldIndex = this.data.currentCoupon.index,
      arrayName = 'coupon';
    if (this.data.baseData.couponType == 'use') {
      arrayName = 'myCoupon';
      oldIndex = this.data.useCoupon.index;
    }
    if (index != oldIndex) {
      var cBgImg = arrayName + '[' + index + '].bgImg',
        cOperateIco = arrayName + '[' + index + '].operateIco',
        oldBgImg = arrayName + '[' + oldIndex + '].bgImg',
        oldOperateIco = arrayName + '[' + oldIndex + '].operateIco',
        tempObj = {},
        oldTemp = {},
        that = this;
      tempObj[cBgImg] = this.data.baseData.couponBgActive;
      tempObj[cOperateIco] = this.data.baseData.couponOperateActiveIco;
      oldTemp[oldBgImg] = this.data.baseData.couponBg;
      oldTemp[oldOperateIco] = this.data.baseData.couponOperateIco;
      this.setData(tempObj);
      this.setData(oldTemp);
      if (this.data.baseData.couponType == 'use') {
        this.setData({
          useCoupon: {
            title: that.data.myCoupon[index].name,
            des: that.data.myCoupon[index].detail,
            statrDate: that.data.myCoupon[index].created_time,
            endDate: that.data.myCoupon[index].invalid_time,
            price: that.data.myCoupon[index].amount,
            index: index,
            id: that.data.myCoupon[index].id,
            rule_id: that.data.myCoupon[index].rule_id
          }
        })
      } else {
        this.setData({
          currentCoupon: {
            title: that.data.coupon[index].name,
            des: that.data.coupon[index].detail,
            statrDate: that.data.coupon[index].created_time,
            endDate: that.data.coupon[index].invalid_time,
            price: that.data.coupon[index].amount,
            index: index,
            id: that.data.coupon[index].id,
            type: that.data.coupon[index].type
          }
        })
      }
    }
  },
  //显示分享弹层
  showShare: function (e) {
    // if(this.data.shareInfo.bgImg&&this.data.shareInfo.header){
    this.setData({
      'baseData.canvasIsShow': ''
    })
    if (!this.data.shareInfo.status) {
      this.drowImage();
    }
    // }else{
    //   wx.showToast({
    //     title: '正在准备资源，稍后再试！',
    //     icon:'none'
    //   })
    // }
  },
  //关闭分享弹层
  shareClose: function () {
    this.setData({
      'baseData.canvasIsShow': 'hide'
    })
  },
  drowImage: function (e) {
    var that = this;
    var canvasContext = wx.createCanvasContext('canvasOne', this),
      x = 54,
      y = 30,
      qrx = 71,
      canvasW = 267,
      canvasH = 468,
      qrWidth = 124,
      shadowW = 208,
      shadowH = 368,
      headerW = 58,
      shadowX = 30,
      shadowY = 60,
      headerX = 104.5,
      headerY = shadowY - (headerW / 2),
      nickNameY = 150,
      lastTxt = 250,
      cw = app.globalData.systemInfo.windowWidth,
      ch = app.globalData.systemInfo.windowHeight;
    //根据浏览器的宽高设置canvasW和canvasH
    console.log(app.globalData.systemInfo);
    if (cw < 375) {
      canvasW = 220;
      qrWidth = 100;
      shadowW = 168;
      headerW = 48;
      nickNameY = 120;
      lastTxt = 220;
    } else if (cw >= 414) {
      canvasW = 300;
      qrWidth = 140;
      shadowW = 220;
      nickNameY = 170;
      lastTxt = 265;
    }
    x = (cw - canvasW) / 2;
    qrx = (cw - qrWidth) / 2;
    canvasH = canvasW * 468 / 267;
    shadowH = (shadowW * 368 / 208);
    shadowX = (canvasW - shadowW) / 2;
    shadowY = ((canvasH - shadowH) / 2) + (headerW / 2);
    headerX = (canvasW - headerW) / 2;
    headerY = shadowY - (headerW / 2);
    var qrX = (canvasW - qrWidth) / 2;
    var textCenterX = canvasW / 2;
    //填充背景
    canvasContext.drawImage(that.data.shareInfo.oBgImg, 0, 0, canvasW, canvasH);
    //蒙层
    canvasContext.setFillStyle('rgba(255,255,255,.7)');
    canvasContext.fillRect(shadowX, shadowY, shadowW, shadowH);
    canvasContext.save();
    //填充头像
    canvasContext.setFillStyle('rgb(51,51,51)');
    canvasContext.drawImage(that.data.shareInfo.oHeader, headerX, headerY, headerW, headerW);
    canvasContext.setFontSize(14);
    canvasContext.setTextAlign('center');
    canvasContext.fillText(that.data.shareInfo.nickname, textCenterX, nickNameY);
    canvasContext.fillText('邀你一起学习', textCenterX, nickNameY + 30);
    canvasContext.fillText(that.data.shareInfo.title, textCenterX, nickNameY + 65);
    canvasContext.save();
    //填充二维码
    canvasContext.drawImage(that.data.shareInfo.qrcode, qrX, nickNameY + 90, qrWidth, qrWidth);
    canvasContext.setFillStyle('rgb(74,144,226)');
    canvasContext.fillText('长按识别二维码', textCenterX, nickNameY + lastTxt);

    canvasContext.draw();
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'canvasOne',
        success: function (res) {
          console.log(res.tempFilePath);
          that.setData({
            'shareInfo.shareImg': res.tempFilePath
          })
        }
      }, this)
    }, 2000);
    //生成二维码
    //qrcode.api.draw('345678rtyui','canvasOne',qrx,150);
    this.setData({
      'shareInfo.status': true
    })
    //设置下面一部分的高度

    this.setData({
      'baseData.shareTipHeight': app.globalData.systemInfo.screenHeight-y-canvasH-65
    })
  },
  //获取图片信息
  getImageInfo: function (src, type) {
    var that = this;
    if (src) {
      wx.getImageInfo({
        src: src,
        success: function (res) {
          if (type == 'shareBg') {
            that.setData({
              'shareInfo.bgImg': res.path
            })
            wx.showToast({
              title: '分享背景',
              icon: 'none'
            })
          } else if (type == 'qrcode') {
            that.setData({
              'shareInfo.qrcode': res.path
            })
          } else if (type == 'header') {
            that.setData({
              'shareInfo.header': res.path
            })
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },
  //显示保存图片的选项
  showOperates:function(){
    this.setData({
      'operates.status':''
    })
  },
  hideOperateWrap:function(){
    this.setData({
      'operates.status': 'hide'
    })
  },
  //将图片保存到本地相册
  saveImgToAlbum: function () {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.shareInfo.shareImg,
      success: function (res) {
        wx.showToast({
          title: res
        })
        that.setData({
          'operates.status': 'hide'
        })
      }
    })
  },
  pubPay: function (e) {
    // if(this.data.price.payed==false){
    //   if (this.data.myCoupon.length > 0) {
    //     //显示可用优惠券，供用户选择
    //     this.setData({
    //       'baseData.payAreaShow': ''
    //     })
    //     //设置优惠券切换类型为使用
    //     this.setData({
    //       'baseData.couponType': 'use'
    //     })
    //   } else {
    //     //没有可用优惠券直接支付
    //     this.pubPayHasCoupon();
    //   }
    // }else{
      //看第一个课程
      if (this.data.canSeeCurri.length>0){
        this.showCourse();
        this.productInfo(this.data.canSeeCurri[0].pid || this.data.canSeeCurri[0].courses[0].pid);
      }
    // }
  },
  //有优惠券的支付
  pubPayHasCoupon:function(e){
    var subData = this.getPayObj();
    var that=this;
    common.request.pay({
      data:subData,
      method:'GET',
      success:function(res){
        wx.requestPayment({
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'paySign': res.data.paySign,
          'signType': res.data.signType,
          'timeStamp': res.data.timeStamp,
          success:function(res){
            if (res.errMsg == "requestPayment:ok") {
              wx.showToast({
                title: '支付成功',
                icon: 'none'
              })
              this.onLoad();
            }else{
              wx.showToast({
                title: res.errMsg,
                icon: 'none'
              })
            }
          },
          fail:function(res){
            if (res.errMsg == "requestPayment:fail cancel") {
              wx.showToast({
                title: '取消支付',
                icon: 'none'
              })
            }else{
              wx.showToast({
                title: res.errMsg,
                icon: 'none'
              })
            }
          },
          complete:function(res){
            if (res.errMsg == "requestPayment:fail cancel"){
              wx.showToast({
                title: '取消支付',
                icon:'none'
              })
            }
          }
        })
      }
    })
  },
  //获取支付参数
  getPayObj:function(){
    return {
      'return_url': 'www.baidu.com',
      'pid': this.data.options.pid,
      'subid': 1,
      'subname': 1,
      'pname': this.data.courseInfo.pname ? this.data.courseInfo.pname : '无标题',
      'nums': 1,
      'price': this.data.price.price,
      'discount': 100,
      'code_id': this.data.useCoupon.id || 0,
      'code_amount': this.data.useCoupon.price || 0.00,
      'amount_discount': this.data.price.price,
      'trade_type': 6,
      'uid': app.globalData.user.uid,
      'record_id': this.data.options.record_id || '0',
      'invalid_time': common.fn.getDay(this.data.price.limit)
    }
  },
  //关闭支付弹层
  hidePayArea: function (e) {
    this.setData({
      'baseData.payAreaShow': 'hide'
    })
  },
  //获取专题邀请卡
  getInvite:function(){
    var that=this;
    common.request.getInvite({
      data:{
        ins_uid: that.data.courseInfo.uid,
        pid:that.options.pid
      },
      success:function(res){
        if(res.data.code==1){
          var inviteInfo=res.data.data;
          inviteInfo.sharePrice=0;
          that.setData({
            inviteInfo:inviteInfo
          })
          if (that.data.price.price > 0 && inviteInfo.percent>0){
            //设置了分享佣金比例
            //将图片设置为有奖励的图片
            that.setData({
              'icon.share': that.data.baseData.sharePriceIco
            })
            //计算分享佣金
            var price = that.data.price.price,
              sharePercent = parseFloat(data.pervent),
              sharePrice = 0;
            if (app.globalData.user.uid!=that.data.courseInfo.uid&&sharePrice>0){
              if (that.data.courseInfo['is_cooperate'] == '0') {
                //非合作课程，作者自己承担分享佣金和优惠券金额
                sharePrice = (price * sharePercent / 100).toFixed(2);
              } else {
                //合作课程，平台和作者共同承担分享佣金和优惠券金额
                //此处给出分享的最大金额（不知道购买者会不会使用优惠券）
                sharePrice = (price * sharePercent / 100).toFixed(2);
              }
              that.setData({
                'inviteInfo.sharePrice':sharePrice
              })
            } 
          }
          // console.log(that.data.inviteInfo);
        }
      }
    })
  },
  showCourse:function(e){
    var incourse='',
        that=this;
    var animation=wx.createAnimation({
      duration: 400,
      // timingFunction: "ease"
    });
    var animation1 = wx.createAnimation({
      duration: 400,
      // timingFunction: "ease"
    })
    var animationContainer=wx.createAnimation({
      duration:400,
      // timingFunction: "ease"
    })
    if (this.data.baseData.inCourse == 'true') {
      animation.left('0rpx').step();
      animation1.left('750rpx').step();
      animationContainer.opacity(0).step();
      incourse='false';
    }else{
      animation.left('-750rpx').step();
      animation1.left('0rpx').step();
      incourse = 'true';
    }
    this.setData({
      'animationObj.publicity': animation.export(),
      'animationObj.course': animation1.export()
    })
    if(incourse=='true'){
      that.setData({
        'baseData.inCourse': incourse
      })
    }else{
      this.setData({
        'animationObj.container': animationContainer.export()
      })
    }
    setTimeout(function(){
      //显示列表，隐藏主题内容区域
      if(incourse=='false'){
        that.setData({
          'baseData.inCourse': incourse
        })
        that.setData({
          'baseData.sideTabShow': 'false'
        })
        animationContainer.opacity(1).step();
        that.setData({
          'animationObj.container': animationContainer.export()
        })
      }
    },600);
  },
  //左侧栏的显示于隐藏
  sidetabTarget: function (e) {
    var that=this;
    var animation = wx.createAnimation();
    var animation1 = wx.createAnimation()
    if (this.data.baseData.sideTabShow=='true'){
      //隐藏左侧栏
      animation.left('-750rpx').step({
        duration: 400
      });
      animation1.left('0rpx').step({
        duration: 400
      });
      this.setData({
        'baseData.sideTabShow':'false'
      })
      this.setData({
        'animationObj.publicity': animation.export(),
        'animationObj.course': animation1.export()
      })
    }else{
      //显示左侧栏
      animation.left('-190rpx').step({
        duration: 400
      });
      animation1.left('560rpx').step({
        duration: 400
      });
      that.setData({
        'baseData.sideTabShow': 'true'
      })
      that.setData({
        'animationObj.publicity': animation.export(),
        'animationObj.course': animation1.export()
      })
    }
    
  },
  // 专题页面相关事件end
  emptyEvent: function () {
    //阻止事件冒泡
  },
  //获取单品信息
  productInfo:function(pid){
    var that=this;
    if(pid>0){
      common.request.productInfo1({
        data:{
          pid:pid
        },
        success:function(res){
          if(res.data.code==1){
            var data=res.data.data;
            that.setData({
              dataContent: data
            })
            // console.log(data.json);
            var str1=data.json.replace(/<([\/]?)(p)((:?\s*)(:?[^>]*)(:?\s*))>/ig, '\\n'),
                str2 = str1.replace(/<([\/]?)(div)((:?\s*)(:?[^>]*)(:?\s*))>/ig, '\\n'),
                str3 = str2.replace(/<br\s*\/?>/gi, '\\n');
            // that.setData({
            //   'dataContent.json': JSON.parse(data.json)
            // })
            // var wholeSet = that.data.dataContent.json.wholeSet,
            //   con = that.data.dataContent.json.content,
            //   color = '#333';
            
            // if (that.data.dataContent.pic == '') {
            //   that.setData({
            //     'baseData.background': wholeSet.userTheme
            //   });
            //   color = common.fn.escapeColor(common.fn.hexToRgb(wholeSet.userTheme));
            // } else {
            //   that.setData({
            //     'baseData.background': 'url(' + that.data.dataContent.pic + ') center center / 100% repeat'
            //   });
            // };
            // that.setData({
            //   'baseData.color': color
            // });

            common.fn.pbKeepon({
              that: that,
              res: res
            })
            setTimeout(function(){
              console.log(that.data.options);
            },2000)
          }
        }
      })
    }else{
      wx.showToast({
        title: '获取信息失败',
        icon: 'none'
      })
    }
  },
  //查询订阅状态
  getSubscribeInfo:function(){
    var that=this;
    //type：1=查询当前pid的订阅列表，2=查询当前用户的订阅列表，3=查询该用户对该单品的订阅状态
    common.request.subscribeInfo({
      data:{
        pid:that.data.options.pid,
        type:3
      },
      success:function(res){
        if(res.data.code==1){
          //已经订阅了此专题
          that.setData({
            'price.payed':true,
            'baseData.canResiCoupon': 'false'
          })
        }else{
          //没有订阅此专题
          // if(that.data.coupon.length>0){
            that.canReceiveCoupon();
          // }
        }
        that.createList();
      }
    })
  },
  //获取专题可领取优惠券
  getProductCoupon:function(){
    var that=this;
    common.request.productConpon({
      data:{
        pid:that.data.options.pid
      },
      success:function(res){
        if(res.data.code==1){
          var coupons=res.data.data,
              tempAyyr=[];
          for(var i=0,len=coupons.length;i<len;i++){
            if(coupons[i].num-coupons[i].bind==0){
              //已经领完
              continue;
            }
            coupons[i].created_time = coupons[i].created_time.substr(0,10);
            coupons[i].invalid_time = coupons[i].invalid_time.substr(0, 10);
            coupons[i].amount = common.fn.toDoubleDecimal(coupons[i].amount);

            if(i==len-1){
              coupons[i].operateIco = that.data.baseData.couponOperateActiveIco;
              coupons[i].bgImg = that.data.baseData.couponBgActive;
              //设置默认领取优惠券
              that.setData({
                currentCoupon: {
                  title: coupons[i].name,
                  des: coupons[i].detail,
                  statrDate: coupons[i].created_time,
                  endDate: coupons[i].invalid_time,
                  price: coupons[i].amount,
                  index: 0,
                  id: coupons[i].id,
                  type: coupons[i].type
                }
              })
            }else{
              coupons[i].operateIco = that.data.baseData.couponOperateIco;
              coupons[i].bgImg = that.data.baseData.couponBg;
            }
            tempAyyr.push(coupons[i]);
          }
          that.setData({
            'coupon':tempAyyr.reverse()
          })
        }else{
          that.setData({
            'baseData.canResiCoupon':'false'
          })
          console.log(res.data.msg);
        }
      }
    })
  },
  //获取用户可用优惠券
  getMyCoupon:function(){
    var that=this;
    common.request.myCoupon({
      data:{
        pid:that.data.options.pid
      },
      success:function(res){
        if(res.data.code==1){
          var coupons=res.data.data,
            tempAyyr=[];
            console.log(res);
          for (var i = 0, len = coupons.length; i < len; i++) {
            if ((new Date(coupons[i].invalid_time).getTime()) <= (new Date().getTime())) {
              //优惠券已经过期
              continue;
            }
            coupons[i].created_time = coupons[i].created_time.substr(0, 10);
            coupons[i].invalid_time = coupons[i].invalid_time.substr(0, 10);
            coupons[i].amount = common.fn.toDoubleDecimal(coupons[i].amount);

            if (i == 0) {
              coupons[i].operateIco = that.data.baseData.couponOperateActiveIco;
              coupons[i].bgImg = that.data.baseData.couponBgActive;
              //设置默认使用的优惠券
              that.setData({
                useCoupon: {
                  title: coupons[i].name,
                  des: coupons[i].detail,
                  statrDate: coupons[i].created_time,
                  endDate: coupons[i].invalid_time,
                  price: coupons[i].amount,
                  index: 0,
                  id: coupons[i].id,
                  rule_id: coupons[i].rule_id
                }
              })
            } else {
              coupons[i].operateIco = that.data.baseData.couponOperateIco;
              coupons[i].bgImg = that.data.baseData.couponBg;
            }
            tempAyyr.push(coupons[i]);
          }
          that.setData({
            'myCoupon': tempAyyr
          })
        }else{
          console.log(res.data.msg)
        }
      }
    })
  },
  //生成左侧列表
  createList:function(){
    var courseList = this.data.curriculums,
      newList = [],
      lastChapterIndex = -1;//最后一个有分段标题的列表
      for (var j = 0, len1 = courseList.length; j < len1; j++) {
        // var temp={}
        if (courseList[j].className.indexOf('curriculumTxt') >= 0) {
          var temp = {
            titleInfo: courseList[j],
            courses: [],
            // listHeight:0,
            slideAnimation:{},
            opened:'false'
          }
          newList.push(temp);
          lastChapterIndex = newList.length - 1;
        } else {
          courseList[j].bgColor='#fff'
          // if (this.data.price.payed == false) {
          //   if (courseList[j].look == 'false') {
          //     continue;
          //   }
          //   if (courseList[j].release == 'false') {
          //     continue;
          //   }
          // }
          // if (courseList[j].look == 'false' && courseList[j].release == 'false') {
          //   continue;
          // }
          if (lastChapterIndex >= 0) {
            newList[lastChapterIndex].courses.push(courseList[j]);
            if (newList[lastChapterIndex].titleInfo.pname){
              newList[lastChapterIndex].listHeight = 0;
            }
          } else {
            newList.push(courseList[j]);
            lastChapterIndex = newList.length - 1;
          }
        }
      }
      this.setData({
        'canSeeCurri': newList
      })
  },
  //展开分段标题
  showSubList:function(e){
    var cOptions=e.currentTarget.dataset,
      that=this,
      animation=wx.createAnimation(),
      itemH = this.data.baseData.curriculumItemH,
      currHeigth = this.data.canSeeCurri[cOptions.index].courses.length * itemH,
      key = 'canSeeCurri[' + cOptions.index +'].opened',
      animationKey = 'canSeeCurri[' + cOptions.index + '].slideAnimation',
      tempObj={},
      tempObjA={};
    //只做当前的展开和收起
    if (this.data.canSeeCurri[cOptions.index].opened=='false'){
      //执行展开
      animation.height(currHeigth*2+'rpx').step(400);
      tempObjA[animationKey] = animation.export();
      this.setData(tempObjA)
      setTimeout(function(){
        tempObj[key] = 'true';
        that.setData(tempObj);
      },400)
    }else{
      //执行收起
      animation.height('0rpx').step(400);
      tempObjA[animationKey] = animation.export();
      this.setData(tempObjA)
      setTimeout(function () {
        tempObj[key] = 'false';
        that.setData(tempObj);
      },400)
    }
  },
  //课程切换
  switchCourse:function(e){
    var pid="";
    if(e.pid){
      pid=e.pid;
    }else{
      pid = e.currentTarget.dataset.pid;
    }
    if(pid>0){
      this.setData({
        'options.pbKeeponIndex': 0
      })
      if(e.pid){
        this.showCourse();
      } else {
        this.sidetabTarget();
      }
      this.productInfo(pid);
    }
  },
  //领取优惠券
  receiveCoupon:function(e){
    if (this.data.baseData.canResiCoupon=='true'){
      var that=this;
      common.request.receiveCoupon({
        data:{
          ins_uid: that.data.courseInfo.uid,//专题的作者id
          pid:that.data.options.pid,
          type: that.data.currentCoupon.type,
          rule_id: that.data.currentCoupon.id
        },
        success:function(res){
          if(res.data.code==1){
            that.hideReceiveCoupon();
            wx.showToast({
              title: '领取成功'
            })
            that.getMyCoupon();
            that.getProductCoupon();
          }else{
            wx.showToast({
              title: res.data.msg||'领取失败',
              icon:'none'
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '当前账号不可领取该课程的优惠券',
        icon:'none'
      })
    }
  },
  //查询当前用户是否可以领取优惠券
  canReceiveCoupon:function(){
    var that=this;
    common.request.canReceiveCoupon({
      data:{
        'use_pid':that.data.options.pid
      },
      success:function(res){
        if(res.code==-1){
          that.setData({
            'baseData.canResiCoupon': 'false'
          })
        }
      }
    })
  },
  continueNext: function (e) {
    var obj = {};
    obj.e = e;
    obj.that = this
    pbKeepon.continueNext(obj)
  }
})
