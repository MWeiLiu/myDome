/*
 * @Author: MWeiLiu 错误
 * @Date: 2019-01-18 11:27:37 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-21 10:52:48
 */

const arry = [{
    title: "The 'webRequest' API cannot be used with event pages.",
    text: "“webrequest”api不能与事件页一起使用。",
    method: "清单文件permissions内有冲突"
}, {
    title: "Uncaught TypeError: Cannot read property 'create' of undefined",
    text: "未捕获的类型错误：无法读取未定义的属性“create”",
    method: "清单文件permissions未设置权限,导致create方法不能使用"
}, {
    title: "The background.page and background.scripts properties cannot be used at the same time.",
    text: "不能同时使用background.page和background.scripts属性。",
    method: "清单文件background有重复设置"
}, {
    title: "Uncaught ReferenceError: bookmarkBar is not defined",
    text: "未捕获引用错误：未定义bookmarkbar",
    method: "添加权限"
}, {
    title: "Uncaught Error: Invalid value for argument 1. Property 'parentId': Expected 'string' but got 'integer'.",
    text: "未捕获错误：参数1的值无效。属性“parentID”：应为“string”，但得到“integer”。",
    method: "parentId type 应该为 string"
}, {
    title: "Error in response to bookmarks.create: ReferenceError: bookmarkBar is not defined",
    text: "响应书签时出错。创建：引用错误：未定义书签栏",
    method: "添加权限"
}, {
    title: "Uncaught Error: Invocation of form bookmarks.getChildren(integer, function) doesn't match definition bookmarks.getChildren(string id, function callback)",
    text: "未捕获错误：表单书签的调用。getchildren（整数，函数）与定义书签不匹配。getchildren（字符串ID，函数回调）",
    method: "书签的id是string"
}, {
    title: "Unchecked runtime.lastError while running bookmarks.getSubTree: Bookmark id is invalid.",
    text: "运行bookmarks.getsubtree时未选中runtime.lasterror:书签ID无效。",
    method: "书签ID无效"
}, {
    title: "Unchecked runtime.lastError while running bookmarks.getSubTree: Can't find bookmark for id.",
    text: "运行bookmarks.getsubtree时未选中runtime.lasterror:找不到ID为的书签。",
    method: "找不到这个书签。"
},{
    title: "Uncaught ReferenceError: ContentSetting is not defined",
    text: "未捕获的引用错误：未定义ContentSetting",
    method: 'chrome.contentSettings.javascript.get || chrome.contentSettings.CookiesContentSetting'
},{
    title: "Unchecked runtime.lastError while running contentSettings.get: The URL '<all_urls>' is invalid",
    text: "运行contentsettings.get时未选中runtime.lasterror:URL“<all_urls>”无效。",
    method: "正确匹配url"
},{
    title: "Unchecked runtime.lastError while running contextMenus.create: Invalid url pattern ''",
    text: "运行ContextMenus.Create时未选中Runtime.LastError:URL模式“”无效",
    method: "指定documentUrlPatterns值"
},{
    title: "Permission '*://*.google.com' is unknown or URL pattern is malformed.",
    text: "权限“*：/*.google.com”未知或url模式不正确。",
    method: "配置文件清单permissions"
},{
    title: "Uncaught TypeError: Cannot read property 'inspectedWindow' of undefined",
    text: '未捕获的类型错误：无法读取未定义的属性“inspectedwindow”'
}]