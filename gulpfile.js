'use strict';

const gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    del = require('del'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    size = require('gulp-size'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cssnano = require('gulp-cssnano');

// Use https://www.npmjs.com/package/gulp-useref for production build (updates in HTML)

gulp.task('default', ['clean'], () => {
    gulp.start('styles', 'images');
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

// gulp.task('scripts', () => {
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
// });
