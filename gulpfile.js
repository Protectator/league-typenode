var gulp = require('gulp');
var ts = require('gulp-typescript');
var qunit = require('gulp-qunit');
var testrunner = require("qunit");

gulp.task('default', ['build']);

gulp.task('build', ['buildSrc', 'buildTest']);

gulp.task('buildSrc', function() {
  return gulp.src("src/*.ts")
    .pipe(ts({
        module: "commonjs",
        target: "es5",
        removeComments: true
    })).pipe(gulp.dest('build/'));
});

gulp.task('buildTest', function() {
  return gulp.src("test/*.ts")
    .pipe(ts({
        module: "commonjs",
        target: "es5",
        removeComments: true
    })).pipe(gulp.dest('build/'));
});

gulp.task('test', function() {
   testrunner.run({
       code: "build/riotgamesapi-typenode.js",
       tests: "build/riotgamesapi-typenode-tests.js"
   }); 
});