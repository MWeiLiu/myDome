


var begin=function (){
	
	var fs=require('fs');
	var data='';
	var src='/Users/qc/Desktop/qcourse/src/svg/icon/ratcharm/bi_ratcharm_00002.svg';
	var readerStream=fs.createReadStream(src);
	var mystring=139;
	
	
	readerStream.setEncoding('utf-8');
	readerStream.on('data',function(chunk){
		data+=chunk;
		data=data.substring(mystring);
	});
	readerStream.on('end',function(){
//	   console.log(data);
		end(data);
	});
	
}


var end=function(data){
	console.log('data:'+data)
	var fs=require('fs');
	var src='/Users/qc/Desktop/Qtemplate.html';
	var strBegin='<!DOCTYPE html><html><body>';
	var strEnd='</body></html>'
	var Data=strBegin+data+strEnd;
	var writerStream = fs.createWriteStream(src);
	writerStream.write(Data,'UTF8');
	writerStream.end();
	writerStream.on('finish', function() {
	    console.log("写入完成。");
	});
	writerStream.on('error', function(err){
	   console.log(err.stack);
	});
	console.log("程序执行完毕");
}


begin()
