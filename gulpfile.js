let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let csso = require('gulp-csso');
let rename = require("gulp-rename");
let watch = require('gulp-watch');
let gcmq = require('gulp-group-css-media-queries');
let browserSync = require('browser-sync').create();
let sourcemaps = require('gulp-sourcemaps');
let plumber = require('gulp-plumber');
let sass = require('gulp-sass');
let imagemin = require('gulp-imagemin');


function style() {
    return gulp.src('./app/precss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(gulp.dest('./app/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
}

gulp.task('watch', function () {
    watch('./app/precss/style.scss', style);
    watch('./app/*.html', browserSync.reload);
});

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('imagemin', function () {
    gulp.src('./app/source-img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/img/'));
});

gulp.task('style', style);

gulp.task('default', gulp.parallel('watch', 'server', 'style', 'imagemin'));