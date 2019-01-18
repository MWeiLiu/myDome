/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-18 14:38:50 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-18 15:21:14
 */

/**
 * chrome.browsingData
 * 
 * 使用 chrome.browsingData API 从用户的本地配置文件删除浏览数据。 
 * 
 * 权限: "permissions":["browsingData"]
 */

// 确定删除哪些数据的选项。
const RemovalOptions = {
    /**
     * 删除从指定日期开始积累的所有数据，表示为从 1970 年 1 月 1 日午夜开始所经过的毫秒数
     * 如果没有指定，则默认为 0（删除所有内容）。
     */
    since: (new Date()).getTime(),
    /**
     * 一个对象，属性指定哪些来源类型的数据应该被清除。如果没有指定该对象，默认情况下只清除“unprotected”来源
     */
    originTypes: {
        // 普通网站。
        unprotectedWeb: boolean,
        // 安装为托管应用的网站（小心！）。
        protectedWeb: boolean,
        // 用户安装的扩展程序与 Chrome 应用（格外小心！）。
        extension: boolean
    }
}

// 数据类型的集合，未指定的数据类型认为是 false。
const DataTypeSet = {
    // 网站的应用程序缓存。
    appcache: boolean,
    // 浏览器缓存。注意：删除数据时将清除所有缓存内容，并不仅限于您指定的范围。
    cache: boolean,
    // 浏览器的 Cookie。
    cookies: boolean,
    // 浏览器的下载历史记录。
    downloads: boolean,
    // 网站的文件系统数据。
    fileSystems: boolean,
    // 浏览器保存的表单数据。
    formData: boolean,
    // 浏览器的历史记录。
    history: boolean,
    // 网站的 IndexedDB 数据。
    indexedDB: boolean,
    // 网站的本地存储数据。
    localStorage: boolean,
    // 服务器绑定的证书。
    serverBoundCertificates: boolean,
    // 插件数据。
    pluginData: boolean,
    // 保存的密码。
    passwords: boolean,
    // 网站的 WebSQL 数据。
    webSQL: boolean
}

// 报告“清除浏览数据”用户界面中哪些类型的数据当前以选中。注意：该 API 中包含的某些数据类型不能在设置用户界面中访问，而某些用户界面设置控制这里列出的几种数据类型。
chrome.browsingData.settings(function (result) {
    result = {
        // 所有类型都会在结果中存在，已选中并且允许删除的类型值为 true，否则为 false。
        DataTypeSet: dataToRemove,
        // 所有类型都会在结果中存在，如果允许删除（例如由企业策略控制）则值为 true，不允许则为 false。
        DataTypeSet: dataRemovalPermitted
    }
})

// 清除储存在用户配置文件中的各种浏览数据。
chrome.browsingData.remove(RemovalOptions, DataTypeSet, function () {});

// 清除网站的应用程序缓存数据。
chrome.browsingData.removeAppcache(RemovalOptions, function () {})

// 清除浏览器缓存。
chrome.browsingData.removeCahe(RemovalOptions, function () {})

// 清除特定时间段内的浏览器 Cookie 与修改过的服务器绑定证书。
chrome.browsingData.removeCookies(RemovalOptions, function () {})

// 清除浏览器中已下载的文件列表（不是已下载的文件本身）。
chrome.browsingData.removeDownloads(RemovalOptions, function () {})

// 清除网站的文件系统数据。
chrome.browsingData.removeFileSystems(RemovalOptions, function () {})

// 清理浏览器保存的表单数据（自动填充）。
chrome.browsingData.removeFormData(RemovalOptions, function () {})

// 清除浏览历史记录。
chrome.browsingData.removeHistory(RemovalOptions, function () {})

// 清除网站的 IndexedDB 数据。
chrome.browsingData.removeIndexedDB(RemovalOptions, function () {})

// 清理网站的本地存储数据。
chrome.browsingData.removeLocalStorage(RemovalOptions, function () {})

// 清除插件数据。
chrome.browsingData.removePluginData(RemovalOptions, function () {})

// 清除浏览器保存的密码。
chrome.browsingData.removePasswords(RemovalOptions, function () {})

// 清除网站的 WebSQL 数据。
chrome.browsingData.removeWebSQL(RemovalOptions, function () {})