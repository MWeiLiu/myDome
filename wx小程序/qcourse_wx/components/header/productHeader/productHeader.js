

const utils = require('../../../utils/utils.js');
const common = require('../../../utils/common/common.js');

Component({
    options: {
        multipleSlots: true
    },

    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(){
                
                this.setData({
                    productHeader: this.data.data
                });

                var userTheme = this.data.data.json.wholeSet.userTheme,

                    color = common.fn.escapeColor(common.fn.hexToRgb(userTheme))
                
                if(this.data.productHeader.pic == ''){
                    this.setData({
                        background: userTheme,
                        color: color
                    });
                }else{
                    this.setData({
                        background: 'url(' + this.data.data.pic + ') center center / cover no-repeat',
                        color: '#fff'
                    })
                }
            }
        }
    },

    data: {
        productHeader: {}
    },

    methods: {
        wxParseTagATap: function(){
            // toHtmlArry.attrHref();
        }
    }
})
