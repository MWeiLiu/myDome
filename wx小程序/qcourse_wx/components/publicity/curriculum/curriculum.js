//课程目录
// components/iAccordion/iAccordion.js
//折叠栏
const common = require('../../../utils/common/common.js');
Component({
    options: {
        multipleSlots: true
    },

    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(){
                var curriculumList = this.data.data.content.list[0],
                    array = [],
                    idx = 0;
console.log(common)
                this.setData({
                    'priceObj': common.that.data.price
                });

                for(var i = 0; i < curriculumList.length; i++){
                    var className = curriculumList[i].className,
                        look = curriculumList[i].look,
                        release = curriculumList[i].release,
                        timing = curriculumList[i].timing,
                        pid = curriculumList[i].pid,
                        obj = {};

                    if(className.indexOf('curriculumTxt') > 0){
                        var type = 'text';
                        idx = 0;
                    }else{
                        var type = 'curriculum';
                        idx++
                    }

                    var maibumai = '',
                        date = new Date(timing).getTime(),
                        today = new Date().getTime();
                    if(type == 'curriculum'){
                        if(look == 'false'){
                            if(release == 'true'){
                                if(timing != 'false'){
                                    if(today - date >= 0){
                                        maibumai = 'dengzhe';
                                    }else{
                                        if(this.data.priceObj.payed){
                                            maibumai = 'xue';
                                        }else{
                                            maibumai = 'mai';
                                        }
                                    }
                                }else{
                                    if(this.data.priceObj.payed){
                                        maibumai = 'xue';
                                    }else{
                                        maibumai = 'mai';
                                    }
                                }
                            }else {
                                maibumai = 'meishangjia';
                            }
                        }else{
                            maibumai = 'buyongmai';
                        }
                    }


                    obj = {
                        type: type,
                        look: look,
                        release: release,
                        timing: timing,
                        maibumai: maibumai,
                        pid: pid,
                        idx: idx
                    }

                    array.push(obj);
                    
                }
                console.log(common.that.data.price.payed)
                this.setData({
                    curriculum: array
                });
                console.log(this)
            }
        }
    },

    data: {
        curriculum: [],
        priceObj: {}
    },

    methods: {
        dengzhe: function(e){
            var timing = e.currentTarget.dataset.timing
            wx.showModal({
                title: '该课程暂未上架',
                content: '上架时间为' + timing
            })
        },
        mai: function(e){
            var mai = e.currentTarget.dataset.mailemei
            wx.showModal({
                title: '该课程需要购买',
                content: '该课程需要购买'
            })
        },
        meishangjia: function(){

            wx.showModal({
                title: '该课程暂未上架',
                content: '该课程暂未上架'
            })
        },
        xuexi: function(e){
            var pid = e.currentTarget.dataset.pid
            common.that.switchCourse({pid: pid});
        }
    }
})