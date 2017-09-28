module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      dist: {
        files: {
          'build/index.html': ['docs/index.html']
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'build/dpcc-web.js': ['dpcc-web.js']
        }
      },
      options: {
        transform: ['brfs']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['copy', 'browserify']);
};
