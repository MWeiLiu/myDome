/**
 * @Author: LiuWei
 * @Description:
 * @Date: Created in 2018/5/15 18:25
 * @Modified By:
 **/

(function (window, $) {
	var options = {
		selectTextParentsNode: null, //选中文字的父层
		selectTextObj: null, //选中文字的对象
		selectNodeType: null, //选中文字的样式标签
		contrastIndex: '',
		editorType: '',
		//获取选中的文字
		_getSelectedText: function () {
			if (getSelection) {
				return {
					getSelection: getSelection(),
					getSelectionToString: getSelection().toString()
				};
			} else if (document.getSelection) {
				return document.getSelection();
			} else if (document.selection) {
				return document.selection.createRange().text;
			} else {
				return "";
			}
		},
		//判断选中文字
		getSelectTextNodeName: function (option) {
			if (!this.selectTextParentsNode) {
				return;
			}
			var parentsText = this.selectTextParentsNode[0].innerHTML,
				thisTextObj = this.selectTextObj;
			console.log(this.selectTextParentsNode)
			console.log(thisTextObj)
			if (this.selectTextObj.getSelection.anchorNode.parentNode) {
				if (parentsText.indexOf(thisTextObj.getSelectionToString) > 0 && this.selectTextObj.getSelection.anchorNode.parentNode.localName != 'p') {
					//文字全部在标签内
					console.log(parentsText.indexOf(thisTextObj.getSelectionToString));
					this.selectButton(option);
				} else {
					//文字不全在标签内
					console.log('none');
					this.selectButton();
				}
			}
		},
		//选中指定按钮
		selectButton: function (option) {

			if (option) {
				var type = option.e.target.localName;
				if (type == 's' || type == 'strike') {
					$('.editorItem a[data-type=S]').css('color', 'red');
				} else if (type == 'u') {
					$('.editorItem a[data-type=U]').css('color', 'red');
				}
			} else {
				$('.editorItem a').css('color', '#000');
			}
		},
		//分割选中的文字
		setText: function () {
			var textArry = [],
				text = this.selectTextObj.getSelectionToString,
				TEXT = this.selectTextParentsNode[0].innerText,
				HTML = this.selectTextParentsNode[0].innerHTML,
				beginIndex = TEXT.indexOf(text),
				contrastText = HTML.substr(beginIndex),
				begin = 0,
				start = false;

			for (var i = 0; i < contrastText.length; i++) {
				if (contrastText[i].indexOf('<') > -1) {
					contrastIndex = i;
					if (start) {
						textArry.push(contrastText.substr(begin, 3) + text.substr(begin, i));
					} else {
						textArry.push(text.substr(begin, i));
						start = true;
					}
					begin += i;
					console.log(i)
					console.log(textArry)
				}
			}
			this.setSelectTextStyle({
				textArry: textArry,
				text: text,
				TEXT: TEXT,
				HTML: HTML
			});

		},
		//给选中文字添加样式
		setSelectTextStyle: function (option) {
			var texyLenArry = [],
				beginIndex = option.TEXT.indexOf(option.text),
				innerHTMLBegin = option.TEXT.substr(0, beginIndex),
				innerHTMLEnd = option.TEXT.substr(beginIndex + option.text.length),
				innerHTML = '';

			for (var i = 0; i < option.textArry.length; i++) {
				texyLenArry.push(option.textArry[i].length);
			}

			for (var j = 0; j < option.textArry.length; j++) {
				if (option.textArry[j].indexOf('<') > -1) {
					option.textArry[j] = option.textArry[j].substr(0, 3) + '<' + options.editorType + '>' + option.textArry[j].substr(3) + '</' + options.editorType + '>';
				} else {
					option.textArry[j] = '<' + options.editorType + '>' + option.textArry[j] + '</' + options.editorType + '>';
				}
			}
			console.log(option.textArry);
			console.log(texyLenArry);

			for (var a = 0; a < texyLenArry.length; a++) {
				innerHTML += option.textArry[a];
			}
			option.innerHTML = innerHTML;
			this.setInnerHTML(option);
		},
		//拼接字符串
		setInnerHTML: function (option) {
			var beginIndex = option.TEXT.indexOf(option.text),
				innerHTMLBegin = option.TEXT.substr(0, beginIndex),
				innerHTMLEnd = option.TEXT.substr(beginIndex + option.text.length);
			
			//..........
			

		}

	}

	$(function () {
		$('body').on({
			mousedown: function (e) {

				//选中文字前先获取该段文字所在的DOM
				options.selectTextParentsNode = $(this);

			},
			mouseup: function (e) {

				//选中文字后获取选中文字信息
				options.selectTextObj = options._getSelectedText();
				console.log(options.selectTextObj)

				options.getSelectTextNodeName({
					e: e
				})

			}
		}, '.qeditor .editor');


		$('.editorItem a').click(function (e) {
			var type = $(this).attr('data-type'),
				originalTestObj = options._getSelectedText();

			options.editorType = type;
			options.setText();
			console.log(e.target.localName)
			console.log(originalTestObj)
			if (type == 'S') {
				document.execCommand('insertHTML', 'false', '<s>' + originalTestObj.getSelectionToString + '</s>');
			} else if (type == 'U') {
				document.execCommand('underline', 'false');
			}

		})
	});
})(window, $)
