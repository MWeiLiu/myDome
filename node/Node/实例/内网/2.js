//配置
var fs = require("fs");
var str='server { '+
    			  '		listen       8080;    '+
    			  '		server_name  localhost;         '+
    			  '		#access_log  logs/host.access.log  main; '+
    			  '				location ~* {             '+
     		  '						add_header Content-Type "application/json";'+
      		  '						root   html;             '+
       		  '								if (!-f $request_filename) {                 '+
        		  '										rewrite ^/(.*)  /$1.json last;'+
        		  '								}             '+
    			  '						index  index.php index.html index.htm;'+
    			  '				}         '+
			  '			error_page 405 =200 http://$host$request_uri;    '+
			  '		}';
var url='/usr/local/etc/nginx/nginx.conf.default';
console.log("准备写入文件");
fs.writeFile(url, str,  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile(url, function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
//地址：localhost:8080