// var os = require('os');
document.getElementsByTagName('h1')[0].onclick = function () {

    document.write('You are running on ', os.platform());
}