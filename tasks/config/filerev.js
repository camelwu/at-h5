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
            files: [{
                expand: true,
                cwd: './assets',
                src: ['**/*.js'],
                dest: 'temp/public'
                }],
        }
    });

    grunt.loadNpmTasks('grunt-filerev');
};
