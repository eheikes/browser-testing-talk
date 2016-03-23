'use strict';

var connect = require('connect');
var correctLineEndings = require('gulp-line-ending-corrector');
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var selenium = require('selenium-standalone');

var buildPath = './dist';

var opts = require('minimist')(process.argv.slice(2));
var seleniumProcess = null; // for tracking the selenium process

gulp.task('clean', function(done) {
  rimraf(buildPath, done);
});

gulp.task('build', ['clean'], function(done) {
  return runSequence(['copy:assets', 'copy:flowtime', 'copy:fonts', 'jade'], done);
});

gulp.task('copy:assets', ['copy:favicon', 'copy:images', 'copy:video', 'copy:css']);

gulp.task('copy:css', function() {
  return gulp.src('talk.css')
    .pipe(gulp.dest(buildPath + '/css'));
});

gulp.task('copy:favicon', function() {
  return gulp.src('img/favicon.ico')
    .pipe(gulp.dest(buildPath));
});

gulp.task('copy:flowtime', function() {
  return gulp.src([
    // CSS
    'assets/css/prism.css',
    'assets/css/reset.css',
    'css/flowtime.css',
    'css/themes/default.css',
    // JS
    'assets/js/prism.js',
    'js/brav1toolbox.js',
    'js/flowtime.js',
  ], { base: 'node_modules/Flowtime.js', cwd: 'node_modules/Flowtime.js' })
    .pipe(correctLineEndings())
    .pipe(gulp.dest(buildPath));
});

gulp.task('copy:fonts', function() {
  return gulp.src(
    'assets/fonts/*',
    { base: 'node_modules/Flowtime.js', cwd: 'node_modules/Flowtime.js' }
  )
    .pipe(gulp.dest(buildPath));
});

gulp.task('copy:images', function() {
  return gulp.src([
    'img/*',
    '!img/favicon.ico'
  ])
    .pipe(gulp.dest(buildPath + '/img'));
});

gulp.task('copy:video', function() {
  return gulp.src('video/*')
    .pipe(gulp.dest(buildPath + '/video'));
});

gulp.task('deploy', function() {
  return gulp.src(buildPath + '/**/*')
    .pipe(ghPages());
});

gulp.task('jade', function() {
  return gulp.src('index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(buildPath));
});

gulp.task('selenium:install', function(done) {
  selenium.install(done);
});

gulp.task('selenium:start', ['selenium:install'], function(done) {
  selenium.start(function(err, process) {
    seleniumProcess = err ? null : process;
    done();
  });
});

gulp.task('serve', function() {
  var http = require('http');
  var serveStatic = require('serve-static');
  var app = connect();
  app.use(serveStatic(buildPath, { index: ['index.html'] }));
  http.createServer(app).listen(8080);
  gutil.log(gutil.colors.green('Listening at http://localhost:8080'));
});

gulp.task('test', ['selenium:start', 'serve'], function(done) {
  var spawn = require('child_process').spawn;
  var nwConfigFile = './test/nightwatch.conf.js';
  var nwArgs = [
    '--config', nwConfigFile
  ];
  if (opts.env === 'saucelabs') {
    nwArgs.push('--env', 'saucelabs');
  }
  var nw = spawn('./node_modules/.bin/nightwatch', nwArgs);
  nw.stdout.on('data', function(data) {
    console.log(data.toString());
  });
  nw.stderr.on('data', function(data) {
    console.log(data.toString());
  });
  nw.on('close', function(code) {
    gutil.log('Nightwatch process exited with code', code);
    if (seleniumProcess) {
      seleniumProcess.kill();
      seleniumProcess = null;
    }
    done();
  });
  nw.on('error', function(err) {
    gutil.log('Failed to start Nightwatch process', err);
  });
});

gulp.task('default', ['build']);
