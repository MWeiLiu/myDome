/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-18 15:23:38 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-18 15:37:52
 */

/**
 * chrome.commands
 * 
 * 使用命令 API 添加快捷键，以便触发扩展程序中的操作，例如打开浏览器按钮或向扩展程序发送命令。 
 * 
 * 权限："commands": {}
 * 
 * 必须将 manifest_version（清单文件版本）至少设置为 2 才能使用该 API。
 */

//返回当前扩展程序注册的所有扩展程序命令以及它们的快捷键（如果处于活动状态的话）。
chrome.commands.getAll(function (Command) {
    Command = {
        name: '扩展程序命令的名称。',
        description: '扩展程序命令的描述。',
        shortcut: '当前用于该命令的快捷键，或者如果不活动的话则为空。'
    }
})

// 当注册的命令通过快捷键激活时产生。
chrome.onCommand.addListener(function (Command) {})