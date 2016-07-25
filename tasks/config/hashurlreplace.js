/**
 * Created by lichengjun on 16/7/21.
 */
/**
 * `hashurlreplace`
 *
 * ---------------------------------------------------------------
 *
 *html 文件中css  js 文件替换
 *
 * For usage docs see:
 *   https://github.com/jason618/grunt-jason-rev
 *
 */
module.exports = function (grunt) {

  grunt.config.set('jason_rev', {
    dev: {
      files: [{
        expand: true,
        cwd: '.tmp/',
        src: ['**/*.html'],
        dest: '.tmp/public'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-jason-rev');
};
