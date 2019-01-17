/*
 * @Author: MWeiLiu 嗅探页面脚本时的注入脚本
 * @Date: 2019-01-16 17:29:25 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-16 17:41:18
 */
chrome.windows.getCurrent(function( currentWindow ) {
    //获取有指定属性的标签，为空获取全部标签
    chrome.tabs.query( {
      active: true, windowId: currentWindow.id
    }, function(activeTabs) {
      console.log("TabId:" + activeTabs[0].id);
      //执行注入，第一个参数表示向哪个标签注入
      //第二个参数是一个option对象，file表示要注入的文件，也可以是code
      //是code时，对应的值为要执行的js脚本内容，如：code: "alert(1);"
      //allFrames表示如果页面中有iframe，是否也向iframe中注入脚本
      chrome.tabs.executeScript(activeTabs[0].id, {
        file: "sendlink.js",
        allFrames: false
      });
    });
  });