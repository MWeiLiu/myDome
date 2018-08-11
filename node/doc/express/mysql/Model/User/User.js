
var BaseResult = require('../../helpers');
var json = require('../../Json/User/User');

class User {
    
    /**
     * 获取单条数据
     * @param {*} info 
     */
    getOne(info){

        var username = info.username;

        for(var i = 0; i < json.sql_name.length; i++){
            var jsoni = json.sql_name[i];
            if(jsoni.username == username){
                BaseResult.SUCCESS.setData(jsoni);
                return BaseResult.SUCCESS;
            }else{
                return BaseResult.FAILED;
            }
        }

    }


}


module.exports = User;