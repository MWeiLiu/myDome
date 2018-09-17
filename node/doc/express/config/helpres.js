/*
 * @Author: MWeiLiu 
 * @Date: 2018-09-15 01:57:31 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2018-09-15 02:01:20
 */

function msg (code, msg = '', data = Array()){
    var info = {
        code: code,
        data: data,
        msg: msg
    }
    return info
}

module.exports = msg;