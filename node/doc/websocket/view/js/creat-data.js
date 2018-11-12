/*
 * author: liu wei
 * createtime: 2018/5/24 19:45
 * description:
 */
var options = {
    setData: function (option) {

        var $card,
            $box,
            data = option.data,
            content = JSON.parse(data.content),
            obj = {};


        switch (data.type) {
            case 'text':
                {
                    $card = $(cardTemplate.text());
                    $card.attr('data-indent', content.textIndent || '');
                    $card.attr('data-align', content.textAlign || '');
                    $card.attr('data-titleType', content.titleType || '');
                }
                break;
            case 'mmAudio':
                {
                    $card = cardTemplate.card();
                    $box = cardTemplate.mmAudio.html();

                    $box.find('.audioPic img').attr('src', content.img);
                    $box.find('.audio').attr('data-fileName', content.fileName);
                    $box.find('.audio').attr('src', content.src);
                    $box.find('.audio').attr('data-duration', content.duration);
                    $box.find('.audio').attr('data-vid', content.vid);
                    $box.find('.audio').attr('data-polyvvid', content.polyv_vid);
                    $box.find('.audio').attr('data-md5', content.md5);
                    $box.find('.autioInfo .autioTitle input').val(content.text);

                }
                break;
            case 'mmVideo':
                {
                    $card = cardTemplate.card();
                    $box = cardTemplate.mmVideo.html();

                    $box.attr('data-fileName', content.fileName);
                    $box.attr('data-vid', content.vid);
                    $box.attr('data-polyvvid', content.polyv_vid);
                    $box.attr('data-md5', content.md5);
                    $box.find('.pv-cover').css('background-image', 'url(' + content.img + ')');
                    $box.find('.pv-video').attr('src', content.src);

                    var player = polyvPlayer({
                        width: '100%',
                        height: '100%',
                        wrap: $box[0],
                        vid: content.polyv_vid,
                    });
                    media.video.editVideo.videoBox[content.polyv_vid] = player;

                }
                break;

            case 'iQuizzes':
                {
                    for (var i = 0; i < content.length; i++) {
                        var coni = content[i],
                            $html = cardTemplate.iQuizzes.html(),
                            types = '',
                            typess = '',
                            choiceItem = JSON.parse(coni.option);
                        $box = '';

                        if (coni.type == 1) {
                            types = 'icon-radio';
                            typess = '单选';
                        } else if (coni.type = 2) {
                            types = 'icon-checkbox';
                            typess = '判断';
                        } else if (coni.type = 3) {
                            types = 'icon-judge';
                            typess = '多选';
                        }

                        $html.find('.tit').attr('data-qst', types).find('.type').html(typess);
                        $html.find('.topic').html(coni.question);
                        $html.find('.analysis').attr('data-asw', coni.analysis).find('.answer span').html(coni.analysis);
                        $html.find('.jiexi').html(coni.answers);

                        for (var j in choiceItem) {
                            $html.find('ul').html('<li class="clearfix">' +
                                '<span class="check-btn">' + j + '</span>' +
                                '<div class="check-con" contenteditable="false" spellcheck="false">' + choiceItem[j] + '</div> ' +
                                '</li>'
                            );
                        }

                        $box += $html;

                    }

                }
                break;

            case 'mmCode':
                {
                    $box = cardTemplate.pbPayOff.html();

                    $box.find('.codeHide').html(content.code);
                }
                break;
            case 'pbAward':
                {

                    $box = cardTemplate.pbAward.html();

                    $box.find('.rewardBox').attr('data-money', content.money);

                }
                break;
            case 'pbPayOff':
                {
                    $card = cardTemplate.card();
                    $box = cardTemplate.pbPayOff.html();

                    $box.find('.payBox .money').html(content.money);
                }
                break;
            case 'pbSplitter':
                {
                    $card = cardTemplate.pbSplitter();
                }
                break;
            case 'mmAttachment':
                {
                    $card = cardTemplate.card();
                    $box = cardTemplate.mmAttachment.html();

                    $box.find('.fileName').attr('data-src', content.src);
                    $box.find('.fileSize').html(content.fileSize);
                    $box.find('.fileName span').html(content.fileName);
                }
                break;
            case 'pictrueSingle':
                {

                    $card = cardTemplate.card();
                    $box = cardTemplate.pictrueSingle.html();

                    $box.find('img').attr('src', content.src);
                    $box.find('img').attr('width', content.width);
                    $box.find('img').attr('height', content.height);
                }
                break;
            default:
                {
                    return;
                }
                break;
        }

        $card.attr('data-id', data.id);
        $card.attr('data-cardtype', data.type);
        if (data.type == 'pbSplitter') {

        } else if (data.type == 'text') {
            $card.html(content.html);
        } else if (data.type == 'iQuizzes') {
            $card.find('.cardContent').addClass('qststyle');
            $card.find('.cardContent').html($box);
        } else {
            $card.find('.cardContent').html($box);
        }

        $('.edt-con').append($card);

    },
    getData: function (option) {

        var obj = {};


        obj.id = option.box.attr('data-id') || '';
        obj.title = '';
        obj.type = option.box.attr('data-cardType');
        obj.background = '';
        obj.content = {};

        switch (obj.type) {
            case 'text':
                {
                    var textType = option.box.attr('data-textType');
                    if (textType == 'text') {
                        obj.content = {
                            type: option.box.attr('data-textType'),
                            html: option.box.html(),
                            style: option.box.attr('style') || '',
                            textIndent: option.box.attr('data-indent') || '',
                            textAlign: option.box.attr('data-align') || '',
                            titleType: option.box.attr('data-titleType') || '',
                            quote: option.box.attr('data-quote') || '',
                            margin: option.box.attr('data-margin') || '',
                            reprintVideo: option.box.attr('data-reprintVideo') || ''
                        };
                    } else {
                        var array = {},
                            arr = [];
                        option.box.find('li').each(function (i, v) {
                            array = {
                                html: $(v).html(),
                                listContent: $(v).attr('data-list-content') || '',
                                textIndent: $(v).attr('data-indent') || '',
                                textAlign: $(v).attr('data-align') || '',
                                titleType: $(v).attr('data-titleType') || ''
                            };
                            arr.push(array);
                        });
                        obj.content = {
                            quote: option.box.attr('data-quote'),
                            type: option.box.attr('data-textType'),
                            array: arr
                        }
                    }
                }
                break;
            case 'mmAudio':
                {
                    obj.content = {
                        text: option.box.find('.autioInfo .autioTitle input').val().trim(),
                        src: option.box.find('.audio').attr('src'),
                        duration: option.box.find('.audio').attr('data-duration'),
                        vid: option.box.find('.audio').attr('data-vid'),
                        polyv_vid: option.box.find('.audio').attr('data-polyvvid'),
                        img: 'https://www.qcourse.com/images/author_zhu.png',
                        md5: option.box.find('.audio').attr('data-md5'),
                        fileName: option.box.find('.audio').attr('data-fileName')
                    };
                }
                break;
            case 'mmVideo':
                {
                    var style = option.box.find('.polyv_video .pv-cover').attr('style'),
                        img = '';
                    if (style) {
                        img = style.split('(')[1].split(')')[0].split('"')[1]
                    }

                    obj.content = {
                        src: option.box.find('.polyv_video .pv-video').attr('src'),
                        vid: option.box.find('.polyv_video').attr('data-vid'),
                        polyv_vid: option.box.find('.polyv_video').attr('data-polyvvid'),
                        img: img,
                        md5: option.box.find('.polyv_video').attr('data-md5'),
                        duration: option.box.find('.polyv_video').attr('data-time'),
                        fileName: option.box.find('.polyv_video').attr('data-fileName')
                    };
                }
                break;
            case 'iQuizzes':
                {

                    var _question = option.box.find('.question'),
                        len = _question.length,
                        // item = [],
                        list = {},
                        letter = '',
                        val = '';

                    for (var i = 0; i < len; i++) {
                        var oLi = _question.eq(i).find('li');
                        var liList = {};
                        var types = _question.eq(i).find('.tit').data('qst');
                        var type = 0;

                        if (types == 'icon-radio') {
                            type = 1;
                        } else if (types == 'icon-checkbox') {
                            type = 2;
                        } else if (types == 'icon-judge') {
                            type = 3;
                        }

                        for (var j = 0; j < oLi.length; j++) {
                            letter = oLi.eq(j).find('.check-btn').html();
                            val = oLi.eq(j).find('.check-con').html();
                            liList[letter] = val;
                        }
                        list = {
                            type: type,
                            //typeName: _question.eq(i).find('.tit .type').html(),
                            question: _question.eq(i).find('.topic').html(),
                            analysis: _question.eq(i).find('.jiexi').html(),
                            answers: _question.eq(i).find('.answer span').html().split('').join(''),
                            option: JSON.stringify(liList)
                        };
                        // item.push(list);
                        obj.content[i] = list;
                    }
                    //console.log(JSON.stringify(item));
                    // obj.content = item;

                }
                break;
            case 'mmCode':
                {

                    obj.content = {
                        code: option.box.find('.codeHide').html()
                    };

                }
                break;
            case 'pbAward':
                {

                    obj.content = {
                        money: option.box.find('.rewardBox').attr('data-money')
                    };

                }
                break;
            case 'pbPayOff':
                {

                    obj.content = {
                        money: option.box.find('.payBox .money').text()
                    };

                }
                break;
            case 'pbSplitter':
                {

                }
                break;
            case 'mmAttachment':
                {
                    obj.content = {
                        src: option.box.find('.fileName').attr('data-src'),
                        fileSize: option.box.find('.fileSize').html(),
                        fileName: option.box.find('.fileName span').html()
                    };
                }
                break;
            case 'pictrueSingle':
                {
                    obj.content = {
                        src: option.box.find('.imgBox img').attr('src'),
                        width: option.box.find('.imgBox img').attr('width'),
                        height: option.box.find('.imgBox img').attr('height')
                    };
                }
                break;

            default:
                {
                    return;
                }
                break;
        }

        return obj;
    }
};

var creatDate = function (option) {
    var type = option.type;
    if (type == 'setData') {
        options.setData(option);
    } else if (type == 'getData') {
        return options.getData(option);
    }
};
