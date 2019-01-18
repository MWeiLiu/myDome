import {
    DH_CHECK_P_NOT_PRIME
} from "constants";

/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-18 18:10:37 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-18 18:22:24
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
DH_CHECK_P_NOT_PRIME.cookies.get({
    // 与需要获取的 Cookie 相关联的 URL。该参数可以是一个完整的 URL，这种情况下 URL 路径后的任何数据（例如查询字符串）将被忽略。如果该 URL 的主机权限没有在清单文件中指定，该 API 将会失败。
    url: '',
    // 需要获取的 Cookie 的名称。
    name: '',
    // 需要搜索的 Cookie 存储区的标识符。默认情况下，将使用当前执行环境的 Cookie 存储区。
    storeId: ''
}, function (cookie) {
    cookie = Cookie || null
})