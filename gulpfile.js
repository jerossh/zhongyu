'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

// 浏览器自动重启，有重启nodemon服务
gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*', 'views/**/*.*'],
    browser: 'google chrome',
    notify: false,
    port: 5000
  });
});


gulp.task('nodemon', function (cb) {
  // del(['./public/*.html']);

  var called = false;

  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    if (!called) {
      cb();
      called = true;
    }
  });
});
//dev task end

gulp.task('default', ['browser-sync'], function () {
  // gulp.watch(['/routes/**/*.*', './app.js'], ['sass']);
});
