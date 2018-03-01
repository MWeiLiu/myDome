/*!
 * jQuery JavaScript Library v1.0.1
 * 
 *
 * 刘威
 * 
 * Copyright 2017
 *
 * Date: 2017-05-26T20:40Z  
 */
(function($){
	var methods={
		init:function(options){
			console.log(options);
		},
		update:function(content){
			console.log(content);
		},
		destroy:function(){
			console.log('This is Destroy function');
		},
		mouse:function(){
			var x=0,y=0,l=0,t=0,L=0,T=0;
			mouseDown=function(e){
				x=e.pageX,
				y=e.pageY,
				l=this.offsetLeft,
				t=this.offsetTop,
				L=0,T=0;
				console.log(x)
//				mouseOver(e);
			}
			this.live('mousedown',mouseDown);
			
		},
		zoom:function(){
			console.log('This is Show function');
		}
	};
	$.fn.lvorder=function(method){
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==='object'||!method){
			return methods.init.apply(this,arguments);
		}else{
			$.error('Method['+method+']does not exist on jQuery.lvorder');
		}
	}
})(jQuery)


