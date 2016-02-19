var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');

gulp.task('default', ['build']);

gulp.task('build', ['buildSrc', 'buildTest']);

gulp.task('buildSrc', function() {
  return gulp.src(["src/*.ts", "lib/riotgamesapi-typedef/riotgamesapi.d.ts", "typings/node/node.d.ts"])
    .pipe(ts({
        module: "commonjs",
        target: "es5",
        removeComments: true
    })).pipe(gulp.dest('build/'));
});

gulp.task('buildTest', function() {
  return gulp.src(["src/test/*.ts", "lib/riotgamesapi-typedef/riotgamesapi.d.ts", "build/lib/riotgamesapi-typenode.d.ts", "typings/**/*.d.ts"])
    .pipe(ts({
        module: "commonjs",
        target: "es5",
        removeComments: true
    })).pipe(gulp.dest('build/test'));
});

gulp.task('test', ['build'], function() {
   gulp.src('build/test/riotgamesapi-typenode-tests.js', {read: false}).pipe(mocha({})); 
});