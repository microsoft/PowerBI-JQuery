var argv = require('yargs').argv;

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: ['./node_modules/jquery/dist/jquery.js', './node_modules/powerbi-client/dist/powerbi.js', './dist/jquery.powerbi.js', './test/**/*.spec.js'],
        exclude: [],
        reporters: argv.debug ? ['spec'] : ['spec', 'coverage'],
        autoWatch: true,
        browsers: [argv.debug ? 'Chrome' : 'PhantomJS'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-spec-reporter',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ],
        preprocessors: { './dist/jquery.powerbi.js': ['coverage'] },
        coverageReporter: {
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ]
        },
        logLevel: argv.debug ? config.LOG_DEBUG : config.LOG_INFO
    });
};


