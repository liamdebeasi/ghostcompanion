var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var streamqueue = require('streamqueue');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var order = require('gulp-order');

var paths = {
  sass: ['./scss/**/*.scss', './css/boostrap.css'],
  js: ['./js/*.js']
};

gulp.task('default', ['watch']);

gulp.task('sass', function(done) {
  gulp.src(['./scss/app.scss', './css/bootstrap.css'])
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('./css/min/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
});

// Combine, minify, and clean JS files -- orders js files
gulp.task('js', function() {  
    streamqueue({ objectMode: true},
    		gulp.src([
       		"./js/jquery.js",
       		"./js/fastclick.js",
       		"./js/main.js"
    		]))
    		.pipe(concat('app.min.js'))
    		.pipe(stripDebug())
    		.pipe(uglify())
    		.pipe(gulp.dest('./js/min/'));   
    	console.log('   *** compiled app.min.js ***   ');
});