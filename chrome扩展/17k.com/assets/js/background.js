/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-21 14:04:50 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-21 16:05:44
 */
// 监听发送请求
// chrome.webRequest.onBeforeRequest.addListener(
//     function(details) {
//       console.log(details);
//       //拦截到执行资源后，为资源进行重定向
//       //也就是是只要请求的资源匹配拦截规则，就转而执行returnjs.js
//       return {redirectUrl: chrome.extension.getURL("./popup.js")};
//     },
//     {
//       //配置拦截匹配的url，数组里域名下的资源都将被拦截
//       urls: [
//           "*://app.17k.com/chapter/*"
//       ],
//       //拦截的资源类型，在这里只拦截script脚本，也可以拦截image等其他静态资源
//       types: ["script"]
//     },
//     //要执行的操作，这里配置为阻断
//     ["blocking"]
//   );