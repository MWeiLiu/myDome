/*
 * @Author: MWeiLiu 桌面通知
 * @Date: 2019-01-17 18:14:08 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-17 18:18:03
 */
// 创建一个简单的文本通知：
var notification = webkitNotifications.createNotification(
    '../../images/icon.jpg', // 图标 URL，可以是相对路径
    '您好！', // 通知标题
    '内容（Lorem ipsum...）' // 通知正文文本
);

// 然后显示通知。
notification.show();