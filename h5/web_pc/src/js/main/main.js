;(function(){
    require.config({
        baseUrl: "/src/js/",
        paths: {
            'jquery': [
                'cdn/jquery-1.8.3'
            ],
            'common':[
                'common/common'
            ],
            'index':[
                'deps/index'
            ],
            'file':[
                'deps/file'
            ]

        },
        shim: {
            'common':{
                deps:['jquery']
            },
            'index':{
                deps:['common']
            },
            'file':{
                deps:['index']
            }
        }
    });
    require(['jquery','common','index','file'],function() {
      console.log('main onload!') // OK
    });
})();
