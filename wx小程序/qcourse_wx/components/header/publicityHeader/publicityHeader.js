

// const toHtmlArry = require('../../../utils/utils.js');
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
                var obj = {};
                
                console.log(this)
                var userTheme = this.data.data.json.wholeSet.userTheme,

                    color = common.fn.escapeColor(common.fn.hexToRgb(userTheme))
                
                    console.log(color)
                    
                    this.setData({
                        background: userTheme,
                        color: color
                    });

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
