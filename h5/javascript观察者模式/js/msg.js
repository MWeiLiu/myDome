/*
 *
 * 信息管理
 * 
 * */
			var Message=(function(){
				//防止消息队列暴露篡改
				var _message={};
				return {
					//注册消息
					regist:function(type,fn){},
					//广播消息
					fire:function(type,args){},
					//移除消息
					remove:function(type,fn){}
				}
			})();
			Message.regist('测试',function(e){
				console.log(e.type,e.args.msg)
			});
			Message.fire('测试',{msg:'传递参数'})
			


/*
 * 
 * 模块间解耦
 * 
 * */

var Student=function(result){
	this.result=result;
};
Student.prototype.answer=function(question){
	var that=this;
	Message.regist(question,function(e){
		console.log(e);
		console.log(that.result);
	});
}
var student1=new Student('学生1回答问题');
var student2=new Student('学生2回答问题');

student1.answer('什么是设计模式')
student1.answer('简述观察者模式')
student2.answer('JavaScript起源')
student2.answer('简述观察者模式')
student2.answer('简述观察者模式')

var Teacher=function(){};
Teacher.prototype.ask=function(question){
	console.log('问题是：'+question);
	Message.fire(question)
}

var teacher=new Teacher();
teacher.ask('JavaScript起源')
var headmaster=new Teacher();
headmaster.ask('简述观察者模式')


