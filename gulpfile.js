'use strict';

global.$ = {
    gulp: require('gulp'),
    pug: require('gulp-pug'),
    stylus: require('gulp-stylus'),
    strip: require('gulp-strip-comments'),
    csscomb: require('gulp-csscomb'),
    minify: require('gulp-clean-css'),
    autoprefixer: require('gulp-autoprefixer'),
    sourcemaps: require('gulp-sourcemaps'),
    notify: require('gulp-notify'),
    concat: require('gulp-concat'),
    imagemin: require('gulp-imagemin'),
    del: require('del'),
    uglify: require('gulp-uglify'),
    htmlmin: require('gulp-htmlmin'),
    browserSync: require('browser-sync').create(),

    path: {
        tasks: require('./gulp/config/tasks.js')
    }
};

$.path.tasks.forEach(function (taskPath) {
    require(taskPath)();
})

$.gulp.task('default', $.gulp.series(
    $.gulp.parallel('pug', 'stylus', 'scripts:lib', 'scripts'),
    $.gulp.parallel('watch', 'serve')
));

$.gulp.task('build', $.gulp.series(
    'clean',
    $.gulp.parallel('pug', 'stylus', 'scripts:lib', 'scripts'),
    $.gulp.parallel('pug:build', 'stylus:build', 'scripts:build', 'imagemin:build', 'fonts:copy', 'media:copy', 'php:copy')
));