var gulp = require('gulp');
var sass = require('gulp-sass');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sassdoc = require('sassdoc');
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
        './node_modules/',
        './'
      ],
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('sassdoc', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sassdoc({
      groups: {
        config: 'Config',
        core: 'Core',
        'helpers-typefaces': "Helpers - typefaces",
        utils: 'Utilities'
      }
    }));
});

gulp.task('mocha', function() {
  gulp.src('test/**/*.js')
    .pipe(customPlumber())
    .pipe(mocha({reporter: 'nyan'}))
});

gulp.task('watch', ['mocha'], function() {
  gulp.watch('test/automated/**/*.scss', ['mocha']);
  gulp.watch('scss/**/*.scss', ['sass', 'mocha']);
  gulp.watch('test/manual/**/*.scss', ['sass', 'mocha']);
});

gulp.task('default', ['watch', 'sassdoc', 'sass']);
