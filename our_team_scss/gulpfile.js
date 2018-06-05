var gulp = require('gulp'),
    minify = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    // uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    bs = require('browser-sync').create();

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('browser-sync', function () {
    bs.init({
        server: "./",
        port: 8080
    });
});

gulp.task('watch', function() {
    gulp.watch('app/sass/*.scss', ['style']);
    // gulp.watch('src/js/script.js', ['script']);
    bs.watch('./*.html').on('change', bs.reload);
});

gulp.task('style', function() {
    return gulp.src('app/sass/main.scss', {style : 'expended'})
        .pipe(sass({includePaths: ['sass/**']}))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest('app/css'))
        .pipe(notify({message: 'Style task is finished'}))
        .pipe(bs.reload({stream: true}));
});

gulp.task('script', function() {
    return gulp.src('src/js/script.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(notify({message: 'Script task is finished'}))
        .pipe(bs.reload({stream: true}));
});

gulp.task('imagemin', function() {
    return gulp.src('app/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img'));
});