

//describe 课程描述

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
                
                this.setData({
                    describe: this.data.data
                });
                // obj.that = this;
                // obj.article = this.data.data.content.text.textHtml;
                // console.log(this)
            }
        }
    },

    data: {
        describe: {}
    },

    methods: {
        wxParseTagATap: function(){
            // toHtmlArry.attrHref();
        }
    }
})
