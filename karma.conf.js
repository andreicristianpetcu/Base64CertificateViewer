module.exports = function (config) {
  config.set({
    files: [
      'test/test_initializer.js',
      'app/scripts/forge.min.js',
      'app/scripts/background.js',
      'test/**/*.js',
      'app/pages/*.html',
      'app/pages/*.js',
    ],
    browsers: ['Firefox'],
      // coverage reporter generates the coverage
    reporters: ['progress', 'coverage', 'spec'],
    frameworks: ['jasmine', 'sinon', 'sinon-chrome', 'chai'],
    preprocessors: {
        'test/test_initializer.js': ['webpack'],
        'app/scripts/**/*.js': ['webpack', 'coverage'],
        'app/pages/**/*.js': ['webpack', 'coverage'],
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
