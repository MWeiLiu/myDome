// var getApp = getApp();
var common = {
    rootUrl: 'https://www.qcourse.com',
    token: 'NDk5Nzc3NMYyZjAwNwYzNTRJMTNlNgJjNmFkZWIyYzM',
    reg: {
        colorHexReg: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    },
    request: {
        requestData: function (options){
            wx.request({
                url: options.url,
                data: options.data || {},
                header: {
                  'QCTKA': common.token,
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: options.method || 'POST',
                dataType: 'json',
                success: options.success,
                fail: options.fail || function(){
                  console.log('接口出错：'+options.url);
                },
            })
        },
        productInfo:function(options){
          options.url = common.rootUrl + '/user/product-info';
          this.requestData(options);
        },
        productInfoNolgin: function(options){
            options.url = common.rootUrl + '/user/product-info-nologin';
            this.requestData(options);
        },
        productInfo1: function(options){
          options.url = common.rootUrl + '/user/product-info-to-special';
          this.requestData(options);
        },
        accessToken:function(options){
          options.url = common.rootUrl + '/weixin/get-token-to-x';
          this.requestData(options);
        },
        //获取分享页面二维码
        getPageQrcode:function(options){
          options.url = common.rootUrl + '/weixin/get-qrcode-to-x';
          this.requestData(options);
        },
        login:function(options){
          options.url = 'https://api.qcourse.com/mini_login';
          this.requestData(options);
        },
        //获取专题订阅状态
        subscribeInfo:function(options){
          options.url = common.rootUrl + '/user/product-snum';
          this.requestData(options);
        },
        //查询是否可以领取优惠券
        canReceiveCoupon:function(options){
          options.url = common.rootUrl + '/member/get-user-code-num';
          this.requestData(options);
        },
        //获取作品可领取优惠券
        productConpon:function(options){
          options.url = common.rootUrl + '/member/get-rules';
          this.requestData(options);
        },
        //获取自己的可用优惠券
        myCoupon:function(options){
          options.url = common.rootUrl + '/member/get-use-code';
          this.requestData(options);
        },
        //领取优惠券
        receiveCoupon:function(options){
          options.url = common.rootUrl + '/member/get-code-no';
          this.requestData(options);
        },
        //支付
        pay:function(options){
          options.url =  'https://api.qcourse.com/pay';
          this.requestData(options);
        },
        //获取token
        getToken: function (options) {
          options.url = 'https://www.qcourse.com/weixin/weixin-mini-login';
          this.requestData(options);
        },
        //获取某个专题的邀请卡
        getInvite:function(options){
          options.url = common.rootUrl + '/user/get-invite-code-by-pid';
          this.requestData(options);
        },
        //获取我的邀请卡
        getMyInvite:function(options){
          options.url = common.rootUrl + '/user/obtain-invite-card';
          this.requestData(options);
        },
        //获取订单信息
        getOrder:function(options){
          options.url = common.rootUrl + '/user/product-order';
          this.requestData(options);
        }
    },
    fn: {
        //color 16进制转rgb
        hexToRgb: function (sColor){
            if(sColor && common.reg.colorHexReg.test(sColor)){
                if(sColor.length === 4){
                    var sColorNew = "#";
                    for(var i = 1; i < 4; i+=1){
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1)); 
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for(var i = 1; i < 7; i+=2){
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }
                return "rgb(" + sColorChange.join(",") + ")";
            }else{
                return sColor;
            }
        },
        //判断色值127
        escapeColor: function (rgb){
            var rgb = rgb.split('rgb(')[1].split(')')[0].split(','),
                r = parseInt(rgb[0]),
                g = parseInt(rgb[1]),
                b = parseInt(rgb[2]),
                sum = (r + g + b) / 3,
                color = '';

            if(sum >= 127){
                color = '#333';
            }else{
                color = '#fff';
            }
            return color;
        },
        //保留两位小数
        toDoubleDecimal(num){
          var p = num.split('.'), price;
          if (p.length == 1) {
            return num + '.00';
          } else if (p.length == 2) {
            if (p[1].length > 1) {
              return num
            } else {
              return num + '0';
            }
          }
        },
        //获取时间格式 分:秒
        getTimeString: function (duration) {
          duration = Math.ceil(duration);
          var m = Math.floor(duration / 60);
          var s = duration % 60;
          if (s < 10) s = '0' + s;
          if (duration < 60) return '00:' + s;
          if (m < 10) m = '0' + m;
          return m + ':' + s;
        },
        //获取订阅天数
        getDay:function(index){
          if (index == 0) {
            return 30;
          } else if (index == 1) {
            return 90;
          } else if (index == 2) {
            return 182;
          } else if (index == 3) {
            return 365;
          } else if (index == 4) {
            return 730;
          } else {
            //没有设置年限，默认为1年
            return 365
          }
        },
        pbKeepon: function(obj){

          var res = obj.res,
              that = obj.that,
              json = JSON.parse(res.data.data.json),
              replaceNumber = '',
              pbKeeponList = [],
              p = 1,
              pbKeeponBool = true,
              pbKeeponFirst = [];
          console.log(json);
          for (var i = 0; i < json.content.length; i++){
            var jsoni = json.content[i],
                obj = {},
                jsonContent = 'dataContent.json.content[' + i + '].replaceNumber',
                pbKeeponArry = [];
                
            if(jsoni.dataType == 'title'){
              replaceNumber = jsoni.content.replaceClass.substr(-1);
              obj[jsonContent] = replaceNumber
              that.setData(obj)
            }
            
            if(pbKeeponBool){
              pbKeeponFirst.push(jsoni);
            }

            if(jsoni.dataType == 'pbKeepon' || jsoni.dataType == 'pbPayOff'){
              pbKeeponBool = false;
              for(var j = i + 1; j < json.content.length; j++){
                pbKeeponArry.push(json.content[j]);
                if(json.content[j].dataType != 'pbKeepon' && json.content[j].dataType != 'pbPayOff'){
                  i++;
                }else{
                  if (json.content[j].dataType == 'pbPayOff'){
                    var orderData=that.data.orderData,
                          pbPayId=parseInt(json.content[j].content.pbPayId.split('_')[1]);
                    if (orderData.length>0&&orderData.contains(pbPayId)){
                      //已经支付完成
                      continue;
                    }else{
                      pbKeeponList[p] = pbKeeponArry;
                      p++;
                      break;
                    }
                  }else{
                    pbKeeponList[p] = pbKeeponArry;
                    p++;
                    break;
                  }
                }
              }
            }

            if(json.content.length - 1 == i){
              pbKeeponList[p] = pbKeeponArry;
            }
          }
          pbKeeponList[0] = pbKeeponFirst;
          that.setData({
            dataContent: res.data.data
          })


          that.setData({
            'dataContent.json': json,
            'dataContent.json.pbKeeponArray': pbKeeponList,
          })
          that.setData({
            'dataContent.json.dataList': pbKeeponFirst
          })
        }
    },
    typeSetting:{
      ptOnlyTitle:[
        'title'
      ],
      ptStageTitle:[
        'title',
        'text'
      ],
      ptOnlyStageTitle:[
        'title'
      ],
      pictrueSingle:[
        'item',
        'label.textHtml'
      ],
      iPageturning:[
        'item',
        'text'
      ]
    }
}

module.exports = common;