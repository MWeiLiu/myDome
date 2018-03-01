KindEditor.plugin('knetimage', function (K) {
    var self = this, name = 'knetimage', lang = self.lang(name + '.');
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
            title: "图片选择器",
            content: 'url:/cfinder.aspx?t=d' ,
            close: function () {
                try {
                    if ($(".ceditor").hasClass("fullurl")) {
                        if (ceditorDialogC.content.document.getElementById('fullurl').value) {
                            var urlval = ceditorDialogC.content.document.getElementById('fullurl').value;

                            self.exec('insertimage', urlval, "", "", "", "", "").focus();
                        }
                    } else {
                        if (ceditorDialogC.content.document.getElementById('url').value) {
                            var urlval = ceditorDialogC.content.document.getElementById('url').value;

                            self.exec('insertimage', urlval, "", "", "", "", "").focus();
                        }
                    }
                } catch (e) { alert("插入失败"); }
            }
        };
        ceditorDialogC = zjs.dialog(dial); 
    }); 
});