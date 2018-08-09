
var input = document.getElementById("name");
var conn = document.getElementById("conn");
var close = document.getElementById("close");
var mess = document.getElementById("mess");
var value1 = document.getElementById("value1");
var pattern = /^[\u4e00-\u9fa5]{2,10}$/;
close.disabled = true;
if (window.WebSocket) {
    conn.onclick = function () {
        if (!pattern.test(input.value)) {
            alert("名称不能为空且必须为中文");
            return;
        }
        var ws = new WebSocket('ws://127.0.0.1:8888');
        conn.disabled = true;
        close.disabled = false;
        ws.onopen = function (e) {
            console.log("连接服务器成功");
            ws.send(input.value);
            input.setAttribute("readOnly", 'true');
            value1.setAttribute("readOnly", 'true');
        }
        ws.onmessage = function (e) {
            value1.removeAttribute("readOnly");
            var time = new Date();
            mess.innerHTML += time.toUTCString() + ":" + e.data + "<br>";
            document.getElementById("send").onclick = function (e) {
                ws.send(input.value + "说:" + value1.value);
                value1.value = " ";
            }
            document.onkeydown = function (e) {
                e = e || window.event;
                if (e.keyCode == 13) {
                    document.getElementById("send").onclick();
                    return false;
                }
            }
        }
        ws.onclose = function (e) {
            console.log("服务器关闭");;
            var time = new Date();
            mess.innerHTML += time.toUTCString() + ":服务器关闭";
        }
        ws.onerror = function () {
            console.log("连接出错");
            var time = new Date();
            mess.innerHTML += time.toUTCString() + ":连接出错";
        }

        close.onclick = function () {
            ws.onclose();
            ws.send(input.value + 'close' + "了连接");
            input.removeAttribute("readOnly");
            conn.disabled = false;
            close.disabled = true;
        }
    }
}