__author__ = 'liuWei'

from pip._vendor import requests

class login:

    header = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Content-Length": "33",
        "Content-Type": '',
        "Cookie": '',
        "Host": "www.qcourse.com",
        "Origin": "https://www.qcourse.com",
        "Referer": "https://www.qcourse.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36"
    }

    cookie = ''

    def getVerifyCode():
        param = {'param': '1417053870@qq.com', 'wmax': '130'}

        url = 'https://www.qcourse.com/user/get-verify-code'

        r = requests.get(url, params=param, verify=False)

        code = r.json()['data']['code']

        login.cookie = r.cookies

        # RequestsCookieJar 转 json
        ck_dict = requests.utils.dict_from_cookiejar(login.cookie)

        print(ck_dict)

        headers = r.headers

        login.header['Content-Type'] = headers['Content-Type']
        login.header['Cookie'] = 'PHPSESSID=' + ck_dict['PHPSESSID']

        print(headers)

        data = {
            'code': code
        }

        return data

        # print(json.loads(Data))


    def toLogin():
        # 邮箱登录

        data = login.getVerifyCode()

        param = {'type': '1', 'email': '1417053870@qq.com', 'password': '123456', 'checkcode': data['code']}

        url = 'https://www.qcourse.com/user/login'

        print(login.header)

        r = requests.post(url, params = param, verify = False)

        Data = r.json()

        print('====')
        print(Data)

    def user():
        # 登录状态

        param = {'uid': '100000052', 'token': 'NDY5YTc0NJYyZTBlNZAyMThLNmUzYME5NzJhNzI1Zjc='}

        url = 'https://api.qcourse.com/login'

        r = requests.post(url, params=param, verify=False)

        Data = r.cookies

        print(type(Data))

        # RequestsCookieJar 转 json
        ck_dict = requests.utils.dict_from_cookiejar(Data)

        print(ck_dict)

        # json 转 RequestsCookieJar
        # ck_jar = requests.utils.cookiejar_from_dict(ck_dict)
        #
        # print(ck_jar)


    def info():
        # 用户信息

        param = {}

        url = 'https://www.qcourse.com/user/info'

        r = requests.post(url, params=param, verify=False)

        Data = r.json()

        print(Data)



