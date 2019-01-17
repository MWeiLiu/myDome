/*
 * @Author: MWeiLiu
 * @Date: 2018-12-25 17:11:38
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-03 11:42:20
 */

import $ from 'jQuery'
class Common {
  /**
   * 登录校验
   *
   * @static
   * @param {*} option
   * @memberof Common
   */
  static isLogin(option) {

    var conf = {
      code: 1,
      msg: ''
    }

    var loginData = localStorage.getItem('loginData')

    if (!loginData || loginData === '') {
      // 没有登录
      if ($.inArray(option.to.name, option.guard.need.personal) > -1 ||
        $.inArray(option.to.name, option.guard.need.company) > -1 ||
        $.inArray(option.to.name, option.guard.need.public) > -1) {
        conf.msg = '请先登录'
        conf.code = -1
        option.store.commit('checkLoginState', false)
        alert(conf.msg)
      }
    } else {
      // 是否存在
      if ($.inArray(option.to.name, option.guard.need.personal) > -1 ||
        $.inArray(option.to.name, option.guard.need.company) > -1 ||
        $.inArray(option.to.name, option.guard.need.public) > -1 ||
        $.inArray(option.to.name, option.guard.unwante) > -1 ||
        $.inArray(option.to.name, option.guard.public) > -1) {
        // 已登录
        if ($.inArray(option.to.name, option.guard.unwante) > -1) {
          conf.code = 0
        } else {
          conf.code = 1
          conf.msg = '欢迎回来'
        }
      } else {
        conf.code = 404
        conf.msg = '您访问的页面不存在'
      }
      option.store.commit('checkLoginState', true)
    }
    return conf
  }
  /**
   * 面包屑
   *
   * @static
   * @param {*} mouldRouter
   * @returns
   * @memberof Common
   */
  static breadcrumb(mouldRouter) {
    var url = location.hash
    var arry = url.split('/')
    let breadcrumbArry = []

    for (var i = 0; i < arry.length; i++) {
      if (mouldRouter[arry[i]]) {
        breadcrumbArry.push(mouldRouter[arry[i]])
      }
    }
    return breadcrumbArry
  }
}

export default Common