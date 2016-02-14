module.exports = function(grunt) {

  // All configuration goes here
  grunt.initConfig({

    jekyll: {
      build : {
        dest: '_site'
      }
    },

    sass: {
      dist: {
        files: {
            'assets/css/site.css': '_sass/site.scss',
            '_site/assets/css/site.css': '_sass/site.scss'
        }
      }
    },

    watch: {
      sass: {
        files: '_sass/**/*.scss',
        tasks: ['sass']
      },
      jekyll: {
        files: [
          '*.html',
          '*.md',
          '_layouts/*.html',
          '_includes/*.html',
          '_posts/*.md',
          'assets/js/*.js'
        ],
        tasks: ['jekyll']
      }
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('css-mqpacker'),
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'assets/css/*.css'
      }
    },

    connect: {
      server: {
        options: {
          port: 8080,
          base: '_site'
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-jekyll');

  // Custom tasks
  grunt.registerTask('build', ['sass', 'postcss', 'jekyll']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
