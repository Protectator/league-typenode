var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');
var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');

gulp.task('default', ['build']);

gulp.task('build', ['buildSrc', 'buildTest']);

gulp.task('buildSrc', function () {
    return gulp.src(["src/*.ts", "lib/league-typedef/leagueapi.d.ts", "typings/**/*.d.ts"])
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
    return gulp.src(["src/test/*.ts", "lib/league-typedef/leagueapi.d.ts", "typings/**/*.d.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts({
            module: "commonjs",
            target: "es5",
            removeComments: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/test'));
});

gulp.task('pre-test', function () {
    return gulp.src(['build/**/*.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['build', 'pre-test'], function () {
    gulp.src('build/test/league-typenode-tests.js', {read: false})
        .pipe(mocha())
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports());
    gulp.src('./coverage/lcov.info')
        .pipe(coveralls());
});