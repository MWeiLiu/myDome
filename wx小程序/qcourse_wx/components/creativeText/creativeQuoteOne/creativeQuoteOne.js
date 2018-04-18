
//creativeQuoteOne 
const utils = require('../../../utils/utils.js');

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
                
                obj.that = this;
                obj.article = this.data.data.content.text.textHtml;

            }
        }
    },

    data: {
        qProcess: {}
    },

    methods: {
        wxParseTagATap: function(){
            // toHtmlArry.attrHref();
        }
    }
})
