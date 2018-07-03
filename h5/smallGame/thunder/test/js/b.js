init.b = (function (win, doc, $, undefined) {

	var options = {
		bs: function () {
			win.alert(win.init.a.aaa('div标签'))
		}
	}


	$(function () {
		$('body').on('click', '.div', function () {
			options.bs();
		})
	})

	return options

})(window, document, jQuery)
