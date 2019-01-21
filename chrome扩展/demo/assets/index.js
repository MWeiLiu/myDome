/*
 * @Author: MWeiLiu chrome拓展的主程序
 * @Date: 2019-01-16 17:28:00 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-21 12:08:17
 */

const options = {
    type: 'basic',
    title: '1',
    message: '2',
    iconUrl: './images/440_280.jpg'
}
console.log(chrome)
chrome.notifications.create('', options, function (notificationId) {
    console.log(notificationId)
})