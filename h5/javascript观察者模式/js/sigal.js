//1、松耦合的代码；
//
//2、一对多的关系；
//
//3、主体状态变化时，所有依赖被通知；
//
//4、主体和观察者互不知晓。
//
//基本上，满足上面四点的，就可以算是观察者模式了。


//var mapleTao = {　　
//	message: {},
//	//注册
//	register: function (type, fn) {　　
//		if (this.message[type]) {　　　　
//			this.message[type].push(fn);　　
//		} else {　　　　
//			this.message[type] = [fn];　　
//		}　　
//	},
//	//发布
//	fire: function (type, opt) {　　　　
//		if (!this.message[type]) return false;　　　　
//		this.message[type].forEach(function (item) {　　　　　　
//			item(opt);　　　　
//		});　　
//	},
//	//取消
//	remove: function (type, fn) {　　　　
//		var i = this.message[type].indexOf(fn);　　　　
//		if (!this.message[type] || i == -1) return false;　　　　
//		this.message[type].splice(i, 1);　　
//	}
//};
//
//
//
////上述就是创建了一个观察者对象， 接下来就是对其简单调用了。
//
//(function () {　　
//	var maple = function () {　　　　
//		console.log("i am maple");　　
//	}　　 
//	
//	
//	//注册事件introduce
//	mapleTao.register("introduce", maple);
//})();
//
//
//
//(function () {　　
//	
//	var tao = function () {　　　　
//		console.log("i am tao");　　
//	}　　 
//	
//	
//	//注册事件introduce
//	mapleTao.register("introduce", tao);　　
//	
//	
//	setTimeout(function () {　　
//		mapleTao.remove("introduce", tao); //introduce在事件库中去除tao
//		　　　　
//		mapleTao.fire("introduce"); //触发introduce信号 结果为i am maple
//		　　
//	}, 0)
//	
//})();
//
//
//
//mapleTao.fire("introduce"); //触发introduce信号 结果为i am maple，i am tao
//
//
//
//
//
//
//(function () {　　
//	var maple = function (obj) { //对参数处理
//		　　　　
//		console.log("i am maple,i am " + obj.status);　　
//	}
//	
//	
//	//注册事件status　
//	mapleTao.register("status", maple);
//})();
//
//
//
//
//(function () {　　
//	var tao = function (obj) {　　　　
//		console.log("i am tao,i am " + obj.name);
//	}
//	
//	
//	//注册事件status
//	mapleTao.register("status", tao);
//})();
//
//
//
//mapleTao.fire("status", {
//	status: "working",
//	name: "studying"
//}); 
//
////结果 i am maple,i am working   i am tao,i am studying
