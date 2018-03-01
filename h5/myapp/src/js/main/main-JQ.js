;(function(){
	var project_version;
	var getAttribute_project_version = document.body.getAttribute("project_version");
	if(getAttribute_project_version){
		project_version =  document.body.getAttribute("project_version");
	}else if(document.body.project_version){
		project_version =  document.body.project_version;
	}
	require.config({
		baseUrl: ".",
		paths: {
			'jquery': [
				'src/js/cdn/jquery-1.8.3.min'
			],
			'a': [
				'src/js/cdn/angular-1.4.0.min',
			],
			'common': [
				'src/js/common/common-0.0.0'
			],
			'incommon': [
				'src/js/common/incommon-0.0.0'
			],
			'p': 'src/js/deps/'+project_version
		},
		shim: {
			'a' : {
			deps:['jquery']
			},
			common : {
			deps:['a']
			},
			incommon : {
			deps:['common']
			},
			p : {
			deps:['incommon']
			}
		}
	});
	require(['jquery','a','common','incommon','p'],function() {
		console.log('main-jq onload!') // OK
	});
})();
