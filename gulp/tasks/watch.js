module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('app/pages/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('app/stylus/**/*.styl', $.gulp.series('stylus'));
        $.gulp.watch('app/source/**/*.styl', $.gulp.series('stylus'));
        $.gulp.watch('app/scripts/**/*.js', $.gulp.series('scripts'));
    });
}