var gulp = require('gulp'),
    wiredep = require('wiredep').stream;
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    merge = require('gulp-merge-json'),
    imagemin = require('gulp-imagemin'),
    htmlify = require('gulp-angular-htmlify'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'dist'
  });
});

gulp.task('img', function () {
  return gulp.src('app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

gulp.task('json', function () {
  return gulp.src('app/*.json')
    .pipe(merge('data.json'))
    .pipe(gulp.dest('./dist'))
});
 
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulpif('*.css', prefix('last 15 version')))
    .pipe(gulpif('*.html', htmlify()))
    .pipe(gulp.dest('dist'));
});

gulp.task('htmlify', function() {
  return gulp.src('app/views/*.html')
    .pipe(htmlify())
    .pipe(gulp.dest('dist/views'));
});

gulp.task('bower', function () {
  return gulp.src('app/index.html')
    .pipe(wiredep({
      directory : "app/bower_components"
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('clean', function () {  
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(['app/views/*.html'], ['htmlify']);
  gulp.watch(['app/css/*.css', 'app/js/*.js'], ['html'])
})

gulp.task('default', ['connect', 'html', 'img', 'json', 'htmlify', 'watch']);

