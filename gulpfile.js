const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpConcat = require('gulp-concat');
const fs = require('fs');

const gulpConfig = JSON.parse(fs.readFileSync("gulp-config.json"));

gulpSass.compiler = require('node-sass');

gulp.task('concat', async () => {
    await new Promise( async (resolve, reject) => {
        gulp.src(gulpConfig.concatFiles.src)
        .pipe(gulpConcat(gulpConfig.concatFiles.file))
        .pipe(gulp.dest(gulpConfig.concatFiles.dest));

        return resolve();
    });
});

gulp.task('sass', async () => {
    await new Promise((resolve, reject) => {
         gulp.src(gulpConfig.sassFiles.src)
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest(gulpConfig.sassFiles.dest));

        return resolve();
    });
});

gulp.task('default', gulp.series('concat', 'sass'));

