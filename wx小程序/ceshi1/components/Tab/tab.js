// components/Tab/tab.js

Component({
    options: {
        multipleSlots: true
    },

    properties: {
        title: {
            type: String,
            value: '标题'
        },
        text: {
            type: String,
            value: '内容'
        },
        img: {
            type: String,
            value: '图片地址'
        }
    },

    data: {
        iPagetab: {
            swiperIndex: '0',
            indicatorDots: false,
            autoplay: false,
            duration: 300,
            activeClass: ''
        }
    },

    methods: {
        _tabIndex: function(){
            this.triggerEvent('tabIndex')
        }
    }
})