
#import requests
from pip._vendor import requests
import json
import time
import threading
'''
header = {
    "Accept":"application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding":"gzip, deflate, br",
    "Accept-Language":"zh-CN,zh;q=0.9",
    "Connection":"keep-alive",
    "Content-Length":"26",
    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie":"PHPSESSID=4ok2u81vu1mi6co1mi6ubiftq1; token=NGE5ZjcyNJQyNzA3NZQyMTg3MDhjZthkMDIzYzNlNGI=; uid=100000059",
    "Host":"www.qcourse.com",
    "Origin":"https://api.qcourse.com",
    "QCTKA":"NGE5ZjcyNJQyNzA3NZQyMTg3MDhjZthkMDIzYzNlNGI=",
    "Referer":"https://api.qcourse.com/publicity-5901.html",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
}
'''

exec_count = 0

def heart_beat():
    print('');
    print('');
    print('=================================');

    print(time.strftime('%Y-%m-%d %H:%M:%S'));


    '''
    #注册
    payload = {'email':'769421530@qq.com','password':'Lv2955501','checkcode':'83,43'};
    jsonData = json.dumps(payload);
    #jsonHeaders = json.dumps(header);
    r = requests.get('https://www.qcourse.com/user/register', params = payload);
    '''

    '''
    #新建
    payload = {'uid':'100000001'};
    jsonData = json.dumps(payload);
    r = requests.post('https://api.qcourse.com/product-couadd', params = payload);
    print(r.json());
    pid = json.loads(r.json())['data'];
    '''

    '''
    #信息
    #2374 古希腊
    #2649 创业者的海外起家录
    payload = {'uid': '100001234','pid': '2374'};
    jsonData = json.dumps(payload);
    r = requests.get('https://api.qcourse.com/product-info', params = payload);
    print(r.text);
    '''

    '''
    #信息
    payload = {};
    jsonData = json.dumps(payload);
    #课程
    #print('课程');
    #r = requests.get('http://la.qcourse.cc/works-details-5959.html', params = payload);
    #专题
    print('专题');
    r = requests.get('http://la.qcourse.cc/special-details-5961.html', params = payload);
    print(r.text);
    '''
    
    payload={}
    payload = {'action': 'load_down_addr_svip','file_id': '2473499'};
    r = requests.post('https://test.qcourse.cc/apply-list?uid=100000003&plan_id=555', params = payload);
    print(r.json());
    

    #/?m=vod-detail-id-5819.html


    '''
    #修改
    payload = {'pid':pid};
    jsonData = json.dumps(payload);
    r = requests.get('https://api.qcourse.com/product-couupd', params = payload);
    print(r.json());
    '''

    '''
    #公开
    payload = {'pid':'6012'};
    jsonData = json.dumps(payload);
    r = requests.get('https://api.qcourse.com/product-shareinfo', params = payload);
    print(r.json());
    '''

    '''
    payload={}
    payload = {};
    r = requests.post('https://www.qcourse.com/course/6240.html', params = payload);
    print(r.text);
    '''
    print('=================================');

    global exec_count
    exec_count += 1

    if exec_count < 1:
        threading.Timer(1, heart_beat).start()

heart_beat()