/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-18 16:52:15 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-18 18:02:12
 */

/**
 * chrome.contextMenus
 * 
 * 使用 chrome.contextMenus API 向 Google Chrome 浏览器的右键菜单添加项目。
 * 您可以选择您在右键菜单中添加的项目应用于哪些类型的对象，例如图片、超链接和页面。 
 * 
 * 权限："permissions":["contextMenus"]
 * "icons":{
 *     "16": ''
 * } 
 */

// 最多允许添加多少顶层扩展程序菜单项至扩展程序按钮的右键菜单中，超过该限制的菜单项将会忽略。
chrome.contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT = ''

// 创建一个新的右键菜单项。注意，如果创建过程中发生错误，您可能要等到回调函数调用时才能得知（详情可从 runtime.lastError 获得）
// chrome.contextMenus.create(object createProperties, function callback)
// 写在chrome.runtime.getBackgroundPage的回调里，并且要在documentUrlPatterns指定的站点下
chrome.contextMenus.create({
    // 菜单项的类型。如果没有指定则默认为 'normal'（普通）
    type: 'normal' || 'checkbox' || 'radio' || 'separator',
    // 指派给该菜单项的唯一标志符，对于事件页面来说必须存在，不能与同一扩展程序中的其他标志符相同。
    id: '',
    // 显示在菜单项中的文字，除非 type（类型）是 'separator'（分隔符），该参数是必选的。
    // 当上下文为 'selection'（选定内容）时，您可以在字符串中使用 %s 来显示选中的文本.
    title: '',
    // 单选或复选菜单项的初始状态：选定为 true，未选定为 false。在一组单选菜单项中，一次只能有一项选定。
    checked: '',
    // 列出该菜单项将会出现在哪些上下文中，包括 "all"（全部）、"page"（页面）、"frame"（框架）、"selection"（选定内容）、"link"（链接）、"editable"（可编辑内容）、"image"（图片）、"video"（视频）、"audio"（音频），
    // 如果没有指定则默认为 ['page']（页面），指定 ['all'] 相当于除 'launcher' 以外的所有其他上下文的组合。'launcher' 上下文仅在应用中支持，为右键菜单添加菜单项，在单击执行器/任务栏/窗格/等等中的应用图标时显示。
    // 不同的平台对于执行器中实际支持的特性可能会有一些限制。
    contexts: 'all' || 'page' || 'frame' || 'selection' || 'link' || 'editable' || 'image' || 'video' || 'audio' || 'launcher' || 'browser_action' || 'page_action',
    onclick: function (info, tab) {
        /**
         * info 有关单击发生时的菜单项和上下文的信息
         * tab 单击发生的标签页详情。
         */
    },
    // 父菜单项标识符，指定这一参数使新添加的菜单项成为原先添加菜单项的子菜单项。
    parentId: '',
    // 让您将该菜单项限制在 URL 匹配给定表达式的文档中显示。（也适用于框架。）
    documentUrlPatterns: '',
    // 类似于 documentUrlPatterns，但是允许基于 /
    targetUrlPatterns: '',
    // 该右键菜单项是启用还是禁用，默认为 true。
    enabled: true
}, function () {})