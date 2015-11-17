
// created by ccHotaru at 2015-7-14

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

// 处理 sass 和 scss 文件，两种都可以用 sass()方法编，注意命不要重复
var sassPath = './src/sass/*.*', 
    transformedCssPath = './dist/css';

/* outputstyle
    * nested：嵌套缩进的css代码，它是默认值。
　　* expanded：没有缩进的、扩展的css代码。
　　* compact：简洁格式的css代码。
　　* compressed：压缩后的css代码。*/

gulp.task('sass', function(){
    return gulp.src(sassPath)
        .pipe(plumer())
        .pipe(sass({outputStyle: 'expanded'})
        .pipe(gulp.dest(transformedCssPath))
})

// 处理 css 包括 autoprefixer uglify concat
var cssPath = './src/css/*.css', 
    cssMinName = 'all.min.css', 
    cssDestPath = 'dist/css';
gulp.task('css', function() {
    return gulp.src(cssPath)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true,
            remove: true
        }))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat(cssMinName))
        .pipe(gulp.dest(cssDestPath))
})

// 处理 js 包括 uglify concat，和处理 css 基本相同
var jsPath = './src/js/*.js', 
    jsMinName = 'all.min.js', 
    jsDestPath = 'dist/js';
gulp.task('js', function() {
    return gulp.src(jsPath)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat(jsMinName))
        .pipe(gulp.dest(jsDestPath))
})

// 处理图片，包括 cache, imagemin
var imgPath = './src/img/*.*', 
    imgDestPath = 'dist/img/';
gulp.task('img', function() {
    return gulp.src(imgPath)
        .pipe(cache(imagemin({
            optimizationLevel: 1
        })))
        .pipe(gulp.dest(imgDestPath))
})

// broserSync处理，
var baseDir = './dist', // server 的地址
    watchPath = './dist/*.html'; // 需要监控的文件
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: baseDir
        }
    })
    return gulp.watch(watchPath).on('change', browserSync.reload)
})

gulp.task('watch', function(){
    gulp.watch(sassPath, ['sass'])
    gulp.watch(cssPath, ['css'])
    gulp.watch(jsPath, ['js'])
     gulp.watch(imgPath, ['img'])
})

gulp.task('default', ['serve', 'watch'])
