var gulp = require('gulp'),
    eslint = require('gulp-eslint');

gulp.task('lint', function () {
gulp.src('script/*.js')
    .pipe(eslint({
        rules: {
            'my-custom-rule': 1,
            'strict': 2,
            "camelcase": 1,
            "comma-dangle": 2,
            "quotes": 0
        },
        globals: {
            'jQuery':false,
            '$':true
        },
        envs: [
            'browser'
        ]
    }))
    .pipe(eslint.formatEach('compact', process.stderr));
});


gulp.task('default', ['lint'], function () {
 
});

