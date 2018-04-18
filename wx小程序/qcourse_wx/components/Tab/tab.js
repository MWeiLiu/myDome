// components/Tab/tab.js

Component({
    options: {
        multipleSlots: true
    },

    properties: {
        className: {
            type: String,
            value: '内容'
        },
        tabIndex: {
            type: Number,
            value: 0
        },
        tabHidden: {
            type: Number,
            value: 0
        },
        text: {
            type: String,
            value: '内容'
        },
        img: {
            type: String,
            value: ''
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
        hideTab: function(){
            this.setData({
                isShow: !this.data.isShow
            });
        },
        showTab: function(){
            this.setData({
                isShow: !this.data.isShow
            });
        },
        _tabIndex: function(){
            this.triggerEvent('tabIndex')
        }
    }
})