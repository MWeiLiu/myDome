({
    baseUrl: '.',
    paths: {
//		'angular-cookies': 'js/common/angular-cookies.min',
//		'angular-route': 'js/common/angular-route.min',
//		'lspBridgeExtend': 'js/common/lspBridgeExtend',
//		'lib': 'js/common/lib',
//		'underscore': 'js/common/underscore',
//		'dateformat': 'js/common/dateformat',
//		'Utils': 'js/common/Utils',
//		'countdown': 'js/common/countdown',
//		'TouchSlide': 'js/common/TouchSlide.1.1',
//		'drawDoughnutChart': 'js/common/drawDoughnutChart',
//		'indexswipe': 'js/common/swipe',
//		'assbillintrotemp': 'js/deps/assbill/introtemp',
//		'assbillController': 'js/deps/assbill/assbillController',
//		'cashdetailcashController': 'js/deps/cashdetail/cashController',
//		'cashdetailcash': 'js/deps/cashdetail/cash',
//		'indexjc_chart': 'js/deps/index/jc_chart',
//		'indexController': 'js/deps/index/indexController',
//		'indexjc_swipe': 'js/deps/index/jc_swipe',
//		'storememberplus': 'js/deps/storemember/storememberplus',
//		'storememberController': 'js/deps/storemember/storememberController'
    },
	removeCombined: true,//去除合并后的文件
    optimizeCss: 'standard',//css去注释
	findNestedDependencies: true,//二级目录索引
	//需要合并的模块
    modules: [
//        {name: 'js/common/common-0.0.1'},
//        {name: 'js/common/common-JQ-0.0.1'},
//        {name: 'js/deps/assbill/assbill'},
//        {name: 'js/deps/cashdetail/cashdetail'},
//        {name: 'js/deps/index/index'},
//        {name: 'js/deps/storemember/storemember'},
    ],
    fileExclusionRegExp: /^((r|build|gulpfile)\.js)|node_modules|(rev-manifest\.json)|\.git|\.gitignore$/,
    dir: "htdocs"
})
//node r.js -o build.js
