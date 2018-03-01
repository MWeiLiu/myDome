function shijian(){
	var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var week=date.getDay();
	var nowdate=year+"-"+month+"-"+day+" "+weekday[week];
	$(".maintop .nowdate").html(nowdate)
}
zjs.failure={
	"beforerenderrow":function(datai){
		datai.gzyy = zjs.getvals("alarmReason", datai.alarmReason);
        datai.clzt = zjs.getvals("status", datai.status);
	}
}
    		
$(function(){
//	main
	shijian()
	var kg=0;
	var a=0;
	var b=0;
	$(".mainmiddle .lia .liaa").live("click",function(){
		a=$(this).parent(".lia").index()
		if(a!=b){
			kg=0
		}
		b=a;
		if(kg==0){
			$(this).next("ul").stop().slideDown(1000, function () {
	            $(this).next("ul").show();
	        });
	        $(this).next("ul").find("li").eq(0).find("a").addClass("zuo3");
	        $(this).parent().siblings().children("ul").find("a").removeClass("zuo3");
			$(this).parent().siblings().children("ul").hide();
			kg=1;
		}else{
			$(this).next("ul").find("a").removeClass("zuo3");
			$(this).next("ul").stop().slideUp(1000, function () {
	            $(this).next("ul").hide();	            
	        });
	        kg=0;
		}		
	})
	$(".mainmiddle .lia .lib a").live("click",function(){
		$(this).addClass("zuo3");
		$(this).parent().siblings().children("a").removeClass("zuo3");
		var n=$(this).attr("path")
		$(".mainmiddle .right iframe").attr("src",n)		
	})
	
	$("#backup label").on("click",function(){
  		$(this).addClass("on").siblings().removeClass("on");
	})
//	修改密码
	$("#maintop .changepass").live("click",function(){
		$("#Changepass").show()
	})
	$("#Changepass .qx").live("click",function(){
		$("#Changepass").hide()
	})
//	添加人员
	$(".addPerson").live("click",function(){
		$("#Addper").show()
	})
	$("#Addper .qx").live("click",function(){
		$("#Addper").hide()
	})
//	添加终端
	$("#Privilegetop .tianjia").live("click",function(){
		$("#AddSb").show()
	})
	$("#AddSb .qx").live("click",function(){
		$("#AddSb").hide();
	})
//	添加局站
	$(".AddStation").live("click",function(){
		$("#Addstation").show()
	})
	$("#Addstation .qx").live("click",function(){
		$("#Addstation").hide()
	})
//	添加设备
	$(".Addequi").live("click",function(){
		$("#Addequipment").show()
	})
	$("#Addequipment .qx").live("click",function(){
		$("#Addequipment").hide()
	})
//	添加线杆
	$(".Addpole").live("click",function(){
		$("#Addpole").show()
	})
	$("#Addpole .qx").live("click",function(){
		$("#Addpole").hide()
	})
//	添加光缆
	$(".Addoptical").live("click",function(){
		$("#Addoptical").show()
	})
	$("#Addoptical .qx").live("click",function(){
		$("#Addoptical").hide()
	})
//	修改光缆
	$("#opticalCablebot tbody  .update").live("click",function(){
		$("#Upoptical").show()
	})
	$("#Upoptical .qx").live("click",function(){
		$("#Upoptical").hide()
	})
//	添加管道
	$(".Addpipeline").live("click",function(){
		$("#Addpipeline").show()
	})
	$("#Addpipeline .qx").live("click",function(){
		$("#Addpipeline").hide()
	})
//	修改管道
	$("#pipelinebot tbody .detail").live("click",function(){
		$("#Uppipeline").show()
	})
	$("#Uppipeline .qx").live("click",function(){
		$("#Uppipeline").hide()
	})
//	添加编号
	$(".Addbh").live("click",function(){
		$("#tjbh").show()
	})
	$("#tjbh .qx").live("click",function(){
		$("#tjbh").hide()
	})
//	工单管理>>删除
	$("#workorderbot tbody .dele").live("click",function(){
		$("#delworkorder").show()
	})
	$("#delworkorder .qx").live("click",function(){
		$("#delworkorder").hide()
	})
//	添加工单
	$("#workordertop .addworkorder").live("click",function(){
		$("#addworkorder").show()
	})
	$("#addworkorder .qx").live("click",function(){
		$("#addworkorder").hide()
	})
//	修改局站
	$("#Stationbot .update").live("click",function(){
		$("#Upstation").show();
	})
	$("#Upstation .qx").live("click",function(){
		$("#Upstation").hide()
	})
//	修改线杆信息
	$("#polebot .details").live("click",function(){
		$("#Uppole").show()
	})
	$("#Uppole .qx").live("click",function(){
		$("#Uppole").hide()
	})
//	重启设备
	$("#facilitybot .reset").live("click",function(){
		$("#refacility").show()
	})
	$("#refacility .qx").live("click",function(){
		$("#refacility").hide()
	})
//	删除设备
	$("#facilitybot .dele").live("click",function(){
		$("#delfacility").show()
	})
	$("#delfacility .qx").live("click",function(){
		$("#delfacility").hide()
	})
//	故障详情
	$("#failurebot .details").live("click",function(){
		$("#Upfailure").show()
	})
	$("#Upfailure .qx").live("click",function(){
		$("#Upfailure").hide()
	})
//	故障删除
	$("#failurebot .dele").live("click",function(){
		$("#delfailure").show()
	})
	$("#delfailure .qx").live("click",function(){
		$("#delfailure").hide()
	})
//	日志删除
	$("#logbot .dele").live("click",function(){
		$("#dellog").show()
	})
	$("#dellog .qx").live("click",function(){
		$("#dellog").hide()
	})
//	日志备份
	$("#logtop .you3").live("click",function(){
		$("#logCopy").show()
	})
	$("#logCopy .qx").live("click",function(){
		$("#logCopy").hide()
	})
//	权限管理>>详情
	$("#authoritybot .details").live("click",function(){
		$("#Upauthority").show()
	})
	$("#Upauthority .qx").live("click",function(){
		$("#Upauthority").hide()
	})
//	权限管理>>详情>>添加局站
	$("#Upauthority .one .jzxz .jz .addjz").live("click",function(){
		$("#tjjz").show()
	})
	$("#tjjz .qx").live("click",function(){
		$("#tjjz").hide()
	})
//	权限管理>>删除
	$("#authoritybot .dele").live("click",function(){
		$("#deleauthority").show()
	})
	$("#deleauthority .qx").live("click",function(){
		$("#deleauthority").hide()
	})
//	实时监测>>删除
	$("#monitorbot .dele").live("click",function(){
		$("#delmonitor").show()
	})
	$("#delmonitor .qx").live("click",function(){
		$("#delmonitor").hide()
	})
//	终端权限>>删除
	$("#Privilegebot .dele").live("click",function(){
		$("#delPrivilege").show()
	})
	$("#delPrivilege .qx").live("click",function(){
		$("#delPrivilege").hide()
	})
//	修改人员信息
	$("#personbot .xg").live("click",function(){
		$("#Upper").show()
	})
	$("#Upper .qx").live("click",function(){
		$("#Upper").hide()
	})
//	删除人员信息
	$("#personbot .sc").live("click",function(){
		$("#delperson").show()
	})
	$("#delperson .qx").live("click",function(){
		$("#delperson").hide()
	})
})
