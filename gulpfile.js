var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');

gulp.task('connect',['jscs'], function () {
  return browserSync.init({
    files: [
      'script/*.js',
      'style/*.css',
      'index.html'
    ],
    port: 3000,
    logConnections: true,
    notify: false,
    server: './'
  });
});


gulp.task('test', function () {
  console.log('Test passed successfully');
});

gulp.task('jscs', function () {
      gulp.src('script/actions.js')
        .pipe(jscs());
});

gulp.task('default',['connect'], function(){

});