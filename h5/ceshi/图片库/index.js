/*
 * @Author: MWeiLiu 
 * @Date: 2018-11-12 15:00:48 
 * @Last Modified by: MWeiLiu
 * @Last Modified time: 2018-11-12 19:58:22
 */

((win, doc, $, undefined) => {

    var options = {
        box: '<div class="mask"></div>' +
            '<div class="pictureLibraryBox">' +
            '<div class="head Flex FlexJustifyBetween">' +
            '<div>图片库</div>' +
            '<div class="close">×</div>' +
            '</div>' +
            '<div class="pictureType Flex FlexJustifyBetween">' +
            '<div>网络图片</div>' +
            '<div>' +
            '<button class="upFile">本地图片</button>' +
            '<input class="file" type="file" accept=".gif, .GIF, .jpeg, .JPEG, .png, .PNG, .jpg, .JPG" style="display: none;" />' +
            '</div>' +
            '</div>' +
            '<div class="dataLength">共有<font></font>页，<span></span>条数据</div>' +
            '<ul class="pictureList"></ul>' +
            '<div class="isok">确定</div>' +
            '<div class="pageBox"></div>' +
            '</div>',
        images: {
            imgSrcLength1: 28,
            imgSrcLength2: 33,
            imgSrc1: 'https://www.qcourse.com/home/image/weChatShare/wechat',
            imgSrc2: 'https://www.qcourse.com/home/group/images/beijing',
            imgSrcType: 'jpg',
            base64: null
        }
    }

    $(function () {

        var tablePaging = function (option) {

            this.config = {

                /** 
                 * 数据的外层
                 */
                box: option.box || $('.pictureList'),

                /** 
                 * 页码
                 */
                pageBox: option.pageBox || $('.pageBox'),

                /** 
                 * 每页的数据长度限制
                 */
                listLimit: option.listLimit || 10,

                /** 
                 * 跳转输入框
                 */
                jump: option.jump || $('.jump input'),

                /** 
                 * 提示语
                 */
                tip: ''
            }

            this.config.pageBox.append('<div class="pageList"></div>');
            this.config.pageBox.find('.pageList').before('<div class="btn prev"><</div>');
            this.config.pageBox.find('.pageList').after('<div class="btn next">></div>');
            this.config.pageBox.find('.next').after('<div class="jump"><div>跳转到</div><input type="text" /><div>页</div><button>跳转</button></div>');


            this.pageList(option);
        }


        tablePaging.prototype = {
            /** 
             * 记录当前数据
             */
            productPageList: [],
            /** 
             * 数据总长度
             */
            dataLen: 0,
            /** 
             * 记录当前页
             */
            page: 0,
            /**
             * 展示当前页数据
             * @param {*} option 
             */
            pageList: function (option) {
                var
                    listLimit = this.config.listLimit,

                    /** 
                     * 分页数据的下标
                     */
                    tp = 0;


                this.leng = 0;
                this.productPageList = [];
                this.productPageList[tp] = [];


                /** 
                 * 进行数据分页
                 */
                for (var d = 0; d < option.data.length; d++) {
                    if (d != 0 && d % listLimit == 0) {
                        tp = tp + 1;
                        this.productPageList[tp] = [];
                        this.productPageList[tp].push(option.data[d]);
                    } else {
                        this.productPageList[tp].push(option.data[d]);
                    }
                }

                /** 
                 * 如果这一页没有数据，就删除他
                 */
                for (var i = 0; i < this.productPageList.length; i++) {
                    if (this.productPageList[i].length == 0) {
                        this.productPageList.splice(i, 1);
                    }
                }


                this.dataLen = option.data.length;

                $('.dataLength span').html(this.dataLen);
                $('.dataLength font').html(tp + 1);

                /** 
                 * 跳转到当前页
                 */
                this.toPage(0);
            },

            html: function () {
                var str = $('<li>' +
                    '<img src="" />' +
                    '<div class="TorF">' +
                    '<div class="T">√</div>' +
                    '<div class="F">×</div>' +
                    '</div>' +
                    '</li>');

                return str;
            },

            /**
             * 渲染列表
             */
            renderHtml: function () {

                for (let i = 0; i < this.productPageList[this.page].length; i++) {
                    var box = this.html();
                    box.find('img').attr('src', this.productPageList[this.page][i]);
                    this.config.box.append(box);
                }

            },

            /**
             * 跳转页
             * @param {*} option 
             */
            toPage: function (page) {

                if (this.productPageList) {

                    this.page = page;

                    this.config.box.empty();

                    this.renderHtml();

                    this.ellipsisPage();
                }

            },

            /**
             * 分页
             */
            ellipsisPage: function () {

                var len = this.productPageList.length,
                    isHiddenExist = 0;

                if (this.productPageList.length == 0) {
                    this.config.pageBox.hide();
                } else {
                    this.config.pageBox.show();
                    this.config.pageBox.find('.pageList').empty();
                    if (len > 0) {
                        for (var i = 0; i < len; i++) {
                            if (i == this.page) {
                                this.config.pageBox.find('.pageList').append('<div class="active btn">' + (i + 1) + '</div>');
                            } else {
                                if (i < 4 || i < (this.page + 2) && i > (this.page - 2) || i > (len / 2 - 1) && i < (len / 2 - 1) || i > (len - 2)) {
                                    isHiddenExist = 0;
                                    this.config.pageBox.find('.pageList').append('<div class="btn">' + (i + 1) + '</div>');
                                } else {
                                    if (isHiddenExist == 0) {
                                        this.config.pageBox.find('.pageList').append('<div class="prohibit">' + '...' + '</div>');
                                        isHiddenExist = 1;
                                    }
                                }
                            }
                        }
                        this.config.pageBox.find('.totalPage span').html(len);
                    }

                    if (this.page == 0) {
                        $('.pageBox .prev').addClass('unclick');
                    } else {
                        $('.pageBox .prev').removeClass('unclick');
                    }

                    if (this.page == this.productPageList.length - 1) {
                        $('.pageBox .next').addClass('unclick');
                    } else {
                        $('.pageBox .next').removeClass('unclick');
                    }
                }

            }
        }



        var arr = [];


        for (let i = 0; i < 10; i++) {
            for (let a = 0; a < options.images.imgSrcLength1; a++) {
                arr.push(options.images.imgSrc1 + a + '.' + options.images.imgSrcType);
            }
            for (let b = 1; b < options.images.imgSrcLength2; b++) {
                arr.push(options.images.imgSrc2 + b + '.' + options.images.imgSrcType);
            }
        }

        var tablePag
        $('body').on('click', '#content', function () {
            $('body').append(options.box);

            tablePag = new tablePaging({
                data: arr,
                listLimit: 12
            });

        });


        $('body').on('click', '.pictureList li', function () {
            var select = $(this).attr('data-select');
            if (select && select != '') {
                if (select == '1') {
                    $(this).attr('data-select', '0').find('.TorF').removeClass('greenyellow').find('.T').hide();
                } else {
                    $(this).attr('data-select', '1').find('.TorF').addClass('greenyellow').find('.T').show();
                }
            } else {
                $(this).attr('data-select', '1').find('.TorF').addClass('greenyellow').find('.T').show();
            }
            $(this).siblings().attr('data-select', '0').find('.TorF').removeClass('greenyellow').find('.T').hide();
        });



        $('body').on('click', '.pictureLibraryBox .isok', function () {
            $('body').append('<img src="' + $('.pictureList li[data-select="1"] img').attr('src') + '"/>')

            $('.pictureLibraryBox .close').click();
        }).on('click', '.pictureLibraryBox .close', function () {
            $('.mask,.pictureLibraryBox').remove();
        }).on('click', '.pictureType .upFile', function (e) {
            $(this).next().click();
        }).on('change', '.file', function (e) {
            var files = this.files;

            if (files.length > 0) {
                var file = files[0],
                    fileReader = new FileReader();

                fileReader.onload = function (e) {
                    options.base64 = e.target.result;
                    arr.unshift(options.base64);
                    tablePag.pageList({
                        data: arr,
                        listLimit: 12
                    });
                }
                fileReader.readAsDataURL(file);
            }
        });



        $('body').on('click', '.pageBox .pageList .btn', function () {
            if (!$(this).hasClass('active')) {
                tablePag.toPage(parseInt($(this).html()) - 1);
            }
        }).on('click', '.pageBox .prev', function () {
            if (!$(this).hasClass('unclick')) {
                tablePag.toPage(parseInt($('.pageList .btn.active').html()) - 2);
            } else {
                alert('这已经是第一页了')
            }
        }).on('click', '.pageBox .next', function () {
            if (!$(this).hasClass('unclick')) {
                tablePag.toPage(parseInt($('.pageList .btn.active').html()));
            } else {
                alert('这已经是最后页了')
            }
        }).on('input', '.pageBox .jump input', function () {
            var val = $(this).val().trim();
            val = val.replace(/[^\d.]/g, "");
            $(this).val(val);
        }).on('click', '.pageBox .jump button', function () {
            var val = $('.jump input').val().trim();
            if ($('.jump input').val().trim() != '') {
                tablePag.toPage(parseInt(val - 1));
            }
        });


    })

})(window, document, jQuery)