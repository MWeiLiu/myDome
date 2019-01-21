/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-21 14:12:07 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-21 16:13:50
 */

chrome.windows.getCurrent(function (currentWindow) {
    //获取有指定属性的标签，为空获取全部标签
    chrome.tabs.query({
        active: true,
        windowId: currentWindow.id
    }, function (activeTabs) {
        console.log("TabId:" + activeTabs[0].id);
        // console.log(chrome.extension.getURL("assets/js/sendlink.js"))
        //执行注入，第一个参数表示向哪个标签注入
        //第二个参数是一个option对象，file表示要注入的文件，也可以是code
        //是code时，对应的值为要执行的js脚本内容，如：code: "alert(1);"
        //allFrames表示如果页面中有iframe，是否也向iframe中注入脚本
        chrome.tabs.executeScript(activeTabs[0].id, {
            // file: chrome.extension.getURL("assets/js/sendlink.js"),
            // code: `
            // var links = document.getElementsByTagName("script"),
            //     arr = [];
            // [].forEach.call(links, function(el) {
            //     var href = el.src;
            //     if(/[http|https]:\/\//gi.test(href)){
            //     arr.push(href);
            //     }
            // });
            // console.log(arr)
            // arr.sort();`,
            code: `console.log(document)`,
            allFrames: false
        }, result => {
            console.log(result)
        });
        // _ => {
        //     let e = chrome.runtime.lastError;
        //     if (e !== undefined) {
        //         console.log(tabId, _, e);
        //     }
    });
});