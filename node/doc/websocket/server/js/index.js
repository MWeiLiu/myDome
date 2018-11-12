//node --inspect-brk=0.0.0.0:8080 .\server\js\index.js
var ws = require("nodejs-websocket");
console.log("开始建立连接...");
var str1 = null;
var a = [];
var server = ws.createServer(function (conn) {
    conn.on('text', function (str) {
        if(str === 'Liu'){
            str1 = conn
        }

        // if (a.length == 0) {
        //     a.push(str);
        // } else {
        //     var istrue = true;
        //     for (var i = 0; i < a.length; i++) {
        //         if (a[i] == str) {
        //             istrue = false;
        //             break;
        //         }
        //     }
        //     if (istrue) {
        //         a.push(str);
        //     }
        // }
        
        if(str1){
            console.log(str1.frameBuffer)
            
            str1.sendText(str);
            
            if (str.indexOf('close') >= 0) {
                str1 = null
            }
        }
    })

    conn.on("close", function (code, reason) {
        console.log("关闭连接");
    })
    conn.on("error", function (code, reason) {
        console.log("异常关闭");
    });
}).listen(8888);
console.log("websocket连接完毕")