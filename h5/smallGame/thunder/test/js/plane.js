init.plane = (function (win, doc, $, undefined) {

	var options = {
		/**
		 * 飞机位置信息
		 * @author LiuWei
		 * @param {object} option [[Description]]
		 */
		planeOffset: function(option){
			var $plane = $('.plane'),
				$box = $('.box'),
				offset = {
					top: $plane[0].offsetTop,
					left: $plane[0].offsetLeft
				},
				rate = 2,
				speed = rate * 2;
				
			
			if(option.arrow == 'left'){
				offset.left = offset.left - speed
			}else if(option.arrow == 'up'){
				offset.top = offset.left - speed
			}else if(option.arrow == 'right'){
				offset.left = offset.left + speed
			}else if(option.arrow == 'down'){
				offset.top = offset.left + speed
			}
			
			
			if(offset.top < $box[0].offsetTop){
				console.log('到上边了');
				offset.top = $box[0].offsetTop;
			}else if(offset.top > $box[0].offsetTop + $box.height()){
				console.log('到下边了');
				offset.top = $box[0].offsetTop + $box.height() - $plane.height();
			}else if(offset.left < $box[0].offsetLeft){
				console.log('到左边了');
				offset.left = $box[0].offsetLeft;
			}else if(offset.left > $box[0].offsetLeft + $box.width()){
				console.log('到右边了');
				offset.left = $box[0].offsetLeft + $box.width() - $plane.width();
			}else{
				
			}
			
			option.arrow = '';
			$('.plane').animate({
				top: offset.top,
				left: offset.left
			}, 500);
		}
	}

	$(function () {
		
		$(doc).on({
			keydown: function(e){
				var arrow = '';
				if(e.keyCode == 37){
					arrow = 'left';
				}else if(e.keyCode == 38){
					arrow = 'up';
				}else if(e.keyCode == 39){
					arrow = 'right';
				}else if(e.keyCode == 40){
					arrow = 'down';
				}
				
				options.planeOffset({
					arrow: arrow
				})
			}
		})
	})

	return options

})(window, document, jQuery)
