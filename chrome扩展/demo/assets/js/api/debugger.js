/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-21 10:17:38 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-21 10:20:55
 */

/**
 * chrome.debugger
 * 
 * chrome.debugger API 是 Chrome 远程调试协议（英文）的另一种消息传输方式。
 * chrome.debugger 可以附加到一个或多个标签页，以便记录网络交互、调试 JavaScript、改变 DOM 和 CSS 等等。
 * 使用调试对象的标签页标识符指定 sendCommand 的目标标签页，并在 onEvent 的回调函数中通过标签页标识符分发事件。
 * 
 * 权限: "permissions": ["debugger"] 
 */