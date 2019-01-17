/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-03 18:39:39 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-03 20:59:38
 */


import $ from 'jquery'

let option = {

}

$(() => {

    /**
     * 切换登录类型
     */
    $('body').on('click', '.change-btn .btn1,.change-btn .btn2', function () {
        $(this).hide().siblings().show();
        $('.change-box > div').eq($(this).index()).hide().siblings().show();
    })

})
