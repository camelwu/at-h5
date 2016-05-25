/**
 * `code for test`
 *
 * ---------------------------------------------------------------
 *
 * 默认的grunt只执行拷贝工作，给测试的代码需要压缩css js等
 *
 * For more information see:
 *   http://sailsjs.org/documentation/anatomy/my-app/tasks/register/default-js
 *
 */
module.exports = function (grunt) {
    grunt.registerTask('test', [
        'linkAssets',
        'compileAssets',
        'uglify:dev',
        'cssmin:dev',
        'clean:demo', //删除不能访问的资源
        'clean:plugins' //删除不能访问的资源
        ]);
};
