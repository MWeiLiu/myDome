
var dirhome = '../routes/home/';
var diradmin = '../routes/admin/';

module.exports = {
    views: {
        index: require(dirhome + 'index'),
        user: require(dirhome + 'user'),
        about: require(dirhome + 'about'),
    },
    admin: {
        index: require(diradmin + 'index'),
    }
};