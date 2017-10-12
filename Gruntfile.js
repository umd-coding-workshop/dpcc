module.exports = function(grunt) {
  const fs = require('fs');
  var services = JSON.parse(fs.readFileSync(__dirname + '/services.json'));

  grunt.initConfig({
    copy: {
      dist: {
        files: {
          'docs/index.html': ['build/index.html'],
          'docs/dpcc-web.js': ['build/dpcc-web.js']
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'build/dpcc-web.js': ['src/js/dpcc-web.js']
        }
      }
    },
    mustache_render: {
      dist: {
        files : [
          {
            data: {
              services: services,
              value: function () { return JSON.stringify(this.service); }
            },
            template: 'src/html/index.html',
            dest: 'build/index.html'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mustache-render');

  grunt.registerTask('default', ['mustache_render', 'browserify', 'copy']);
};
