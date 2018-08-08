__author__ = 'liuWei'

import json

from pip._vendor import requests


class login:

    def getLoginHtml():
        param = {}

        url = 'http://la.qcourse.cc/login'

        r = requests.get(url, params = param, verify = False)

        Data = r.text

        print(Data)

    def getVerifyCode():
        param = {'email': '1417053870@qq.com', 'type': '3'}

        url = 'http://la.qcourse.cc/common/verify-code'

        r = requests.get(url, params = param, verify = False)

        Data = r.json()

        print(Data)
        #print(json.loads(Data))


    def login():
        # 邮箱登录

        param = {'type': '1', 'email': '1417053870@qq.com', 'password': '123456', '_token': '4FfFGFeLXWhLZ1JngbL9D15WTzQQq9lPr3TEmC1J', 'code': '166,17'}

        url = 'http://la.qcourse.cc/common/login'

        r = requests.post(url, params = param, verify = False)

        Data = r.status_code

        print(Data)




