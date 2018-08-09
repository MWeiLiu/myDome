/*
 * author: liu wei
 * createtime: 2018/8/8 20:10
 * description:
 */

(function (window, $) {
    var options = {}

    $(function () {

        var mess = document.getElementById("mess");
        websocket = window.WebSocket || window.MozWebSocket;
        if (websocket) {
            var href = 'ws://47.104.213.34:8888/';
            //var href = 'ws://127.0.0.1:8888/';
            var ws = new WebSocket(href);

            ws.onopen = function (e) {
                console.log("连接服务器成功");
                ws.send("game1");
            }
            ws.onclose = function (e) {
                console.log("服务器关闭");
            }
            ws.onerror = function () {
                console.log("连接出错");
            }

            ws.onmessage = function (e) {
                mess.innerHTML = "连接成功"
                document.querySelector(".kuang").onclick = function (e) {
                    var time = new Date();
                    ws.send(time + "  game1点击了“" + e.target.innerHTML + "”");
                }
            }
        }
    });
})(window, $)