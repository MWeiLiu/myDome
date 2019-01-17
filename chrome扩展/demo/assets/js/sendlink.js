/*
 * @Author: MWeiLiu 嗅探页面脚本时的注入脚本
 * @Date: 2019-01-16 17:29:25 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-17 16:14:56
 */
var links = document.getElementsByTagName("script"),
  arr = [];
[].forEach.call(links, function (el) {
  var href = el.src;
  if (/[http|https]:\/\//gi.test(href)) {
    arr.push(href);
  }
});
arr.sort();
//向拓展发送消息，这里就涉及到了消息通讯
chrome.extension.sendMessage(arr);