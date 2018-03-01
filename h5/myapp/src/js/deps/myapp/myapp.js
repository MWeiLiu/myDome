

var myexample=angular.module('myexamplenav',['ngRoute']);

myexample.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/xxnav1',{template:'这是nav1页面'})
    .when('/xxnav2',{template:'这是nav2页面'})
    .when('/xxnav3',{template:'这是nav3页面'})
//  .otherwise({redirectTo:'/'});
}]);

myexample.directive('myexample',function(){
	return {
		restrict:'E',
		template:
		'<div ng-controller="myexampleController">'+
		'	<first class="my-example-first-nav">'+
		'		<ul>'+
		'			<li class="firstnavli" ng-repeat="x in myexamplefirstnav">{{x}}</li>'+
		'		</ul>'+
		'	</first>'+
		'	<second class="my-example-second-nav">'+
		'		<ul>'+
		'			<li class="secondnavli" ng-repeat="x in myexamplesecondnav"  ng-click="nav_click($event,$index)" href="#/xx{{x}}">{{x}}</li>'+
		'		</ul>'+
		'	</second>'+
		'	<third class="my-example-third-nav">'+
		'		<div class="my-example-model">'+
		'			<ul ng-repeat="x in myexamplesecondnav">'+
		'				<li ng-repeat="y in myexamplefirstnav" ng-click="navli_click($event,$index)">{{x}}-{{y}}</li>'+
		'			</ul>'+
		'		</div>'+
		'	</third>'+
		'   <fourth class="my-example-fourth-nav">'+
		'		<div ng-view="">'+
		'		</div>'+
		'   </fourth>'+
		'   <fifth class="my-example-fifth-nav">'+
		'		<iframe src="模板/iframecanvas.html">'+
		'   </fifth>'+
		'</div>',
//		scope:{
//			myexamplefirstnav:'=myexamplefirstnav',
//		},
		link:function(scope,element,attrs){
			scope.nav_click=function(e,$index){
				$(".secondnavli").css({"background-color":"#fff"})
				$(".secondnavli").eq($index).css({"background-color":"#448AFF"});
				$(".my-example-model>ul").eq($index).show().siblings().hide();
			},
			scope.navli_click=function(e,$index){
				$(".my-example-fourth-nav").append($(".my-example-model li").eq($index).html()+",");
			}
		}
	}
});

myexample.service('',function(){
	
});

myexample.controller('myexampleController',function($scope){
	$scope.myexamplefirstnav=['nav1','nav2','nav3','nav4','nav5'];
	$scope.myexamplesecondnav=['nav1','nav2','nav3'];
});


