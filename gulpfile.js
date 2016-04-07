var gulp = require('gulp-help')(require('gulp'));
var ts = require('gulp-typescript'),
    merge = require('merge2'),
    karma = require('karma'),
    argv = require('yargs').argv;
    ;

gulp.task('copy', 'Copy .d.ts file to dist', function () {
    return gulp.src('src/**/*.d.ts')
        .pipe(gulp.dest('dist'));
});

gulp.task('compile', 'Compile typescript', ['copy'], function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(gulp.dest('dist'));
});

gulp.task('test', 'Runs all tests', ['compile'], function(done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: argv.debug ? false : true
    }, done).start();
});
