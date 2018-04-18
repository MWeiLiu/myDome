
//ptDoubleCol  两列
const utils = require('../../../utils/utils.js');
const WxParse = require('../../../wxParse/wxParse.js');

Component({
    options: {
        multipleSlots: true
    },

    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(){
                var obj = {};
                
                // obj.that = this;
                // obj.article = this.data.data.content.text.textHtml;

            }
        }
    },

    data: {
        ptDoubleCol: {}
    },

    methods: {
        wxParseTagATap: function(){
            // toHtmlArry.attrHref();
        }
    }
})
