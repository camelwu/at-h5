/**
 * Created by lichengjun on 16/7/21.
 */
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
  grunt.registerTask('filehash', [
    'linkAssets',
    'compileAssets',
    'clean:demo', //删除不能访问的资源
    'clean:plugins', //删除不能访问的资源
    
    //'uglify:dev',
    //'cssmin:dev',

    'filerev:dev',  //文件生成hash url
    'jason_rev:dev'  //html 文件中css  js 文件替换

  ]);
};
