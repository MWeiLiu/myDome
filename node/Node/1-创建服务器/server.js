
//使用require指令载入http模块
var http = require('http');

//使用.createServer()方法创建服务器，并用.listen方法绑定8888端口。函数通过request、response参数接受和相应数据
http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/html'});
	
	//写入内容
	response.write("Hello World");
	
	// 发送响应数据 "Hello World"
	response.end();//'Hello World\n'
}).listen(8080);
//createServer() 。这个函数会返回 一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数， 指定这个 HTTP 服务器监听的端口号。 

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8080/');