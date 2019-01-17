/*
 * @Author: MWeiLiu
 * @Date: 2018-12-14 10:07:23
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2018-12-27 21:16:36
 */

let config = {
  // testRootUrl: 'http://zcda.com',
  // localRootUrl: 'http://zcda.com',
  testRootUrl: 'http://test.zcdangan.com',
  localRootUrl: 'http://zcda.com',
  rootUrl: '',
  xhr: null
}

if (location.host.indexOf('zcda.com') > -1 ||
  location.host.indexOf('localhost:') > -1) {
  config.rootUrl = config.localRootUrl
} else {
  config.rootUrl = config.testRootUrl
}

export default config
