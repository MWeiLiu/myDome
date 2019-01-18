/*
 * @Author: MWeiLiu 拓展界面引用的js文件
 * @Date: 2019-01-16 17:28:35 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-18 09:47:25
 */

chrome.windows.getCurrent(function (currentWindow) {
    //获取有指定属性的标签，为空获取全部标签
    chrome.tabs.query({
        active: true,
        windowId: currentWindow.id
    }, function (activeTabs) {
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

chrome.extension.onMessage.addListener(function (links) {
    //处理接收到的links，展现在拓展页面中的DOM里
    console.log(links);
});