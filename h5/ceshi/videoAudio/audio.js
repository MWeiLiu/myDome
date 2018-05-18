/*
 * author: liu wei
 * createtime: 2018/5/17 14:28
 * description:
 */
(function () {
    $.fn.polyvAudio = function (options) {
        var $this = $(this);
        var defaultoptions = {
            src: '',
            startPlayAudio: false,
            totalTime: 0,
            dotLeft: 2.5
        };

        function Plugin($context) {
            //dom
            this.$context = $context;
            console.log($context)

            this.$audio_area = $context.find('.audioPlayIcon');
            this.$audio_length = $context.find('.audioLength');
            this.$audio_area_right = $context.find('.autioInfo');
            this.$audio_slide_bar = $context.find('.autioProgress');
            this.$audio_progress = $context.find('.progress');
            this.$audio_progress_dot = $context.find('.progressDot');
            this.$audio_current_time = $context.find('.audioCurrent');
            //属性
            this.currentState = 'pause';
            this.time = null;
            //进度条圆点拖拽限制长度
            this.limitPorgressDotLength = window.getComputedStyle(this.$audio_slide_bar[0], null).width;
            this.progressOffsetLeft = this.$audio_area_right[0].offsetLeft;
            this.isDragging = false;
            this.recordSeekPrecent = 0;
            this.isDropStartBtn = false;
            this.settings = $.extend(true, defaultoptions, options);
            this.settings.player = options.player;
            this.ended = false;
            //执行初始化
            this.init();
        }

        Plugin.prototype = {
            init: function () {
                var self = this;
                self.s2j_onPlayStart();
                self.s2j_onPlayOver();
                self.events();
            },
            play: function () {
                var self = this;
                if (self.currentState === "play") {
                    self.pause();
                    return;
                }
                if (!self.settings.startPlayAudio) {
                    $("#plv_container").click();
                }
                self.settings.player.j2s_resumeVideo();
                clearInterval(self.timer);
                self.timer = setInterval(self.run.bind(self), 50);
                self.currentState = "play";
                self.$audio_area.addClass('playing');
                self.ended = false;
            },
            pause: function () {
                var self = this;
                self.settings.player.j2s_pauseVideo();
                self.currentState = "pause";
                clearInterval(self.timer);
                self.$audio_area.removeClass('playing');
            },
            seek: function (precent) {
                var self = this;
                var seekTime = precent * self.settings.totalTime;
                self.settings.player.j2s_seekVideo(seekTime);
            },
            stop: function () {

            },
            events: function () {
                var self = this;
                var updateTime;
                //播放按钮点击事件
                self.$audio_area.on('click', function () {
                    self.play();
                    if (!updateTime) {
                        self.updateTotalTime();
                        updateTime = true;
                    }
                    if (!self.isDropStartBtn) {
                        self.isDropStartBtn = true;
                    }
                });

                if (self.isMobile()) {
                    //进度条圆点拖拽事件
                    self.$audio_progress_dot.on('touchmove', function (event) {
                        self.isDragging = true;
                        self.pause();

                        if (event.targetTouches.length == 1) {
                            var touch = event.targetTouches[0];
                            //计算圆点left值,7为圆点宽度的一半
                            var moveleft = touch.pageX - 7 - self.progressOffsetLeft - self.$context.parents('.card')[0].offsetLeft;
                            if (moveleft < 0) {
                                moveleft = 0;
                            }
                            //减一是为了防止拖拽到最后，又重新播放了
                            if (moveleft >= parseInt(self.limitPorgressDotLength) - 1) {
                                moveleft = parseInt(self.limitPorgressDotLength) - 1;
                            }
                            var movePrecent = (moveleft / parseInt(self.limitPorgressDotLength));
                            self.recordSeekPrecent = movePrecent;
                            self.$audio_progress_dot[0].style.left = movePrecent * 100 - self.settings.dotLeft + "%";

                            self.animateProgressBarPosition(movePrecent);
                            self.animateCurrentAudioTime(movePrecent);
                        }
                    });

                    self.$audio_progress_dot.on('touchend', function () {
                        self.isDragging = false;
                        self.play();
                        self.seek(self.recordSeekPrecent);
                    });
                } else {
                    //进度条圆点拖拽事件
                    self.$audio_progress_dot.on('mousedown', function (event) {
                        self.isDragging = true;
                    });

                    document.onmousemove = function (event) {
                        if (self.isDragging) {
                            self.pause();

                            var moveleft = event.pageX - 7 - self.progressOffsetLeft - self.$context.parents('.card')[0].offsetLeft;
                            if (moveleft < 0) {
                                moveleft = 0;
                            }
                            //减一是为了防止拖拽到最后，又重新播放了
                            if (moveleft >= parseInt(self.limitPorgressDotLength) - 1) {
                                moveleft = parseInt(self.limitPorgressDotLength) - 1;
                            }
                            var movePrecent = (moveleft / parseInt(self.limitPorgressDotLength));
                            self.recordSeekPrecent = movePrecent;
                            self.$audio_progress_dot[0].style.left = movePrecent * 100 - self.settings.dotLeft + "%";

                            self.animateProgressBarPosition(movePrecent);
                            self.animateCurrentAudioTime(movePrecent);
                        }
                    };

                    document.onmouseup = function () {
                        if (self.isDragging) {
                            self.isDragging = false;
                            self.play();
                            self.seek(self.recordSeekPrecent);
                        }
                    }
                }

            },
            //正在播放
            run: function () {
                var self = this;
                if (!self.isDragging) {
                    self.animateProgressBarPosition();
                    self.animateProgressDotPosition();
                }
                self.animateCurrentAudioTime();

                //if (self.settings.player.j2s_getVideo().ended) {
                //    self.pause();
                //}
                if (self.ended) {
                    self.pause();
                }

            },
            //进度条
            animateProgressBarPosition: function (precent) {
                var self = this,
                    percentage = (self.settings.player.j2s_getCurrentTime() * 100 / self.settings.totalTime) + '%';
                if (precent) {
                    percentage = precent * 100 + "%";
                }
                if (percentage == "NaN%") {
                    percentage = 0 + '%';
                }
                var styles = {
                    "width": percentage
                };
                self.$audio_progress.css(styles);
            },
            //圆点
            animateProgressDotPosition: function () {
                var self = this,
                    percentage = (self.settings.player.j2s_getCurrentTime() * 100 / self.settings.totalTime - self.settings.dotLeft) + '%';
                if (percentage == "NaN%") {
                    percentage = 0 + '%';
                }
                var styles = {
                    "left": percentage
                };
                self.$audio_progress_dot.css(styles);
            },
            //当前播放时间
            animateCurrentAudioTime: function (precent) {
                var self = this;
                var currentTime = self.settings.player.j2s_getCurrentTime();
                if (precent) {
                    currentTime = self.settings.totalTime * precent;
                }
                var minutes = self.getAudioMinutes(currentTime),
                    seconds = self.getAudioSeconds(currentTime),
                    audioTime = minutes + ":" + seconds;

                self.$audio_current_time.text(audioTime);
            },
            //获取时间秒
            getAudioSeconds: function (string) {
                var self = this,
                    string = string % 60;
                string = self.addZero(Math.floor(string), 2);
                (string < 60) ? string = string : string = "00";
                return string;
            },
            //获取时间分
            getAudioMinutes: function (string) {
                var self = this,
                    string = string / 60;
                string = self.addZero(Math.floor(string), 2);
                (string < 60) ? string = string : string = "00";
                return string;
            },
            //时间+0
            addZero: function (word, howManyZero) {
                var word = String(word);
                while (word.length < howManyZero) word = "0" + word;
                return word;
            },
            //更新总时间
            updateTotalTime: function () {
                var self = this,
                    time = self.settings.totalTime,
                    minutes = self.getAudioMinutes(time),
                    seconds = self.getAudioSeconds(time),
                    audioTime = minutes + ":" + seconds;
                self.$audio_length.text(audioTime);
            },
            //s2j_onPlayStart 事件触发
            s2j_onPlayStart: function () {
                var self = this;
                self.settings.player.s2j_onPlayStart = function () {
                    self.start();
                }

                self.settings.player.s2j_onVideoPlay = function () {
                    if (!self.isDropStartBtn) {
                        self.pause();
                    }
                }

            },
            //s2j_onPlayOver事件触发
            s2j_onPlayOver: function () {
                var self = this;
                self.settings.player.s2j_onPlayOver = function () {
                    self.end();
                }
            },
            start: function () {
                var self = this;
                self.settings.totalTime = self.settings.player.j2s_getDuration();
                self.updateTotalTime();
                if (self.currentState != "play") {
                    self.play();
                }
            },
            end: function () {
                var self = this;
                self.settings.totalTime = self.settings.player.j2s_getDuration();
                self.updateTotalTime();
            },
            //判断是否移动端
            isMobile: function () {
                return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
            }
        };

        var obj = {}

        $this.each(function (index, element) {
            obj['polyvAudio' + index] = new Plugin($(this));
        });

        return obj
    }
})(jQuery)