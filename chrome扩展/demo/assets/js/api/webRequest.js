/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-21 12:10:24 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-21 14:00:22
 */

/**
 * chrome.webRequest
 * 
 * 使用 chrome.webRequest API 监控与分析流量，还可以实时地拦截、阻止或修改请求。
 * 
 * "permissions": [
          "webRequest",
          "*://*.google.com/"
        ]
 */

//  描述应用于网络请求事件的过滤器对象。
const RequestFilter = {
    // URL 或 URL 匹配表达式列表，不匹配任何 URL 的请求会被过滤出去。
    urls: [] || '',
    // 请求类型的列表，不匹配任何一种类型的请求会被过滤出去。
    // array of enum of "main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", or "other"
    types: [],
    tableId: integer,
    windowId: integer
}

// 包含 HTTP 标头的数组，每一项标头都通过词典表示，包含 name 属性，以及 value 或 binaryValue 中的某一属性。
const HttpHeaders = []

// 用于在 extraInfoSpec 参数中指定 "blocking" 的事件处理函数的返回值，允许事件处理函数修改网络请求。
const BlockingResponse = {
    // 如果为 true，则取消请求。在 onBeforeRequest 事件中使用，用来阻止请求的发送。
    cancel: boolean,
    // 仅用于 onBeforeRequest 和 onHeadersReceived 事件的返回值。如果设置了该属性，就会阻止原始请求的发送/完成，并重定向至指定的 URL。
    redirectUrl: '',
    // 仅用于 onBeforeSendHeaders 事件的返回值。如果设置了这一属性，请求将改用这些标头发出。
    requestHeaders: HttpHeaders,
    // 仅用于 onHeadersReceived 事件的返回值。如果设置了这一属性，则假定服务器返回了这些响应标头。
    responseHeaders: HttpHeaders,
    // 仅用于 onAuthRequired 事件的返回值。如果设置了这一属性，发出的请求将使用提供的凭据。
    authCredentials: {
        usename: '',
        password: ''
    }
}

// 包含 URL 请求中上传的数据。
const UploadData = {
    // 包含数据的一份拷贝的 ArrayBuffer。
    bytes: '',
    // 包含文件路径与名称的字符串。
    file: ''
}

// 当网络请求处理函数的行为发生更改时，为了避免缓存导致的不正确处理，需要调用这一函数。这一函数调用比较昂贵，不要经常调用。
chorme.webRequest.handlerBehaviorChanged(function () {
    
})