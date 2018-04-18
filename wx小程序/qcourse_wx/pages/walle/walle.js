
Page({
    data: {
        isShow: true,
        walle: [
            {
                imgSize: 'small',
                title: '节节败退的LG手机节节败退的LG',
                tipNumber: '+￥12.13'
            },
            {
                imgSize: 'small',
                title: '在线音乐市场春天来了？',
                tipNumber: '+￥5.6'
            }
        ]
    },
    onLoad: function () {
    
    },
    onReady: function(){
        this.img_text_img = this.selectComponent("#img_text_img");
    },
    clickShow: function(){
        if(this.data.isShow){
            this.setData({
                isShow: false
            })
        }else{
            this.setData({
                isShow: true
            })
        }
    }
})