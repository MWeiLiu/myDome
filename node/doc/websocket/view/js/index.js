(function (win, $, doc, undefined) {
    $(function () {


        var saveData = function () {};
        var ws = new WebSocket('ws://127.0.0.1:8888')

        saveData.prototype = {

            /**
             * 获取数据
             */
            getData: function () {
                var productInfo = [{
                        id: '0',
                        pid: '1',
                        title: '2',
                        type: '3',
                        content: {
                            type: 'text',
                            html: $('.container').val().trim(),
                            margin: '',
                            quote: '',
                            style: ''
                        },
                        background: '',
                        updated_at: new Date('YY-MM-DD hh:mm:ss')
                    },
                    {
                        id: '1',
                        pid: '2',
                        title: '3',
                        type: '4',
                        content: {
                            type: 'text',
                            html: $('.container').val().trim(),
                            margin: '',
                            quote: '',
                            style: ''
                        },
                        background: '',
                        updated_at: new Date('YY-MM-DD hh:mm:ss')
                    }
                ];
                return productInfo
            },
            /**
             * 普通接口保存方法
             */
            save: function () {

                var request = new Request();
                request.save({
                    data: {
                        productInfo: JSON.stringify(this.getData())
                    },
                    success: function (res) {
                        console.log(res)
                    },
                    error: function (fail) {
                        console.log(fail)
                    },
                    complete: function (complete) {}
                })
            },

            /**
             * socket保存方法
             */
            socket: function () {
                var that = this;

                ws.onopen = function (e) {
                    console.log("连接服务器成功");
                    ws.send('Liu');
                }

                ws.onmessage = function (e) {
                    var time = new Date();
                    // $('textarea').val(e.data);
                    // console.log(e.data);
                    try {
                        var data = JSON.parse(e.data);
                        $('textarea').val(data[0].content.html);
                    } catch (error) {
                        $('textarea').val(e.data);
                    }
                    // console.log(data)
                    $('body').on('input', 'textarea', function () {
                        ws.send(JSON.stringify(that.getData()));
                    });
                    // console.log(e)
                }

            }
        }

        var SaveData = new saveData(),
            interval = null,
            intervalSave = function () {
                interval = setInterval(function () {
                    SaveData.save();
                }, 5000);
            }

        if (window.WebSocket) {
            SaveData.socket();
        } else {
            intervalSave();
        }

        ws.onclose = function (e) {
            console.log("服务器关闭");;
            var time = new Date();
        }

        ws.onerror = function () {
            console.log("连接出错");
            var time = new Date();
        }

        $('body').on('click', '#save', function () {
            clearInterval(interval);
            SaveData.save();
            intervalSave()
        });

        $('body').on('click', '#close', function () {
            ws.send('close');
            ws.onclose();
            intervalSave();
            console.log('停止')
        });
    })

})(window, jQuery, document)