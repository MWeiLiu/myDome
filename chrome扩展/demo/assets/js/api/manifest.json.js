/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-17 17:35:44 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-17 18:29:14
 * 每一个扩展程序、可安装的网络应用以及主题背景都有一个 JSON 格式的清单文件，名为 manifest.json，提供重要信息。
 */
const json = {
    /**
     * 必选
     */
    "manifest_version": 2,
    "name": "我的扩展程序",
    "version": "版本字符串",

    /**
     * 推荐
     */
    //指定这个扩展保的缺省字符串的子目录：_lcoales。如果扩展有_locales目录，这个字段是必须的。如果没有_locales目录，这个字段是必须不存在的
    "default_locale": "en",
    //描述扩种的一段字符串（不能是html或者其他格式，不能超过132个字符）。这个描述必须对浏览器扩展的管理界面和Chrome Web Store都合适
    "description": "纯文本描述",
    //一个或者多个图标来表示扩展，app，和皮肤。你通常可以提供一个128x128的图标，这个图标将在webstore安装时候使用。扩展需要一个48x48的图标，扩展管理页面需要这个图标。
    "icons": {
        // "16": "icon16.png",
        // "48": "icon48.png",
        // "128": "icon128.png"
    },

    /**
     * 选择某一个（或者无）
     */
    //注册浏览器按钮
    "browser_action": {
        /**
         * 设置图标 String|Object
         */
        // 可选
        "default_icon": {
            // 可选
            "19": "images/icon19.png",
            "38": "images/icon38.png"
        },
        // 可选 设置工具提示
        "default_title": "Google Mail",
        // 可选 点击图标后的弹出内容
        "default_popup": "popup.html"
    },
    "page_action": {},

    /**
     * 可选
     */
    "app": {
        /**
         * 可安装的webapp，包括打包过的app，需要这个字段来指定app需要使用的url。
         * 最重要的是app的启动页面------当用户在点击app的图标后，浏览器将导航到的地方。
         */
    },
    "author": "",
    "automation": "",
    "background": {
        "scripts": ["index.js"],
        // 推荐
        "persistent": false
    },
    "background_page": "",
    "chrome_settings_overrides": {},
    "chrome_ui_overrides": {
        "bookmarks_ui": {
            "remove_bookmark_shortcut": true,
            "remove_button": true
        }
    },
    "chrome_url_overrides": {},
    "commands": "",
    "content_pack": "",
    "content_scripts": [{}],
    "content_security_policy": "策略字符串",
    "converted_from_user_script": "",
    "current_locale": "",
    "devtools_page": "",
    "externally_connectable": {
        "matches": ["*://*.example.com/*"]
    },
    "file_browser_handlers": [],
    //这个扩展的主页 url。扩展的管理界面里面将有一个链接指向这个url。如果你将扩展放在自己的网站上，这个url就很有用了。如果你通过了Extensions Gallery和Chrome Web Store来分发扩展，主页 缺省就是扩展的页面。
    "homepage_url": "http://path/to/homepage",
    "import": "",
    //指定当扩展在允许隐身模式下运行时如何响应
    "incognito": "spanning 或 split",
    "input_components": "",
    "key": "公钥",
    //扩展，app或皮肤需要的chrome的最小版本，如果有这个需要的话。这个字符串的格式和 version字段一样
    "minimum_chrome_version": "版本字符串",
    "nacl_modules": [],
    "oauth2": "",
    "offline_enabled": true,
    "omnibox": {
        "keyword": "aString"
    },
    "optional_permissions": "",
    "options_page": "aFile.html",
    "page_actions": "",
    "permissions": [
        "webRequest",
        "webRequestBlocking",
        // 允许通知
        "notifications"
    ],
    "platforms": "",
    "plugins": [],
    "requirements": {},
    "sandbox": [],
    "script_badge": "",
    "short_name": "短名称",
    "signature": "",
    "spellcheck": "",
    "storage": {
        "managed_schema": "schema.json"
    },
    "system_indicator": "",
    "tts_engine": "",
    "update_url": "http://path/to/updateInfo.xml",
    "web_accessible_resources": []
}