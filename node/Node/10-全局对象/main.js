//__filename 表示当前正在执行的脚本的文件名。它将输出文件所在位
//置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在
//模块中，返回的值是模块文件的路径。

// 输出全局变量 __filename 的值
console.log( __filename );




//__dirname
//__dirname 表示当前执行脚本所在的目录。

// 输出全局变量 __dirname 的值
console.log( __dirname );



//setTimeout(cb, ms)
//
//setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：
//setTimeout() 只执行一次指定函数。
//
//返回一个代表定时器的句柄值。


function printHello(){
   console.log( "Hello, World!");
}
// 两秒后执行以上函数
setTimeout(printHello, 2000);




//clearTimeout(t)
//clearTimeout( t ) 全局函数用于停止一个之前通过 setTimeout() 
//创建的定时器。 参数 t 是通过 setTimeout() 函数创建的定时器。


function printHello(){
   console.log( "Hello, World!");
}
// 两秒后执行以上函数
var t = setTimeout(printHello, 2000);

// 清除定时器
clearTimeout(t);



//setInterval(cb, ms)
//
//setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。
//
//返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。
//
//setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。


function printHello(){
	var T=0;
   console.log( "Hello, World!");
   T++;
	if(T>=4){
		clearTimeout(tt);
	}
}
// 两秒后执行以上函数
var tt=setInterval(printHello, 2000);




















