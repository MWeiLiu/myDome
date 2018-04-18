// components/img_text_img/img_text_img.js

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
        // {
        //      imgSize: 'small/large',image的大小
        //      image: '左侧第一个图片',
        //      title: '标题',
        //      tipNumber: '右侧红字'
        //      icon: '右侧小icon'
        // }
    },

    methods: {
        
    }
})