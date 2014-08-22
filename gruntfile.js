module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              
      dist: {                            
        options: {                      
          style: 'expanded'
        },                         
        files: {'dest/style.css': 'src/css/*.sass'}

      }
    },
    slim: {                              
      dist: {                            
        files:  [{
          expand: true,
          cwd: 'src',
          src: ['**/*.slim'],
          dest: './dest',
          ext: '.html'
        }]          
      }
    }, 
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      single_file: {
        src: 'dest/style.css',
        dest: 'dest/style.prefixed.css'
      }
    },

    cssmin: {
      combine: {
        files: {
          'dest/style.min.css': ['dest/style.prefixed.css']
        }
      }
    },
    coffee: {
      compile: {  
        files: {'dest/scripts.js': 'src/js/*.coffee'}
      }
    },  

    ngmin: {
      controllers: {
        src: ['dest/scripts.js'],
        dest: 'dest/scripts.min.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dest'
        }
      }
    },
    watch: {
      options: {
        livereload: 3000,
        nospawn: true
      },
      css: {
        files: '**/*.sass',
        tasks: ['sass']
      },
      html: {
        files: '**/*.slim',
        tasks: ['slim']
      },
      coffeescript:{
        files: '**/*.coffee',
        tasks: ['coffee']
      }
    }
  });

require('load-grunt-tasks')(grunt);

grunt.registerTask('default', ['slim','coffee', 'ngmin','sass', 'autoprefixer', 'cssmin']);
grunt.registerTask('dev', ['connect', 'watch']);
} 