/**
 * `filerev`
 *
 * ---------------------------------------------------------------
 *
 *生成文件hash
 *
 * For usage docs see:
 *   https://github.com/yeoman/grunt-filerev
 *
 */
module.exports = function (grunt) {

  grunt.config.set('filerev', {
    dev: {
      options:{
        keep: false,
        mapping: '.tmp/mapping.json'
      },
      files: [{
        expand: true,
        cwd: '.tmp/',//js目录下
        src: [
          '**/*.js',  //所有js文件
          '**/*.css', //所有的CSS文件
          '!**/coords_china.js',
          '!**/coords_w_en.js'
        ],
        dest: '.tmp/'//输出到此目录下
        //ext:'.js'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-filerev');
};
