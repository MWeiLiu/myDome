/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-18 12:18:07 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-18 14:41:35
 */

/**
 * chrome.alarms
 * 
 * 使用 chrome.alarms API 安排代码周期性地运行或者在将来的指定时间运行。
 * 
 * 权限："permissions":["alarms"]
 */

//创建定时器
chrome.alarms.create('my_alarms', {
    periodInMinutes: 1
});

//获取指定定时器的有关详情。
// chrome.alarms.create(string name, object alarmInfo)
chrome.alarms.get('my_alarms', function (alarms) {
    // typeof alarms == object
    console.log(alarms);
})

//获取包含所有定时器的数组。
// chrome.alarms.get(string name, function callback)
chrome.alarms.getAll(function (alarms) {
    // typeof alarms == array
    console.log(alarms);
})

//清除指定名称的定时器。
// chrome.alarms.clear(string name, function callback)
chrome.alarms.clear('my_alarms', function (alarms) {
    // typeof alarms == boolean
    console.log(alarms);
})

//清除所有定时器。
// chrome.alarms.clearAll(function callback)
chrome.alarms.clear(function (alarms) {
    // typeof alarms == boolean
    console.log(alarms);
})

/** 
 * 事件
 */
chrome.alarms.onAlarm.addListener(function (alarms) {
    console.log(alarms)
})