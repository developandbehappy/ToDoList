var gulp = require('gulp'),
    eslint = require('gulp-eslint');

gulp.task('lint', function () {
gulp.src('script/*.js')
    .pipe(eslint())
    .pipe(eslint.formatEach('compact', process.stderr));
});


gulp.task('default', ['lint'], function () {
 
});

