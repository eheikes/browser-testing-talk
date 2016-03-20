'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');

var buildPath = './dist';

gulp.task('clean', function(done) {
  rimraf(buildPath, done);
});

gulp.task('build', ['clean'], function(done) {
  return runSequence(['copy:assets', 'copy:flowtime', 'jade'], done);
});

gulp.task('copy:assets', ['copy:images', 'copy:video', 'copy:css']);

gulp.task('copy:css', function() {
  return gulp.src('talk.css')
    .pipe(gulp.dest(buildPath + '/css'));
});

gulp.task('copy:flowtime', function() {
  return gulp.src([
    // CSS
    'assets/css/prism.css',
    'assets/css/reset.css',
    'css/flowtime.css',
    'css/themes/default.css',
    // fonts
    'assets/fonts/*',
    // JS
    'assets/js/prism.js',
    'js/brav1toolbox.js',
    'js/flowtime.js',
  ], { base: 'node_modules/Flowtime.js', cwd: 'node_modules/Flowtime.js' })
    .pipe(gulp.dest(buildPath));
});

gulp.task('copy:images', function() {
  return gulp.src('img/*')
    .pipe(gulp.dest(buildPath + '/img'));
});

gulp.task('copy:video', function() {
  return gulp.src('video/*')
    .pipe(gulp.dest(buildPath + '/video'));
});

gulp.task('jade', function() {
  return gulp.src('index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(buildPath));
});

gulp.task('default', ['build']);
