
//翻页格
Component({
    options: {
        multipleSlots: true
    },

    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(){
                var iPageturning = {},
                    len = this.data.data.content.items,
                    that = this,
                    arry = [];

                for(var i = 0; i < len.length; i++){
                    var faceSize = '',
                        backSize = '',
                        display = '';

                    if(len[i].face.type == 'img'){
                        var width = parseFloat(len[i].face.width),
                            height = parseFloat(len[i].face.height);
                        
                        if(width >= height){
                            if(width >= 375){
                                height = (375 / width * height * 2).toFixed(0) + 'rpx';
                                width = '100%';
                            }else{
                                height = (375 / width * height * 2).toFixed(0) + 'rpx';
                            }
                        }else{
                            if(height >= 256){
                                width = (256 / height * width * 2).toFixed(0) + 'rpx';
                                height = '512rpx';
                            }else{

                            }
                        }

                        faceSize = 'width: ' + width + '; height: ' + height + '; margin: 8rpx auto 0; display: block;';
                    }
                    if(len[i].back.type == 'img'){
                        var width = parseFloat(len[i].back.width),
                            height = parseFloat(len[i].back.height);
                        
                        if(width >= height){
                            if(width >= 375){
                                height = (375 / width * height * 2).toFixed(0) + 'rpx';
                                width = '100%';
                            }else{
                                height = (375 / width * height * 2).toFixed(0) + 'rpx';
                            }
                        }else{
                            if(height >= 256){
                                width = (256 / height * width * 2).toFixed(0) + 'rpx';
                                height = '512rpx';
                            }else{

                            }
                        }

                        backSize = 'width: ' + width + '; height: ' + height + '; margin: 8rpx auto 0; display: block;';
                    }
                    var obj = {
                        iPageturningFace: '',
                        iPageturningBack: '',
                        type: 'face',
                        faceSize: faceSize,
                        backSize: backSize
                    }
                    arry.push(obj);
                }

                this.setData({
                    arry: arry
                })
                var animate = wx.createAnimation({
                        duration: 400,
                        timingFunction: 'linear'
                    });

                this.animation = animate;
        
                for(var a = 0; a < that.data.arry.length; a++){
                    var iPageturningBack = 'arry[' + a + '].iPageturningBack',
                        obj = {};

                    this.animation.rotateY(90).step();
                    obj[iPageturningBack] = this.animation.export()
                    this.setData(obj);
                }
            }
        }
    },

    data: {
        arry: []
    },

    methods: {
        clickMe: function(e){
            console.log(e)
            console.log(this)
            var type = e.target.dataset.backface,
                index = e.target.dataset.index,
                that = this;
            if(type == 'face'){
                that.animation.rotateY(90).step();
          
                var iPageturningFace = 'arry[' + index + '].iPageturningFace',
                    iPageturningType = 'arry[' + index + '].type',
                    obj = {};

                obj[iPageturningFace] = this.animation.export();
                obj[iPageturningType] = 'back';

                that.setData(obj)
                setTimeout(function(){
                    that.face(index);
                }, 400);
            }else{
                that.animation.rotateY(90).step();
          
                var iPageturningBack = 'arry[' + index + '].iPageturningBack',
                    iPageturningType = 'arry[' + index + '].type',
                    obj = {};

                obj[iPageturningBack] = this.animation.export();
                obj[iPageturningType] = 'face';

                that.setData(obj)
                setTimeout(function(){
                    that.back(index);
                }, 400);
            }
        },
        face: function(index){
            this.animation.rotateY(0).step();

            var iPageturningBack = 'arry[' + index + '].iPageturningBack',
                obj = {};

            obj[iPageturningBack] = this.animation.export();
            this.setData(obj);
        },
        back: function(index){
            this.animation.rotateY(0).step();

            var iPageturningFace = 'arry[' + index + '].iPageturningFace',
                obj = {};

            obj[iPageturningFace] = this.animation.export();
            this.setData(obj);
        }
    }
})