// var getApp = getApp();
var common = {
    rootUrl: 'https://www.qcourse.com',
    token: 'NDE5NTc2NJkyYzBiN2UyYTg3MWJmOdBmMGQ4MTZmMDc%3D',
    reg: {
        colorHexReg: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    },
    request: {
        requestData: function (options){
            console.log(options)
            wx.request({
                url: options.url,
                data: options.data || {},
                header: {
                    QCTKA: common.token
                },
                method: options.method || 'POST',
                dataType: 'json',
                success: options.success,
                fail: options.fail || function(){},
            })
        },
        productInfo: function(options){
            options.url = common.rootUrl + '/user/product-info-nologin';
            this.requestData(options);
        }
    },
    fn: {
        //color 16进制转rgb
        hexToRgb: function (sColor){
            if(sColor && common.reg.colorHexReg.test(sColor)){
                if(sColor.length === 4){
                    var sColorNew = "#";
                    for(var i = 1; i < 4; i+=1){
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1)); 
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for(var i = 1; i < 7; i+=2){
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }
                return "rgb(" + sColorChange.join(",") + ")";
            }else{
                return sColor;
            }
        },
        //判断色值127
        escapeColor: function (rgb){
            var rgb = rgb.split('rgb(')[1].split(')')[0].split(','),
                r = parseInt(rgb[0]),
                g = parseInt(rgb[1]),
                b = parseInt(rgb[2]),
                sum = (r + g + b) / 3,
                color = '';

            if(sum >= 127){
                color = '#333';
            }else{
                color = '#fff';
            }
            return color;
        }
    }
}

module.exports = common;