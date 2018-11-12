/*
 * author: liu wei
 * createtime: 2018/5/23 17:54
 * description: 卡片模板
 */

var cardTemplate = {
    box: null,
    card: function () {
        var $str = $('<div class="card" data-cardType="" data-id="" contenteditable="false">' +
            '<div class="assemblyBox">' +
            '<div class="toolBox hide">' +
            '<div class="qFlex qFlexJustifyBetween">' +
            '<div class="toolBtn editorTool tip" data-direction="top" data-tip="编辑">' +
            '<img alt="编辑" title="编辑" src="/home/images/editCard_1.png"/>' +
            '</div>' +
            '<div class="toolBtn cloneTool tip" data-direction="top" data-tip="复制">' +
            '<img alt="复制" title="复制" src="/home/images/cloneCard_1.png"/>' +
            '</div>' +
            '<div class="toolBtn toAfterTool tip" data-direction="top" data-tip="下移">' +
            '<img alt="下移" title="下移" src="/home/images/afterCard_1.png"/>' +
            '</div>' +
            '<div class="toolBtn toPrevTool tip" data-direction="top" data-tip="上移">' +
            '<img alt="上移" title="上移" src="/home/images/prevCard_1.png"/>' +
            '</div>' +
            '<div class="toolBtn deleteTool tip" data-direction="top" data-tip="删除">' +
            '<img alt="删除" title="删除" src="/home/images/deleteCard_1.png"/>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="cardContent"></div>' +
            '</div>' +
            '</div>');

        return $str;
    },
    text: function () {
        var str = $('<p class="qeditor" data-cardtype="text" data-id="" data-textType="text"><br></p>');

        return str;
    },
    pbSplitter: function () {
        var str = '<hr>';

        return str;
    },
    ol: function () {
        var str = '<ol class="ol qeditor" data-textType="ol" data-cardtype="text" data-id="">' +
            '<li><br></li>' +
            '</ol>';

        return str;
    },
    ul: function () {
        var str = '<ul class="ul qeditor" data-textType="ul" data-cardtype="text" data-id="">' +
            '<li><br></li>' +
            '</ul>';

        return str;
    },
    mmAudio: {
        html: function () {
            var $str = $('<div class="polyv_audio audioOne" data-play="">' +
                '<div class="qFlex qFlexJustifyBetween">' +
                '<div class="audioPlay">' +
                '<div class="audioPlayIcon audioNewPP" data-status="">' +
                '<img src="/home/images/playIconBlue.png" title="" alt="">' +
                '</div>' +
                '</div>' +
                '<div class="autioInfo">' +
                '<div class="autioTitle">' +
                '<input type="text" placeholder="音频标题" value=""/>' +
                '</div>' +
                '<div class="autioProgress">' +
                '<div class="progress processBox"></div>' +
                '<div class="progressBg"></div>' +
                '<div class="progressDot">' +
                '<div></div>' +
                '</div>' +
                '</div>' +
                '<div class="autioTime qFlex qFlexJustifyEnd">' +
                '<span class="audioCurrent">00:00</span>' +
                '<span class="audio_separator">/</span>' +
                '<span class="audioLength">00:00</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<audio class="audio" src="" class="audio" data-duration="" data-vid=""></audio>' +
                '</div>');

            return $str;

        },
        mask: function () {
            var str = '<div class="audioUploadMask"></div>' +
                '<div class="audioUpLoadBox">' +
                '<div class="headers qFlex qFlexJustifyBetween">' +
                '<span class="title">音频</span>' +
                '<img class="close" src="/home/images/close.png" />' +
                '</div>' +
                '<div class="upLoadBox" data-type="video">' +
                '<div class="upLoadAudioBox qFlex qFlexJustifyBetween">' +
                '<input type="file" style="display: none;" accept=".mp3, .MP3, .wav, .WAV"/>' +
                '<div class="upLoadAudio">上传音频</div>' +
                '<div class="fileName showByStep"></div>' +
                '<div class="fileProgressVal"></div>' +
                '<div class="close hide">' +
                '<img src="https://www.qcourse.com/home/images/authorListcuohao.png"/>' +
                '</div>' +
                '</div>' +
                '<div>' +
                '<input class="audioTitle" type="text" maxlength="16" placeholder="输入标题"/>' +
                '</div>' +
                '<div class="audioOk">确认</div>' +
                '</div>' +
                '</div>';

            $('body').append(str);
        }
    },
    mmVideo: {
        html: function () {
            var $str = $('<div class="polyv_video" data-play="false"><div style="background: #000; height: 400px;"></div></div>');

            return $str;
        },
        mask: function () {
            var str = '<div class="videoUploadMask"></div>' +
                '<div class="videoUpLoadBox">' +
                '<div class="headers qFlex qFlexJustifyBetween">' +
                '<span class="title">视频</span>' +
                '<img class="close" src="/home/images/close.png" />' +
                '</div>' +
                '<div class="upLoadBox" data-type="video">' +
                '<div class="upLoadVideoBox">' +
                '<input type="file" style="display: none;" accept=".mp4, .MP4"/>' +
                '<div class="upLoadVideo">上传视频</div>' +
                '<div class="fileTip qFlex qFlexJustifyStart">' +
                '<div class="fileName showByStep"></div>' +
                '<div class="fileProgressVal"></div>' +
                '<div class="close hide">' +
                '<img src="https://www.qcourse.com/home/images/authorListcuohao.png"/>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="upLoadPicBox">' +
                '<div class="qFlex qFlexJustifyStart">' +
                '<input type="file" style="display: none;" accept=".png, .PNG, .jpg, .JPG"/>' +
                '<div class="upLoadPic unUpLoadPic">上传封面</div>' +
                '<div class="picTip">图片小于4M，支持jpg、png、jpeg格式</div>' +
                '</div>' +
                '<div class="fileTip qFlex qFlexJustifyStart">' +
                '<div class="fileName showByStep"></div>' +
                '<div class="fileProgressVal"></div>' +
                '<div class="close hide">' +
                '<img src="https://www.qcourse.com/home/images/authorListcuohao.png"/>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="videoOk">确认</div>' +
                '</div>' +
                '</div>';
            $('body').append(str);
        }

    },
    iQuizzes: {
        html: function () {
            var $str = $('<div class="question">\n' +
                '<div class="tit">\n' +
                '    <i class="icon-checkbox"></i><i class="type"></i>\n' +
                '</div>\n' +
                '<div class="topic"></div>\n' +
                '<ul>\n' +
                '</ul>\n' +
                '<div class="analysis" data-asw="BCF" style="display:block;">\n' +
                '<div class="answer">答案：<span></span></div>\n' +
                '<p>解析：<span class="jiexi"></span></p>\n' +
                '</div>\n' +
                '</div>');
            return $str;
        },
        mask: function () {
            var str = '<div class="question-pop">\n' +
                '<div class="title">试题</div>\n' +
                '<span class="icon-bg close"></span>\n' +
                '<div class="swiper-container">\n' +
                '<div class="swiper-wrapper">\n' +
                '</div>\n' +
                '<div class="silde-btn">\n' +
                '<div class="swiper-pagination"></div>\n' +
                '<i class="icon-plus"></i>\n' +
                '<i class="icon-minus"></i>\n' +
                '</div>\n' +
                '</div>\n' +
                '<div class="sure-btn">确定</div>\n' +
                '</div>';
            return str;
        }
    },
    mmAttachment: {
        html: function () {
            var str = $('<div class="mmAttachmentBox">' +
                '<div class="qFlex qFlexJustifyBetween">' +
                '<div class="fileInfo">' +
                '<div class="fileName showByStep">' +
                '<img src="/home/images/file.png"/>' +
                '<span></span>' +
                '</div>' +
                '<div class="fileSize"></div>' +
                '</div>' +
                '<div class="downLoadFile">' +
                '<a href="javascript:;">' +
                '<img src="/home/images/downLoad.png"/>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>');

            return str;
        }
    },
    pictrueSingle: {
        html: function () {
            var str = $('<div class="imgBox">' +
                '<img src="" width="" height=""/>' +
                '</div>');

            return str;
        }
    },
    mmCode: {
        html: function () {
            var $str = $('<div class="codeBlock"><div class="codeHide"></div><pre></pre></div>');
            return $str;
        },
        mask: function () {
            var str = '<div class="codeBlock-pop">\n' +
                '<div class="title">代码引用</div>\n' +
                '<span class="icon-bg close"></span>\n' +
                '<div class="code" data-placement="请粘贴代码，最多可添加100行" contenteditable="true" spellcheck="false"></div>\n' +
                '<a href="javascript:" class="sure">确定</a>\n' +
                '</div>';
            return str;
        }
    },
    pbAward: {
        html: function () {
            var $str = $('<div class="rewardBox" data-money="">' +
                '<span>赏</span>' +
                '<p>您的支持就是我创作的动力！</p>' +
                '</div>');
            return $str;
        },
        mask: function () {
            var str = '<div class="reward-pop">\n' +
                '<div class="title">打赏</div>\n' +
                '<span class="icon-bg close"></span>\n' +
                '<div class="reward-con">\n' +
                '<div class="item">\n' +
                '<input type="radio" class="radio" name="money" checked/>\n' +
                '<span class="icon"><i class="icon-check"></i></span>\n' +
                '<p>随机金额</p>\n' +
                '<p class="mrg">0-10元内随机</p>\n' +
                '</div>\n' +
                '<div class="item">\n' +
                '<input type="radio" class="radio" name="money"/>\n' +
                '<span class="icon"><i class="icon-check"></i></span>\n' +
                '<p>固定金额</p>\n' +
                '<div class="money-con">\n' +
                '<input type="text" class="money" disabled="disabled">&nbsp;元<span>最高上限999元</span>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>\n' +
                '<a href="javascript:" class="sure">确定</a>\n' +
                '</div>';
            return str;
        }
    },
    pbPayOff: {
        html: function () {
            var $str = $('<div class="payBox">' +
                '<div class="btn">¥<span class="money"></span>阅读全文</div>' +
                '<p>以下内容用户购买后方可浏览</p>' +
                '</div>');
            return $str;
        },
        mask: function () {
            var str = '<div class="pay-pop">\n' +
                '<div class="title">付费阅读</div>\n' +
                '<span class="icon-bg close"></span>\n' +
                '<div class="price">\n' +
                '价格：&nbsp;<input type="text" class="money">&nbsp;&nbsp;元<span>最高上限999元</span>\n' +
                '</div>\n' +
                '<div class="remark">备注：观看者付费后，才能看到后边的内容。</div>\n' +
                '<a href="javascript:" class="sure">确定</a>\n' +
                '</div>';
            return str;
        }
    },
    reprintVideo: {
        mask: function () {
            var str = $('<div class="reprintVideoMask"></div>' +
                '<div class="reprintVideoBox">' +
                '<div class="headers">' +
                '<div class="title">转载视频</div>' +
                '<img class="close" src="/home/images/close.png"/>' +
                '</div>' +
                '<div class="reprintVideo">' +
                '<div class="codeReprint">' +
                '<div class="hide">' +
                '<img src="/home/images/selectOk.png" data-select="1"/>' +
                '<span>代码转载</span>' +
                '</div>' +
                '<textarea placeholder="请粘贴代码(仅支持腾讯视频通用代码)" spellcheck="false"></textarea>' +
                '</div>' +
                '<div class="linkReprint hide">' +
                '<div>' +
                '<img src="/home/images/selectNo.png" data-select="0"/>' +
                '<span>链接转载</span>' +
                '</div>' +
                '<textarea placeholder="请粘贴代码" spellcheck="false"></textarea>' +
                '</div>' +
                '</div>' +
                '<div class="isok">确定</div>' +
                '</div>');

            $('body').append(str);
        }
    },
    loadIng: function () {
        var str = '<div class="loading">' +
            '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1536134146934" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1934" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50"><defs><style type="text/css"></style></defs><path d="M875.861333 588.444444c-30.691556 0-55.608889-24.903111-55.608889-55.608889 0-30.677333 24.917333-55.566222 55.608889-55.566222 30.663111 0 55.580444 24.888889 55.580444 55.566222C931.441778 563.541333 906.524444 588.444444 875.861333 588.444444zM769.308444 324.394667c-25.585778 0-46.336-20.736-46.336-46.321778 0-25.585778 20.750222-46.321778 46.336-46.321778s46.336 20.736 46.336 46.321778C815.644444 303.658667 794.894222 324.394667 769.308444 324.394667zM769.308444 718.136889c35.84 0 64.867556 29.041778 64.867556 64.839111 0 35.84-29.027556 64.881778-64.867556 64.881778-35.811556 0-64.867556-29.041778-64.867556-64.881778C704.440889 747.178667 733.496889 718.136889 769.308444 718.136889zM514.531556 282.695111c-61.411556 0-111.175111-49.777778-111.175111-111.175111 0-61.397333 49.763556-111.175111 111.175111-111.175111 61.383111 0 111.160889 49.777778 111.160889 111.175111C625.692444 232.917333 575.914667 282.695111 514.531556 282.695111zM262.058667 379.975111c-54.997333 0-99.584-44.600889-99.584-99.598222s44.586667-99.598222 99.584-99.598222c55.011556 0 99.612444 44.600889 99.612444 99.598222S317.070222 379.975111 262.058667 379.975111zM245.859556 532.835556c0 51.2-41.486222 92.672-92.657778 92.672-51.157333 0-92.643556-41.472-92.643556-92.672 0-51.157333 41.486222-92.657778 92.643556-92.657778C204.373333 440.177778 245.859556 481.678222 245.859556 532.835556zM262.058667 704.241778c44.771556 0 81.066667 36.280889 81.066667 81.066667 0 44.771556-36.295111 81.066667-81.066667 81.066667-44.757333 0-81.066667-36.295111-81.066667-81.066667C180.992 740.508444 217.301333 704.241778 262.058667 704.241778zM516.849778 820.039111c39.651556 0 71.779556 32.156444 71.779556 71.793778 0 39.665778-32.142222 71.822222-71.779556 71.822222-39.665778 0-71.822222-32.156444-71.822222-71.822222C445.041778 852.195556 477.184 820.039111 516.849778 820.039111z" p-id="1935"></path></svg>' +
            '</div>';

        $('body').append(str);
    },
    /**
     * 进度条
     * @returns {jQuery|HTMLElement|*}
     */
    progress: function () {
        var str = $('<div class="fileProgress">' +
            '<div></div>' +
            '</div>');

        return str;
    },
    /**
     * 进度条
     * @param text
     * @returns {jQuery|HTMLElement|*}
     */
    progressMask: function (text) {
        var str = $('<div class="progressMask"></div>' +
            '<div class="progressBox">' +
            '<img class="close" src="/home/images/close.png">' +
            '<p class="loadedText">' + (text || "") + '上传进度</p>' +
            '<div class="progress">' +
            '<div></div>' +
            '</div>' +
            '<p class="loaded">100%</p>' +
            '</div>');

        return str;
    },
    /**
     * 重新上传弹层
     * @param text
     */
    unqualifiedTip: function (text, type) {
        var str = $('<div class="fileSizeMask"></div>' +
            '<div class="fileSizeBox">' +
            '<div class="title">提示</div>' +
            '<span class="icon-bg close"></span>' +
            '<p>' + (text || "") + '</p>' +
            '<a href="javascript:;" class="reUpload" data-type="' + (type || '') + '">重新上传</a>' +
            '</div>');

        $('body').append(str);
    },
    /**
     * 删除二次确认
     * @param option
     */
    deleteTip: function (option) {
        cardTemplate.box = option.box;

        var text = '';

        switch (cardTemplate.box.attr('data-cardtype')) {
            case 'mmAudio':
                {
                    text = '音频';
                }
                break;
            case 'mmVideo':
                {
                    text = '视频';
                }
                break;
            case 'iQuizzes':
                {
                    text = '试题';
                }
                break;
            case 'mmAttachment':
                {
                    text = '附件';
                }
                break;
            case 'pictrueSingle':
                {
                    text = '图片';
                }
                break;
            case 'mmCode':
                {
                    text = '代码';
                }
                break;
            case 'pbAward':
                {
                    text = '打赏';
                }
                break;
            case 'pbPayOff':
                {
                    text = '支付';
                }
                break;
            default:
                {

                }
                break;
        }
        var str = $('<div class="deleteFileTipMask"></div><div class="deleteFileTip">' +
            '<div class="headers">' +
            '<div class="title">提示</div>' +
            '<img class="close" src="/home/images/close.png"/>' +
            '</div>' +
            '<p>删除后' + text + '不可以恢复，确认要删除吗？</p>' +
            '<div class="isok qFlex qFlexJustifyStart">' +
            '<div class="no">取消</div>' +
            '<div class="ok">确定</div>' +
            '</div>' +
            '</div>');

        $('body').append(str);

    },
    //剪裁框
    containerBox: function (type) {
        var str = $(
            '<div class="containerBox" data-type="' + type + '">' +
            '<div class="container">' +
            '<img src="" alt="" id="imgs">' +
            '<div class="btnBox qFlex qFlexJustifyBetween"><div class="no">取消</div><div class="ok">确定</div></div>' +
            '</div>' +
            '<div class="preview" style="display: none"><img src="" alt="" id="imgaa"></div>' +
            '</div>' +
            '</div>');

        $('body').append(str);
    },
    /**
     * 专题上传封面弹层
     * @returns {jQuery|HTMLElement|*}
     */
    uploadSpecialPic: function () {
        var str = $('<div class="uploadSpecialPicMask"></div>' +
            '<div class="uploadSpecialPicBox">' +
            '<div class="headers qFlex qFlexJustifyBetween">' +
            '<span class="title">上传封面</span>' +
            '<img class="close" src="/home/images/close.png"/>' +
            '</div>' +
            '<div class="uploadPic">' +
            '<div class="upLoadPicBox">' +
            '<img src="/home/images/add.png"/>' +
            '<p class="up">上传封面</p>' +
            '<p class="picTip">小于4M，支持png、jpg、jpeg格式</p>' +
            '<input type="file" class="upPic" accept=".png, .PNG, .jpg, .JPG"/>' +
            '<div class="imgBox"></div>' +
            '<div class="fileTip hide qFlex qFlexJustifyCenter">' +
            '<span class="showByStep"></span><a><img src="/home/images/cuo.png" /></a>' +
            '</div>' +
            '</div>' +
            '<div class="previewPicBox">' +
            '<p>预览</p>' +
            '<div class="previewPic">' +
            '<p>我眼中的Qcourse</p>' +
            '<div class="previewAuthor qFlex qFlexAlignCenter">' +
            '<img src="/home/images/add-1.png"/>' +
            '<span>AaronXue</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="isok">确定</div>' +
            '</div>');

        $('body').append(str);
    },
    /**
     * 专题上传封面视频弹层
     */
    uploadSpecialPicVideo: function () {
        var str = $('<div class="uploadSpecialVideoMask"></div>' +
            '<div class="uploadSpecialVideoBox">' +
            '<div class="headers qFlex qFlexJustifyBetween">' +
            '<span class="title">上传封面视频<span>（建议上传）</span></span>' +
            '<img class="close" src="/home/images/close.png"/>' +
            '</div>' +
            '<div class="upLoadVideoBoxs qFlex qFlexJustifyAround">' +
            '<div class="upLoadVideo">' +
            '<div class="upVideo">' +
            '<input type="file" class="upVideo hide" accept=".mp4"/>' +
            '<div class="up">上传视频</div>' +
            '<p>小于2G，仅支持mp4格式</p>' +
            '<div class="fileTip hide qFlex qFlexJustifyCenter"><span class="showByStep"></span><font>0%</font><a><img src="/home/images/cuo.png" /></a></div>' +
            '</div>' +
            '<div class="upVideoPic">' +
            '<img src="/home/images/add.png"/>' +
            '<p class="up">上传封面图片</p>' +
            '<p class="picTip">小于4M，支持png、jpg、jpeg格式，与视频尺寸相同</p>' +
            '<input type="file" class="upPic hide" accept=".png, .PNG, .jpg, .JPG" />' +
            '<div class="imgBox qFlex qFlexAlignCenter"></div>' +
            '<div class="fileTip hide qFlex qFlexJustifyCenter"><span class="showByStep"></span><a><img src="/home/images/cuo.png" /></a></div>' +
            '</div>' +
            '</div>' +
            '<div class="previewVideoPic qFlex qFlexDirectionColumn">' +
            '<div class="previewTop">' +
            '<div class="imgBox qFlex qFlexAlignCenter qFlexJustifyCenter"></div>' +
            '<img src="/home/images/play-1.png"/>' +
            '</div>' +
            '<div class="previewBot">' +
            '<p>￥000.00</p>' +
            '<div class="goumai">购买</div>' +
            '<div class="fenxiang">分享</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="isok">确认</div>' +
            '</div>');

        $('body').append(str);
    },
    /**
     * 专题上传小程序分享图片弹层
     */
    uploadProgramPic: function () {
        var str = $('<div class="uploadSpecialProgramPicMask"></div>' +
            '<div class="uploadSpecialProgramPicBox">' +
            '<div class="headers qFlex qFlexJustifyBetween">' +
            '<span class="title">上传小程序分享封面<span>（建议上传）</span></span>' +
            '<img class="close" src="/home/images/close.png"/>' +
            '</div>' +
            '<div class="programPicBox qFlex qFlexJustifyAround">' +
            '<div class="upLoadProgramPic">' +
            '<img src="/home/images/add.png"/>' +
            '<p class="up">上传封面</p>' +
            '<p class="picTip">小于4M，支持png、jpg、jpeg格式</p>' +
            '<input type="file" class="upPic hide" accept=".png, .PNG, .jpg, .JPG" />' +
            '<div class="imgBox qFlex qFlexAlignCenter qFlexJustifyCenter"></div>' +
            '<div class="fileTip hide qFlex qFlexJustifyCenter"><span class="showByStep"></span><a><img src="/home/images/cuo.png" /></a></div>' +
            '</div>' +
            '<div class="previewProgramPic">' +
            '<div class="previewTop">' +
            '<img src="/home/images/xiaokeLogo.png"/>' +
            '<span>Qcourse小课</span>' +
            '</div>' +
            '<p class="previewTit">我眼中的的孔庆东</p>' +
            '<div class="previewPic qFlex qFlexAlignCenter qFlexJustifyCenter"></div>' +
            '<div class="previewBot">' +
            '<img src="/home/images/program.png"/>' +
            '<span>小程序</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="isok">确认</div>' +
            '</div>');

        $('body').append(str);
    },
    /**
     * 课程发布弹层
     */
    courseSetRelease: function () {
        var str = $('<div class="courseSetReleaseMask"></div>' +
            '<div class="courseSetReleaseBox">' +
            '<div class="headers qFlex qFlexJustifyBetween">' +
            '<span class="title">发布</span>' +
            '<img class="close" src="/home/images/close.png">' +
            '</div>' +
            '<div class="selectBox qFlex qFlexJustifyAround">' +
            '<div class="select select1 qFlex qFlexJustifyBetween">' +
            '<div class="selectThis showByStep">选择专题</div>' +
            '<img src="/home/images/selectIcon.png">' +
            '<div class="selectType hide">' +
            '<i></i>' +
            '<div class="selectScroll">' +
            '<div class="showByStep">--</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="select select2 qFlex qFlexJustifyBetween">' +
            '<div class="selectThis showByStep">选择章节</div>' +
            '<img src="/home/images/selectIcon.png">' +
            '<div class="selectType hide">' +
            '<i></i>' +
            '<div class="selectScroll">' +
            '<div class="showByStep">--</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="select select3 qFlex qFlexJustifyBetween">' +
            '<div class="selectThis">发布类型</div>' +
            '<img src="/home/images/selectIcon.png">' +
            '<div class="selectType hide">' +
            '<i></i>' +
            '<div class="selectScroll">' +
            '<div data-status="2">试看课程</div>' +
            '<div data-status="3">正式课程</div>' +
            '<div data-status="1">下线课程</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="isok">确认</div>' +
            '<p>专题发布后，用户可通过连接访问课程</p>' +
            '</div>');

        $('body').append(str);
    },
    returnHtml: function (option) {

        var ran = window.getSelection();
        if (ran.anchorNode) {
            ran = ran.getRangeAt(0);
            var endContainer = ran.endContainer;
        } else {
            var endContainer = $('#myEditor > *:last-child');
        }


        while (endContainer.nodeName == '#text') {
            endContainer = endContainer.parentNode;
        }

        //let endContainer = editFont.selectTextParentsNode;
        endContainer = $(endContainer);

        /**
         * 防止点击上传按钮
         */
        if (endContainer[0].className == 'upLoadAudio' ||
            endContainer[0].className == 'upLoadVideo' ||
            endContainer[0].className == 'sure-btn' ||
            endContainer[0].localName == 'SPAN' ||
            endContainer[0].className == 'mark' ||
            endContainer[0].className == 'sure' ||
            endContainer[0].className == 'code' ||
            endContainer[0].className == 'isok' ||
            endContainer[0].className == 'videoOk') {
            endContainer = editFont.selectTextParentsNode;
        }

        /**
         * 防止endContainer = null
         */
        if (editFont.selectTextParentsNode.length == 0) {
            editFont.selectTextParentsNode = $('#myEditor > *:last-child');
        }

        if (!endContainer || endContainer.length == 0) {
            endContainer = editFont.selectTextParentsNode;
        }

        if (endContainer.parents('#myEditor').length == 0) {
            endContainer = editFont.selectTextParentsNode;
        }

        var next = null;
        if (!option.card) {
            if (option.cardtype == 'pbAward') {
                $('#myEditor').append($box)
            } else {
                var $box = this.card(),
                    $content = cardTemplate[option.cardtype].html();
                $box.find('.cardContent').html($content);
                endContainer.after($box);
            }
            next = $box;
        } else {
            if (option.card.attr('data-cardtype') == 'pbAward') {
                $('.edui-editor-body').append(option.card)
            } else {
                if (endContainer.parent()[0].nodeName == 'LI') {
                    endContainer.parent().parent().after(option.card);
                } else {
                    endContainer.after(option.card);
                }
            }
            next = option.card;
        }
        courseEditor.setBtn();
        if (next.next().length == 0) {
            next.after(cardTemplate.text())
        }


        function getC(that) {
            if (document.all) {
                that.range = document.selection.createRange();
                that.range.select();
                that.range.moveStart("character", -1);
            } else {
                that.range = window.getSelection().getRangeAt(0);
                that.range.setStart($(that.range.startContainer).find(next).next()[0], 1);
            }
        }
        // getC(next.next());

    },
    init: function (option) {
        if (!option) {
            return;
        }
        var cardtype = option.cardtype,
            htmlArry = ['mmAudio', 'mmVideo', 'iQuizzes', 'pictrueSingle', 'mmCode', 'mmAttachment', 'reprintVideo', 'pbAward', 'pbPayOff'];

        if ($.inArray(cardtype, htmlArry) > -1) {
            cardTemplate[cardtype].mask();
        } else {
            this.returnHtml(option);
        }
    }
};

window.cardTemplate = cardTemplate;