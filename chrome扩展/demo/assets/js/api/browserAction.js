/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-18 14:37:52 
 * @Last Modified by:   MWeiLiu 
 * @Last Modified time: 2019-01-18 14:37:52 
 */

/**
 * chrome.browserAction
 * 
 * 使用浏览器按钮可以在 Google Chrome 浏览器主窗口地址栏右侧的工具栏中添加图标。
 * 除了图标，浏览器按钮还可以有工具提示、徽章和弹出内容。 
 * 
 * 权限: "browser_action": {...} 
 */

//  设置浏览器按钮的标题，显示在工具提示中。
// chrome.browserAction.setTitle(object details)
// details	
// string	title	当鼠标移到浏览器按钮上时应显示的字符串。
// integer （可选）tabId	将更改限制在当某一特定标签页选中时应用，当该标签页关闭时，更改的内容
chrome.browserAction.setTitle({
    title: 'asdfadsf',
    tabId: integer
})

// 获取浏览器按钮的标题。
chrome.browserAction.getTitle({
    tabId: integer
}, function (result) {})

// 设置浏览器按钮的图标。图标既可以指定为图片文件的路径，也可以指定来自 canvas 元素的像素数据，或者这两者中任意一个的词典。path 或 imageData 属性中有且只有一个必须指定。
chrome.browserAction.setIcon({
    tabId: integer,
    imageData: {
        '19': ''
    },
    path: {
        '19': ''
    },
}, function () {})

// 设置当用户单击浏览器按钮时显示为弹出内容的 HTML 文档。
chrome.browserAction.setPopup({
    tabId: integer,
    popup: ''
})

// 获取设置为浏览器按钮弹出内容的 HTML 文档。
chrome.browserAction.getPopup({
    tabId: integer
}, function (result) {})

// 设置浏览器按钮上的徽章，显示在图标上。
chrome.browserAction.setBadgeText({
    tabId: integer,
    text: ''
})

// 获取浏览器按钮上的徽章，如果没有指定标签页，则返回用于所有标签页的徽章。
chrome.browserAction.getBadgeText({
    tabId: integer
}, function (result) {})

// 设置徽章的背景颜色。
chrome.browserAction.setBadgeBackgroundColor({
    tabId: integer,
    color: [255, 255, 255, 0.2]
})

// 获取浏览器按钮上的徽章，如果没有指定标签页，则返回用于所有标签页的徽章。
chrome.browserAction.getBadgeBackgroundColor({
    tabId: integer
}, function (result) {})

// 为某一标签页启用浏览器按钮。默认情况下，浏览器按钮是启用的。
chrome.browserAction.enable(tabId)

// 为某一标签页禁用浏览器按钮。
chrome.browserAction.disable(tabId)

/**
 * 事件
 */
//浏览器按钮的图标单击时产生，如果浏览器按钮有弹出内容则不会触发该事件。
chrome.browserAction.onClicked.addListener(function (tabs) {})