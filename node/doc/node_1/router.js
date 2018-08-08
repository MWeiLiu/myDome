var fs = require("fs");

function route(pathname, res) {
    console.log(pathname);

    // fs.open('/LiuWei/nodejs/doc/node_1/public/404.html', 'r+', function(err, fd) {
    //     if (err) {
    //         return console.error(err);
    //     }
    //    console.log("文件打开成功！");     
    // });
 
    function showPaper(path,status){
        var content = fs.readFileSync(path);
        res.writeHead(status, { 'Content-Type': 'text/html;charset=utf-8' });
        res.write(content);
        res.end();
    }

    var url = '/doc/dome/practiceDome/node/doc/node_1/public';

    switch(pathname.pathname){
        //'首页'
        case '/':
        case '/index':
            showPaper(url + '/index.html',200);
            break;
        case '/about':
            showPaper(url + '/about.html',200);
            break;
        //'404页'
        default:
            showPaper(url + '/404.html',404);
            break;                            
    }
}
   
  exports.route = route;