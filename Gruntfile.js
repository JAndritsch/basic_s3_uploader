'use strict';

module.exports = function(grunt) {
  grunt.config('karma', {
    unit: {
      configFile: 'karma.conf.js'
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('test', ['karma']);

};
