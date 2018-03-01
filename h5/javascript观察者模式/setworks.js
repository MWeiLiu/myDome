
function setWorks(){
	var str='<div class="setWorksMask"></div>'+
		'<div class="setWorksBox"><div class="setWorks">'+
                '<div class="setWorksTit">作品设置</div>'+
                '<div class="setContent">'+
                    '<div class="worksLogo">'+
                        '<img class="logoimage" src="images/logo.png" />'+
                        '<div class="worksAlt">您可以通过显示您的公司或徽标来识别您的组织身份。</div>'+
                        '<div class="setWorksBtn logoimageUpload">'+
                            '上传图片'+
                            '<input type="file" class="worksUpload"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="worksThemeImage">'+
                        '<img class="themeImage" src="images/750.jpg" />'+
                        '<div class="worksAlt">类似于书封面，这张照片将显示在您的课程概述页面的顶部。</div>'+
                        '<div class="setWorksBtn themeImageBtn">选择图片</div>'+
                    '</div>'+
                    '<div class="worksThemeColor">'+
                        '<div class="worksTitle">主题色</div>'+
                        '<div class="worksAlt">颜色将在整个课程中使用，以给予自定义的优势。</div>'+
                        '<div class="colorShow fl"></div>'+
                        '<div class="colorBox fl hidden">'+
                            '<div></div>'+
                            '<ul>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+

                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+

                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+

                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                                '<li class="colorBoardList"></li>'+
                            '</ul>'+
                        '</div>'+
                        '<div class="setWorksBtn fl themeColorBtn">自定义主题色</div>'+
                    '</div>'+
                    '<div class="worksNavMode">'+
                        '<div class="worksTitle">导航模式</div>'+
                        '<div class="worksAlt">学习者浏览作品的方式。</div>'+
                        '<div class="navModeFree">'+
                            '<div class="fl">'+
                                '<input type="radio" name="mode" id="ModeFree" checked="true"/><label for="ModeFree">自由</label>'+
                            '</div>'+
                            '<div class="worksAlt fl worksRadioAlt">学习者可以自由浏览作者所有内容。</div>'+
                        '</div>'+
                        '<div class="navModeLimit">'+
                            '<div  class="fl">'+
                                '<input type="radio" name="mode" id="ModeLimit"/><label class="ModeLimit">受限</label>'+
                            '</div>'+
                            '<div class="worksAlt fl worksRadioAlt">要求学习者按顺序完成学习。</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="worksAuthor">'+
                        '<div class="worksTitle">作者</div>'+
                        '<div>'+
                            '<img  src="" class="authorImg"/>'+
                            '<div class="worksName">Jiuw</div>'+
                            '<div class="setWorksBtn authorBtn">选择作者</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<!--元素库-->'+
            '<div class="setElementLayer setWorksLayer">'+
                '<div class="setWorksEltNav">'+
                    '<div class="setWorksEltNavSearch">'+
                        '<label for="elementSearchIpt">搜索</label>'+
                        '<input type="text" placeholder="搜索内容" id="elementSearchIpt"/>'+
                        '<span></span>'+
                    '</div>'+
                    '<div class="setWorksEltNavSearchList">'+
                        '<span class="searchActive">博客图形</span>'+
                        '<span>|</span>'+
                        '<span>颜色</span>'+
                        '<span>|</span>'+
                        '<span>中国风</span>'+
                        '<span>|</span>'+
                        '<span>工作总结</span>'+
                        '<span>|</span>'+
                        '<span>体育运动</span>'+
                        '<span>|</span>'+
                        '<span>社会媒体</span>'+
                        '<span>|</span>'+
                        '<span>照片拼贴</span>'+
                        '<span>|</span>'+
                        '<span>海报</span>'+
                    '</div>'+
                '</div>'+
                '<div class="eltContent">'+
                    '<div>'+
                        '<div class="eltContentAlt">位图</div>'+
                        '<div class="eltContentBtn">'+
                            '本地上传'+
                            '<input  type="file" class="eltContentOnloadBtn" />'+
                        '</div>'+
                    '</div>'+
                    '<div class="eltContentlist">'+
                        '<img src="images/750.jpg" />'+
                        '<img src="images/750.jpg" />'+
                        '<img src="images/750.jpg" />'+
                        '<img src="images/logo.png"/>'+
                        '<img src="images/750.jpg" />'+
                        '<img src="images/750.jpg" />'+
                        '<img src="images/750.jpg" />'+
                        '<img src="images/750.jpg" />'+
                        '<img src="images/750.jpg" />'+
                        '<img src="images/750.jpg" />'+
                        '<img src="images/750.jpg" />'+
                        '<img src="images/750.jpg" />'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<div class="setWorksUserImg">'+
                '<div class="worksUserImgBox">'+
                    '<div class="userImgList">'+

                        '<div>'+
                            '<img class="WorksUserImg" src="images/addIcon.png"/>'+
                            '<div class="worksImgName">Jiuw</div>'+
                            '<div class="UserImgBtn">'+
                                '<img src="images/worksChoice.png" class="worksChoice"/>'+
                                '<img src="images/worksEdit.png" class="worksEdit"/>'+
                                '<img src="images/worksDel.png" class="worksDel"/>'+
                            '</div>'+
                        '</div>'+

                    '</div>'+
                    '<div class="worksImgListAdd"></div>'+
                '</div>'+
                '<div class="worksUserModify">'+
                    '<div class="imageBox setImagesBox">'+
                        '<div class="setthumbBox"></div>'+
                        '<div class="setspinner" style="display: none">Loading...</div>'+
                    '</div>'+
                    '<div class="setWorkPreviewBox">'+
                            '<div class="cropped"></div>'+
                            '<div class="worksUserUpload">'+
                                '<img src="images/worksUpload.png" />'+
                                '<span>点击图片上传</span>'+
                                '<input type="file" class="worksUploadBtn" accept="image/png"/>'+
                            '</div>'+
                    '</div>'+
                        '<input placeholder="作者名称" class="imgUserName" maxlength="17"/>'+
                    '<div class="worksUploadServe">'+
                            '<div class="serveBtn">保存</div>'+
                    '</div>'+
                '</div>'+
                '<div class="worksGoback">'+
                    '<div>'+
                        '<img src="images/worksGoBack.png"/>'+
                        '<p>返回设置</p>'+
                    '</div>'+
                '</div>'+
            '</div></div>';
    
    $('.setWorksMask,.setWorksBox').remove()
    $('.wrap').append(str)
    $('.setWorksMask').show()
}

function worksUserImg(img){
	var options ={
			imagesBox:'.setImagesBox',
			thumbBox: '.setthumbBox',
			spinner: '.setspinner',
			imgSrc: img
	}
	var cropper = $('.setImagesBox').cropbox(options);
	$('.worksUploadBtn').on('change', function(){
		var reader = new FileReader();
		reader.onload = function(e) {
			options.imgSrc = e.target.result;
			cropper = $('.setImagesBox').cropbox(options);
			console.log(options)
		}
		reader.readAsDataURL(this.files[0]);
//			this.files = [];
	})
	$('.setImagesBox').on('mouseup', function(){
		var img = cropper.getDataURL();
		$('.cropped').html('');
		$('.cropped').append('<img src="'+img+'" align="absmiddle"><p>100*100</p>');
	})
}

$(function(){
	//打开
    $('.setWorkBtn').live('click',function(){
    		if($('.wrap .shareBox').length==1){
    			$('.wrap .shareBox,.wrap .shareBoxMask').remove();
    		}
        setWorks()
    });
    //关闭
    $('.setWorksMask').live('click',function(){
    		$(this).remove();
    		$('.setWorksBox').remove();
    });
    
	//上传
	$('.worksUpload').live('change',function(e){
	        var $t=$(this);
	        var file=this.files[0];
	        if(window.FileReader){
	            var fr=new FileReader();
	            fr.onloadend=function(e){
	                var worksImg=e.target.result;
	                $t.parent().parent().find('.logoimage').attr('src',worksImg);//base64
	            }
	            fr.readAsDataURL(file);
	        }
   });
   
   //选择图片
   $('.themeImageBtn').live('click',function(){
   		if($('.setWorks').hasClass('rotateinY')){
   				$('.setWorks').removeClass('rotateinY');
	   			$('.setWorksLayer').removeClass('rotateoutY');
	   			$('.setWorks').addClass('rotateoutY');
	   			setTimeout(function(){
	   				$('.setWorksLayer').css('opacity',1);
	   				$('.setWorksLayer').css('display','block');
	   				$('.setWorksLayer').addClass('rotateinY');
	   				$('.setWorks').css('display','none');
	   			},500)
   		}else{
   			$('.setWorks').addClass('rotateoutY');
   			setTimeout(function(){
   				$('.setWorksLayer').css('opacity',1);
   				$('.setWorksLayer').css('display','block');
   				$('.setWorksLayer').addClass('rotateinY');
	   			$('.setWorks').css('display','none');
   			},500)
   		}
   });
   $('.eltContentlist img').live('click',function(){
   		var imgSrc=$(this).attr('src');
		$('.setWorksLayer').removeClass('rotateinY');
		$('.setWorksLayer').addClass('rotateoutY');
		setTimeout(function(){
	   		$('.setWorks').css('display','block');
			$('.setWorks').removeClass('rotateoutY');
			$('.setWorks').addClass('rotateinY');
			$('.setWorksLayer').css('display','none');
			$('.setWorksLayer').css('opacity',0);
		},500)
        $('.themeImage').attr('src',imgSrc);
   });
   //图片上传
   $('.eltContentOnloadBtn').live('change',function(e){
	        var $t=$(this);
	        var file=this.files[0];
	        if(window.FileReader){
	            var fr=new FileReader();
	            fr.onloadend=function(e){
	                var worksImg=e.target.result;
	   				$('.setWorksLayer').removeClass('rotateinY');
		   			$('.setWorksLayer').addClass('rotateoutY');
		   			setTimeout(function(){
	   					$('.setWorks').css('display','block');
		   				$('.setWorks').removeClass('rotateoutY');
	   					$('.setWorks').addClass('rotateinY');
		   				$('.setWorksLayer').css('display','none');
		   				$('.setWorksLayer').css('opacity',0);
		   			},500)
	                $('.themeImage').attr('src',worksImg);//base64
	            }
	            fr.readAsDataURL(file);
	        }
   });
   
   //主题颜色
   var colorBoardList=$('.worksThemeColor .colorShow').css('background-color');
   var colorBoardLists=''
   $('.colorShow').live('click',function(){
   		if($('.colorBox').hasClass('hidden')){
   			$('.colorBox').removeClass('hidden');
   		}else{
   			$('.colorBox').addClass('hidden');
   			$('.colorShow').css('background-color',colorBoardList);
   		}
   });
   $('.colorBox .colorBoardList').live('click',function(){
   		colorBoardLists=$(this).css('background-color');
   		$('.colorShow').css('background-color',colorBoardLists);
   });
   $('.themeColorBtn').live('click',function(){
   		colorBoardList=colorBoardLists
   		$('.colorShow').css('background-color',colorBoardList);
   		$('.colorBox').addClass('hidden');
   });
   
   //导航模式
   
   //选择作者
   $('.authorBtn').live('click',function(){
   		if($('.setWorks').hasClass('rotateinY')){
   				$('.setWorks').removeClass('rotateinY');
	   			$('.setWorksUserImg').removeClass('rotateoutY');
	   			$('.setWorks').addClass('rotateoutY');
	   			setTimeout(function(){
	   				$('.setWorksUserImg').css('opacity',1);
	   				$('.setWorksUserImg').css('display','block');
	   				$('.setWorksUserImg').addClass('rotateinY');
	   				$('.setWorks').css('display','none');
	   			},500)
   		}else{
   			$('.setWorks').addClass('rotateoutY');
   			setTimeout(function(){
   				$('.setWorksUserImg').css('opacity',1);
   				$('.setWorksUserImg').css('display','block');
   				$('.setWorksUserImg').addClass('rotateinY');
	   			$('.setWorks').css('display','none');
	   			$('.setWorksLayer').css('display','none');
   			},500)
   		}
   		$('.userImgList>div').eq(0).attr('data-img',true);
   		$('.userImgList>div').each(function(index,item){
   			var data_img=$(item).attr('data-img');
   			if(data_img){
   				imgSrc=$(item).find('.WorksUserImg').attr('src');
   				var base=new Base64()
   				var result=base.encode(imgSrc)
   				imgName=$(item).find('.worksImgName').html();
   				worksUserImg(result)
   				$('.setWorksUserImg .imgUserName').val(imgName)
   			}
   		});
   });
   //选择作者
   //添加作者
   $('.worksImgListAdd').live('click',function(){
   		var len=$('.userImgList>div').length;
   		var str='<div>'+
						'<img class="WorksUserImg" src="images/logo.png"/>'+
						'<div class="worksImgName">logo</div>'+
						'<div class="UserImgBtn">'+
							'<img src="images/worksNoChoice.png" class="worksChoice"/>'+
							'<img src="images/worksEdit.png" class="worksEdit"/>'+
							'<img src="images/worksDel.png" class="worksDel"/>'+
						'</div>'+
					'</div>';
		$('.userImgList').append(str);
		if(len==4){
			$('.worksImgListAdd').toggle();
		}
   });
   //勾选作者
   $('.worksChoice').live('click',function(){
   	$(this).attr('src','images/worksChoice.png');
   	$(this).parent().parent().siblings().find('.worksChoice').attr('src','images/worksNoChoice.png');
   	$(this).parent().parent().attr('data-img','true').siblings().attr('data-img','')
   });
   
   //编辑头像
   var _worksThis=$('.userImgList>div').eq(0)
   $('.worksEdit').live('click',function(){
   	_worksThis=$(this).parent().parent();
	var base=new Base64()
	var result=base.encode(imgSrc)
   	var imgSrc=$(this).parent().parent().find('.WorksUserImg').attr('src');
   	var imgName=$(this).parent().parent().find('.worksImgName').html();
   	worksUserImg(result)
   	$('.setWorksUserImg .imgUserName').val(imgName)
   });
   
   //删除
   $('.worksDel').live('click',function(){
   	var data_img=$(this).parent().parent().attr('data-img');
   	var len=$('.userImgList>div').length;
   	if(data_img){
   		alert('不能删除已选中的头像')
   	}else if(len==1){
   		alert('至少有一个存在头像')
   	}else{
   		$(this).parent().parent().remove();
   	}
   	if(len<7){
   		$('.worksImgListAdd').show()
   	}
   });
   
   //头像上传
   
   //保存
   $('.setWorksUserImg .serveBtn').live('click',function(){
   	var imgSrc=$('.setWorksUserImg .cropped img').attr('src');
   	var imgName=$('.setWorksUserImg .imgUserName').val();
   	_worksThis.find('.WorksUserImg').attr('src',imgSrc).next().html(imgName);
   });
   
   //返回设置
   $('.worksGoback').live('click',function(){
   		var imgSrc='',imgName='';
   		$('.userImgList>div').each(function(index,item){
   			var data_img=$(item).attr('data-img');
   			if(data_img){
   				imgSrc=$(item).find('.WorksUserImg').attr('src');
   				imgName=$(item).find('.worksImgName').html();
   			}
   		});
		$('.setWorksUserImg').removeClass('rotateinY');
		$('.setWorksUserImg').addClass('rotateoutY');
		setTimeout(function(){
			$('.setWorks').css('display','block');
			$('.setWorks').removeClass('rotateoutY');
			$('.setWorks').addClass('rotateinY');
			$('.setWorksUserImg').css('display','none');
			$('.setWorksUserImg').css('opacity',0);
		},500)
		$('.worksAuthor .authorImg').attr('src',imgSrc).next().html(imgName);
   });
   
});
