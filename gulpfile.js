var gulp = require('gulp'),
  connect = require('gulp-connect'),
  elsint = require('gulp-eslint');

gulp.task('connectDev', function () {
  connect.server({
    root: ['app', 'tmp'],
    port: 8000,
    livereload: true
  });
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'dist',
    port: 8001,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['index.html'], ['html']);
});

gulp.task('default', ['connectDist', 'connectDev', 'watch']);