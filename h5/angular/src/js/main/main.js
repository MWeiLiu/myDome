;(function(){
	var project_version;
	var getAttribute_project_version = document.body.getAttribute("project_version");
	if(getAttribute_project_version){
		project_version =  document.body.getAttribute("project_version");
	}else if(document.body.project_version){
		project_version =  document.body.project_version;
	}
    //将配置信息传给一个模块
	require.config({
        //查找所有模块的根路径，所有requirejs基于这个来寻找依赖模块，如果未用，则用data-main
		baseUrl: ".",
        //映射不直接放置于baseUrl下的模块名，起始位置相对于baseUrl
		paths: {
			'jquery': [
				'src/js/cdn/jquery-1.8.3.min'
			],
			'angular': [
				'src/js/cdn/angular-1.4.0.min'
			],
			'angular-ui-router': [
				'src/js/cdn/angular-ui-router'
			],
			'common': [
				'src/js/common/common-0.0.0'
			],
			'incommon': [
				'src/js/common/incommon-0.0.0'
			],
			'p': 'src/js/deps/'+project_version
		},
        //声明依赖关系，指定要加载的一个依赖数组
		shim: {
			'angular' : {
			deps:['jquery']
			},
			'angular-ui-router' : {
			deps:['angular']
			},
			'common' : {
			deps:['angular-ui-router']
			},
			incommon : {
			deps:['common']
			},
			p : {
			deps:['incommon']
			}
		}
	});
    //加载文件
	require(['jquery','angular','angular-ui-router','common','incommon','p'],function() {
		console.log('main-jq onload!') // OK
	});
})();
