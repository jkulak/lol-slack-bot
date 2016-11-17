'use strict';

const gulp = require('gulp'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    htmlreplace = require('gulp-html-replace');

gulp.task('default', ['clean'], () => {
    gulp.start('styles', 'images', 'scripts');
});

gulp.task('update-html-dependencies', () => {
    gulp.src('lib/templates/*.html')
        .pipe(htmlreplace({
            'css': '/s/css/main.min.css',
            'js': '/s/js/main.min.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', () => {
    return gulp.src('public/css/*.css')
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('images', () => {
    return gulp.src('public/images/**/*')
        .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('clean', () => {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('build-for-production', ['clean'], () => {
    gulp.start('styles', 'images', 'update-html-dependencies');
});

// Watch
gulp.task('watch', () => {

    // Watch .scss files
    gulp.watch('public/css/*.css', ['styles']);

    // Watch .js files
    gulp.watch('public/js/*.js', ['scripts']);

    // Watch image files
    gulp.watch('public/images/*', ['images']);

    // // Create LiveReload server
    // livereload.listen();
    //
    // // Watch any files in dist/, reload on change
    // gulp.watch(['dist/**']).on('change', livereload.changed);

});
