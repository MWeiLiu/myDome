
const WxParse = require('../../wxParse/wxParse.js');
const asd = require('../../utils/utils.js');

//流程
Component({
    options: {
        multipleSlots: true
    },

    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(){
                var Data = this.data.data.content.items,
                    pOneStepLeftArry = [];

                var width = 702,
                    padding = 28,
                    pOneStepWidth = 60,
					spaceAreaAll = width - Data.length * pOneStepWidth,
					space1 = (spaceAreaAll / (Data.length + 1));
                
                for(var i = 0; i < Data.length; i++){
                    var w = i == 0 ? space1 : space1 * (i + 1) + pOneStepWidth * i;
                    pOneStepLeftArry.push(w)
                }

                this.setData({
                    'qProcess.items': Data,
                    'qProcess.swiper': {
                        indicatorDots: false,
                        autoplay: false,
                        duration: 400
                    },
                    'qProcess.pOneStepLeftArry': pOneStepLeftArry,
                    'qProcess.current': '0',
                    'qProcess.WxParse': []
                })

                console.log(this)

                var that = this,
                    article = this.data.qProcess.items;

                for (var w = 0; w < article.length; w++){
                    WxParse.wxParse('qProcess.WxParse[' + w + ']', 'html', article[w].text, that, 5);
                }
                
            }
        }
    },

    data: {
        qProcess: {}
    },

    methods: {
        pOneStepActive: function(e){
            var index = e.target.dataset.ponestepindex;
            this.setData({
                'qProcess.current': index
            })
        }
    }
})
