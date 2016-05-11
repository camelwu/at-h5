/**
 * `copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders from your `assets/` directory into
 * the web root (`.tmp/public`) so they can be served via HTTP,
 * and also for further pre-processing by other Grunt tasks.
 *
 * #### Normal usage (`sails lift`)
 * Copies all directories and files (except CoffeeScript and LESS)
 * from the `assets/` folder into the web root -- conventionally a
 * hidden directory located `.tmp/public`.
 *
 * #### Via the `build` tasklist (`sails www`)
 * Copies all directories and files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-copy
 *
 */
module.exports = function (grunt) {

    grunt.config.set('copy', {
        dev: {
            files: [{
                expand: true,
                cwd: './assets',
                src: ['**/*.!(coffee|less)'],
                dest: '.tmp/public'
                }],
        },
        pluginsjs: {
            files: [{
                expand: true,
                cwd: './assets/plugins',
                src: ['**/*.js',
                     '!**/*.min.js',
                     '!**/Gruntfile.js'],
                dest: './assets/js/plugins'
            }]
        },
        pluginscss: {
            files: [{
                expand: true,
                cwd: './assets/plugins',
                src: ['**/*.css',
                     '!**/*.min.css'],
                dest: './assets/css/plugins'
            }]
        },
        build: {
            files: [{
                expand: true,
                cwd: '.tmp/public',
                src: ['**/*'],
                dest: 'www'
      }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
