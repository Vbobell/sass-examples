const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpConcat = require('gulp-concat');
const fs = require('fs');

const gulpConfig = JSON.parse(fs.readFileSync("gulp-config.json"));

gulpSass.compiler = require('node-sass');

gulp.task('sass', async () => {
    await new Promise( async (resolve, reject) => {
        gulp.src(gulpConfig.concatFiles.src)
        .pipe(gulpConcat(gulpConfig.concatFiles.file))
        .pipe(gulp.dest(gulpConfig.concatFiles.dest))
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest(gulpConfig.sassFiles.dest));

        return resolve();
    });
});

gulp.task('copy-index', async () => {
    await new Promise( async (resolve, reject) => {
        gulp.src(gulpConfig.copyIndex.src)
        .pipe(gulp.dest(gulpConfig.copyIndex.dest));

        return resolve();
    });
});


gulp.task('default', gulp.series('sass', 'copy-index'));

