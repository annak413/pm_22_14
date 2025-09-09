const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

// HTML таска
function htmlTask() {
   return src('./src/**/*.html')
      .pipe(dest('./dist'));
}
exports.htmlTask = htmlTask;

// SCSS таска
function scssTask() {
   return src('./src/**/*.scss')
      .pipe(sass())
      .pipe(cssnano())
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest('./dist/css'));
}
exports.scssTask = scssTask;

// minimiz and copy
function jsTask() {
   return src('./src/**/*.js')
      .pipe(uglify())//minimiz
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest('./dist/js'));
}
exports.jsTask = jsTask;

const imagemin = require('gulp-imagemin');

function imgTask() {
   return src('./src/img/**/*.{jpg,jpeg,png,gif,svg}')
      .pipe(imagemin())//optimization
      .pipe(dest('./dist/img'));
}
exports.imgTask = imgTask;