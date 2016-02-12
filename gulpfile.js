var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');

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

gulp.task('test', ['buildTest'], function() {
   gulp.src('build/riotgamesapi-typenode-tests.js', {read: false}).pipe(mocha({})); 
});