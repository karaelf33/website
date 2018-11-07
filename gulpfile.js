'use strict';

/** Todo:
 * Add Clean Task with sync.
 * @type {*|Gulp}
 */

var gulp = require('gulp');
var twig = require('gulp-twig');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var open = require('gulp-open');

var libs = './src/assets/lib/',
    scss = './src/assets/scss/style.scss',
    templates = './src/templates/',
    dist = './dist/',
    sourceJs = [
        './src/assets/lib/jquery/dist/jquery.min.js',
        './src/assets/lib/bootstrap/dist/js/bootstrap.min.js',
        './src/assets/lib/isotope-layout/dist/isotope.pkgd.min.js',
        './src/assets/js/main.js'

    ],
    js = 'assets/js/',
    css = 'assets/css/';

gulp.task('clean', function (cb) {
    return gulp.src('./dist/*')
        .pipe(clean(function () {
            if (cb)
                cb();
        }));
});

gulp.task('copy-images', function () {
    return gulp
        .src(['./src/assets/images/**/*'])
        .pipe(gulp.dest('./dist/assets/images/'))
});

gulp.task('copy-images:watch', function () {
    gulp.watch('./src/assets/images/*', ['copy-images']);

});

gulp.task('copy-fonts', function () {
    return gulp
        .src(['./src/assets/fonts/**/*', './src/assets/lib/slick-carousel/slick/fonts/**/*', './src/assets/lib/font-awesome/fonts/**/*'])
        .pipe(gulp.dest('./dist/assets/fonts/'))
});

gulp.task('sass', function () {
    return gulp.src(scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist + css))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    return gulp.src('./src/templates/pages/*.html')
        .pipe(twig({
            base: './src/templates/',
            data: {}
        }))
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
});


gulp.task('sass:watch', function () {
    gulp.watch('./src/assets/scss/**/*', ['sass']);
});

gulp.task('html:watch', function () {
    gulp.watch('./src/templates/**/**', ['html']);
});

gulp.task('js:watch', function () {
    gulp.watch('./src/assets/js/**/**', ['scripts']);
});


gulp.task('scripts', function () {
    return gulp.src(sourceJs)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(dist + js))
        .pipe(connect.reload());

});



gulp.task('prod-sass', function () {
    return gulp.src(scss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            sourcemap: true
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist + css));
});

gulp.task('prod-scripts', function () {
    return gulp.src(sourceJs)
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist + js));
});

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: 8002,
        livereload: true
    });
});

gulp.task('open', function () {

    var osname = process.platform;
    var apppath = '/Applications/Google\ Chrome.app';

    if (osname === "win32") {
        apppath = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
    } else if (osname === "linux") {
        apppath = '/opt/google/chrome/chrome'
    }


    gulp.src('dist/blog.html')
        .pipe(open({
            uri: 'http://localhost:8002/',
            app: apppath
        }));
});


gulp.task('production', ['copy-images', 'copy-fonts', 'scripts', 'sass', 'html']);

gulp.task('build', ['copy-images', 'copy-fonts', 'scripts', 'sass', 'html'], function () {
    gulp.run(['connect', 'open', 'js:watch', 'sass:watch', 'html:watch', 'copy-images:watch'])
});

gulp.task('default', ['clean'], function () {
    console.log('Clean Finished');
    gulp.run('build');
});