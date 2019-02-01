const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpClean = require('gulp-clean');
const gulpConcat = require('gulp-concat');
const fs = require('fs');

const gulpConfig = JSON.parse(fs.readFileSync("gulp-config.json"));

gulpSass.compiler = require('node-sass');

gulp.task('clean', () => {
    return gulp.src(gulpConfig.cleanFiles.src, {read: false})
    .pipe(gulpClean());
});

gulp.task('concat', () => {
    return gulp.src(gulpConfig.concatFiles.src)
    .pipe(gulpConcat(gulpConfig.concatFiles.file))
    .pipe(gulp.dest(gulpConfig.concatFiles.dest));
});

gulp.task('sass', () => {
    return gulp.src(gulpConfig.sassFiles.src)
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(gulp.dest(gulpConfig.sassFiles.dest));
});

gulp.task('default', gulp.series('clean', 'concat', 'sass'));

