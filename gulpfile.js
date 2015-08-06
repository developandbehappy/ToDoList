var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
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
  gulp.watch([ 'script/*.js',
               'style/*.css',
               'index.html'])
         .on('change', browserSync.reload);

});
// Compile sass into CSS & auto-inject into browsers

gulp.task('default', ['connect']);