const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

const htmlTask = () => 
    src('./src/pages/*.html')  
        .pipe(fileInclude({
            prefix: '@@',      
            basepath: '@file'  
        }))
        .pipe(dest('./dist'));

const scssTask = () => 
    src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist/css'));

const jsTask = () => 
    src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist/js'));

const imgTask = () => 
    src('./src/img/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(imagemin())
        .pipe(dest('./dist/img'));

const serve = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch('./src/pages/**/*.html', series(htmlTask, done => { browserSync.reload(); done(); }));
    watch('./src/scss/**/*.scss', series(scssTask, done => { browserSync.reload(); done(); }));
    watch('./src/js/**/*.js', series(jsTask, done => { browserSync.reload(); done(); }));
    watch('./src/img/**/*.{jpg,jpeg,png,gif,svg}', series(imgTask, done => { browserSync.reload(); done(); }));
}

exports.htmlTask = htmlTask;
exports.scssTask = scssTask;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.default = series(parallel(htmlTask, scssTask, jsTask, imgTask), serve);
