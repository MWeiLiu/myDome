//logs.js
const common = require('../../utils/common/common.js');
const paragraph = require('../../utils/pureText/paragraph/paragraph.js');

Page({
  data: {
    background: '',
    color: '',
    pname: '小程序样式的花样儿小程序样式的花样儿',
    price: '2.0000',
    json:{
      "wholeSet": {
        "header": {
          "headerON": 0,
          "headerList": [
            {
              "userImg": "https://www.qcourse.com/uploads/users/icons//5a6abfe8bc554.png",
              "userName": "刘威",
              "backgroundP": "",
              "backgroundS": "",
              "orignalSrc": "",
              "zoomRatio": ""
            }
          ]
        },
        "userLogo": "",
        "userTheme": "#5e5e5e",
        "summary": "小程序样式的花样儿小程序样式的花样儿小程序样式的花样儿",
        "subTitle": "小程序样式的花样儿小程序样式的花样儿小程序样式的"
      },
      "content": [{
          "dataType": "ptOnlyText",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "text": "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例"
          }
        },
        {
          "dataType": "ptTextTitle",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "title": "小程序样式示例",
            "text": "小程序样式示例",
            "backImg": "none"
          }
        },
        {
          "dataType": "ptStageTitle",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "title": "小程序样式示例",
            "text": "小程序样式示例",
            "backImg": "none"
          }
        },
        {
          "dataType": "ptOnlyTitle",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "title": "小程序样式示例",
            "backImg": "none"
          }
        },
        {
          "dataType": "ptOnlyStageTitle",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "title": "小程序样式示例",
            "backImg": "none"
          }
        },
        {
          "dataType": "ptDoubleCol",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "textContentLeft": "小程序样式示例",
            "textContentRight": "小程序样式示例"
          }
        },
        {
          "dataType": "creativeQuoteOne",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "headerImg": {
              "id": "creativeTitle_1"
            },
            "text": {
              "margin": "0px",
              "textHtml": "",
              "textAlign": "center"
            },
            "userName": {
              "margin": "0px",
              "textHtml": "喀秋莎",
              "textAlign": "center",
              "color": "rgb(107, 143, 179)"
            },
            "guide": {
              "guide": false
            }
          }
        },
        {
          "dataType": "creativeQuoteTwo",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "headerImg": {
              "id": "creativeTitle_2",
              "borderRadius": "50%",
              "imgSrc": "https://www.qcourse.com/images/editorHeaderImg1.0.png",
              "orignalSrc": "https://www.qcourse.com/images/editorHeaderImg1.0.png",
              "margin": "0px 20px 0px 0px",
              "Float": "left",
              "width": "112px",
              "height": "150px"
            },
            "text": {
              "textHtml": "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
              "textAlign": "justify"
            },
            "userName": {
              "textHtml": "喀秋莎",
              "textAlign": "center",
              "color": "rgb(107, 143, 179)"
            },
            "guide": {
              "guide": false
            }
          }
        },
        {
          "dataType": "creativeTitTxtGroup",
          "backgroundColor": "url('https: //www.qcourse.com/images/pictureBack1.0.png')",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "headerImg": {
              "id": "creativeTitle_3",
              "borderRadius": "50%",
              "margin": "0px 20px 0px 0px",
              "imgSrc": "https://www.qcourse.com/images/editorHeaderImg1.0.png",
              "orignalSrc": "https://www.qcourse.com/images/editorHeaderImg1.0.png",
              "Float": "left",
              "width": "112px",
              "height": "150px"
            },
            "text": {
              "textHtml": "小程序样式示例",
              "textAlign": "justify",
              "color": "rgb(255, 255, 255)"
            },
            "userName": {
              "textHtml": "喀秋莎",
              "textAlign": "center",
              "color": "rgb(204, 230, 255)"
            },
            "guide": {
              "guide": false
            }
          }
        },
        {
          "dataType": "creativeDeclareTwo",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "headerImg": {
              "id": "creativeTitle_5"
            },
            "text": {
              "margin": "0px",
              "textHtml": "小程序样式示例",
              "textAlign": "justify"
            },
            "guide": {
              "guide": true,
              "margin": "0px 348.509px 10px 348.494px",
              "width": "104px",
              "height": "2px",
              "position": "static"
            }
          }
        },
        {
          "dataType": "creativeDeclareThre",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "headerImg": {
              "id": "creativeTitle_8"
            },
            "text": {
              "margin": "0px",
              "textHtml": "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
              "textAlign": "justify"
            },
            "guide": {
              "guide": true
            }
          }
        },
        {
          "dataType": "creativeDeclareThre",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "headerImg": {
              "id": "creativeTitle_6"
            },
            "text": {
              "margin": "0px",
              "textHtml": "小程序样式示例",
              "textAlign": "justify"
            },
            "guide": {
              "guide": true
            }
          }
        },
        {
          "dataType": "creativeError",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "headerImg": {
              "id": "creativeTitle_7",
              "imgSrc": "https://www.qcourse.com/images/creativeError.png",
              "width": "20px",
              "height": "20px"
            },
            "text": {
              "textHtml": "小程序样式示例",
              "color": "rgb(249, 89, 58)",
              "margin": "0px"
            },
            "guide": {
              "guide": false
            }
          }
        },
        {
          "dataType": "seqNumList",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "textLi": {
              "text": "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
              "duration": "00:00",
              "audioTheme": "https://www.qcourse.com/uploads/users/icons//5a6abfe8bc554.png"
            }
          }
        },
        {
          "dataType": "mmVideo",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "video": "",
            "text": "",
            "duration": "00:00",
            "poster": "",
            "type": 1,
            "vid": "",
            "polyvVid": ""
          }
        },
        {
          "dataType": "mmAttachment",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "attachment": "",
            "text": "还没有添加附件",
            "size": null
          }
        },
        {
          "dataType": "mmCode",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "text": "程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例"
          }
        },
        {
          "dataType": "iAccordion",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "items": [{
                "title": "拥抱发现",
                "text": "每一个创造性的努力需要你承担风险。如果你尝试不成功，你还是学到了一些东西。",
                "img": "https://www.qcourse.com/images/interactionBg.png"
              },
              {
                "title": "获得洞察力",
                "text": "每一个创造性的努力需要你承担风险。如果你尝试不成功，你还是学到了一些东西。",
                "img": "https://www.qcourse.com/images/interactionBg.png"
              },
              {
                "title": "是他真实",
                "text": "每一个创造性的努力需要你承担风险。如果你尝试不成功，你还是学到了一些东西。",
                "img": "https://www.qcourse.com/images/interactionBg.png"
              }
            ]
          }
        },
        {
          "dataType": "iPagetab",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "items": [{
                "title": "程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "text": "每一个创造性的努力需要你承担风险。如果你尝试不成功，你还是学到了一些东西。",
                "img": "https://www.qcourse.com/images/interactionBg.png"
              },
              {
                "title": "程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "text": "每一个创造性的努力需要你承担风险。如果你尝试不成功，你还是学到了一些东西。",
                "img": "https://www.qcourse.com/images/interactionBg.png"
              },
              {
                "title": "程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "text": "",
                "img": "https://www.qcourse.com/images/interactionBg.png"
              }
            ]
          }
        },
        {
          "dataType": "iPageturning",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "items": [{
                "face": {
                  "type": "text",
                  "text": "程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                  "img": ""
                },
                "back": {
                  "type": "text",
                  "text": "",
                  "img": ""
                }
              },
              {
                "face": {
                  "type": "text",
                  "text": "程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                  "img": ""
                },
                "back": {
                  "type": "text",
                  "text": "",
                  "img": ""
                }
              },
              {
                "face": {
                  "type": "text",
                  "text": "程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                  "img": ""
                },
                "back": {
                  "type": "text",
                  "text": "",
                  "img": ""
                }
              }
            ]
          }
        },
        {
          "dataType": "iQuizzes",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "items": [{
                "type": "judge",
                "typeName": "判断",
                "question": "程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "analysis": "程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "answerIndex": "0",
                "answerItems": [
                  "对",
                  "错"
                ]
              },
              {
                "type": "multiselect",
                "typeName": "多选",
                "question": "习近平同志在欧美同学会成立100周年庆祝大会上的讲话中说：“希望广大留学人员继承和发扬留学报国的关荣传统，做爱国主义的坚守者和传播者，秉持„先天下之忧而忧，后天下之乐而乐‟的人生理想，始终把国家富强，民族振兴，人民幸福作为努力志向，自居使个人成功的果实结在爱国主义这棵常青树上。”个人成功的果实之所以应该结在爱国主义这棵常青树上，是以为内爱国主义是？",
                "analysis": "",
                "answerIndex": "0",
                "answerItems": [
                  "个人实现人生价值的力量源泉",
                  "个人实现人生价值的直接条件",
                  "个人成功的根本保障",
                  "个人成功的决定性因素"
                ]
              },
              {
                "type": "select",
                "typeName": "单选",
                "question": "习近平同志在欧美同学会成立100周年庆祝大会上的讲话中说：“希望广大留学人员继承和发扬留学报国的关荣传统，做爱国主义的坚守者和传播者，秉持„先天下之忧而忧，后天下之乐而乐‟的人生理想，始终把国家富强，民族振兴，人民幸福作为努力志向，自居使个人成功的果实结在爱国主义这棵常青树上。”个人成功的果实之所以应该结在爱国主义这棵常青树上，是以为内爱国主义是？",
                "analysis": "",
                "answerIndex": "0",
                "answerItems": [
                  "物理学是一种与化学相关的学科，是研究物体化学变化及特性的科学课程。",
                  "物理学研究探索分析宇宙发生的现象，但不用了解其规则。",
                  "物理学是关于大自然规律的知识。",
                  "注重于研究物质、能量、空间、时间，尤其是它们各自的性质与彼此之间的相互关系。"
                ]
              }
            ]
          }
        },
        {
          "dataType": "pbKeepon",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "text": "继续",
            "textSelect": "pbContinueNext"
          }
        },
        {
          "dataType": "pbAward",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "text": "您的支持是作者最大的动力",
            "rewardImg": "https://www.qcourse.com/images/grant.png"
          }
        },
        {
          "dataType": "pbPayOff",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "text": "支付2元",
            "payMoney": "2",
            "pbPayId": "pbPayment_1"
          }
        },
        {
          "dataType": "pbSplitter",
          "backgroundColor": "rgb(255, 255, 255)",
          "marginTop": "20px",
          "marginBottom": "20px",
          "themeColorBoardLists": "#5e5e5e",
          "content": {
            "linewidth": 800,
            "lineheight": 1,
            "linecolor": "rgb(221, 221, 221)"
          }
        }
      ],
      "price": [{
          "subid": "1",
          "price": "2",
          "discount": 100,
          "typeName": "pay"
        },
        {
          "subid": -1,
          "discount": 100,
          "typeName": "rewardRandom"
        }
      ]
    },
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
    var that = this,
        wholeSet = this.data.json.wholeSet,
        color = ''
    if(wholeSet.userLogo == ''){
      this.setData({
        background: wholeSet.userTheme
      });
    } else {
      this.setData({
        background: 'url(' + wholeSet.userLogo + ') center center / 100% no-repeat'
      });
    };
    color = common.fn.escapeColor(common.fn.hexToRgb(wholeSet.userTheme))
    this.setData({
      color: color
    });
    
    
  },
  bindParagraph: function(){
    paragraph.paragraph()
  },
  onReady: function(){
    this.dialog = this.selectComponent("#tab");
  },



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
