module.exports = function () {
    $.gulp.task('imagemin:build', function () {
        return $.gulp.src('app/img/**/*')

            .pipe($.imagemin())

            .pipe($.gulp.dest('dist/img'))
    });
}