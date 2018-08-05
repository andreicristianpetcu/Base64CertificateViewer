module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['ng-scenario'],

    files: ['./scenario.test.js'],

    reporters: ['progress'],

    urlRoot: '/__karma__/',

    proxies: {
      '/': 'http://localhost:3000'
    },

    port: 8080,
    runnerPort: 9100,
    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Firefox'],

    singleRun: false,

    // 45 sec
    browserNoActivityTimeout: 45000
  });
};
