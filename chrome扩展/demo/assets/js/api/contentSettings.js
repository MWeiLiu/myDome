/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-18 15:40:17 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-18 16:44:27
 */

/**
 * chrome.contentSettings
 * 
 * 使用 chrome.contentSettings API 更改设置，控制网站能否使用 Cookie、JavaScript 和插件之类的特性。
 * 大体上说，内容设置允许您针对不同的站点（而不是全局地）自定义 Chrome 浏览器的行为。 
 * 
 * 权限: "permissions": ["contentSettings"]
 * <all_urls>||\*:\/\/\*.example.\*:\*\/\*
 * 
 * chrome.contentSettings.javascript.get 以此类推
 */

//使用资源标识符的内容类型只有 contentSettings.plugins（插件）
const ResourceIdentifier = {
    // 给定内容类型的资源标识符。
    id: '',
    // 可读性较好的资源描述。
    description: ''
}

// 清除当前扩展程序设置的所有内容设置规则。
// ContentSetting.clear(object details, function callback)
ContentSetting.clear({
    /**
     * 在哪些范围内清除这些设置（默认为 "regular"）。下列值之一：
     * "regular"（普通）：用于普通配置文件的设置（如果没有另外覆盖的话也将由隐身配置文件继承）；
     * "incognito_session_only"（仅用于隐身会话）：用于隐身配置文件的设置，只能在隐身会话中设置，并且在隐身会话结束时删除（覆盖普通设置）。
     */
    scope: 'regular' || 'incognito_session_only'
}, function () {})

// 获得指定主要/辅助 URL 对当前对应的内容设置。
// ContentSetting.get(object details, function callback => details)
ContentSetting.get({
    // 要获得当前内容设置的主要 URL，注意主要 URL 的意义取决于内容类型。
    primaryUrl: '',
    // 要获得当前内容设置的辅助 URL，默认为主要 URL。注意辅助 URL 的意义取决于内容类型，并且不是所有的内容类型都使用辅助 URL。
    secondaryUrl: '',
    // 有关要获取设置的更具体的内容类型标识符。
    resourceIdentifier: ResourceIdentifier,
    // 是否为隐身会话检查内容设置。（默认为 false）
    incognito: false
}, function (details){
    details = {
        // 内容设置，有关可能的值请参见每一个 ContentSetting 对象的描述。
        setting: ''
    }
})

// 应用新的内容设置规则。
// ContentSetting.set(object details, function callback)
ContentSetting.set({
    // 主要 URL 的匹配表达式。有关匹配表达式的格式细节
    primaryPattern: '*://*.example.*:*/*',
    // 辅助 URL 的匹配表达式，默认匹配所有 URL
    secondaryPattern: '',
    // 内容类型的资源标识符。
    resourceIdentifier: ResourceIdentifier,
    // 这一规则应用的设置。有关可能的值请参见每一个 ContentSetting 对象的描述。
    setting: '',
    /**
     * 在哪些范围内应用这些设置（默认为 "regular"）。下列值之一：
     * "regular"（普通）：用于普通配置文件的设置（如果没有另外覆盖的话也将由隐身配置文件继承）；
     * "incognito_session_only"（仅用于隐身会话）：用于隐身配置文件的设置，只能在隐身会话中设置，并且在隐身会话结束时删除（覆盖普通设置）。
     */
    scope: 'regular' || 'incognito_session_only'
}, function () {})

// ContentSetting.getResourceIdentifiers(function callback => ResourceIdentifier)
ContentSetting.getResourceIdentifiers(function (resourceIdentifiers){
    resourceIdentifiers = [ResourceIdentifier]
})

// ContentSetting
/**
 * 是否允许网站设置 Cookie 以及其他本地数据。以下值之一：
 * "allow"：接受 Cookie
 * "block"：阻止 Cookie
 * "session_only"：接受仅在当前会话有效的 Cookie
 * 默认值为 "allow"。
 * 主要 URL 为代表 Cookie 来源的 URL，辅助 URL 为顶层框架的 URL。
 * 
 * chrome.contentSettings.CookiesContentSetting 一次类推
 */
chrome.contentSettings.cookies

/**
 * 是否显示图片。以下值之一：
 * "allow"：显示图片
 * "block"：不要显示图片
 * 默认值为 "allow"。
 * 主要 URL 为主框架 URL，辅助 URL 为图片 URL。
 */
chrome.contentSetting.images

/**
 * 是否运行 JavaScript。以下值之一：
 * "allow"：运行 JavaScript
 * "block"：不要运行 JavaScript
 * 默认值为 "allow"。
 * 主要 URL 为顶层框架 URL，辅助 URL 未使用。
 */
chrome.contentSettings.javascript

/**
 * 是否运行插件。以下值之一：
 * "allow"：自动运行插件
 * "block"：不要自动运行插件
 * 默认值为 "allow"。
 * 主要 URL 为顶层框架 URL，辅助 URL 未使用。
 */
chrome.contentSettings.plugins

/**
 * 是否允许站点显示弹出式窗口。以下值之一：
 * "allow"：允许站点显示弹出式窗口
 * "block"：不允许站点显示弹出式窗口
 * 默认值为 "block"。
 * 主要 URL 为顶层框架 URL，辅助 URL 未使用。
 */
chrome.contentSettings.popups

/**
 * 是否允许站点显示桌面通知。以下值之一：
 * "allow"：允许站点显示桌面通知
 * "block"：不允许站点显示桌面通知
 * "ask"：当站点要显示桌面通知时询问用户
 * 默认值为 "ask"。
 * 主要 URL 为顶层框架 URL，辅助 URL 未使用。
 */
chrome.contentSettings.notifications