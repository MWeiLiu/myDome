init.a = (function (win, doc, $, undefined) {

	var options = {
		aa: '你点的是',
		aaa: function (text) {
			var c = this.aa + (text || 'a标签')
			win.alert(c)
		},
		ccc: function () {
			this.aaa()
		}
	}

	$(function () {
		$('body').on('click', 'a', function () {
			options.ccc();
		})
	})

	return options

})(window, document, jQuery)
