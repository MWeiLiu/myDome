
$(function(){
	var G2='';
	$(".List button").click(function(e){
		var attr=this.getAttribute('G2');
		console.log(attr)
		if(attr==G2){
			this.setAttribute('onclick','');
			$("#c1").empty();
			this.setAttribute('onclick',attr+'()');
			this.onclick();
		}else{
			this.setAttribute('onclick',attr+'()');
			this.onclick();
			G2=attr;
		}
	});
	
});

function Data(){
	var A=0;
	var title=$("#Echarts").val();//标题
	var trleng=$(".dataList").length;
	var ID="";//数据名
	var series="";//数据值
	var dataAxis=[],data=[],Data=[],Datas=[];
	var obj,Obj,Data,Datas;
	var datay="";//y轴名
	var datax="";//x轴名
	var seriesData=[];
	datay=$(".dataname .dataID input").val();
	datax=$(".dataname .series input").val();
	for(var i=0;i<trleng;i++){
		if(i==trleng-1){
			ID+=$(".dataList").eq(i).find(".my_ID input").val();
		}else{
			ID+=$(".dataList").eq(i).find(".my_ID input").val()+",";
		}
	}
//	console.log(ID)
	
//简单柱状图、横向柱状图、简单折线图、饼图、环图、漏斗图：{name:name1,value:value1}
//
//嵌套饼图、雷达图(百分比层叠区域)：{name:name1,type:name2,year:value1}
//
//折线路径图、百分比层叠区域图：{name:name1,value:value1,year:value2}
//
//区域图（存在空值）：{name:name1,value1:value1,value2:value2}
//
//分组柱状图：{name1:name1,data:[value2,value3]}
//
//南丁格尔图：[{name1:name1,value2:value2},{name2:name2,value2:value2}]
	
	$(".dataList").each(function(i,v){
		obj = {};//一对一对象结构
		Obj = {};//一对多对象结构
		A=$(v).find(".my_Series").length;
		$(v).find(".my_Series input").each(function(a,b){
			if(A!==1){//验证数据名和数据值的关系是一对一还是一对多
				var I=$(".dataList").eq(i).find(".my_Series");
				series+=I.eq(a).val()+',';
				var Series='';
				for(var s=0;s<=a;s++){
					if(s==a){
						Series+=parseInt(I.eq(s).find('input').val());
					}else{
						Series+=parseInt(I.eq(s).find('input').val())+',';
					}
				}
//				seriesData=Series.split(",");
				console.log(seriesData)
			}else if(A==1){
				if(i==trleng-1){
					series+=$(b).val();
				}else{
					series+=$(b).val()+",";
				}
//				Obj.Compitor=parseInt(I.eq(s).find('input').val());
//				console.log($(v).find(".my_Series").length)
			}
		});

		obj.name=$(v).find(".my_ID input").val();
//		Obj.genre=$(v).find(".my_ID input").val();
		if(A==1){
			obj.value=parseFloat($(v).find(".my_Series input").val());
//			Obj.sold=parseFloat($(v).find(".my_Series input").val());
		}else{
			obj.seriesData=seriesData;
//			Obj.seriesData=seriesData;
		}
		Data[i]=obj;//数组对象结构
//		Datas[i]=Obj;
//						console.log(obj);
	});
	dataAxis=ID.split(",");//各个数据的标题，数组结构
	data=series.split(",");//各个数据值，数组结构
	alias=new Array(datax,datay);
//			Data={"data":Data};
//	console.log(Data);
	var config={
		dataname:dataAxis,
		datavalue:data,
		data:Data,
//		datas:Datas,
		alias:alias
	}
	return config;
}
				var data=Data();
//				console.log(data);

//自定义柱状图
image_top_bar=function(){
	var D=Data();
	var data=D.data
      var imageMap = {
        'A': 'https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png',
        'B': 'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
        'C': 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
        'D': 'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
        'E': 'https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png',
        'F': 'https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png',
        'G': 'https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png'
      }
	  console.log(imageMap)
      // 自定义 shape, 支持图片形式的气泡
      var Shape = G2.Shape;
      Shape.registShape('interval', 'image-top', {
        drawShape: function(cfg, container) {
          var points = cfg.points; // 点从左下角开始，顺时针方向
          var path = [];
          path.push(['M', points[0].x, points[0].y]);
          path.push(['L', points[1].x, points[1].y]);
          path = this.parsePath(path);
          container.addShape('rect', {
            attrs: {
              x: cfg.x - 50,
              y: path[1][2], // 矩形起始点为左上角
              width: 100,
              height: path[0][2] - cfg.y,
              fill: cfg.color,
              radius: 10
            }
          });
          return container.addShape('image', {
            attrs: {
              x: cfg.x - 20,
              y: cfg.y - 20,
              width: 40,
              height: 40,
              img: cfg.shape[1]
            }
          }); 
        }
      });
      var chart = new G2.Chart({
        id : 'c1',
        forceFit: true,
        height: 450
      });
      chart.source(data, {
        sold: {
          min: 0
        }
      });
      chart.legend(false);
      chart.axis('value', {
        labels: null,
        title: null,
        line: null,
        tickLine: null
      });
      chart.axis('name', {
        title: null
      });
      chart.interval().position('name*value').color('name', ['#7f8da9', '#fec514', '#db4c3c', '#daf0fd','#abdcge'])
        .shape('name', function(name){
        return ['image-top', imageMap[name]]; // 根据具体的字段指定 shape
      });
      chart.render();
}

//横向柱状图
h_bar=function(){
	var D=Data();
	var data=D.data;
      var Stat = G2.Stat;
      var Frame = G2.Frame;
      var frame = new Frame(data);
      frame = Frame.sort(frame, 'population'); // 将数据按照population 进行排序，由大到小
      var chart = new G2.Chart({
        id : 'c1',
        forceFit: true,
        height: 450,
        plotCfg: {
          margin: [20, 60, 20, 120]
        }
      });
      chart.source(frame);
      chart.axis('name',{
        title: null
      });
      chart.coord('rect').transpose();
      chart.interval().position('name*value');
      chart.render();
}

//折线图
simple_line=function(){
	var D=Data();
	var data=D.data;
	var chart = new G2.Chart({
		id: 'c1',
		forceFit: true,
		height: 450
	});
	chart.source(data, {
		genre: {
		  alias: 'ID',
		  range: [0, 1]
		},
		sold: {
		  alias: 'Series'
		}
	});
	chart.line().position('name*value').size(2);
	chart.repaint();
	chart.render();
}

//区域图
area_null=function(){
	
	  var D=Data();
	  var data=D.data;
      var Stat = G2.Stat;
      var Frame = G2.Frame;
      var frame = new Frame(data);
      frame = Frame.combinColumns(frame,['value','Compitor'],'value','type','year');
      var chart = new G2.Chart({
        id: 'c1',
        forceFit: true,
        height: 450
      });
      chart.source(frame, {
        'value': {
          alias: 'The Share Price in Dollars'
        },
        name: {
		  alias: 'ID',
          range: [0, 1]
        }
      });
      chart.tooltip({
        crosshairs: true
      });
      chart.area().position('name*value').color('type').shape('smooth');
      chart.line().position('name*value').color('type').size(2).shape('smooth');
      chart.render();
}

//饼图
pie=function(){
	  var D=Data();
	  var data=D.data;
      var Stat = G2.Stat;
      var chart = new G2.Chart({
        id: 'c1',
        forceFit: true,
        height: 450
      });
      chart.source(data);
      // 重要：绘制饼图时，必须声明 theta 坐标系
      chart.coord('theta', {
        radius: 0.8 // 设置饼图的大小
      });
      chart.legend('name', {
        position: 'bottom',
        itemWrap: true,
        formatter: function(val) {
          for(var i = 0, len = data.length; i < len; i++) {
            var obj = data[i];
            if (obj.name === val) {
              return val + ': ' + obj.value + '%'; 
            }
          }
        }
      });
      chart.tooltip({
        title: null,
        map: {
          value: 'value'
        }
      });
      chart.intervalStack()
        .position(Stat.summary.percent('value'))
        .color('name')
        .label('name*..percent',function(genre, percent){
        percent = (percent * 100).toFixed(2) + '%';
        return name + ' ' + percent;
      });
      chart.render();
      // 设置默认选中
      var geom = chart.getGeoms()[0]; // 获取所有的图形
      var items = geom.getData(); // 获取图形对应的数据
      geom.setSelected(items[1]); // 设置选中
}

//漏斗图
funnel=function(){
	  var D=Data();
	  var data=D.data;
      var chart = new G2.Chart({
        id: 'c1',
        forceFit: true,
        height: 450,
        plotCfg: {
          margin: 80
        }
      });
      chart.source(data);
      chart.legend('name', {
        position: 'left'
      });
      chart.coord('rect').transpose().scale(1,-1);
      chart.axis(false);
      chart.intervalSymmetric().position('name*value').color('name').shape('pyramid').animate({
        appear:{
          animation:'zoomIn'
        },
        enter:{
          animation:'fadeIn',
          easing:'easeInQuart'
        }
      });
      chart.render();
	
}

//南丁格尔图
rose=function(){
	  var D=Data();
	  var data=D.data;
	var chart = new G2.Chart({
        id: 'c1',
        forceFit: true,
        height: 450,
        plotCfg: {
          margin: [35, 140, 35, 0]
        }
      });
      chart.source(data, {
        'cost': {
          min: 0
        }
      });
      chart.coord('polar');
      chart.axis('value', {
        labels: null
      });
      chart.axis('name', {
        gridAlign: 'middle',
        labelOffset: 10,
        labels: {
          label: {
            textAlign: 'center' // 设置坐标轴 label 的文本对齐方向
          }
        }
      });
      chart.legend('name', {
        itemWrap: true // 图例换行，将该参数设置为 true, 默认为 false，不换行。
      });
      chart.interval().position('name*value')
        .color('name','rgb(252,143,72)-rgb(255,215,135)')
        .label('value',{offset: -15,label: {textAlign: 'center', fontWeight: 'bold'}})
        .style({
        lineWidth: 1,
        stroke: '#fff'
      });
      chart.render();
	
}







