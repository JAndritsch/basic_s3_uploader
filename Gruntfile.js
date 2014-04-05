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
      'spec/basic_s3_uploader_spec.js'
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

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['jshint', 'karma']);
  grunt.registerTask('build', ['test', 'copy']);

};
