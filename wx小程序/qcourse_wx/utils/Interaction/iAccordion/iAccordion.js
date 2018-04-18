// components/iAccordion/iAccordion.js

Component({
    options: {
        multipleSlots: true
    },

    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(){
                this.setData({
                    iAccordion: this.data.data
                })
                console.log(this.data.data)
            }
        },
    },

    data: {
        iAccordion: {},

    },

    methods: {
        
        sildeDown: function(){
            this.setData({
                
            })
        },
        sildeUp: function(){
            this.setData({
                
            })
        },
        _iAccordionDown: function(e){
            console.log(this);
        },
        _iAccordionUp: function(){
            this.triggerEvent('iAccordionUp')
        }
    }
})