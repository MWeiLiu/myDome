var http = require("http");
var url = require("url");
var fs = require("fs");

var host = '127.0.0.1';
var port = 8888;
 
function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url);
    
        route(pathname, response);
    
        // response.writeHead(200, {"Content-Type": "text/plain"});
        // response.write("Hello World");
        // response.end();
    
    }
    http.createServer(onRequest).listen(port, host);
    console.log("Server has started.");
}
 
exports.start = start;