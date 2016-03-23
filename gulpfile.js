var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['build']);

gulp.task('build', ['buildSrc', 'buildTest']);

gulp.task('buildSrc', function () {
    return gulp.src(["src/*.ts", "lib/league-typedef/leagueapi.d.ts", "typings/node/node.d.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts({
            module: "commonjs",
            target: "es5",
            removeComments: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/'));
});

gulp.task('buildTest', function () {
    return gulp.src(["src/test/*.ts", "lib/league-typedef/leagueapi.d.ts", "build/lib/league-typenode.d.ts", "typings/**/*.d.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts({
            module: "commonjs",
            target: "es5",
            removeComments: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/test'));
});

gulp.task('test', ['build'], function () {
    gulp.src('build/test/league-typenode-tests.js', {read: false}).pipe(mocha({}));
});