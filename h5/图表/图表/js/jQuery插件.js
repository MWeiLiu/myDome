//(function ($) {
//	var methods = {
//		init: function (options) {
//		// this
//		},
//		show: function () {
//		// is
//		},
//		hide: function () {
//		// good
//		},
//		update: function (content) {
//		// !!!
//		}
//	};
//	
//	$.fn.tooltip = function (method) {
//		// 方法调用
//		if(methods[method]){
//			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
//		}else if(typeof method === 'object' || !method) {
//			return methods.init.apply(this, arguments);
//		}else{
//			$.error('Method' + method + 'does not exist on jQuery.tooltip');
//		}
//	};
//})(jQuery);
////调用init方法
//$('div').tooltip();
////调用init方法
//$('div').tooltip({foo:'bar'});
//// 调用hide方法 
//$('div').tooltip('hide');
////调用Update方法 
//$('div').tooltip('update','This is the new tooltip content!');


//(function($){
//	$.fn.tooltip = function (options) {
//		//创建一些默认值，拓展任何被提供的选项
//		var settings = $.extend({'location':'top','background-color':'blue'},options);
//		return this.each(function () {
//			// Tooltip插件代码
//		});
//	};
//})(jQuery);
//$('div').tooltip({'location':'left'});


//(function ($) {
//	$.fn.lockDimensions=function(type){
//		return this.each(function(){
//			var $this=$(this);
//			if (!type||type=='width'){
//				$this.width($this.width());
//			}
//			if (!type||type=='height'){
//				$this.height($this.height());
//			}
//		});
//	};
//})(jQuery);
//$('div').lockDimensions('width').CSS('color','red');






