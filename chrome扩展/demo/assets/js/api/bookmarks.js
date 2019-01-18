/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-18 14:03:55 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-18 15:01:34
 */

/**
 * chrome.bookmarks
 * 
 * 书签
 * 使用 chrome.bookmarks API 创建、组织或通过其他方式操纵书签，
 * 另外请参见替代页面，通过它您可以创建一个自定义的书签管理器页面。
 * 
 * 权限: "permissions":["bookmarks"] 
 */

//获得指定的书签树节点。
// idOrIdList 一个字符串或多个字符串组成的数组，指定节点的标识符。
// chrome.bookmarks.get(string or array of string idOrIdList, function callback)
chrome.bookmarks.get(['1', '2'], function (bookmarksTrreNode) {
    console.log(bookmarksTrreNode)

    bookmarksTrreNode = [{
        dateAdded: 1520387680590,
        dateGroupModified: 1547784366817,
        id: "1",
        index: 0,
        parentId: "0",
        title: "书签栏",
    }, {
        dateAdded: 1520387680590,
        dateGroupModified: 1544758225862,
        id: "2",
        index: 1,
        parentId: "0",
        title: "其他书签"
    }]
})

// 获取指定书签树节点的所有子节点。
// chrome.bookmarks.getChildren(string id, function callback)
// 
chrome.bookmarks.getChildren('1', function (bookmarksTrreNode) {
    console.log(bookmarksTrreNode)

    bookmarksTrreNode = [{
        dateAdded: 1520922174627,
        id: "15",
        index: 0,
        parentId: "1",
        title: "百度一下，你就知道",
        url: "https://www.baidu.com/"
    }]
})

//获取最近添加的几个书签。
//numberOfItems	期望返回的最大书签数目。
//chrome.bookmarks.getRecent(integer numberOfItems, function callback)
chrome.bookmarks.getRecent(30, function (bookmarksTrreNode) {
    console.log(bookmarksTrreNode)

    bookmarksTrreNode = [{
        dateAdded: 1547719084583,
        id: "378",
        index: 28,
        parentId: "1",
        title: "丰富的通知 - Google Chrome 扩展程序开发文档（非官方中文版）",
        url: "https://crxdoc-zh.appspot.com/extensions/desktop_notifications"
    }]
})

//获取整个书签树。
// chrome.bookmarks.getTree(function callback)
chrome.bookmarks.getTree(function (bookmarksTrreNode) {
    console.log(bookmarksTrreNode);

    bookmarksTrreNode = [{
        children: [{
            children: [{
                dateAdded: 1520922174627,
                id: "15",
                index: 0,
                parentId: "1",
                title: "百度一下，你就知道",
                url: "https://www.baidu.com/"
            }],
            dateAdded: 1520387680590,
            dateGroupModified: 1547784366817,
            id: "1",
            index: 0,
            parentId: "0",
            title: "书签栏"
        }],
        dateAdded: 1547601349546,
        id: "0",
        title: ""
    }]
})

// 获取从指定节点开始的部分书签树。
// id 要获得的子树的根节点唯一标识符。
// chrome.bookmarks.getSubTree(string id, function callback)
chrome.bookmarks.getSubTree('15', function (bookmarksTrreNode) {
    console.log(bookmarksTrreNode)

    bookmarksTrreNode = [{
        dateAdded: 1520922174627,
        id: "15",
        index: 0,
        parentId: "1",
        title: "百度一下，你就知道",
        url: "https://www.baidu.com/"
    }]
})

// 搜索书签树节点，找出匹配的结果。如果以对象方式指定查询，得到的 BookmarkTreeNodes 匹配所有指定的属性。
// chrome.bookmarks.search(string or object query, function callback => bookmarksTrreNode)
// query	可以指定字符串，包含单词和加上引号的短语，用于匹配书签 URL 和标题。也可以指定对象，其中可以指定 query、url 和 title 属性，返回匹配所有指定属性的书签。

//在指定的上一级文件夹下创建新的书签或文件夹。如果 url 为 null 或者省略，则创建文件夹。
// chrome.bookmarks.create(object bookmark, function callback)
// string	（可选） parentId	默认为“其他书签”文件夹。
// integer	（可选）index	
// string	（可选）title	
// string	（可选）url	
chrome.bookmarks.create({
    'parentId': '1',
    'title': '扩展程序书签'
}, function (newFolder) {
    console.log('已添加文件夹：' + newFolder.title);
    console.log(newFolder)

    newFolder = {
        //该节点创建的时间，表示为自 1970 年 1 月 1 日午夜至今所经过的毫秒数
        dateAdded: 1547784213934,
        dateGroupModified: 1547784213934,
        //节点的唯一标识符。唯一标识符在当前用户配置文件中保证唯一，并且在浏览器重新启动后仍然有效。
        id: "380",
        //该节点在父文件夹中的位置（从 0 开始）。
        index: 30,
        //父节点的标识符（id）。根节点没有此属性。
        parentId: "1",
        //该节点显示的文字。
        title: "扩展程序书签",
        //当用户单击书签时打开的URL。文件夹没有此属性。
        url: ''
    }

    console.log((chrome.bookmarks.BookmarkTreeNode))
})

//将指定的书签树节点移到指定位置。
// chrome.bookmarks.move(string id, object destination, function callback => bookmarksTrreNode)
// destination	
// string	（可选）parentId	
// integer	（可选）index

// 更新书签或文件夹的属性。只需要指定您需要更改的属性，未指定的属性不会更改。注意：目前只支持“title”和“url”属性。
// chrome.bookmarks.update(string id, object changes, function callback => bookmarksTrreNode)
// changes	
// string	（可选）title	
// string	（可选）url

// 删除书签或者空文件夹。
// chrome.bookmarks.remove(string id, function callback)
// callback	（可选）
// 如果您指定了 callback 参数，它应该是一个如下形式的函数：function() {...};

// 删除整个书签文件夹
// chrome.bookmarks.removeTree(string id, function callback)
// callback	（可选）
// 如果您指定了 callback 参数，它应该是一个如下形式的函数：function() {...};

/**
 * 事件
 */

// 当书签或文件夹创建时产生。
chrome.bookmarks.onCreated.addListener(function (id, BookmarkTreeNode) {})

// 一个书签或文件夹更改时发生。注意：目前只有标题和URL更改时会触发这一事件。
chrome.bookmarks.onChanged.addListener(function (id, changeInfo) {})

// 当书签或文件夹移动到另一个父文件夹中时产生。
chrome.bookmarks.onMoved.addListener(function (id, moveInfo) {})

// 文件夹中的子节点在用户界面中调整顺序时产生。调用 move() 不会触发该事件。
chrome.bookmarks.onChildrenReordered.addListener(function (id, reorderInfo) {})

// 开始导入书签时产生。复杂的事件处理函数在这一事件产生后不应该再处理 onCreated 事件，直到 onImportEnded 事件产生，在此过程中其他事件仍然应该立即处理。
chrome.bookmarks.onImportBegan.addListener(function () {})

// 书签导入结束时产生。
chrome.bookmarks.onImportEnded(function () {})