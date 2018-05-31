  
    $(document).ready(function(e) {  
        $('.aclick').click(function(){  
            $('.div-label').html("回复[潇sdfsdfssssssssssssssdfsdf潇]:");  
            $('.div').focus();  
            getC($('.div'))  
        })  
    });  
    function getC(that){  
            if(document.all){  
                that.range=document.selection.createRange();  
                that.range.select();  
                that.range.moveStart("character",-1);   
            }else{  
                that.range=window.getSelection().getRangeAt(0);  
                that.range.setStart(that.range.startContainer,2);  
				console.log(that.range.setStart)
            }  
    }  
