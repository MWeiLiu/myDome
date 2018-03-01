//1 秒后控制台输出了 'some_event 事件触发'。其原理是 event 对象注册了
//事件 some_event 的一个监听器，然后我们通过 setTimeout 在 1000 毫秒
//以后向 event 对象发送事件 some_event，此时会调用some_event 的监听器。

//引入events模块  并创建eventEmitter对象
var EventEmitter=require('events').EventsEmitter;
var event=new EventEmitter();
event.on('some_event',function(){
	console.log('some_event 事件触发');
});
setTimeout(function(){
	event.emit('some_event')
},1000);




// EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，
// 通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。
//
//当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函
//数参数传递。

var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.on('someEvent', function(arg1, arg2) { 
	console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
	console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); //emit 属性用于触发一个事件




//通过 connection（连接）事件演示了 EventEmitter 类的应用。
var events = require('events');
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}

// 监听器 #2
var listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}

// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);

// 绑定 connection 事件，处理函数为 listener2
eventEmitter.on('connection', listener2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

// 处理 connection 事件 
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

// 触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");

