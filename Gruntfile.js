module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: ["lib/**/*.js"]
    },
    shell: {
      test: {
        options: {
          stdout: true,
          stderr: true
        },
        command: './node_modules/.bin/mocha --reporter list'
      }
    }
  });
  grunt.registerTask('test', ['eslint', 'shell:test']);
  grunt.registerTask('lint', ['eslint']);
};