module.exports = function() {
    $.gulp.task('fonts:copy', function () {
        return $.gulp.src('app/fonts/**/*')
            .pipe($.gulp.dest('dist/fonts'))
    });

    $.gulp.task('php:copy', function () {
        return $.gulp.src('app/php/**/*')
            .pipe($.gulp.dest('dist/php'))
    });

    $.gulp.task('media:copy', function () {
        return $.gulp.src('app/media/**/*')
            .pipe($.gulp.dest('dist/media'))
    });
}