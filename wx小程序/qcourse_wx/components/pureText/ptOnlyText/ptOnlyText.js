
//ptOnlyText 段落
// const toHtmlArry = require('../../../utils/utils.js');

Component({
    options: {
        multipleSlots: true
    },

    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(){
                
                // obj.that = this;
                // obj.article = this.data.data.content.text.textHtml;

            }
        }
    },

    data: {
        
    },

    methods: {
        wxParseTagATap: function(){
            // toHtmlArry.attrHref();
        }
    }
})
