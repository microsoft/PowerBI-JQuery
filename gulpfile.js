var gulp = require('gulp-help')(require('gulp'));
var ts = require('gulp-typescript'),
    merge = require('merge2'),
    karma = require('karma'),
    runSequence = require('run-sequence'),
    argv = require('yargs').argv;
    ;

gulp.task('compile', 'Compile typescript', function (done) {
    return runSequence(
        ['compile:src', 'copy'],
        'compile:test',
        done
    );
});

gulp.task('test', 'Runs all tests', ['compile'], function(done) {
    return runSequence(
        'test:js',
        done
    );
});

gulp.task('copy', 'Copy .d.ts file to dist', function () {
    return gulp.src('src/**/*.d.ts')
        .pipe(gulp.dest('dist'));
});

gulp.task('compile:src', 'Compile src typescript', function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src(['./typings/browser/**/*.d.ts', './src/**/*.ts'])
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(gulp.dest('dist'));
});

gulp.task('compile:test', 'Compile test typescript', function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src(['./node_modules/powerbi-client/dist/**/*.d.ts', './typings/browser/**/*.d.ts', './test/**/*.ts'])
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(gulp.dest('./test'));
});

gulp.task('test:js', 'Runs all tests', function(done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: argv.debug ? false : true
    }, done).start();
});
