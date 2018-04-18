var pbKeepon = {

    continueNext: function(obj){
        console.log(obj)
        var dataset = obj.e.currentTarget.dataset,
            index = parseInt(dataset.index) + 1,
            continuetype = dataset.continuetype,
            that = obj.that,
            Data = that.data.dataContent.json,
            dataList = Data.dataList;
        if(continuetype == 'pbKeepon'){
            for(var k = 0; k < dataList.length; k++){
                if(dataList[k].dataType == 'pbKeepon'){
                    dataList.splice(k, 1);
                }
            }
    
            for(var i = 0; i < Data.pbKeeponArray[index].length; i++){
                dataList.push(Data.pbKeeponArray[index][i]);
            }
            that.setData({
                'options.pbKeeponIndex': index,
                'dataContent.json.dataList': dataList
            });
        }else if(continuetype == 'pbPayOff'){
            var money = dataset.money;

            wx.showModal({
                title: '购买提示',
                content: '需要支付' + money + '元',
                success: function(res){
                    if(res.confirm){
                        // for(var k = 0; k < dataList.length; k++){
                        //     if(dataList[k].dataType == 'pbPayOff'){
                        //         dataList.splice(k, 1);
                        //     }
                        // }
                    
                        // for(var i = 0; i < Data.pbKeeponArray[index].length; i++){
                        //     dataList.push(Data.pbKeeponArray[index][i])
                        // }
                        // that.setData({
                        //     'options.pbKeeponIndex': index,
                        //     'dataContent.json.dataList': dataList
                        // });
                        that.pay(money);
                    }
                }
            })


        }

    }
}

module.exports = pbKeepon