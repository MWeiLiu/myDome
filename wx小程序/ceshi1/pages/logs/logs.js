//logs.js
const common = require('../../utils/common/common.js');

Page({
  data: {
    baseData: {
      background: '',
      color: '',
      logoWidth: '124',
      logoHeigh: '82',
      indicatorDotsTrue: true,
      indicatorColor: '#f3f4f5',
      indicatorActiveColor: '#333',
      duration: '500'
    },
    dataContent: {
      pname: '小程序样式的花样儿小程序样式的花样儿',
      price: '2.0000',
      pic: '',
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
          "userLogo": "https://www.qcourse.com/uploads/products/2778/5a9ce3caa928c.jpeg",
          "userTheme": "#5e5e5e",
          "summary": "小程序样式的花样儿小程序样式的花样儿程小序样式的花样儿",
          "subTitle": "小程序样式的花样儿小程序样式的花样儿小程序样式的"
        },
        "content": [
          {
            "dataType": "creativeQuoteOne",
            "backgroundColor": "rgb(0, 255, 255)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "headerImg": {
                "id": "creativeTitle_1"
              },
              "text": {
                "margin": "0px",
                "textHtml": "小程序样式示例1小程序样式示例2小程序样式示例1小程序样式示例2",
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
            "backgroundColor": "rgb(255, 0, 255)",
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
            "backgroundColor": "url('https://www.qcourse.com/images/pictureBack1.0.png')",
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
                "textHtml": "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
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
            "backgroundColor": "rgb(255, 255, 0)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "headerImg": {
                "id": "creativeTitle_5"
              },
              "text": {
                "margin": "0px",
                "textHtml": "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
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
            "dataType": "ptOnlyText",
            "backgroundColor": "rgb(0, 255, 255)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "text": "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例"
            }
          },
          {
            "dataType": "ptTextTitle",
            "backgroundColor": "rgb(255, 0, 255)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "title": "小程序样式示例",
              "text": "小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
              "backImg": "none"
            }
          },
          {
            "dataType": "ptStageTitle",
            "backgroundColor": "rgb(255, 56, 0)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "title": "小程序样式示例",
              "text": "小程序样式示例小程序样式示例小程序样式搜索示例小程序样式示例",
              "backImg": "none"
            }
          },
          {
            "dataType": "ptOnlyTitle",
            "backgroundColor": "rgb(0, 255, 255)",
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
            "backgroundColor": "rgb(255, 0, 255)",
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
            "backgroundColor": "rgb(255, 255, 0)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "textContentLeft": "小程序样式示例1",
              "textContentRight": "小程序样式示例2"
            }
          },
          {
            "dataType": "creativeDeclareThre",
            "backgroundColor": "rgb(69, 255, 255)",
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
            "dataType": "creativeDeclareOne",
            "backgroundColor": "rgb(255, 98, 255)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "headerImg": {
                "id": "creativeTitle_6"
              },
              "text": {
                "margin": "0px",
                "textHtml": "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "textAlign": "justify"
              },
              "guide": {
                "guide": true
              }
            }
          },
          {
            "dataType": "creativeError",
            "backgroundColor": "rgb(255, 59, 255)",
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
                "textHtml": "小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
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
            "backgroundColor": "rgb(90, 255, 255)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "textLi": [
                "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例"
              ]
            }
          },
          {
            "dataType": "seqCheckBoxList",
            "backgroundColor": "rgb(4, 255, 2)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "textLi": [
                "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例"
              ]
            }
          },
          {
            "dataType": "seqSymList",
            "backgroundColor": "rgb(90, 6, 255)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "textLi": [
                "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例",
                "小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例"
              ]
            }
          },
          {
            "dataType": "pictrueSingle",
            "backgroundColor": "rgb(90, 69, 10)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "item": [
                {
                  backImg: {
                    imgSrc: 'https://www.qcourse.cc/images/pictrue.jpg'
                  },
                  label: {
                    textHtml: '小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例'
                  }
                  
                }
              ]
            }
          },
          {
            "dataType": "pictrueDouble",
            "backgroundColor": "rgb(30, 63, 1)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "item": [
                {
                  backImg: {
                    imgSrc: 'https://www.qcourse.cc/images/pictrue.jpg'
                  },
                  label: {
                    textHtml: '小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例'
                  }
                  
                },
                {
                  backImg: {
                    imgSrc: 'https://www.qcourse.cc/images/pictrue.jpg'
                  },
                  label: {
                    textHtml: '小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例'
                  }
                  
                }
              ]
            }
          },
          {
            "dataType": "pictrueTxtGroupOne",
            "backgroundColor": "rgb(90, 6, 100)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
                backImg: {
                  imgSrc: 'https://www.qcourse.com/images/pictrue.jpg'
                },
                text: {
                  textHtml: '小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例'
                }
            }
          },
          {
            "dataType": "pictrueTxtGroupTwo",
            "backgroundColor": "rgb(90, 255, 100)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
                backImg: {
                  imgSrc: 'https://www.qcourse.com/images/pictureBack.jpg'
                },
                text: {
                  textHtml: '小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例小程序样式示例'
                }
            }
          },
          {
            "dataType": "pictrueTurntable",
            "backgroundColor": "rgb(90, 255, 100)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              slide: [
                {
                  backImg: {
                    imgSrc: 'https://www.qcourse.com/images/pictrueSingle.png'
                  }
                },
                {
                  backImg: {
                    imgSrc: 'https://www.qcourse.com/images/pictrue.jpg'
                  }
                },
                {
                  backImg: {
                    imgSrc: 'https://www.qcourse.com/images/pictrueSingle.png'
                  }
                }
              ]
            }
          },
          {
            "dataType": "mmAudio",
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
            "backgroundColor": "rgb(0, 255, 255)",
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
            "backgroundColor": "rgb(255, 0, 5)",
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
            "backgroundColor": "rgb(255, 0, 255)",
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
      }
    }
  },
  onLoad: function () {
    var that = this,
        wholeSet = this.data.dataContent.json.wholeSet,
        color = '#333';
    if(that.data.dataContent.pic == ''){
      this.setData({
        'baseData.background': wholeSet.userTheme
      });
      color = common.fn.escapeColor(common.fn.hexToRgb(wholeSet.userTheme));
    } else {
      this.setData({ 
        'baseData.background': 'url(' + that.data.dataContent.pic + ') center center / 100% repeat'
      });
    };
    this.setData({
      'baseData.color': color
    });
    // this.imageSize();
    
  },
  onReady: function(){
    this.dialog = this.selectComponent("#tab");
  }
  // imageSize: function(e){
  //   console.log(e)
  //   var imageWidth = e.detail.width,
  //       imageHeight = e.detail.height;
  //   console.log(this)
  //   if(imageHeight >= 82){
  //     this.setData({
  //       'baseData.logoHeight': 82
  //     });
  //   }
  // }
})
