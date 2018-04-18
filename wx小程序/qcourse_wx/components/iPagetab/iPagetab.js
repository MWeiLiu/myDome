// components/iPagetab/iPagetab.js
//tab页
Component({
    options: {
        multipleSlots: true
    },

    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(){
                var con = this.data.data.content.items,
                    iPagetab = {};
                    
                iPagetab = {
                    item: this.data.data.content,
                    swiperIndex: 0,
                    indicatorDots: false,
                    autoplay: false,
                    duration: 300
                }

                this.setData({
                    iPagetab: iPagetab
                });
                console.log(this)
            }
        }
    },

    data: {
        iPagetab: {}
    },

    methods: {
        iPagetab: function(e){
            var index = e.target.dataset.index
            console.log(e)
            this.setData({
                'iPagetab.swiperIndex': index
            })
        }
    }
})