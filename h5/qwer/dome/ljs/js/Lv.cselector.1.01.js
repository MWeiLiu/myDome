//简易框架 简易框架中只处理数据的渲染和绑定 其他的都不需要处理 由程序员在每一个模块自行处理

//封装ajax函数
function cmd(paras) {
	var ajaxpara = paras;
	if (!ajaxpara.dataType) {//如果没设置datatype 默认为json
		ajaxpara.dataType = "json";
	}
	//AJAX发起命令
	$.ajax(paras);
};
//获取url参数
function getQueryStr() {
	var qs = {};
	var url = decodeURIComponent(window.location.href);//对url进行反编译
	if (url.indexOf('?') > -1) {
		url = url.substring(url.indexOf('?') + 1);
		var prm = url.split('&');
		for (var p in prm) {
			if (prm[p]) {
				var sp = prm[p].split('=');
				if (sp.length > 1) {
					var spkey = sp[0];
					var spvalue = sp[1];
					qs[spkey] = spvalue;
				}
			}
		}
	}
	return qs;
}
/*单行渲染*/
function renderRow(datai, render) {
	var row = render;//new RegExp是正则表达式替换全局的语法 'g'为全局 为了解决js的替换bug 正常情况下js只能替换第一个
	for (var attr in datai) {
		if (datai[attr] == null)
			datai[attr] = "";
		row = row.replace(new RegExp("{{" + attr + "}}", 'g'), datai[attr]);
	}
	return row;
};
/*数组渲染*/
function render(data, render) {
	var tmp = [];
	for (var i = 0; i < data.length; i++) {
		var datai = data[i];//当前行 
		tmp.push(renderRow(datai, render));
	}
	return (tmp.join(''));
};
//加载表格和表单
function mydocumentReady() {
	$("table[cmd-select],ul[cmd-select],div[cmd-select]").each(function (i, v) {
		var $id = $(v);
		var $tbody = $id.find("tbody").length == 0 ? $id : $id.find("tbody");//如果有tbody就取它的值 否则就存整个值
		var template = $tbody.html();

		if (template.indexOf("lv-src") > -1) {
			template = template.replace(new RegExp("lv-src", "g"), "src");
		}
		$tbody.empty();//清空内容区域

		cmd({
			url: $id.attr("cmd-select"),
			success: function (data) {
				$tbody.html(render(data.datas, template));
			}
		});
	});

	$("form[cmd-select]").each(function (i, v) {
		var $id = $(v);

		var gps = getQueryStr();
		var cmdsubmit = $id.attr("cmd-insert");//默认执行添加命令
		if (gps.id) {
			cmdsubmit = $id.attr("cmd-update"),//如果有id说明是修改，就用修改命令
		    cmd({
		    	url: $id.attr("cmd-select"),
		    	data: gps,
		    	success: function (datai) {
		    		for (var attr in datai) {
		    			$id.find("input#" + attr).val(datai[attr]);//查出来以后将每个字段赋值
		    		}
		    	}
		    });
		}

		$id.find("#submit").click(function () {//保存事件
			var para = {};
			$id.find("input[id]").each(function (ii, iv) {
				para[iv.id] = iv.value;
			});

			cmd({
				url: cmdsubmit,//$id.attr("cmd-insert"),
				data: para,
				success: function (datai) {
					alert("操作成功");
					if ($id.attr("target")) {
						window.location.href = $id.attr("target");
					}
				}
			});
		});
	});
};

$(function () {//dom加载完成后 初始化表单 表格等
	mydocumentReady();//初始化表单和表格
});
