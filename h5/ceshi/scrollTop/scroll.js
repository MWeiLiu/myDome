
window.fn={

    getObjTop: function (obj) {
        var h = 0;
        while (obj) {
            h += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return h;
    },
    liSroll: function () {
        var li = $('ul li'),
            that=this;
        for (var i = 0, l = li.length; i < l; i++) {
            var LI = li[i];
            var t = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
            var h = that.getObjTop(LI);
            if (h < t) {
                this.getHtml(i)
            }
        }
    },
    getHtml:function(i){
        $('li').eq(i).addClass('chu')
    }
}
$(function(){
    
    fn.liSroll()
    $(window).scroll(function(){
        fn.liSroll()
    })
})