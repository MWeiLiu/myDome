	         
	         //获取url中的参数id
	         var getUrlParam = function(name)
			{
				var reg = new RegExp("(^|&)"+ name +"=([^&]*)");
				var r = window.location.search.substr(1).match(reg);
				if (r!=null) return unescape(r[2]); return null;
			}
		
	         var ab = getUrlParam("id");