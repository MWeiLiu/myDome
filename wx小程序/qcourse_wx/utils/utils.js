const WxParse = require('../wxParse/wxParse.js');
var utils = {
    style: [],
    tohtml: function(obj){
        WxParse.wxParse('article', 'html', obj.article, obj.that, 5);
    },
    attrHref: function(e){
        var src = e.currentTarget.dataset.src;
        wx.showModal({
          title: '这是个链接',
          content: src,
          success: function(res){
            if(res.confirm){
                
            }
          }
        })
    },
    components: function(that){
        return (function (that){
            console.log(that)
            // this.productHeader = this.selectComponent("#productHeader");
            // this.publicityHeader = this.selectComponent("#publicityHeader");
            
            // this.iPageturning = this.selectComponent("#iPageturning");
            // this.iQuizzes = this.selectComponent("#iQuizzes");
            // this.qProcess = this.selectComponent("#qProcess");
            // this.creativeQuoteOne = this.selectComponent("#creativeQuoteOne");
        })()
    }

}

module.exports = utils