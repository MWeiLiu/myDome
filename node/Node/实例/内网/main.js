fs = require('fs');
join = require('path').join;
/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */

var Datapath='/Library/WebServer/Documents/qc/data/'
var Indexpath='/Library/WebServer/Documents/qc/index.html'

function findSync(Datapath) {
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile()) result.push(fPath);
        });

    }
    finder(Datapath);
    dataName(result)
//  return result;
}

//遍历文件
function dataName(fileNames){
	var Name=[];
	for(var i=0;i<fileNames.length;i++){
		Name[i]=fileNames[i].split('/')[6];

	}
	console.log(Name);
	end(Name,Indexpath);
}

//写入文件的html文件
function end(Name,indexurl){
	var src=indexurl;
	var Data='';
	var DataTime=[]
	for(var i=0;i<Name.length;i++){
		fs.stat(Datapath+Name[i], function (err, stats) {
		   if (err) {
		       return console.error(err);
		   }
		   DataTime[i]=stats.mtime; 
		   });
        var file=Name[i].split('.')[0];
        var fileName=file.split('_')[0];
        var fileDate=file.split('_')[1];
        Data+='<div><a href="data/'+Name[i]+'">'+fileName+'</a>'+
        //		'<span>------------------------------'+DataTime[i]+'</span>'+
//            '<br /><i>'+fileDate+'</i>'+
                '<br /><br /></div>';
	}
	
	var str= '<!DOCTYPE html>'+
						'<html>'+
							'<head>'+
								'<meta charset="utf-8" />'+
								'<title>Qcourse</title>'+
								'<link rel="icon" href="favicon.ico" type="image/x-icon" />'+
								'<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />'+
								'<style>'+
								'h1{text-align:center;font-size:40px;}'+
								'.File{width:80%;margin:1% auto 0;}'+
								'.File>div:nth-child(1){display:none}'+
								'.File>div{text-align:center}'+
								'</style>'+
							'</head>'+
							'<body>'+
								'<h1>文件管理</h1>'+
								'<div class="File">'+
								Data+
								'</div>'+
                            '</body>'+
                        '</html>';
//    console.log("准备写入文件");
    fs.writeFile(src, str,  function(err) {
       if (err) {
           return console.error(err);
       }
//       console.log("数据写入成功！");
    });
}


findSync(Datapath);