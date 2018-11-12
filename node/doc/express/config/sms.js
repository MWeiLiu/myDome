var http = require('http');
var querystring = require('querystring');

function SmsCode() {
    //发短信 
    this.send = function (req0, res0) {
        var code = "3212";
        var txt = "您的验证码是：" + code + "。请不要把验证码泄露给其他人。如非本人操作，可不用理会！";
        var data = {
            account: 'myaccount',
            password: "mypwd",
            mobile: "13691511467",
            content: txt
        };
        data = querystring.stringify(data);
        console.log(data);
        // {
        //     "date": "Mon, 17 Sep 2018 09:42:57 GMT",
        //     "content-type": "text/html; charset=utf-8",
        //     "transfer-encoding": "chunked",
        //     "connection": "close",
        //     "set-cookie": ["__cfduid=d3c679ff96f3651aacdf9e0e1f36757dc1537177377; expires=Tue, 17-Sep-19 09:42:57 GMT; path=/; domain=.106jiekou.com; HttpOnly"],
        //     "x-powered-by": "ASP.NET",
        //     "x-aspnet-version": "4.0.30319",
        //     "cache-control": "private",
        //     "server": "yunjiasu-nginx",
        //     "cf-ray": "45baa031d63b48b3-TNA"
        // }
        var opt = {
            method: "POST",
            host: "sms.106jiekou.com", //可以用域名,ip地址 
            port: 80,
            path: "/utf8/sms.aspx",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
        var req = http.request(opt, function (res) {
            console.log('0')
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });
        console.log('1')
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });
        console.log('2')
        req.write(data); //把请求发出去 
        console.log('3')
        req.end();
    };
    //验证码是否正确 
    this.verify = function (req, res) {}
}

module.exports = SmsCode;