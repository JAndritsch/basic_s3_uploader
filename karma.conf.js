module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: './',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'lib/asmcrypto.js',
      'src/bs3u.js',
      'src/ajax.js',
      'src/utils.js',
      'src/logger.js',
      'src/chunk.js',
      'src/requests/request.js',
      'src/requests/initiate_upload.js',
      'src/requests/upload_part.js',
      'src/requests/list_parts.js',
      'src/requests/complete_upload.js',
      'src/uploader.js',
      'spec/*.js',
      'spec/requests/*.js',
    ],

    // test results reporter to use
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
