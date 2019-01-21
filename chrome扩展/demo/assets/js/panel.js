/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-21 11:27:45 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-21 11:40:21
 */

chrome.devtools.panels.create("My Panel",
    "../images/440_280.jpg",
    "../pages/panel.html",
    function (panel) {
        console.log(panel)
    }
);
chrome.devtools.panels.elements.createSidebarPane("我的侧边栏",
    function (sidebar) {
        // 这里是侧边栏的初始化代码
        sidebar.setObject({
            some_data: "要显示的某些数据"
        });
    });