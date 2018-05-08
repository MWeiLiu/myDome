(function($){
	$.fn.G2 = function (options) {
		var settings=$.extend({
			width:300,
			height:300,
			animate:true,
			plotCfg:{
				border:{
					stroke:'red',
					strokeOpacity:0.4,
					lineWidth:1,
					fill:'#ff8800',
					fillOpacity:0.4,
					radius:5
				}
			}
		},options)
		return this.each(function () {
			
		});
	};
})(jQuery);