/*
 * @Author: MWeiLiu
 * @Date: 2018-12-24 18:44:37
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2018-12-24 20:04:25
 */
import '../base/config.js'
var communicate = {
  searchCascader: [{
    'value': '已读',
    'label': '已读'
  }, {
    'value': '不感兴趣',
    'label': '不感兴趣',
    'children': [{
      'value': '学历不符',
      'label': '学历不符'
    }, {
      'value': '职场分不符',
      'label': '职场分不符'
    }, {
      'value': '简历造假',
      'label': '简历造假'
    }, {
      'value': '对方已找到工作',
      'label': '对方已找到工作'
    }, {
      'value': '距离太远',
      'label': '距离太远'
    }]
  }, {
    'value': '适合',
    'label': '适合'
  }, {
    'value': '不适合',
    'label': '不适合'
  }, {
    'value': '收藏',
    'label': '收藏'
  }],
  search: {
    type: '',
    value: ''
  },
  chatList: {
    defaultItem: {
      type: '默认分类',
      defaultList: [{

      }]
    },
    interestClass: {
      type: '对我感兴趣的',
      icon: require('../../images/communicate/Interestedinme.png'),
      otherChatList: []
    },
    unsuitedClass: {
      type: '不合适',
      icon: require('../../images/communicate/Uninterested.png'),
      otherChatList: []
    },
    collectionClass: {
      type: '我收藏的',
      icon: require('../../images/communicate/Collection.png'),
      otherChatList: []
    },
    communicatedClass: {
      type: '已经沟通过的',
      icon: require('../../images/communicate/Hascommunicated.png'),
      otherChatList: []
    }
  }
}

export default communicate
