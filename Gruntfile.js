'use strict';

module.exports = function(grunt) {

  grunt.config('karma', {
    unit: {
      configFile: 'karma.conf.js'
    }
  });

  grunt.config('jshint', {
    all: [
      'public/javascripts/basic_s3_uploader.js', 
      'spec/basic_s3_uploader_spec.js'
    ]
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('test', ['jshint', 'karma']);

};
