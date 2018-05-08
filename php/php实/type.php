<?php
    private static $types = [
        'video' => [['video/mp4', 'video/webm', 'video/ogg', 'video/3gpp'], ['mp4', 'webm', 'ogv', '3gpp']],
        'audio' => [['audio/mp4', 'audio/mpeg', 'audio/webm', 'audio/ogg', 'audio/wav', 'audio/mp3'], ['mp4', 'mpeg', 'mp3', 'webm', 'oga', 'wav']],
        'img' => [['image/gif', 'image/jpeg', 'image/jpg', 'image/pjpeg', 'image/png', 'image/x-png', 'image/svg+xml', 'image/raw', 'image/x-fuji-raf', 'image/x-icon'], ['gif', 'jpg', 'png', 'jpeg', 'svg', 'ico']],
        'file' => [['text/plain', 'application/x-bzip2', 'application/rar', 'application/x-gzip', 'application/x-rar', 'application/x-zip', 'multipart/x-gzip', 'application/zip', 'multipart/x-zip'], ['txt', 'bz2', 'rar', 'zip', 'gz']],
        'ppt' => [['application/powerpoint', 'application/mspowerpoint',], ['ppt', 'pptx']],
        'flash' => [['application/x-shockwave-flash'], ['swf', 'fla']]
    ];
?>