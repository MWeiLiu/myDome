//logs.js
const common = require('../../utils/common/common.js');
// const iAccordion = require('../../utils/Interaction/iAccordion/iAccordion.js');
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
      duration: '500',
      iAccordion: {
        iAccordionAnimate: ''
      }
    },
    dataContent: {
      pname: '投资人喜欢你吗投资人喜欢你吗',
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
          "subTitle": "采一点晨曦，装点一天的清新，捧一把阳光，温暖一季的心情"
        },
        "content": [
          {
            "dataType": "iAccordion",
            "backgroundColor": "rgb(255, 90, 255)",
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
                "textHtml": "本课程以视频小课为线索，配文字、图片、图表等深刻解析互联网的核其发展路径，在此基础上预测未来商业的三大变革",
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
          },{
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
                "textHtml": "本课程以视频小课为线，配文字、图片、图表等深刻解析互联网的核其发展路径，在此基础上预测未来商业的三大变革商业的三大变革商本课程以视频小课为线，配文字、图片、图表等深刻解析互联网的核其发展路径，在此基础上预测未来商业的三大变革商业的三大变革商",
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
          },{
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
                "textHtml": "本课程以视频小课为线，配文字、图片、图表等深刻解析互联网的核其发展路径，在此基础上预测未来商业的三大变革商业的三大变革商",
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
                "textHtml": "本课程以视频小课为线，配文字、图片、图表等深刻解析互联网的核其发展路径，在此基础上预测未来商业的三大变革商业的三大变革商",
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
            "backgroundColor": "rgb(69, 56, 255)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "headerImg": {
                "id": "creativeTitle_8"
              },
              "text": {
                "margin": "0px",
                "textHtml": "本课程以视频小课为线，配文字、图片、图表等深刻解析互联网的核其发展路径，在此基础上预测未来商业的三大变革商业的三大变革商",
                "textAlign": "justify"
              },
              "guide": {
                "guide": true
              }
            }
          },
          {
            "dataType": "creativeError",
            "backgroundColor": "rgb(5, 59, 1)",
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
                "textHtml": "本课程以视频小课为线，配文字、图片、图表等深刻解析互联网的核其发展路径，在此基础上预测未来商业的三大变革商业的三大变革商",
                "color": "rgb(249, 89, 58)",
                "margin": "0px"
              },
              "guide": {
                "guide": false
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
              "text": "本课程以视频小课为线索，配有文字、图片、图表等深刻解析互联网的核心及其发展路径，在此基础上预测未来商业的三大变革，即物联网时代、大数据时代以及机器智能，深入讨论了云计算、云和端、机器智能、企业DNA及发展方向、传统企业线上化等问题。"
            }
          },
          {
            "dataType": "ptTextTitle",
            "backgroundColor": "rgb(255, 0, 255)",
            "marginTop": "20px",
            "marginBottom": "20px",
            "themeColorBoardLists": "#5e5e5e",
            "content": {
              "title": "大数据时代对交易策略的研发提出了几大要求",
              "text": "本课程以视频小课为线索，配有文字、图片、图表等深刻解析互联网的核心及其发展路径，在此基础上预测未来商业的三大变革，即物联网时代、大数据时代以及机器智能，深入讨论了云计算、云和端、机器智能、企业DNA及发展方向、传统企业线上化等问题。教授曾鸣是阿里专职思考未来的人，听听他的想法，掂掂他预判未来的逻辑，可以在臧否反思之中升级认知，在思维碰撞下获益良多。欢迎你来，看看未来。",
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
              "title": "大数据时代对交易策略的研发提出了几大要求",
              "text": "本课程以视频小课为线索，配有文字、图片、图表等深刻解析互联网的核心及其发展路径，在此基础上预测未来商业的三大变革，即物联网时代、大数据时代以及机器智能，深入讨论了云计算、云和端、机器智能、企业DNA及发展方向、传统企业线上化等问题。教授曾鸣是阿里专职思考未来的人，听听他的想法，掂掂他预判未来的逻辑，可以在臧否反思之中升级认知，在思维碰撞下获益良多。欢迎你来，看看未来。",
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
              "title": "大数据时代对交易策略的研发提出了几大要求",
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
              "title": "大数据时代对交易策略的研发提出了几大要求",
              "backImg": "none"
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
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度",
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度",
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度",
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度"
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
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度",
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度",
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度",
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度"
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
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度",
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度",
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度",
                "在网易邮箱大师设计团队内部中，为了避免设计师反复出现类似的问题，设计组会要求一些流程结果的可视化输出，如：我们将设计分析的常用方法整理形成模板",
                "熟悉基本的设计工作后，设计师便不应该始终处在功能体验优化的工作舒适圈中，而要更系统的关注产品和团队",
                "主动运用自己的专业能力，推动产品项目更快更好的发展，逐渐具备发现问题和机会的洞察力与敏感度"
              ]
            }
          },
        ]
      }
    }
  },
  onLoad: function () {
    // common.request.productInfo({
    //   data: {
    //     pid: '2226'
    //   },
    //   success: function(res){
    //     console.log(res)
    //   }
    // });
    var that = this,
        wholeSet = this.data.dataContent.json.wholeSet,
        con = this.data.dataContent.json.content,
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
    console.log(this)
    // for(var i = 0; i < con.length; i++){
    //   var dataType = con[i].dataType;
    //   if(dataType == 'iAccordion'){
    //     //折叠栏
    //     for(var iAcci = 0; iAcci < con[i].content.items.length; iAcci++){
    //       var iAccordion = con[i].content.items[iAcci];
    //       iAccordion.animate = '';
    //     }
    //   }
    // }
    // console.log(con[0])
    // this.animation = iAccordion.animation(this);

    // this.animation.rotateY(90).step();
    // this.setData({
    //   'iAccordion.iAccordionAnimate': this.animation.export()
    // });
    
    
  },
  onReady: function(){
    this.dialog = this.selectComponent("#tab");
    // this.iAccordion = this.selectComponent("#iAccordion");
  },
  iAccordion: function(e){
    var index = e.target.dataset.index;
    console.log(index)
    this.animation.rotateY(0).step();

    this.setData({
      animate2: this.animation.export()
    });
  },
  _iAccordionDown: function(){
      console.log('iAccordionUp')
  }
})
