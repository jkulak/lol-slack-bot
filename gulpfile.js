'use strict';

const gulp = require('gulp'),
    rename = require('gulp-rename'),
    del = require('del'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cssnano = require('gulp-cssnano'),
    htmlreplace = require('gulp-html-replace'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    size = require('gulp-size');

// Use https://www.npmjs.com/package/gulp-useref for production build (updates in HTML)

gulp.task('default', ['clean'], () => {
    gulp.start('styles', 'images', 'scripts', 'update-html-dependencies');
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
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('images', () => {
    return gulp.src('public/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

gulp.task('clean', () => {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
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

gulp.task('scripts', () => {
    //     const s = size();
    //
    //     return gulp.src('./public/*.js')
    //         .pipe(s)
    //         .pipe(babel({
    //             presets: ['es2015']
    //         }))
    //         .pipe(jshint('.jshintrc'))
    //         .pipe(jshint.reporter('default'))
    //         .pipe(concat('main.js'))
    //         .pipe(gulp.dest('public/js'))
    //         .pipe(rename({
    //             suffix: '.min'
    //         }))
    //         .pipe(uglify())
    //         .pipe(gulp.dest('public/js'))
    //         .pipe(s)
    //         .pipe(notify({
    //             message: 'Scripts task complete'
    //         }));
});
