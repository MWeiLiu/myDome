__author__ = 'liuWei'

request_url = {
    'host': 'http://la.qcourse.cc',
    # 注册
    'register': {
        'url': '/common/register',
        'type': 'post'
    },
    # 验证邮箱验证码
    'checkEmailCode': {
        'url': '/common/check-email-code',
        'type': 'get'
    },
    # 校验头像/昵称/手机号
    'check': {
        'url': '/common/check',
        'type': 'get'
    },
    # 获取验证码
    'verifyCode': {
        'url': '/common/verify-code',
        'type': 'get'
    },
    # 登录
    'login': {
        'url': '/common/login',
        'type': 'post'
    },
}