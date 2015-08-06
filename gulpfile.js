var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');

gulp.task('connect', function () {
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
  })
});


gulp.task('test', function () {
  console.log('Test passed successfully');
});

gulp.task('default', ['connect']);