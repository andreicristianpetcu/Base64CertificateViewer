module.exports = function (config) {
  config.set({
    files: [
      'app/scripts/forge.min.js',
      'app/scripts/background.js',
      'test/**/*.js'
    ],
    browsers: ['Firefox'],
      // coverage reporter generates the coverage
    // reporters: ['progress', 'coverage', 'spec'],
    reporters: ['spec'],
    frameworks: ['jasmine', 'sinon', 'sinon-chrome'],
    preprocessors: {
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)
        // 'app/scripts/**/*.js': ['babel'],
        // 'test/**/*.js': ['babel'],
      
        'app/scripts/**/*.js': ['coverage'],
        // 'test/spec/**/*.js': ['webpack','babel']
        'test/spec/**/*.js': ['webpack']
    },
    babelPreprocessor: {
      options: {
        presets: ['env'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },
    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  })
}
