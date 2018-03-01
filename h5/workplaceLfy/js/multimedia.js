(function(window,$){
    var options={
        audioHtml:
        '<div class="mmAudio" onmouseenter=mmEvent.mouseenter(this) onmouseleave=mmEvent.mouseleave(this)>'+
            '<audio class="audio" src=""></audio>'+
            '<div class="audioThumb">'+
                '<span class="audioPP"></span>'+
                '<span class="progressWrap">'+
                    '<span class="progress"></span>'+
                '</span>'+
                '<span class="surplusTime">00:00'+    
                '</span>'+
            '</div>'+
            '<div class="operators">'+
                '<div class="left">'+
                    '<span class="ico edit l" onclick=mmEvent.edit(this)></span>'+
                    '<span class="ico seting l" onclick=mmEvent.seting(this)></span>'+
                '</div>'+
                '<div class="right">'+
                    '<span class="ico clone l" onclick=mmEvent.clone(this)></span>'+
                    '<span class="ico up l" onclick=mmEvent.up(this)></span>'+
                    '<span class="ico down l" onclick=mmEvent.down(this)></span>'+
                    '<span  class="ico delete l" onclick=mmEvent.delete(this)></span>'+
                '</div>'+
            '</div>'+
        '</div>',
        audioEdit:
        '<div class="maskWrap" onclick="mmEvent.removeEditer(this)">'+
            '<div class="mmEditer audioEditer" onclick="mmEvent.cancelBubble(this)">'+
                '<div class="editThumb editerInit">'+
                    '<audio class="maEditAudio" src=""></audio>'+
                    '<div class="audioThumb">'+
                        '<span class="inlineBlock audioPP"></span>'+
                        '<span class="inlineBlock progressWrap">'+
                            '<span class="progress"></span>'+
                        '</span>'+
                        '<span class="inlineBlock surplusTime">00:00</span>'+
                    '</div>'+
                    '<div class="operators">'+
                        '<span class="inlineBlock record gotoRecord" onclick=mmEvent.showRecordM(this)></span>'+
                        '<input type="button" class="inlineBlock audioUploadBtn uploadLocal" value="上传">'+
                    '</div>'+
                    '<input type="file" accept=".mp3" class="mmAudioFile">'+
                '</div>'+
                '<div class="editThumb editering">'+
                    '<img class="recordStatus" src="temImages/redordingIcon.png" alt="">'+
                    '<span class="recordTime">00:00</span>'+
                    '<div class="operators">'+
                        '<span class="inlineBlock record recordPause"></span>'+
                        '<input type="button" class="inlineBlock audioUploadBtn uploadRecord" value="上传">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>',
        recorder:null,
        audio:null
        // '</div>'
        // audioLenght:0
    }
    var multimedia={
        mouseenter:function(_this){
            $(_this).find('.ico').show();
        },
        mouseleave:function(_this){
            $(_this).find('.ico').hide();
        },
        edit:function(_this){
            $(_this).parents('.mmAudio').after(options.audioEdit);
        },
        seting:function(_this){
           window.qcourse.currentEditDom=$(_this).parents('.mmAudio');
        },

        clone:function(_this){
            var element=$(_this).parents('.mmAudio'),
                src=element.find('.audio').attr('src');
            element.after(options.audioHtml);
            if(src){
                element.next().find('.audio').attr('src',src);
            }
        },
        up:function(_this){
            var element=$(_this).parents('.mmAudio'),
                prev=element.prev();
            if(prev.length>0){
                prev.before(element);
                // element.css('background','red');
            }
            else{
                console.log('已经是第一个了，无法上移...');
            }
        },
        down:function(_this){
            var element=$(_this).parents('.mmAudio'),
                prev=element.next();
            if(prev.length>0){
                prev.after(element);
                // element.css('background','red');
            }
            else{
                console.log('已经是最后个了，无法下移...');
            }
        },
        delete:function(_this){
            $(_this).parents('.mmAudio').remove();
        },
        removeEditer:function(_this){
            if(_this.className.indexOf('maskWrap')>=0){
                $(_this).css('display','none');
            }
        },
        showRecordM:function(_this){
            $(_this).parents('.editerInit').css('display','none').siblings().css('display','block');
            //调用浏览器录音
            if(!options.recorder){
                window.URL=window.URL||window.webkitURL;
                options.audio=document.querySelector('.maEditAudio');
                //请求开启录音
                Myna.get(function(rec){
                    options.recorder=rec;
                })
            }
        },
        hideRecordM:function(_this){
            $(_this).parents('.editering').css('display','none').siblings().css('display','block');
        },
        cancelBubble:function(){
            var e = e || window.event;  
            if(e.stopPropagation) { //W3C阻止冒泡方法  
                e.stopPropagation();  
            } else {  
                e.cancelBubble = true; //IE阻止冒泡方法  
            }  
        }
    }
    window.mmEvent=multimedia;
    $('.mmAudio').click(function(){
        $('.wrap').append(options.audioHtml);
    });
})(window,$)