/*
 * @Author: MWeiLiu
 * @Date: 2018-12-13 18:01:21
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2018-12-28 14:45:54
 */

import $ from 'jquery'
import config from './config.js'

class Request {
  /**
   * 普通请求
   *
   * @static
   * @param {*} option
   * @returns
   * @memberof Request
   */
  static upData(option) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: option.url || '',
        async: option.async || true,
        data: option.data || {},
        dataType: option.dataType || 'JSON',
        type: option.type || 'POST',
        success: (res) => {
          resolve(res)
        },
        error: (e) => {
          reject(e)
        }
      })
    })
  }
  /**
   * 上传文件
   *
   * @static
   * @param {*} option
   * @returns
   * @memberof Request
   */
  static upFile(option) {
    return new Promise((resolve, reject) => {
      config.xhr = $.ajaxSettings.xhr()
      $.ajax({
        url: option.url,
        type: option.type || 'POST',
        dataType: option.dataType || 'json',
        async: option.async || true,
        data: option.data || {},
        processData: false,
        contentType: false,
        xhr: function () {
          if (onprogress && config.xhr.upload) {
            config.xhr.upload.addEventListener('progress', option.onprogress, false)
            return config.xhr
          }
        },
        success: (res) => {
          resolve(res)
        },
        error: (e) => {
          reject(e)
        }
      })
      return config.xhr
    })
  }
  /**
   * 测试
   *
   * @static
   * @param {*} option
   * @returns
   * @memberof Request
   */
  static test(option) {
    option.url = config.rootUrl + '/test'
    option.type = 'GET'
    return this.upData(option)
  }
  /**
   * 登录
   *
   * @static
   * @param {*} option
   * @returns
   * @memberof Request
   */
  static login(option) {
    option.url = config.rootUrl + '/login/login'
    option.type = 'POST'
    return this.upData(option)
  }
  /**
   * 招聘职位列表
   */
  static getPubpositionList(option) {
    option.url = config.rootUrl + '/Pubposition/getPubpositionList'
    return this.upData(option)
  }

  /**
   * 授权
   * ***/
  static getCommunicateionList(option) {
    option.url = config.rootUrl + '/Communication/getCommunicateionList'
    return this.upData(option)
  }
  /**
   * 看过我的
   * ***/
  static getOperatesList(option) {
    option.url = config.rootUrl + '/positionoper/getOperatesList'
    return this.upData(option)
  }
  /**
   * 职位详情
   * **/
  static getPubpositionDetail(option) {
    option.url = config.rootUrl + '/Pubposition/getDetail'
    return this.upData(option)
  }
  /**
   * 发布职位
   * ***/
  static addPubposition(option) {
    option.url = config.rootUrl + '/Pubposition/addPubposition'
    return this.upData(option)
  }
}

export default Request
