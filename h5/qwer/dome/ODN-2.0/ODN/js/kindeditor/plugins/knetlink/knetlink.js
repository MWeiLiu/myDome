KindEditor.plugin('knetlink', function (K) {
    var self = this, name = 'knetlink', lang = self.lang(name + '.');
    self.clickToolbar(name, function () {

        var ceditorDialogC;
        var dial = {
            id: "ceditorDialog",
            lock: true,
            fixed: true,
            min: false,
            max: false,
            width: 960,
            height: zjs.dialogheight(),
            title: "链接选择器",
            content: 'url:/linkurl.html',
            close: function () {
                try {
                    if (ceditorDialogC.content.document.getElementById('url').value) {
                        var urlval = ceditorDialogC.content.document.getElementById('url').value;
                        if (urlval.indexOf("mylink|") > -1)
                            urlval = urlval.split('|')[6];

                        self.exec('createlink', urlval, "").focus();
                    }
                } catch (e) { alert("插入失败"); }
            }
        };
        ceditorDialogC = zjs.dialog(dial);
    });

});