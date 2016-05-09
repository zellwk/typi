var gulp = require('gulp');
var sass = require('gulp-sass');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      // Customizing error title
      title: errTitle || 'Error running Sass',
      message: 'Error: <%= error %>',
    })
  });
};

gulp.task('sass', function() {
  gulp.src([
    'scss/**/*.scss',
    'test/manual/**/*.scss',
    ])
    .pipe(customPlumber())
    .pipe(sass({
      includePaths: [
        './bower_components',
        './node_modules'
      ],
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('mocha', function() {
  gulp.src('test/**/*.js')
    .pipe(customPlumber())
    .pipe(mocha({reporter: 'nyan'}))
});

gulp.task('watch', ['mocha'], function() {
  gulp.watch('test/*.scss', ['mocha']);
  gulp.watch('scss/**/*.scss', ['sass', 'mocha']);
  gulp.watch('test/manual/**/*.scss', ['sass', 'mocha']);
});

gulp.task('default', ['watch']);
