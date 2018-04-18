
//试题
Component({
    options: {
        multipleSlots: true
    },

    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(){
                console.log(this);
                this.setData({
                    'iQuizzes.items': this.data.data.content.items,
                    'iQuizzes.swiper': {
                        indicatorDots: false,
                        autoplay: false,
                        duration: 400
                    },
                    'iQuizzes.swiperSize': {

                    }
                })
                console.log(this.data.iQuizzes)
            }
        }
    },

    data: {
        iQuizzes: {}
    },

    methods: {
        
    }
})