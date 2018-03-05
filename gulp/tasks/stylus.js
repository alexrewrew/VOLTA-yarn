module.exports = function () {
    $.gulp.task('stylus', function () {
        return $.gulp.src('app/stylus/*.styl')
            .pipe($.stylus({
                'include css': true
            }))
            .pipe($.autoprefixer({
                'browsers': ['last 5 versions', 'ie 8', 'ie 9', 'ie 10'],
                'cascade': true
            }))

            .pipe($.csscomb())

            .on('error', $.notify.onError({
                'message': 'Error <%= error.message %>',
                'title': 'Error running something'
            }))

            .pipe($.gulp.dest('app/css'))
            .pipe($.browserSync.reload({
                'stream': true
            }))
    });

    $.gulp.task('stylus:build', function () {
        return $.gulp.src('app/css/*.css')
            .pipe($.sourcemaps.init())

            .pipe($.minify())
            .pipe($.strip.text())

            .pipe($.sourcemaps.write())
            .pipe($.gulp.dest('dist/css'))
    });
}