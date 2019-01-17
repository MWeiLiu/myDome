/*
 * @Author: MWeiLiu
 * @Date: 2018-12-25 16:38:47
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-03 11:44:20
 */

class Data {
  /**
   * 获取性别
   * 0女|1男
   * @static
   * @returns
   * @memberof Data
   */
  static getSex() {
    return {
      active: 0,
      alt: ['女', '男'],
      icon: [
        require('@/assets/images/index/Female.png'),
        require('@/assets/images/index/Male.png')
      ]
    }
  }

  /**
   * 设置选择框
   * 0未选中|1选中
   * @static
   * @returns
   * @memberof Data
   */
  static setCheckBtn() {
    return {
      active: 0,
      alt: ['勾选', '未勾选'],
      icon: [
        require('@/assets/images/manageStaffFiles/Checkboxunchecked.png'),
        require('@/assets/images/manageStaffFiles/Checkbox.png')
      ]
    }
  }
  /**
   * 设置删除按钮
   * 0未选中|1选中
   * @static
   * @returns
   * @memberof Data
   */
  static setDeleteBtn() {
    return {
      active: 0,
      icon: [
        require('@/assets/images/manageStaffFiles/Deleteinactivated.png'),
        require('@/assets/images/manageStaffFiles/Deleteactivation.png')
      ],
      color: ['color: rgba(238, 238, 238, 1);', 'color: rgba(253,37,37,1);']
    }
  }
  /**
   * 设置上下箭头按钮的状态
   * 0下|1上
   * @static
   * @returns
   * @memberof Data
   */
  static setStateBtn() {
    return {
      active: 0,
      icon: ['el-icon-caret-bottom', 'el-icon-caret-top'],
      color: ['color: rgba(51, 51, 51, 1)', 'color: rgba(63, 178, 232, 1)']
    }
  }
  /**
   * 设置验证码图片
   *
   * @param {*} url
   * @returns
   * @memberof Common
   */
  // static setyzmtu(url = 'http://test.zcdangan.com/code/getCode') {
  //   if (Common.indexOf('?', url) > -1) {
  //     url = url.split('?')[0]
  //   } else {
  //     url = url + '?d=' + Math.random() * 10
  //   }
  //   return url
  // }
  /**
   * 管理招聘档案列表职位发布状态
   * `states` varchar(255) DEFAULT '0' COMMENT '状态0.待审核  1.在线；2编辑；3.下线；4.公司删除；5.后台删除',
   * @static
   * @returns
   * @memberof Data
   */
  static releaseState() {
    return {
      active: 0,
      color: ['', '', 'background: rgba(250,81,104,1);', 'background: rgba(215, 215, 215, 1);'],
      state: ['待审核', '在线', '编辑', '下线', '公司删除', '后台删除']
    }
  }
  /**
   * 管理招聘档案列表岗位匹配度人选效果
   *
   * @static
   * @memberof Data
   */
  static matchingDegree() {
    return {
      active: 0,
      color: ['border-bottom: 1px solid rgba(102, 102, 102, 1);color: rgba(102, 102, 102, 1);',
        'border-bottom: 1px solid rgba(63, 178, 232, 1);color: rgba(63, 178, 232, 1);'
      ]
    }
  }
}

export default Data
