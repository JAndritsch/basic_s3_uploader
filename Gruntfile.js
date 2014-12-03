'use strict';

module.exports = function(grunt) {

  grunt.config('karma', {
    unit: {
      configFile: 'karma.conf.js'
    }
  });

  grunt.config('jshint', {
    all: [
      'src/*.js',
      'spec/*.js',
    ]
  });

  grunt.config('copy', {
    main: {
      files: [
        {
          expand: true,
          src: [
            'dist/basic_s3_uploader.js',
            'src/basic_s3_uploader_mock.js',
          ],
          dest: 'sample_app/public/javascripts/',
          filter: 'isFile'
        }
      ]
    }
  });

  grunt.config('watch', {
    files: [
      'src/*.js',
      'spec/*.js',
    ],
    tasks: ['test']
  });

  grunt.config('concat', {
    options: {
      separator: '\n',
    },
    dist: {
      src: [
        //'lib/CryptoJS/sha256.js',
        //'lib/CryptoJS/lib-typedarrays.js',
        'lib/asmcrypto.js',
        'src/bs3u.js',
        'src/ajax.js',
        'src/uploader.js'
      ],
      dest: 'dist/basic_s3_uploader.js',
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'karma']);
  grunt.registerTask('build', ['test', 'concat', 'copy']);

  grunt.registerTask('default', ['test']);

};
