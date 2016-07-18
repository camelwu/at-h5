/**
 * Created by lichengjun on 16/7/15.
 */
/**
 * `file hash`
 *
 * ---------------------------------------------------------------
 *
 * 对静态文件做HASH值计算   最大限度利用缓存
 *
 */
module.exports = function (grunt) {
  grunt.registerTask('deployhash', [
    'linkAssets',
    'compileAssets',
    //'filehash:dev',
    'filerev:dev',

  //  'uglify:dev',
  //  'cssmin:dev',
    'clean:demo', //删除不能访问的资源
    'clean:plugins' //删除不能访问的资源
  ]);
};
