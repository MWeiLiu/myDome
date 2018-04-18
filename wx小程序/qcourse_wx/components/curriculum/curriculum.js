//课程目录
// components/iAccordion/iAccordion.js
//折叠栏
Component({
    options: {
        multipleSlots: true
    },

    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(){
                
            }
        }
    },

    data: {
        iAccordion: {}
    },

    methods: {
        
    }
})