/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-18 18:10:37 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-21 10:15:43
 */

/**
 * chrome.cookies
 * 
 * 使用 chrome.cookies API 查询和修改 Cookie，并在 Cookie 更改时得到通知。 
 * 
 * 权限: "permissions": [
          "cookies",
          "*://*.google.com"
        ]
 */

// 代表一个 HTTP Cookie 的有关信息。
const Cookie = {
    // Cookie 的名称。
    name: '',
    // Cookie 的值。
    value: '',
    // Cookie 的域名（例如 “www.google.com”、“example.com”）。
    domain: '',
    // 如果 Cookie 仅用于指定主机则为 true（即请求的主机必须精确匹配 Cookie 的域名）。
    hostOnly: boolean,
    // Cookie 的路径。
    path: '',
    // 如果 Cookie 被标记为安全的则为 true（即它的范围限定在以 HTTPS 为典型的安全通道内）。
    secure: false,
    // 如果 Cookie 被标记为仅用于 HTTP 则为 true（即客户端脚本不能访问该 Cookie）。
    httpOnly: true,
    // 如果是会话 Cookie 则为 true，与之相对，如果是具有过期日期的持久 Cookie 则为 false。
    session: true,
    // Cookie 的过期日期，表示为自从 UNIX 纪元（1970 年 1 月 1 日午夜）开始所经过的秒数。对于会话 Cookie 省略。
    expirationDate: (new Date()).getTime(),
    // 包含此 Cookie 的 Cookie 存储区标识符，与 getAllCookieStores() 返回的一致。
    storeId: ''
}

// 代表浏览器中的一个 Cookie 存储区。例如隐身窗口使用与非隐身窗口不同的单独的 Cookie 存储区。
const CookieStore = {
    // Cookie 存储区的标识符。
    id: '',
    // 共享这一 Cookie 存储区的所有浏览器标签页的标识符。
    tabIds: []
}

// 获得单个 Cookie 的有关信息。如果给定的 URL 具有多个名称相同的 Cookie，将返回路径最长的一个。如果路径长度相同，将返回创建时间最早的一个。
// chrome.cookies.get(object details, function callback => Cookie)
chrome.cookies.get({
    // 与需要获取的 Cookie 相关联的 URL。该参数可以是一个完整的 URL，这种情况下 URL 路径后的任何数据（例如查询字符串）将被忽略。如果该 URL 的主机权限没有在清单文件中指定，该 API 将会失败。
    url: '',
    // 需要获取的 Cookie 的名称。
    name: '',
    // 需要搜索的 Cookie 存储区的标识符。默认情况下，将使用当前执行环境的 Cookie 存储区。
    storeId: ''
}, function (cookie) {
    cookie = [{
        domain: ".www.17k.com",
        expirationDate: 1579164854,
        hostOnly: false,
        httpOnly: false,
        name: "R_fontsize",
        path: "/chapter",
        sameSite: "no_restriction",
        secure: false,
        session: false,
        storeId: "0",
        value: "1"
    }]
})

// 返回一个 Cookie 存储区中符合给定条件的所有 Cookie。返回的 Cookie 将按照路径长度从大到小排序，如果多个 Cookie 的路径长度相等，则创建时间最早的排在最前面。
// chrome.cookies.getAll(object details, function callback)
chrome.cookies.getAll({
    /**
     * 用于筛选出要想获取的 Cookie 的信息。
     */

    // 将返回结果限制为匹配给定 URL 的 Cookie。
    url: '',
    // 通过名称筛选 Cookie。
    name: '',
    // 将返回结果限制为匹配指定域名或者是指定域名的子域名的 Cookie。
    domain: '',
    // 将返回结果限制为路径完全匹配该属性的 Cookie。
    path: '',
    // 根据 Secure（安全）属性筛选 Cookie。
    secure: boolean,
    // 筛选出会话或持久 Cookie。
    session: boolean,
    // 指定从哪一个存储区获取 Cookie。如果省略该属性，则使用当前执行环境的 Cookie 存储区。
    storeId: ''
}, function (cookie) {
    cookie = [{
        domain: ".www.17k.com",
        expirationDate: 1579164854,
        hostOnly: false,
        httpOnly: false,
        name: "R_fontsize",
        path: "/chapter",
        sameSite: "no_restriction",
        secure: false,
        session: false,
        storeId: "0",
        value: "1"
    }]
})

// 用给定的数据设置 Cookie，如果同样的 Cookie 已存在则会覆盖。
// chrome.cookies.set(object details, function callback)
chrome.cookies.set({
    /**
     * 有关要设置的 Cookie 的详情。
     */
    // 与要设置的 Cookie 相关联的请求 URI，它的值会影响到创建的 Cookie 的默认域名和路径。如果这一 URL 的主机权限没有在清单文件中指定，则这一API调用会失败。
    url: '',
    // Cookie 的名称，如果省略的话默认为空。
    name: '',
    // Cookie 的值，如果省略的话默认为空。
    value: '',
    // Cookie 的域名。如果省略的话该 Cookie 仅适用于 URL 中指定的主机。
    domain: '',
    // Cookie 的路径，默认为 url 参数的路径部分。
    path: '',
    // 该 Cookie 是否应该标记为 Secure（安全的），默认为 false。
    secure: false,
    // 该 Cookie 是否应该标记为 HttpOnly（仅用于 HTTP），默认为 false。
    httpOnly: false,
    // Cookie 的过期日期，以自从 UNIX 纪元（1970 年 1 月 1 日午夜）开始所经过的秒数表示。如果省略的话，该 Cookie 仅在会话中有效。
    expirationDate: (new Date()).getTime() / 1000,
    // 要设置的 Cookie 存储区的唯一标识符。默认情况下，Cookie 在当前执行环境的 Cookie 存储区中设置。
    storeId: ''
}, function (cookie) {})

// 根据名称删除 Cookie。
// chrome.cookies.remove(object details, function callback)
chrome.cookies.remove({
    // 与 Cookie 相关联的 URL。如果该 URL 的主机权限没有在清单文件中指定，则这一 API 调用将会失败。
    url: '',
    // 要想删除的 Cookie 名称。
    name: '',
    // Cookie 存储区的标识符。如果未指定，则在当前执行环境的 Cookie 存储区中寻找 Cookie。
    storeId: ''
}, function (details) {
    details = {
        url: '',
        name: '',
        storeId: ''
    }
})

// 列举所有存在的 Cookie 存储区。
//chrome.cookies.getAllCookieStores(function callback)
chrome.cookies.getAllCookiesStores(function (cookiesStores) {
    cookiesStores = CookieStore
})
