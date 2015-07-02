var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync').create();

// 处理 css 包括 uglify concat
var cssPath = './src/css/*.css', 
    cssMinName = 'all.min.css', 
    cssDestPath = 'dist/css';
gulp.task('scripts', function() {
    return gulp.src(cssPath)
        .pipe(uglify())
        .pipe(concat(cssMinName))
        .pipe(gulp.dest(cssDestPath))
})

// 处理 js 包括 uglify concat，和处理 css 基本相同
var jsPath = './src/js/*.js', 
    jsMinName = 'all.min.js', 
    jsDestPath = 'dist/js';
gulp.task('scripts', function() {
    return gulp.src(jsPath)
        .pipe(uglify())
        .pipe(concat(jsMinName))
        .pipe(gulp.dest(jsDestPath))
})

// 处理图片，包括 cache, imagemin
var imgPath = './src/img/*.*', 
    imgDestPath = 'dist/img/';
gulp.task('imagemin', function() {
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

gulp.task('default', ['serve', 'scripts', 'imagemin'])