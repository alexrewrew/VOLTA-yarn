module.exports = function () {
    $.gulp.task('scripts:lib', function () {
        return $.gulp.src([
            'node_modules/jquery/dist/jquery.js',
            // 'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
            // 'app/source/fontawesome-free-5.0.6/svg-with-js/js/fontawesome-all.js',
            'node_modules/chosen-js/chosen.jquery.js',
            // 'node_modules/select2/dist/js/select2.full.js',
            'node_modules/slick-carousel/slick/slick.js',
            // 'node_modules/masonry-layout/dist/masonry.pkgd.js',
            // 'node_modules/wowjs/dist/wow.js',
            // 'node_modules/aos/dist/aos.js',
            // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
            // 'node_modules/nouislider/distribute/nouislider.js',
            // 'node_modules/wnumb/wNumb.js',
            // 'node_modules/jquery.maskedinput/src/jquery.maskedinput.js'
            'node_modules/bowser/bowser.js'
        ])
            .pipe($.concat('vendor.js'))
            .pipe($.gulp.dest('app/js'))
            .pipe($.browserSync.reload({
                'stream': true
            }));
    });

    $.gulp.task('scripts', function () {
        return $.gulp.src([
            'app/scripts/v3.js',
            'app/scripts/dev.js',
            'app/scripts/mail.js'
        ])
            .pipe($.concat('scripts.js'))
            .pipe($.gulp.dest('app/js'))
            .pipe($.browserSync.reload({
                'stream': true
            }));
    });

    $.gulp.task('scripts:build', function () {
        return $.gulp.src('app/js/*.js')
            .pipe($.sourcemaps.init())
            .pipe($.uglify())
            .pipe($.strip.text())
            .pipe($.sourcemaps.write())
            .pipe($.gulp.dest('dist/js'));
    });
}