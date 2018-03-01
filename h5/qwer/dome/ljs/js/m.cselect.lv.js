

//滚动条事件
function Scroll(minheight,maxheight){
	$(window).scroll(function(){
		if($(window).srcoll>minheight){
			$(".minheight").show();
		}else if($(window).sroll<maxheight){
			$(".maxheight").show();
		}
	});
};

//二级联动
function TwoLevel(){
	$("#select1").change(function(){
		var v1=$(this).val();
		if (v1=="男"){
			$("#select2").html("<ooption>成男</option><ooption>少侠</option>");
		}else{
			$("#select2").html("<ooption>成女</option><ooption>萝莉</option>");
		}
	});
}
	


//数组分隔
function Array(Array){
	
}

//数组去重
function reArr(obj){
	for(var i=0;i<obj.length;i++){
		for(var j=i+1;j<obj.length;j++){
			if(arr[i]==arr[j]){
				obj.splice(j,1);
				j--;
			}
		}
	}
	return obj;
}

 //获取数组中所有字段=值的记录   数组 值 字段
function getmylist(data, id, idkey) {
    var temp = [];
    for (var di in data) {
        var datai = data[di];
        if (datai[idkey] == id) {
            temp.push(datai);
        }
    }
    return temp;
};

//树渲染
function tree(data, pid, template, idkey, pidkey, deep) {
    var $ul = $("<ul class='nav" + (deep || 1) + "'></ul>");
    var hasChildren = false;
    for (var di in data) {
        var datai = data[di];
        if (datai[pidkey] == pid && datai[idkey] != pid) {//如果父层相等 并且不是他自己
            var $row = $(zjs.renderRow(datai, template));
            $row.append(zjs.tree(data, datai[idkey], template, idkey, pidkey, (deep || 1) + 1));
            $ul.append($row);
            hasChildren = true;
        }
    }
    if (hasChildren) {
        return $ul;
    } else {
        return "";
    }
};

//cookie
//写cookies√
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();//escape将参数值进行编码 expires过期时间
};
//读取cookies√
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");//从完整的cookie字符串中提取要的字段值
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);//unescape反编码
    else return null;
};
//删除cookies√
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = zjs.getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

//获取金钱的中文金额描述 比如1200.00 壹仟贰佰元整√
function getmoney(num) {
    var strOutput = "",
    strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += "00";
    var intPos = num.indexOf('.');
    if (intPos >= 0) {
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    }
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i = 0; i < num.length; i++) {
        strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
    }
    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")
};

//登录√
function fnLogin(){
//长度必须在6~20位之间
//开头不能为数字
//只能包含小写字母和数字
//数字：48~57
//小写字母：97~122
//innerHTML
	var oUname = $("#uname").val();
	var oUpass = $("#upass").val();
	var isNotError = true;
	if(oUname.length > 20 || oUname.length < 6){
		$("#error_box").html("用户名长度必须在6~20位之间");
		isNotError = false;
		return;
		
	}else if(oUname.charCodeAt(0) >= 48 && oUname.charCodeAt(0) <= 57){
		$("#error_box").html("用户名开头不能为数字");
		isNotError = false;
		return;
	}else{
		for(var i=0; i<oUname.length; i++){
			if((oUname.charCodeAt(i) > 122 || oUname.charCodeAt(i) < 97) && (oUname.charCodeAt(i) > 57 || oUname.charCodeAt(i) < 48)){
				$("#error_box").html("用户名只能包含小写字母和数字");
				isNotError = false;
				return;
			}
		}
	}
	if(oUpass.length > 20 || oUpass.length < 6){
		$("#error_box").html("密码长度必须在6~20位之间");
		isNotError = false;
		return;
	}
	$("#error_box").html("登录成功");
}

//轮播图

            function Carousel(json){
                this.box = json.box;
                this.advertBox = json.advertBox;
                this.prevBtn = json.prevBtn;
                this.nextBtn = json.nextBtn;
                this.anchor = json.anchor;
                this.active = json.active;
                this.move = json.move || 'level';
                this.time = json.time || '6000';
                this.timmer = null;
                // console.log(json.advertUl)
                if(json.advertUl){
                    this.advUl = this.advertBox.find('.'+json.advertUl);
                    this.advLi = this.advertBox.find('.'+json.advertLi);
                    // console.log(this.advLi.length)
                }else{
                    this.advUl = this.advertBox.find("ul");
                    this.advLi = this.advertBox.find("li");
                }


                var oLi = this.advLi.eq(0).clone(true);
                this.advUl.append(oLi);

                if(json.advertLi){
                    this.advLi = this.advertBox.find('.'+json.advertLi);
                }else{
                    this.advLi = this.advertBox.find("li");
                }

                this.width = this.advLi.eq(0).width();
                this.height = this.advLi.eq(0).height();
                this.advLength = this.advLi.length;
                this.adWidthAll = this.width * this.advLength;
                this.adHeightAll = this.height * this.advLength;
                // console.log(this.advLength)
                this.ran = json.ran || false;
                var ran = parseInt(Math.random()*this.advLength);
                if(this.ran){
                    this.iNow = ran;
                }else{
                    this.iNow = -1;
                }
            }

            Carousel.prototype.moveT = function(){
                var that = this;
                if(that.iNow >  that.advLength-1){
                    that.iNow=0;
                    if(that.move == 'level'){
                        that.advUl.css('left', '0px');
                    }else if(that.move == 'vertical'){
                        that.advUl.css('top', '0px');
                    }
                    clearInterval(that.timmer);
                    Carousel.prototype.move.call(that);
                    that.timmer = setInterval(function(){
                        Carousel.prototype.move.call(that);
                    },this.time);
                    return false;
                }
            };
            Carousel.prototype.move = function(){
                var that = this;
                that.iNow ++ ;
                if(that.iNow == that.advLength-1){
                    that.anchor.eq(0).addClass(that.active).siblings().removeClass(that.active);
                }else{
                    that.anchor.eq(that.iNow).addClass(that.active).siblings().removeClass(that.active);
                }
                Carousel.prototype.moveT.call(that);
                if(that.move == 'level'){
                    that.advUl.animate({left:(- that.width * that.iNow) + 'px'},100);
                }else if(that.move == 'vertical'){
                    that.advUl.animate({top:(- that.height * that.iNow) + 'px'},100);
                }
            };
            Carousel.prototype.moveAction = function(){
                var that = this;
                clearInterval(that.timmer);
                if(that.move == 'level'){
                    that.advUl.css({
                        width:that.adWidthAll+'px'
                    });
                }else if(that.move == 'vertical'){
                    that.advUl.css({
                        height:that.adHeightAll+'px'
                    });
                }
                that.timmer = setInterval(function(){
                    Carousel.prototype.move.call(that);
                },this.time);

            };
            Carousel.prototype.mover = function(){
                var that = this;
                that.box.off('mouseenter').on('mouseenter',function(){
                    clearInterval(that.timmer);
                });
                that.box.off('mouseleave').on('mouseleave',function(){
                    Carousel.prototype.moveAction.call(that)
                });
            };
            Carousel.prototype.btnMove = function(){
                var that = this;
                clearInterval(that.timmer);
                that.anchor.eq(that.iNow).addClass(that.active).siblings().removeClass(that.active);
                if(that.move == 'level'){
                    that.advUl.css('left', -that.iNow*that.width + 'px');
                }else if(that.move == 'vertical'){
                    that.advUl.css('top',-that.iNow*that.height + 'px');
                }
            };
            Carousel.prototype.anchorBtn = function(){
                var that = this;
                that.anchor.each(function(i,e){
                    $(this).off('click').on('click',function(){
                        that.iNow=i;
                        Carousel.prototype.btnMove.call(that);
                    });
                });
            };
            Carousel.prototype.nextBtn = function(){
                var that = this;
                that.nextBtn.off('click').on('click',function(){
                    that.iNow++;
                    if(that.iNow >  that.advLength-2){
                        that.iNow=0;
                    }
                    Carousel.prototype.btnMove.call(that);
                });
            };
            Carousel.prototype.prevBtn = function(){
                var that = this;
                that.prevBtn.off('click').on('click',function(){
                    that.iNow--;
                    if(that.iNow < 0){
                        that.iNow=that.advLength-2;
                    }
                    Carousel.prototype.btnMove.call(that);
                });
            };
            Carousel.prototype.action = function(){
                var that = this;
                Carousel.prototype.move.call(that);
                Carousel.prototype.moveAction.call(that);
                Carousel.prototype.anchorBtn.call(that);
                Carousel.prototype.mover.call(that);
                that.nextBtn && Carousel.prototype.nextBtn.call(that);
                that.prevBtn && Carousel.prototype.prevBtn.call(that);
            };
           /*
<div class='整个轮播的父级盒子'>
	<div class='轮播广告内容盒子'>
		<ul class='轮播广告内容盒子ul'>
			<li class='轮播广告内容盒子Li'></li>
		</ul>	
	</div>
	<div class='向左点击按钮'></div>
	<div class='向右点击按钮'></div>
	<div class='底部btn'>
		<ul class=''>
			<li></li>
		</ul>
	</div>
</div>
             轮播广告内容盒子    advertBox
             轮播广告内容盒子ul    advertUl
             轮播广告内容盒子Li    advertLi
             盒子内部的节点是    ul  li
             向左点击按钮		leftArrow
             向右点击按钮		rightArrow
             底部btn				anchor
             选中状态的class     active
             默认iNow			iNow
             move  运动方式  vertical level
             time 间隔时间
             整个轮播的父级盒子   BOX
             */
            var carousel3 = new Carousel({
                advertBox : $('.advertBox'),
                advertUl : 'advertUl',
                advertLi : 'advertLi',
                anchor : $('.dot .dot-ls li'),
                active : 'active',
                box : $('.hot-wrap'),
                prevBtn:$('leftArrow'),
                nextBtn:$('rightArrow'),
                ran : false
            });
            carousel3.action();



(function($) {
	
	//全文检索√
    $.expr[":"].Contains = function(a, i, m) {
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };
    function filterList(header, list) {
        var form = $("<form>").attr({
            "class":"filterform",
            action:"#"
        }), input = $("<input>").attr({
            "class":"filterinput",
            type:"text"
        });
        $(form).append(input).appendTo(header);
        $(input).change(function() {
            var filter = $(this).val();
            if (filter) {
                $matches = $(list).find("td:Contains(" + filter + ")").parent();
                $("tr", list).not($matches).slideUp();
                $matches.slideDown();
            } else {
                $(list).find("tr").slideDown();
            }
            return false;
        }).keyup(function() {
            $(this).change();
        });
    }
    $(function() {
        filterList($("#form"), $("#demo-list"));
    });
})(jQuery);	





