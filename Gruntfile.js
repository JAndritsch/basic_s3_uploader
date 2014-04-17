'use strict';

module.exports = function(grunt) {

  grunt.config('karma', {
    unit: {
      configFile: 'karma.conf.js'
    }
  });

  grunt.config('jshint', {
    all: [
      'src/basic_s3_uploader.js',
      'src/basic_s3_uploader_mock.js',
      'src/ajax.js',
      'spec/basic_s3_uploader_spec.js',
      'spec/ajax_spec.js',
    ]
  });

  grunt.config('copy', {
    main: {
      files: [
        {
          expand: true,
          src: [
            'src/basic_s3_uploader.js',
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
      'src/basic_s3_uploader.js',
      'src/ajax.js',
      'spec/basic_s3_uploader_spec.js',
      'spec/ajax_spec.js',
    ],
    tasks: ['test']
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'karma']);
  grunt.registerTask('build', ['test', 'copy']);

  grunt.registerTask('default', ['test']);

};
