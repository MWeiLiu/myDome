

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
                // var obj = {};
                
                // obj.that = this;
                // obj.article = this.data.data.content.text.textHtml;

                this.setData({
                    pictrueTurntable: {
                        indicatorDotsTrue: false,
                        indicatorColor: 'rgba(0, 57, 137, 0.12)',
                        indicatorActiveColor: '#000',
                        duration: '400'
                    }
                })

            }
        }
    },

    data: {
        pictrueTurntable: {}
    },

    methods: {
        wxParseTagATap: function(){
            // toHtmlArry.attrHref();
        }
    }
})
