/*
 * @Author: MWeiLiu 
 * @Date: 2019-01-03 10:32:28 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2019-01-03 21:04:27
 */
(function (doc, win) {
    var is_touch_device = ('ontouchstart' in document.documentElement || 'onmsgesturechange' in window);
    var docEl = doc.documentElement || doc.body,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth || win.innerWidth;
            if (!clientWidth) return;
            if (clientWidth <= 768) {
                docEl.style.fontSize = '76px';
            } else if (clientWidth > 768 && clientWidth <= 1024) {
                docEl.style.fontSize = '70px';
            } else if (clientWidth > 1024 && clientWidth <= 1366) {
                docEl.style.fontSize = '76px';
            } else if (clientWidth > 1366 && clientWidth <= 1880) {
                docEl.style.fontSize = '86px';
            } else if (clientWidth > 1880 && clientWidth <= 1920) {
                docEl.style.fontSize = '100px';
            } else if (clientWidth > 1920) {
                docEl.style.fontSize = '110px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
            }
        };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
