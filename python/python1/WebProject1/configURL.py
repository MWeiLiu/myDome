
#import requests
from pip._vendor import requests
import json
'''
header = {
    "Accept":"application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding":"gzip, deflate, br",
    "Accept-Language":"zh-CN,zh;q=0.9",
    "Connection":"keep-alive",
    "Content-Length":"16",
    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie":"PHPSESSID=t0uu0l7vmbgsprs24uv34qig72; token=NDM5Yjc5NMYyOTBjNZcyMzgYMjhmM2UzMWQ4YmZmYzc%3D; uid=100000303",
    "Host":"www.qcourse.com",
    "Origin":"https://www.qcourse.com",
    "QCTKA":"NGY5YTdlNJIyYzA5NgY1YTFHNjIyZwE4YjY5MGY3NGI%3D",
    "Referer":"https://www.qcourse.com/courseSkuPc.html?pid=1976",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
}
'''
payload = {'pid':'1976'};
jsonData = json.dumps(payload);
#jsonHeaders = json.dumps(header);
r = requests.post('https://www.qcourse.com/user/product-info-nologin', params = jsonData);
print(r.text);