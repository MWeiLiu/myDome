//引入gulp  
var gulp = require('gulp'), 
	runSequence = require('run-sequence'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
    imagemin = require('gulp-imagemin'),//图片压缩
    jshint = require('gulp-jshint'),//js检测
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
	del = require('del');

//删除buildtxt
gulp.task('clean:buildtxt', function (cb) {
  del([
	  './htdocs/build.txt'
  ], cb);
});

//只压缩修改的图片
//gulp.task('revImg', function() {
//  return gulp.src(['img/**.{png,jpg,gif,ico}'])
//    .pipe(cache(imagemin({
//        progressive: true,
//        svgoPlugins: [{removeViewBox: false}],
//        use: [pngquant()]
//    })))
//	.pipe(gulp.dest('images'))
//});

//检查js
//gulp.task('lint', function() {
//	//路径可以配置想要检查语法的js
//  return gulp.src('js/deps/**/*.js')
//    .pipe(jshint())
//    .pipe(jshint.reporter('default'))
//});
	
//定义css、js源文件路径
//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
var cssSrc = ['./htdocs/src/css/*.css','./htdocs/src/css/**/*.css'];
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('../qcourse/htdocs/src/css'));
});
var jsSrc = ['./htdocs/src/js/deps/**/*.js'];
gulp.task('revJs', function(){
    return gulp.src(jsSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('../qcourse/htdocs/src/js/deps'));
});

//Html替换版本号
gulp.task('revHtml', function () {
    return gulp.src(['../qcourse/src/css/*.json','../qcourse/src/js/deps/*.json', '*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('../qcourse/htdocs'));
});

//未打包刷版本号
var nocssSrc = ['./src/css/*.css','./src/css/**/*.css'];
gulp.task('norevCss', function(){
    return gulp.src(nocssSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('../qcourse/src/css'));
});
var nojsSrc = ['.src/js/deps/**/*.js'];
gulp.task('norevJs', function(){
    return gulp.src(nojsSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('../qcourse/src/js/deps'));
});
gulp.task('norevHtml', function () {
    return gulp.src(['../qcourse/src/css/*.json','../qcourse/src/js/deps/*.json', '*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('../qcourse'));
});

//开发构建
gulp.task('dev', function (done) {
    runSequence(
        ['norevCss'],
        ['norevJs'],
        ['norevHtml'],
        done);
});
//正式构建
gulp.task('build', function (done) {
    runSequence(
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        ['clean:buildtxt'],
        done);
});

gulp.task('default', ['build']);



