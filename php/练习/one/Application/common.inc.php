<?php
/*
include $_SERVER['DOCUMENT_ROOT']."/Application/common.inc.php";
$objConf = $GLOBALS['config'];
*/

if (!isset($GLOBALS['config'])) {
    $db_set_names_key=\PDO::MYSQL_ATTR_INIT_COMMAND;
	$db_attr_errmode = \PDO::ATTR_ERRMODE;
	$db_attr_errmode_val = \PDO::ERRMODE_EXCEPTION;
	
    $config = <<<_EOF_
{
   "default_module": "Front",
   "site": {
              "scheme": "https",
                 "sub": "www",
              "domain": "qcourse.cc",
                 "url": "https://www.qcourse.cc"
   },  
   "db": {
             "dsn": "mysql:charset=UTF8;host=mysql.qcourse.com;port=3306;dbname=www_qcourse_cc",
             "user" : "pptyiyaozg",
             "pass" : "RYc8TE~#",
             "params": {
                         "{$mysql_set_names_key}": "SET NAMES 'UTF8'"
             },
			 "attrs": {
				          "{$db_attr_errmode}": "{$db_attr_errmode_val}"
			 }
			 
   },    
   "session": {
                      "save_path": "127.0.0.1:11212", 
                    "cookie_path": "/", 
                   "save_handler": "memcached",
                  "cookie_domain": ".qcourse.cc",
                 "gc_maxlifetime": "1296000", 
                "cookie_lifetime": "1296000"
   },
   "weixin": {
                 "Site": "https://mp.weixin.qq.com 开发 基本配置",
              "Account": "qc@qcourse.com",
                "APPID": "wx036204f5d1a2bddb",
               "Secret": "198c66eb1a0f9d0f1ef4fc1ec5a6543b"
   },
   "qq": {
                "Site": "http://open.qq.com",
             "Account": "1591556459"             
   },
   "alipay": {
                 "Site": "https://open.alipay.com",
              "Account": "qc@qcourse.cn",
               "status": "sandbox",
              "sandbox": {
                                 "app_id":  "2016080500175385",
                             "notify_url": "https://www.qcourse.com/alipay/order-notify-url",
                             "return_url": "https://www.qcourse.com/alipay/order-return-url",
                             "notify_url_wap": "https://www.qcourse.cc/alipay/alipay-notify-url-wap",
                             "return_url_wap": "https://www.qcourse.cc/alipay/alipay-return-url-wap",
                             "gatewayUrl":  "https://openapi.alipaydev.com/gateway.do",
                 	             "charset": "UTF-8",
		                      "sign_type": "RSA2",
                     "alipay_public_key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0qlCvbMw+S2d7jvo0gd8KOB8HxRsmSxtRDZ/AQcErwN9grOLPJ1avKozKr/6GPhXT2yF0CGYXgT6ZM3E8HMiblNNCCwik5Z9NtxLQlGAveTqMqTjpi3HG6XIdr0CHx038XYOgRDP2XGzPYBS8ahfz5hETILN92WOMP9VlAV8scI+6qS6H+qnxMBSlj2upYz+keqKg2oZt7ibB2EcUlpzKHowHh/b4l0KraTHk2HCIaeUnbmQxYA+w1IWqyvQzCLWuWu9kOebgxIwKvvR+NlDWC+Y+95APtGDBYMo/pMcH/5nuY75plBh+8aTVcCNTfgV+qgp+hm8fp304cmAspGmAQIDAQAB",
                  "merchant_private_key": "MIIEogIBAAKCAQEAm929jVenH0PttuO9rWDg2bWuZOeBHYxLJG2yfuwoj9dJxZnRozUCWwvrh5exCa3m0NlOnyJtN/0CJqb8O2K9dPmZKXOfxjO5RUfetPczZBR52E1j+57PAL7i5+qNAGmEFDQv5lKZkf4n66YcmQobAK2sObPPIlZb5eluZqusi8Ee2AoX6aLgm0U8OPyk78Qm2kwBaPUjiFZXGLyA8kqjIajmFROH0qBq/NiDFzC48cCiE0/JRAs6+SviHpv30MHNiuBOP7Z4OCCb+8tsw8iddK9GQ6flgN1jUTAg3pY1O93jY2R2wuMDVnXmdzwlS2x/Aq8wZdpkVHLsdYOdF5tcowIDAQABAoIBAAdI4s4TVa1BaH/OvxO2XmvucNsocsFlyDFIqzoBYZfvcPQ6TzD4jkahFP3+Wfjg1tPWBDWtzzr5qTsTPOCtqbso2z6zt7j0u+kABemhUBaSWmuAmnatInGfek1qifKF+/VRxxdVrvXC0izSU63XahGrDEyaGck6Dgt90Hod9e+GIXVfGrse8NAuaNPkeNgksAN41IeIhBJNswogl1C/jIXg2omObk6aH7Nh1wWusNuesqO6lu5PcGhrsRJl2X/WCgAdXcMOvN3RgFGwWjmziA5BdK34DeUmOAebc/rx4t4ffly0khqwnf4476wWeCKNz71K3zRIfHBtE/hVq8VfLckCgYEAyp6FIK5Q92vhFUZScQeo8kaELHtsSGEZ9W2v7stktaBQn0AtAj8D1TIECL08PmiNRN/VZmQAGVdBRrz1DppGfA/ml2c6wJsB3SwCYYd69Tw0ROQvSAUr4pV5JY9iDgnJUEtS2Z5zbp3bpsz+oO4Dg09Irl+xkMcdhaqEJ5ReBHUCgYEAxO4AUY+YH0ABMd8VHwtU8d5YbAHBuOa7jxDLbS6ZQ44Zzx0H9ufn8oWVAh9OnUdLabPAXp79HSGIMbsrua7fdWf4+OuqHAc70a83oAAQVL5p4JMlDF/aMMNye2bIr+3ETImS13VHfWqL4c3//CFnyeEmcgwz9ynqeM+1UPxD2bcCgYAiq4lAFFPKYm07RLMqoBLqkeJf8iaPI/5bHo+yHp927J2fAk4xSjMPseU60ZaTXzR9CofrY0UZEPMcdYzBGOjipZ3hXkqRVnS1Maieo54IhGq1Nw5YFnpx5P27zZMLr+UAlkLw9cnurZg+LGmNg+yZ9WEMZVdu3INSseC3HQ4RWQKBgHiyQkG614p3qQPO7VwMjvB6zQjNftT7nYLO0U9GmyrbYhgde+8pLXDnzG7zjzQ4KRFM2R9lJE8BaT7Jr7/rXQvRQLgXgDgTeudGE7qdr2SxG6VHqhJOgSUX9QeK9H9XI9OhEf255KoKbldj8XuvYbRKqUyHDCZ1az7GVyOeqVs7AoGAHrC01tBc6vBWDvW0Pdir73t/K3sowKSXduzfCzfpYZSJgkpQNIAo/W0S6O8rUdJIU/NTlmMJj3UNxfXOVRmNtacUjhrkVXaZqJldVEBEeb0TvPosV4k1c6gHXyf3PzMtCRxTL3uZGzBksNCxM+DwDYGtUNwMP9nXRrlxdIZzVJE="
              },
              "product": {
                               "app_id":  "2017071907818175",
                           "notify_url": "https://www.qcourse.cc/alipay/order-notify-url",
                           "return_url": "https://www.qocurse.cc/alipay/order-return-url",
                           "notify_url_wap": "https://www.qcourse.cc/alipay/alipay-notify-url-wap",
                           "return_url_wap": "https://www.qcourse.cc/alipay/alipay-return-url-wap",
                           "gatewayUrl":  "https://openapi.alipay.com/gateway.do",
                              "charset": "UTF-8",
		                    "sign_type": "RSA2",
                    "alipay_public_key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtc2SjMixFvVe1verEeAGDcEUoUnLNzHSgYG8dAXkH+OfMmHC3FaN9gry9dHqIaJ0Dq5uyzUzzzmD1SdjO2X5avC4oW5bri3+L1d5HjRhRjlLrP5iQ5aHlYJ2eeq3jinWHnLlYibmTFFXWeNna6WsQSH0pXozUZ1ciZXSiEDjIoeOiQUx8z456jGVZZamOMTYxfKO5NYsoMpQkxoQYTTcziVdyXMhXSD278NPCada5vVx9NNNbimZSs5WT91ofvgRDfNJJpQdw1YRtXOi32KcfNd2g7vUPlmJS95HjTUh6b4UmMsG8yYw1EH/BTvxv6Iydb8odZxcZwTv8RjSSB8C0QIDAQAB",
                 "merchant_private_key": "MIIEpQIBAAKCAQEAu7x+K6uj2gTCTUyzZRYQ5EAn4eQc82Ck9Io20qXQI6XUPmiPj/kmLyTNvDpLUrUm1ArRXOzgVchcSVnJ3/AkO1u/L12zRLtMbkxtncYXC+YtXHenFjBOIu1POZfSaHXmgF+XEhG/yDAaCXRDelIrjz0+GFyh30uhWZ+bICtwVSA0vIyvcAFD3dtil8g/Wq/DkGe8g3qY35BoqcLOiKjVPOe16cGWXUebV7gFD9fR1P+fjzS0crrWWg9lyTpqO5wwGq3xB9SNoZ7J8cNg9Ry+4LyxzpignCZAjPJlTiab1a0nPhV0S7VizKdHjr2KBsfdamEFSLtNEV3xlHFiWi8OjwIDAQABAoIBAFe5nLuLWOVnk+PLE4kI5pvB3uEPVvfjETGz5CpKkRgXRTZkZbFBGzasW/a4xrm/LIWpCGwDxFBRb85Wxp59+HBETvIzNrHHU8+2pwIyrlJBHLE4uDsGF3z6pyqiZw+pCCy0fkNTR+qjj4cbbOybuP8V/w4jOwC8tojKrBI8OiGMPb06BvoBvz/GacVjTep0BjjdMb8Iyq2MDZcl5yF+/o23TyNXLCPBdLJG60zNqrgylDrE0C38kdot8Q88YFL8tfBX2u8xiCv0wxyMzTku8E6Nm1BmmDpjv+wJ531U8M9mE/Yp5hfL4seunE+paruk6FyaC/+WCWd5pbs2JN0irwECgYEA6qMdwfDkvAa8+7FSkGjrzLFc+h7OenLXmaLeT6aqeNeUmQlPNYi5hy36u1+0RiyUYjXYaZavbuNrnF1ji59fqmkVzG82NSOqXvkyaIFKM2oXCk0UIYrU3CzMFLnJLhN2tSFUm7i9+wheMuWsa5Gi9Lo7nAXEoU7jTYnD7HcJ4x0CgYEAzNQ4DfbhM5BzY1L02m6sSOMGqHoeQuLEnpUKftIo5LdD5DX+sA2v2OFIaNIrpDgXI9Mh4qTVGjuGAAPvngOEZ+RN81EXVDujxgttCyCpRSGZREd0G0fsDmARSUvmzo7tqC3kMAiEbK+K2lv6bZiXXddy6kBFglFMyZXQPDaK/JsCgYEAodY+SS2xZusy4FuPOiHUOkw/eBlVi2m4wbRvp/qp7E2tpdyg8KjMZqvVG/ZH7nsDIbZH/ZQ8jrx31dMoPP6BSpXOvkIa3o4qDfXNyf0bQ9kx6R3++5+5b9/KJ6V5WLl+EDLcG8hR6Vr9NhfqVAuQnUHyqYvk8unpp+qU4327qRUCgYEAxnzQZRfcW6+bYaC+Df45jdgSV6kfMgm2J0aeiQ72+cxuSfPY/poE0dJd7NXd3KFOKzUqHQtGRslvrQwjY6hc4qBmuWbXiJTSu9POs33PCmLotzXW2aj0o2mM1s5qt7fhrZvrCHD4gqoJkFiZcSLxa8qgXUgzE3ndQ2ueAvuH7AkCgYEAoxziw+XYAIWOnkPPc1qJhuQdNdKsTxfIr42G3m8nRIEpFH8Fr47QIhm8c9eaaOwYdzVJ2dhC1UArQ34u/g6ARMnnXBWpMQzyT9rGKvMeecju2GyxhWw94VtMkO8TUPQMRN5fOj4XNpc1PRwufiwR9rG/AqVva8fPQUtX8mfW5us="
              }
   }, 
   "route_map": [
   ],
   "unauth": [
       "(/front)?/index/index",
       "(/front)?/user/qrcode",
       "(/front)?/user/register",
       "(/front)?/user/login",
       "(/front)?/user/mobile-exists",
       "(/front)?/user/login-mobile",
       "(/front)?/user/login-mobile-code",
       "(/front)?/user/email-exists",
       "(/front)?/user/valid-email",
       "(/front)?/user/send-mail-active-link",
       "(/front)?/user/reset-passwd-email",
       "(/front)?/user/rspasswd",
       "(/front)?/user/weixin-scan",
       "(/front)?/user/weixin-bind",
       "(/front)?/user/qq-bind",
       "(/front)?/qq/outh-callback",
       "(/front)?/weixin",
       "(/front)?/wxpay/notify",
       "(/front)?/wxpay/qrcode",
       "(/front)?/alipay/order-pcc",
       "(/front)?/alipay/order-return-url",
       "(/front)?/alipay/order-notify-url"
   ],
   "unipverify": [
           "(/front)?/user/product"
   ]
}
_EOF_;

    $GLOBALS['config'] = json_decode($config);
    $objConfig = $GLOBALS['config'];
}
