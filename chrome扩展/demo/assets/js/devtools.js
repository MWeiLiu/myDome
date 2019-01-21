/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-21 11:27:09 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-21 11:33:38
 */

chrome.devtools.inspectedWindow.eval(
    'jQuery,fn.jquery',
    function (result, isException) {
        console.log(isException);
        console.log(result)
    }
)
chrome.devtools.inspectedWindow.getResources(function (resources) {
    console.log(resources)
})