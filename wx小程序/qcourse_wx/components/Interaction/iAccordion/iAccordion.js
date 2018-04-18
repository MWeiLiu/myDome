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
                var con = this.data.data.content.items;
                console.log(con)
                for(var i = 0; i < con.length; i++){
                  con[i].animate = '12';
                  con[i].icon = 'https://www.qcourse.com/images/website_Back.png';
                  con[i].type = 'up';
                };

                this.setData({
                    iAccordion: this.data.data.content
                });
                var animation = wx.createAnimation({
                    transformOrigin: "50% 50%",
                    duration: 1000,
                    timingFunction: "ease",
                    delay: 0
                });
                this.animation = animation;
                this.animation.height(55).step();
            }
        }
    },

    data: {
        iAccordion: {}
    },

    methods: {
        _iAccordion: function(e){
            var index = e.target.dataset.index,
                type = e.target.dataset.type,
                Icon = 'iAccordion.items['+ index +'].icon',
                Type = 'iAccordion.items['+ index +'].type',
                Anim = 'iAccordion.items['+ index +'].animate',
                template = {};
                
            if (type == 'up') {
                template[Icon] = 'https://www.qcourse.com/images/downIcon1.0.png';
                template[Type] = 'down';
                this.animation.height(380).step();
                template[Anim] = this.animation.export()
            } else {
                template[Icon] = 'https://www.qcourse.com/images/website_Back.png';
                template[Type] = 'up';
                this.animation.height(55).step();
                template[Anim] = this.animation.export()
            }
            this.setData(template);
        }
    }
})