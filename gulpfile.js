var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed'
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function() {
  return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/what-input/what-input.js',
      './bower_components/foundation-sites/dist/foundation.js',
      './js/*.js'
    ])
    .pipe($.concat('scripts.js'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.uglify())
    .pipe(gulp.dest('./'))
});

gulp.task('fontawesome-css', function() {
  return gulp.src('./bower_components/fontawesome/css/font-awesome.min.css')
    .pipe(gulp.dest('./css')); 
});

gulp.task('fontawesome-fonts', function() {
  return gulp.src('./bower_components/fontawesome/fonts/**.*')
    .pipe(gulp.dest('./fonts')); 
});

gulp.task('default', ['sass','scripts','fontawesome-css','fontawesome-fonts'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/**/*.js'], ['scripts']);
});
