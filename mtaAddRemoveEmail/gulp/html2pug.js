const fs = require('fs'),
  gulp = require('gulp'),
  runSeq = require('run-sequence').use(gulp),
  rename = require('gulp-rename'),
  html2jade = require('gulp-html2jade'),
  gulpPugBeautify = require('gulp-pug-beautify');

gulp.task('pug', (cb) => {
  runSeq('jade', 'pug-beautify', cb);
});

gulp.task('pug-beautify', () => {
  return gulp.src(['dist/pug/index.pug', 'dist/pug/email.pug'])
    .pipe(gulpPugBeautify({ omit_empty_lines: true }))
    .pipe(gulp.dest('dist/pug/'));
});

gulp.task('jade', () => {
  gulp.src('dist/*.html')
    .pipe(html2jade({nspaces:2}))
    .pipe(rename((path) => {
      path.extname = '.pug';
    }))
    .pipe(gulp.dest('dist/pug'));
});
