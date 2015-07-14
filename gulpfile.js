var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    less = require('gulp-less'), // 使用 less
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
        .pipe(sass({outputStyle: 'compressed'})
            .on('error', sass.logError))
        .pipe(gulp.dest(transformedCssPath))
})

gulp.task('watch', function(){
    // watch .sass files
    gulp.watch(sassPath, ['sass'])
})

// 使用 less, 用 less() 方法编译, 和sass使方法完全一致
var lessPath = './src/less/*.less',
    transformedCssPath = './dist/css';

gulp.task('less', function(){
    return gulp.src(lessPath)
        .pipe(less())
        .pipe(gulp.dest(transformedCssPath))
})

gulp.task('watch', function(){
    gulp.watch(lessPath, ['less'])
})

// 处理 css 包括 autoprefixer uglify concat
var cssPath = './src/css/*.css', 
    cssMinName = 'all.min.css', 
    cssDestPath = 'dist/css';
gulp.task('scripts', function() {
    return gulp.src(cssPath)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true,
            remove: true
        }))
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

gulp.task('default', ['serve', 'scripts', 'imagemin', 'sass', 'watch'])
