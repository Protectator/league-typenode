var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');
var istanbul = require('gulp-istanbul');
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

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

gulp.task('pre-test', ['build'], function () {
    return gulp.src(['build/league-typenode.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
    gulp.src('build/test/league-typenode-tests.js', {read: false})
        .pipe(mocha())
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports());
});

gulp.task('remap', [], function() {
    return gulp.src('coverage/coverage-final.json')
        .pipe(remapIstanbul({
            reports: {
                'html' : 'html'
            }
        }));
});

gulp.task('remap-lcov', [], function() {
    return gulp.src('coverage/coverage-final.json')
        .pipe(remapIstanbul({
            reports: {
                'lcovonly' : './coverage/lcov-remapped.info'
            }
        }));
});