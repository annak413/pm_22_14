const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function htmlTask() {
    return src('./src/pages/**/*.html')
        .pipe(dest('./dist'));
}

function scssTask() {
    return src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist/css'))
        // .pipe(browserSync.stream()); 
}

function jsTask() {
    return src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist/js'));
}

function imgTask() {
    return src('./src/img/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(imagemin())
        .pipe(dest('./dist/img'));
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

   // watch('./src/**/*.html').on('change', series(htmlTask, browserSync.reload));
   // watch('./src/**/*.js').on('change', series(jsTask, browserSync.reload));
   // watch('./src/**/*.scss', scssTask);
   // watch('./src/img/**/*.{jpg,jpeg,png,gif,svg}').on('change', series(imgTask, browserSync.reload));


   watch('./src/pages/**/*.html').on('change', series(htmlTask, function(done) {
        browserSync.reload();
        done();
    }));

    // watch('./src/scss/**/*.scss', scssTask);
    
    watch('./src/scss/**/*.scss').on('change', series(scssTask, function(done) {
        browserSync.reload();
        done();
    }));

    watch('./src/js/**/*.js').on('change', series(jsTask, function(done) {
        browserSync.reload();
        done();
    }));

    watch('./src/img/**/*.{jpg,jpeg,png,gif,svg}').on('change', series(imgTask, function(done) {
        browserSync.reload();
        done();
    }));
}

exports.htmlTask = htmlTask;
exports.scssTask = scssTask;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.default = series(parallel(htmlTask, scssTask, jsTask, imgTask), serve);