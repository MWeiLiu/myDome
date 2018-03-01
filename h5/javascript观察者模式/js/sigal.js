
/*
 模块间通信
 * 
 * */

//A
(function(){
	//追加一条消息
	function addMsgItem(e){};
	//注册添加评论信息
	Message.regist('addCommonMessage',addMsgItem)
})();

//B
(function(){
	//更改用户消息数目
	function changeMsgNum(e){};
	//注册添加评论信息
	Message.regist('addCommonMessage',changeMsgNum);
})();

//C
(function(){
	//用户点击提交按钮
	document.getElementById('user_submit').onclick=function(){
		//获取用户输入框中输入的信息
		var text=document.getElementById('user_input');
		Message.fire('addCommonMessage',{
			//消息评论内容
			text:text.value,
			//消息评论数目
			num:1
		})
	}
})();
