var canvas = document.createElement('canvas');
document.getElementsByTagName("body")[0].appendChild(canvas);
var c = document.getElementsByTagName("canvas")[0],
	ctx = c.getContext("2d"),
	img = new Image,
	width = 104,
	height = 104,
	r;
c.width = width;
c.height = height;
img.crossOrigin = 'anonymous';
img.src = 'images/terminal.png';
img.onload = function () {
	img.width = width;
    r = img.width > img.height ? img.height / 2 : img.width / 2
	ctx.save();
	ctx.arc(width / 2, height / 2, r, 0, 2 * Math.PI);
	ctx.clip();
	ctx.drawImage(img, 0, 0, width, height);
	ctx.restore();
}
