const gulp = require('gulp');

function copyNodeJson() {
  return gulp.src('nodes/**/*.node.json')
    .pipe(gulp.dest('dist/nodes'));
}

function copyCredsJson() {
  return gulp.src('credentials/**/*.json')
    .pipe(gulp.dest('dist/credentials'));
}

exports.default = gulp.parallel(copyNodeJson, copyCredsJson);