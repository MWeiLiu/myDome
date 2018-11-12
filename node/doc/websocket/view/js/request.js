var Request = function (option) {
    this.host = 'http://localhost:8000';
    this.xhr = null;
    this.async = true;
    this.url = '';
    this.type = 'GET';
    this.data = {};
    this.dataType = 'JSON';
    this.success = function (res) {};
    this.error = function (err) {};
    this.complete = function (com) {};
    this.onprogress = function (pro) {};
}
Request.prototype = {
    upData: function (option) {
        option.url = this.host + option.url;

        $.ajax({
            url: option.url,
            async: option.async || this.async,
            type: option.type || this.type,
            data: option.data || this.data,
            dataType: option.dataType || this.dataType,
            success: option.success || this.success,
            error: option.error || this.error,
            complete: option.complete || this.complete
        });

    },
    upfile: function (option) {
        option.url = this.host + option.url;

        this.xhr = $.ajax({
            url: option.url,
            async: option.async || this.async,
            type: option.type || this.type,
            data: option.data || this.data,
            dataType: option.dataType || this.dataType,
            processData: false,
            contentType: false,
            xhr: function xhr() {
                if (this.onprogress && this.xhr.upload) {
                    this.xhr.upload.addEventListener("progress", this.onprogress, false);
                    return this.xhr;
                }
            },
            success: option.success || this.success,
            error: option.error || this.error,
            complete: option.complete || this.complete
        });
        return this.xhr;
    },
    save: function (option) {
        option.url = '/save';
        this.type = 'POST';
        this.upData(option);
    }
}