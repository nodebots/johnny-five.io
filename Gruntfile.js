module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'public/css/styles.css': 'src/sass/styles.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 1337,
          base: 'public',
          livereload: true
        }
      }
    },
    watch: {
      css: {
        files: 'src/sass/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        },
      },
      html: {
        files: 'public/*.html',
        tasks: [],
        options:{
          livereload: true
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);
  grunt.registerTask('dev', ['connect', 'watch']);

};