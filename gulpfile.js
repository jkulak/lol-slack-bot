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
    gutil = require('gulp-util'),
    argv = require('minimist')(process.argv),
    gulpif = require('gulp-if'),
    prompt = require('gulp-prompt'),
    rsync = require('gulp-rsync');

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

gulp.task('build-for-production', ['clean'], () => {
    gulp.start('styles', 'images', 'scripts', 'update-html-dependencies');
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

// Deploy

gulp.task('deploy', function () {

    // Dirs and Files to sync
    const rsyncPaths = ['lib', 'dist'];

    // Default options for rsync
    const rsyncConf = {
        progress: true,
        incremental: true,
        relative: true,
        emptyDirectories: true,
        recursive: true,
        clean: true,
        exclude: [],
    };

    // Staging
    if (argv.staging) {

        rsyncConf.hostname = ''; // hostname
        rsyncConf.username = ''; // ssh username
        rsyncConf.destination = ''; // path where uploaded files go
        // Production
    } else if (argv.production) {

        rsyncConf.hostname = ''; // hostname
        rsyncConf.username = ''; // ssh username
        rsyncConf.destination = ''; // path where uploaded files go
        // Missing/Invalid Target
    } else {
        throwError('deploy', gutil.colors.red('Please specify the deployment environment'));
    }

    // Use gulp-rsync to sync the files
    return gulp.src(rsyncPaths)
        .pipe(gulpif(
            argv.production,
            prompt.confirm({
                message: 'Heads Up! Are you SURE you want to push to PRODUCTION?',
                default: false
            })
        ))
        .pipe(rsync(rsyncConf));
});

function throwError(taskName, msg) {
    throw new gutil.PluginError({
        plugin: taskName,
        message: msg
    });
}

gulp.task('scripts', () => {
    //     const s = size();
    //
    //     return gulp.src('./public/*.js')
    //         .pipe(s)
    //         .pipe(babel({
    //             presets: ['es2015']
    //         }))
    //         .pipe(jshintlib('.jshintrc'))
    //         .pipe(jshintlib.reporter('default'))
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
