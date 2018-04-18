
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
                var item = this.data.data.content.items,
                    that = this;
                this.setData({
                    'iQuizzes.items': item,
                    'iQuizzes.swiper': {
                        indicatorDots: false,
                        autoplay: false,
                        duration: 400
                    },
                    'iQuizzes.swiperSize': {

                    }, 
                    'iQuizzes.select': ['A', 'B', 'C', 'D', 'F', 'G', 'H'],
                    'iQuizzes.image': [
                        'https://www.qcourse.com/images/couponSelected.png',
                        'https://www.qcourse.com/images/wrongPc.png'
                    ]
                })
                for(var i = 0; i < item.length; i++) {
                    var selectActive = [],
                        answerIndexArry = [];
                    for(var j = 0; j < item[i].answerItems.length; j++){
                        selectActive.push('0');
                    }
                    var itemi = 'iQuizzes.items[' + i + '].selectActive',
                        answerString = 'iQuizzes.items[' + i + '].answerString',
                        answerSring = 'iQuizzes.items[' + i + '].select',
                        select = '',
                        obj = {};

                    if(item[i].type == 'judge'){
                        select = item[i].answerItems[item[i].answerIndex];
                    }else{
                        var itemString;
                        if(item[i].answerIndex.indexOf(',') > 0){
                            itemString = item[i].answerIndex.split(',')
                        }else{
                            itemString = item[i].answerIndex
                        }
                        if(typeof itemString == 'string'){
                            select = that.data.iQuizzes.select[itemString];
                        }else{
                            for(var s = 0; s < itemString.length; s++){
                                if(select == ''){
                                    select += that.data.iQuizzes.select[itemString[s]];
                                }else{
                                    select = select + ',' + that.data.iQuizzes.select[itemString[s]];
                                }
                            }
                        }
                    }

                    obj[itemi] = selectActive;
                    obj[answerSring] = select;
                    this.setData(obj);
                }
            }
        }
    },

    data: {
        iQuizzes: {}
    },

    methods: {
        //选择答案
        selectActive: function(e){
                //题目类型
            var type = e.currentTarget.dataset.type,
                //题目的index
                items = e.currentTarget.dataset.items,
                //答案的index
                index = e.currentTarget.dataset.index,
                active = this.data.iQuizzes.items[items].selectActive[index],
                answerSring = 'iQuizzes.items[' + items + '].answerSring',
                answerIndexArry = [];
                
            if(type == 'judge' || type == 'select') {
                var itemi = 'iQuizzes.items[' + items + '].selectActive[' + index + ']',
                    obj = {};

                if(active == '0'){
                    for(var i = 0; i < this.data.iQuizzes.items[items].selectActive.length; i++){
                        obj['iQuizzes.items[' + items + '].selectActive[' + i + ']'] = '0'
                    }
                    obj[itemi] = '1'
                }else{
                    obj[itemi] = '0'
                }
                obj[answerSring] = index
                this.setData(obj)
            } else {
                var itemi = 'iQuizzes.items[' + items + '].selectActive[' + index + ']',
                    obj = {};
                    obj[answerSring] = ''
                if(active == '0'){
                    obj[itemi] = '1'
                }else{
                    obj[itemi] = '0'
                }
                this.setData(obj)
                var select = this.data.iQuizzes.items[items].selectActive
                for(var i = 0; i < select.length; i++){
                    if(select[i] == '1'){
                        if(obj[answerSring] == ''){
                            obj[answerSring] += i;
                        }else{
                            obj[answerSring] += ',' + i;
                        }
                    }else{
                        continue;
                    }
                }
                this.setData(obj)
            }
        }
    }
})